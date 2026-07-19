import RegisterForm from "../../components/RegisterForm"
import handleOrgRegister from "../../authHandler/handleOrgRegister"
import {  useNavigate } from 'react-router-dom'

export default function OrgRegister(){
    const navigate = useNavigate()
    return (
        <div className="flex flex-col justify-center items-center h-dvh bg-slate-50 px-4">
            <p className="mb-6 text-blue-500 text-2xl text-center font-bold">Register as Organization to Hire</p>
            
            <RegisterForm
                formHandler={(event)=>handleOrgRegister(event,navigate)}
                nameLabel="Organization Name"
                nameFieldName="orgName"
                namePlaceholder="Ex: Google"
                emailPlaceholder="Ex: google123@gmail.com"
                loginLink="/organization/login"
            />
        </div>
    )
}
