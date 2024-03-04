import connectToDatabase from "@/db/connectDatabase";
import Project from "@/db/models/project.model";
import { handleApiError } from "@/lib/error";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { canvasID, canvasData } = body;

  try {
    await connectToDatabase();

    const saved = await Project.findOneAndUpdate(
      { _id: canvasID },
      { canvasData: canvasData },
      { new: true }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "canvas saved",
        canvas: saved,
      })
    );
  } catch (err) {
    handleApiError(err);
  }
};
