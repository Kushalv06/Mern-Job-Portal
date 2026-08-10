import { postJob } from "../../API/organization"
import { useNavigate } from "react-router-dom"
import { getCurrentOrganization } from "../../API/organization"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { startColdStartTimer } from "../../API/delayTimer.js"
import JobForm from "../../components/JobForm.jsx"

export default function JobPost() {
    const navigate = useNavigate()

    async function checkAuth() {
        const cancelColdStartTimer = startColdStartTimer()
        try {
            await getCurrentOrganization()
        }
        catch (err) {
            console.error(err)
            navigate('/organization/login')
            return
        }
        finally {
            cancelColdStartTimer()
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])


    async function handleForm(event) {
        event.preventDefault()

        const form = event.currentTarget

        const formData = new FormData(event.currentTarget)

        const jobTitle = formData.get('jobTitle').trim()
        const jobDescription = formData.get('jobDescription').trim()
        const location = formData.get('location').trim()
        const jobType = formData.get('jobType')
        const salary = formData.get('salary').trim()

        const cancelColdStartTimer = startColdStartTimer()
        try {
            const data = await postJob({ jobTitle, jobDescription, location, jobType, salary })

            if (data.success) {
                toast.success(data.message)
                form.reset()
            }
            else {
                if (data.message === 'Unauthorized') navigate("/organization/login")
                else toast.error(data.message)
            }

        }
        catch (err) {
            console.log(err)
        }
        finally {
            cancelColdStartTimer()
        }

    }
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Post a Job</h1>
                    <p className="mt-2 text-slate-600">Fill in the details below to create a new job posting.</p>
                </div>

                <JobForm onSubmit={handleForm} />
            </div>
        </main>
    )
}
