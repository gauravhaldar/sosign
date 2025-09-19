import { NextRequest, NextResponse } from "next/server";
import config from "../../../../config/api.js";

export async function POST(request) {
  try {
    // Log the request for debugging
    console.log("Google Auth API called");

    const body = await request.json();
    console.log("Request body received:", {
      email: body.email,
      name: body.name,
      hasPhotoURL: !!body.photoURL,
      hasUID: !!body.uid,
    });

    // Validate required fields
    if (!body.email || !body.name || !body.uid) {
      return NextResponse.json(
        { message: "Missing required fields: email, name, or uid" },
        { status: 400 }
      );
    }

    console.log("Forwarding to backend:", config.API_BASE_URL);

    // Forward the request to the backend
    const backendResponse = await fetch(
      `${config.API_BASE_URL}/api/users/google-auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
    console.log("Backend success response received");

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Google Auth API Error:", error);
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
