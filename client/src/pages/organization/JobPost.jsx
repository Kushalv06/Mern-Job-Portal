import { postJob } from "../../API/organization"
import { useNavigate } from "react-router-dom"
import { getCurrentOrganization } from "../../API/organization"
import { useEffect } from "react"

export default function JobPost() {
    const navigate = useNavigate()

    async function checkAuth(){
        try{
            await getCurrentOrganization()
        }
        catch(err){
            console.error(err)
            navigate('/organization/login')
            return
        }
    }

    useEffect(()=>{
        checkAuth()
    },[])


    async function handleForm(event) {
        event.preventDefault()

        const form = event.currentTarget

        const formData = new FormData(event.currentTarget)

        const jobTitle = formData.get('jobTitle').trim()
        const jobDescription = formData.get('jobDescription').trim()
        const location = formData.get('location').trim()
        const jobType = formData.get('jobType')
        const salary = formData.get('salary').trim()

        try {
            const data = await postJob({ jobTitle, jobDescription, location, jobType, salary })

            if (data.success) {
                alert(data.message)
                form.reset()
            }
            else {
                console.log(data.message)
                if(data.message === 'Unauthorized') navigate("/organization/login")
                else alert(data.message)
            }

        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Post a Job</h1>
                    <p className="mt-2 text-slate-600">Fill in the details below to create a new job posting.</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <form onSubmit={handleForm} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="jobTitle">Job Title</label>
                            <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" id="jobTitle" name="jobTitle" type="text" required />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="jobDescription">Job Description</label>
                            <textarea className="min-h-32 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" id="jobDescription" name="jobDescription" required></textarea>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="location">Location</label>
                                <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" id="location" name="location" type="text" required />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="jobType">Job Type</label>
                                <select className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" id="jobType" name="jobType" required>
                                    <option value="">Select job type</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="salary">Salary / Stipend</label>
                            <input className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" id="salary" name="salary" type="text" required />
                        </div>

                        <button className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-[0.99]" type="submit">Post Job</button>
                    </form>
                </div>
            </div>
        </main>
    )
}
