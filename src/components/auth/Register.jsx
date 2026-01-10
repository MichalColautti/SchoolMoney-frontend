import {useState} from "react";
import showPasswordIcon from "../../assets/showPasswordIcon.svg";
import hidePasswordIcon from "../../assets/hidePasswordIcon.svg";
import {useAuth} from "../../contexts/AuthContext";
import {useOnChange} from "../../hooks/useOnChange";

const Register = ({onSuccess}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const emptyRegisterCredentials = {
        name: "",
        surname: "",
        email: "",
        password: "",
        repeatPassword: "",
    }

    const {onChangeInput, data} = useOnChange(emptyRegisterCredentials)

    const { register, loading, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        try{
            await register(data)

            if(onSuccess){
                onSuccess()
            }
        }
        catch(err){
            console.error("Register failed", err);
        }
    };

    const errorText = (error)=> {
        switch (error) {
            case 'Request failed with status 401':
                return 'Nieprawidłowy email lub hasło.'
            case 'Request failed with status 500':
                return "Błąd serwera. Spróbuj ponownie później."
            case 'Passwords do not match':
                return "Hasła nie są identyczne!"
            case "All fields are required":
                return "Wszystkie pola są wymagane"
            case "Email already exists":
                return "Konto o podanym e-mailu już istnieje"
            default:
                return "Wystąpił nieoczekiwany błąd.";
        }
    }

    return (
        <form style={styles.container} onSubmit={handleSubmit}>
            <label style={styles.text}>Imię</label>
            <input
                style={styles.input}
                type="text"
                value={data.name}
                onChange={(e) => onChangeInput(e.target.value, 'name')}
                required
                autoComplete="given-name"
            />

            <label style={styles.text}>Nazwisko</label>
            <input
                style={styles.input}
                type="text"
                value={data.surname}
                onChange={(e) => onChangeInput(e.target.value, 'surname')}
                required
                autoComplete="family-name"
            />

            <label style={styles.text}>Email</label>
            <input
                style={styles.input}
                type="email"
                value={data.email}
                onChange={(e) => onChangeInput(e.target.value, 'email')}
                required
                autoComplete="email"
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
                    autoComplete="new-password"
                />
                <button
                    type="button"
                    style={styles.showPasswordButton}
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    <img
                        src={showPassword ? hidePasswordIcon : showPasswordIcon}
                        style={styles.icon}
                        alt={showPassword ? "ukryj" : "pokaż"}
                    />
                </button>
            </div>

            <label style={styles.text}>Powtórz hasło</label>
            <div style={styles.passwordContainer}>
                <input
                    style={styles.input}
                    type={showRepeatPassword ? "text" : "password"}
                    value={data.repeatPassword}
                    onChange={(e) => onChangeInput(e.target.value, 'repeatPassword')}
                    required
                    autoComplete="new-password"
                />
                <button
                    type="button"
                    style={styles.showPasswordButton}
                    onClick={() => setShowRepeatPassword((prev) => !prev)}
                >
                    <img
                        src={showRepeatPassword ? hidePasswordIcon : showPasswordIcon}
                        style={styles.icon}
                        alt={showRepeatPassword ? "ukryj" : "pokaż"}
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
                {loading ? 'Przetwarzanie' : 'Zarejestruj się'}
            </button>
        </form>
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

export default Register;
