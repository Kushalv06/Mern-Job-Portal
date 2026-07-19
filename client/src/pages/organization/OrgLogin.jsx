import LoginForm from "../../components/LoginForm.jsx"
import handleOrgLogin from "../../authHandler/handleOrgLogin.js"
import { useNavigate } from "react-router-dom"

export default function OrgLogin() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col justify-center items-center h-dvh bg-slate-50 px-4">
            <p className="mb-6 text-blue-500 text-2xl text-center font-bold">Login as Organization to Hire</p>
            <LoginForm
                emailPlaceholder={"google123@gamil.com"}
                formHandler={(event)=>handleOrgLogin(event,navigate)}
                registerLink={"/organization/register"}
            />
        </div>
    )
}