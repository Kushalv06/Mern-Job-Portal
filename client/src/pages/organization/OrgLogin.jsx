import LoginForm from "../../components/LoginForm.jsx"
import { orgLogin } from "../../API/auth.js"
import { useNavigate } from "react-router-dom"

export default function OrgLogin() {
    const navigate = useNavigate()

    async function handleForm(event){
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get("email").toLowerCase().trim()
        const password = formData.get("password")

        const orgCredentials = { email, password }

        try{
            const data = await orgLogin(orgCredentials)
    
            if (data.success) {
                console.log(data.message)
                navigate("/organization/dashboard")
            }
            else {
                alert(data.message)
            }
        }
        catch(err){
            alert("Server error")
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-dvh bg-slate-50 px-4">
            <p className="mb-6 text-blue-500 text-2xl text-center font-bold">Login as Organization to Hire</p>
            <LoginForm
                emailPlaceholder={"google123@gamil.com"}
                formHandler={handleForm}
                registerLink={"/organization/register"}
            />
        </div>
    )
}
