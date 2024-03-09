import connectToDatabase from "@/db/connectDatabase";
import Project from "@/db/models/project.model";
import { handleApiError } from "@/lib/error";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { projectID } = body;

  try {
    await connectToDatabase();

    const project = await Project.findById(projectID);

    return new Response(
      JSON.stringify({
        success: true,
        message: "canvas data",
        canvasData: project.canvasData,
        editorData: project.editorData,
      })
    );
  } catch (err) {
    handleApiError(err);
  }
};
