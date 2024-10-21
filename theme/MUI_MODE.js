import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState, useEffect } from "react";
import { toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  

export const ColorModeContext = createContext({
    toggleMode: () => {},
    mode: 'light'
})

export const ColorContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('loggedInUser');
            return user ? {username: JSON.parse(user).lastName} : [];
        }
        return [];
    });

    const [registeredUsers, setRegisteredUsers] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedUsers = localStorage.getItem('registeredUsers');
            return savedUsers ? JSON.parse(savedUsers) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        }
    }, [registeredUsers]);

    const registerUser = (values, callback) => {
        const { lastName, email, password } = values;
        const existingUser = registeredUsers.find((u) => u.email === email);
        if (existingUser) {
            toast.error('User already exists!');
            return false;
        } else {
            setRegisteredUsers((prev) => [...prev, { lastName, email, password }]);
            toast.success('Registration successful!');
            if (callback) callback();
            return true;
        }
    };

    const loginUser = ({ email, password }, callback) => {
        setLoading(true);
        setError(null);

        setTimeout(() => {
            const foundUser = registeredUsers.find((u) => u.email === email && u.password === password);
            if (foundUser) {
                localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
                setLoggedInUser({ username: foundUser.lastName });
                setLoading(false);
                toast.success('Login successful!');
                if (callback) callback();
            } else {
                setError('Invalid email or password');
                setLoading(false);
                toast.error('Invalid email or password');
            }
        }, 1000);
    };

    const logout = () => {
        localStorage.removeItem('cart');
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };

    const [mode, setMode] = useState('light');

    const colorMode = useMemo(
        () => ({
            toggleMode: () => setMode(prevMode => prevMode === 'light' ? 'dark' : 'light'),
            mode
        }), [mode]
    );

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
            mode: mode,
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
                main: "#f80000"
            },
        },
    });

    return (
        <ColorModeContext.Provider value={{ colorMode, user, loggedInUser, registerUser, loginUser, logout, loading, error }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
