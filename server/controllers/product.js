import Products from "../model/Products.js";
//get featured products

export const getFeaturedProducts = async (req, res) => {
  try {
    const productFeatured = await Products.find({ isFeatured: true });
    if (productFeatured) {
      res.json(productFeatured);
    } else {
      res.status(404);
      throw new Error("Featured Products not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all products
export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get single product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Products.findOne({ slug: req.params.slug });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};


//get products by category

export const getProductsByCategory = async (req, res, next) => {
  try {
    const products = await Products.find({ category: req.params.categoryid });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}