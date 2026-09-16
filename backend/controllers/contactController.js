const supabase = require("../config/supabase");

exports.submitContact = async (req, res) => {
    try {

        console.log("CONTACT DATA:", req.body);

        const {
            firstName,
            lastName,
            email,
            phone,
            plan,
            location,
            date
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !plan ||
            !location ||
            !date
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const { data, error } = await supabase
            .from("contact_messages")
            .insert([
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    plan: plan,
                    location: location,
                    preferred_date: date
                }
            ])
            .select()
            .single();

        if (error) {

            console.error("Supabase contact error:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to save contact message",
                error: error.message
            });
        }

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data
        });

    } catch (error) {

        console.error("Contact controller error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};