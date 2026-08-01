import { useOutletContext } from "react-router-dom"

export default function SeekerHome(){
    const context = useOutletContext()
    const seekerName = context.seekerName
    
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold text-slate-900">Hi, {seekerName}</h1>
                <p className="mt-2 text-slate-600">Find jobs that match your interests.</p>
            </div>
        </main>
    )
}
