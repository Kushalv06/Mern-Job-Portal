import RegisterForm from "../../components/RegisterForm"
import { orgRegister } from "../../API/auth"
import {  useNavigate } from 'react-router-dom'

export default function OrgRegister(){
    const navigate = useNavigate()
    async function handleForm(event){
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const orgName = formData.get("orgName")
        const email = formData.get("email").toLowerCase().trim()
        const password = formData.get("password")
        const confirmedPassword = formData.get("confirmedPassword")

        if (password !== confirmedPassword) {
            alert("Please ensure password and confirmed password are same")
            return
        }

        const orgCredentials = { orgName, email, password }

        try{
            const data = await orgRegister(orgCredentials)

            if (data.success) {
            navigate('/organization/dashboard')
            console.log("User registered")
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
            <p className="mb-6 text-blue-500 text-2xl text-center font-bold">Register as Organization to Hire</p>
            
            <RegisterForm
                formHandler={handleForm}
                nameLabel="Organization Name"
                nameFieldName="orgName"
                namePlaceholder="Ex: Google"
                emailPlaceholder="Ex: google123@gmail.com"
                loginLink="/organization/login"
            />
        </div>
    )
}
