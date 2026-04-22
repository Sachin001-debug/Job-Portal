import React from 'react'
import Home from './home/Home'
import LoginSignup from './home/LoginSignup'
import { Route, Routes } from 'react-router-dom'
//Dashboard
import JobSeeker from './dashboard/JobSeeker'
import Employer from './dashboard/Employer'
//pages
import PostJob from './pages/EmployerPages/PostJob'
import DisplayJobs from './pages/JobseekerPages/DisplayJobs'
import ApplyJob from './pages/JobseekerPages/ApplyJob'
import ManageApplication from './pages/EmployerPages/ManageApplication'
import ViewAnalytics from './pages/EmployerPages/ViewAnalytics'
import DisplayJoobseeker from './pages/EmployerPages/DisplayJoobseeker'
import ApplicationStatus from './pages/JobseekerPages/ApplicationStatus'
import Profile from './shared/Profile'
import ResumeForm from './pages/JobseekerPages/ResumeForm'
import DisplayResume from './pages/JobseekerPages/DisplayResume'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginSignup />} />

      {/*Jobseeker Dashboard */}
      <Route path="/dashboard/jobseeker" element={<JobSeeker/>} />
     <Route path='/dashboard/jobseeker/jobs' element={<DisplayJobs/>}/>
     <Route path='/dashboard/jobseeker/jobs/apply/:id' element={<ApplyJob/>}/>
     <Route path='/dashboard/jobseeker/application' element={<ApplicationStatus/>}/>
     <Route path='/dashboard/jobseeker/resume-form' element={<ResumeForm/>}/>
       <Route path='/dashboard/jobseeker/display/resume-form' element={<DisplayResume/>}/>
      {/*Employer Dashbaord */}
      <Route path="/dashboard/employer" element={<Employer/>} />
      <Route path='/dashboard/employer/postjob' element={<PostJob/>}/>
      <Route path='/dashboard/employer/applications' element={<ManageApplication/>}/>
      <Route path='/dashboard/employer/analytics' element={<ViewAnalytics/>}/>

      {/*Shared */}
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
      
    </>
  )
}

export default App
