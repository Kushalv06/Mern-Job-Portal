import { useEffect, useState } from "react"
import { Outlet, useNavigate, NavLink } from "react-router-dom"
import { getCurrentSeeker } from "../API/seeker"
import { seekerSignOut } from "../API/auth"
import Loading from "../components/Loading.jsx"

export default function SeekerLayout(){
    const [seekerName, setSeekerName] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    async function loadSeeker() {
        try {
            const data = await getCurrentSeeker();
            setSeekerName(data.seekerName);
        }
        catch (err) {
            console.error(err);
            navigate("/jobseeker/login");
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        loadSeeker();
    }, []);

    async function handleSignOut() {
        try {
            const data = await seekerSignOut()

            if (data.success) {
                navigate('/')
            }
            else {
                alert(data.message)
            }
        }
        catch (err) {
            alert(err)
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <nav className="border-b border-slate-200 bg-white text-slate-800">
                <div className="mx-auto max-w-5xl px-4 py-3 sm:py-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-lg font-bold tracking-tight text-blue-600">Job-Portal</p>
                            <div className="flex items-center gap-3 sm:hidden">
                                <p className="max-w-32 truncate text-sm font-medium text-slate-700">{seekerName}</p>
                                <button onClick={handleSignOut} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer">Sign Out</button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:ml-6">
                            <NavLink to="/jobseeker/home" className={({ isActive }) =>
                                isActive
                                    ? "rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
                                    : "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                            }>
                                Home
                            </NavLink>

                            <NavLink to="/jobseeker/jobs-applied" className={({ isActive }) =>
                                isActive
                                    ? "rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
                                    : "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                            }>
                                Jobs Applied
                            </NavLink>
                        </div>

                        <div className="hidden items-center gap-3 sm:ml-auto sm:flex">
                            <p className="max-w-40 truncate text-sm font-medium text-slate-700">{seekerName}</p>
                            <button onClick={handleSignOut} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer">Sign Out</button>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet context={{ seekerName }} />
        </>
    )
}
