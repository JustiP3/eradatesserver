var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE datetype (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE, 
            CONSTRAINT name_unique UNIQUE (name)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO datetype (name) VALUES (?)'
                db.run(insert, ["picnic"])
                db.run(insert, ["disco"])
                console.log("added some rows into database")
            }
        });  
    }
  
});


module.exports = db