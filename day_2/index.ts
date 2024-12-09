import fs from "node:fs";
import path from "node:path";

const main = () => {
    const filePath = path.join(__dirname, "relatorios.txt");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // const lines = [[
        //   58, 61, 62, 65,
        //   67, 70, 73
        // ]]
        const lines = data.trim().split('\n').map(line => line.trim().split(/\s+/).map(Number));

        // console.log(lines);
        let relatorioSeguro = 0
        for (let line of lines) {
          console.log("rel: ",line)
          for (let i = 0; i <= line.length - 1; i++) {
              if (i === 0) {
                let curr = line[i];
                let prev = line[i + 1];
                if (curr > prev)  {
                  if (curr - prev > 3) 
                    continue
                }
                if (curr < prev)  {
                    if (prev - curr > 3)
                      continue
                } 
              }

              if (i > 0 && i < line.length - 1) {
                let curr = line[i];
                let prev = line[i + 1];
                let acc = line[i -1]
                if (curr > prev)  {
                  if (curr - prev > 3) 
                    continue
                }
                if (curr < prev)  {
                    if (prev - curr > 3)
                      continue
                } 

                if (curr > acc)  {
                  if (curr - acc > 3) 
                    continue
                }
                if (curr < acc)  {
                    if (acc - curr > 3)
                      continue
                } 
              }

            if (i === line.length - 1) {
              console.log("aaaaa")
              const curr = line[i];
              const acc = line[i - 1];
              console.log(acc)
              if (curr > acc)  {
                if (curr - acc <= 3) 
                  relatorioSeguro+= 1

              }
              if (curr < acc)  {
                  if (acc - curr <= 3)
                    relatorioSeguro+= 1

              } 
            }
          }
        }
        console.log("relatorios", relatorioSeguro)
    });
}

main();