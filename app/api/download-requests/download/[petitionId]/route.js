import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { petitionId } = await params;
        const authHeader = request.headers.get("authorization");

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

        const response = await fetch(
            `${backendUrl}/api/download-requests/download/${petitionId}`,
            {
                headers: {
                    ...(authHeader && { Authorization: authHeader }),
                },
            }
        );

        if (!response.ok) {
            const data = await response.json();
            return NextResponse.json(data, { status: response.status });
        }

        const data = await response.json();

        // Return as downloadable JSON
        return new NextResponse(JSON.stringify(data, null, 2), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Content-Disposition": `attachment; filename="petition-${petitionId}-data.json"`,
            },
        });
    } catch (error) {
        console.error("Error downloading petition data:", error);
        return NextResponse.json(
            { message: "Failed to download petition data" },
            { status: 500 }
        );
    }
}
