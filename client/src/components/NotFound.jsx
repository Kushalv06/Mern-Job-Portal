export default function NotFound({
    title = '404 Not Found',
    message = 'The resource you are looking for could not be found.'
}) {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <p className="text-4xl font-bold text-slate-900">{title}</p>
                <p className="mt-3 text-slate-600">{message}</p>
            </div>
        </main>
    )
}
