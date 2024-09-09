import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { doLogOut } from '../../redux/action/userAction';
import { postLogOut } from '../../service/authService';

const Header = (props) => {
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
    const account = useSelector(state => state.userReducer.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState("home");

    const handleLogout = async () => {
        const isLoggedOut = await logOut();
        if (isLoggedOut) {
            dispatch(doLogOut());
            navigate("/");
        }
    }

    const logOut = async () => {
        const response = await postLogOut(account.email, account.refresh_token);
        if (response && response.EC === 0) {
            return true;
        }
        return false;
    }

    const clickLink = (link) => {
        setActiveLink(link);
    }

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    return (
        <div className='header-container'>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Nav.Link
                        onClick={() => clickLink("user")}
                        as={Link}
                        to="/user"
                        className={`navbar-brand ${activeLink === "user" ? "active" : ""}`}
                    >
                        Website
                    </Nav.Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                onClick={() => clickLink("home")}
                                as={Link}
                                to="/"
                                className={activeLink === "home" ? "active" : ""}
                            >
                                Home
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => clickLink("user")}
                                as={Link}
                                to="/user"
                                className={activeLink === "user" ? "active" : ""}
                            >
                                User
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => clickLink("admin")}
                                as={Link}
                                to="/admin"
                                className={activeLink === "admin" ? "active" : ""}
                            >
                                Admin
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            {!isAuthenticated && (
                                <>
                                    <button className='btn-login' onClick={handleLogin}>Log in</button>
                                    <button className='btn-signup' onClick={handleRegister}>Sign up</button>
                                </>
                            )}

                            {isAuthenticated && (
                                <NavDropdown title={account.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
