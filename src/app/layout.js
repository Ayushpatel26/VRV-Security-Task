'use client';

import { useState } from 'react';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar.js';
import Sidebar from '@/components/Sidebar.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// export const metadata = {
//   title: "Admin dashboard app",
//   description: "Created with ❤️ by Ayush Patel",
// };

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar visibility

  return (
    <html lang="en">
      <head>
        <script
          src="https://cdn.lordicon.com/ritcuqlt.js"
          async
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <div className="flex-1 flex flex-col">
            <Navbar setIsSidebarOpen={setIsSidebarOpen} />
            <ToastContainer position="top-right" autoClose={3000} />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
