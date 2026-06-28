import React from "react";

const Header = ({onLogout}) => {
  return (
    <header className="app-header">
      <div className="logo-icon">💸</div>
      <h2>Expense Tracker</h2>
      <span className="header-sub">Personal Finance</span>
      <button onClick={onLogout}>Logout</button>
    </header>
  );
};

export default Header;
