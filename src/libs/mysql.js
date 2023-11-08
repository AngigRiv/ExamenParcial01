import mysql from 'serverless-mysql';
export const conn= mysql({
    config:{
        host:'localhost',
        user:'root',
        password:'',
        port:'8081',
        database:'dbexamen01',
        timezone : 'America/Lima'
    }
});