export async function orgLogin(credentials) {
    try {
        const res = await fetch(`http://${import.meta.env.VITE_API_DOMAIN}:8000/api/auth/organization/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(credentials)
        })

        const data = await res.json()

        return data
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export async function orgRegister(credentials) {
    try {
        const res = await fetch(`http://${import.meta.env.VITE_API_DOMAIN}:8000/api/auth/organization/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(credentials)
        })

        const data = await res.json()

        return data
    } catch (err) {
        console.error('Server error:', err)
        throw err
    }
}

export async function orgSignOut(){
    try{
        const res = await fetch(`http://${import.meta.env.VITE_API_DOMAIN}:8000/api/auth/organization/signout`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include'
        })

        const data = await res.json()
        return data;
    }
    catch(err){
        console.error(err)
        throw err
    }
}

export async function seekerLogin(credentials) {
    try {
        const res = await fetch(`http://${import.meta.env.VITE_API_DOMAIN}:8000/api/auth/jobseeker/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(credentials)
        })

        const data = await res.json()

        return data
    }
    catch (err) {
        console.error(err)
        throw err
    }
}

export async function seekerRegister(credentials) {
    try{
        const res = await fetch(`http://${import.meta.env.VITE_API_DOMAIN}:8000/api/auth/jobseeker/register`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(credentials)
        })

        const data = await res.json()

        return data
    }
    catch(err){
        console.error(err)
        throw err
    }
}

export async function seekerSignOut(){
    try{
        const res = await fetch(`http://${import.meta.env.VITE_API_DOMAIN}:8000/api/auth/jobseeker/signout`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            credentials: 'include'
        })

        const data = await res.json()

        return data
    }
    catch(err){
        console.error(err)
        throw err
    }
}
