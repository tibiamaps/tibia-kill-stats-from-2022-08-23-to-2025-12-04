import fs from 'node:fs/promises';
import glob from 'glob';
import { toPrettyName } from './normalize-names.mjs';

// race => totalKilled
const map = new Map();

const handleFile = async (fileName) => {
	const json = await fs.readFile(fileName, 'utf8');
	const entries = JSON.parse(json).killstatistics.entries;
	for (const { race, last_day_killed } of entries) {
		if (map.has(race)) {
			const prev = map.get(race);
			map.set(race, prev + last_day_killed);
		} else {
			map.set(race, last_day_killed);
		}
	}
};

const handleLatest = async (fileName) => {
	const latestMap = new Map();
	const json = await fs.readFile(fileName, 'utf8');
	const stats = JSON.parse(json).killstatistics;
	const entries = stats.entries;
	const world = stats.world;
	for (const { race, last_day_killed } of entries) {
		if (last_day_killed <= 0) continue;
		const prettyName = toPrettyName(race);
		latestMap.set(prettyName, last_day_killed);
	}
	const newData = Object.fromEntries(latestMap);
	const newJson = JSON.stringify(newData, null, '\t');
	await fs.writeFile(`./data/_yesterday/${world}.json`, `${newJson}\n`);
};

const fileNames = glob.sync('./data/*/*.json', {
	ignore: [
		'./data/_global-total/*.json',
		'./data/_yesterday/*.json',
		// Former worlds as of 2025-11-06:
		// https://www.tibia.com/news/?subtopic=newsarchive&id=8513
		'./data/vandera/latest.json',
		'./data/runera/latest.json',
		'./data/ulera/latest.json',
		'./data/vitera/latest.json',
		'./data/esmera/latest.json',
		'./data/wildera/latest.json',
		'./data/gravitera/latest.json',
		'./data/flamera/latest.json',
		'./data/temera/latest.json',
		'./data/fibera/latest.json',
		'./data/jacabra/latest.json',
		'./data/obscubra/latest.json',
		'./data/quebra/latest.json',
		'./data/ambra/latest.json',
		'./data/divina/latest.json',
		'./data/malivora/latest.json',
		'./data/zephyra/latest.json',
		'./data/wadira/latest.json',
		'./data/yara/latest.json',
		'./data/jaguna/latest.json',
		// Former worlds as of 2023-08-29:
		'./data/adra/latest.json',
		'./data/alumbra/latest.json',
		'./data/ardera/latest.json',
		'./data/bastia/latest.json',
		'./data/batabra/latest.json',
		'./data/cadebra/latest.json',
		'./data/dibra/latest.json',
		'./data/famosa/latest.json',
		'./data/fera/latest.json',
		'./data/illusera/latest.json',
		'./data/karna/latest.json',
		'./data/libertabra/latest.json',
		'./data/marbera/latest.json',
		'./data/marcia/latest.json',
		'./data/mudabra/latest.json',
		'./data/nossobra/latest.json',
		'./data/ocebra/latest.json',
		'./data/olima/latest.json',
		'./data/optera/latest.json',
		'./data/reinobra/latest.json',
		'./data/seanera/latest.json',
		'./data/suna/latest.json',
		'./data/tembra/latest.json',
		'./data/trona/latest.json',
		'./data/versa/latest.json',
		'./data/visabra/latest.json',
		'./data/wizera/latest.json',
		'./data/xandebra/latest.json',
		'./data/zenobra/latest.json',
		// Former worlds as of 2024-09-09:
		'./data/axera/latest.json',
		'./data/bombra/latest.json',
		'./data/castela/latest.json',
		'./data/damora/latest.json',
		'./data/guerribra/latest.json',
		'./data/impulsa/latest.json',
		'./data/kardera/latest.json',
		'./data/kendria/latest.json',
		'./data/mykera/latest.json',
		'./data/nadora/latest.json',
		'./data/ousabra/latest.json',
		'./data/pulsera/latest.json',
		'./data/syrena/latest.json',
		'./data/utobra/latest.json',
	],
});
for (const fileName of fileNames) {
	if (fileName.endsWith('latest.json')) {
		await handleLatest(fileName);
	} else {
		await handleFile(fileName);
	}
}

{
	const KILL_STATS_NAMES = [...map.keys()].sort();
	const json = JSON.stringify(KILL_STATS_NAMES, null, '\t');
	await fs.writeFile('./data/_global-total/names.json', `${json}\n`);
}

const entries = [...map.entries()];
const sorted = entries
	.filter((entry) => entry[1] > 0)
	.map(([race, kills]) => {
		return [toPrettyName(race), kills];
	})
	.sort((a, b) => {
		if (a[1] === b[1]) {
			return a[0].localeCompare(b[0]);
		}
		return a[1] - b[1];
	});

{
	const object = Object.fromEntries(sorted);
	const json = JSON.stringify(object, null, '\t');
	await fs.writeFile('./data/_global-total/kills.json', `${json}\n`);
}
