// OCOrganisations.js
// iDSimplify Frontend
// Created by Reece English on 21.02.2023

import { Outlet, useNavigate, useParams } from "react-router-dom";
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
    const { getAccessTokenWithPopup } = useAuth0();

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getOrganisations();
    }, []);

    const getOrganisations = async () => {
        setIsLoading(true);
        try {
            // Get the users access token
            const accessToken = await getAccessTokenWithPopup({ // TODO: Change to quietly when hosted
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
            console.log(data);
            setOrganisations([...data]);
        }
        catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    const rowClickHandler = (organisationID) => { navigate(`${organisationID}`); };
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
                {organisations.map(organisation => (<TableRow cols={OrgTableColumns} data={organisation} />))}
            </Table>

            {
                isLoading ? (
                    <p>Loading...</p>
                ) : (
                    organisations.length === 0 ? (
                        <p>No organisations found</p>
                    ) : (
                        <p>{organisations.length} organisations found</p>
                    )
                )
            }

            <Outlet />
        </>
    );
};

export default OCOrganisations;