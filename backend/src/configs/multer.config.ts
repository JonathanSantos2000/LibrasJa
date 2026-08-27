import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const createUpload = (folder: string) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = `uploads/${folder}`;

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
      },

      filename: (req, file, cb) => {
        const uniqueName =
          Date.now() +
          '-' +
          Math.round(Math.random() * 1e9);

        cb(
          null,
          uniqueName + path.extname(file.originalname)
        );
      },
    }),
  });
};