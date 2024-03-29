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
    
        // Add class for color based on the row
        if (row === 0 || row === 1) { // Top pieces (black)
            chessPiece.classList.add("black-piece");
        } else if (row === 6 || row === 7) { // Bottom pieces (white)
            chessPiece.classList.add("white-piece");
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



    let isWhitesTurn = true; // Start with white's turn

    function dragStart(event) {
        const piece = event.target;
        console.log("Trying to move piece: ", piece);
    
        if ((isWhitesTurn && piece.classList.contains('white-piece')) || 
            (!isWhitesTurn && piece.classList.contains('black-piece'))) {
            console.log("It's the correct player's turn.");
            event.dataTransfer.setData("text/plain", event.target.id);
        } else {
            console.log("It's not the correct player's turn.");
            event.preventDefault(); // Prevent dragging if it's not the player's turn
        }
    }

    function allowDrop(event) {
        event.preventDefault();
    }
    
    


    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        const piece = document.getElementById(data);
    
        // Get the target square. If it's a piece, get the parent square
        let targetSquare = event.target;
        if (event.target.classList.contains('chess-piece')) {
            targetSquare = event.target.parentNode;
        }
    
        // Check if the target square has a piece of the same color
        if (targetSquare.querySelector('.chess-piece')) {
            const targetPiece = targetSquare.querySelector('.chess-piece');
            if ((piece.classList.contains('white-piece') && targetPiece.classList.contains('white-piece')) ||
                (piece.classList.contains('black-piece') && targetPiece.classList.contains('black-piece'))) {
                console.log("Invalid move: Cannot move to a square with a piece of the same color.");
                return; // Cancel the move
            }
        }
    
        // Move the piece to the target square
        targetSquare.appendChild(piece);
    
        // After a valid move, switch turns
        isWhitesTurn = !isWhitesTurn;
    }
    
        
        // Set up draggable pieces
        document.querySelectorAll('.chess-piece').forEach(piece => {
            piece.setAttribute("draggable", "true");
            piece.addEventListener('dragstart', dragStart);
            piece.id = 'piece-' + Math.random().toString(36).substr(2, 9); // Assign a unique ID
        });
        
        // Allow dropping on squares and handle the drop
        document.querySelectorAll('.square').forEach(square => {
            square.addEventListener('dragover', allowDrop);
            square.addEventListener('drop', drop);
        });
        
});
