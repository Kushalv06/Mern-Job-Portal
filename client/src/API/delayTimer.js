import { toast } from "react-toastify"

export function startColdStartTimer(){
    let waiting
    let toastId
    waiting = setTimeout(()=>{
         toastId = toast.info("Connecting to the server… The first request may take up to 20–30 seconds because the app is hosted on a free server. Thank you for your patience.",{
            autoClose:false,
            style: {
                width: "70vw",
                maxwidth:"600px"
        }
         })
    },2500)

    function cancelColdStartTimer(){
    toast.dismiss(toastId)
    clearTimeout(waiting)
    }

    return cancelColdStartTimer
}
