import React, {useState, useRef, useEffect} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import Swal from "sweetalert2"
import {Navigate, useNavigate} from "react-router-dom";

const AbsenMasuk = ({userinfo_id}) => {
    const navigate = useNavigate()

    const [file, setFile] = useState(null);

    useEffect(() => {
        const pageTitle = document.querySelector('title');
        pageTitle.innerText = 'Absen Masuk';
    }, [])

    const handleSubmit = async () => {
        // e.preventDefault()
        const data = new FormData();
        data.append('lat', '-0.3136807');
        data.append('lng', '100.3730727');
        data.append('type', 1);
        data.append('user_id', userinfo_id);
        data.append('photo', file)
        const res = await axios.post('http://devpresensi.bukittinggikota.go.id/api/checkin', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.hasil == 3){
            Swal.fire({
                title: 'Error!',
                text: 'Absensi gagal',
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then(res => {
                return navigate('/', {replace:true})
            })
        } else if(res.data.hasil == 2){
            Swal.fire({
                title: 'Warning!',
                text: 'Anda sudah absen',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(res => {
                return navigate('/', {replace:true})
            })
        } else {
            Swal.fire({
                title: 'Sukses!',
                text: 'Absen berhasil',
                icon: 'success',
                confirmButtonText: 'Cool'
            }).then(res => {
                return navigate('/', {replace:true})
            })
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mt-5">
            {/*<form encType="multipart/form-data" onSubmit={handleSubmit}>*/}
            <div className="bg-gray-200 p-8 rounded-lg shadow-lg">
                <label className="block font-medium mb-2" htmlFor="canvas-input">
                    Upload your image:
                </label>
                <input
                    id="canvas-input"
                    className="block border border-gray-400 p-2 w-full rounded-lg mb-4"
                    type="file"
                    onChange={e => setFile(e.target.files[0])}
                />
                <canvas className="block w-full"/>
            </div>
            <button className="bg-red-500 text-white p-3 rounded-md mt-5" type="submit" onClick={handleSubmit}>Ambil Absen</button>
            {/*</form>*/}
        </div>
    );
};

AbsenMasuk.propTypes = {
    userinfo_id: PropTypes.string
}

const mapStateToProps = state => ({
    userinfo_id: state.auth.user.userinfo_id
})

export default connect(mapStateToProps)(AbsenMasuk);
