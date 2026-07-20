export async function getCurrentOrganization() {
    try {
        const res = await fetch('http://localhost:8000/api/auth/organization/me', {
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
