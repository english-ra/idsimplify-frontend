// OCOrganisations.js
// iDSimplify Frontend
// Created by Reece English on 21.02.2023

import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Table from "../../../../components/Table/Tables/Table";
import TableRow from "../../../../components/Table/Rows/TableRow";
import CircularButton from '../../../../components/Buttons/CircularButton';

import classes from './OCOrganisations.module.css';
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const OrgTableColumns = [
    {
        id: 0,
        friendlyTitle: 'Name',
        dataKey: 'name'
    }
];

const OCOrganisations = (props) => {
    const [organisations, setOrganisations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getAccessTokenSilently } = useAuth0();

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getOrganisations();
    }, []);

    useEffect(() => {
        const id = params.tenancyId;
        if (location.pathname === `/oc/${id}/organisations`) { getOrganisations(); }
    }, [location]);

    const getOrganisations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Get the users access token
            const accessToken = await getAccessTokenSilently({ // TODO: Change to quietly when hosted
                authorizationParams: {
                    audience: 'https://api.idsimplify.co.uk',
                    scope: 'access'
                }
            });

            // Get the data
            const response = await fetch(`https://api.idsimplify.co.uk/tenancies/${params.tenancyId}/organisations`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                setOrganisations([...data]);
            } else {
                throw new Error(data);
            }
        }
        catch (err) {
            console.log(err);
            setError(err);
        }
        setIsLoading(false);
    };

    const rowClickHandler = (organisation) => { navigate(`${organisation.id}`); };
    const createOrganisationButtonHandler = () => { navigate('create'); };

    return (
        <>
            <div className={classes.titleDiv}>
                <h1>Organisations</h1>
                <CircularButton
                    text='+'
                    onClick={createOrganisationButtonHandler}
                />
            </div>

            <Table
                className={classes.table}
                headings={OrgTableColumns}
            >
                {organisations.map(organisation => (<TableRow key={organisation.id} cols={OrgTableColumns} data={organisation} onClick={rowClickHandler} />))}
            </Table>

            { isLoading && <p>Loading...</p> }
            { !isLoading && !error && <p>{organisations.length} organisations found</p> }
            { !isLoading && error && <p className='errorText'>{error.message}</p> }
            
            <Outlet />
        </>
    );
};

export default OCOrganisations;