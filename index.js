const http = require("http");
const fs = require("fs/promises");


const HOST = 'localhost';
const PORT = 8080;


// data = fs.readFile('./data.json', 'utf8', (err, read_data) => {

//     if (err) {
//         console.log(`error reading the json file ${err}`);
//     }
//     else {
//         const returndata = JSON.parse(read_data);
//         return returndata;
//     }
// })


// console.log(data)

const requestListener = function (req, res){
    res.setHeader("Content-Type", "application/json");
    switch (req.url){
        case "/api/food":
            fs.readFile('data.json').then((data)=>{
                res.writeHead(200);
                res.end(data);
            }).catch((err)=>{
                res.writeHead(501);
                res.end(JSON.stringify({
                    error: "error reading json file"
                }));
            })
            break
        default:
            res.writeHead(404);
            res.end(JSON.stringify({
                error: "Resource not found"
                }
            )
            );
            break
    }
};

const server = http.createServer(requestListener) 


server.listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`)
})