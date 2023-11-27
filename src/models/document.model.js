import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  categoria: {
    type: String,
    require: true,
  },
  ruta: {
    type: String,
    require: true,
  },
  cedula: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Documents", documentSchema);
