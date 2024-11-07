import {Link} from "react-router-dom"
function Header({isLogin, handleLogout}){
    return (
        <header id="header" className="site-header text-black mb-5 fixed-top">
            <nav id="header-nav" className="navbar navbar-expand-lg pt-3">
                <div className="container-lg border-bottom pb-3">
                    <Link to={"/"} className="navbar-brand" href="/index.html">
                        <img src="/images/mainLoGo.png" width={"150px"} height={"50px"} className="logo"/>
                    </Link>
                    <button className="navbar-toggler d-flex d-lg-none order-3 p-2 border-0 shadow-none"
                            type="button" data-bs-toggle="offcanvas" data-bs-target="#bdNavbar"
                            aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <svg className="navbar-icon" width="50" height="50">
                            <use xlinkHref="#navbar-icon"></use>
                        </svg>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="bdNavbar"
                         aria-labelledby="bdNavbarOffcanvasLabel">
                        <div className="offcanvas-header px-4 pb-0">
                            <button type="button" className="btn-close btn-close-black" data-bs-dismiss="offcanvas"
                                    aria-label="Close" data-bs-target="#bdNavbar"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 gap-5 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link fw-bold text-dark" href={"/"}>Home</a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/cloth/Codi"}>Codi</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/cloth/SeasonBest"}>Season Best</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/shop/Shop"}>Shop</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/board/List"}>Board</Link>
                                </li>
                                <li className="nav-item">
                                    {isLogin ? (
                                        <button className="nav-link" onClick={handleLogout}>Logout</button>
                                    ) : (
                                        <Link className="nav-link" to={"/member/Login"}>Login</Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header