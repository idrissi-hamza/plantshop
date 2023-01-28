import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    family: { type: String, required: true },
    image: { type: [String], required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    specifications: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const Plant = mongoose.models.Plant || mongoose.model('plant', plantSchema);
// let Plant;
// if (!mongoose.models.Plant) {
//   Plant = mongoose.model('Plant', plantSchema);
// } else {
//   Plant = mongoose.models.Plant;
// }

export default Plant;
