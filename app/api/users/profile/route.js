import { NextRequest, NextResponse } from "next/server";
import config from "../../../../config/api.js";

export async function GET(request) {
  try {
    // Get the authorization header from the request
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "No authorization header provided" },
        { status: 401 }
      );
    }

    // Forward the request to the backend
    const backendResponse = await fetch(
      `${config.API_BASE_URL}/api/users/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
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
    console.error("Profile API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
