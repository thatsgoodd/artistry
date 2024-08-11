import React, { createContext, useState, useContext } from 'react';

// Context 생성
const BookmarkContext = createContext();

// Context Provider
export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(0);

  const toggleBookmark = () => {
    setBookmarks(prev => prev + 1); // 단순히 +1로 설정, 필요에 따라 로직 수정
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook
export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
};
