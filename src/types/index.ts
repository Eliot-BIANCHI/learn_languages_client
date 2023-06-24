export type Settings = {
	languageTranslatedId: number
	languageTranslatorId: number
    numberOfWords: number
    hasTimer: boolean
    timerSeconds: number
}

export type Response = {
	wordToTranslate: string
	userAnswer: string
	correctAnswer: string
	timeToRespond?: string
}

export type Results = {
	score: number
	responses: Response[]
	hasTimer: boolean
}

export type User = {
	userId: number
	username: string
	password: string
}

export type GrammaticalCategory = {
	grammaticalCategoryId: number
	name: string,
}

export type Language = {
	languageId: number,
	name: string,
}

export type Word = {
	wordId: number,
    name: string,
	languageId: number,
	grammaticalCategoryId: number
}

export type Translation = {
    wordTranslatedId: number,
	wordTranslatorId: number,
	illustration: string,
	name: string,
}

export type Game = {
	languageTranslatedId: number,
	languageTranslatorId: number,
	numberTranslations: number,
}

export type FindCorrectTranslation = {
	id: string,
	displayed: string
	correctAnswer: string
	wrongAnswer1: string
	wrongAnswer2: string
}

export type TranslateItRight = {
	id: string
	displayed: string
	correctAnswer: string
	illustration: string
}