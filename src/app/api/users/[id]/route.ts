import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}
export async function DELETE(request: Request, { params }: Params) {
  dbConnect();

  try {
    const userDeleted = await User.findByIdAndDelete(params.id);

    if (!userDeleted)
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(userDeleted);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function GET(request: Request, { params }: Params) {
  await dbConnect();
  const tasks = await User.findById(params.id);
  return NextResponse.json(tasks);
}

export async function PUT(request: Request, { params }: Params) {
  dbConnect();

  try {
    const userData = await request.json();
    const userUpdated = await User.findByIdAndUpdate(params.id, userData, {
      new: true,
    });

    if (!userUpdated)
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(userUpdated);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
