import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Link,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";

export default function SideBar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Box sx={{ padding: "16px" }}>
        <List>
          <Link href="/admin/dashboard">
            <ListItem
              sx={{
                marginBottom: "1rem",
                marginTop: "2rem",
                backgroundColor: "#1976d2",
                color: "#fff",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Accueil" />
            </ListItem>
          </Link>
          <Link href="/admin/quiz">
            <ListItem
              sx={{
                backgroundColor: "#1976d2",
                marginBottom: "1rem",
                color: "#fff",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <QuizIcon />
              </ListItemIcon>
              <ListItemText primary="Quiz" />
            </ListItem>
          </Link>
          <Link href="/admin/category">
            <ListItem
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <QuizIcon />
              </ListItemIcon>
              <ListItemText primary="Catégories" />
            </ListItem>
          </Link>
        </List>
      </Box>
    </Drawer>
  );
}
