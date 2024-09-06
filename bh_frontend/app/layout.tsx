import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Blockhouse Assessment",
  description: "Creating various charts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-300">
        <div className="flex justify-center items-center">
          {children}
        </div>
        <h2>By Joel Louis M.</h2>
      </body>
    </html>
  );
}
