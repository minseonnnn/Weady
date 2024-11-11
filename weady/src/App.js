import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/main/Header'
import Home from './components/main/Home'
import Footer from './components/main/Footer'
import Codi from './components/cloth/Codi'
import Shop from './components/shop/Shop'
import Shopdetail from './components/shop/Shopdetail'
import { Fragment } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import CodiDetail from "./components/cloth/CodiDetail"
import SeasonBest from "./components/cloth/SeasonBest"
import WeatherRecomm from "./components/weather/WeatherRecomm"
import Login from "./components/member/Login"
import Join from "./components/member/Join";
import List from "./components/board/List";
import Detail from "./components/board/Detail";
import Insert from "./components/board/Insert";
import Update from "./components/board/Update";

function App() {
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const userId = window.sessionStorage.getItem('id')
        if (userId) {
            setIsLogin(true)
        }
    }, [])

    const handleLogin = () => {
        setIsLogin(true)
    }

    const handleLogout = () => {
        window.sessionStorage.clear()
        setIsLogin(false)
        window.location.reload()
    }

    return (
        <Fragment>
            <Router>
                <Header isLogin={isLogin} handleLogout={handleLogout}/>
                <Routes>
                    <Route exact path={"/"} element={<Home/>}/>
                    <Route path={"/cloth/Codi"} element={<Codi/>}/>
                    <Route path={"/shop/Shop"} element={<Shop/>}/>
                    <Route path={"/shop/Shopdetail/:ino"} element={<Shopdetail/>}/>
                    <Route path={"/cloth/CodiDetail/:cno"} element={<CodiDetail/>}/>
                    <Route path={"/cloth/SeasonBest"} element={<SeasonBest/>}/>
                    <Route path={"/weather/WeatherReComm/:str"} element={<WeatherRecomm/>}/>
                    <Route path={"/member/Login"} element={<Login handleLogin={handleLogin}/>}/>
                    <Route path={"/member/Join"} element={<Join/>}/>
                    <Route path={"/board/List"} element={<List/>}/>
                    <Route path={"/board/detail/:id"} element={<Detail/>}/>
                    <Route path={"/board/insert"} element={<Insert/>}/>
                    <Route path={"/board/update/:id"} element={<Update/>}/>
                </Routes>
                <Footer/>
            </Router>
        </Fragment>
    )
}

export default App
