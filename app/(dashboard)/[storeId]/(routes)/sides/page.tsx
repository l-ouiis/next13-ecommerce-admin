import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SideColumn } from "./components/columns"
import { SidesClient } from "./components/client";

const SidesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const sides = await prismadb.side.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSides: SideColumn[] = sides.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SidesClient data={formattedSides} />
      </div>
    </div>
  );
};

export default SidesPage;
