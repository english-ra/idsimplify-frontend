import classes from './NavigationHeader.module.css';

const NavigationHeader = (props) => {
    return (
        <li>
            <button
                className={classes.button}
                onClick={props.onClick}
            >
                {props.data.text}
                { props.data.sublinks.length !== 0 && <span>v</span>}
            </button>
        </li>
    );
};

export default NavigationHeader;