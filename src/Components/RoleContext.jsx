
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState(null);
  const [type, setType] = useState(null)

  const updateSharedData = (data) => {
    setSharedData(data);
  };

  const updateType = (data) => {
    setType(data)
  }

  return (
    <MyContext.Provider value={{ sharedData, updateSharedData, type, updateType }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
