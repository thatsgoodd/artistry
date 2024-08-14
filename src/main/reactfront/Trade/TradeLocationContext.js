import React, { createContext, useContext, useState } from 'react';

// Context 생성
const TradeLocationContext = createContext();

// Provider 컴포넌트
export const TradeLocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState({ province: null, district: null });

  return (
    <TradeLocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </TradeLocationContext.Provider>
  );
};

// useLocation 훅
export const useLocation = () => {
  return useContext(TradeLocationContext);
};
