import NavigationButton from "../components/NavigationButton"

export default function Home() {
    return (
        <div className="flex flex-col bg-blue-400 text-white h-dvh w-full justify-center items-center px-4">

            <p className="text-5xl sm:text-6xl text-center font-black">Job-Portal</p>
            <p className="sm:text-xl text-center mb-16">Connect with top companies</p>

            <NavigationButton to="/jobseeker/login">Find a job</NavigationButton>
            <NavigationButton to="/organization/login">Hire Talent</NavigationButton>

        </div>
    )
}