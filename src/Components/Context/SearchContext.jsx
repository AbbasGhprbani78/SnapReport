import { useState } from "react";
import { createContext } from "react";


export const SearchContext = createContext();

export function SearchProvider({ children }) {

        const [searchResult, setSearchResult] = useState([])
        const [isAccident, setIsAccident] = useState(null)
        const [locationMe, setLocationMe] = useState("")
        const [search, setSearch] = useState("")

        return (

                <SearchContext.Provider value={{
                        searchResult,
                        setSearchResult,
                        search,
                        setSearch,
                        isAccident,
                        setIsAccident,
                        locationMe,
                        setLocationMe
                }}>
                        {children}
                </SearchContext.Provider>
        )
}
