export default function JobModal({job,close}){
    document.addEventListener('keydown',e=>{
        if(e.key === 'Escape') close()
    })

    const postedAgo = Date.now() - new Date(job.createdAt)
    return (
        <div onClick={close} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <article onClick={e=>e.stopPropagation()} className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
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
                </div>
            </article>
        </div>
        
    )
}
