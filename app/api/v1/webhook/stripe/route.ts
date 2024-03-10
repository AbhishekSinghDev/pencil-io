import type { NextApiRequest } from "next";
import Stripe from "stripe";
import getRawBody from "raw-body";
import User from "@/db/models/user.model";
import Team from "@/db/models/team.model";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// make sure to add this, otherwise throws a error of stream.not.readable error => nextjs specific only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export const POST = async (req: Request) => {
  try {
    if (req.method !== "POST") {
      return new Response("only post requests allowed");
    }

    const sig: any = req.headers.get("stripe-signature");
    const rawBody = await req.text();

    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
      {
        console.log("Webhook error: ", err);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
      }
    }

    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        (event.data.object as any).id,
        {
          expand: ["line_items"],
        }
      );

      const lineItems = sessionWithLineItems.line_items;
      if (!lineItems)
        return new Response("Internal server error", { status: 500 });

      try {
        const userEmail = sessionWithLineItems.metadata?.userEmail;
        const userID = sessionWithLineItems.metadata?.userId;

        await User.findByIdAndUpdate(userID, {
          isPremiumUser: true,
        });

        await Team.updateMany({ owner: userID }, { limit: 100 });

        return new Response(
          JSON.stringify({ success: true, message: "payment successfull" }),
          { status: 200 }
        );
      } catch (err) {
        console.log("handling some our server error");
        return new Response(null, { status: 500 });
      }
    }
  } catch (err) {
    console.log(err);
    return new Response("Internal server error ultimate", { status: 500 });
  }
};
