const THEME = "theme";

export const setTheme = (theme) => localStorage.setItem(THEME, theme);

export const getTheme = () => localStorage.getItem(THEME);
