"use client";
import { SnackbarProvider } from "notistack";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SnackbarProvider
          maxSnack={2}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={1000}
        >
          {children}
        </SnackbarProvider>
      </body>
    </html>
  );
}
