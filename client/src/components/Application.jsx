import { formatDistanceToNow } from "date-fns"

const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    default: "bg-slate-100 text-slate-700"
}

export default function Application({ job, company, appliedAt, status }) {
    const appliedAgo = formatDistanceToNow(new Date(appliedAt), {
        includeSeconds: true,
        addSuffix: true
    })

    const statusClass = statusStyles[status?.toLowerCase()] || statusStyles.default

    if (!job) {
        return (
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-slate-200 animate-pulse" />
                        <div>
                            <div className="h-4 w-32 rounded bg-slate-200 animate-pulse" />
                            <div className="mt-1 h-3 w-24 rounded bg-slate-200 animate-pulse" />
                        </div>
                    </div>
                    <span className="rounded-full px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600">
                        No longer available
                    </span>
                </div>
                <p className="mt-4 text-sm text-slate-500">
                    This job post was removed by the employer.
                </p>
                <p className="mt-2 text-xs text-slate-400">Applied {appliedAgo}</p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="bg-slate-200 h-4 w-24 rounded animate-pulse" />
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1 ml-auto">
                        
                        <span className="bg-slate-200 h-4 w-20 rounded animate-pulse" />
                    </span>
                </div>

                <div className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-400 animate-pulse">
                        <span className="bg-slate-200 h-3 w-16 rounded-full" />
                    </span>
                </div>
            </article>
        )
    }

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-blue-700 truncate">{company}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900 truncate">{job.jobTitle}</h3>
                    <p className="mt-1 text-sm text-slate-500">Applied {appliedAgo}</p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}>
                    {status || "Pending"}
                </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1 ml-auto">
                    {job.salary && `${job.salary.toString().replace(/(\d)(?=(\d{2})+\d$)/g, '$1,')}`}
                </span>
            </div>

            {job.jobType && (
                <div className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        {job.jobType}
                    </span>
                </div>
            )}
        </article>
    )
}