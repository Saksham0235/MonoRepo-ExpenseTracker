import React from "react";

const Header = ({onLogout}) => {
  return (
    <header className="app-header">
      <div className="logo-icon">💸</div>
      <h2>Expense Tracker</h2>
      <span className="header-sub">Personal Finance</span>
      <button className="cursor-pointer bg-white border-spacing-1 text-black p-2 rounded-md" onClick={onLogout}>Logout</button>
    </header>
  );
};

export default Header;
