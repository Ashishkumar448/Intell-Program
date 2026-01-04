import { Router } from 'express';
import { chat } from '../controllers/chat.controller.js';
import { getNews } from '../controllers/news.controller.js';

const router = Router();

router.post('/chat', chat);
router.get('/news', getNews);

export default router;
