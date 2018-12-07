exports.api = [{
    url: '/api/fdse/opr/getInitData',
    method: 'GET',
    params: null,
    response: [{
        name: 'data',
        type: 'object',
    },{
        name: 'status',
        type: 'object',
        child: [{
            name: 'code',
            type: 'string'
        },{
            name: 'msg',
            type: 'string'
        }]
    }]
},{
    url: '/api/fdse/opr/statistics',
    method: 'POST',
    params: [{
        name: 'startTime',
        type: 'string',
    },{
        name: 'endTime',
        type: 'string',
    }],
    response: [{
        name: 'data',
        type: 'object',
    },{
        name: 'status',
        type: 'object',
        child: [{
            name: 'code',
            type: 'string'
        },{
            name: 'msg',
            type: 'string'
        }]
    }]
}]