import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';

const Header = (props) => {
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
    const account = useSelector(state => state.userReducer.account);

    const [activeLink, setActiveLink] = useState("home");
    const navigate = useNavigate();

    const clickLink = (link) => {
        setActiveLink(link);
    }

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    const handleLogout = () => {
        // Thêm logic để logout ở đây, ví dụ dispatch một action hoặc xóa token
        console.log("Logout");
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
                                // <div className="account-info">
                                //     <span className="username">{account.username}</span>
                                //     <button className='btn-logout' onClick={handleLogout}>Log out</button>
                                // </div>
                                <NavDropdown title={account.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.2">Log out</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Propfile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            )}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    );
}

export default Header;
