// const mysql = require("mysql2");
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = supabase;

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Ig@root123",
//     database: "react_auth"
// });

// db.connect((err) => {
//     if (err) {
//         console.error("MySQL connection failed:", err);
//         return;
//     }

//     console.log("MySQL connected successfully");
// });

// module.exports = db;