const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

const REQUIRED_FIELDS = ["firstName", "lastName", "email", "favoriteColor", "birthday"];

const hasValue = (value) => value !== undefined && value !== null && value !== "";

const validatePayload = (payload = {}) => {
  const missingFields = REQUIRED_FIELDS.filter((field) => !hasValue(payload[field]));
  return { isValid: missingFields.length === 0, missingFields };
};

const buildContactPayload = (payload) => {
  return REQUIRED_FIELDS.reduce((contact, field) => {
    contact[field] = payload[field];
    return contact;
  }, {});
};

const getAll = async (req, res) => {
  try {
    const contacts = await mongodb.getDb().collection("contacts").find({}).toArray();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Failed to retrieve contacts", error);
    res.status(500).json({ message: "Unable to fetch contacts" });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact id" });
  }

  try {
    const contact = await mongodb
      .getDb()
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(`Failed to retrieve contact with id ${id}`, error);
    res.status(500).json({ message: "Unable to fetch contact" });
  }
};

const createContact = async (req, res) => {
  const { isValid, missingFields } = validatePayload(req.body);

  if (!isValid) {
    return res
      .status(400)
      .json({ message: "Missing required fields", missingFields });
  }

  try {
    const result = await mongodb.getDb().collection("contacts").insertOne(buildContactPayload(req.body));
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error("Failed to create contact", error);
    res.status(500).json({ message: "Unable to create contact" });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact id" });
  }

  const { isValid, missingFields } = validatePayload(req.body);

  if (!isValid) {
    return res
      .status(400)
      .json({ message: "Missing required fields", missingFields });
  }

  try {
    const result = await mongodb
      .getDb()
      .collection("contacts")
      .replaceOne({ _id: new ObjectId(id) }, buildContactPayload(req.body));

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(`Failed to update contact with id ${id}`, error);
    res.status(500).json({ message: "Unable to update contact" });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact id" });
  }

  try {
    const result = await mongodb
      .getDb()
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(`Failed to delete contact with id ${id}`, error);
    res.status(500).json({ message: "Unable to delete contact" });
  }
};

module.exports = { getAll, getOne, createContact, updateContact, deleteContact };
