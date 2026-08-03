import { formatDistanceToNow } from "date-fns"

export default function ApplicantCard({ applicationId, name, email, appliedAt, status, updateStatus }) {
    const statusStyles = {
        pending: "bg-yellow-100 text-yellow-800",
        accepted: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
    }

    const statusClass = statusStyles[status?.toLowerCase()] || "bg-slate-100 text-slate-700"

    const appliedAgo = formatDistanceToNow(appliedAt, {
        includeSeconds: true,
        addSuffix: true
    })

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">{name}</h3>
                    <p className="mt-1 text-sm text-slate-500 truncate">{email}</p>
                    <p className="mt-1 text-xs text-slate-400">Applied {appliedAgo}</p>
                </div>
                <div className="flex flex-col items-end">
                    <div className="mb-6 ml-auto">
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass}`}
                        >
                            {status}
                        </span>
                    </div>
                    {status?.toLowerCase() === 'pending' && (
                        <div className="flex shrink-0 gap-2">
                            <button onClick={() => updateStatus(applicationId, 'accepted')} className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 active:scale-[0.97] transition duration-75 cursor-pointer">
                                Accept
                            </button>
                            <button onClick={() => updateStatus(applicationId, 'rejected')} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 active:scale-[0.97] transition duration-75 cursor-pointer">
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}