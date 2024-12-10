import fs from "node:fs";
import path from "node:path";

const main = () => {
    const filePath = path.join(__dirname, "mult.txt");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const textCorrompido = data.trim();
        const regex = /(mul\((\d{1,3}),(\d{1,3})\))|(do\(\))|(don't\(\))/g;
        let match;
        let totalSum = 0;
        let enabled = true;

        while ((match = regex.exec(textCorrompido)) !== null) {
            if (match[1]) { // mul(x, y)
                if (enabled) {
                    const x = parseInt(match[2], 10);
                    const y = parseInt(match[3], 10);
                    totalSum += x * y;
                }
            } else if (match[4]) { // do()
                enabled = true;
            } else if (match[5]) { // don't()
                enabled = false;
            }
        }

        console.log("Total Sum:", totalSum);
    });
};

main();