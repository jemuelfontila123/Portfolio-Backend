import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({
      message: "Contact saved successfully",
      data: contact
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.message
      });
    }

    console.error("Contact creation error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};