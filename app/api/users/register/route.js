import { NextRequest, NextResponse } from "next/server";
import config from "../../../../config/api.js";

export async function POST(request) {
  try {
    const body = await request.json();

    // Forward the request to the backend
    const backendResponse = await fetch(
      `${config.API_BASE_URL}/api/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const result = await backendResponse.json();

    if (backendResponse.ok) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: backendResponse.status });
    }
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
