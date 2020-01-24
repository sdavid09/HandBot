const sqlite3 = require('sqlite3').verbose();


class DB {

    constructor() {
        this.db_file = './data/BOT_DATA.db';
     }

    run(sql, params=[]) {
        this.db = new sqlite3.Database(this.db_file)
        this.db.run(sql, params);
        this.db.close;
     }

    get (sql, params=[]) {
        this.db = new sqlite3.Database(this.db_file)
        let get_db_promise = new Promise((resolve, reject)=> {
            this.db.get( sql, params, ( err, rows ) => {
                if (err)
                    return reject( err );
                resolve( rows );
            } );
        });
        this.db.close;
        return get_db_promise;
    }

}

module.exports = {
    DB
};