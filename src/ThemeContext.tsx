import { createContext, useContext } from "react";
import { GameContext } from "./GameContext";

export const ThemeContext = createContext<boolean>(true)

type ThemeProviderProps = {
    children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const { goal } = useContext(GameContext)
    const darkTheme = Object.values(goal).reduce((acc, curr) => acc + curr) > (255 * 3) / 2

    return (
        <ThemeContext.Provider value={darkTheme}>
            {children}
        </ThemeContext.Provider>
    );

}
