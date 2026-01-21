import { NextRequest, NextResponse } from "next/server";
import config from "../../../../config/api.js";

export async function GET(request) {
    try {
        // Get the Authorization header from the request
        const authHeader = request.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json(
                { message: "Authorization header is required" },
                { status: 401 }
            );
        }

        // Get query parameters for pagination
        const url = new URL(request.url);
        const searchParams = url.searchParams.toString();

        // Forward the request to the backend with the Authorization header
        const backendResponse = await fetch(
            `${config.API_BASE_URL}/api/petitions/signed?${searchParams}`,
            {
                method: "GET",
                headers: {
                    Authorization: authHeader,
                    "Content-Type": "application/json",
                },
            }
        );

        const result = await backendResponse.json();

        if (backendResponse.ok) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: backendResponse.status });
        }
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
