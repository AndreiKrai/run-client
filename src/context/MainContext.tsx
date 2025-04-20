import { createContext, useContext, ReactNode, useMemo } from "react";
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
// Create context
export const MainContext = createContext({});
type Props = {
  children: ReactNode;
};
export const MainProvider = ({ children }: Props) => {
  const value = useMemo(() => ({}), []);

  return (
    <MainContext.Provider value={value}>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
