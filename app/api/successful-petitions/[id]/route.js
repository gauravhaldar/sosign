import { NextRequest, NextResponse } from "next/server";
import config from "../../../../config/api.js";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Forward the request to the backend
    const backendResponse = await fetch(
      `${config.API_BASE_URL}/api/successful-petitions/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await backendResponse.json();

    if (backendResponse.ok) {
      return NextResponse.json(result, { status: 200 });
    } else {
      console.error("Backend error:", result);
      return NextResponse.json(result, { status: backendResponse.status });
    }
  } catch (error) {
    console.error("Successful Petition Detail API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

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
      `${config.API_BASE_URL}/api/successful-petitions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
      }
    );

    const result = await backendResponse.json();

    if (backendResponse.ok) {
      return NextResponse.json(result, { status: 200 });
    } else {
      console.error("Backend error:", result);
      return NextResponse.json(result, { status: backendResponse.status });
    }
  } catch (error) {
    console.error("Update Successful Petition API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Get the Authorization header from the request
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "Authorization header is required" },
        { status: 401 }
      );
    }

    // Forward the request to the backend
    const backendResponse = await fetch(
      `${config.API_BASE_URL}/api/successful-petitions/${id}`,
      {
        method: "DELETE",
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
      console.error("Backend error:", result);
      return NextResponse.json(result, { status: backendResponse.status });
    }
  } catch (error) {
    console.error("Delete Successful Petition API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
