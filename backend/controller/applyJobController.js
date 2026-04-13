import ApplyJob from "../model/applyJobModel.js";

const applyJob = async (req, res) => {
  try {
    const { name, email, jobId } = req.body;
    const resumeFile = req.file;

    if (!name || !email || !jobId || !resumeFile) {
      return res.status(400).json({
        success: false,
        message: "All fields including resume are required",
      });
    }

    const alreadyApplied = await ApplyJob.findOne({
      email,
      job: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You already applied for this job",
      });
    }

    const resumePath = `/uploads/resumes/${resumeFile.filename}`;

    const application = await ApplyJob.create({
      name,
      email,
      job: jobId,
      resume: resumePath,
    });
    console.log("Incoming jobId:", jobId);

    res.status(201).json({
      success: true,
      message: "Applied successfully",
      application,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export default applyJob