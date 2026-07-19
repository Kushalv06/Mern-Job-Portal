export default function handleSeekerRegister(event){
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const password = formData.get("password")
    const confirmedPassword = formData.get("confirmedPassword")

    if(password !== confirmedPassword){
        alert("Please ensure password and confirmed password are same")
        return
    }
}
