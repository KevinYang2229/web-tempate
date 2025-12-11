const uploadFile = (req, res, next) => {
  if (!req.file) {
    const error = new Error("No file uploaded");
    res.status(400);
    return next(error);
  }
  res.status(200).send({
    message: "File uploaded successfully",
    file: req.file,
  });
};

export { uploadFile };
