import mongoose from "mongoose";

const companySchema = mongoose.Schema({
  id: { type: String, requred: true },
  title: { type: String, requred: true },
  address: { type: String, requred: true },
  email: { type: String, requred: true },
  password: { type: String, requred: true },
});

export default mongoose.model("Company", companySchema);
