import express from "express";
import {getOrphans,getOrphanById,addOrphan,updateOrphan,deleteOrphan} from '../Controllers/orphanController.js'
const router = express.Router();

router.get("/", getOrphans);

router.get("/:id",getOrphanById );

router.post("/",addOrphan );

router.put("/:id", updateOrphan);


router.delete("/:id",deleteOrphan)
export default router;
