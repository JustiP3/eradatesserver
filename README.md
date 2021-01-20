TODO:

- Right now all dates are returned from /api/eras/:id - this needs to accomodate for safe/not safe dates

- The SQL query may be: "SELECT type FROM typeeras WHERE type = (SELECT name FROM datetype WHERE safe = true);"
