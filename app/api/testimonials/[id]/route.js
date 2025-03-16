// import { readData, writeData } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function DELETE(req, context) {
//   try {
//     const { id } = await context.params; // Await params to extract ID
//     if (!id) {
//       return NextResponse.json(
//         { error: "Missing testimonial ID" },
//         { status: 400 }
//       );
//     }

//     const data = readData();
//     const testimonials = data[1]?.testimonials || [];

//     // Check if the ID exists and remove the project by ID
//     const newTimonials = testimonials.filter(
//       (testimonial) => testimonial.id !== parseInt(id)
//     ); // Or use id.toString() if it's a string
//     if (testimonials.length === newTimonials.length) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 });
//     }

//     data[1]["testimonials"] = newTimonials;
//     writeData(data);

//     return NextResponse.json(
//       { message: "Project deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("DELETE error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req, context) {
//   try {
//     const { id } = context.params; // No need to await
//     const { name, designation, author_img, quote } = await req.json(); // Get the data from the request body
//     const data = readData();
//     const testimonials = data[1]?.testimonials || []; // Ensure we have the testimonials array

//     // Find the testimonial by ID
//     const testimonialIndex = testimonials.findIndex(
//       (testimonial) => testimonial.id === Number(id)
//     );

//     if (testimonialIndex === -1) {
//       return NextResponse.json(
//         { error: "Testimonial not found" },
//         { status: 404 }
//       );
//     }

//     // Update testimonial details
//     testimonials[testimonialIndex] = {
//       ...testimonials[testimonialIndex],
//       name,
//       designation,
//       author_img,
//       quote,
//     };

//     // Write updated data
//     writeData(data);

//     // Return the updated testimonial
//     return NextResponse.json(testimonials[testimonialIndex], { status: 200 });
//   } catch (error) {
//     console.error("PUT error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// =================================================================================================

import { readData, writeData } from "@/lib/db";
import { NextResponse } from "next/server";

const headers = {
  "Access-Control-Allow-Origin": "*", // Allow all origins (or specify a domain)
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allowed methods
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
};

// DELETE method to remove a testimonial by ID
export async function DELETE(req, context) {
  try {
    const { id } = await context.params; // Await params to extract ID
    if (!id) {
      return NextResponse.json(
        { error: "Missing testimonial ID" },
        { status: 400, headers }
      );
    }

    const data = readData();
    const testimonials = data[1]?.testimonials || [];

    // Check if the ID exists and remove the testimonial by ID
    const newTestimonials = testimonials.filter(
      (testimonial) => testimonial.id !== parseInt(id)
    ); // Or use id.toString() if it's a string
    if (testimonials.length === newTestimonials.length) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404, headers }
      );
    }

    data[1]["testimonials"] = newTestimonials;
    writeData(data);

    return NextResponse.json(
      { message: "Testimonial deleted successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers }
    );
  }
}

// PUT method to update an existing testimonial
export async function PUT(req, context) {
  try {
    const { id } = await context.params; // Extract ID from context.params
    const { name, designation, author_img, quote } = await req.json(); // Get the data from the request body
    const data = readData();
    const testimonials = data[1]?.testimonials || []; // Ensure we have the testimonials array

    // Find the testimonial by ID
    const testimonialIndex = testimonials.findIndex(
      (testimonial) => testimonial.id === Number(id)
    );

    if (testimonialIndex === -1) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404, headers }
      );
    }

    // Update testimonial details
    testimonials[testimonialIndex] = {
      ...testimonials[testimonialIndex],
      name,
      designation,
      author_img,
      quote,
    };

    // Write updated data
    writeData(data);

    // Return the updated testimonial
    return NextResponse.json(testimonials[testimonialIndex], {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers }
    );
  }
}
