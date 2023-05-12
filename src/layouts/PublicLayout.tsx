import { Outlet } from "react-router-dom";

//chakraui
import { Box } from "@chakra-ui/react";

//custom compopnents
import Footer from "../components/footer/FooterAdmin";

const PublicLayout = () => {
    return (
        <Box maxHeight="full">
            <Box height="100vh">
                <Outlet />
            </Box>
            {/* <Footer /> */}
        </Box>
    );
};

export default PublicLayout;
