import { NextRequest, NextResponse } from "next/server";
import config from "../../../config/api.js";

export async function GET(request) {
  try {
    // Get query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    console.log(
      "Successful Petitions GET API called with params:",
      queryString
    );
    console.log("Using API_BASE_URL:", config.API_BASE_URL);

    const backendUrl = `${config.API_BASE_URL}/api/successful-petitions${
      queryString ? `?${queryString}` : ""
    }`;
    console.log("Fetching from:", backendUrl);

    // Forward the request to the backend
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
    console.error("Successful Petitions API Error:", error);
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

export async function POST(request) {
  try {
    // Get the Authorization header from the request
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "Authorization header is required" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Forward the request to the backend
    const backendResponse = await fetch(
      `${config.API_BASE_URL}/api/successful-petitions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
      }
    );

    const result = await backendResponse.json();

    if (backendResponse.ok) {
      return NextResponse.json(result, { status: 201 });
    } else {
      console.error("Backend error:", result);
      return NextResponse.json(result, { status: backendResponse.status });
    }
  } catch (error) {
    console.error("Create Successful Petition API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
