import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
    config: {
        initialColorMode: "light",
        useSystemColorMode: false
    },
    colors: {
        //common theme colors are defined here
        common: {
            primary: "#63B3ED",
            sunIcon: "#F6AD55",
            alertText: "#F7FAFC",
            success: "#2F855A",
            danger: "#C53030",
            info: "#2B6CB0",
            warning: "#C05621",
            darkBlue: "#2C5282",
            lightBlue: "#4299E1"
        },
        darkMode: {
            bgPrimary: "#1A365D",
            headerText: "#E2E8F0",
            headerHoverText: "#F7FAFC",
            headerBorder: "#171923",
            alertBackground: "#2D3748",
            //this is how you can style dark mode for perticular component
            megaMenu: {
                bgPrimary: "#2C5282",
                firstPanBg: "#3182CE",
                firstPanText: "#EDFDFD"
            }
        },
        lightMode: {
            bgPrimary: "#F7FAFC",
            headerText: "#4A5568",
            headerHoverText: "#1A202C",
            headerBorder: "#E2E8F0",
            alertBackground: "#A0AEC0",
            //this is how you can style light mode for perticular component
            megaMenu: {
                bgPrimary: "#F7FAFC",
                firstPanBg: "#3182CE",
                firstPanText: "#EDFDFD"
            }
        }
    }
});
