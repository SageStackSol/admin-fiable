// "use client";

// import { SessionProvider } from "next-auth/react";
// import "./globals.css";
// import Navbar from "@/components/navbar";

// export default function RootLayout({ children }) {
//   return (
//     <html>
//       <body>
//         <SessionProvider> {children}</SessionProvider>
//       </body>
//     </html>
//   );
// }
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import "./globals.css";
import Navbar from "@/components/navbar";

function LayoutContent({ children }) {
  const { data: session } = useSession();

  return (
    <>
      {session && <Navbar />}   {/* 👈 show only when logged in */}
      {children}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          <LayoutContent>{children}</LayoutContent>
        </SessionProvider>
      </body>
    </html>
  );
}