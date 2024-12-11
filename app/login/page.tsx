"use client";
import { useState } from 'react';
import { FaLock ,FaUnlock} from 'react-icons/fa';
import styles from "./page.module.css";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div className={styles.container}>
            <div className={styles.flexDiv}>
                <div className={styles.image}></div>
                <div className={styles.login}>
                    <div className={styles.texts}>
                        <h1 className={styles.title}>Admin Login</h1>
                        <h4 className={styles.subtitle}>Sign in to access the Network Management Dashboard</h4>
                    </div>

                    <form className={styles.loginform}>
                        <input
                            className={styles.username}
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.password}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className={styles.eyeButton}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <FaUnlock className="text-[#9B9B9B]" size={24} />
                                ) : (
                                    <FaLock className="text-[#9B9B9B]" size={24} />
                                )}
                            </button>
                        </div>


                        <div className={styles.forgotPasswordContainer}>
                            <h1 className={styles.Forgotpassword}></h1>
                        </div>

                        <div className={styles.rememberMeContainer}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                    className={styles.checkboxInput}
                                />
                                <span className={styles.customCheckbox}></span>
                                Remember Me
                            </label>
                        </div>

                        <button className={styles.submitbtn}>
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
