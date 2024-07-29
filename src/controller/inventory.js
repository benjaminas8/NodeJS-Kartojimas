import { v4 as uuidv4 } from "uuid";
import InventoryModel from "../model/inventory.js";

const CREATE_INVENTORY = async (req, res) => {
  try {
    const inventory = {
      title: req.body.title,
      officeId: req.body.officeId,
      count: req.body.count,
      imgUrl: req.body.imgUrl,
      id: uuidv4(),
    };

    const response = await new InventoryModel(inventory);

    await response.save();

    return res
      .status(201)
      .json({ message: "inventory was created", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in aplication" });
  }
};

const GET_COMPANY_INVENTORIES = async (req, res) => {
  try {
    const response = await InventoryModel.find();
    return res.status(200).json({ inventories: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in aplication" });
  }
};

const GET_INVENTORY_BY_ID = async (req, res) => {
  try {
    const response = await InventoryModel.findOne({ id: req.params.id });

    return res.status(200).json({ inventories: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in aplication" });
  }
};

const DELETE_INVENTORY_BY_ID = async (req, res) => {
  try {
    const response = await InventoryModel.findOneAndDelete({
      id: req.params.id,
    });

    if (!response) {
      return res.status(404).json({
        message: "This inventory does not exist so you cannot delete it",
      });
    }

    return res
      .status(200)
      .json({ message: "Inventorie was deleted", inventories: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in aplication" });
  }
};

export {
  CREATE_INVENTORY,
  GET_COMPANY_INVENTORIES,
  GET_INVENTORY_BY_ID,
  DELETE_INVENTORY_BY_ID,
};
