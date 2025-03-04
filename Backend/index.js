const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas
async function startServer() {
    try {
        console.log('Bắt đầu kết nối MongoDB...');
        await mongoose.connect('mongodb+srv://nguyenvanmsang:Sang2932007@cluster.mvnmj.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster', {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Kết nối MongoDB thành công!');

        // API Register
        app.post('/register', async (req, res) => {
            const { username, nickname, password } = req.body;
            try {
                let user = await User.findOne({ username });
                if (user) return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                user = new User({ username, nickname, password: hashedPassword });
                await user.save();
                res.status(201).json({ message: 'Đăng ký thành công!' });
            } catch (error) {
                console.error('Lỗi đăng ký:', error);
                res.status(500).json({ message: 'Lỗi server' });
            }
        });

        // API Login
        app.post('/login', async (req, res) => {
            const { username, password } = req.body;
            try {
                const user = await User.findOne({ username });
                if (!user || !(await bcrypt.compare(password, user.password))) {
                    return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
                }
                const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
                res.json({
                    message: 'Đăng nhập thành công!',
                    token,
                    user: { username: user.username, nickname: user.nickname }
                });
            } catch (error) {
                console.error('Lỗi đăng nhập:', error);
                res.status(500).json({ message: 'Lỗi server' });
            }
        });

        const PORT = 3000;
        app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
    } catch (err) {
        console.error('Lỗi kết nối MongoDB:', err);
        process.exit(1); 
    }
}

startServer();