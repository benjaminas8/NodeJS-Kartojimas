import mongoose from "mongoose";

const inventorySchema = mongoose.Schema({
  id: { type: String, requred: true },
  title: { type: String, requred: true },
  officeId: { type: String, requred: true },
  count: { type: Number, requred: true },
  imgUrl: { type: String, requred: true },
});

export default mongoose.model("Inventory", inventorySchema);
