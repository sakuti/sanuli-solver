document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
		let presentRows = [[], [], [], [], []];
		let absentRows = [[], [], [], [], []];
		let knownLetters = ["", "", "", "", ""];

		document.querySelectorAll('.row-5').forEach(row => {
			if(row.parentElement.className.toString().includes('slide-out')) return;


			row.childNodes.forEach((node, index) => {
				if(node.classList.contains('correct')) {
					knownLetters[index] = node.textContent.toLowerCase();
				} else if(node.classList.contains('absent')) {
					absentRows[index].push(node.textContent.toLowerCase());
				} else if(node.classList.contains('present')) {
					presentRows[index].push(node.textContent.toLowerCase());
				}
			})
		})

		fetch('http://localhost:8080/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				knownLetters,
				presentRows,
				absentRows
			})
		})
	}
});