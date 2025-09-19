import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// @desc    Create a new comment
// @route   POST /api/comments
export async function POST(request) {
  try {
    const body = await request.json();
    const { petitionId, content } = body;

    if (!petitionId || !content) {
      return NextResponse.json(
        { success: false, message: "Petition ID and content are required" },
        { status: 400 }
      );
    }

    // Get token from request headers
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Authorization token required" },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({ petitionId, content }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to create comment" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
