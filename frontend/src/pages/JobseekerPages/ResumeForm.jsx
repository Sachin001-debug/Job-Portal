import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Trash2, Plus } from "lucide-react";
import axios from "axios";

const ResumeForm = () => {
  const API = import.meta.env.VITE_LOCAL;
  // Personal Information
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [professionalSummary, setProfessionalSummary] = useState("");

  const [technicalSkills, setTechnicalSkills] = useState("");
  const [softSkills, setSoftSkills] = useState("");
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const [education, setEducation] = useState({
    degree: "",
    institution: "",
    year: "",
    gpa: "",
  });

  const [certifications, setCertifications] = useState([
    { id: 1, name: "", organization: "", date: "", credentialId: "" },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: "", technologies: "", description: "", liveUrl: "" },
  ]);
  const [languages, setLanguages] = useState([
    { id: 1, language: "", proficiency: "" },
  ]);

  const [loading, setLoading] = useState(false);

  // Update education (single object)
  const updateEducation = (field, value) => {
    setEducation({ ...education, [field]: value });
  };

  // Add new experience
  const addExperience = () => {
    const newId = experiences.length + 1;
    setExperiences([
      ...experiences,
      {
        id: newId,
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  // Remove experience
  const removeExperience = (id) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((exp) => exp.id !== id));
    } else {
      toast.warning("At least one experience is required");
    }
  };

  // Update experience
  const updateExperience = (id, field, value) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    );
  };

  // Add new certification
  const addCertification = () => {
    const newId = certifications.length + 1;
    setCertifications([
      ...certifications,
      {
        id: newId,
        name: "",
        organization: "",
        date: "",
        credentialId: "",
      },
    ]);
  };

  // Remove certification
  const removeCertification = (id) => {
    if (certifications.length > 1) {
      setCertifications(certifications.filter((cert) => cert.id !== id));
    } else {
      toast.warning("At least one certification is required");
    }
  };

  // Update certification
  const updateCertification = (id, field, value) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert,
      ),
    );
  };

  // Add new project
  const addProject = () => {
    const newId = projects.length + 1;
    setProjects([
      ...projects,
      {
        id: newId,
        name: "",
        technologies: "",
        description: "",
        liveUrl: "",
      },
    ]);
  };

  // Remove project
  const removeProject = (id) => {
    if (projects.length > 1) {
      setProjects(projects.filter((proj) => proj.id !== id));
    } else {
      toast.warning("At least one project is required");
    }
  };

  // Update project
  const updateProject = (id, field, value) => {
    setProjects(
      projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj,
      ),
    );
  };

  // Add new language
  const addLanguage = () => {
    const newId = languages.length + 1;
    setLanguages([...languages, { id: newId, language: "", proficiency: "" }]);
  };

  // Remove language
  const removeLanguage = (id) => {
    if (languages.length > 1) {
      setLanguages(languages.filter((lang) => lang.id !== id));
    } else {
      toast.warning("At least one language is required");
    }
  };

  // Update language
  const updateLanguage = (id, field, value) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang,
      ),
    );
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  const token = localStorage.getItem("token");
  
  const resumeData = {
    fullName,
    email,
    phone,
    location,
    portfolio,
    professionalSummary,
    technicalSkills,
    softSkills,
    experiences,
    education,
    certifications,
    projects,
    languages
  };

  try {
    const response = await axios.post(
      `${API}/jobseeker/save-resume`, 
      resumeData, 
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      toast.success("Resume saved successfully!");
      resetForm();
    } else {
      toast.error(response.data.message || "Failed to save resume");
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      toast.error(error.response.data.message || "Something went wrong!");
    } else if (error.request) {
      toast.error("No response from server");
    } else {
      toast.error("Request failed");
    }
  } finally {
    setLoading(false);
  }
};

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setPortfolio("");
    setProfessionalSummary("");
    setTechnicalSkills("");
    setSoftSkills("");
    setExperiences([
      {
        id: 1,
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
    setEducation({ degree: "", institution: "", year: "", gpa: "" }); // Reset single object
    setCertifications([
      { id: 1, name: "", organization: "", date: "", credentialId: "" },
    ]);
    setProjects([
      { id: 1, name: "", technologies: "", description: "", liveUrl: "" },
    ]);
    setLanguages([{ id: 1, language: "", proficiency: "" }]);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="shadow-md bg-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-blue-600">Hire Nepal</h1>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Fill Resume Manually
            </h2>
          </div>
        </div>
      </nav>

      {/* Form Section */}
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Fill Your Details
              </h1>
              <p className="text-gray-600 mt-2">
                Fill the details below to make your profile more professional.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="johndoe@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Kathmandu, Nepal"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Portfolio Website
                    </label>
                    <input
                      type="url"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      placeholder="https://yourportfolio.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Professional Summary
                </h3>
                <textarea
                  value={professionalSummary}
                  onChange={(e) => setProfessionalSummary(e.target.value)}
                  rows="4"
                  placeholder="Brief overview of your professional background, key achievements, and career goals..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                ></textarea>
              </div>

              {/* Skills */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Skills
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technical Skills
                  </label>
                  <input
                    type="text"
                    value={technicalSkills}
                    onChange={(e) => setTechnicalSkills(e.target.value)}
                    placeholder="e.g. JavaScript, React, Python, Node.js (comma separated)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate skills with commas
                  </p>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Soft Skills
                  </label>
                  <input
                    type="text"
                    value={softSkills}
                    onChange={(e) => setSoftSkills(e.target.value)}
                    placeholder="e.g. Communication, Teamwork, Problem Solving (comma separated)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Work Experience */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Work Experience
                </h3>

                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="border border-gray-200 rounded-lg p-4 mb-4 relative"
                  >
                    {experiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) =>
                            updateExperience(exp.id, "jobTitle", e.target.value)
                          }
                          placeholder="e.g. Frontend Developer"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, "company", e.target.value)
                          }
                          placeholder="e.g. Tech Company Pvt. Ltd."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(
                              exp.id,
                              "startDate",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) =>
                            updateExperience(exp.id, "endDate", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Responsibilities & Achievements
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            "description",
                            e.target.value,
                          )
                        }
                        rows="3"
                        placeholder="• Developed responsive web applications&#10;• Increased performance by 40%&#10;• Led a team of 3 developers"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addExperience}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <Plus size={16} /> Add Another Experience
                </button>
              </div>

              {/* Education - Single Entry (No Add/Remove Button) */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Education
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree/Certificate
                    </label>
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) =>
                        updateEducation("degree", e.target.value)
                      }
                      placeholder="e.g. Bachelor's in Computer Science"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={education.institution}
                      onChange={(e) =>
                        updateEducation("institution", e.target.value)
                      }
                      placeholder="e.g. Tribhuvan University"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year of Completion
                    </label>
                    <input
                      type="text"
                      value={education.year}
                      onChange={(e) => updateEducation("year", e.target.value)}
                      placeholder="e.g. 2022"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GPA/Percentage
                    </label>
                    <input
                      type="text"
                      value={education.gpa}
                      onChange={(e) => updateEducation("gpa", e.target.value)}
                      placeholder="e.g. 3.8 GPA or 85%"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Certifications
                </h3>

                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="border border-gray-200 rounded-lg p-4 mb-4 relative"
                  >
                    {certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCertification(cert.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Certification Name
                        </label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) =>
                            updateCertification(cert.id, "name", e.target.value)
                          }
                          placeholder="e.g. AWS Certified Developer"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Issuing Organization
                        </label>
                        <input
                          type="text"
                          value={cert.organization}
                          onChange={(e) =>
                            updateCertification(
                              cert.id,
                              "organization",
                              e.target.value,
                            )
                          }
                          placeholder="e.g. Amazon Web Services"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date Obtained
                        </label>
                        <input
                          type="month"
                          value={cert.date}
                          onChange={(e) =>
                            updateCertification(cert.id, "date", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Credential ID (Optional)
                        </label>
                        <input
                          type="text"
                          value={cert.credentialId}
                          onChange={(e) =>
                            updateCertification(
                              cert.id,
                              "credentialId",
                              e.target.value,
                            )
                          }
                          placeholder="e.g. ABC123XYZ"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addCertification}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <Plus size={16} /> Add Another Certification
                </button>
              </div>

              {/* Projects */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Projects
                </h3>

                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="border border-gray-200 rounded-lg p-4 mb-4 relative"
                  >
                    {projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProject(proj.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Name
                        </label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) =>
                            updateProject(proj.id, "name", e.target.value)
                          }
                          placeholder="e.g. E-commerce Website"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Technologies Used
                        </label>
                        <input
                          type="text"
                          value={proj.technologies}
                          onChange={(e) =>
                            updateProject(
                              proj.id,
                              "technologies",
                              e.target.value,
                            )
                          }
                          placeholder="e.g. React, Node.js, MongoDB"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Description
                        </label>
                        <textarea
                          value={proj.description}
                          onChange={(e) =>
                            updateProject(
                              proj.id,
                              "description",
                              e.target.value,
                            )
                          }
                          rows="3"
                          placeholder="Describe the project, your role, and key achievements..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Live Demo URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={proj.liveUrl}
                          onChange={(e) =>
                            updateProject(proj.id, "liveUrl", e.target.value)
                          }
                          placeholder="https://yourproject.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addProject}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  <Plus size={16} /> Add Another Project
                </button>
              </div>

              {/* Languages */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Languages
                </h3>

                {languages.map((lang) => (
                  <div key={lang.id} className="flex gap-2 mb-3 relative">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={lang.language}
                        onChange={(e) =>
                          updateLanguage(lang.id, "language", e.target.value)
                        }
                        placeholder="e.g. Nepali, English, Hindi"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <select
                        value={lang.proficiency}
                        onChange={(e) =>
                          updateLanguage(lang.id, "proficiency", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Select Proficiency</option>
                        <option value="Native">Native</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Professional Working">
                          Professional Working
                        </option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Basic">Basic</option>
                      </select>
                    </div>
                    {languages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLanguage(lang.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addLanguage}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 mt-2"
                >
                  <Plus size={16} /> Add Another Language
                </button>
              </div>

              {/* Resume Upload */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Upload Resume
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl text-lg cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Resume"}
              </button>
            </form>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Your resume will be reviewed before being published.
          </p>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default ResumeForm;
