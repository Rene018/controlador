import documentM from "../models/document.model.js";
import fs from "fs";
export const createDocument = async (req, res) => {
  console.log(req.body);

  const { categoria, cedula, prub } = req.body;
  console.log(prub);

  console.log(req.body);
  try {
    const newDocument = new documentM({
      categoria,
      cedula,
    });

    const documentSaved = await newDocument.save();
    res.json({
      documentSaved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDocument = async (req, res) => {
  const { categoria, ruta, cedula } = req.body;

  try {
    const newDocument = new documentM({
      categoria,
      ruta,
      cedula,
    });

    const documentSaved = await newDocument.save();
    res.json({
      documentSaved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dowloadDoc = async (req, res) => {
  try {
    const documentFound = await documentM.findById(req.params.id);
    if (!documentFound)
      return res.status(404).json({ message: "Document not found" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + documentFound.categoria
    );
    res.setHeader("Content-Type", "application/pdf");

    // Lee el archivo y envíalo como respuesta
    const fileStream = fs.createReadStream(documentFound.ruta);

    // Manejo de eventos de error y cierre del stream
    fileStream.on("error", (error) => {
      console.error("Error reading document file:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });

    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading document:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
