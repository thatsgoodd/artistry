import React, { createContext, useContext, useState } from 'react';

const CommentedPostsContext = createContext();

export const CommentedPostsProvider = ({ children }) => {
  const [commentedPosts, setCommentedPosts] = useState([]);

  const addCommentedPost = (post) => {
    setCommentedPosts((prevPosts) => {
      if (!prevPosts.find(p => p.id === post.id)) {
        return [...prevPosts, post];
      }
      return prevPosts;
    });
  };

  return (
    <CommentedPostsContext.Provider value={{ commentedPosts, addCommentedPost }}>
      {children}
    </CommentedPostsContext.Provider>
  );
};

export const useCommentedPosts = () => useContext(CommentedPostsContext);
