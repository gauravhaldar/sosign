import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// @desc    Get all comments for a petition
// @route   GET /api/comments/petition/[petitionId]
export async function GET(request, { params }) {
  try {
    const { petitionId } = await params;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    if (!petitionId) {
      return NextResponse.json(
        { success: false, message: "Petition ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${API_BASE_URL}/api/comments/petition/${petitionId}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to fetch comments" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
