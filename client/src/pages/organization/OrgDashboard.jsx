import { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { getJobs } from '../../API/organization'
import JobCard from "../../components/JobCard"
import Loading from "../../components/Loading"

export default function OrgDashboard() {
    const [loading, setLoading] = useState(true)
    const [recentJobs, setRecentJobs] = useState([])
    const navigate = useNavigate()

    const context = useOutletContext();
    const orgName = context.orgName

    const recentJobCards = recentJobs.map(job => <JobCard
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
        footer={'Go to manage jobs to view'}
    />)

    async function loadDashboard() {
        try {
            const jobsData = await getJobs()
            setRecentJobs(jobsData.jobs.slice(0, 3))
        }
        catch (err) {
            console.error(err)
            navigate('/organization/login')
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadDashboard()
    }, [])


    if (loading) {
        <Loading />
    }

    return (
        <>
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
                            {loading ? <Loading /> : recentJobCards.length === 0 ? <p>No recent job posts yet</p> : recentJobCards}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}