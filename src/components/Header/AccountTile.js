

import classes from './AccountTile.module.css';

const AccountTile = (props) => {
    return (
        <div>
            <span className={classes.nameLabel}>Firstname Lastname</span>
            <div className={classes.userIcon}>
                <span>AA</span>
            </div>
        </div>
    );
};

export default AccountTile;