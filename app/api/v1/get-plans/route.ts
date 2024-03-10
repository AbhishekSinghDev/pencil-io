import { handleApiError } from "@/lib/error";
import Stripe from "stripe";

export const GET = async (req: Request) => {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const plans = await stripe.prices.list({
      limit: 1,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "products fetched successfully",
        plans: plans.data,
      }),
      { status: 200 }
    );
  } catch (err) {
    handleApiError(err);
  }
};
