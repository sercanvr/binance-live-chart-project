/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
const ThemeContext = createContext();
const getInitialTheme = () => {
    return 'dark';
};

export const ThemeProvider = ({ children }) => {
const [theme, setTheme] = useState(getInitialTheme);

useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
}, [theme]);

const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
};

return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
    {children}
    </ThemeContext.Provider>
);
};

// Custom hook: Tema bilgisine kolay erişim
export const useTheme = () => {
const context = useContext(ThemeContext);
if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
}
return context;
};