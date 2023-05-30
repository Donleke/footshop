import mongoose from "mongoose";
import mongooseSlugPlugin from "mongoose-slug-plugin";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxLength: 200,
    },
    images: {
      type: [String],
      required: true,
    },
    extra: {
      type: [String],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

ProductSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });

export default mongoose.model("Product", ProductSchema);
