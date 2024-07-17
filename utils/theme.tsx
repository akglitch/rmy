"use client";
import React, { useEffect } from "react";
import { createTheme } from "@mui/material/styles";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const useThemeHook = () => {
  const isDark = false;
  const userPref = isDark || typeof isDark == undefined ? "dark" : "light";
  const [mode, setMode] = React.useState<"light" | "dark">(userPref);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        const chMode = mode === "light" ? "dark" : "light";
        localStorage.setItem("mode", chMode);
        setMode(chMode);
      },
    }),
    [mode]
  );

  useEffect(() => {
    const lhmode = localStorage.getItem("mode");
    const w = window.matchMedia("(prefers-color-scheme: dark)");
    if (!lhmode && w.matches) setMode("dark");
    else setMode(lhmode == "dark" ? "dark" : "light");
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: {
                  main: "#00bbf9",
                },
                secondary: {
                  main: "#219ebc",
                },
                // divider: "#90e0ef",
                text: {
                  primary: "#023047",
                  secondary: "#264653",
                },
              }
            : {
                // palette values for dark mode
                primary: {
                  main: "#34a0a4",
                },
                secondary: {
                  main: "#76c893",
                },
                // divider: "#5fa8d3",
                background: {
                  default: "#0a0908",
                  paper: "#00171f",
                },
                text: {
                  primary: "#fff",
                  secondary: "#8d99ae",
                },
              }),
        },
        typography: {
          fontFamily: "Raleway",
        },
      }),
    [mode]
  );
  return {
    colorMode,
    theme,
  };
};
