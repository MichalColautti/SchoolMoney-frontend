import {useEffect, useState} from "react";
import showPasswordIcon from "../../assets/showPasswordIcon.svg";
import hidePasswordIcon from "../../assets/hidePasswordIcon.svg";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {useOnChange} from "../../hooks/handleOnChangeInput";

const Login = () => {
    const emptyUserCredentials = {
        email: "",
        password: "",
    }

    const [showPassword, setShowPassword] = useState(false)

    const {onChangeInput, data} = useOnChange(emptyUserCredentials)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const navigate = useNavigate();
    const { login, loading, error, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/parent");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        try{
            await login(data);
        }
        catch(err){
            console.error("Login failed", err);
        }
    };

    const errorText = (error) => {
        switch (error) {
            case 'Request failed with status 401':
                return 'Nieprawidłowy email lub hasło.'
            case 'Request failed with status 500':
                return "Błąd serwera. Spróbuj ponownie później."
            default:
                return "Wystąpił nieoczekiwany błąd.";
        }
    }

    return (
            (
                <form style={styles.container} onSubmit={handleSubmit}>
                    <label style={styles.text}>Email</label>
                    <input
                        style={styles.input}
                        type="email"
                        value={data.email}
                        onChange={(e) => onChangeInput(e.target.value, 'email')}
                        required
                    />
                    <label style={styles.text}>
                        Hasło
                    </label>
                    <div style={styles.passwordContainer}>
                        <input
                            style={styles.input}
                            type={showPassword ? "text" : "password"}
                            value={data.password}
                            onChange={(e) => onChangeInput(e.target.value, 'password')}
                            required
                        />
                        <button
                            type="button"
                            style={styles.showPasswordButton}
                            onClick={toggleShowPassword}
                        >
                            <img
                                src={showPassword ? hidePasswordIcon : showPasswordIcon}
                                style={styles.icon}
                                alt={showPassword ? "ukryj" : "pokaż"}
                            />
                        </button>
                    </div>
                    {
                        error &&
                        <p style={styles.error}>
                            {errorText(error)}
                        </p>
                    }
                    <button type="submit" style={styles.submitButton}>
                        {loading ? "Logowanie..." : "Zaloguj się"}
                    </button>
                </form>
            )
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Krub', sans-serif",
    },
    text: {
        fontSize: "16px",
        marginLeft: "2px",
        marginTop: "12px",
        textAlign: "left",
    },
    input: {
        border: "none",
        background: "#f0f9ff",
        borderRadius: "8px",
        padding: "10px",
        margin: "2px 0 0 0",
        fontSize: "16px",
        width: "100%",
        boxSizing: "border-box",
    },
    passwordContainer: {
        position: "relative",
        width: "100%",
    },
    showPasswordButton: {
        position: "absolute",
        right: "12px",
        top: "57%",
        transform: "translateY(-50%)",
        background: "transparent",
        border: "none",
        padding: "0",
        cursor: "pointer",
    },
    submitButton: {
        background: "#2B7FFF",
        color: "#fff",
        borderRadius: "20px",
        border: "none",
        padding: "10px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "20px",
    },
    error: {
        color: "red",
        marginBottom: "10px",
    },
    icon: {
        width: "20px",
        height: "20px",
    },
};

export default Login;
