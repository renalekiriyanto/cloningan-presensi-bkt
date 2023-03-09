import {Link, Navigate, useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        return <Navigate to="/login" />
    }

    return (
        <div className="bg-[#e45858] p-5 text-white flex justify-between">
            <div className="flex justify-center items-center">
                <button type="button" className="mr-3" onClick={handleBackClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                    </svg>
                </button>
                <h3 className="font-semibold">Presensi</h3>
            </div>
            <div>
                <button className="bg-yellow-500 p-2 font-semibold rounded-md" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar