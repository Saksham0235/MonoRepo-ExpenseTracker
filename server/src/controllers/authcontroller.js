import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/database.js"

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;


const setAuthCookie = (res, userId) => {
  const token = jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn: "1d"});
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
  });
};


export const register = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = db
      .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
      .run(email, hashedPassword);
    const user = { id: Number(result.lastInsertRowid), email };

    setAuthCookie(res, user.id);

    res.status(201).json({
      message: "Registration successful"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = db.prepare(
      "SELECT * FROM users WHERE email = ?"
    ).get(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    setAuthCookie(res, user.id);
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  res.json({ message: "Logged out successfully" });
};
export const getCurrentUser = (req, res) => {
  const user = db.prepare(
    "SELECT id, email FROM users WHERE id = ?"
  ).get(req.userId);

  if (!user) {
    return res.status(401).json({
      message: "User not found"
    });
  }

  res.json({ user });
};

export const getAllUsers=(req,res)=>{
  const users= db.prepare("SELECT id,email FROM users").all();
  res.json({users:users});
}