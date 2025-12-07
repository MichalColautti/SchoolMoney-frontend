import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {loginRequest, logoutRequest, registerRequest} from "../services/auth";
import {validateRegisterPassword} from "../scripts/validate/validateRegisterPassword";

const AuthContext = createContext(undefined, undefined);

const LOCAL_STORAGE_TOKEN_KEY = "";

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(() => localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY));
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
        } else {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        }
    }, [token]);

    const handleAuthSuccess = useCallback(
        (payload) => {
            setToken(payload.loginToken.substring(7) || "");
            payload.loginToken = "";
            setUser(payload || null);
        },
        [setToken, setUser]
    );

    const login = useCallback(
        async (credentials) => {
            setLoading(true);
            setError(null);
            try {
                const payload = await loginRequest(credentials);
                handleAuthSuccess(payload);
            } catch (err) {
                setError(err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [handleAuthSuccess]
    );

    const register = useCallback(
        async (payload) => {
            setLoading(true);
            setError(null);
            if(validateRegisterPassword(payload.password, payload.repeatPassword)){
                setError('Passwords do not match');
                setLoading(false);
                return;
            }

            try {
                await registerRequest(payload);
            } catch (err) {
                setError(err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const logout = useCallback(
        async () => {
            try {
                await logoutRequest(token);
            } catch (err) {
                setError(err.message);
                throw err;
            } finally {
                setToken(null);
                setUser(null);
                setLoading(false);
            }
        }, [token]);

    const value = useMemo(
        () => ({
            isAuthenticated: Boolean(token),
            token,
            user,
            error,
            loading,
            login,
            register,
            logout,
        }),
        [token, user, error, loading, login, register, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
