// "use client";
// import { useState, useEffect } from "react";
// import {
//     Button,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Modal,
//     TextField,
//     Box,
//     Chip,
// } from "@mui/material";

// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 4,
// };

// export default function AdminLayout() {
//     const [projects, setProjects] = useState([]);
//     const [testimonials, setTestimonials] = useState([]);
//     const [team, setTeam] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [currentItem, setCurrentItem] = useState(null);
//     const [formType, setFormType] = useState(""); // 'project', 'testimonial', 'team'
//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         img_url: "",
//         technologies: [],
//         link: "",
//         name: "",
//         designation: "",
//         author_img: "",
//         quote: "",
//         details: "",
//         member_img: "",
//         linkedin_link: "",
//         github_link: "",
//         twitter_link: "",
//     });

//     // Fetch data on component mount
//     useEffect(() => {
//         fetchData();
//     }, []);

//     const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://infotec-next.vercel.app/";
//     const fetchData = async () => {
//         const projectsRes = await fetch(`${baseURL}/projects`);
//         const projectsData = await projectsRes.json();
//         setProjects(projectsData);

//         const testimonialsRes = await fetch(
//             `${baseURL}/testimonials`
//         );
//         const testimonialsData = await testimonialsRes.json();
//         setTestimonials(testimonialsData);

//         const teamRes = await fetch(`${baseURL}/team`);
//         const teamData = await teamRes.json();
//         setTeam(teamData);
//     };

//     const handleOpen = (type, item = null) => {
//         setFormType(type);
//         setCurrentItem(item);
//         if (type === "project") {
//             setFormData(
//                 item
//                     ? { ...item, technologies: item.technologies.join(", ") }
//                     : {
//                         title: "",
//                         description: "",
//                         img_url: "",
//                         technologies: [],
//                         link: "",
//                     }
//             );
//         } else if (type === "testimonial") {
//             setFormData(
//                 item
//                     ? { ...item }
//                     : { name: "", designation: "", author_img: "", quote: "" }
//             );
//         } else if (type === "team") {
//             setFormData(
//                 item
//                     ? { ...item }
//                     : {
//                         name: "",
//                         designation: "",
//                         details: "",
//                         member_img: "",
//                         linkedin_link: "",
//                         github_link: "",
//                         twitter_link: "",
//                     }
//             );
//         }
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentItem(null);
//         setFormData({
//             title: "",
//             description: "",
//             img_url: "",
//             technologies: [],
//             link: "",
//             name: "",
//             designation: "",
//             author_img: "",
//             quote: "",
//             details: "",
//             member_img: "",
//             linkedin_link: "",
//             github_link: "",
//             twitter_link: "",
//         });
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         if (formType === "project") {
//             const payload = {
//                 title: formData.title,
//                 description: formData.description,
//                 img_url: formData.img_url,
//                 technologies: formData.technologies
//                     .split(",")
//                     .map((tech) => tech.trim()),
//                 link: formData.link,
//             };
//             if (currentItem) {
//                 // Update project
//                 await fetch(`${baseURL}/projects/${currentItem.id}`, {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(payload),
//                 });
//             } else {
//                 // Add project
//                 await fetch(`${baseURL}/projects`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(payload),
//                 });
//             }
//         } else if (formType === "testimonial") {
//             const payload = {
//                 name: formData.name,
//                 designation: formData.designation,
//                 author_img: formData.author_img,
//                 quote: formData.quote,
//             };
//             if (currentItem) {
//                 // Update testimonial
//                 await fetch(
//                     `${baseURL}/testimonials/${currentItem.id}`,
//                     {
//                         method: "PUT",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify(payload),
//                     }
//                 );
//             } else {
//                 // Add testimonial
//                 await fetch(`${baseURL}/testimonials`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(payload),
//                 });
//             }
//         } else if (formType === "team") {
//             const payload = {
//                 name: formData.name,
//                 designation: formData.designation,
//                 details: formData.details,
//                 member_img: formData.member_img,
//                 linkedin_link: formData.linkedin_link,
//                 github_link: formData.github_link,
//                 twitter_link: formData.twitter_link,
//             };
//             if (currentItem) {
//                 // Update team member
//                 await fetch(`${baseURL}/team/${currentItem.id}`, {
//                     method: "PUT",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(payload),
//                 });
//             } else {
//                 // Add team member
//                 await fetch(`${baseURL}/team`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(payload),
//                 });
//             }
//         }
//         fetchData(); // Refresh data
//         handleClose();
//     };

//     const handleDelete = async (type, id) => {
//         if (type === "project") {
//             await fetch(`${baseURL}/projects/${id}`, {
//                 method: "DELETE",
//             });
//             setProjects(projects.filter((p) => p.id !== id));
//         } else if (type === "testimonial") {
//             await fetch(`${baseURL}/testimonials/${id}`, {
//                 method: "DELETE",
//             });
//             setTestimonials(testimonials.filter((t) => t.id !== id));
//         } else if (type === "team") {
//             await fetch(`${baseURL}/team/${id}`, { method: "DELETE" });
//             setTeam(team.filter((member) => member.id !== id));
//         }
//     };

//     return (
//         <>
//         <h1 className="text-blue-800 text-6xl text-center py-5 font-bold border-b-1 mb-2 bg-primary-200">Infotech Dashboard</h1>
//         <div className="container">

//             {/* Projects Section */}
//             <h2 className="text-3xl font-bold text-primary-700 py-2 border-b-1">Projects</h2>
//             <TableContainer component={Paper}>
//                 <Table className="">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Title</TableCell>
//                             <TableCell>Description</TableCell>
//                             <TableCell>Technologies</TableCell>
//                             <TableCell>Image URL</TableCell>
//                             <TableCell>Link</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {projects.map((project) => (
//                             <TableRow key={project.id}>
//                                 <TableCell>{project.title}</TableCell>
//                                 <TableCell>{project.description}</TableCell>
//                                 <TableCell>
//                                     {project.technologies.map((tech, index) => (
//                                         <Chip key={index} label={tech} sx={{ mr: 1, mb: 1 }} />
//                                     ))}
//                                 </TableCell>
//                                 <TableCell>{project.img_url}</TableCell>
//                                 <TableCell>{project.link}</TableCell>
//                                 <TableCell>
//                                     <div className="flex items-center gap-x-4">
//                                         <button onClick={() => handleOpen("project", project)} className="rounded bg-amber-400 py-1 px-2 text-base font-bold">
//                                             Edit
//                                         </button>
//                                         <button onClick={() => handleDelete("project", project.id)} className="rounded bg-red-500 py-1 px-2 text-base font-bold text-white">
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <button onClick={() => handleOpen("project")} className="mb-10 mt-4 py-2 px-4 inline-block bg-primary-600 text-white font-bold rounded cursor-pointer text-xl ">Add Project</button>

//             {/* Testimonials Section */}
//             <h2 className="text-3xl font-bold text-primary-700 py-2 border-b-1">Testimonials</h2>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Designation</TableCell>
//                             <TableCell>Quote</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {testimonials.map((testimonial) => (
//                             <TableRow key={testimonial.id}>
//                                 <TableCell>{testimonial.name}</TableCell>
//                                 <TableCell>{testimonial.designation}</TableCell>
//                                 <TableCell>{testimonial.quote}</TableCell>
//                                 <TableCell>
//                                     <div className="flex items-center gap-x-4">
//                                         <button
//                                             onClick={() => handleOpen("testimonial", testimonial)}
//                                             className="rounded bg-amber-400 py-1 px-2 text-base font-bold"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete("testimonial", testimonial.id)}
//                                             className="rounded bg-red-500 py-1 px-2 text-base font-bold text-white"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <button onClick={() => handleOpen("testimonial")} className="mb-10 mt-4 py-2 px-4 inline-block bg-primary-600 text-white font-bold rounded cursor-pointer text-xl ">Add Testimonial</button>

//             {/* Team Section */}
//             <h2 className="text-3xl font-bold text-primary-700 py-2 border-b-1">Team</h2>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Designation</TableCell>
//                             <TableCell>Details</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {team.map((member) => (
//                             <TableRow key={member.id}>
//                                 <TableCell>{member.name}</TableCell>
//                                 <TableCell>{member.designation}</TableCell>
//                                 <TableCell>{member.details}</TableCell>
//                                 <TableCell>
//                                     <div className="flex items-center gap-x-4">
//                                         <button onClick={() => handleOpen("team", member)} className="rounded bg-amber-400 py-1 px-2 text-base font-bold">
//                                             Edit
//                                         </button>
//                                         <button onClick={() => handleDelete("team", member.id)} className="rounded bg-red-500 py-1 px-2 text-base font-bold text-white">
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <button onClick={() => handleOpen("team")} className="mb-10 mt-4 py-2 px-4 inline-block bg-primary-600 text-white font-bold rounded cursor-pointer text-xl ">Add Team Member</button>

//             {/* Popup Form */}
//             <Modal open={open} onClose={handleClose}>
//                 <Box sx={style}>
//                     <h2 className="mb-4 text-blue-700 font-bold text-xl ">
//                         {currentItem ? "Edit" : "Add"} {formType}
//                     </h2>
//                     {formType === "project" && (
//                         <>
//                             <TextField
//                                 fullWidth
//                                 label="Title"
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Description"
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Technologies (comma separated)"
//                                 name="technologies"
//                                 value={formData.technologies}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Image URL"
//                                 name="img_url"
//                                 value={formData.img_url}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Link"
//                                 name="link"
//                                 value={formData.link}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                         </>
//                     )}
//                     {formType === "testimonial" && (
//                         <>
//                             <TextField
//                                 fullWidth
//                                 label="Name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Designation"
//                                 name="designation"
//                                 value={formData.designation}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Author Image URL"
//                                 name="author_img"
//                                 value={formData.author_img}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Quote"
//                                 name="quote"
//                                 value={formData.quote}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                         </>
//                     )}
//                     {formType === "team" && (
//                         <>
//                             <TextField
//                                 fullWidth
//                                 label="Name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Designation"
//                                 name="designation"
//                                 value={formData.designation}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Details"
//                                 name="details"
//                                 value={formData.details}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Member Image URL"
//                                 name="member_img"
//                                 value={formData.member_img}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="LinkedIn Link"
//                                 name="linkedin_link"
//                                 value={formData.linkedin_link}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="GitHub Link"
//                                 name="github_link"
//                                 value={formData.github_link}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                             <TextField
//                                 fullWidth
//                                 label="Twitter Link"
//                                 name="twitter_link"
//                                 value={formData.twitter_link}
//                                 onChange={handleChange}
//                                 sx={{ mb: 2 }}
//                             />
//                         </>
//                     )}
//                     <Button onClick={handleSubmit} variant="contained">
//                         {currentItem ? "Update" : "Add"}
//                     </Button>
//                 </Box>
//             </Modal>
//         </div>
//         </>
//     );
// }

"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Box,
  Chip,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AdminLayout() {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [team, setTeam] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formType, setFormType] = useState(""); // 'project', 'testimonial', 'team'
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img_url: "",
    technologies: [],
    link: "",
    name: "",
    designation: "",
    author_img: "",
    quote: "",
    details: "",
    member_img: "",
    linkedin_link: "",
    github_link: "",
    twitter_link: "",
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const apiUrl = "https://info-tech-rho.vercel.app/";

  console.log("=====apiUrl====", apiUrl);

  const fetchData = async () => {
    try {
      const projectsRes = await fetch(`${apiUrl}/projects`);
      const projectsData = await projectsRes.json();
      setProjects(projectsData);

      const testimonialsRes = await fetch(`${apiUrl}/testimonials`);
      const testimonialsData = await testimonialsRes.json();
      setTestimonials(testimonialsData);

      const teamRes = await fetch(`${apiUrl}/team`);
      const teamData = await teamRes.json();
      setTeam(teamData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpen = (type, item = null) => {
    setFormType(type);
    setCurrentItem(item);
    if (type === "project") {
      setFormData(
        item
          ? { ...item, technologies: item.technologies.join(", ") }
          : {
              title: "",
              description: "",
              img_url: "",
              technologies: [],
              link: "",
            }
      );
    } else if (type === "testimonial") {
      setFormData(
        item
          ? { ...item }
          : { name: "", designation: "", author_img: "", quote: "" }
      );
    } else if (type === "team") {
      setFormData(
        item
          ? { ...item }
          : {
              name: "",
              designation: "",
              details: "",
              member_img: "",
              linkedin_link: "",
              github_link: "",
              twitter_link: "",
            }
      );
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentItem(null);
    setFormData({
      title: "",
      description: "",
      img_url: "",
      technologies: [],
      link: "",
      name: "",
      designation: "",
      author_img: "",
      quote: "",
      details: "",
      member_img: "",
      linkedin_link: "",
      github_link: "",
      twitter_link: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (formType === "project") {
        const payload = {
          title: formData.title,
          description: formData.description,
          img_url: formData.img_url,
          technologies: formData.technologies
            .split(",")
            .map((tech) => tech.trim()),
          link: formData.link,
        };
        if (currentItem) {
          // Update project
          await fetch(`${apiUrl}/projects/${currentItem.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          // Add project
          await fetch(`${apiUrl}/projects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
      } else if (formType === "testimonial") {
        const payload = {
          name: formData.name,
          designation: formData.designation,
          author_img: formData.author_img,
          quote: formData.quote,
        };
        if (currentItem) {
          // Update testimonial
          await fetch(`${apiUrl}/testimonials/${currentItem.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          // Add testimonial
          await fetch(`${apiUrl}/testimonials`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
      } else if (formType === "team") {
        const payload = {
          name: formData.name,
          designation: formData.designation,
          details: formData.details,
          member_img: formData.member_img,
          linkedin_link: formData.linkedin_link,
          github_link: formData.github_link,
          twitter_link: formData.twitter_link,
        };
        if (currentItem) {
          // Update team member
          await fetch(`${apiUrl}/team/${currentItem.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          // Add team member
          await fetch(`${apiUrl}/team`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
      }
      fetchData(); // Refresh data
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      if (type === "project") {
        await fetch(`${apiUrl}/projects/${id}`, {
          method: "DELETE",
        });
        setProjects(projects.filter((p) => p.id !== id));
      } else if (type === "testimonial") {
        await fetch(`${apiUrl}/testimonials/${id}`, {
          method: "DELETE",
        });
        setTestimonials(testimonials.filter((t) => t.id !== id));
      } else if (type === "team") {
        await fetch(`${apiUrl}/team/${id}`, { method: "DELETE" });
        setTeam(team.filter((member) => member.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <h1 className="text-blue-800 text-6xl text-center py-5 font-bold border-b-1 mb-2 bg-primary-200">
        Infotech Dashboard
      </h1>
      <div className="container">
        {/* Projects Section */}
        <h2 className="text-3xl font-bold text-primary-700 py-2 border-b-1">
          Projects
        </h2>
        <TableContainer component={Paper}>
          <Table className="">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Technologies</TableCell>
                <TableCell>Image URL</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects &&
                projects.map((project, index) => (
                  <TableRow key={`project-${project.id || index}`}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>
                      {project.technologies &&
                        project.technologies.map((tech, techIndex) => (
                          <Chip
                            key={`tech-${techIndex}-${project.id || index}`}
                            label={tech}
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                    </TableCell>
                    <TableCell>{project.img_url}</TableCell>
                    <TableCell>{project.link}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-x-4">
                        <button
                          onClick={() => handleOpen("project", project)}
                          className="rounded bg-amber-400 py-1 px-2 text-base font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete("project", project.id)}
                          className="rounded bg-red-500 py-1 px-2 text-base font-bold text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <button
          onClick={() => handleOpen("project")}
          className="mb-10 mt-4 py-2 px-4 inline-block bg-primary-600 text-white font-bold rounded cursor-pointer text-xl"
        >
          Add Project
        </button>

        {/* Testimonials Section */}
        <h2 className="text-3xl font-bold text-primary-700 py-2 border-b-1">
          Testimonials
        </h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Quote</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testimonials &&
                testimonials.map((testimonial, index) => (
                  <TableRow key={`testimonial-${testimonial.id || index}`}>
                    <TableCell>{testimonial.name}</TableCell>
                    <TableCell>{testimonial.designation}</TableCell>
                    <TableCell>{testimonial.quote}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-x-4">
                        <button
                          onClick={() => handleOpen("testimonial", testimonial)}
                          className="rounded bg-amber-400 py-1 px-2 text-base font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDelete("testimonial", testimonial.id)
                          }
                          className="rounded bg-red-500 py-1 px-2 text-base font-bold text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <button
          onClick={() => handleOpen("testimonial")}
          className="mb-10 mt-4 py-2 px-4 inline-block bg-primary-600 text-white font-bold rounded cursor-pointer text-xl"
        >
          Add Testimonial
        </button>

        {/* Team Section */}
        <h2 className="text-3xl font-bold text-primary-700 py-2 border-b-1">
          Team
        </h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team &&
                team.map((member, index) => (
                  <TableRow key={`team-${member.id || index}`}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.designation}</TableCell>
                    <TableCell>{member.details}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-x-4">
                        <button
                          onClick={() => handleOpen("team", member)}
                          className="rounded bg-amber-400 py-1 px-2 text-base font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete("team", member.id)}
                          className="rounded bg-red-500 py-1 px-2 text-base font-bold text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <button
          onClick={() => handleOpen("team")}
          className="mb-10 mt-4 py-2 px-4 inline-block bg-primary-600 text-white font-bold rounded cursor-pointer text-xl"
        >
          Add Team Member
        </button>

        {/* Popup Form */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <h2 className="mb-4 text-blue-700 font-bold text-xl">
              {currentItem ? "Edit" : "Add"} {formType}
            </h2>
            {formType === "project" && (
              <>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Technologies (comma separated)"
                  name="technologies"
                  value={formData.technologies || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Image URL"
                  name="img_url"
                  value={formData.img_url || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Link"
                  name="link"
                  value={formData.link || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </>
            )}
            {formType === "testimonial" && (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={formData.designation || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Author Image URL"
                  name="author_img"
                  value={formData.author_img || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Quote"
                  name="quote"
                  value={formData.quote || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </>
            )}
            {formType === "team" && (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={formData.designation || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Details"
                  name="details"
                  value={formData.details || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Member Image URL"
                  name="member_img"
                  value={formData.member_img || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="LinkedIn Link"
                  name="linkedin_link"
                  value={formData.linkedin_link || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="GitHub Link"
                  name="github_link"
                  value={formData.github_link || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Twitter Link"
                  name="twitter_link"
                  value={formData.twitter_link || ""}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </>
            )}
            <Button onClick={handleSubmit} variant="contained">
              {currentItem ? "Update" : "Add"}
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
