const Navbar = ({ setIsSidebarOpen }) => (
  <nav className="bg-blue-500 p-4 text-white flex items-center gap-2">
    <button
      className="lg:hidden text-white p-2"
      onClick={() => setIsSidebarOpen(true)}
    >
      {/* Hamburger Icon */}
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
          d="M3.75 5.75h16.5m-16.5 6.5h16.5m-16.5 6.5h16.5"
        />
      </svg>
    </button>

    <h1 className="text-2xl text-center">Admin Dashboard</h1>
  </nav>
);

export default Navbar;
