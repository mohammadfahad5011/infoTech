import { readData, writeData } from "@/lib/db";
import { NextResponse } from "next/server";

const headers = {
  "Access-Control-Allow-Origin": "*", // Allow all origins (Change for production)
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle GET request
export async function GET() {
  try {
    const data = readData();
    if (!data || !data[0] || !Array.isArray(data[0]["projects"])) {
      throw new Error("Invalid data structure");
    }
    return NextResponse.json(data[0]["projects"], { headers });
  } catch (error) {
    console.error("Error reading data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers }
    );
  }
}

// Handle POST request
export async function POST(req) {
  try {
    const newProject = await req.json();
    const data = readData();

    if (!data || !data[0] || !Array.isArray(data[0]["projects"])) {
      throw new Error("Invalid data structure");
    }

    // Basic validation (customize as needed)
    if (!newProject.name || !newProject.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers }
      );
    }

    const projects = data[0]["projects"];
    newProject.id = Date.now();
    projects.push(newProject);
    writeData(data);

    return NextResponse.json(newProject, { status: 201, headers });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers }
    );
  }
}

// Handle OPTIONS request (for CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers });
}
