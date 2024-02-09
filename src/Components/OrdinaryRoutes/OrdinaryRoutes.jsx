import React, { useEffect, useState } from 'react';
import { IP } from '../../App'
import axios from 'axios';
import { useMyContext } from '../RoleContext';
import { isOrdinary } from './OrdinaryUtils';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function OrdinaryRoutes({ children }) {
    const [typeUser, setTypeUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()

    const validateUser = async () => {
        const refresh = localStorage.getItem('refresh');

        const body = {
            refresh: refresh,
        };

        try {
            const response = await axios.post(`${IP}//`, body);

            if (response.status === 200) {
                window.localStorage.removeItem('access');
                window.localStorage.removeItem('uuid');
                window.localStorage.setItem('access', response.data.access);
                window.localStorage.setItem('uuid', response.data.uuid);
                setTypeUser(response.data.user_type);
                setIsLoading(false)
            }

        } catch (e) {
            console.log(e);
            if (e.response.status === 401) {
                localStorage.removeItem('access')
                localStorage.removeItem('uuid')
                localStorage.removeItem('refresh')
                navigate("/signin")
            }

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        validateUser();
    }, []);

    const { sharedData } = useMyContext();
    const OrdinerTrue = isOrdinary(sharedData);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div style={{ width: "100%" }}>
            {(OrdinerTrue || typeUser === "O") ? (
                children
            ) : (
                navigate('/signin')
            )}
        </div>
    );
}