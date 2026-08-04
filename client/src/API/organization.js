export async function getCurrentOrganization() {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/organization/me`, {
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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/organization/jobs`, {
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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/organization/jobs`, {
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

export async function deleteJob(id) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/organization/job/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        const data = await res.json()
        return data
    }
    catch (err) {
        console.error(err)
        alert('Server error')
    }
}

export async function getApplicants(jobId) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/organization/job/${jobId}/applicants`, {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()
        return data
    }
    catch (err) {
        console.error(err)
        alert('Server error')
    }
}

export async function updateApplication(applicationId, status) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/organization/applications/${applicationId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ status })
        })

        const data = await res.json()
        return data
    }
    catch (err) {
        console.error(err)
        alert('Server error')
    }
}

