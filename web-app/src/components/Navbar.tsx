import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import Link from "next/link";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function NavBar() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    switch (router.pathname) {
      case "/":
        setSelectedIndex(0);
        break;
      case "/quiz":
        setSelectedIndex(1);
        break;
      default:
        setSelectedIndex(null);
    }
  }, [router.pathname]);

  if (isMobile) {
    return (
      <BottomNavigation
        value={selectedIndex}
        onChange={(event, newValue) => {
          setSelectedIndex(newValue);
          switch (newValue) {
            case 0:
              router.push("/");
              break;
            case 1:
              router.push("/quiz");
              break;
          }
        }}
        showLabels
        className="fixed bottom-0 w-full"
      >
        <BottomNavigationAction
          label="Accueil"
          icon={<FontAwesomeIcon icon={faHouse} />}
        />
        <BottomNavigationAction
          label="Quiz"
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        />
      </BottomNavigation>
    );
  }

  return (
    <List className="w-full">
      <Link href="/" passHref>
        <ListItem
          onClick={() => setSelectedIndex(0)}
          className={`ml-4 my-2 p-4 ${
            router.pathname === "/" ? "bg-[#F8F7F4] rounded-lg" : ""
          }`}
        >
          <ListItemIcon>
            <FontAwesomeIcon
              className={`${
                router.pathname === "/"
                  ? "text-[#38369A]"
                  : "text-[#F8F7F4] opacity-30"
              }`}
              size="xl"
              icon={faHouse}
            />
          </ListItemIcon>
          <ListItemText
            className={`${
              router.pathname === "/"
                ? "text-[#38369A]"
                : "text-[#F8F7F4] opacity-30"
            }`}
            primary="Accueil"
          />
        </ListItem>
      </Link>
      <Link href="/quiz" passHref>
        <ListItem
          onClick={() => setSelectedIndex(1)}
          className={`ml-4 my-2 p-4 ${
            router.pathname === "/quiz" ? "bg-[#F8F7F4] rounded-lg" : ""
          }`}
        >
          <ListItemIcon>
            <FontAwesomeIcon
              className={`${
                router.pathname === "/quiz"
                  ? "text-[#38369A]"
                  : "text-[#F8F7F4] opacity-30"
              }`}
              size="xl"
              icon={faMagnifyingGlass}
            />
          </ListItemIcon>
          <ListItemText
            className={`${
              router.pathname === "/quiz"
                ? "text-[#38369A]"
                : "text-[#F8F7F4] opacity-30"
            }`}
            primary="Quiz"
          />
        </ListItem>
      </Link>
    </List>
  );
}
