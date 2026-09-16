const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check existing user
        const { data: existingUser, error: checkError } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle();

        if (checkError) {
            console.error("Check user error:", checkError);

            return res.status(500).json({
                message: "Database error",
                error: checkError.message
            });
        }

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert([
                {
                    name,
                    email,
                    password: hashedPassword
                }
            ])
            .select("id, name, email")
            .single();

        if (insertError) {
            console.error("Insert user error:", insertError);

            return res.status(500).json({
                message: "Failed to create user",
                error: insertError.message
            });
        }

        return res.status(201).json({
            message: "Signup successful",
            user: newUser
        });

    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user in Supabase
        const { data: user, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .maybeSingle();

        if (userError) {
            console.error("Find user error:", userError);

            return res.status(500).json({
                message: "Database error",
                error: userError.message
            });
        }

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};