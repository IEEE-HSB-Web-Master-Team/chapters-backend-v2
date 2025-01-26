import multer, { diskStorage } from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = diskStorage({
    destination: (req, file, cb) => {
        const folderName = req.query.folderName || 'default';
        const safeFolderName = path.basename(folderName);
        const folderPath = path.join(__dirname, '..', 'public', 'assets', safeFolderName);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e4);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

export const upload = multer({ storage });
