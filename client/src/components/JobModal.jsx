import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"


export default function JobModal({ job, close, action, onAction, actionLoading, afterSuccess, autoClose, action2, onAction2 }) {
    const [actionStarted, setActionStarted] = useState(false)

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') close()
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }

    }, [close])

    const postedAgo = formatDistanceToNow(new Date(job.createdAt), {
        addSuffix: true,
        includeSeconds: true
    })

    async function handler(id) {
        setActionStarted(true)
        try {
            const data = await onAction(id)

            if (data.success) {
                await afterSuccess(id)
                if(autoClose) close()
            }
            else {
                console.log(data.message)
            }
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setActionStarted(false)
        }

    }

    return (
        <div onClick={close} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <article onClick={e => e.stopPropagation()} className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
                    <div className="min-w-0">
                        <h3 className="text-2xl font-semibold text-slate-900">{job.jobTitle}</h3>
                        <p className="mt-2 text-sm text-slate-500">{postedAgo}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                            {job.jobType}
                        </span>
                        <button onClick={close} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 cursor-pointer">
                            ×
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto px-6 py-5">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span>{job.location}</span>
                        <span className="text-slate-300">|</span>
                        <span>Salary: {job.salary}</span>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm font-medium text-slate-900">Description</p>
                        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">{job.jobDescription}</p>
                    </div>
                    <div className="w-full flex">

                        <button onClick={() => handler(job._id)} disabled={job.applied || actionStarted} className={`bg-red-500 px-4 py-2 rounded-lg text-white font-medium mt-4 transition duration-75 mr-auto ${job.applied || actionStarted
                            ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                            : "cursor-pointer hover:bg-red-600 active:scale-[0.97]"}`}>{actionStarted ? actionLoading : action}</button>

                        {action2 && <button onClick={()=>onAction2(job._id)} className={`bg-green-600 px-4 py-2 ml-auto rounded-lg text-white font-medium mt-4 transition duration-75 
                        cursor-pointer hover:bg-green-700 active:scale-[0.97]`}>
                            {action2}
                        </button>}
                    </div>
                </div>
            </article >
        </div >

    )
}
