export async function getCurrentOrganization() {
    try {
        const res = await fetch(`http://${import.meta.env.VITE_API_DOMAIN}:8000/api/auth/organization/me`, {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()

        if (!data.success) {
            throw Error("Unauthorized")
        }

        return data
    } catch (err) {
        throw err
    }
}

export async function postJob(jobDetails) {
    try {
        const res = await fetch(`http://${import.meta.env.VITE_API_DOMAIN}:8000/api/organization/postjob`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(jobDetails)
        })

        const data = await res.json()
        return data
    }
    catch (err) {
        alert('Server error')
    }
}

export async function getJobs() {
    try {
        const res = await fetch(`http://${import.meta.env.VITE_API_DOMAIN}:8000/api/organization/jobs`, {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()
        return data
    }
    catch (err) {
        alert('Server error')
    }
}

