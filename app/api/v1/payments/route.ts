import { handleApiError } from "@/lib/error";
import jwt, { JwtPayload } from "jsonwebtoken";
import Stripe from "stripe";

export const POST = async (req: Request) => {
  const token = (req.headers.get("authorization") || "").split("Bearer ").at(1);

  if (!token) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "please login first to create team",
      })
    );
  }

  const PRODUCTION_HOMEPAGE = process.env.PRODUCTION_HOMEPAGE;
  const PRODUCTION_CANCELPAGE = process.env.PRODUCTION_CANCELPAGE;
  const DEVELOPMENT_HOMEPAGE = process.env.DEVELOPMENT_HOMEPAGE;
  const DEVELOPMENT_CANCELPAGE = process.env.DEVELOPMENT_CANCELPAGE;

  const body = await req.json();
  const { priceId } = body;

  try {
    const JWT_SECRET_KEY = String(process.env.JWT_SECRET_KEY) || "";
    const result = jwt.verify(token, JWT_SECRET_KEY);

    const result_out = result as JwtPayload;
    if (result) {
      const user = result_out.user;

      // stripe work
      const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
      const stripe = new Stripe(STRIPE_SECRET_KEY);

      const session = await stripe.checkout.sessions.create({
        billing_address_collection: "auto",
        customer_email: user.email,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: user._id,
          userEmail: user.email,
        },
        mode: "subscription",
        success_url:
          process.env.NODE_ENV === "production"
            ? `${PRODUCTION_HOMEPAGE}`
            : `${DEVELOPMENT_HOMEPAGE}`,
        cancel_url:
          process.env.NODE_ENV === "production"
            ? `${PRODUCTION_CANCELPAGE}`
            : `${DEVELOPMENT_CANCELPAGE}`,
      });

      const url = session.url;

      return new Response(
        JSON.stringify({
          success: true,
          message: "project created",
          url: url,
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify(
        JSON.stringify({
          success: false,
          message: "unauthorized",
        })
      ),
      { status: 500 }
    );
  } catch (err) {
    handleApiError(err);
  }
};
