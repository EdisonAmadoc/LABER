document.addEventListener('DOMContentLoaded', () => {

    const board = document.getElementById('game-board');
    const message = document.getElementById('message');
    let playerX = 1;
    let playerY = 1;

    const map = [
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '.', '#', '#', '#', '.', '#', '#', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '#', '.', '.', '#'],
        ['#', '#', '#', '.', '#', '#', '#', '.', '#', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '#', '.', '#', '#', '#', '#', '#', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', 'O'],
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ];

    // Dibuja el tablero inicial
    function drawMap() {
        board.innerHTML = '';
        board.style.gridTemplateColumns = `repeat(${map[0].length}, 1fr)`;
        
        map.forEach((row, y) => {
            row.forEach((cell, x) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.textContent = cell;
                
                if (cell === '#') {
                    cellDiv.classList.add('wall');
                } else if (cell === '.') {
                    cellDiv.classList.add('path');
                } else if (cell === 'O') {
                    cellDiv.classList.add('goal');
                }
                
                if (y === playerY && x === playerX) {
                    cellDiv.classList.add('player');
                    cellDiv.textContent = '@';
                }
                
                board.appendChild(cellDiv);
            });
        });
    }

    // Maneja el movimiento del jugador
    document.addEventListener('keydown', (e) => {
        let newX = playerX;
        let newY = playerY;

        switch (e.key) {
            case 'ArrowUp':
                newY--;
                break;
            case 'ArrowDown':
                newY++;
                break;
            case 'ArrowLeft':
                newX--;
                break;
            case 'ArrowRight':
                newX++;
                break;
        }

        if (map[newY][newX] !== '#') {
            playerX = newX;
            playerY = newY;
            drawMap();
        }

        if (map[playerY][playerX] === 'O') {
            message.textContent = '¡Felicidades! ¡Has ganado!';
            message.style.color = '#2ecc71';
            document.removeEventListener('keydown', e);
        }
    });

    // Inicia el juego
    drawMap();
});