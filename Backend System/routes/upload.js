const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const router = express.Router();


const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (checkFileType(file.originalname, 'images') || checkFileType(file.originalname, 'pdf')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
        }
    }
});

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
router.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    // Save the file
    const filePath = path.join(uploadDir, Date.now() + path.extname(file.originalname));
    fs.rename(file.path, filePath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload failed', error: err });
        }
        res.json({ message: 'File uploaded successfully', filePath });
    });
});

module.exports = router;