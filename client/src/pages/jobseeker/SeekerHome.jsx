import { useEffect, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import JobCard from "../../components/JobCard.jsx"
import JobModal from "../../components/JobModal.jsx"
import { getJobs, applyJob } from "../../API/seeker"
import { toast } from "react-toastify"
import { startColdStartTimer } from "../../API/delayTimer.js"

export default function SeekerHome() {
    const context = useOutletContext()
    const seekerName = context.seekerName
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedJob, setSelectedJob] = useState(null)
    const [appliedJobs, setAppliedJobs] = useState(new Set())

    async function fetchJobs() {
        const cancelColdStartTimer = startColdStartTimer()
        try {
            const data = await getJobs()

            if (data.success) {
                setJobs(data.jobs)
                const applied = new Set(data.appliedJobs.map(j => j.jobId))
                setAppliedJobs(applied)
            }
            else {
                if (data.message === 'Unauthorized') navigate('/jobseeker/login')
                else toast.error(data.message)
            }
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setLoading(false)
            cancelColdStartTimer()
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    function closeModal() {
        setSelectedJob(null)
    }

    async function refreshPage() {
        setSelectedJob(prev => ({ ...prev, applied: true }))
        await fetchJobs()
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold text-slate-900">Hi, {seekerName}</h1>
                <p className="mt-2 text-slate-600">Find jobs that match your interests.</p>

                <div className="mt-8">
                    {loading ? (
                        <p className="text-slate-600">Loading jobs...</p>
                    ) : jobs.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                            <p className="text-lg font-semibold text-slate-900">No jobs available right now</p>
                            <p className="mt-2 text-slate-500">Check back later for new opportunities.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {jobs.map(job => {
                                job.applied = appliedJobs.has(job._id)
                                return <JobCard
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
                                    company={job.postedBy?.orgName}
                                    onClick={() => setSelectedJob(job)}
                                    footer={job.applied ? 'Applied' : 'Click to View / Apply'}
                                />
                            })}
                        </div>
                    )}
                </div>

                {selectedJob && <JobModal
                    job={selectedJob}
                    close={closeModal}
                    action={selectedJob.applied ? 'Applied' : 'Apply'}
                    onAction={applyJob}
                    actionLoading={'Applying...'}
                    afterSuccess={refreshPage}
                    autoClose={false}
                />}
            </div>
        </main>
    )
}
