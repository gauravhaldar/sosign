import { NextRequest, NextResponse } from "next/server";
import config from "../../../config/api.js";

export async function POST(request) {
  try {
    // Get the form data from the request
    const formData = await request.formData();

    // Get the Authorization header from the original request
    const authHeader = request.headers.get("authorization");

    // Prepare headers for the backend request
    const headers = {};
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    // Forward the request to the backend with the Authorization header
    const backendResponse = await fetch(
      `${config.API_BASE_URL}/api/petitions`,
      {
        method: "POST",
        headers: headers,
        body: formData,
      }
    );

    const result = await backendResponse.json();

    if (backendResponse.ok) {
      return NextResponse.json(result, { status: 201 });
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

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();

    console.log("Petitions GET API called with params:", searchParams);
    console.log("Using API_BASE_URL:", config.API_BASE_URL);

    const backendUrl = `${config.API_BASE_URL}/api/petitions${
      searchParams ? `?${searchParams}` : ""
    }`;
    console.log("Fetching from:", backendUrl);

    const backendResponse = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
    console.error("Petitions API Error:", error);
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
