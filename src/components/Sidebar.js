'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Backdrop for small screens */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white z-50 lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-500`}
      >
        <div className="p-4 flex flex-col gap-2 h-full">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Navigation</h2>
            {/* Close button only for small screens */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar Links */}
          <nav className="space-y-2">
            <Link
              href="/users"
              className={`block p-2 rounded ${
                isActive('/users') ? 'bg-blue-700' : 'hover:bg-gray-700'
              }`}
            >
              Users
            </Link>
            <Link
              href="/roles"
              className={`block p-2 rounded ${
                isActive('/roles') ? 'bg-blue-700' : 'hover:bg-gray-700'
              }`}
            >
              Roles
            </Link>
            <Link
              href="/permissions"
              className={`block p-2 rounded ${
                isActive('/permissions') ? 'bg-blue-700' : 'hover:bg-gray-700'
              }`}
            >
              Permissions
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
