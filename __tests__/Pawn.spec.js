
import Board from '../js/Board.js';
import { COLOR } from '../js/constants.js';
import Pawn from '../js/Pawn.js';
import Queen from '../js/Queen.js';

describe('Move', () => {
    let tiles;
    beforeEach(() => {
        const board = new Board();
        tiles = board.createEmptyBoard();
    });

    test('Should move', () => {
        const pawn = new Pawn(1, 6, COLOR.WHITE);

        let hasError = false

        try {
            pawn.move(1, 5, tiles)
        } catch (e) {
            hasError = true
        }

        expect(hasError === false).toBeTruthy();
        expect(pawn.x).toBe(1);
        expect(pawn.y).toBe(5);
    });
});

describe('Move wrong', () => {
    let tiles;
    beforeEach(() => {
        const board = new Board();
        tiles = board.createEmptyBoard();
    });

    test('Should not move', () => {
        const pawn = new Pawn(1, 6, COLOR.WHITE);

        let hasError = false

        try {
            pawn.move(1, 8, tiles)
        } catch (e) {
            hasError = true
        }

        expect(hasError).toBeTruthy();
        expect(pawn.x).toBe(1);
        expect(pawn.y).toBe(6);
    });

    test('Should not move', () => {
        const pawn = new Pawn(1, 6, COLOR.WHITE);

        let hasError = false

        try {
            pawn.move(8, 6, tiles)
        } catch (e) {
            hasError = true
        }

        expect(hasError).toBeTruthy();
        expect(pawn.x).toBe(1);
        expect(pawn.y).toBe(6);
    });
});


describe('Attacking moves', () => {
    let tiles;
    beforeEach(() => {
        const board = new Board();
        tiles = board.createEmptyBoard();
    });

    test('Should find one attacking move', () => {
        const pawn = new Pawn(0, 6, COLOR.WHITE);
        const enemyPawn1 = new Pawn(0, 5, COLOR.BLACK);
        const enemyPawn2 = new Pawn(1, 5, COLOR.BLACK);

        tiles[0][6] = pawn;
        tiles[0][5] = enemyPawn1;
        tiles[1][5] = enemyPawn2;

        expect(pawn.findAttacks(tiles).length).toBe(1);
    });

    test('Should find zero attacking moves', () => {
        const pawn = new Pawn(0, 6, COLOR.WHITE);
        const enemyPawn1 = new Pawn(0, 5, COLOR.BLACK);

        tiles[0][6] = pawn;
        tiles[0][5] = enemyPawn1;

        expect(pawn.findAttacks(tiles).length).toBe(0);
    });
});

describe('Finding moves', () => {
    let tiles;
    beforeEach(() => {
        tiles = new Board().tiles;
    });

    test('Should find legal move for black in starting position', () => {
        const pawn = new Pawn(1, 1, COLOR.BLACK);
        pawn.hasMoved = true;
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(1);

        expect(legalMoves[0].x).toBe(pawn.x);
        expect(legalMoves[0].y).toBe(pawn.y + 1);
    });

    test('Should find legal move for white in starting position', () => {
        const pawn = new Pawn(1, 6, COLOR.WHITE);
        pawn.hasMoved = true;
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(1);

        expect(legalMoves[0].x).toBe(pawn.x);
        expect(legalMoves[0].y).toBe(pawn.y - 1);
    });

    test('Should not find a legal move if there is a piece in front of black', () => {
        tiles[1][2] = new Pawn(1, 2, COLOR.BLACK);
        const pawn = new Pawn(1, 1, COLOR.BLACK);
        pawn.hasMoved = true;
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(0);
    });

    test('Should not find a legal move if there is a piece in front of white', () => {
        tiles[1][5] = new Pawn(1, 5, COLOR.WHITE);
        const pawn = new Pawn(1, 6, COLOR.WHITE);
        pawn.hasMoved = true;
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(0);
    });

    test('Should find two possible moves if the white pawn hasn\'t yet moved', () => {
        const pawn = new Pawn(1, 6, COLOR.WHITE);
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(2);

        expect(legalMoves[0].x).toBe(1);
        expect(legalMoves[1].x).toBe(1);
        expect(legalMoves[0].y).toBe(5);
        expect(legalMoves[1].y).toBe(4);
    });

    test('Should find two possible moves if the black pawn hasn\'t yet moved', () => {
        const pawn = new Pawn(1, 1, COLOR.BLACK);
        const legalMoves = pawn.findMoves(tiles);
        expect(legalMoves.length).toBe(2);

        expect(legalMoves[0].x).toBe(1);
        expect(legalMoves[1].x).toBe(1);
        expect(legalMoves[0].y).toBe(2);
        expect(legalMoves[1].y).toBe(3);
    });

    test('Should find no legal moves if enemy pawn in front', () => {
        // given
        const pawnInFront = new Pawn(1, 5, COLOR.BLACK);
        tiles[1][5] = pawnInFront;
        const pawn = new Pawn(1, 6, COLOR.WHITE);

        // when
        const legalMoves = pawn.findMoves(tiles);

        // then 
        expect(legalMoves.length).toBe(0);
    });

    test('Should not be able to jump over pieces on the first move', () => {
        // given
        const pawnInFront = new Pawn(1, 5, COLOR.WHITE);
        tiles[1][5] = pawnInFront;
        const pawn = new Pawn(1, 6, COLOR.WHITE);

        // when
        const legalMoves = pawn.findMoves(tiles);

        // then 
        expect(legalMoves.length).toBe(0);
    });

    test('Should show 3 legal moves if enemy pawn diagonal right to current pawn that hasnt yet move', () => {
        // given
        const diagonalPawn = new Pawn(2, 5, COLOR.BLACK);
        tiles[2][5] = diagonalPawn;
        const pawn = new Pawn(1, 6, COLOR.WHITE);

        // when
        const legalMoves = pawn.findMoves(tiles);

        // then 
        expect(legalMoves.length).toBe(3);
    });

    test('Should show 3 legal moves if enemy pawn diagonal left to current pawn that hasnt yet move', () => {
        // given
        const diagonalPawn = new Pawn(0, 5, COLOR.BLACK);
        tiles[0][5] = diagonalPawn;
        const pawn = new Pawn(1, 6, COLOR.WHITE);

        // when
        const legalMoves = pawn.findMoves(tiles);

        // then 
        expect(legalMoves.length).toBe(3);
    });

    test('Should show 2 legal if a side pawn', () => {
        // given
        const pawn = new Pawn(0, 6, COLOR.WHITE);

        // when
        const legalMoves = pawn.findMoves(tiles);

        // then 
        expect(legalMoves.length).toBe(2);
    });
});

describe('Should upgrade to a queen if at the edge of the board', () => {
    let tiles;
    beforeEach(() => {
        const board = new Board();
        tiles = board.createEmptyBoard();
    });

    test('Should upgrade white pawn to a queen', () => {
        // given
        const pawn = new Pawn(0, 1, COLOR.WHITE);
        pawn.move(0, 0, tiles);

        expect(tiles[0][0] instanceof Queen).toBeTruthy();
    });

    test('Should upgrade black pawn to a queen', () => {
        // given
        const pawn = new Pawn(0, 6, COLOR.BLACK);
        pawn.move(0, 7, tiles);

        expect(tiles[0][7] instanceof Queen).toBeTruthy();
    });
});

