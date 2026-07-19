import LoginForm from "../../components/LoginForm.jsx"
import handleSeekerLogin from "../../authHandler/handleSeekerLogin.js"

export default function SeekerLogin() {
    return (
        <div className="flex flex-col justify-center items-center h-dvh bg-slate-50 px-4">
            <p className="mb-6 text-blue-500 text-2xl text-center font-bold">Login as Seeker to Find a Job</p>

            <LoginForm 
                emailPlaceholder={"jack123@gamil.com"}
                formHandler={handleSeekerLogin}
                registerLink={"/jobseeker/register"}
            />
        </div>
    )
}
