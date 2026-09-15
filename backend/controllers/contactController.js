const db = require("../config/db");

exports.submitContact = (req,res)=>{
    console.log("CONTACT API HIT");
    console.log("Contact API hit");
    console.log(req.body);
    const{
        firstName,
        lastName,
        email,
        phone,
        plan,
        location,
        date
    }= req.body;

    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !plan ||
        !location ||
        !date
    ){
        return res.status(400).json({
            success: false,
            message:"all feild are required"
        });
    }

    const sql = `
        INSERT INTO contact_messages
        (
            first_name,
            last_name,
            email,
            phone,
            plan,
            location,
            preferred_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        firstName,
        lastName,
        email,
        phone,
        plan,
        location,
        date
    ];

    db.query(sql,values,(err,result)=>{
        if(err){
            console.log("conatct insert error",err);
            return res.status(500).json({
             success: false,
             message: "Failed to save contact message"
            });
        }
        return res.status(201).json({
            success: true,
            message: "Message sent successfully"
        });
    })

}