import { toast } from "react-toastify"

export function startColdStartTimer(){
    let waiting
    let toastId
    waiting = setTimeout(()=>{
         toastId = toast.info("Connecting to the server… The first request may take up to 20–30 seconds because the app is hosted on a free server. Thank you for your patience.",{
            style: {
                width: "70vw",
                maxWidth:"600px"
        },
        autoClose : false
         })
    },2500)

    function cancelColdStartTimer(){
        if(toastId) toast.dismiss(toastId)
        clearTimeout(waiting)
    }

    return cancelColdStartTimer
}
