import RegisterForm from "../../components/RegisterForm"
import { seekerRegister } from "../../API/auth"

async function handleSeekerRegister(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const seekerName = formData.get("seekerName")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmedPassword = formData.get("confirmedPassword")

    if (password !== confirmedPassword) {
        alert("Please ensure password and confirmed password are same")
        return
    }

    await seekerRegister({ seekerName, email, password })
}

export default function SeekerRegister(){
    return (
        <div className="flex flex-col justify-center items-center h-dvh bg-slate-50 px-4">
            <p className="mb-6 text-blue-500 text-2xl text-center font-bold">Register as Seeker to Find a Job</p>
            <RegisterForm
                formHandler={handleSeekerRegister}
                nameLabel="Name"
                nameFieldName="seekerName"
                namePlaceholder="Ex: Jack"
                emailPlaceholder="Ex: jack123@gmail.com"
                loginLink="/jobseeker/login"
            />
        </div>
    )
}
