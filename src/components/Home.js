import {Navigate, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import setAuthToken from "../utils/setAuthToken.js";
import moment from "moment";
import {list} from "../actions/checkin";

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const Home = ({isAuthenticated, checkinToday}) => {
    const navigate = useNavigate()

    useEffect(() => {
        const pageTitle = document.querySelector('title');
        pageTitle.innerText = 'Home';
    }, [])

    useEffect(() => {
        if (checkinToday === null){
            list()
        }
    },[checkinToday])

    const handleClick = () => {
        navigate('/absen', {replace:true})
    }

    if (isAuthenticated) {
        return (
            <div className="p-3">
                <button onClick={handleClick} className="p-3 bg-red-500 rounded-md font-semibold text-white">Ambil
                    Absen
                </button>
                {
                    checkinToday !== null ?
                        checkinToday?.map(checkin => (
                            <div className="mt-3 flex justify-between" key={checkin.id}>
                            <span
                                className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 h-fit">{moment(checkin.tgl).local().format('LL')}</span>
                                <div className="rounded-md border p-2 w-7/12 shadow flex flex-col">
                                    <span className="font-semibold">Absen {checkin.checktype}</span>
                                    <span className="text-xs">terdeteksi menggunakan {
                                        checkin.SN === 'ENTRI_FROM_MOBILE' ? 'Mobile' : 'Mesin'
                                    }</span>
                                    <div className="flex justify-start items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="w-5 h-5 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span>{moment(checkin.checktime).format('LTS')}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    : null
                }
            </div>
        )
    } else {
        return <Navigate to="/login" replace/>
    }
}

Home.propTypes = {
    isAuthenticated: PropTypes.bool,
    checkinToday: PropTypes.array
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    checkinToday: state.checkin.checkinToday
})

export default connect(mapStateToProps)(Home)