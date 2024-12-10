import fs from "node:fs";
import path from "node:path";

const directions = [
    { x: 0, y: 1 }, 
    { x: 1, y: 0 }, 
    { x: 1, y: 1 }, 
    { x: 1, y: -1 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
    { x: -1, y: 1 } 
];

const findAllXMAS = (matrix: string[][]): number => {
    const word = "XMAS";
    const wordLength = word.length;
    let count = 0;

    const isValid = (x: number, y: number) => x >= 0 && y >= 0 && x < matrix.length && y < matrix[0].length;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            for (const direction of directions) {
                let k;
                for (k = 0; k < wordLength; k++) {
                    const newX = i + k * direction.x;
                    const newY = j + k * direction.y;
                    if (!isValid(newX, newY) || matrix[newX][newY] !== word[k]) {
                        break;
                    }
                }
                if (k === wordLength) {
                    count++;
                }
            }
        }
    }

    return count;
};

const findAllXMASPattern = (matrix: string[][]): number => {
    let count = 0;

    const isValid = (x: number, y: number) => x >= 0 && y >= 0 && x < matrix.length && y < matrix[0].length;

    for (let i = 0; i < matrix.length - 2; i++) {
        for (let j = 0; j < matrix[i].length - 2; j++) {
            if (
                isValid(i, j) && isValid(i + 2, j) &&
                isValid(i + 1, j + 1) &&
                isValid(i, j + 2) && isValid(i + 2, j + 2) &&
                matrix[i][j] === "M" && matrix[i + 2][j] === "M" &&
                matrix[i + 1][j + 1] === "A" &&
                matrix[i][j + 2] === "S" && matrix[i + 2][j + 2] === "S"
            ) {
                count++;
            }
            if (
                isValid(i, j + 2) && isValid(i + 2, j + 2) &&
                isValid(i + 1, j + 1) &&
                isValid(i, j) && isValid(i + 2, j) &&
                matrix[i][j + 2] === "M" && matrix[i + 2][j + 2] === "M" &&
                matrix[i + 1][j + 1] === "A" &&
                matrix[i][j] === "S" && matrix[i + 2][j] === "S"
            ) {
                count++;
            }
            if (
                isValid(i, j) && isValid(i, j + 2) &&
                isValid(i + 1, j + 1) &&
                isValid(i + 2, j) && isValid(i + 2, j + 2) &&
                matrix[i][j] === "M" && matrix[i][j + 2] === "M" &&
                matrix[i + 1][j + 1] === "A" &&
                matrix[i + 2][j] === "S" && matrix[i + 2][j + 2] === "S"
            ) {
                count++;
            }
            if (
                isValid(i, j) && isValid(i, j + 2) &&
                isValid(i + 1, j + 1) &&
                isValid(i + 2, j) && isValid(i + 2, j + 2) &&
                matrix[i][j] === "S" && matrix[i][j + 2] === "S" &&
                matrix[i + 1][j + 1] === "A" &&
                matrix[i + 2][j] === "M" && matrix[i + 2][j + 2] === "M"
            ) {
                count++;
            }
        }
    }

    return count;
};

const main = () => {
    const filePath = path.join(__dirname, "xmas.txt");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const xmasArray = data.split("").filter(char => char !== '\n');
        const matrixSize = Math.sqrt(xmasArray.length);
        const matrix: string[][] = [];
        for (let i = 0; i < matrixSize; i++) {
            matrix.push(xmasArray.slice(i * matrixSize, (i + 1) * matrixSize));
        }

        const countXMAS = findAllXMAS(matrix);
        console.log("Total XMAS found:", countXMAS);

        const countXMASPattern = findAllXMASPattern(matrix);
        console.log("Total X-MAS patterns found:", countXMASPattern);
    });
};

main();