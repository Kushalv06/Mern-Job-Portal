import LoginForm from "../../components/LoginForm.jsx"
import { seekerLogin } from "../../API/auth.js"
import { getCurrentSeeker } from "../../API/seeker.js"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function SeekerLogin() {
    const navigate = useNavigate()

    async function checkAuth(){
        try{
            const data = await getCurrentSeeker()
            if(data.success) navigate('/jobseeker/home')
        }
        catch(err){
            // User is not authenticated.
            // Stay on the login page.
        }
    }

    useEffect(()=>{
        checkAuth()
    },[])

    async function handleSeekerLogin(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get("email").toLowerCase().trim()
        const password = formData.get("password")

        try{
            const data = await seekerLogin({ email, password })

            if (data.success) {
                console.log('User logged in')
                navigate('/jobseeker/home')
            }
            else {
                alert(data.message)
            }
        }
        catch(err){
            console.error(err)
            alert(err)
        }
    }

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
