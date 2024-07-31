import { useState } from "react";
import { createContext } from "react";


export const SearchContext = createContext();

export function SearchProvider({ children }) {

        const [searchResult, setSearchResult] = useState([])
        const [search, setSearch] = useState("")

        return (

                <SearchContext.Provider value={{ searchResult, setSearchResult, search, setSearch }}>
                        {children}
                </SearchContext.Provider>
        )
}
