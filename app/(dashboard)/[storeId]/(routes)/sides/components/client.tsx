"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, SideColumn } from "./columns";

interface SidesClientProps {
  data: SideColumn[];
}

export const SizesClient: React.FC<SidesClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Sides (${data.length})`} description="Manage sides for your products" />
        <Button onClick={() => router.push(`/${params.storeId}/sides/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Sides" />
      <Separator />
      <ApiList entityName="sides" entityIdName="sideId" />
    </>
  );
};
