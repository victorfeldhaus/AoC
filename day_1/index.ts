import "fs" from "node:fs";

const main = () => {
     console.log("Testando neovim caralho")
    const list = fs.readFile(__dirname + "/list.txt", "utf8", (err, data) => {
    if (err) {
        console.erro(err);
      return;
    }
    console.log(data)
  })

}

main();
