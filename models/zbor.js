const mongooseModel = require('mongoose');
const { Schema } = mongooseModel;

const ZborSchema = new Schema({
  dataOraPlecare: { type: Date, required: true },
  destinatie: { type: String, required: true },
  aeroport: { type: Number, required: true },
  numarLocuriDisponibile: { type: String, required: true }
}, { timestamps: true });

module.exports = mongooseModel.model('Zbor', ZborSchema);