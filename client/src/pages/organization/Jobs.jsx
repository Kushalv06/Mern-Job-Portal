import { useState, useEffect } from "react"
import { getJobs } from "../../API/organization.js"
import JobCard from "../../components/JobCard.jsx"
import JobModal from "../../components/JobModal.jsx"
import { Link, useNavigate } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { deleteJob } from "../../API/organization.js"


export default function Jobs() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedJob, setSelectedJob] = useState(null)
    const navigate = useNavigate()

    async function init() {
        try {
            const data = await getJobs()

            if (data.success) {
                console.log(data.jobs)
                setJobs(data.jobs)
            }
            else {
                if (data.message === 'Unauthorized') navigate('/organization/login')
                else alert(data.message)
            }
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        init()
    }, [])

    function closeModal() {
        setSelectedJob(null)
    }

    function removeJob(id) {
        setJobs(prev => prev.filter(job => job._id !== id))
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-10">
                <div className="mx-auto max-w-3xl">
                    <p className="text-slate-600 text-center">Loading jobs...</p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Manage Jobs</h1>
                        <p className="mt-2 text-slate-600">Review and manage all your posted jobs.</p>
                    </div>
                    <Link to="/organization/job/post" className="self-start rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 active:scale-[0.97] cursor-pointer ">
                        Post a Job
                    </Link>
                </div>

                {jobs.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <p className="text-lg font-semibold text-slate-900">No jobs posted yet</p>
                        <p className="mt-2 text-slate-500">When you post a job, it will appear here.</p>
                        <Link to="/organization/job/post" className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 active:scale-[0.97] cursor-pointer">
                            Post your first job
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {jobs.map(job => (
                            <JobCard
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
                                onClick={() => setSelectedJob(job)}
                                footer={'Click to View / Delete'}
                            />
                        ))}
                    </div>
                )}

                {selectedJob && <JobModal
                    job={selectedJob}
                    close={closeModal}
                    refreshPage={removeJob}
                    action={'Delete'}
                    onAction={deleteJob}
                    actionLoading={'Deleting...'}
                    autoClose={true}
                />}
            </div>
        </main>
    )
}