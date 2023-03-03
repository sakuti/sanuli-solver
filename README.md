# sanuli-solver
🍀 Automatic sanuli.fi solver that tries to find the correct answer.

Sanuli is the Finnish version of the well-known Wordle game from The New York Times, where the player tries to guess the correct 5-letter word with six guesses. This script automates the guessing, but doesn't always succeed.

## How does it work?
The script works by running a nodejs express server on the computer, which receives POST requests from the browser. The browser sends DOM element data of found and unfound letters.
When a possible word or guess has been retrieved from the words.txt file, the server autoplay.py executes a python script that writes the word to the browser by pressing the keys.

## Running the solver
You must have Python3, the keyboard module installed and NodeJS and npm installed on your device.
After you have everything installed and the repository copied to your local machine you can run the solver with these commands:
```
cd server
npm i
node server.js
```

When you have the server running, you can open [https://sanuli.fi](https://sanuli.fi) and paste the client.js script into the devtools (F12) console.

## Using the solver
You can start the solver by pressing the Escape (Esc) key. To stop the script simply unfocus the browser tab or window.

## Disclaimer
This solver too is made just for fun and for personal use. Setup process is not mean't to be easy or quick. 
If the author of Sanuli, i.e. Cadiac, wants this repository to be deleted, I can do it without any problems.
the behavior of this script is NO WAY an optimal or well-implemented solution.
