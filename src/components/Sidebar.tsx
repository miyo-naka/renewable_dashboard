import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-56 h-screen bg-gray-800 text-white flex flex-col py-8 px-4">
      <div className="mb-8 text-2xl font-bold">Menu</div>
      <nav className="flex flex-col gap-4">
        <a href={"/"} className="hover:text-blue-400">
          Dashboard
        </a>
        <a href="#" className="hover:text-blue-400">
          Break down
        </a>
        <a href={"/about"} className="hover:text-blue-400">
          About
        </a>
      </nav>
    </aside>
  );
}
