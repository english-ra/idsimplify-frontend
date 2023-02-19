// TopBarNavigation.js
// iDSimplify Frontend
// Created by Reece English on 06.12.2022

import AccountTile from '../Header/AccountTile';
import classes from './TopBarNavigation.module.css';

const TopBarNavigation = () => {
    return (
        <>
            <header className={classes.header}></header>
            <header className={classes.header}>
                <AccountTile
                    className={classes.accountTile}
                />
            </header>
        </>
    );
};

export default TopBarNavigation;