import prismadb from "@/lib/prismadb";
import { SideForm } from "./components/side-form";

const SidePage = async ({
  params
}: {
  params: { sideId: string }
}) => {
  try {
    console.log("sideID: " + params.sideId);
    const side = await prismadb.side.findUnique({
      where: {
        id: params.sideId
      }
    });

    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SideForm initialData={side} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("An error occurred while retrieving the side:", error);
    <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h1>Error</h1>
    </div>
  </div>
    // You may want to handle the error more gracefully in your UI here, 
    // perhaps rendering an error message or a fallback UI.
  }
}

export default SidePage;
