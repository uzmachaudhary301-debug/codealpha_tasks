import React from 'react';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import './Home.css';

function Home() {
  // Dummy posts data testing ke liye
  const dummyPosts = [
    { id: 1, user: "Ayesha Khan", content: "Excited to start my full stack developer internship! 🚀 #codealpha", likes: 12, commentsCount: 3 },
    { id: 2, user: "Zain Ahmed", content: "Beautiful evening view from Margalla Hills today! ⛰️✨", likes: 45, commentsCount: 8 }
  ];

  return (
    <div className="home-layout">
      <div className="feed-container">
        {dummyPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;