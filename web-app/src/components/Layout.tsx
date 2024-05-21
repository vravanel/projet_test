import NavBar from "./Navbar";
import { ReactNode } from "react";
import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Head>
        <title>JPMT</title>
        <meta name="description" content="JPMT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`flex ${isMobile ? "flex-col" : ""}`}>
        {!isMobile && (
          <aside className="w-64 text-white flex flex-col items-center justify-center">
            <NavBar />
          </aside>
        )}
        <main
          className={`w-full ${
            isMobile ? "pt-16" : "w-[80%] rounded-2xl h-[95vh] m-auto mx-0 p-8"
          }`}
        >
          {children}
        </main>
        {isMobile && <NavBar />}
      </div>
    </>
  );
}
