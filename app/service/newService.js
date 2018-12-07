const Service = require('egg').Service;

class NewService extends Service {
    validateType(item, type) {
        let itemType = typeof item, result = true;
        switch(type) {
            case 'object':
                result = !Array.isArray(item); 
                break;
            case 'array':
                result = Array.isArray(item);
                break;
            case 'string':
                result = itemType === 'string';
                break;
            case 'number':
                result = itemType === 'number';
                break;
            case 'boolean':
                result = itemType === 'boolean';
                break;
        }
        return true;
    }
    async validateParams(req, option) {
        let result = [];
        if(option.params){
            result = option.params.map(item => {
                return this.validateType(req.body[item.name], item.type);
            });
        }
        return result;
    }
    async validateResponse(data, option) {
        let result = [];
        if(option.response){
            result = option.response.map(item => {
                return this.validateType(data[item.name], item.type);
            });
        }
        console.log(result);
        return result;
    }
    async generateOptions(head) {

    }
    async api(api, options) {
        const serverUrl = this.config.serverUrl;
        const res = await this.ctx.curl(`${serverUrl}${api}`,options);
        return res;
    }
    async mockapi(api, options) {

    }
}

module.exports = NewService;