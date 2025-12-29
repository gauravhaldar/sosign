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
            // Try to parse error as JSON
            try {
                const data = await response.json();
                return NextResponse.json(data, { status: response.status });
            } catch {
                return NextResponse.json(
                    { message: "Failed to download petition data" },
                    { status: response.status }
                );
            }
        }

        // Get the PDF as array buffer
        const pdfBuffer = await response.arrayBuffer();

        // Return as downloadable PDF
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="petition-${petitionId}-data.pdf"`,
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
