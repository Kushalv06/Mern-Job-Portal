import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAppliedJobs } from "../../API/seeker.js"
import Application from "../../components/Application.jsx"
import { toast } from "react-toastify"
import { startColdStartTimer } from "../../API/delayTimer.js"
import Loading from "../../components/Loading.jsx"

export default function JobsApplied() {
    const [applicationsData, setApplicationsData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    async function loadApplications() {
        setLoading(true)
        const cancelColdStartTimer = startColdStartTimer()
        try {
            const data = await getAppliedJobs()
            if (data.success) {
                setApplicationsData(data.appliedJobs)
            } else {
                if (data.message === 'Unauthorized') navigate('/jobseeker/login')
                else toast(data.message)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
            cancelColdStartTimer()
        }
    }

    useEffect(() => {
        loadApplications()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-4xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Jobs Applied</h1>
                    <p className="mt-2 text-slate-600">Track the status of your applications</p>
                </header>

                {applicationsData.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                        <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        <h2 className="mt-4 text-lg font-medium text-slate-900">No applications yet</h2>
                        <p className="mt-1 text-slate-500">Jobs you apply to will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4" role="list" aria-label="Applied jobs">
                        {applicationsData.map((app) => (
                            <Application
                                key={app._id}
                                job={app.jobId}
                                company={app.jobId?.postedBy?.orgName || "Unknown Company"}
                                appliedAt={app.createdAt}
                                status={app.status}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}