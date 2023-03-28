// CSideBar.js
// iDSimplify Frontend
// Created by Reece English on 25.03.2023

import classes from './CSideBar.module.css';
import NavigationSection from './NavigationSection';

const navData = [
    {
        sectionId: 0,
        sectionHeader: 'Identity Management',
        sectionLinks: [
            {
                linkId: 0.1,
                text: 'Users',
                link: 'users'
            },
            {
                linkId: 0.2,
                text: 'Groups',
                link: 'groups'
            }
        ]
    },
    {
        sectionId: 1,
        sectionHeader: 'Reporting',
        sectionLinks: [
            {
                linkId: 1.1,
                text: 'Scheduling',
                link: 'scheduling'
            }
        ]
    }
];

const CSideBar = (props) => {
    return (
        <aside className={`${classes.root} ${props.className}`}>
            <div className={classes.logo}>
                <h1>iDSimplify</h1>
                <h2>Control</h2>
            </div>

            <nav>
                <ul className={classes.navList}>
                    {navData.map(section => (
                        <li>
                            <NavigationSection section={section} />
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default CSideBar;