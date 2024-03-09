import multer from 'multer';
import path from 'path'
import sanitizeFilename from 'sanitize-filename'


// Configure Multer storage
const sanitizeFile = (req, file, cb) => {
    const sanitized = path.basename(sanitizeFilename(file.originalname), path.extname(file.originalname));
    cb(null, sanitized);
  };
  
  const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      sanitizeFile(req, file, (err, sanitizedName) => {
        if (err) return cb(err);
        // Extract the extension from the original filename (lowercase)
        const ext = path.extname(file.originalname).toLowerCase();
  
        const now = new Date();
        // Convert to IST (adjust offset as needed)
        const istDate = new Date(now.getTime() + 5.5 * 60 * 60 * 1000); // IST is UTC +5:30
  
        const timestamp = istDate
          .toISOString()
          .replace(/T/, '-') // Replace 'T' with hyphen
          .replace(/\..+/, '') // Remove milliseconds
          .substring(0, 16); // Extract mmddhh without seconds
  
        cb(null, sanitizedName + '-' + timestamp + (ext ? ext : '')); // Append extension only if it exists
      });
    }
  });
  
  
  export const upload = multer({ storage: storage });