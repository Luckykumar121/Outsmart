const cors = require("cors");
const express = require("express");
const roomRoutes = require("./routes/roomRoutes");

const app = express();
const port = Number(process.env.PORT) || 3001;
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim())
  : true;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.get("/api/health", (_request, response) => response.json({ ok: true }));
app.use("/api/rooms", roomRoutes);

app.listen(port, () => {
  console.log(`Outsmart room server listening on port ${port}`);
});
