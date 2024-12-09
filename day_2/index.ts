import fs from "node:fs";
import path from "node:path";

const main = () => {
    const filePath = path.join(__dirname, "relatorios.txt");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const lines = data.trim().split('\n').map(line => line.trim().split(/\s+/).map(Number));

        let relatorioSeguro = 0;

        for (let line of lines) {
            let isIncreasing = true;
            let isDecreasing = true;
            let isSafe = true;

            for (let i = 1; i < line.length; i++) {
                const curr = line[i];
                const prev = line[i - 1];

                if (curr > prev) {
                    isDecreasing = false;
                    if (curr - prev > 3) {
                        isSafe = false;
                        break;
                    }
                } else if (curr < prev) {
                    isIncreasing = false;
                    if (prev - curr > 3) {
                        isSafe = false;
                        break;
                    }
                } else {
                    isSafe = false;
                    break;
                }
            }

            if (isSafe && (isIncreasing || isDecreasing)) {
                relatorioSeguro++;
            }
        }

        console.log("relatorios seguros:", relatorioSeguro);
    });
}

main();

const part2 = () => {
    const filePath = path.join(__dirname, "relatorios.txt");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const lines = data.trim().split('\n').map(line => line.trim().split(/\s+/).map(Number));

        let relatorioSeguro = 0;

        const isReportSafe = (levels: number[]): boolean => {
            let isIncreasing = true;
            let isDecreasing = true;

            for (let i = 1; i < levels.length; i++) {
                const curr = levels[i];
                const prev = levels[i - 1];

                if (curr > prev) {
                    isDecreasing = false;
                    if (curr - prev > 3) {
                        return false;
                    }
                } else if (curr < prev) {
                    isIncreasing = false;
                    if (prev - curr > 3) {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            return isIncreasing || isDecreasing;
        };

        for (let line of lines) {
            if (isReportSafe(line)) {
                relatorioSeguro++;
            } else {
                for (let i = 0; i < line.length; i++) {
                    const newLevels = line.slice(0, i).concat(line.slice(i + 1));
                    if (isReportSafe(newLevels)) {
                        relatorioSeguro++;
                        break;
                    }
                }
            }
        }

        console.log("Relatórios seguros:", relatorioSeguro);
    });
}

part2();