import { GlobalContextProvider } from "./context/store";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <title>Cooked | receipe app</title>
      <GlobalContextProvider>
        <body>{children}</body>
      </GlobalContextProvider>
    </html>
  );
}
