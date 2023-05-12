import { mode } from "@chakra-ui/theme-tools";
import { globalStyles } from "../styles";
export const badgeStyles = {
    components: {
        Badge: {
            baseStyle: {
                borderRadius: "10px",
                lineHeight: "100%",
                padding: "7px",
                paddingLeft: "12px",
                paddingRight: "12px"
            },
            variants: {
                outline: () => ({
                    borderRadius: "16px"
                }),
                brand: (props: any) => ({
                    bg: mode("brand.500", "brand.400")(props),
                    color: "white",
                    _focus: {
                        bg: mode("brand.500", "brand.400")(props)
                    },
                    _active: {
                        bg: mode("brand.500", "brand.400")(props)
                    },
                    _hover: {
                        bg: mode("brand.600", "brand.400")(props)
                    }
                }),

                success: (props: any) => ({
                    // bgColor: globalStyles.colors.button.bgSuccess,
                    border: "1px solid ",
                    color: globalStyles.colors.btn.success,
                    fontSize: "sm",
                    fontWeight: "500",
                    rounded: "md",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    h: "7",
                    w: "36"
                    // py: "2"
                }),

                darkBlack: (props: any) => ({
                    border: "1px solid ",
                    color: globalStyles.colors.btn.darkBlack,
                    fontSize: "sm",
                    fontWeight: "500",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    rounded: "md",
                    h: "7",
                    w: "36"
                }),

                blue: (props: any) => ({
                    border: "1px solid ",
                    color: globalStyles.colors.btn.blue,
                    fontSize: "sm",
                    fontWeight: "500",
                    rounded: "md",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    h: "7",
                    w: "36"
                }),

                danger: (props: any) => ({
                    // bgColor: globalStyles.colors.button.dangerBg,
                    border: "1px solid ",
                    color: globalStyles.colors.btn.danger,
                    fontSize: "sm",
                    fontWeight: "500",
                    rounded: "md",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    h: "7",
                    w: "36"
                })
            }
        }
    }
};
