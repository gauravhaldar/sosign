import { NextResponse } from "next/server";
import config from "../../../../config/api.js";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Forward the request to the backend
    const backendResponse = await fetch(
      `${config.API_BASE_URL}/api/petitions/${id}`,
      {
        method: "GET",
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

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Forward Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { message: "Authorization header is required" },
        { status: 401 }
      );
    }

    const backendResponse = await fetch(
      `${config.API_BASE_URL}/api/petitions/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authHeader,
        },
      }
    );

    const text = await backendResponse.text();
    let result;
    try {
      result = text ? JSON.parse(text) : {};
    } catch {
      result = { message: text || "" };
    }

    return NextResponse.json(result, { status: backendResponse.status });
  } catch (error) {
    console.error("API Error (DELETE):", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
