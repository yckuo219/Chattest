const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 設置靜態文件夾
app.use(express.static(path.join(__dirname, 'public')));

// 設置主路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
