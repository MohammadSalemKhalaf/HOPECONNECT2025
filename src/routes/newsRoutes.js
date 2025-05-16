import express from 'express';
import { getArticles } from '../Controllers/gazaNewsController.js';
const router = express.Router();

router.get('/',getArticles );
router.get('/:number',getArticles );




export default router;