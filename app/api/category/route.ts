import { SERVER_ERROR, SUCCESS } from "@/constains/response";
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

export const GET = async () => {
    try {
        await connectDb();
        const categories = await prisma.category.findMany();

        return NextResponse.json({ message: "Success", categories }, { status: SUCCESS });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: SERVER_ERROR });
    } finally {
        await prisma.$disconnect();
    }
};