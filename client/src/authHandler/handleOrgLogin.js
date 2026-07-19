export default async function handleOrgLogin(event,navigate) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email").toLowerCase().trim()
    const password = formData.get("password")

    const user = { email, password }

    try{
        const res = await fetch("http://localhost:8000/api/auth/organization/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(user)
        })
    
        const data = await res.json()
    
        if (res.ok) {
            console.log(data.message)
            navigate("/organization/dashboard")
        }
        else {
            alert(data.message)
        }
    }
    catch(err){
        console.log(err)
        alert(`Server error`)
    }

}
