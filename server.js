const http = require('http');
const fs = require('fs');
const path = require('path');

// Sử dụng cổng tự động của Cloud (Render) hoặc mặc định chạy cổng 5000 ở máy cá nhân
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    // Nếu truy cập trang chủ, đọc file landing.html bên trong folder 'pub'
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'pub', 'landing.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Hệ thống không tìm thấy file landing.html trong folder pub!');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            }
        });
    } 
    // Nếu trình duyệt gọi file ảnh image_eef743.png (hoặc bất kỳ file nào khác trong pub)
    else {
        // Lấy đường dẫn an toàn tới file nằm trong folder 'pub'
        const filePath = path.join(__dirname, 'pub', req.url);
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Không tìm thấy file tĩnh yêu cầu!');
            } else {
                // Tự động kiểm tra định dạng đuôi file để trả về cho đúng (png hoặc jpg)
                let contentType = 'application/octet-stream';
                if (filePath.endsWith('.png')) contentType = 'image/png';
                if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
                
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`[SportRes] Server đang hoạt động ổn định tại cổng: ${PORT}`);
});
