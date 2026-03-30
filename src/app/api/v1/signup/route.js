import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    // Strict validation
    const { fullname, email, password } = body;
    console.log("PRISMA:", prisma);
    const userFound = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (userFound) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullname: fullname.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    // Return success without sensitive data
    return Response.json(
      {
        message: "User created successfully",
        user: { id: user.id, fullname: user.fullname, email: user.email },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
