import { getCurrentOrganization,getJobs } from "../../API/organization"
import { orgSignOut } from "../../API/auth"
import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import JobCard from "../../components/JobCard"

export default function OrgDashboard() {
    const [orgName, setOrgName] = useState("")
    const [loading, setLoading] = useState(true)
    const [recentJobs,setRecentJobs] = useState([])
    const navigate = useNavigate()

    const recentJobCards = recentJobs.map(job=><JobCard 
                                                key={job._id}
                                                title={job.jobTitle}
                                                description={job.jobDescription}
                                                location={job.location}
                                                type={job.jobType}
                                                salary={job.salary}
                                                postedAgo={formatDistanceToNow(new Date(job.createdAt), {
                                                    addSuffix: true,
                                                    includeSeconds: true,
                                                })}
                                                toView={false}
                                                />)

    async function loadDashboard(){
        try{
            const [orgData,jobsData] = await Promise.all([
                getCurrentOrganization(),
                getJobs()
            ])
            setOrgName(orgData.orgName);
            setRecentJobs(jobsData.jobs.slice(0, 3));
        }
        catch(err){
            console.error(err)
            navigate('/organization/login')
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        loadDashboard()
    },[])

    async function handleSignOut() {
        try {
            const data = await orgSignOut()
            console.log(data)

            if (data.success) {
                console.log(data.message)
                navigate('/')
            }
            else {
                alert(data.message)
                console.log("Error signing out")
            }
        }
        catch (err) {
            alert(err)
        }
    }

    if (loading) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center bg-slate-50">
                    <p className="text-slate-600 text-xl font-medium">Loading...</p>
                </div>
            </>
        )
    }

    return (
        <>
            <nav className="border-b border-slate-200 bg-white text-slate-800">
                <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
                    <p className="mr-auto font-bold text-blue-600">Job-Portal</p>
                    <p className="mr-4 font-medium">{orgName}</p>
                    <button onClick={handleSignOut} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">Sign Out</button>
                </div>
            </nav>
            <main className="min-h-screen bg-slate-50 px-4 py-6">
                <div className="mx-auto max-w-5xl space-y-6">
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-2xl font-bold text-slate-900">{orgName}'s Dashboard</p>
                        <p className="mt-2 mb-6 text-slate-600">Manage your job posts and hiring activity.</p>
                        <Link to="/organization/job/post" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 active:scale-[0.97] cursor-pointer">Post a Job</Link>
                        <Link to="/organization/jobs" className="bg-blue-600 px-4 py-2 rounded-lg text-white font-medium ml-3 hover:bg-blue-700 active:scale-[0.97] cursor-pointer">Manage Jobs</Link>
                    </section>

                    <section className="mt-6 border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                        <p className="text-lg font-semibold text-slate-900">Recent Job posts</p>
                        <div className="mt-4 space-y-2 text-slate-700">
                            {recentJobCards.length === 0? <p>No recent job posts yet</p> : recentJobCards}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}