import fs from "node:fs";
import path from "node:path";

const main = () => {
    console.log("Testing Neovim");
    fs.readFile(path.join(__dirname, "list.txt"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
}

main();