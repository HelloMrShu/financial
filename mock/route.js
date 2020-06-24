const getIndustryList = [
    {
        id: '1',
        name: '分类1',
        desc: '西湖区湖底公园1号',
    },
    {
        id: '5',
        name: '分类2',
        desc: '西湖区湖底公园1号',
    },
    {
        id: '6',
        name: '分类3',
        desc: '西湖区湖底公园1号',
    },
    {
        id: '7',
        name: '分类4',
        desc: '西湖区湖底公园1号',
    }
];

export default {
    '/api/auth_routes': {
        '/form/advanced-form': {
            authority: ['admin', 'user'],
        },
    },
    'GET  /api/industry/query': getIndustryList,
};
