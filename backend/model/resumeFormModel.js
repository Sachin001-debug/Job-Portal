import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  // Personal Information
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true},
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],},
  phone: { type: String, required: true },
  location: { type: String, required: true },
  portfolio: { type: String, required: false },
  professionalSummary: { type: String, required: true },

  // Skills
  technicalSkills: { type: String, required: true },
  softSkills: { type: String, required: true },

  // Work Experience 
  experiences: [
    {
      jobTitle: { type: String, required: true },
      company: { type: String, required: true },
      startDate: { type: String, required: true },
      endDate: { type: String, required: true },
      description: { type: String, required: true }
    }
  ],

  // Education (Single object)
  education: {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: true },
    gpa: { type: String, required: false }
  },

  // Certifications 
  certifications: [
    {
      name: { type: String, required: true },
      organization: { type: String, required: true },
      date: { type: String, required: true },
      credentialId: { type: String, required: false }
    }
  ],

  // Projects 
  projects: [
    {
      name: { type: String, required: true },
      technologies: { type: String, required: true },
      description: { type: String, required: true },
      liveUrl: { type: String, required: false }
    }
  ],

  // Languages 
  languages: [
    {
      language: { type: String, required: true },
      proficiency: { 
        type: String, 
        enum: ["Native", "Fluent", "Professional Working", "Intermediate", "Basic"],
        required: true 
      }
    }
  ],

  // Resume file path
  resume: { type: String, required: false },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


export default mongoose.model("Resume", resumeSchema);