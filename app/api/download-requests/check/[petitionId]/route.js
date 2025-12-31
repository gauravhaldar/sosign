import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { petitionId } = await params;
        const authHeader = request.headers.get("authorization");

        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const response = await fetch(
            `${backendUrl}/api/download-requests/check/${petitionId}`,
            {
                headers: {
                    ...(authHeader && { Authorization: authHeader }),
                },
            }
        );

        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Error checking download request status:", error);
        return NextResponse.json(
            { message: "Failed to check download request status" },
            { status: 500 }
        );
    }
}
