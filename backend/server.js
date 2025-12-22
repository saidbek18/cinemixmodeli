const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const User = require('./Users/User');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB ulanish
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB muvaffaqiyatli ulandi"))
    .catch((err) => console.log("❌ Baza xatosi:", err));

// LOGIN API - Yangilangan
app.post('/api/auth/login', async (req, res) => {
    try {
        const { phone, password } = req.body;
        console.log("Login so'rovi keldi:", phone); // Terminalda ko'rish uchun

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ msg: "Foydalanuvchi topilmadi" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Parol noto'g'ri" });
        }

        // Token yaratish
        const secret = process.env.JWT_SECRET || "fallback_secret";
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });

        res.json({ 
            token, 
            user: { phone: user.phone },
            msg: "Muvaffaqiyatli kirdingiz!" 
        });

    } catch (err) {
        console.error("LOGIN XATOSI:", err); // Xatoni terminalda chiqarish
        res.status(500).json({ msg: "Serverda ichki xato yuz berdi" });
    }
});

// SIGNUP API (Ro'yxatdan o'tish)
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { phone, password } = req.body;
        let user = await User.findOne({ phone });
        if (user) return res.status(400).json({ msg: "Bu raqam allaqachon bor" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ phone, password: hashedPassword });
        await user.save();
        res.status(201).json({ msg: "Ro'yxatdan o'tdingiz!" });
    } catch (err) {
        res.status(500).json({ msg: "Serverda xato" });
    }
});

app.listen(5000, () => console.log("🚀 Server 5000-portda yondi"));