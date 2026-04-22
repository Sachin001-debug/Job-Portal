import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Edit, Briefcase, GraduationCap, Award, FolderGit2, Languages, User, Mail, Phone, MapPin, Globe, FileText, Code, Star } from 'lucide-react';
import axios from 'axios';

const DisplayResume = () => {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const API = import.meta.env.VITE_API;

    const fetchResume = async () => {
        try {
            const token = localStorage.getItem("token");
            
            if (!token) {
                toast.error("Please login first");
                setLoading(false);
                return;
            }

            const res = await axios.get(`${API}/jobseeker/user-manual-resume`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.data.success) {
                setResume(res.data.data);
                console.log("Resume fetched successfully", res.data.data);
            }
        } catch (err) {
            console.error("Error fetching resume:", err);
            if (err.response) {
                toast.error(err.response.data.message || "Failed to fetch resume");
            } else if (err.request) {
                toast.error("No response from server");
            } else {
                toast.error("Request failed");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchResume();
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-600">Loading resume...</div>
            </div>
        );
    }

    if (!resume) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">No resume found</p>
                    <button 
                        onClick={() => window.location.href = '/dashboard/jobseeker/display/resume-form'}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Create Resume
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">My Resume</h1>
                    <p className="text-gray-600 mt-2">View and manage your professional profile</p>
                </div>

                {/* Personal Information Card */}
                <div className="bg-white border-3 border-purple-500 rounded-xl shadow mb-6 overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                        </div>
                        <button
                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit size={16} /> Edit
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem icon={<User size={18} />} label="Full Name" value={resume.fullName} />
                            <InfoItem icon={<Mail size={18} />} label="Email" value={resume.email} isEmail />
                            <InfoItem icon={<Phone size={18} />} label="Phone" value={resume.phone} />
                            <InfoItem icon={<MapPin size={18} />} label="Location" value={resume.location} />
                            <InfoItem icon={<Globe size={18} />} label="Portfolio" value={resume.portfolio} isLink />
                            <InfoItem icon={<FileText size={18} />} label="Professional Summary" value={resume.professionalSummary} isMultiline />
                        </div>
                    </div>
                </div>

                {/* Skills Card */}
                <div className="bg-white border-3 border-purple-500 rounded-xl shadow mb-6 overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Code className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                        </div>
                        <button 
                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit size={16} /> Edit
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-gray-600 block mb-2">Technical Skills</label>
                            <div className="flex flex-wrap gap-2">
                                {resume.technicalSkills?.split(',').map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-600 block mb-2">Soft Skills</label>
                            <div className="flex flex-wrap gap-2">
                                {resume.softSkills?.split(',').map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Work Experience Card */}
                <div className="bg-white border-3 border-purple-500 rounded-xl shadow mb-6 overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
                        </div>
                        <button
                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit size={16} /> Edit
                        </button>
                    </div>
                    <div className="p-6">
                        {resume.experiences?.map((exp, index) => (
                            <div key={index} className="mb-6 last:mb-0 p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-800 text-lg">{exp.jobTitle}</h3>
                                <p className="text-gray-600">{exp.company}</p>
                                <p className="text-gray-500 text-sm">{exp.startDate} - {exp.endDate}</p>
                                <p className="text-gray-700 text-sm mt-2 whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Card */}
                <div className=" border-3 border-purple-500 bg-white rounded-xl shadow mb-6 overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                        </div>
                        <button
                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit size={16} /> Edit
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem label="Degree" value={resume.education?.degree} />
                            <InfoItem label="Institution" value={resume.education?.institution} />
                            <InfoItem label="Year of Completion" value={resume.education?.year} />
                            <InfoItem label="GPA/Percentage" value={resume.education?.gpa} />
                        </div>
                    </div>
                </div>

                {/* Certifications Card */}
                <div className="border-3 border-purple-500 bg-white rounded-xl shadow mb-6 overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
                        </div>
                        <button
                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit size={16} /> Edit
                        </button>
                    </div>
                    <div className="p-6">
                        {resume.certifications?.length > 0 ? (
                            resume.certifications.map((cert, index) => (
                                <div key={index} className="mb-4 last:mb-0 p-3 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                                    <p className="text-gray-600 text-sm">{cert.organization}</p>
                                    <p className="text-gray-500 text-xs">Date: {cert.date}</p>
                                    {cert.credentialId && <p className="text-gray-500 text-xs">ID: {cert.credentialId}</p>}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No certifications added</p>
                        )}
                    </div>
                </div>

                {/* Projects Card */}
                <div className=" border-3 border-purple-500 bg-white rounded-xl shadow mb-6 overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FolderGit2 className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
                        </div>
                        <button 
                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit size={16} /> Edit
                        </button>
                    </div>
                    <div className="p-6">
                        {resume.projects?.length > 0 ? (
                            resume.projects.map((project, index) => (
                                <div key={index} className="mb-6 last:mb-0 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold text-gray-800 text-lg">{project.name}</h3>
                                    <div className="flex flex-wrap gap-2 my-2">
                                        {project.technologies?.split(',').map((tech, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-gray-700 text-sm mt-2">{project.description}</p>
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
                                           className="text-blue-600 text-sm hover:underline mt-2 inline-block">
                                            View Project →
                                        </a>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No projects added</p>
                        )}
                    </div>
                </div>

                {/* Languages Card */}
                <div className="border-3 border-purple-500 bg-white rounded-xl shadow mb-6 overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Languages className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Languages</h2>
                        </div>
                        <button
                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit size={16} /> Edit
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-wrap gap-3">
                            {resume.languages?.map((lang, index) => (
                                <div key={index} className="px-4 py-2 bg-gray-50 rounded-lg">
                                    <span className="font-medium text-gray-800">{lang.language}</span>
                                    <span className="text-gray-500 text-sm ml-2">({lang.proficiency})</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <section className=' flex items-center flex-col'>
              <p>Facing Issue in resume? Feel free to contact us and we will be right there.</p>
              <div className='flex items-center gap-3'>
                <Mail size={18} className='text-yellow-700'/>
                <p>Email: <span  className='text-blue-700'>support@hirenepal.com</span></p>
              </div>

              <div className='flex items-center gap-3'>
                <Phone size={18} className='text-red-700'/>
                <p>PhoneNumber: <span className='text-blue-500'>support@hirenepal.com</span></p>
              </div>

              <div  className='text-gray-500 mt-4'>@HireNepal. All right reserved.</div>
            </section>
            <ToastContainer />
        </div>
    );
};

// Reusable Info Item Component
const InfoItem = ({ icon, label, value, isEmail, isLink, isMultiline }) => {
    if (!value) return null;
    
    if (isEmail) {
        return (
            <div className="flex items-start gap-3 p-2">
                {icon && <div className="text-gray-400 mt-0.5">{icon}</div>}
                <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <a href={`mailto:${value}`} className="text-gray-800 hover:text-blue-600 break-words">
                        {value}
                    </a>
                </div>
            </div>
        );
    }
    
    if (isLink) {
        return (
            <div className="flex items-start gap-3 p-2">
                {icon && <div className="text-gray-400 mt-0.5">{icon}</div>}
                <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <a href={value} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline break-words">
                        {value}
                    </a>
                </div>
            </div>
        );
    }
    
    return (
        <div className={`flex items-start gap-3 p-2 ${isMultiline ? '' : ''}`}>
            {icon && <div className="text-gray-400 mt-0.5">{icon}</div>}
            <div className="flex-1">
                <p className="text-sm text-gray-500">{label}</p>
                <p className={`text-gray-800 ${isMultiline ? 'whitespace-pre-line' : 'break-words'}`}>
                    {value}
                </p>
            </div>
        </div>
    );
};

export default DisplayResume;