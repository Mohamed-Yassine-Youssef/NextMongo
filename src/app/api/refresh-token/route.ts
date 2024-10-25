import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const REFRESH_SECRET = process.env.REFRESH_SECRET || "your_refresh_secret";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return NextResponse.json(
      { message: "No refresh token provided" },
      { status: 401 }
    );
  }

  try {
    const user = jwt.verify(refreshToken, REFRESH_SECRET);

    const token = jwt.sign({ firstname: (user as any).firstname }, JWT_SECRET, {
      expiresIn: "1m",
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 403 }
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
