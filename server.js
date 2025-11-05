require("dotenv").config()
const express = require("express")
const { connectToDb } = require("./db/connect")
const contactsRoute = require("./routes/contactsRoute")

const app = express()
const port = process.env.PORT || 8080;

app.use("/contacts", contactsRoute)

// Mongo connection 
connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  } else {
    console.error("❌ Failed to connect to the database", err);
    process.exit(1);
  }
});
