// PostContext.js
import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export const BookLikeProvider = ({ children }) => {
  // 각 게시물의 좋아요와 북마크 상태를 저장
  const [likes, setLikes] = useState({});
  const [bookmarks, setBookmarks] = useState({});

  // 좋아요 토글 함수
  const toggleLike = (postId) => {
    setLikes(prevLikes => {
      const newLikes = { ...prevLikes };
      newLikes[postId] = (newLikes[postId] || 0) + (newLikes[postId] ? -1 : 1);
      return newLikes;
    });
  };

  // 북마크 토글 함수
  const toggleBookmark = (postId) => {
    setBookmarks(prevBookmarks => {
      const newBookmarks = { ...prevBookmarks };
      newBookmarks[postId] = (newBookmarks[postId] || 0) + (newBookmarks[postId] ? -1 : 1);
      return newBookmarks;
    });
  };

  return (
    <PostContext.Provider value={{ likes, bookmarks, toggleLike, toggleBookmark }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
