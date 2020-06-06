import express from "express";
import path from "path";
import { Route } from "./app/routes";
import cors from "cors";

const app = express();
const PORT = 3333;

const router = new Route();
const routes = router.listRoutes;

app.use(cors());

app.use(express.json());
app.use("/api", routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
