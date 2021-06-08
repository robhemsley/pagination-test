/* @flow */

import { connectToServer, getClient } from '../src/mongoUtil';


const setup = async () => {
	console.log("Starting Setup");

	const db = await connectToServer();
	console.log("Dropping Collection");
	db.collection('items').deleteMany({});

	console.log("Creating Items");
	const projectArray = [];
	for (let i = 0; i < 50; i++) {
		projectArray.push({
			name: 'Project ' + i,
			stars: Math.round(9 * Math.random()) + 1,
			created_date: new Date(
				Date.now() - Math.random() * 60 * 60 * 24 * 365 * 1000
			).toISOString(),
		});
	}

	await db.collection('items').insertMany(projectArray);

	const client = await getClient();
	client.close();
	console.log("Setup Finished")
}

try{
	setup();
}catch(err){
	console.log("Error during setup!");
	console.error(err);
}
