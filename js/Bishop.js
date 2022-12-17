import { COLOR } from './constants.js';
import Piece from './Piece.js';
export default class Bishop extends Piece {
    constructor(x, y, color, sprite) {
        super(x, y, color, sprite);
    }


    findMoves(tiles) {
        let moves = [];
        moves.push(...this.findAllMoves(1, -1, tiles));
        moves.push(...this.findAllMoves(-1, -1, tiles));
        moves.push(...this.findAllMoves(1, 1, tiles));
        moves.push(...this.findAllMoves(-1, 1, tiles));
        return moves;
    }

    findAllMoves(xDir, yDir, tiles) {
        let moves = [];
        for (let i = 1; i < 8; i++) {
            let newX = this.x + (xDir * i);
            let newY = this.y + (yDir * i);

            if (this.isOffBoard(newX, newY)) {
                return moves;
            }

            if (tiles[newX][newY]) {
                if (tiles[newX][newY].color !== this.color) {
                    moves.push({ x: newX, y: newY });
                }
                return moves;
            }
            moves.push({ x: newX, y: newY });
        }
        return moves;
    }
}