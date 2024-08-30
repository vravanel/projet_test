// components/Layout.tsx
import React from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  ThemeProvider,
  CssBaseline,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Sidebar from "./SideBar";
import adminTheme from "../../theme/admintheme";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container>{children}</Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
