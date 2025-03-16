// import { readData, writeData } from "@/lib/db";
// import { NextResponse } from "next/server";

// // export async function GET() {
// //   const data = readData();
// //   return Response.json(data[1]["testimonials"]);
// // }

// export async function GET() {
//   const data = readData();
//   return NextResponse.json(data[1]["testimonials"], {
//     headers: {
//       "Access-Control-Allow-Origin": "*", // Allow all origins (Change to specific domain in production)
//       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });
// }

// export async function POST(req) {
//   const newTestimonial = await req.json();
//   const data = readData();
//   const testimonials = data[1]["testimonials"];
//   newTestimonial.id = Date.now();
//   testimonials.push(newTestimonial);
//   writeData(data);

//   return Response.json(newTestimonial, { status: 201 });
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
    if (!data || !data[1] || !data[1]["testimonials"]) {
      return NextResponse.json(
        { error: "Testimonials data not found" },
        { status: 404, headers }
      );
    }
    return NextResponse.json(data[1]["testimonials"], { headers });
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
    const newTestimonial = await req.json();
    const data = readData();

    // Validate input data
    if (
      !newTestimonial ||
      !newTestimonial.name ||
      !newTestimonial.designation ||
      !newTestimonial.author_img ||
      !newTestimonial.quote
    ) {
      return NextResponse.json(
        { error: "Invalid data format. Missing required fields." },
        { status: 400, headers }
      );
    }

    // Ensure testimonials array exists
    if (!data[1]) data[1] = {};
    if (!data[1]["testimonials"]) data[1]["testimonials"] = [];

    const testimonials = data[1]["testimonials"];
    newTestimonial.id = Date.now(); // Assign a unique ID
    testimonials.push(newTestimonial);
    writeData(data);

    return NextResponse.json(newTestimonial, { status: 201, headers });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to add new testimonial" },
      { status: 500, headers }
    );
  }
}

// Handle OPTIONS request (for CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers });
}
