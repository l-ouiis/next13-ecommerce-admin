import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { sideId: string } }
) {
  try {
    if (!params.sideId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const side = await prismadb.side.findUnique({
      where: {
        id: params.sideId
      }
    });
  
    return NextResponse.json(side);
  } catch (error) {
    console.log('[SIDE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { sideId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sideId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const side = await prismadb.side.delete({
      where: {
        id: params.sideId
      }
    });
  
    return NextResponse.json(side);
  } catch (error) {
    console.log('[SIDE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { sideId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }


    if (!params.sideId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const side = await prismadb.side.update({
      where: {
        id: params.sideId
      },
      data: {
        name,
        value
      }
    });
  
    return NextResponse.json(side);
  } catch (error) {
    console.log('[SIDE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
