import React, { createContext, useState, useContext, useEffect } from 'react';
import initialPosts from './posts'; // 하드코딩된 데이터 임포트

const WorkSharingContext = createContext();

export const WorkSharingProvider = ({ children }) => {
  // 초기 데이터를 하드코딩된 posts로 설정
  const [postsData, setPostsData] = useState(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태 추가


  // posts가 빈 배열로 설정되는 문제를 해결하기 위해 의존성 없이 useEffect 제거
  // useEffect(() => {
  //   setPostsData(initialPosts);
  // }, []);

  const updatePost = (postId, updatedFields) => {
    setPostsData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updatedFields } : post
      )
    );
  };

  return (
    <WorkSharingContext.Provider value={{ posts: postsData, setPost:setPostsData,updatePost,selectedCategory, setSelectedCategory }}>
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
