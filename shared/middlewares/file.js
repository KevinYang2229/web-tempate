import multer from "multer";
import path from "path";

const fileMiddleware = (req, res, next) => {
  // 配置 multer storage 來保留原始檔名
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      // 保留原始檔名，並加上時間戳避免重複
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${timestamp}${ext}`);
    },
  });

  // 創建並執行 multer middleware
  const upload = multer({ storage: storage }).single("file");
  upload(req, res, next);
};

export default fileMiddleware;
