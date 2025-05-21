import Header from "./Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Box>
      <Footer/>
    </>
  );
};

export default Layout;