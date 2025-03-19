import { createContext, useState } from "react";

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
}
export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  reset: () => null,
});
const initialAppContext = getInitialAppContext();
export const AppContext = createContext<AppContextInterface>(initialAppContext);
export const AppProvider = ({
  children,
  defaultValue = initialAppContext,
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    return savedAuth === "true" || defaultValue.isAuthenticated;
  });
  const reset = () => {
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,

        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
