let score = 0;
const words = {
    across: [
        { start: "0,2", positions: ["0,2", "0,3", "0,4", "0,5", "0,6"], answer: "MOBIL", number: 1 },
        { start: "13,0", positions: ["13,0", "13,1", "13,2", "13,3", "13,4", "13,5", "13,6"], answer: "SANGKAR", number: 4 },
        { start: "6,2", positions: ["6,2", "6,3", "6,4", "6,5", "6,6", "6,7"], answer: "ANGGUR", number:  7 },
        { start: "6,9", positions: ["6,9", "6,10", "6,11", "6,12"], answer: "PENA", number: 8 },
        { start: "8,3", positions: ["8,3", "8,4", "8,5", "8,6", "8,7", "8,8", "8,9"], answer: "TELINGA", number: 9 }
    ],
    down: [
        { start: "0,4", positions: ["0,4", "1,4", "2,4", "3,4", "4,4", "5,4", "6,4"], answer: "BANDUNG", number: 2 },
        { start: "1,1", positions: ["1,1", "2,1", "3,1", "4,1"], answer: "KAOS", number: 3 },
        { start: "5,6", positions: ["5,6", "6,6", "7,6", "8,6"], answer: "BUMI", number: 5 },
        { start: "5,12", positions: ["5,12", "6,12", "7,12", "8,12", "9,12"], answer: "GAJAH", number: 6 },
        { start: "6,9", positions: ["6,9", "7,9", "8,9", "9,9", "10,9", "11,9", "12,9"], answer: "PRANCIS", number: 8 }
    ]
};



const blackCells = [
    "0,0", "0,1", "0,7", "0,8", "0,9", "0,10", "0,11", "0,12", "0,13",
"1,0", "1,2", "1,3", "1,5", "1,6", "1,7", "1,8", "1,9", "1,10", "1,11", "1,12", "1,13",
"2,0", "2,2", "2,3", "2,5", "2,6", "2,7", "2,8", "2,9", "2,10", "2,11", "2,12", "2,13",
"3,0", "3,2", "3,3", "3,5", "3,6", "3,7", "3,8", "3,9", "3,10", "3,11", "3,12", "3,13",
"4,0", "4,2", "4,3", "4,5", "4,6", "4,7", "4,8", "4,9", "4,10", "4,11", "4,12", "4,13",
"5,0", "5,1", "5,2", "5,3", "5,5", "5,7", "5,8", "5,9", "5,10", "5,11", "5,13",
"6,0", "6,1", "6,8", "6,13",
"7,0", "7,1", "7,2", "7,3", "7,4", "7,5", "7,7", "7,8", "7,10", "7,11", "7,13",
"8,0", "8,1", "8,2", "8,10", "8,11", "8,13",
"9,0", "9,1", "9,2", "9,3", "9,4", "9,5", "9,6", "9,7", "9,8", "9,10", "9,11", "9,13",
"10,0", "10,1", "10,2", "10,3", "10,4", "10,5", "10,6", "10,7", "10,8", "10,10", "10,11", "10,12", "10,13",
"11,0", "11,1", "11,2", "11,3", "11,4", "11,5", "11,6", "11,7", "11,8", "11,10", "11,11", "11,12", "11,13",
"12,0", "12,1", "12,2", "12,3", "12,4", "12,5", "12,6", "12,7", "12,8", "12,10", "12,11", "12,12", "12,13", "13,7", "13,8", "13,9", "13,10", "13,11", "13,12", "13,13"

];

function renderGrid() {
    const crossword = document.getElementById("crossword");
    crossword.innerHTML = "";

    const startingPositions = {};
    [...words.across, ...words.down].forEach(word => {
        startingPositions[word.start] = word.number;
    });

    for (let i = 0; i <= 13; i++) {
        for (let j = 0; j <= 13; j++) {
            const cell = document.createElement("div");
            const position = `${i},${j}`;

            if (blackCells.includes(position)) {
                cell.classList.add("cell", "black");
            } else {
                cell.classList.add("cell");

                const input = document.createElement("input");
                input.classList.add("cell-input");
                input.maxLength = 1;
                input.dataset.position = position;
                cell.appendChild(input);

                if (startingPositions[position]) {
                    const numberSpan = document.createElement("span");
                    numberSpan.classList.add("cell-number");
                    numberSpan.textContent = startingPositions[position];
                    cell.appendChild(numberSpan);
                }
            }

            crossword.appendChild(cell);
        }
    }
}

function checkAnswers() {
    score = 0;
    const correctPositions = new Set();

    function validateWord(word) {
        let isCorrect = true;
        word.positions.forEach((position, index) => {
            const input = document.querySelector(`input[data-position='${position}']`);
            if (input.value.toUpperCase() !== word.answer[index]) {
                isCorrect = false;
            }
        });

        if (isCorrect) {
            word.positions.forEach(position => correctPositions.add(position));
            score += 10;
        }
    }

    words.across.forEach(validateWord);
    words.down.forEach(validateWord);

    document.querySelectorAll(".cell-input").forEach(input => {
        const position = input.dataset.position;
        if (correctPositions.has(position)) {
            input.style.backgroundColor = "#d4edda";
        } else {
            input.style.backgroundColor = "#f8d7da";
        }
    });

    document.getElementById("score").textContent = `Skor: ${score}`;
}

renderGrid();