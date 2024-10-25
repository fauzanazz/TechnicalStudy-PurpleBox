const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// File type validation
function checkFileType(fileName, type) {
    let filetypes;
    if (type === 'images') {
        filetypes = /jpeg|jpg|png|gif|bmp|tiff/;
    } else if (type === 'pdf') {
        filetypes = /pdf/;
    } else if (type === 'documents') {
        filetypes = /doc|docx|txt|rtf/;
    } else if (type === 'videos') {
        filetypes = /mp4|avi|mkv|mov/;
    } else {
        return false;
    }
    const extname = filetypes.test(path.extname(fileName).toLowerCase());
    return extname;
}

// Upload route
router.post('/upload', (req, res) => {
    const file = req.files?.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Sanitize file name
    file.name = file.name.replace(/[^a-z0-9.]/gi, '_');

    // Validate file type
    if (!checkFileType(file.name)) {
        return res.status(400).json({ message: 'Invalid file type. Only images and PDFs are allowed.' });
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return res.status(400).json({ message: 'File size exceeds the 5MB limit' });
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    // Save the file
    const filePath = path.join(uploadDir, Date.now() + path.extname(file.name));
    fs.writeFile(filePath, file.data, (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload failed', error: err });
        }
        res.json({ message: 'File uploaded successfully', filePath });
    });
});

module.exports = router;
