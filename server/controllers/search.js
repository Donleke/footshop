import Products from "../model/Products.js";

export const getProductBySearch = async (req, res) => {
  const query = req.query.q;

  try {
    const result = await Products.find({
      title: { $regex: query, $options: "i" },
    }).limit(20);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
