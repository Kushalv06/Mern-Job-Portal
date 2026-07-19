export default async function handleOrgRegister(event, navigate) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const orgName = formData.get("orgName")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmedPassword = formData.get("confirmedPassword")

    if (password !== confirmedPassword) {
        alert("Please ensure password and confirmed password are same")
        return
    }

    const orgDetails = { orgName, email, password }


    try {
        const res = await fetch('http://localhost:8000/api/auth/organization/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(orgDetails)
        })

        const data = await res.json()

        if (res.ok) {
            navigate('/organization/dashboard')
            console.log("User registered")
        }
        else {
            alert(data.message)
        }
    } catch (err) {
        console.error('Server error:', err)
        alert('Server error')
    }


}
