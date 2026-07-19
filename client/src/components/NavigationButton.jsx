import { Link } from 'react-router-dom'

export default function NavigationButton({to,children}){
    return(
        <>
            <Link to={to} className="bg-blue-600 px-10 py-3 mb-4 font-semibold 
            transition-all duration-200 rounded-lg cursor-pointer hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            focus-visible:ring-blue-600 shadow-md hover:bg-white/5">{children}</Link>
        </>
    )
}