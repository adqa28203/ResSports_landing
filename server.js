const http = require('http');
const fs = require('fs');
const path = require('path');

// Sử dụng cổng tự động của Cloud (Render) hoặc mặc định chạy cổng 5000 ở máy cá nhân
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    // Luôn luôn đọc file landing.html mới được trang trí lại để hiển thị
    fs.readFile(path.join(__dirname, 'landing.html'), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Hệ thống không tìm thấy file landing.html mới!');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`[SportRes] Server đang hoạt động ổn định tại cổng: ${PORT}`);
});
