import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getApplicants } from "../../API/organization.js"
import ApplicantCard from "../../components/ApplicantCard.jsx"
import Loading from "../../components/Loading.jsx"

export default function Applicants() {
    const { jobId } = useParams()
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    async function loadApplicants() {
        setLoading(true)
        try {
            const data = await getApplicants(jobId)

            if (data.success) {
                console.log(data.applicants)
                setApplications(data.applicants)
            } else {
                if (data.message === 'Unauthorized') navigate('/organization/login')
                else alert(data.message)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadApplicants()
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-4xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Applicants</h1>
                    <p className="mt-2 text-slate-600">People who have applied for this job</p>
                </header>

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
                                name={applicant.seekerId?.seekerName || 'Unknown'}
                                email={applicant.seekerId?.email || 'No email'}
                                appliedAt={applicant.createdAt}
                                status={applicant.status}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}