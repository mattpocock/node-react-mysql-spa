const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'matt',
    password: '',
    database: 'node_test',
};

module.exports = class {
    constructor() {
        this.con = mysql.createConnection(config);
        this.connect();
    }

    connect() {
        this.con.connect((err) => {
            if (err) throw err;
            console.log('Connected!');
        })
    }

    query(sql) {
        return new Promise ((resolve, reject) => {
            this.con.query(
                sql,
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        })
    }
};
