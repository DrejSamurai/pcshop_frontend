import Header from "./Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "./styles/layout.css";

const Layout = () => {
  return (
    <>
     <div className="layout-background">
      <Header />
      <Box sx={{ mt: 2, mb: 2 }}>
        <Outlet />
      </Box>
      <Footer/>
      </div>
    </>
  );
};

export default Layout;