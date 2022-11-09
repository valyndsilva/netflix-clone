import React, { createContext, useState, ReactNode, useEffect } from "react";
interface GlobalProviderProps {
  children: ReactNode;
}
interface Global {
  tokenData: any;
  setTokenData: (tokenData: any) => void;
  subscriptionData: any;
  setSubscriptionData: (subscriptionData: any) => void;
  profile: any;
  setProfile: (profile: {
    displayName: string | null ;
    photoURL: string | null ;
  }) => void;
  // setProfile: any;
  login: any;
  setLogin: (login: any) => void;
}
// create context
const GlobalContext = createContext<Global>({} as Global);

// provider components
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  
  const initialState = {
    displayName: localStorage.getItem("displayName"),
    photoURL: localStorage.getItem("photoURL"),
  };

  const [tokenData, setTokenData] = useState({});
  const [subscriptionData, setSubscriptionData] = useState({});
  // const [profile, setProfile] = useState({displayName:null,photoURL:null});
  const [profile, setProfile] = useState(initialState);
  const [login, setLogin] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        tokenData,
        setTokenData,
        subscriptionData,
        setSubscriptionData,
        profile,
        setProfile,
        login,
        setLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
