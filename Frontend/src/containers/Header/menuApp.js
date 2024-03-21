export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.user',
        menus: [
            // {
            //     name: 'menu.admin.crud', link: '/system/user-manage',
            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.admin.doctor-manager', link: '/system/doctor-manage',
                // subMenus: [
                //     // { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //     // { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                // ]
            },
            { //Quản lý kế hoạch khám bệnh

                name: 'menu.doctor.schedule', link: '/doctor/schedule-manage',
            },
            // {
            //     name: 'menu.admin.admin-manager', link: '/system/admin-manage',
            // },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //Quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.clinic-manage', link: '/system/clinic-manage',
            }
        ]
    },
    { //Quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.specialty-manage', link: '/system/specialty-manage',
            }
        ]
    },
    { //Quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.handbook-manage', link: '/system/handbook-manage',
            }
        ]
    },
];

export const doctorMenu = [
    { //Quản lý kế hoạch khám bệnh
        name: 'menu.doctor.schedule-manage',
        menus: [
            {
                name: 'menu.doctor.schedule', link: '/doctor/schedule-manage',
            },
            {
                name: 'menu.doctor.patient', link: '/doctor/patient-manage',
            },
        ]
    },
];