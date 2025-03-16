// import { readData, writeData } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function DELETE(req, context) {
//   try {
//     const { id } = await context.params; // Await params to extract ID
//     if (!id) {
//       return NextResponse.json(
//         { error: "Team testimonial ID" },
//         { status: 400 }
//       );
//     }

//     const data = readData();
//     const teams = data[2]?.team || [];

//     // Check if the ID exists and remove the project by ID
//     const newTeams = teams.filter((team) => team.id !== parseInt(id)); // Or use id.toString() if it's a string
//     if (teams.length === newTeams.length) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 });
//     }

//     data[2]["team"] = newTeams;
//     writeData(data);

//     return NextResponse.json(
//       { message: "Team deleted successfully" },
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
//     const {
//       name,
//       designation,
//       details,
//       member_img,
//       linkedin_link,
//       github_link,
//       twitter_link,
//     } = await req.json(); // Get the data from the request body
//     const data = readData();
//     const teams = data[2]?.team || []; // Ensure we have the testimonials array

//     // Find the testimonial by ID
//     const teamIndex = teams.findIndex((team) => team.id === Number(id));

//     if (teamIndex === -1) {
//       return NextResponse.json({ error: "Team not found" }, { status: 404 });
//     }

//     // Update testimonial details
//     teams[teamIndex] = {
//       ...teams[teamIndex],
//       name,
//       designation,
//       details,
//       member_img,
//       linkedin_link,
//       github_link,
//       twitter_link,
//     };

//     // Write updated data
//     writeData(data);

//     // Return the updated testimonial
//     return NextResponse.json(teams[teamIndex], { status: 200 });
//   } catch (error) {
//     console.error("PUT error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// ===================================================================================================
import { readData, writeData } from "@/lib/db";
import { NextResponse } from "next/server";

const headers = {
  "Access-Control-Allow-Origin": "*", // Allow all origins (or specify a domain)
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allowed methods
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
};

// DELETE method to remove a team member by ID
export async function DELETE(req, context) {
  try {
    const { id } = await context.params; // Await params to extract ID
    if (!id) {
      return NextResponse.json(
        { error: "Missing team member ID" },
        { status: 400, headers }
      );
    }

    const data = readData();
    const teams = data[2]?.team || [];

    // Check if the ID exists and remove the team member by ID
    const newTeams = teams.filter((team) => team.id !== parseInt(id));
    if (teams.length === newTeams.length) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404, headers }
      );
    }

    data[2]["team"] = newTeams;
    writeData(data);

    return NextResponse.json(
      { message: "Team member deleted successfully" },
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

// PUT method to update an existing team member
export async function PUT(req, context) {
  try {
    const { id } = await context.params; // Extract ID from context.params
    const {
      name,
      designation,
      details,
      member_img,
      linkedin_link,
      github_link,
      twitter_link,
    } = await req.json(); // Get the data from the request body
    const data = readData();
    const teams = data[2]?.team || []; // Ensure we have the teams array

    // Find the team member by ID
    const teamIndex = teams.findIndex((team) => team.id === Number(id));

    if (teamIndex === -1) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404, headers }
      );
    }

    // Update team member details
    teams[teamIndex] = {
      ...teams[teamIndex],
      name,
      designation,
      details,
      member_img,
      linkedin_link,
      github_link,
      twitter_link,
    };

    // Write updated data
    writeData(data);

    // Return the updated team member
    return NextResponse.json(teams[teamIndex], { status: 200, headers });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers }
    );
  }
}
