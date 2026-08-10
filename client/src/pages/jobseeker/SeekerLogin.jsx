import LoginForm from "../../components/LoginForm.jsx"
import { seekerLogin } from "../../API/auth.js"
import { getCurrentSeeker } from "../../API/seeker.js"
import { useNavigate,Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { startColdStartTimer } from "../../API/delayTimer.js"

export default function SeekerLogin() {
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)

    async function checkAuth() {
        const cancelColdStartTimer = startColdStartTimer()

        try {
            
            const data = await getCurrentSeeker()

            if (data.success) navigate('/jobseeker/home')
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

    async function handleSeekerLogin(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get("email").toLowerCase().trim()
        const password = formData.get("password")

        setSubmitting(true)
        const cancelColdStartTimer = startColdStartTimer()
        try {
            const data = await seekerLogin({ email, password })

            if (data.success) {
                console.log('User logged in')
                navigate('/jobseeker/home')
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            console.error(err)
            toast.error(err)
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
                    <p className="mb-6 text-center text-2xl font-bold text-blue-500">
                        Login as Seeker to Find a Job
                    </p>

                    <LoginForm
                        emailPlaceholder="jack123@gamil.com"
                        formHandler={handleSeekerLogin}
                        registerLink="/jobseeker/register"
                        isSubmitting={submitting}
                    />
                </div>

            </div>
        </div>
    )
}
