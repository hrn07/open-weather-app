import { createContext, useState,useContext } from "react";

const LocationContext = createContext();

export const LocationProvider = ({children}) => {
    const [location, setLocation] = useState(null)
    const values = {location, setLocation}
    return <LocationContext.Provider value={values}>{children}</LocationContext.Provider>
}

export const useLocation = () => useContext(LocationContext)