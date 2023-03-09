import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import {Provider} from "react-redux";
import store from "./store";
import PrivateRoute from "./routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";
import Navbar from "./components/layouts/Navbar";
import AbsenMenu from "./components/AbsenMenu";
import AbsenMasuk from "./components/AbsenMasuk";
import AbsenPulang from "./components/AbsenPulang";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <div className="w-full h-screen">
                        {
                            localStorage.token ? (
                                <Navbar />
                            ) : null
                        }
                        <Routes exact path="/">
                            <Route exact path="/" element={<PrivateRoute component={Home}/>}/>
                            <Route exact path="/absen" element={<PrivateRoute component={AbsenMenu}/>}/>
                            <Route exact path="/absen/masuk" element={<PrivateRoute component={AbsenMasuk}/>}/>
                            <Route exact path="/absen/pulang" element={<PrivateRoute component={AbsenPulang}/>}/>
                            <Route exact path="/login" element={<Login/>}/>
                        </Routes>
                    </div>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
