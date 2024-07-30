import { useState } from "react";
import { createContext } from "react";


export const SearchContext = createContext();

export function SearchProvider({ children }) {

        const [searchResult, setSearchResult] = useState([])

        return (

                <SearchContext.Provider value={{ searchResult, setSearchResult }}>
                        {children}
                </SearchContext.Provider>
        )
}
