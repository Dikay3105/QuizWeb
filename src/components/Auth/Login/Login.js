import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { postLogin } from "../../../service/authService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogIn } from "../../../redux/action/userAction";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const dataFromRegister = location.state;

    useEffect(() => {
        if (dataFromRegister) {
            setEmail(dataFromRegister.newEmail || "");
            setPassword(dataFromRegister.newPassword || "");
        }
    }, [dataFromRegister]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        if (!email) {
            toast.error("Email may not be blank");
            return;
        }
        if (!password) {
            toast.error("Password may not be blank");
            return;
        }
        let response = await postLogin(email, password);
        if (response && response.EC === 0) {
            dispatch(doLogIn(response));
            toast.success("Login success");
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    return (
        <>
            <div className="login-container mt-3 d-grid gap-2">
                <div className="title fs-1 fw-bold col-4 mx-auto text-center">
                    Typeform
                </div>
                <div className="welcome col-4 mx-auto text-center">
                    Hello, who’s this?
                </div>
                <div className="content-form col-3 mx-auto d-grid gap-3">
                    <div className="form-group d-grid gap-2">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="bruce@wayne.com"
                            onChange={(event) => { setEmail(event.target.value) }}
                            onKeyDown={(event) => handleKeyDown(event)}
                            value={email}
                        />
                    </div>
                    <div className="form-group d-grid gap-2">
                        <label>Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="At least 8 characters"
                                onChange={(event) => { setPassword(event.target.value) }}
                                onKeyDown={(event) => handleKeyDown(event)}
                                value={password}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={togglePasswordVisibility}
                                style={{ borderLeft: 'none' }}
                            >
                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
                        </div>
                    </div>
                    <Link to="/forgot-password" className="link-secondary">Forgot password?</Link>
                    <button className="btn btn-dark w-100" onClick={handleLogin}>Log in to Typeform</button>
                    <Link to="/register" className="link-secondary text-center w-100">
                        Create account
                    </Link>

                    <div className="d-flex align-items-center">
                        <hr className="w-100" />
                        <span className="px-2">OR</span>
                        <hr className="w-100" />
                    </div>
                    <button className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center">
                        <img src="google-logo-url" alt="Google" className="me-2" />
                        Sign in with Google
                    </button>
                    <button className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center">
                        <img src="microsoft-logo-url" alt="Microsoft" className="me-2" />
                        Sign in with Microsoft
                    </button>
                    <Link to="/" className="text-center link-secondary mt-2">Go to homepage</Link>
                </div>
            </div>
        </>
    );
}

export default Login;
