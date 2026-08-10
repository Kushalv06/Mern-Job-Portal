import {Link} from "react-router-dom"

export default function RegisterForm({formHandler, nameLabel, nameFieldName, namePlaceholder, emailPlaceholder, loginLink, isSubmitting=false}){
    return (
        <form onSubmit={formHandler} className="flex flex-col w-full max-w-sm px-5 py-4 border-none shadow-md rounded-xl bg-white">
                <label className="flex flex-col mb-4">
                    {nameLabel}
                    <input type="text" name={nameFieldName} placeholder={namePlaceholder} required className="border rounded-md my-1 px-2 py-1 border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-600 transition-all duration-200"></input>
                </label>
                <label className="flex flex-col mb-4">
                    Email:
                    <input type="email" name="email" placeholder={emailPlaceholder} required className="border rounded-md my-1 px-2 py-1 border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-600 transition-all duration-200"></input>
                </label>
                <label className="flex flex-col mb-4">
                    Password:
                    <input type="password" name="password" required className="border rounded-md my-1 px-2 py-1 border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-600 transition-all duration-200" ></input>
                </label>
                <label className="flex flex-col mb-4">
                    Confirm Password:
                    <input type="password" name="confirmedPassword" required className="border rounded-md my-1 px-2 py-1 border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-600 transition-all duration-200" ></input>
                </label>
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center bg-blue-400 px-10 py-3 my-2.5 font-semibold 
                    transition-all duration-200 rounded-lg cursor-pointer hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                    focus-visible:ring-blue-600 shadow-md text-white disabled:cursor-not-allowed disabled:bg-blue-300">
                    {isSubmitting ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                        "Register"
                    )}
                </button>
                <p className="text-center text-sm">Already have an account? <Link to={loginLink} className="text-blue-500"> Login</Link></p>
            </form>
    )
}
