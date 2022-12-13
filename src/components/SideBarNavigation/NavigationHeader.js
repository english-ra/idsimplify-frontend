

import { NavLink } from 'react-router-dom';

import classes from './NavigationHeader.module.css';

const NavigationHeader = (props) => {
    return (
        <li>
            <NavLink to={'/' + props.data.link} >
                <button
                    className={classes.button}
                    onClick={props.onClick}
                >
                    { props.data.text }
                    { props.data.sublinks.length !== 0 && <span className='material-symbols-outlined'>expand_more</span> }
                </button>
            </NavLink>
        </li>
    );
};

export default NavigationHeader;