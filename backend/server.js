const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./Users/User');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB ulanish
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB muvaffaqiyatli ulandi"))
    .catch((err) => {
        console.error("❌ Baza ulanishida xato:", err.message);
        process.exit(1); // Baza ulanmasa serverni to'xtatish
    });

// SIGNUP API
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { phone, password } = req.body;
        
        if (!phone || !password) {
            return res.status(400).json({ msg: "Barcha maydonlarni to'ldiring" });
        }

        let user = await User.findOne({ phone });
        if (user) return res.status(400).json({ msg: "Bu raqam allaqachon ro'yxatdan o'tgan" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ phone, password: hashedPassword });
        await user.save();
        
        res.status(201).json({ msg: "Ro'yxatdan muvaffaqiyatli o'tdingiz!" });
    } catch (err) {
        console.error("SIGNUP XATOSI:", err);
        res.status(500).json({ msg: "Serverda xato yuz berdi" });
    }
});

// LOGIN API
app.post('/api/auth/login', async (req, res) => {
    try {
        const { phone, password } = req.body;

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ msg: "Foydalanuvchi topilmadi" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Parol noto'g'ri" });
        }

        const secret = process.env.JWT_SECRET || "maxfiy_kalit_123";
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });

        res.json({ 
            token, 
            user: { phone: user.phone },
            msg: "Xush kelibsiz!" 
        });

    } catch (err) {
        console.error("LOGIN XATOSI:", err);
        res.status(500).json({ msg: "Serverda ichki xato" });
    }
});

// Portni sozlash (Render uchun juda muhim)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT}-portda muvaffaqiyatli ishga tushdi`);
});