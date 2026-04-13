import JobPost from "../model/JobPostModel.js";

const jobPostHandler = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      location,
      type,
      salary,
      requirements,
    } = req.body;

    if (!title || !company || !description || !location || !type) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const job = await JobPost.create({
      title,
      company,
      description,
      location,
      type,
      salary,
      requirements,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword, type, location } = req.query;

    let query = { isApproved: true };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
      ];
    }

    if (type) query.type = type;
    if (location) query.location = { $regex: location, $options: "i" };

    const totalJobs = await JobPost.countDocuments(query);

    const jobs = await JobPost.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
      jobs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid Job ID format" 
      });
    }

    const job = await JobPost.findById(id);

    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: "Job not found" 
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (err) {
    console.error("getSingleJob Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyJobs = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const jobs = await JobPost.find({ postedBy: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (err) {
    console.error("getMyJobs Error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server Error",
      error: err.message 
    });
  }
};

export { jobPostHandler, getJobs, getSingleJob, getMyJobs };