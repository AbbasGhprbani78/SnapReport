import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { IP } from "../../App";
export const SearchContext = createContext();

export function SearchProvider({ children }) {

        const [searchResult, setSearchResult] = useState([])
        const [isAccident, setIsAccident] = useState(null)
        const [locationMe, setLocationMe] = useState("")
        const [allLocations, setAllLocation] = useState()
        const [search, setSearch] = useState("")

        const getAllloc = async () => {
                const access = localStorage.getItem("access")
                const headers = {
                        Authorization: `Bearer${access}`
                }
                try {
                        const response = await axios.post(`${IP}/form/send-data-to-api/`, {
                                headers
                        })

                        if (response.status === 200) {
                                getlocationCount()
                        }

                } catch (error) {
                        if (error.response.status === 401) {
                                localStorage.clear()
                        }
                }
        }


        const randomData = async () => {

                const access = localStorage.getItem("access")
                const headers = {
                        Authorization: `Bearer${access}`
                }
                try {
                        const response = await axios.post(`${IP}/form/random-data/`, {
                                headers
                        })

                        if (response.status === 201) {
                                getAllloc()
                        }
                } catch (error) {

                        if (error.response.status === 401) {
                                localStorage.clear()
                        }
                }
        }


        const getlocationCount = async () => {
                const access = localStorage.getItem("access");
                const headers = {
                        Authorization: `Bearer ${access}`
                };
                try {
                        const response = await axios.get(`${IP}/form/last-loc-status/`, { headers });

                        if (response.status === 200) {
                                setAllLocation(response.data);
                                let selectedLocation = response?.data?.reverse().find(loc => loc.label === 2) ||
                                allLocations.reverse().find(loc => loc.label === 1) ||
                                allLocations.reverse().find(loc => loc.label === 0);
                                setIsAccident(selectedLocation.label)
                                setLocationMe(selectedLocation.location)
                        }

                } catch (e) {
                        console.log(e);
                        if (e.response.status === 401) {
                                localStorage.clear();
                        }
                }
        };


        useEffect(() => {
                randomData();
                const interval = setInterval(() => {
                        randomData();
                }, 30000);
                return () => clearInterval(interval);
        }, []);


        return (

                <SearchContext.Provider value={{
                        searchResult,
                        setSearchResult,
                        search,
                        setSearch,
                        isAccident,
                        setIsAccident,
                        locationMe,
                        setLocationMe,
                        allLocations
                }}>
                        {children}
                </SearchContext.Provider>
        )
}
