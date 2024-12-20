import React, { useState } from "react";
import { loginUser, registerUser, validateLogin, validatePassword } from "./AuthService";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import "./authstyles.css";

export const Auth = () => {
    const [showLogin, setShowLogin] = useState(true);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const [error, setError] = useState("");
    const navigate = useNavigate(); // Хук для навигации

    const handleShowRegistration = (e) => {
        e.preventDefault();
        setShowLogin(false);
    };

    const handleShowLogin = (e) => {
        e.preventDefault();
        setShowLogin(true);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Сброс ошибки перед запросом

        try {
            const result = await loginUser(login, password);
            var userToken = result.token
            var userRole  = result.role
            var userId = result.userId
            localStorage.setItem("userToken", userToken);
            localStorage.setItem("userRole", userRole);
            localStorage.setItem("userId", userId);
            message.success("Успешный вход!");
            if (userRole === 1) {
                navigate(`/adminProfile/${userId}`); 
            }
            if (userRole === 0) {
                navigate(`/clientProfile/${userId}`); 
            }
            if (userRole === 2){
                navigate(`/employeeProfile/${userId}`); 
            }
        } catch (error) {
            console.error("Login error:", error); // Логирование ошибки
            message.warning("Неправильный логин или пароль!");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); // Сброс ошибки перед запросом

        if (!validateLogin(login) || !validatePassword(password)) {
            return;
        }

        // Проверка на совпадение паролей
        if (password !== repeatPassword) {
            message.warning("Пароли не совпадают")
            return;
        }

        try {
            const result = await registerUser(name, surname, login, password);
            message.success("Пользователь зарегестрирован!");
            // Показ формы логина
            setShowLogin(true)
            
        } catch (error) {
            message.error("Логин занят!")
        }
    };

    return (
        <div>
            <div className="form-container" id="auth-container">
                {showLogin ? (
                    <form id="auth-form" onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <div className="form-group">
                            <label htmlFor="auth-email">Login</label>
                            <input
                                type="text"
                                id="auth-login"
                                placeholder="Enter your login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="auth-password">Password</label>
                            <input
                                type="password"
                                id="auth-password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit">Login</button>
                        </div>
                        <div className="toggle-link">
                            <span>
                                Don’t have an account?{" "}
                                <a href="#" onClick={handleShowRegistration}>
                                    Register
                                </a>
                            </span>
                        </div>
                    </form>
                ) : (
                    <form id="registration-form" onSubmit={handleRegister}>
                        <h2>Registration</h2>
                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Surname">Surname</label>
                            <input
                                type="text"
                                
                                placeholder="Enter your surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Login">Login</label>
                            <input
                                type="text"
                                
                                placeholder="Enter your login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input
                                type="password"
                                
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="RepeatPassword">Repeat Password</label>
                            <input
                                type="password"
                                
                                placeholder="Repeat your password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit">Register</button>
                        </div>
                        <div className="toggle-link">
                            <span>
                                Already have an account?{" "}
                                <a href="#" onClick={handleShowLogin}>
                                    Login
                                </a>
                            </span>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
    
                        
   
};