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
        email: email,
      },
    });

    if (userFound) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullname: fullname,
        email: email,
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
    console.error("Error code:", error.code);
    console.error("Error meta:", error.meta);

    // Return different error messages based on error type
    if (error.code === "ECONNREFUSED") {
      return Response.json(
        {
          message:
            "Database connection failed. Please check your DATABASE_URL.",
        },
        { status: 503 },
      );
    }

    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
