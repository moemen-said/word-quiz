enum position {
	adjective = 'adjective',
	adverb = 'adverb',
	noun = 'noun',
	verb = 'verb',
}

export interface IWord {
	id: number;
	word: string;
	pos: position;
}
