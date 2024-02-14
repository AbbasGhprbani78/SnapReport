import React, { useEffect, useState } from 'react';
import { IP } from '../../App'
import axios from 'axios';
import { useMyContext } from '../RoleContext';
import { isManual } from './ManualUtils';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function ManualRoutes({ children }) {
    const [typeUser, setTypeUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { type, updateType } = useMyContext()
    const navigate = useNavigate()

    const validateUser = async () => {
        const refresh = localStorage.getItem('refresh');

        const body = {
            refresh: refresh,
        };

        try {
            const response = await axios.post(`${IP}/user/token/refresh/`, body);

            if (response.status === 200) {
                window.localStorage.removeItem('access');
                window.localStorage.removeItem('uuid');
                window.localStorage.setItem('access', response.data.access);
                window.localStorage.setItem('uuid', response.data.uuid);
                window.localStorage.setItem("type", response.data.user_type)
                updateType(response.data.user_type)
                setTypeUser(response.data.user_type);
                setIsLoading(false)
            }

        } catch (e) {
            console.log(e);
            if (e.response.status === 401) {
                // localStorage.clear()
                // navigate("/login")
            }

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        validateUser();
    }, []);

    const { sharedData } = useMyContext();
    const OrdinerTrue = isManual(sharedData);

    if (isLoading) {
        return <Loading />
    }

    console.log(OrdinerTrue)
    console.log(typeUser)

    return (
        <div style={{ width: "100%" }}>
            {(OrdinerTrue || typeUser === "M") ? (
                children
            ) : (
                navigate('/login')
            )}
        </div>
    );
}
