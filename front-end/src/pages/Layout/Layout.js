import { Outlet, Link, useLocation } from "react-router-dom";
import "./Layout.css"
import logo from "../../images/Logo.png"
const Layout = () => {
    let location = useLocation();
    let homeActive = location.pathname === '/' ? ' active' : '';
    let rentersActive = location.pathname === '/renters' ? ' active' : '';
    let listingsActive = location.pathname === '/listings' ? ' active' : '';
    console.log(location.pathname)
    return (
        <>
            <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link class="navbar-brand" to="/">
                    <img id='logo' alt="Jesse Clark Logo" src={logo} />
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class={"nav-link" + homeActive} to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class={"nav-link" + rentersActive} to="/renters">Renters</Link>
                        </li>
                        <li class="nav-item">
                            <Link class={"nav-link" + listingsActive} to="/listings">Listings</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <Outlet />
            
            </div>

            <div class="footer-container">
                <p>
                    <a target="_blank" rel="noreferrer noopener" href="https://github.com/maclaurin36/ReactCliProject/">View on Github</a>
                </p>
            </div>
        </>
    )
};

export default Layout;