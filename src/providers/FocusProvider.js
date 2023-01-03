import React,{ useState, useEffect, createContext} from "react";

export const FocusContext = createContext();

export const FocusProvider = ({children}) => {
    const [focus,setFocus] = useState('');
    return(
        <FocusContext.Provider value={{focus,setFocus}} > 
            {children}
        </FocusContext.Provider>
    );
};

export default FocusProvider;