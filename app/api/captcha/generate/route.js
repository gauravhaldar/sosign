import { NextResponse } from "next/server";
import config from "../../../../config/api.js";

export async function GET() {
    try {
        const backendResponse = await fetch(
            `${config.API_BASE_URL}/api/captcha/generate`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            console.error("CAPTCHA backend error:", errorText);
            return NextResponse.json(
                { message: "Failed to generate CAPTCHA" },
                { status: backendResponse.status }
            );
        }

        const result = await backendResponse.json();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("CAPTCHA API Error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
