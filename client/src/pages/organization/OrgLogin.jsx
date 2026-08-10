import LoginForm from "../../components/LoginForm.jsx"
import { getCurrentOrganization } from "../../API/organization.js"
import { orgLogin } from "../../API/auth.js"
import { useNavigate,Link } from "react-router-dom"
import { useState,useEffect } from "react"
import { toast } from "react-toastify"
import { startColdStartTimer } from "../../API/delayTimer.js"

export default function OrgLogin() {
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)

    async function checkAuth() {
        const cancelColdStartTimer = startColdStartTimer()
        try {
            const data = await getCurrentOrganization()
            if (data.success) navigate('/organization/dashboard')
        }
        catch (err) {
            // User is not authenticated.
            // Stay on the login page.
        }
        finally{
            cancelColdStartTimer()
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    async function handleForm(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get("email").toLowerCase().trim()
        const password = formData.get("password")

        const orgCredentials = { email, password }
        setSubmitting(true)
        const cancelColdStartTimer = startColdStartTimer()

        try {
            const data = await orgLogin(orgCredentials)

            if (data.success) {
                console.log(data.message)
                navigate("/organization/dashboard")
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error("Server error")
        }
        finally{
            setSubmitting(false)
            cancelColdStartTimer()
        }
    }

    return (
        <div className="h-dvh overflow-hidden bg-slate-50">
            <div className="mx-auto flex h-full w-[85%] max-w-300 flex-col">

                <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
                >
                    ← Back to Home page
                </Link>

                <div className="flex flex-1 flex-col items-center justify-center">
                    <p className="mb-6 text-blue-500 text-2xl text-center font-bold">Login as Organization to Hire</p>
                    <LoginForm
                        emailPlaceholder={"google123@gamil.com"}
                        formHandler={handleForm}
                        registerLink={"/organization/register"}
                        isSubmitting={submitting}
                    />
                </div>
            </div>
        </div>
    )
}
