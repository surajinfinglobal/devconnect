const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Backend API is working"
    });
});
// const PORT = process.env.PORT || 5000;

// if (require.main === module) {
//     const PORT = process.env.PORT || 5000;

//     app.listen(PORT, () => {
//         console.log(`Server running on http://localhost:${PORT}`);
//     });
// }
// app.get("/api/test-supabase", async (req, res) => {
//      try {
//         const supabase = require("./config/supabase");

//         const { data, error } = await supabase
//             .from("contact_messages")
//             .select("id")
//             .limit(1);

//         if (error) {
//             console.error("❌ SUPABASE ERROR:", error);

//             return res.status(500).json({
//                 success: false,
//                 supabaseConnected: false,
//                 message: error.message
//             });
//         }

//         console.log("✅ SUPABASE CONNECTED");

//         return res.json({
//             success: true,
//             supabaseConnected: true,
//             message: "Supabase connected successfully",
//             data
//         });

//     } catch (error) {
//         console.error("❌ SUPABASE CONNECTION ERROR:", error);

//         return res.status(500).json({
//             success: false,
//             supabaseConnected: false,
//             message: error.message
//         });
//     }
// });

module.exports = app;