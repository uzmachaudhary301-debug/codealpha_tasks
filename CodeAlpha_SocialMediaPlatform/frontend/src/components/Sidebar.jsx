import React from 'react';
import UserCard from './UserCard';
import './Sidebar.css';

function Sidebar() {
  const suggestions = [
    { id: 1, name: "Momna Zia", bio: "Tech Enthusiast" },
    { id: 2, name: "Hadia Malik", bio: "UI/UX Designer" }
  ];

  return (
    <aside className="sidebar-box">
      <h3>Who to follow</h3>
      <div className="suggestions-list">
        {suggestions.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;