// WorkSharingContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import posts from './posts'; // 로컬 데이터 임포트

const WorkSharingContext = createContext();

export const WorkSharingProvider = ({ children }) => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    // 초기 데이터로 로컬 데이터를 설정
    setPostsData(posts);
  }, []);

  return (
    <WorkSharingContext.Provider value={{ posts: postsData, setPosts: setPostsData }}>
      {children}
    </WorkSharingContext.Provider>
  );
};

export const useWorkSharingPosts = () => {
  const context = useContext(WorkSharingContext);
  if (!context) {
    throw new Error('useWorkSharingPosts must be used within a WorkSharingProvider');
  }
  return context;
};
