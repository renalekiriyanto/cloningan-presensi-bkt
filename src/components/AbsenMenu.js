import {Link} from "react-router-dom";
import {useEffect} from "react";

const AbsenMenu = () => {
    useEffect(() => {
        const pageTitle = document.querySelector('title');
        pageTitle.innerText = 'Menu Absen';
    },[])
    return (
        <div className="p-3 flex justify-center items-center text-white font-semibold w-full">
            <div className="flex justify-between items-center">
                <Link to="/absen/masuk" className="p-3 py-5 shadow bg-lime-500 mr-5 rounded-md">
                    <h5>Absen Masuk</h5>
                </Link>
                <Link to="/absen/pulang" className="p-3 py-5 shadow bg-red-500 rounded-md">
                    <h5>Absen Pulang</h5>
                </Link>
            </div>
        </div>
    )
}

export default AbsenMenu