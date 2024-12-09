import fs from "node:fs";
import path from "node:path";

const main = () => {
    const filePath = path.join(__dirname, "list.txt");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const lines = data.trim().split("\n");
        const array1: number[] = [];
        const array2: number[] = [];

        lines.forEach(line => {
            const [num1, num2] = line.split(/\s+/).map(Number);
            array1.push(num1);
            array2.push(num2);
        });

        const sortAr1 = array1.sort();
        const sortAr2 = array2.sort();

        let totalDistance = 0;

        const hashmap = new Map<number, number>();

        for (let num of sortAr1) {
          let count = 0;
          for (let num2 of sortAr2) {
            if (num === num2) {
              count++
            }
          }
          hashmap.set(num, count);
        }

        let totalNumberRepeat = 0;

        hashmap.forEach((key, value) => {
          totalNumberRepeat+= key * value;
        })


        for (let i = 0; i < sortAr1.length; i++) {
            if (sortAr1[i] === sortAr2[i])
              totalDistance+= 0

            if (sortAr1[i] > sortAr2[i]) {
              totalDistance+= sortAr1[i] - sortAr2[i]
            }

            if (sortAr1[i] < sortAr2[i]) {
              totalDistance+= sortAr2[i] - sortAr1[i]
            }
        }


        console.log(totalDistance)
        console.log(totalNumberRepeat)
    });
}

main();