import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true},

    company: { type: String,  required: true, trim: true,},

    location: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Full-Time", "Part-Time", "Internship", "Remote", "Hybrid"],
    },

    salary: {
      type: String,
      default: "Not Disclosed",
    },

    description: {
      type: String,
      required: true,
    },

    requirements: {
      type: String,
      default: "",
    },

  
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },

    isApproved: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true, 
  }
);

jobSchema.index({ title: "text", company: "text" });

const JobPost = mongoose.model("Job", jobSchema);

export default JobPost;