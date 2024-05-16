import { SERVER_ERROR, SUCCESS } from "@/constains/response";
import { connectDb } from "@/helpers/server-helper";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: NextResponse) => {
    try {
        const dataCreated = await req.json();
        await connectDb();
        const post = await prisma.blog.create({ data: dataCreated });

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
        const blogs = await prisma.blog.findMany();

        return NextResponse.json({ message: "Success", blogs }, { status: SUCCESS });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: SERVER_ERROR });
    } finally {
        await prisma.$disconnect();
    }
};