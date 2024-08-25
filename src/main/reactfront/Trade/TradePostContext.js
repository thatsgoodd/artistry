import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import initialPosts from './TradePosts'; // 게시물 데이터 임포트

// Create a Context
const PostContext = createContext();

// Provider component
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // Load posts from AsyncStorage
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const storedPosts = await AsyncStorage.getItem('posts');
        console.log('Stored posts:', storedPosts); // Debugging log
        if (storedPosts) {
          const parsedPosts = JSON.parse(storedPosts);
          console.log('Parsed posts:', parsedPosts); // Debugging log
          if (Array.isArray(parsedPosts)) {
            setPosts(parsedPosts);
          } else {
            console.warn('Stored data is not an array. Using initial posts.');
            setPosts(initialPosts); // If not an array, use initial data
          }
        } else {
          setPosts(initialPosts); // If no data, use initial data
        }
      } catch (error) {
        console.error('Failed to load posts:', error);
        setPosts(initialPosts); // 오류가 발생할 경우 초기 데이터로 초기화
      }
    };
    loadPosts();
  }, []);

  // Save posts to AsyncStorage
  const savePosts = async (updatedPosts) => {
    try {
      await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Failed to save posts:', error);
    }
  };

  // Function to handle liking a post
  const toggleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, likes: post.likes + (post.liked ? -1 : 1), liked: !post.liked }
        : post
    );
    savePosts(updatedPosts);
  };

  // Function to add a new comment
  const addComment = (postId, comment) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    );
    savePosts(updatedPosts);
  };

  // Function to edit a post
  const editPost = (postId, updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, ...updatedPost }
        : post
    );
    savePosts(updatedPosts);
  };

  // Function to delete a post
  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    savePosts(updatedPosts);
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, toggleLike, addComment, editPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

// Custom hook for using the context
export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};