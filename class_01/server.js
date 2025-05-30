
const http = require("http")
const fs = require("fs")


const path = require("path")
const filePath = path.join(process.cwd(), 'newFile.text')

const server = http.createServer((req, res)=>{
  if(req.url === '/'){
    res.write("hello world");
    res.end();
  } else if(req.url === '/form'){
    res.setHeader('Content-Type', 'text/html')
    res.write('<form action="/submit" method="POST" > <input name="data" type="text" /> <button > Submit</button></form>')
    res.end()

  } else if( req.url === '/submit'){

    let data = ''

    req.on('data', chunks => data += chunks)
    req.on('end', ()=>{
      fs.readFile(filePath, 'utf-8', ( _ , prevData)=>{
        let allData = prevData + '\n' + data
        fs.writeFile(filePath, allData, () => {
          res.write(`data ===> ${allData}`);
          console.log(allData)
          res.end()
        });

        
      })
    })
      



    // ++++++++++++++++++++++++++++++++ add data ++++++++++++++++++++++++
    // let data = '';
    // req.on('data', chunk => data += chunk)
    // req.on('end', ()=>{
    //   fs.writeFile(filePath, data ,()=>{
    //     res.write("data received")
    //     console.log(data)

    //   })
    //   res.end();
    // })
  } else{
    res.write("404 Not found")
    res.end()
  }
})


server.listen(4000)
// const http = require("http");
// const fs = require('fs')

// const path = require('path')

// const dataFilePath = path.join(process.cwd(), 'data.txt')

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("hello world from node");
//     res.end();
//   } else if (req.url === "/form") {
//     res.setHeader("Content-Type", "text/html");
//     res.write(
//       '<form action="/submit" method="POST" > <input name="data" type="text" /> <button>Submit </button>  </form>'
//     );
//     res.end(); 
//   }
//   else if(req.url === "/sbmit"){

//     let data = ''
//     req.on('data', chunk => data +=chunk)
//     req.on('end', ()=>{

//       fs.readFile(dataFilePath,'utf-8',(_, dataFilePath)=>{
//         let updatedData = dataFilePath + '\n' + data
//         fs.writeFile(dataFilePath, updatedData, ()=>{
//           req.write('Data Recived ==> ${')
//         })
//       }) 
//       console.log(data)
//       req.end()
//     })

//   }
// });

// server.listen(3000);
