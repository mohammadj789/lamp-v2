import { Poppins } from "next/font/google";
import "./globals.css";
const inter = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Lamp",
  description: "clone to spotify.music along its lyrics",
};
import React from "react";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import NotestickProvider from "@/components/providers/NotestickProvider";
import NextAuthProvider from "@/components/providers/NextAuthProvider";

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`bg-black ${inter.className}`}>
        <NotestickProvider />
        <NextAuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default layout;
