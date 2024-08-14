// PostContext.js

import React, { createContext, useContext, useState } from 'react';

// PostContext 생성
const PostContext = createContext();

// PostProvider 컴포넌트 정의
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {children}
    </PostContext.Provider>
  );
};

// usePosts 훅 정의
export const usePosts = () => useContext(PostContext);
