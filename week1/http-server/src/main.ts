import http from "http";
import {parse} from "url"
import express from "express";


// app.listen(3000, () => {
//     console.log("Server is listening on port 3000")
// });


const app = express()

app.get("/maraz", (req, res) => {
    const name = req.query.name;
    res.send({name: `Hello ${name || "World"}`})
});


// this is middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})



app.post("/maraz", (req, res) => {
    const name = req.body.name;
    res.send({name: `Hello ${name || "World"}`})
});

app.get("/zahremar/:name" , (req, res) => {
    const name = req.params.name;
    res.send({name: `Hello ${name || "World"}`})
})

app.use((req, res) => {
    res.send({message: "Not found"})
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});


// const server = http.createServer((req, res) => {
//     console.log(req.method, req.url);

//     const url = parse(req.url || "", true)
//     if (url.pathname === "/maraz" && req.method?.includes("GET")) {
//         res.appendHeader("content-Type", "application/json")
//         res.end(JSON.stringify({message: `Hello ${url.query.name || "World"}`}));
//         return
//     };
//     if (req.url === "/maraz" && req.method?.includes("POST")) {

//         req.on("data", (data) => {
//             const dataString = data.toString();
//             const dataObject = JSON.parse(dataString);
//             console.log("Data", dataString);
//             console.log("Name", dataObject.name)
//             res.appendHeader("content-Type", "application/json")
//             res.end(JSON.stringify({name: "Hello " + dataObject.name}));
//         })
        
//         return
//     };

//     res.end("Hello World!");
// });

// server.listen(3000, () => {
//     console.log("Server is listening on port 3000")
// })
