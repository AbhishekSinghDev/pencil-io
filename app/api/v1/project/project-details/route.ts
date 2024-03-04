import connectToDatabase from "@/db/connectDatabase";
import Project from "@/db/models/project.model";
import { handleApiError } from "@/lib/error";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { canvasID } = body;

  try {
    await connectToDatabase();

    const canvasData = await Project.findById(canvasID);

    return new Response(
      JSON.stringify({
        success: true,
        message: "canvas saved",
        canvasData: canvasData.canvasData,
      })
    );
  } catch (err) {
    handleApiError(err);
  }
};
