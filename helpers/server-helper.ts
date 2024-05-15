import prima from "@/prisma";

export const connectDb = async () => {
    try {
        await prima.$connect();
    } catch (error) {
        throw new Error("Unable to connect to database");
    }
}