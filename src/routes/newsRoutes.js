import express from 'express';
import { getArticles,getNumberOfArticles } from '../Controllers/gazaNewsController.js';
const router = express.Router();

router.get('/',getArticles );
router.get('/:number',getNumberOfArticles );




export default router;