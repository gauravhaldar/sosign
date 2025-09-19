import { NextRequest, NextResponse } from "next/server";
import config from "../../../../config/api.js";

export async function POST(request) {
  try {
    // Get the Authorization header from the request
    const authHeader = request.headers.get("authorization");

    const headers = {
      "Content-Type": "application/json",
    };

    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    // Forward the request to the backend
    const backendResponse = await fetch(
      `${config.API_BASE_URL}/api/users/logout`,
      {
        method: "POST",
        headers: headers,
      }
    );

    const result = await backendResponse.json();

    if (backendResponse.ok) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: backendResponse.status });
    }
  } catch (error) {
    console.error("Logout API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
