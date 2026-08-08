import { useEffect, useState } from "react"
import { Outlet, useNavigate, NavLink } from "react-router-dom"
import { getCurrentOrganization } from "../API/organization"
import { orgSignOut } from "../API/auth"
import { toast } from "react-toastify"
import { startColdStartTimer } from "../API/delayTimer.js"
import Loading from "../components/Loading.jsx"

export default function OrganizationLayout() {
    const [orgName, setOrgName] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    async function loadOrganization() {
        const cancelColdStartTimer = startColdStartTimer()
        try {
            const data = await getCurrentOrganization();
            setOrgName(data.orgName);
        }
        catch (err) {
            console.error(err);
            navigate("/organization/login");
        }
        finally {
            setLoading(false)
            cancelColdStartTimer()
        }
    }

    useEffect(() => {
        loadOrganization();
    }, []);

    async function handleSignOut() {
        const cancelColdStartTimer = startColdStartTimer()
        try {
            const data = await orgSignOut()

            if (data.success) {
                navigate('/')
            }
            else {
                toast(data.message)
            }
        }
        catch (err) {
            toast(err)
        }
        finally {
            cancelColdStartTimer()
        }
    }

    function getNavLinkClass(isActive) {
        return isActive
            ? "rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
            : "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
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
                                <p className="max-w-32 truncate text-sm font-medium text-slate-700">{orgName}</p>
                                <button onClick={handleSignOut} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer">Sign Out</button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:ml-6">
                            <NavLink to="/organization/dashboard" className={({ isActive }) => getNavLinkClass(isActive)}>
                                Dashboard
                            </NavLink>

                            <NavLink to="/organization/job/post" className={({ isActive }) => getNavLinkClass(isActive)}>
                                Post Job
                            </NavLink>

                            <NavLink to="/organization/jobs" className={({ isActive }) => getNavLinkClass(isActive)}>
                                Manage Jobs
                            </NavLink>
                        </div>

                        <div className="hidden items-center gap-3 sm:ml-auto sm:flex">
                            <p className="max-w-40 truncate text-sm font-medium text-slate-700">{orgName}</p>
                            <button onClick={handleSignOut} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer">Sign Out</button>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet context={{ orgName }} />
        </>
    )
}
