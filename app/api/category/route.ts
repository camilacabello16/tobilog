import { connectDb } from "@/helpers/server-helper";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextResponse) => {
    try {
        const { content, description } = await req.json();
        await connectDb();
        const post = await prisma.category.create({ data: { description, content } });

        return NextResponse.json({ message: "Success", post }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};