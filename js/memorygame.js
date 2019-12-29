{
    class Game {
        constructor() {
            this.imgEasy = [
                "./images/ca2.jpg",
                "./images/ca6.jpg",
                "./images/ca2.jpg",
                "./images/ca1.jpg",
                "./images/ca5.jpg",
                "./images/ca3.jpg",
                "./images/ca4.jpg",
                "./images/ca6.jpg",
                "./images/ca1.jpg",
                "./images/ca4.jpg",
                "./images/ca3.jpg",
                "./images/ca5.jpg",
            ];
            this.imgMedium = [
                "./images/ca1.jpg",
                "./images/ca1.jpg",
                "./images/ca2.jpg",
                "./images/ca2.jpg",
                "./images/ca3.jpg",
                "./images/ca3.jpg",
                "./images/ca4.jpg",
                "./images/ca4.jpg",
                "./images/ca5.jpg",
                "./images/ca5.jpg",
                "./images/ca6.jpg",
                "./images/ca6.jpg",
                "./images/ca7.jpg",
                "./images/ca7.jpg",
                "./images/ca8.jpg",
                "./images/ca8.jpg",
                "./images/ca9.jpg",
                "./images/ca9.jpg"
            ];
            this.imgHard = [
                "./images/ca1.jpg",
                "./images/ca1.jpg",
                "./images/ca2.jpg",
                "./images/ca2.jpg",
                "./images/ca3.jpg",
                "./images/ca3.jpg",
                "./images/ca4.jpg",
                "./images/ca4.jpg",
                "./images/ca5.jpg",
                "./images/ca5.jpg",
                "./images/ca6.jpg",
                "./images/ca6.jpg",
                "./images/ca7.jpg",
                "./images/ca7.jpg",
                "./images/ca8.jpg",
                "./images/ca8.jpg",
                "./images/ca9.jpg",
                "./images/ca9.jpg",
                "./images/ca10.jpg",
                "./images/ca10.jpg",
                "./images/ca11.jpg",
                "./images/ca11.jpg",
                "./images/ca12.jpg",
                "./images/ca12.jpg"
            ];
            this.gameBody = document.querySelector('.game-container');
            this.newGameBtn = document.querySelector('#new-game');
            this.easyBtn = document.querySelector('#easy');
            this.mediumBtn = document.querySelector('#medium');
            this.hardBtn = document.querySelector('#hard');
            this.attemptCounter = 0;
            this.firstChoise = {};
            this.secondChoise = {};
            this.shuffledImages = [];
            this.shuffle(this.imgEasy);
            this.board = new Board(3, 4, this.gameBody, this.shuffledImages);
            this.bindOptions();
            this.initListeners();
        }

        bindOptions() {
            this.newGameBtn.addEventListener('click', () => this.newGame())
            this.easyBtn.addEventListener('click', () => { this.initBoard(3, 4, this.gameBody, this.imgEasy) });
            this.mediumBtn.addEventListener('click', () => { this.initBoard(3, 6, this.gameBody, this.imgMedium) });
            this.hardBtn.addEventListener('click', () => { this.initBoard(4, 6, this.gameBody, this.imgHard) });
        }

        initListeners() {
            for (let i = 0; i < this.board.cells.length; i++) {
                for (let j = 0; j < this.board.cells[i].length; j++) {
                    this.board.cells[i][j].addEventListener('click', (e) => { this.onCardClick(e) })
                }
            }
        }

        initBoard(rows, columns, gameBody, images) {
            this.gameBody.innerText = "";
            this.attemptCounter = 0;
            this.firstChoise = {};
            this.secondChoise = {};
            this.board.clearBoard();
            this.shuffle(images);
            this.board = new Board(rows, columns, gameBody, this.shuffledImages);
            this.initListeners();
        }

        newGame() {
            this.initBoard(this.board.rows, this.board.columns, this.gameBody, this.board.images);
        }

        shuffle(array) {
            let newArray = [];
            array.forEach(imgSrc =>
                newArray.splice(Math.floor(Math.random() * array.length), 0, imgSrc)
            );
            this.shuffledImages = newArray;
        }

        onCardClick(e) {
            if (Object.entries(this.firstChoise).length === 0 && this.firstChoise.constructor === Object) {
                this.firstChoise = e.currentTarget;
                this.firstChoise.classList.add('selected');
            } else if (Object.entries(this.secondChoise).length === 0 && this.secondChoise.constructor === Object) {
                if (this.firstChoise != e.currentTarget) {
                    this.secondChoise = e.currentTarget;
                    this.secondChoise.classList.add('selected');
                    const onHold = this.gameBody.querySelectorAll(':not(.selected):not(.delete)');
                    onHold.forEach(elem => elem.classList.add('paused'));
                }
            }
            if (this.gameBody.querySelectorAll('.selected').length == 2) {
                const firstImg = this.firstChoise.firstChild.children[1].firstChild;
                const secondImg = this.secondChoise.firstChild.children[1].firstChild;
                if (firstImg.src === secondImg.src) {
                    setTimeout(() => {
                        this.firstChoise.classList.add('delete');
                        this.secondChoise.classList.add('delete');
                    }, 1000);
                } else {
                    this.attemptCounter++;
                }
                setTimeout(() => {
                    this.firstChoise.classList.remove('selected');
                    this.secondChoise.classList.remove('selected');
                    this.gameBody.querySelectorAll('.paused').forEach(elem => elem.classList.remove('paused'));
                    this.firstChoise = {};
                    this.secondChoise = {};
                }, 1000);

                if (this.gameBody.querySelectorAll('.delete').length === (this.board.rows * this.board.columns - 2)) {
                    this.gameBody.innerText = `You won!\nThe number of failed attempts is: ${this.attemptCounter}`;
                }
            }
        }
    }

    class Board {
        constructor(rows, columns, gameBody, images) {
            this.rows = rows;
            this.columns = columns;
            this.gameBody = gameBody;
            this.images = images;
            this.rowGrid = [];
            this.cells = [];
            this.imagesGrid = [];

            let count = -1;
            for (let i = 0; i < this.rows; i++) {
                this.cells.push([]);
                this.imagesGrid.push([]);
                const row = document.createElement('div');
                row.classList.add('row');
                for (let j = 0; j < this.columns; j++) {
                    count++;
                    const flipCard = document.createElement('div');
                    flipCard.classList.add('flip-card');
                    const flipCardInner = document.createElement('div');
                    flipCardInner.classList.add('flip-card-inner');
                    const flipCardFront = document.createElement('div');
                    flipCardFront.classList.add('flip-card-front');
                    const imgFront = document.createElement('img');
                    imgFront.src = "./images/backcard.jpg";
                    imgFront.alt = "back card";
                    const flipCardBack = document.createElement('div');
                    flipCardBack.classList.add('flip-card-back');
                    const imgBack = document.createElement('img');
                    imgBack.src = this.images[count];
                    imgBack.alt = "cute animal card";
                    flipCardFront.appendChild(imgFront);
                    flipCardBack.appendChild(imgBack);
                    flipCardInner.appendChild(flipCardFront);
                    flipCardInner.appendChild(flipCardBack);
                    flipCard.appendChild(flipCardInner);
                    row.appendChild(flipCard);
                    this.cells[i][j] = flipCard;
                    this.imagesGrid[i][j] = imgBack;
                }
                this.gameBody.appendChild(row);
                this.rowGrid[i] = row;
            }
        }

        clearBoard() {
            this.rowGrid.forEach(row => row.remove())
        }
    }

    new Game();
}