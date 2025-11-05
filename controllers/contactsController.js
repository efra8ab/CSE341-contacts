const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

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

module.exports = { getAll, getOne };
