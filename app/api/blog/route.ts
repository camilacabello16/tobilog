import { SERVER_ERROR, SUCCESS } from "@/constains/response";
import { connectDb } from "@/helpers/server-helper";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export const GET = async (req: NextRequest) => {
    // filter param
    // - pageIndex: number
    // - pageSize: number
    // - category: string 
    // - text: string
    // =============
    try {
        const url = new URL(req.url);
        const pageIndex = url.searchParams.get("pageIndex");
        const pageSize = url.searchParams.get("pageSize");
        const category = url.searchParams.get("category");
        const text = url.searchParams.get("text");

        let pageIndexFilter = 0;
        let pageSizeFilter = 10;

        if (pageIndex) {
            pageIndexFilter = parseInt(url.searchParams.get("pageIndex") ?? "");
        }
        if (pageSize) {
            pageSizeFilter = parseInt(url.searchParams.get("pageSize") ?? "");
        }

        await connectDb();
        const blogs = await prisma.blog.findMany({
            where: {
                categoryId: category ? {
                    equals: category
                } : {},
                OR: [
                    {
                        title: {
                            contains: text ?? "",
                        },
                    },
                    {
                        content: {
                            contains: text ?? "",
                        }
                    },
                ],
            },
            skip: pageIndexFilter,
            take: pageSizeFilter,
        });

        return NextResponse.json({ message: "Success", blogs }, { status: SUCCESS });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: SERVER_ERROR });
    } finally {
        await prisma.$disconnect();
    }
};