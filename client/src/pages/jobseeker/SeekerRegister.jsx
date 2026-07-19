import RegisterForm from "../../components/RegisterForm"
import handleSeekerRegister from "../../authHandler/handleSeekerRegister"

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
