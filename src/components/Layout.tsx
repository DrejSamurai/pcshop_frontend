import Header from "./Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "./styles/layout.css";

const Layout = () => {
  return (
    <>
      <Box
      className="layout-background"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
    </>
  );
};

export default Layout;