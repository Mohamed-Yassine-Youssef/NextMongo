import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { firstname, lastname, email, password } = await req.json();

      await dbConnect(); // Connect to the database

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }

  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
