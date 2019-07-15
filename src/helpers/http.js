import axios from 'axios';

class Http {
    constructor(){
        this.config = {
            url:'http://89.31.63.246',
            token: 'f33c2d73a9e1d1a639bb8294b4569c5bb4b50511',
            user_info: {"name":"Bibek Shah","userRole":"Super Admin"},
            bearer_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGV0YWlsIjp7InVzZXJfaWQiOjQ0LCJncm91cF9pZCI6MSwiZGlzdHJpYnV0b3IiOlsxLDIsM119LCJpYXQiOjE1MjYyODUyNTEsImV4cCI6MTU1NzgyMTI1MSwiaXNzIjoiSVNPIn0.PqfTq5jXi7Ij2FjMalJV5gpLcZeE6IW686_Xfs-iMTc'
        }
        this.headers =      { 
            headers: { 
                Authorization: `Bearer ${this.config.bearer_token}`,
                'Accept': 'application/json'
            }
        }
    }
    async get(call_attr,call_type,projection,start_date,end_date){
        const callApi = call_attr === 'detail' ? `type=${call_type}&projection=${projection}&`: '';
        return await axios.get(`${this.config.url}/api/v1/calls/${call_attr}?${callApi}start_date=${start_date}&end_date=${end_date}`,this.headers)
    }
    async getDseData(detail) {
        return await axios.get(`${this.config.url}/api/v1/dse/${detail}`,this.headers)
    }
}

export default new Http();