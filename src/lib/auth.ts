import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your_jwt_secret"
);

export const authenticate = async (token: string) => {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload; // Return the decoded payload
  } catch (error: any) {
    console.log("Token verification failed:", error.message);
    return null;
  }
};
