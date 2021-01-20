var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        // database is open 

        console.log('Connected to the SQLite database.')

        //create datetype table
        db.run(`CREATE TABLE datetype (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE, 
            safe BOOL,
            CONSTRAINT name_unique UNIQUE (name)
            )`,
        (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                const insert = 'INSERT INTO datetype (name, safe) VALUES (?, ?)'
                db.run(insert, ["picnic", "true"])
                db.run(insert, ["disco", "true"])
                db.run(insert, ["hike", "false"])
                db.run(insert, ["movies", "true"])
                db.run(insert, ["drive-in", "false"])
            }
        });

       
        //create era table
        db.run(`CREATE TABLE era (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            era TEXT UNIQUE,
            CONSTRAINT era_unique UNIQUE (era)
        )`,
        (err) => {
            if (err) {
                //Table already created
            } else {
                //Table just created, adding some rows
                const insert = 'INSERT INTO era (era) VALUES (?)'
                db.run(insert, ["1920s"])
                db.run(insert, ["1930s"])
                db.run(insert, ["1940s"])
                db.run(insert, ["1950s"])
                db.run(insert, ["1960s"])
                db.run(insert, ["1970s"])
                db.run(insert, ["1980s"])
                db.run(insert, ["1990s"])
                db.run(insert, ["2000s"])
                console.log("added some rows into database")
            }
        });

        //create join table 
        db.run(`CREATE TABLE typeeras (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            era TEXT,
            type TEXT
        )`,
        (err) => {
            if (err) {
                //Table already created
            } else {
                //Table just created, adding some rows
                const insert = 'INSERT INTO typeeras (era, type) VALUES (?, ?)'
                db.run(insert, ["1920s", "picnic"])
                db.run(insert, ["1930s", "picnic"])  
                db.run(insert, ["1940s", "hike"])
                db.run(insert, ["1950s", "drive-in"])  
                db.run(insert, ["1960s", "disco"])
                db.run(insert, ["1970s", "disco"])  
                db.run(insert, ["1980s", "movies"])
                db.run(insert, ["1990s", "disco"])     
                db.run(insert, ["2000s", "movies"])            
            }
        });

     
        // database is open
    }
  
});


module.exports = db