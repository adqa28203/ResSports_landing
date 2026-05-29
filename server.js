const http = require('http');
const fs = require('fs'); // Thư viện đọc file hệ thống
const path = require('path');
const PORT = 5000;

const server = http.createServer((req, res) => {
    // Đọc file landing.html để trả về cho người dùng
    fs.readFile(path.join(__dirname, 'landing.html'), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Lỗi không tìm thấy file landing.html!');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`[Thông báo] Landing Page đang chạy tại địa chỉ: http://localhost:${PORT}`);
});