import Resume from "../model/resumeFormModel.js";

const saveManualResume = async (req, res) => {
  try {
    const userId = req.user.id;
    if(!userId){
        res.json({success:false, message:"User doesnt exists"})
    }
    const {
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
      languages,
      resume,
    } = req.body;

    if (!fullName || !email || !phone || !location || !professionalSummary) {
      return res.status(400).json({
        success: false,
        message: "Missing required personal information",
      });
    }

    if (!technicalSkills || !softSkills) {
      return res.status(400).json({
        success: false,
        message: "Skills are required",
      });
    }

    const existingResume = await Resume.findOne({ userId });
    
    if (existingResume) {
      return res.status(400).json({
        success: false,
        message: "Resume already exists for this email. Use update feature instead.",
      });
    }

    // Create new resume with all data
    const newResume = new Resume({
    userId, 
      fullName,
      email,
      phone,
      location,
      portfolio: portfolio || "",
      professionalSummary,
      technicalSkills,
      softSkills,
      experiences: experiences || [],
      education: education || {},
      certifications: certifications || [],
      projects: projects || [],
      languages: languages || [],
      resume: resume || ""
    });

    // Save
    await newResume.save();

    res.status(201).json({
      success: true,
      message: "Resume saved successfully!",
      data: newResume
    });

  } catch (err) {
    console.error("Error saving resume:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save resume",
      error: err.message
    });
  }
};

const getUserManualResume = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    const resume = await Resume.findOne({ userId });
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: resume
    });
    
  } catch (err) {
    console.error("Error fetching resume:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
      error: err.message
    });
  }
};
export { saveManualResume, getUserManualResume };