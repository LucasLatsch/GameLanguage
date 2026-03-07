import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config();

console.log("MONGO_URL:", process.env.MONGO_URL);

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Mongo conectado");

    await Category.deleteMany();

    await Category.insertMany([
      { name: "Substantivo" },
      { name: "Verbo" },
      { name: "Adjetivo" },
      { name: "Expressão" },
      { name: "Outro" },
    ]);

    console.log("Categorias inseridas com sucesso");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedCategories();
