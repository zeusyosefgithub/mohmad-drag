'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";
import NavBar from "./Components/NavBar";
import { AuthContextProvider } from "./auth/authContext";
import CheckAuth from "./auth/checkAuth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="/logoP.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@700&family=Noto+Sans+Hebrew:wght@700&family=Rubik:ital,wght@0,800;1,900&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet"></link>
        <AuthContextProvider>
          <NextUIProvider>
            <CheckAuth children={children}/>
          </NextUIProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
