import { NextResponse } from "next/server";
import config from "@/config/api";

// Create a hide request
export async function POST(request) {
    try {
        const authHeader = request.headers.get("authorization");
        const body = await request.json();

        const response = await fetch(`${config.API_BASE_URL}/api/hide-requests`, {
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
        console.error("Error creating hide request:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

// Get all hide requests (for admin)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const authHeader = request.headers.get("authorization");

        const response = await fetch(
            `${config.API_BASE_URL}/api/hide-requests?${searchParams.toString()}`,
            {
                headers: {
                    ...(authHeader && { Authorization: authHeader }),
                },
            }
        );

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error("Error fetching hide requests:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
