export default function JobCard({ title, description, type, location, salary, postedAgo,onClick}) {
    return (
        <article onClick={onClick} className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{postedAgo}</p>
                </div>
                <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {type}
                </span>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-slate-600">{description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span>{location}</span>
                <span className="text-slate-300">|</span>
                <span className="mr-auto">Salary: {salary}</span>
                <p className="text-xs">Click to View</p>
            </div>
        </article>
    )
}