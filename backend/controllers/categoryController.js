import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { genSaltSync } from "bcryptjs";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }

    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({ error: "Category not found" });
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;

    const removed = await Category.findByIdAndDelete(categoryId);
    if (!removed) {
      return res.status(404).json({ error: "No such Category" });
    }
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

const readCategory = asyncHandler(async (req, res) => {
    try {
        const {categoryId} = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: "No such Category" });
        }
        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message)
    }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
