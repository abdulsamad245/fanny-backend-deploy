import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState, useEffect } from "react";

import { toast } from 'react-toastify';  // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for toastify

export const ColorModeContext = createContext({
    toggleMode: () => { },
    mode: 'light'
})

export const ColorContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store the current user
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [registeredUsers, setRegisteredUsers] = useState([]);

    // Retrieve registered users from local storage on client mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUsers = localStorage.getItem('registeredUsers');
            if (savedUsers) {
                setRegisteredUsers(JSON.parse(savedUsers));
            }
        }
    }, []);

    // Save registered users to local storage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        }
    }, [registeredUsers]);

    // Register function
    const registerUser = (email, password) => {
        const existingUser = registeredUsers.find((u) => u.email === email);
        if (existingUser) {
            // Show error toast if user already exists
            toast.error('User already exists!');
            return false;
        } else {
            // Add new user to the registeredUsers array
            setRegisteredUsers((prev) => [...prev, { email, password }]);
            // Show success toast
            toast.success('Registration successful!');
            return true;
        }
    };

    // Login function
    const loginUser = (email, password, callback) => {
        setLoading(true);
        setError(null);

        // Simulate API call to validate credentials
        setTimeout(() => {
            const foundUser = registeredUsers.find((u) => u.email === email && u.password === password);
            if (foundUser) {
                setUser({ email }); // Set the user in state
                setLoading(false);

                // Show success toast
                toast.success('Login successful!');
                
                // Execute callback function (redirect)
                if (callback) callback();
            } else {
                setError('Invalid email or password');
                setLoading(false);
                // Show error toast
                toast.error('Invalid email or password');
            }
        }, 1000);
    };

    // Logout function
    const logout = () => {
        setUser(null);
    };
    const [mode, setMode] = useState('light');

    const colorMode = useMemo(
        () => ({
            toggleMode: () => setMode(prevMode => prevMode === 'light' ? 'dark' : 'light'),
            mode
        }), [mode]
    )

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 450,
                md: 600,
                lg: 900,
                xl: 1050,
            }
        },
        typography: {
            fontFamily: [
                'Commissioner',
                'sans-serif',
                'Dancing Script',
                'cursive',
            ].join(','),
            grayText: {
                color: mode === 'light' ? '#6c757d' : '#adb5bd',
            },
            button: {
                textTransform: 'none'
            }
        },
        palette: {
            mode: mode, // light or dark
            primary: {
                main: mode === 'light' ? '#000000' : '#ffffff'
            },
            secondary: {
                main: '#ffffff'
            },
            info: {
                main: '#998e76'
            },
            warning: {
                main: '#ff8800',
                dark: "#e36414"
            },
            button: {
                main: '#4d7c8a',
                dark: '#264653',
            },
            navCart: {
                main: "#88A47C"
            },

        },
    })


    return (
        <ColorModeContext.Provider value={{colorMode, user, registerUser, loginUser, logout, loading, error }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )

}