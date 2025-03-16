// import { readData, writeData } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function DELETE(req, context) {
//   try {
//     const { id } = await context.params; // Await params to extract ID
//     if (!id) {
//       return NextResponse.json(
//         { error: "Missing project ID" },
//         { status: 400 }
//       );
//     }

//     const data = readData();
//     const projects = data[0]?.projects || [];

//     // Check if the ID exists and remove the project by ID
//     const newProjects = projects.filter(
//       (project) => project.id !== parseInt(id)
//     ); // Or use id.toString() if it's a string
//     if (projects.length === newProjects.length) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 });
//     }

//     data[0]["projects"] = newProjects;
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
//     const { id } = await context.params; // Await params to extract ID
//     const { title, description, img_url, technologies, link } =
//       await req.json(); // Get the data from the request body
//     const data = readData();
//     const projects = data[0]?.projects || []; // Ensure we have the projects array

//     // Find the project by ID
//     const projectIndex = projects.findIndex(
//       (project) => project.id === parseInt(id)
//     );

//     if (projectIndex === -1) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 });
//     }

//     // Update project details
//     projects[projectIndex] = {
//       ...projects[projectIndex],
//       title,
//       description,
//       img_url,
//       technologies,
//       link,
//     };

//     // Write updated data
//     writeData(data);

//     // Return the updated project
//     return NextResponse.json(projects[projectIndex], { status: 200 });
//   } catch (error) {
//     console.error("PUT error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// ======================================= ========================================================

// import { readData, writeData } from "@/lib/db";
// import { NextResponse } from "next/server";

// // DELETE method to remove a project by ID
// export async function DELETE(req, context) {
//   try {
//     const { id } = await context.params; // Extract ID from context.params
//     if (!id) {
//       return NextResponse.json(
//         { error: "Missing project ID" },
//         { status: 400 }
//       );
//     }

//     const data = readData();
//     const projects = data[0]?.projects || [];

//     // Remove the project with the given ID
//     const newProjects = projects.filter(
//       (project) => project.id !== parseInt(id)
//     );

//     if (projects.length === newProjects.length) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 });
//     }

//     // Update the projects array and write back to data
//     data[0]["projects"] = newProjects;
//     writeData(data);

//     // Response with CORS headers
//     return NextResponse.json(
//       { message: "Project deleted successfully" },
//       {
//         status: 200,
//         headers: {
//           "Access-Control-Allow-Origin": "*", // Allow all origins (or specify a domain)
//           "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allowed methods
//           "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
//         },
//       }
//     );
//   } catch (error) {
//     console.error("DELETE error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       {
//         status: 500,
//         headers: {
//           "Access-Control-Allow-Origin": "*", // Allow all origins (or specify a domain)
//           "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allowed methods
//           "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
//         },
//       }
//     );
//   }
// }

// // PUT method to update an existing project
// export async function PUT(req, context) {
//   try {
//     // Await the context.params to ensure it's fully resolved
//     const { id } = await context.params; // Ensure the params are awaited
//     const { title, description, img_url, technologies, link } =
//       await req.json(); // Get request body

//     const data = readData();
//     const projects = data[0]?.projects || [];

//     // Find the index of the project to update by ID
//     const projectIndex = projects.findIndex(
//       (project) => project.id === parseInt(id)
//     );

//     if (projectIndex === -1) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 });
//     }

//     // Update the project details
//     projects[projectIndex] = {
//       ...projects[projectIndex],
//       title,
//       description,
//       img_url,
//       technologies,
//       link,
//     };

//     // Write the updated data back
//     writeData(data);

//     // Response with CORS headers
//     return NextResponse.json(projects[projectIndex], {
//       status: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type, Authorization",
//       },
//     });
//   } catch (error) {
//     console.error("PUT error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       {
//         status: 500,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//           "Access-Control-Allow-Headers": "Content-Type, Authorization",
//         },
//       }
//     );
//   }
// }
// =====================================================================

import { readData, writeData } from "@/lib/db";
import { NextResponse } from "next/server";

const headers = {
  "Access-Control-Allow-Origin": "*", // Allow all origins (or specify a domain)
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allowed methods
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
};

// DELETE method to remove a project by ID
export async function DELETE(req, context) {
  try {
    const { id } = await context.params; // Extract ID from context.params
    if (!id) {
      return NextResponse.json(
        { error: "Missing project ID" },
        { status: 400, headers }
      );
    }

    const data = readData();
    const projects = data[0]?.projects || [];

    // Remove the project with the given ID
    const newProjects = projects.filter(
      (project) => project.id !== parseInt(id)
    );

    if (projects.length === newProjects.length) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404, headers }
      );
    }

    // Update the projects array and write back to data
    data[0]["projects"] = newProjects;
    writeData(data);

    // Response with CORS headers
    return NextResponse.json(
      { message: "Project deleted successfully" },
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

// PUT method to update an existing project
export async function PUT(req, context) {
  try {
    const { id } = await context.params; // Ensure the params are awaited
    const { title, description, img_url, technologies, link } =
      await req.json(); // Get request body

    const data = readData();
    const projects = data[0]?.projects || [];

    // Find the index of the project to update by ID
    const projectIndex = projects.findIndex(
      (project) => project.id === parseInt(id)
    );

    if (projectIndex === -1) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404, headers }
      );
    }

    // Update the project details
    projects[projectIndex] = {
      ...projects[projectIndex],
      title,
      description,
      img_url,
      technologies,
      link,
    };

    // Write the updated data back
    writeData(data);

    // Response with CORS headers
    return NextResponse.json(projects[projectIndex], {
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
