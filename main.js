document.addEventListener("DOMContentLoaded", function() {
    const chessboard = document.getElementById("chessboard");
    const mainPieces = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]; // Symbols for main pieces

    function createChessboard() {
        const letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const numbers = [' ', '1', '2', '3', '4', '5', '6', '7', '8'];
    
        for (let row = 0; row <= 8; row++) {
            for (let col = 0; col <= 8; col++) {
                const square = document.createElement("div");
                square.classList.add("square");
    
                if (row === 8) {
                    // Add letters at the bottom
                    square.textContent = letters[col];
                    square.classList.add("label");
                } else if (col === 0) {
                    // Add numbers on the side
                    square.textContent = numbers[8 - row];
                    square.classList.add("label");
                } else {
                    // Rest of the chessboard
                    square.dataset.row = row;
                    square.dataset.col = col;
                    if ((row + col) % 2 === 0) {
                        square.classList.add("light-square");
                    } else {
                        square.classList.add("dark-square");
                    }
                }
    
                chessboard.appendChild(square);
            }
        }
    }
    
    

    function addChessPiece(piece, row, col) {
    const square = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
    const chessPiece = document.createElement("div");
    chessPiece.classList.add("chess-piece");
    chessPiece.textContent = piece;

    // Add a class for color based on the row
    if (row === 0 || row === 1) { // top pieces (black)
        chessPiece.classList.add("black-piece");
    } 
    square.appendChild(chessPiece);
}


    createChessboard();

    // Add main pieces on the first and second-to-last rows
    for (let col = 1; col <= 8; col++) {
        addChessPiece(mainPieces[col - 1], 0, col); // White main pieces
        addChessPiece(mainPieces[col - 1], 7, col); // Black main pieces
    }

    // Add pawns on the second and third-to-last rows
    for (let col = 1; col <= 8; col++) {
        addChessPiece("♙", 1, col); // White pawns
        addChessPiece("♙", 6, col); // Black pawns
    }

});
