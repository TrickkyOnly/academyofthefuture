export const uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File is required' });
  const url = `/uploads/${req.file.filename}`;
  return res.status(201).json({ url, filename: req.file.filename });
};
