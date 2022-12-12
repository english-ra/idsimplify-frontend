

export const sideBarTopNavigationData = [
    {
        id: 0,
        icon: null,
        text: 'Dashboard',
        link: 'dashboard',
        sublinks: []
    },
    {
        id: 1,
        icon: null,
        text: 'Identity Management',
        link: 'identity-management',
        sublinks: [
            {
                id: 1.0,
                icon: null,
                text: 'Users',
                link: 'identity-management/users'
            },
            {
                id: 1.1,
                icon: null,
                text: 'Groups',
                link: 'identity-management/groups'
            },
        ]
    },
    {
        id: 2,
        icon: null,
        text: 'Compliance',
        link: 'compliance',
        sublinks: [
            {
                id: 2.0,
                icon: null,
                text: 'Permission Auditing',
                link: 'compliance/permission-auditing'
            }
        ]
    },
    {
        id: 3,
        icon: null,
        text: 'Reporting',
        link: 'reporting',
        sublinks: [
            {
                id: 3.0,
                icon: null,
                text: 'Licences',
                link: 'reporting/licences'
            },
        ]
    }
];