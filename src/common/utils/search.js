const search = (req, fields = []) => {
  const keyword = req.query.search || "";
  if (!keyword || fields.length === 0) return {};

  const regex = new RegExp(keyword, "i"); // tìm gần đúng, không phân biệt hoa thường

  // Trả về điều kiện $or với các field
  return {
    $or: fields.map((field) => ({ [field]: regex })),
  };
};

export default search;
