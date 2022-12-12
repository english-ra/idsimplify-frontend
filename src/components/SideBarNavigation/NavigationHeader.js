import classes from './NavigationHeader.module.css';

const NavigationHeader = (props) => {
    return (
        <li>
            <button
                className={classes.button}
                onClick={props.onClick}
            >
                {props.data.text}
            </button>
        </li>
    );
};

export default NavigationHeader;