import express from "express";

import {
  CREATE_INVENTORY,
  GET_COMPANY_INVENTORIES,
  GET_INVENTORY_BY_ID,
  DELETE_INVENTORY_BY_ID,
} from "../controller/inventory.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/inventories/company/:companyId", GET_COMPANY_INVENTORIES);
router.get("/inventories/:id", GET_INVENTORY_BY_ID);
router.post("/inventories", auth, CREATE_INVENTORY);
router.delete("/inventories/:id", DELETE_INVENTORY_BY_ID);

export default router;
