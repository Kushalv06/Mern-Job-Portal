import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getJob, updateJob } from "../../API/organization.js"
import { startColdStartTimer } from "../../API/delayTimer.js"
import JobForm from "../../components/JobForm"
import Loading from "../../components/Loading.jsx"
import NotFound from "../../components/NotFound.jsx"

export default function EditJob() {
    const { jobId } = useParams()
    const navigate = useNavigate()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        async function loadJob() {
            setLoading(true)
            setNotFound(false)
            const cancelColdStartTimer = startColdStartTimer()

            try {
                const data = await getJob(jobId)
                console.log(data.job)

                if (data?.success) {
                    setJob(data.job)
                }
                else {
                    if (data?.message === 'Unauthorized') {
                        navigate('/organization/login')
                    }
                    else {
                        setNotFound(true)
                    }
                }
            }
            catch (err) {
                console.error(err)
                setNotFound(true)
            }
            finally {
                setLoading(false)
                cancelColdStartTimer()
            }
        }

        loadJob()
    }, [jobId])

    async function handleForm(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const jobDescription = formData.get('jobDescription').trim()
        const location = formData.get('location').trim()
        const jobType = formData.get('jobType')
        console.log(jobType)
        const salary = formData.get('salary').trim()

        setSubmitting(true)
        const cancelColdStartTimer = startColdStartTimer()

        try {
            const data = await updateJob(jobId, {
                jobDescription,
                location,
                jobType,
                salary
            })

            if (data?.success) {
                toast.success(data.message || 'Job updated successfully')
                navigate('/organization/jobs')
            }
            else {
                if (data?.message === 'Unauthorized') navigate('/organization/login')
                else if (data?.message === 'Job not found') setNotFound(true)
                else toast.error(data?.message || 'Failed to update job')
            }
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setSubmitting(false)
            cancelColdStartTimer()
        }
    }

    if (loading) {
        return <Loading />
    }

    if (notFound || !job) {
        return (
            <NotFound
                title="404 Not Found"
                message="The job you are trying to edit could not be found."
            />
        )
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-5">
            <Link
                    to="/organization/jobs"
                    className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
                >
                    ← Back to Manage Jobs
            </Link>
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Edit Job</h1>
                    <p className="mt-2 text-slate-600">Update the editable details for this job posting.</p>
                </div>

                <JobForm
                    jobTitle={job.jobTitle}
                    jobDescription={job.jobDescription}
                    location={job.location}
                    jobType={job.jobType}
                    salary={job.salary}
                    disableJobTitle={true}
                    submitLabel="Save Changes"
                    onSubmit={handleForm}
                    isSubmitting={submitting}
                />
            </div>
        </main>
    )
}
