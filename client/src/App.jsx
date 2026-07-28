import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import OrgLogin from './pages/organization/OrgLogin.jsx'
import OrgRegister from './pages/organization/OrgRegister.jsx'
import OrgDashboard from './pages/organization/OrgDashboard.jsx'
import JobPost from './pages/organization/JobPost.jsx'
import ManageJobs from './pages/organization/Jobs.jsx'
import SeekerLogin from './pages/jobseeker/SeekerLogin.jsx'
import SeekerRegister from './pages/jobseeker/SeekerRegister.jsx'
import './index.css'
import OrganizationLayout from './layouts/OrganizationLayout.jsx'

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
      </Route>
        <Route path="/jobseeker/login" element={<SeekerLogin />} />
        <Route path="/jobseeker/register" element={<SeekerRegister />} />
      </Routes>
    </>
  )
}

export default App
