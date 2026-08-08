import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getApplicants, updateApplication } from "../../API/organization.js"
import { toast } from "react-toastify"
import { startColdStartTimer } from "../../API/delayTimer.js"
import ApplicantCard from "../../components/ApplicantCard.jsx"
import Loading from "../../components/Loading.jsx"
import { Link } from "react-router-dom"

export default function Applicants() {
    const { jobId } = useParams()
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)

    async function loadApplicants() {
        setLoading(true)
        const cancelColdStartTimer = startColdStartTimer()
        try {
            const data = await getApplicants(jobId)

            if (data.success) {
                setApplications(data.applicants)
                setJob(data.job)
            } else {
                if (data.message === 'Unauthorized') navigate('/organization/login')
                else toast.error(data.message)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
            cancelColdStartTimer()
        }
    }

    useEffect(() => {
        loadApplicants()
    }, [])

    async function updateStatus(applicationId, status) {
        const cancelColdStartTimer = startColdStartTimer()
        try {
            const data = await updateApplication(applicationId, status)

            if (data.success) {
                await loadApplicants()
            } else {
                if (data.message === 'Unauthorized') navigate('/organization/login')
                else toast.error(data.message)
            }
        } catch (err) {
            console.error(err)
        } finally {
            cancelColdStartTimer()
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-4xl">
                <Link
                    to="/organization/jobs"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
                >
                    ← Back to Manage Jobs
                </Link>
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Applicants
                    </h1>
                    <p className="mt-2 text-slate-600">
                        Review applications received for this job posting.
                    </p>
                </header>

                <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">
                        {job.jobTitle}
                    </h2>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                            {job.jobType}
                        </span>

                        <span>📍 {job.location}</span>

                        <span className="font-medium text-slate-800">
                            {job.salary}
                        </span>
                    </div>
                </div>

                {applications.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                        <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h2 className="mt-4 text-lg font-medium text-slate-900">No applicants yet</h2>
                        <p className="mt-1 text-slate-500">When someone applies to this job, they will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4" role="list" aria-label="Applicants list">
                        {applications.map((applicant) => (
                            <ApplicantCard
                                key={applicant._id}
                                applicationId={applicant._id}
                                job={applicant.jobId}
                                name={applicant.seekerId?.seekerName || 'Unknown'}
                                email={applicant.seekerId?.email || 'No email'}
                                appliedAt={applicant.createdAt}
                                status={applicant.status}
                                updateStatus={updateStatus}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}