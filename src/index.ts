#!/usr/bin/env node
import http from "http";
import { app } from "./server.js";

// const server = http.createServer((req, res) => {
//     if (req.method === 'GET' && req.url === '/') {
//         res.statusCode = 200;
//         process.stdout.write("Hello World console2");
//         res.end("Hello World");
//     }
// });

// server.listen(3001, () => {
//     console.log('Server running at http://localhost:3001/');
// });

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001/");
});
