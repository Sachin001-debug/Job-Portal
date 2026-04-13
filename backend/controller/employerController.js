import ApplyJob from "../model/applyJobModel.js";
import JobPost from "../model/JobPostModel.js";
import sendEmail from "../utils/sendEmail.js";

export const getJobApplications = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    if (!jobId) {
      return res.status(400).json({ success: false, message: "Job ID is required" });
    }

    // Find the job
    const job = await JobPost.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    console.log("Logged in Employer ID:", req.user._id.toString());
    console.log("Job Posted By ID:", job.postedBy.toString());

    // Authorization - only the employer who posted the job can view applications
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: "You are not authorized to view applications for this job" 
      });
    }

    // Fetch applications + populate job details (optional but useful)
    const applications = await ApplyJob.find({ job: jobId })
      .sort({ createdAt: -1 });   // newest first

    console.log(`Found ${applications.length} application(s) for job ${jobId}`);

    res.status(200).json({ 
      success: true, 
      count: applications.length,
      jobTitle: job.title,
      applications 
    });

  } catch (err) {
    console.error("getJobApplications Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching applications" 
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { appId } = req.params;
    const { status } = req.body; // "approved" or "rejected"

    const application = await ApplyJob.findById(appId).populate("job");
    if (!application)
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });

    // Check if employer owns the job
    if (application.job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    application.status = status;
    await application.save();

   //SEND MAIL 
   const jobTitle = application.job.title;
   const companyName = application.job.company;

    let subject = "";
    let html = "";

    if (status === "approved") {
      subject = `Congratulations! Your application has been approved`;
      html = `
        <h2>Congratulations ${application.name}!</h2>
        <p>Your application for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been <strong>APPROVED</strong>.</p>
        <p>We will contact you soon regarding the next steps.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>HireNepal Team</strong></p>
      `;
    } else {
      subject = `Update on your job application`;
      html = `
        <h2>Dear ${application.name},</h2>
        <p>We regret to inform you that your application for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been <strong>REJECTED</strong>.</p>
        <p>Thank you for applying. We encourage you to apply for other suitable positions on HireNepal.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>HireNepal Team</strong></p>
      `;
    }

    await sendEmail({
      email: application.email,
      subject,
      html,
    });

    console.log(`Email sent to ${application.email} - Status: ${status}`);

    res.status(200).json({ 
      success: true, 
      message: `Application ${status} successfully and email sent.` 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllEmployerApplications = async (req, res) => {
  try {
    const employerId = req.user._id;

    const applications = await ApplyJob.find({
      job: { $in: await JobPost.find({ postedBy: employerId }).select('_id') }
    })
    .populate('job', 'title company location')   
    .sort({ createdAt: -1 });

    res.json({ success: true, applications });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};