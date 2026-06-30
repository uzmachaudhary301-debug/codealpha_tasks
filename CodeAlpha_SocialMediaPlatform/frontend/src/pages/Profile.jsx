import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-wrapper">
      <div className="profile-header-card">
        <div className="profile-main-avatar">U</div>
        <h2>Uzma Chaudhary</h2>
        <p className="profile-bio">MERN Stack Developer | Building scalable clean web apps ✨</p>
        
        <div className="profile-stats">
          <div><strong>12</strong> Posts</div>
          <div><strong>240</strong> Followers</div>
          <div><strong>180</strong> Following</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;