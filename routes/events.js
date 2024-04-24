// routes/index.js

import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("events"); 
});

export default router;
