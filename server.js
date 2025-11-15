require("dotenv").config()
const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger-output.json")
const { connectToDb } = require("./db/connect")
const contactsRoute = require("./routes/contactsRoute")

const app = express()
const port = process.env.PORT || 8080;

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/contacts", contactsRoute)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
