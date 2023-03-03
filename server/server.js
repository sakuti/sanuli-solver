const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const cors = require('cors');
const fs = require('fs');
const port = 8080;

app.use(bodyParser.json());
app.use(cors());


let lastWord;
const words = []
const getWords = () => {
	fs.readFile('words.txt', 'utf8', (err, data) => {
		if (err) throw err;
	
		data.split('\n').forEach(word => {
			if(word.split(/(?!$)/u).some(kirjain => !'abcdefghijklmnopqrstuvwxyzåäö'.includes(kirjain))) return;
		})
	});	
}


const solve = (data) => {
	const foundWords = []
	const presentLetters = [...new Set(data.presentRows.flat(1))];
	const absentLetters = [...new Set(data.absentRows.flat(1))];
	
	data.knownLetters.forEach(letter => {
		if(presentLetters.includes(letter)) return;
		if(letter !== '') presentLetters.push(letter);
	})
	
	presentLetters.forEach(letter => {
		const index = absentLetters.indexOf(letter);
		if(index > -1) absentLetters.splice(index, 1);
	})

	for(let i = 0; i < words.length; i++) {
		if(data.knownLetters.every((letter, index) => letter === '' || letter === words[i][index])) {
			if(absentLetters.every(letter => !words[i].includes(letter))) {
				if(presentLetters.every(letter => words[i].includes(letter))) {
					if(data.absentRows.every((row, index) => !row.includes(words[i][index]))) {
						if(data.presentRows.some((row, index) => !row.includes(words[i][index]))) {
							foundWords.push(words[i])
						}
					}
				}
			}
		}
	}

	// Get word with most unique letters possible
	const uniqueLetters = foundWords.map(word => [...new Set(word.split(/(?!$)/u))].length);
	const uniqueIndex = uniqueLetters.indexOf(Math.max(...uniqueLetters));
	newWord = foundWords[uniqueIndex];

	// To prevent the same word from being sent twice
	// we check if the word is the same as the last word
	// and randomize the word if it is the same
	let tries = 0;
	while(lastWord == newWord) {
		if(tries > 3) break;
		newWord = foundWords[Math.floor(Math.random() * foundWords.length)];
		tries++;
	}
	
	lastWord = newWord;
	console.log(lastWord)

	// Run autoplay.py python script which will write the word automatically
	spawn('python3', ['autoplay.py', lastWord]);
}


app.post('/api', (req, res) => {
	console.clear();
	console.log("SANULI-SOLVER \n");
	solve(req.body);
	res.end();
})

app.listen(port, () => {
	getWords();
	console.log(`Server running on port ${port}`)
});