"use client";
import "./globals.css";
import AuthState from "@/context/accountContext";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <AuthState>{children}</AuthState>
        </main>
      </body>
    </html>
  );
}
