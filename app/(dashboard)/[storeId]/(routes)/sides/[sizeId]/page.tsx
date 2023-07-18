import prismadb from "@/lib/prismadb";

import { SideForm } from "./components/side-form";

const SidePage = async ({
  params
}: {
  params: { sideId: string }
}) => {
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
}

export default SidePage;
