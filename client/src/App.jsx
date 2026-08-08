import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import OrgLogin from './pages/organization/OrgLogin.jsx'
import OrgRegister from './pages/organization/OrgRegister.jsx'
import OrgDashboard from './pages/organization/OrgDashboard.jsx'
import OrganizationLayout from './layouts/OrganizationLayout.jsx'
import JobPost from './pages/organization/JobPost.jsx'
import ManageJobs from './pages/organization/Jobs.jsx'
import Applicants from './pages/organization/Applicants.jsx'

import SeekerLogin from './pages/jobseeker/SeekerLogin.jsx'
import SeekerRegister from './pages/jobseeker/SeekerRegister.jsx'
import SeekerHome from './pages/jobseeker/SeekerHome.jsx'
import JobsApplied from './pages/jobseeker/JobsApplied.jsx'
import SeekerLayout from './layouts/SeekerLayout.jsx'
import './index.css'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/organization/login" element={<OrgLogin />} />
        <Route path="/organization/register" element={<OrgRegister />} />

        <Route path="/organization" element={<OrganizationLayout />}>
          <Route path="dashboard" element={<OrgDashboard />} />
          <Route path="job/post" element={<JobPost />} />
          <Route path="jobs" element={<ManageJobs />} />
          <Route path="jobs/:jobId/applicants" element={<Applicants />} />
        </Route>

        <Route path="/jobseeker/login" element={<SeekerLogin />} />
        <Route path="/jobseeker/register" element={<SeekerRegister />} />

        <Route path="/jobseeker" element={<SeekerLayout />}>
            <Route path="home" element={<SeekerHome />} />
            <Route path="jobs-applied" element={<JobsApplied />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
