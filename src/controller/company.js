import { v4 as uuidv4 } from "uuid";
import CompanyModel from "../model/company.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const CREATE_COMPANY = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);

    const company = {
      title: req.body.title,
      address: req.body.address,
      email: req.body.email,
      password: hash,
      id: uuidv4(),
    };

    const response = await new CompanyModel(company);

    await response.save();

    return res
      .status(201)
      .json({ message: "company was created", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in aplication" });
  }
};

const GET_COMPANY_BY_ID = async (req, res) => {
  try {
    const response = await new CompanyModel.findOne({ id: req.params.id });

    await response.save();

    return res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in aplication" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const company = await CompanyModel.findOne({ email: req.body.email });

    if (!company) {
      return res
        .status(401)
        .json({ message: "Your email or password was wrong" });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      company.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Your email or password was wrong" });
    }

    const token = jwt.sign(
      { email: company.email, companyId: company.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in aplication" });
  }
};

const DELETE_COMPANY_BY_ID = async (req, res) => {
  try {
    const response = await new CompanyModel.findOneAndDelete({
      id: req.params.id,
    });

    await response.save();

    return res
      .status(200)
      .json({ message: "Company was deleted", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in aplication" });
  }
};

export { CREATE_COMPANY, LOGIN, GET_COMPANY_BY_ID, DELETE_COMPANY_BY_ID };
