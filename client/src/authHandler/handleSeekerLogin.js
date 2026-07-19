export default function handleSeekerLogin(event){
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")
    console.log(email)
    console.log(password)
}
