export async function getCurrentSeeker() {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/jobseeker/me`, {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()

        if (!data.success) {
            throw Error("Unauthorized")
        }

        return data
    } catch (err) {
        console.error('Server error:', err)
        throw err
    }
}

export async function getJobs() {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobseeker/jobs`, {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()

        return data
    } catch (err) {
        console.error('Server error:', err)
        throw err
    }
}

export async function applyJob(id) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobseeker/apply/${id}`, {
            method: 'POST',
            credentials: 'include'
        })

        const data = await res.json()

        return data
    } catch (err) {
        console.error('Server error:', err)
        throw err
    }
}

export async function getAppliedJobs() {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobseeker/applied-jobs`, {
            method: 'GET',
            credentials: 'include'
        })

        const data = await res.json()

        return data
    } catch (err) {
        console.error('Server error:', err)
        throw err
    }
}