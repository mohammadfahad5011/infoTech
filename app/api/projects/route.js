// import { readData, writeData } from "@/lib/db";
// import { NextResponse } from "next/server";

// // export async function GET() {
// //   const data = readData();
// //   return Response.json(data[0]["projects"]);
// // }

// export async function GET() {
//   const data = readData();
//   return NextResponse.json(data[0]["projects"], {
//     headers: {
//       "Access-Control-Allow-Origin": "*", // Allow all origins (Change to specific domain in production)
//       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });
// }

// export async function POST(req) {
//   const newProject = await req.json();
//   const data = readData();
//   const projects = data[0]["projects"];
//   newProject.id = Date.now();
//   projects.push(newProject);
//   writeData(data);

//   return Response.json(newProject, { status: 201 });
// }
// =============================================================================================================
// import { readData, writeData } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const data = readData();
//     return NextResponse.json(data[0]["projects"], {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type, Authorization",
//       },
//     });
//   } catch (error) {
//     console.error("Error in GET request:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   try {
//     const newProject = await req.json();
//     const data = readData();

//     if (!data || !Array.isArray(data) || !data[0] || !Array.isArray(data[0]["projects"])) {
//       throw new Error("Invalid data structure");
//     }

//     const projects = data[0]["projects"];
//     newProject.id = Date.now();
//     projects.push(newProject);

//     writeData(data);

//     return NextResponse.json(newProject, { status: 201 });
//   } catch (error) {
//     console.error("Error in POST request:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// export async function OPTIONS() {
//   return NextResponse.json({}, {
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });
// }

import { readData, writeData } from "@/lib/db";
import { NextResponse } from "next/server";

const headers = {
  "Access-Control-Allow-Origin": "*", // Allow all origins (Change for production)
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle GET request
export async function GET() {
  const data = readData();
  return NextResponse.json(data[0]["projects"], { headers });
}

// Handle POST request
export async function POST(req) {
  try {
    const newProject = await req.json();
    const data = readData();
    const projects = data[0]["projects"];

    newProject.id = Date.now();
    projects.push(newProject);
    writeData(data);

    return NextResponse.json(newProject, { status: 201, headers });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data format" },
      { status: 400, headers }
    );
  }
}

// Handle OPTIONS request (for CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers });
}
