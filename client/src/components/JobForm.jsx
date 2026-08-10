export default function JobForm({
    onSubmit,
    jobTitle = "",
    jobDescription = "",
    location = "",
    jobType = "",
    salary = "",
    disableJobTitle = false,
    submitLabel = "Post Job",
    isSubmitting = false
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={onSubmit} className="space-y-5">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="jobTitle">Job Title</label>
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        defaultValue={jobTitle}
                        disabled={disableJobTitle}
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="jobDescription">Job Description</label>
                    <textarea
                        className="min-h-32 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        id="jobDescription"
                        name="jobDescription"
                        defaultValue={jobDescription}
                        required
                    ></textarea>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="location">Location</label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            id="location"
                            name="location"
                            type="text"
                            defaultValue={location}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="jobType">Job Type</label>
                        <select
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            id="jobType"
                            name="jobType"
                            defaultValue={jobType}
                            required
                        >
                            <option value="">Select job type</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Internship">Internship</option>
                            <option value="Contract">Contract</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-800" htmlFor="salary">Salary / Stipend</label>
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        id="salary"
                        name="salary"
                        type="text"
                        defaultValue={salary}
                        required
                    />
                </div>

                <button
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-blue-400 whitespace-nowrap shrink-0 w-36"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                        submitLabel
                    )}
                </button>
            </form>
        </div>
    )
}
