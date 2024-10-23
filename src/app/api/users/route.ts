import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

//get all users
export async function GET() {
  await dbConnect();
  const tasks = await User.find();
  return NextResponse.json(tasks);
}
//post user
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const newUser = new User(body);
    const savedUser = await newUser.save();
    return NextResponse.json(savedUser);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
