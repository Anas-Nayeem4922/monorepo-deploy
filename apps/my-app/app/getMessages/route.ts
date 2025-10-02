import { client } from "db/client";

export async function GET() {
    const messages = await client.chat.findMany({
        select: {
            message: true,
        },
    });
    return Response.json({
        messages,
    });
}
