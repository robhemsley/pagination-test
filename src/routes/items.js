/* @flow */

import express from 'express';
import { getDb } from '../mongoUtil';

const router = express.Router();

router.get('/', (req, res) => {
	getDb()
		.collection('items')
		.find()
		.toArray()
		.then(results => {
			res.send(results);
		})
		.catch(error => console.error(error));
});

export default router;
