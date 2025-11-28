import { createKillsPerCategoryMap, writeMap } from './utils.mjs';

// prettier-ignore
const BOSSES_PER_CATEGORY = new Map([

	/* Official boss categories as per the in-game Bosstiary. */

	['nemesis-boss', new Set([
		'Alptramun',
		'Anmothra',
		'Arachir the Ancient One',
		'Arthom the Hunter',
		'Bakragore',
		'Bane Lord',
		'Barbaria',
		'Battlemaster Zunzu',
		'Big Boss Trolliver',
		'Burster',
		'Captain Jones',
		'Chikhaton',
		'Chizzoron the Distorter',
		'Countess Sorrow',
		'Cublarc the Plunderer',
		'Devovorga',
		'Dharalion',
		'Diblis the Fair',
		'Dracola',
		'Dreadful Disruptor',
		'Dreadmaw',
		'Elvira Hammerthrust',
		'Feroxa',
		'Ferumbras Mortal Shell',
		'Ferumbras',
		'Flamecaller Zazrak',
		'Fleabringer',
		'Foreman Kneebiter',
		'Furyosa',
		'Gaz\'haragoth',
		'General Murius',
		'Ghazbaran',
		'Goshnar\'s Megalomania',
		'Grand Mother Foulscale',
		'Grandfather Tridian',
		'Gravelord Oshuran',
		'Groam',
		'Grorlam',
		'Hairman the Huge',
		'Hatebreeder',
		'High Templar Cobrass',
		'Hirintror',
		'Horestis',
		'Irahsae',
		'Izcandar Champion of Summer',
		'Izcandar Champion of Winter',
		'Izcandar the Banished',
		'Jesse the Wicked',
		'King Chuck',
		'Lizard Gate Guardian',
		'Mahatheb',
		'Malofur Mangrinder',
		'Man in the Cave',
		'Massacre',
		'Maxxenius',
		'Morgaroth',
		'Mornenion',
		'Morshabaal',
		'Mr. Punish',
		'Ocyakao',
		'Omrafir',
		'Oodok Witchmaster',
		'Orshabaal',
		'Phrodomo',
		'Plagueroot',
		'Raxias',
		'Robby the Reckless',
		'Rotrender',
		'Rotworm Queen',
		'Rukor Zad',
		'Shlorg',
		'Sir Valorcrest',
		'Smuggler Baron Silvertoe',
		'Teneshpar',
		'The Abomination',
		'The Big Bad One',
		'The Blightfather',
		'The Evil Eye',
		'The First Dragon',
		'The Frog Prince',
		'The Handmaiden',
		'The Hungerer',
		'The Imperor',
		'The Last Lore Keeper',
		'The Manhunter',
		'The Mean Masher',
		'The Mutated Pumpkin',
		'The Old Whopper',
		'The Pale Count',
		'The Percht Queen',
		'The Plasmother',
		'The Voice of Ruin',
		'The Welter',
		'Tyrn',
		'Tzumrah the Dazzler',
		'Warlord Ruzad',
		'White Pale',
		'Willi Wasp',
		'World Devourer',
		'Xenia',
		'Yaga the Crone',
		'Yakchal',
		'Zarabustor',
		'Zevelon Duskbringer',
		'Zomba',
		'Zulazza the Corruptor',
		'Zushuka',
	])],

	['archfoe-boss', new Set([
		'Abyssador',
		'Ahau',
		'Amenef the Burning',
		'Ancient Spawn of Morgathla',
		'Anomaly',
		'Arbaziloth',
		'Ayana the Crimson Curse',
		'Bibby Bloodbath',
		'Black Vixen',
		'Bloodback',
		'Brain Head',
		'Brokul',
		'Chagorz',
		'Count Vlarkorth',
		'Count Warlock',
		'Darkfang',
		'Deathstrike',
		'Dragon Pack',
		'Drume',
		'Duke Krule',
		'Earl Osam',
		'Ekatrix',
		'Eradicator',
		'Essence of Malice',
		'Faceless Bane',
		'Gelidrazah the Frozen',
		'Ghulosh',
		'Gnomevil',
		'Gorzindel',
		'Goshnar\'s Cruelty',
		'Goshnar\'s Greed',
		'Goshnar\'s Hatred',
		'Goshnar\'s Malice',
		'Goshnar\'s Spite',
		'Grand Master Oberon',
		'Ichgahal',
		'Irgix the Flimsy',
		'Kalyassa',
		'Katex Blood Tongue',
		'King Zelos',
		'Kusuma',
		'Lady Tenebris',
		'Lloyd',
		'Lokathmor',
		'Lord Azaram',
		'Lord of the Elements',
		'Lord Retro',
		'Magma Bubble',
		'Mawhawk',
		'Mazoran',
		'Mazzinor',
		'Megasylvan Yselda',
		'Melting Frozen Horror',
		'Mitmah Vanguard',
		'Murcion',
		'Neferi the Spy',
		'Outburst',
		'Owin',
		'Plagirath',
		'Ragiaz',
		'Raging Mage',
		'Ratmiral Blackwhiskers',
		'Ravenous Hunger',
		'Razzagorn',
		'Realityquake',
		'Rupture',
		'Scarlett Etzel',
		'Shadowpelt',
		'Sharpclaw',
		'Shulgrax',
		'Sir Baeloc',
		'Sir Nictros',
		'Sister Hetai',
		'Soul of Dragonking Zyrtarch',
		'Srezz Yellow Eyes',
		'Tamru the Black',
		'Tarbaz',
		'Tazhadur',
		'Tentugly',
		'Thaian',
		'The Blazing Rose',
		'The Brainstealer',
		'The Diamond Blossom',
		'The Dread Maiden',
		'The Enraged Thorn Knight',
		'The False God',
		'The Fear Feaster',
		'The Flaming Orchid',
		'The Lily of Night',
		'The Mega Magmaoid',
		'The Monster',
		'The Moonlight Aster',
		'The Nightmare Beast',
		'The Pale Worm',
		'The Rootkraken',
		'The Sandking',
		'The Scourge of Oblivion',
		'The Souldespoiler',
		'The Source of Corruption',
		'The Time Guardian',
		'The Unarmored Voidborn',
		'The Unwelcome',
		'The Winter Bloom',
		'Timira the Many-Headed',
		'Unaz the Mean',
		'Urmahlullu the Weakened',
		'Utua Stone Sting',
		'Vemiath',
		'Vladrukh',
		'Vok the Freakish',
		'Yirkas Blue Scales',
		'Zamulosh',
		'Zorvorax',
	])],

	['bane-boss', new Set([
		'Adlerauge',
		'Annihilon',
		'Arthei',
		'Ashmunrah',
		'Atab',
		'Black Knight',
		'Boogey',
		'Boreth',
		'Bragrumol',
		'Bullwark',
		'Chopper',
		'Clavius',
		'Custodian',
		'Dazed Leaf Golem',
		'Death Priest Shargon',
		'Deep Terror',
		'Dipthrah',
		'Dirtbeard',
		'Diseased Bill',
		'Diseased Dan',
		'Diseased Fred',
		'Doctor Perhaps',
		'Enusat the Onyx Wing',
		'Evil Mastermind',
		'Fleshslicer',
		'Gaffir',
		'Glitterscale',
		'Glooth Fairy',
		'Golgordan',
		'Gorga',
		'Gralvalon',
		'Grand Canon Dominus',
		'Grand Chaplain Gaunder',
		'Grand Commander Soeren',
		'Guard Captain Quaid',
		'Hellgorak',
		'Heoni',
		'Jailer',
		'Jaul',
		'Kroazur',
		'Latrivan',
		'Lersatio',
		'Lisa',
		'Mad Mage',
		'Madareth',
		'Mahrdis',
		'Malvaroth',
		'Marziel',
		'Maw',
		'Mephiles',
		'Michael the Stalwart',
		'Mindmasher',
		'Monstor',
		'Morguthis',
		'Mozradek',
		'Obujos',
		'Omruc',
		'Overseer Osverger',
		'Preceptor Lazare',
		'Professor Maxxen',
		'Rahemos',
		'Rotspit',
		'Shadowstalker',
		'Sugar Daddy',
		'Sugar Mommy',
		'Tanjis',
		'Thalas',
		'Thawing Dragon Lord',
		'The Baron From Below',
		'The Count of the Core',
		'The Duke of the Depths',
		'The Lord of the Lice',
		'The Ravager',
		'The Shatterer',
		'Twisterror',
		'Ushuriel',
		'Vashresamun',
		'Xogixath',
		'Zugurosh',
	])],

	/* Custom Nemesis subcategories. */

	// The subset of Nemesis bosses that spawn randomly and thus require
	// boss checks, or that are exceptionally rare (e.g. Ferumbras, Devovorga).
	// Bosses that have a 2-week cooldown, Dream Courts mini-bosses, and most
	// bosses that can be predictably found during an announced raid are
	// excluded from this list.
	['hard-nemesis-boss', new Set([
		'Arachir the Ancient One',
		'Arthom the Hunter',
		'Barbaria',
		'Battlemaster Zunzu',
		'Big Boss Trolliver',
		'Burster',
		'Captain Jones',
		'Countess Sorrow',
		'Devovorga',
		'Dharalion',
		'Diblis the Fair',
		'Dracola',
		'Dreadful Disruptor',
		'Dreadmaw',
		'Elvira Hammerthrust',
		'Ferumbras',
		'Flamecaller Zazrak',
		'Fleabringer',
		'Foreman Kneebiter',
		'Furyosa',
		'General Murius',
		'Ghazbaran',
		'Grandfather Tridian',
		'Gravelord Oshuran',
		'Groam',
		'Grorlam',
		'Hairman the Huge',
		'Hatebreeder',
		'High Templar Cobrass',
		'Hirintror',
		'Horestis',
		'Jesse the Wicked',
		'Mahatheb',
		'Man in the Cave',
		'Massacre',
		'Morgaroth',
		'Mornenion',
		'Morshabaal',
		'Mr. Punish',
		'Ocyakao',
		'Omrafir',
		'Oodok Witchmaster',
		'Orshabaal',
		'Robby the Reckless',
		'Rotrender',
		'Rotworm Queen',
		'Rukor Zad',
		'Shlorg',
		'Sir Valorcrest',
		'Smuggler Baron Silvertoe',
		'The Abomination',
		'The Big Bad One',
		'The Evil Eye',
		'The Frog Prince',
		'The Handmaiden',
		'The Hungerer',
		'The Imperor',
		'The Manhunter',
		'The Mean Masher',
		'The Old Whopper',
		'The Pale Count',
		'The Plasmother',
		'The Voice of Ruin',
		'The Welter',
		'Tyrn',
		'Tzumrah the Dazzler',
		'Warlord Ruzad',
		'White Pale',
		'Xenia',
		'Yaga the Crone',
		'Yakchal',
		'Zarabustor',
		'Zevelon Duskbringer',
		'Zushuka',
	])],

	['poi-boss', new Set([
		'Countess Sorrow',
		'Dracola',
		'Massacre',
		'Mr. Punish',
		'The Handmaiden',
		'The Imperor',
		'The Plasmother',
	])],

	['hive-underground-boss', new Set([
		'Chopper',
		'Fleshslicer',
		'Maw',
		'Mindmasher',
		'Rotspit',
		'Shadowstalker',
	])],

	['hive-outpost-boss', new Set([
		'The Hungerer',
		'The Manhunter',
		'The Mean Masher',
	])],

	['hod-nemesis-boss', new Set([
		'Burster',
		'Dreadful Disruptor',
	])],

	['bank-robbery-boss', new Set([
		'Elvira Hammerthrust',
		'Jesse the Wicked',
		'Mornenion',
		'Robby the Reckless',
	])],

	['vampire-lord-nemesis-boss', new Set([
		// Note: Armenius is not a boss.
		'Arachir the Ancient One',
		'Diblis the Fair',
		'Sir Valorcrest',
		'The Pale Count',
		'Zevelon Duskbringer',
	])],

	['dream-courts-nemesis-boss', new Set([
		'Alptramun',
		'Izcandar Champion of Summer',
		'Izcandar Champion of Winter',
		'Izcandar the Banished',
		'Malofur Mangrinder',
		'Maxxenius',
		'Plagueroot',
	])],

	['candia-boss', new Set([
		'Sugar Daddy',
		'Sugar Mommy',
	])],

	['oramond-voted-boss', new Set([
		'Bullwark',
		'Glooth Fairy',
		'Lisa',
	])],

	['dark-trails-boss', new Set([
		'Death Priest Shargon',
		'The Ravager',
	])],

	['diseased-boss', new Set([
		'Diseased Bill',
		'Diseased Dan',
		'Diseased Fred',
	])],

	['ferumbras-ascension-boss', new Set([
		'Mazoran',
		'The Lord of the Lice',
		'Plagirath',
		'Ragiaz',
		'Razzagorn',
		'Shulgrax',
		'Tarbaz',
		'The Shatterer',
		'Zamulosh',
		// Final boss.
		'Ferumbras Mortal Shell',
	])],

	['inquisition-boss', new Set([
		'Annihilon',
		'Golgordan',
		'Hellgorak',
		'Latrivan',
		'Madareth',
		'Ushuriel',
		'Zugurosh',
	])],

	['heart-of-destruction-boss', new Set([
		'Anomaly',
		'Eradicator',
		'Outburst',
		'Realityquake',
		'Rupture',
		// Final boss.
		'World Devourer',
	])],

	['kilmaresh-boss', new Set([
		'Amenef the Burning',
		'Bragrumol',
		'Enusat the Onyx Wing',
		'Mozradek',
		'Neferi the Spy',
		'Sister Hetai',
		'Urmahlullu the Weakened',
		'Xogixath',
	])],

	['soul-war-boss', new Set([
		'Goshnar\'s Cruelty',
		'Goshnar\'s Greed',
		'Goshnar\'s Hatred',
		'Goshnar\'s Malice',
		'Goshnar\'s Spite',
		// Final boss.
		'Goshnar\'s Megalomania',
	])],

	['forgotten-knowledge-boss', new Set([
		'Lady Tenebris',
		'Lloyd',
		'Melting Frozen Horror',
		'Soul of Dragonking Zyrtarch',
		'The Enraged Thorn Knight',
		'The Time Guardian',
		// Final boss.
		'The Last Lore Keeper',
	])],

	['rookgaard-boss', new Set([
		'Apprentice Sheng',
		'Kraknaknork',
		'Munster',
		'Rottie the Rotworm',
		'Teleskor',
	])],

	['rotten-blood-boss', new Set([
		'Chagorz',
		'Ichgahal',
		'Murcion',
		'Vemiath',
		// Final boss.
		'Bakragore',
	])],

	/* Other custom categories. */

	['blood-brothers-boss', new Set([
		'Arthei',
		'Boreth',
		'Lersatio',
		'Marziel',
	])],

	['pharaoh-boss', new Set([
		// Bosses from The Ancient Tombs Quest.
		'Ashmunrah',
		'Dipthrah',
		'Mahrdis',
		'Morguthis',
		'Omruc',
		'Rahemos',
		'Thalas',
		'Vashresamun',
		// Other pharaoh bosses.
		'Horestis',
		'The Ravager',
	])],

	['secret-library-boss', new Set([
		// Falcon Bastion bosses encountered during the quest.
		'Grand Canon Dominus',
		'Grand Chaplain Gaunder',
		'Grand Commander Soeren',
		'Grand Master Oberon',
		'Preceptor Lazare',

		// True Asura bosses encountered during the quest.
		'The Blazing Rose',
		'The Diamond Blossom',
		'The Lily of Night',

		// Deathling boss encountered during the quest.
		'Brokul',

		// Secret Library mini-bosses.
		'Ghulosh',
		'Gorzindel',
		'Lokathmor',
		'Mazzinor',

		// Secret Library final boss.
		'The Scourge of Oblivion',
	])],

	['grave-danger-boss', new Set([
		// Cobra Bastion bosses encountered during the quest.
		'Custodian',
		'Gaffir',
		'Guard Captain Quaid',
		'Scarlett Etzel',

		// “Graves” mini-bosses.
		'Count Vlarkorth',
		'Duke Krule',
		'Earl Osam',
		'Lord Azaram',
		'Sir Baeloc',
		'Sir Nictros',

		// Final boss.
		'King Zelos',
	])],

	['cults-of-tibia-boss', new Set([
		'Essence of Malice', // Carlin.
		'Ravenous Hunger', // Ab'dendriel.
		'The False God', // Mintwallin.
		'The Sandking', // Darashia.
		'The Souldespoiler', // Outlaw Camp.
		'The Unarmored Voidborn', // Edron.

		// Final boss.
		'The Source of Corruption',
	])],

	['feaster-of-souls-boss', new Set([
		// Individual Port Hope flimsy mini-bosses.
		'Unaz the Mean',
		'Irgix the Flimsy',
		'Vok the Freakish',

		// Venore flimsy boss.
		'Brain Head',

		// Edron flimsy boss.
		'Thaian',

		// Vengoth mini-bosses.
		'The Dread Maiden',
		'The Fear Feaster',
		'The Unwelcome',

		// Final boss.
		'The Pale Worm',
	])],

	['asura-boss', new Set([
		// Within the Tides quest bosses.
		'The Flaming Orchid',
		'The Moonlight Aster',
		'The Winter Bloom',
		'Kusuma',

		// True asura bosses from the Secret Library quest.
		'The Blazing Rose',
		'The Diamond Blossom',
		'The Lily of Night',
	])],

	// Bosses encountered during Full Moon.
	['full-moon-boss', new Set([
		// Grimvale.
		'Owin',
		// Oskayaat.
		'Ayana the Crimson Curse',
		'Tamru the Black',
		// “Final” boss.
		'Feroxa',
	])],

	['iksupan-boss', new Set([
		'Ahau',
		'Atab',
		'Mitmah Vanguard',
	])],

	['nimmersatts-breeding-ground-boss', new Set([
		// Individual mini-bosses during the fight.
		'Bruton',
		'Crultor',
		'Despor',
		'Greedok',
		'Maliz',
		'Vengar',
		'Vilear',
		// “Final” boss, tracking completion of the boss room.
		'Dragon Pack',
	])],

	['azzilon-boss', new Set([
		// Bane bosses.
		'Gralvalon',
		'Malvaroth',
		'Twisterror',
		// Archfoe boss.
		'Arbaziloth',
		// Nemesis boss.
		'Rotrender',
	])],

	['between-the-lines-boss', new Set([
		// Bane bosses.
		'Inkwing',
		'Sir Leonard',

		// Archfoe boss.
		'Blight Mariner',
		'Tropical Desolator',
		'Wrathful Archivist',

		// Nemesis boss.
		'Sir Leopold',
	])],

	['bloody-tusks-boss', new Set([
		'Vladrukh',
	])],

	['order-of-the-stag-boss', new Set([
		// Bane bosses.
		'Adlerauge',
		'Clavius',
		'Michael the Stalwart',
		'Overseer Osverger',

		// Archfoe boss.
		'Count Warlock',
	])],

	['roost-of-the-graveborn-boss', new Set([
		// Archfoe bosses.
		'Adventurer Group',
		'Eldritch Dragon Lord',
		'Ice Horror',
		'The Gravedigger',
		'Bone Overlord',
	])],

]);

// All bosses.
BOSSES_PER_CATEGORY.set(
	'boss',
	new Set([
		...BOSSES_PER_CATEGORY.get('nemesis-boss'),
		...BOSSES_PER_CATEGORY.get('archfoe-boss'),
		...BOSSES_PER_CATEGORY.get('bane-boss'),
	]),
);

const killsPerCategory = createKillsPerCategoryMap(BOSSES_PER_CATEGORY);

for (const [slug, killsPerBoss] of killsPerCategory) {
	await writeMap(killsPerBoss, `bosses/${slug}`);
}
