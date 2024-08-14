import React, { createContext, useContext, useState } from 'react';

// Context 생성
const CollaborationLocationContext = createContext();

// Provider 컴포넌트
export const CollaborationLocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState({ province: null, district: null });

  return (
    <CollaborationLocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </CollaborationLocationContext.Provider>
  );
};

// useLocation 훅
export const useLocation = () => {
  return useContext(CollaborationLocationContext);
};
