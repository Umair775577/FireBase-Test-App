
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
    let isToken = localStorage.getItem("token")

    return (
        <>
            {isToken ? <Outlet /> : <Navigate to="/log-in" />}
        </>
    )
}

export default ProtectedRoutes