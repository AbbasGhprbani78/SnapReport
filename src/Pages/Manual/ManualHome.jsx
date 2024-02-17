import React, { useEffect, useState } from 'react'
import '../../Style/Home.css'
import Header from '../../Components/Header/Header'
import { IP } from '../../App';
import axios from 'axios';

export default function ManualHome() {
    const [formData, setFormData] = useState([])

    const getFormData = async () => {
        const access = localStorage.getItem("access")
        const headers = {
            Authorization: `Bearer ${access}`
        };
        try {
            const response = await axios.get(`${IP}/get-form/`, {
                headers,
            })

            if (response.status === 200) {
                console.log(response)
            }

        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                // localStorage.clear()
                // navigate("/login")
            }
        }
    }

    useEffect(() => {
        getFormData
    }, [])

    return (
        <div className="home-container">
            <Header />
        </div>
    )
}
