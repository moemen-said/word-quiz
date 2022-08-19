import { RequestHandler } from 'express';
import path from 'path';
import fs from 'fs';

import { IWord } from '../interfaces/word';

//read json file data
let dbPath = path.join(__dirname, '..', '..', 'data.json');
let rawData = fs.readFileSync(dbPath);
let data = JSON.parse(rawData.toString());
let wordList = data.wordList;
let scoresList = data.scoresList;

// response with array of 10 elements with the 4 types of word POS
export const getWords: RequestHandler = (req, res, next) => {
	try {
		let selectedWords: IWord[] = [];
		let takenIndex: number[] = [];
		let n = 0;
		while (n < 10) {
			let index = Math.floor(Math.random() * wordList.length);

			//check if the generated random number taken before or not
			if (!takenIndex.includes(index)) {
				takenIndex.push(index);
				selectedWords.push(wordList[index]);
				n++;
			}

			// check if the created arrau of words includes all POS types
			if (n == 10 && !isIncludesAllType(selectedWords)) {
				n = 0;
				selectedWords = [];
				takenIndex = [];
			}
		}
		res.status(200).json({
			success: true,
			words: selectedWords,
		});
	} catch (err) {
		res.status(200).json({
			success: false,
			message: 'Internal error, please try agian',
		});
	}
};

// save score in data.json file and response with user rank among other saved scores in data.json file
export const getRank: RequestHandler = (req, res, next) => {
	try {
		const score = parseInt(req.body.score as string);
		let belowScoreCount = countBellowNumber(score);
		const rank = ((belowScoreCount / scoresList.length) * 100).toFixed(2);
		addScoreToDataFile(score);
		res.status(200).json({
			success: true,
			rank: rank,
		});
	} catch (err: any) {
		res.status(200).json({
			success: false,
			message: 'Internal error, please try agian',
		});
	}
};

// check if generated array have the four types of word POS
function isIncludesAllType(arr: IWord[]) {
	let icludedTypesCount = 0;

	let typesMap = new Map<string, boolean>([
		['noun', false],
		['verb', false],
		['adjective', false],
		['adverb', false],
	]);

	for (let word of arr) {
		typesMap.set(word.pos.toString(), true);
	}

	typesMap.forEach((value, key) => {
		value === true ? icludedTypesCount++ : '';
	});

	return icludedTypesCount === 4;
}

// return count of scores bellow passed score
function countBellowNumber(scoreNumber: number) {
	let belowScoreCount = 0;
	scoresList.forEach((element: number) => {
		scoreNumber > element ? belowScoreCount++ : '';
	});
	return belowScoreCount;
}

// add received score to json file's scoreList array
function addScoreToDataFile(score: number) {
	scoresList.push(score);
	fs.writeFile(dbPath, JSON.stringify(data), () => {});
}
