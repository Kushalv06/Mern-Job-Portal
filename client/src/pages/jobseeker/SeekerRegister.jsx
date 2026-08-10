import RegisterForm from "../../components/RegisterForm"
import { seekerRegister } from "../../API/auth"
import { useNavigate,Link } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import { startColdStartTimer } from "../../API/delayTimer.js"

export default function SeekerRegister() {
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)

    async function handleSeekerRegister(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const seekerName = formData.get("seekerName")
        const email = formData.get("email").toLocaleLowerCase().trim()
        const password = formData.get("password")
        const confirmedPassword = formData.get("confirmedPassword")

        if (password !== confirmedPassword) {
            toast.warning("Please ensure password and confirmed password are same")
            return
        }

        setSubmitting(true)
        const cancelColdStartTimer = startColdStartTimer()
        try {
            const data = await seekerRegister({ seekerName, email, password })
            if (data.success) {
                console.log('Registered successfully')
                navigate('/jobseeker/home')
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error(err)
            console.error(err)
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
                    <p className="mb-6 text-blue-500 text-2xl text-center font-bold">Register as Seeker to Find a Job</p>
                    <RegisterForm
                        formHandler={handleSeekerRegister}
                        nameLabel="Name"
                        nameFieldName="seekerName"
                        namePlaceholder="Ex: Jack"
                        emailPlaceholder="Ex: jack123@gmail.com"
                        loginLink="/jobseeker/register"
                        isSubmitting={submitting}
                    />
                </div>

            </div>
        </div>
    )
}
