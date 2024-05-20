import { createContext, useContext, useState } from "react";

const YearContext = createContext();

export const useYear = () => useContext(YearContext);

export const YearProvider = ({ children }) => {
  const [year, setYear] = useState(-300000);

  const updateYear = (newYear) => {
    setYear(newYear);
  };

  return (
    <YearContext.Provider value={{ year, updateYear }}>
      {children}
    </YearContext.Provider>
  );
};