import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthProvider} from './contexts/AuthContext';
import {UserDataProvider} from "./contexts/UserDataContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserDataProvider>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </UserDataProvider>
    </React.StrictMode>
);
