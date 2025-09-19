import { NextRequest, NextResponse } from "next/server";
import config from "../../../../config/api.js";

export async function GET(request) {
  try {
    console.log("Petition Stats API called");
    console.log("Using API_BASE_URL:", config.API_BASE_URL);

    // Forward the request to the backend
    const backendResponse = await fetch(
      `${config.API_BASE_URL}/api/petitions/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Backend response status:", backendResponse.status);

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error("Backend error response:", errorText);

      try {
        const errorJson = JSON.parse(errorText);
        return NextResponse.json(errorJson, { status: backendResponse.status });
      } catch {
        return NextResponse.json(
          { message: "Backend error", details: errorText },
          { status: backendResponse.status }
        );
      }
    }

    const result = await backendResponse.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Petition Stats API Error:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      {
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
