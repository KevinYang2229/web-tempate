import express from "express";
const router = express.Router();

// 錯誤產生路由範例
router.get("/bad", (req, res, next) => {
  try {
    // 故意產生一個錯誤
    throw new Error("This is a bad test error!");
  } catch (error) {
    next(error); // 將錯誤傳遞給錯誤處理中間件
  }
});

router.get("/good", (req, res, next) => {
  try {
    // 故意產生一個錯誤
    res.statusCode = 400;
    throw new Error("This is a good test error!");
  } catch (error) {
    next(error); // 將錯誤傳遞給錯誤處理中間件
  }
});

export default router;
