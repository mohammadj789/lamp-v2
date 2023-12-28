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
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import NotestickProvider from "@/utils/NotestickProvider";

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`bg-black ${inter.className}`}>
        <NotestickProvider />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
};

export default layout;
