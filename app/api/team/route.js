// import { readData, writeData } from "@/lib/db";
// import { NextResponse } from "next/server";

// // export async function GET() {
// //   const data = readData();
// //   return Response.json(data[2]["team"]);
// // }

// export async function GET() {
//   const data = readData();
//   return NextResponse.json(data[2]["team"], {
//     headers: {
//       "Access-Control-Allow-Origin": "*", // Allow all origins (Change to specific domain in production)
//       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });
// }

// export async function POST(req) {
//   const newTeam = await req.json();
//   const data = readData();
//   const team = data[2]["team"];
//   newTeam.id = Date.now();
//   team.push(newTeam);
//   writeData(data);

//   return Response.json(newTeam, { status: 201 });
// }
// =========================================

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
    if (!data || !data[2] || !data[2]["team"]) {
      return NextResponse.json(
        { error: "Team data not found" },
        { status: 404, headers }
      );
    }
    return NextResponse.json(data[2]["team"], { headers });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500, headers }
    );
  }
}

// Handle POST request
export async function POST(req) {
  try {
    const newTeamMember = await req.json();
    const data = readData();

    // Validate input data
    if (
      !newTeamMember ||
      !newTeamMember.name ||
      !newTeamMember.designation ||
      !newTeamMember.details ||
      !newTeamMember.member_img ||
      !newTeamMember.linkedin_link ||
      !newTeamMember.github_link ||
      !newTeamMember.twitter_link
    ) {
      return NextResponse.json(
        { error: "Invalid data format. Missing required fields." },
        { status: 400, headers }
      );
    }

    // Ensure team array exists
    if (!data[2]) data[2] = {};
    if (!data[2]["team"]) data[2]["team"] = [];

    const team = data[2]["team"];
    newTeamMember.id = Date.now(); // Assign a unique ID
    team.push(newTeamMember);
    writeData(data);

    return NextResponse.json(newTeamMember, { status: 201, headers });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to add new team member" },
      { status: 500, headers }
    );
  }
}

// Handle OPTIONS request (for CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers });
}
