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
      user: req.user._id,
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
      user: req.user._id,
    });

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

const getMyapplication = async (req, res) => {
  try {
    const userId = req.user._id;

    const applications = await ApplyJob.find({ user: userId })
      .populate("job", "title company location type")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { applyJob, getMyapplication };