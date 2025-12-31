import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const authHeader = request.headers.get("authorization");

        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const response = await fetch(`${backendUrl}/api/download-requests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(authHeader && { Authorization: authHeader }),
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Error creating download request:", error);
        return NextResponse.json(
            { message: "Failed to create download request" },
            { status: 500 }
        );
    }
}
