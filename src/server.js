import express from "express";
import orphans from "./routes/orphanRoutes.js";
import users from "./routes/userRoutes.js";
import donation from "./routes/donationRoutes.js";

const app = express();

const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("Hope Connect API");
});

app.use("/api/orphans", orphans);

app.use("/api/users", users);

app.use("/api/donations",donation);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
