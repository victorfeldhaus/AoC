import fs from "node:fs";
import path from "node:path";

type Rule = [number, number];
type Update = number[];

function parseInput(data: string): { rules: Rule[], updates: Update[] } {
    const sections = data.trim().split('\n\n');
    const rules = sections[0].split('\n').map(line => line.split('|').map(Number) as Rule);
    const updates = sections[1].split('\n').map(line => line.split(',').map(Number) as Update);
    return { rules, updates };
}

function isOrderedCorrectly(update: Update, rules: Rule[]): boolean {
    const indexMap = new Map<number, number>();
    update.forEach((page, index) => indexMap.set(page, index));
    return rules.every(([before, after]) => {
        if (indexMap.has(before) && indexMap.has(after)) {
            return indexMap.get(before)! < indexMap.get(after)!;
        }
        return true;
    });
}

function findMiddlePage(update: Update): number {
    const middleIndex = Math.floor(update.length / 2);
    return update[middleIndex];
}

function orderUpdate(update: Update, rules: Rule[]): Update {
    const graph = new Map<number, number[]>();
    const inDegree = new Map<number, number>();

    update.forEach(page => {
        graph.set(page, []);
        inDegree.set(page, 0);
    });

    rules.forEach(([before, after]) => {
        if (graph.has(before) && graph.has(after)) {
            graph.get(before)!.push(after);
            inDegree.set(after, (inDegree.get(after) || 0) + 1);
        }
    });

    const queue: number[] = [];
    inDegree.forEach((degree, page) => {
        if (degree === 0) {
            queue.push(page);
        }
    });

    const orderedUpdate: number[] = [];
    while (queue.length > 0) {
        const page = queue.shift()!;
        orderedUpdate.push(page);
        graph.get(page)!.forEach(nextPage => {
            inDegree.set(nextPage, inDegree.get(nextPage)! - 1);
            if (inDegree.get(nextPage) === 0) {
                queue.push(nextPage);
            }
        });
    }

    return orderedUpdate;
}

function main() {
    const filePath = path.join(__dirname, "atualizacoes.txt");
    const data = fs.readFileSync(filePath, 'utf-8');
    const { rules, updates } = parseInput(data);
    let sumOfMiddlePages = 0;
    let sumOfMiddlePagesIncorrect = 0;

    updates.forEach(update => {
        if (isOrderedCorrectly(update, rules)) {
            const middlePage = findMiddlePage(update);
            sumOfMiddlePages += middlePage;
        } else {
            console.log(`Update: ${update} is NOT ordered correctly.`);
            const orderedUpdate = orderUpdate(update, rules);
            const middlePage = findMiddlePage(orderedUpdate);
            sumOfMiddlePagesIncorrect += middlePage;
        }
    });

    console.log(sumOfMiddlePages);
    console.log(sumOfMiddlePagesIncorrect);
}

main();