const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const { json } = require("stream/consumers");

require("dotenv").config()

app.use(express.json())
// app.use(cors())


// initialize multer
const storage = multer.memoryStorage()

const upload = multer(
  {
     limits : {
      fieldSize : 3 * 1024 * 1024,
    },
    fileFilter : (req, file, cb) =>{
      if(file.mimetype.startsWith("image/")){
        cb(null, true)
      } else{
        cb( new Error("Kindly Select an Image file", false))
      }
    },
    storage : storage,
  }
)

// congigure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = (buffer, fileName)=>{
  return new Promise ((res, rej)=>{
    cloudinary.uploader.upload_stream(
      {
      resource_type : "image",
      public_id : `${Date.now()}_${fileName}`,
      folder : 'Posts'
    },
    (error, result) =>{
      if(error) rej(error)
        else res(result)
    }
  ).end(buffer)
  })
}

const getDataFromFile = async () => {
  try {
    const data = await fs.readFile("data.json", "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
    return []
  }
}

const postDatatoFile = async (data)=>{
  try {
    await fs.writeFile("data.json", JSON.stringify(data, null, 2));
    console.log("new data has been added")
  } catch (error) {
    console.log("something went wrong while can't add data", error)
  }
}


app.post("/api/upload_files", upload.single("file"), async (req, res) => {
  const { name, email } = req.body;
  const  file  = req.file
  // console.log('name ', name);
  // console.log("email ", email)
  // console.log("file ", file)
  // console.log(req.body)
  console.log(req.file)
  
console.log(!file);
  if (!name || !email || !file ){
    return res.send(
      {
        message : "all field are required!",
        success : false,
      }
    )
  }
  

  const uploadImage = await uploadImageToCloudinary (req.file.buffer, req.file.originalname)


  const newPostData = {
    name,
    email,
    id: uploadImage.public_id,
    image: uploadImage.secure_url,
  };

  const prevData = await getDataFromFile()

  prevData.push(newPostData)

  await postDatatoFile(prevData)

  res.status(200).json(
    {
      message : "post created successfully",
      success : true,
      post : newPostData,
    }
  )
});

app.listen(process.env.port, ()=>{
  console.log(`server is at port : ${process.env.port}`)
})




// Chat gpt 

// const express = require("express");
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Multer memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // POST API to upload file + data
// app.post("/api/upload", upload.single("file"), async (req, res) => {
//   const { name, email } = req.body;
//   const file = req.file;
//   console.log(name, email, file)

//   // if (!name || !email || !file) {
//   //   return res
//   //     .status(400)
//   //     .json({ success: false, message: "All fields required" });
//   // }

//   // try {
//   //   // Upload to Cloudinary
//   //   const result = await new Promise((resolve, reject) => {
//   //     cloudinary.uploader
//   //       .upload_stream({ 
//   //         resource_type : "image",
//   //         public_id : `${Date.now()}_${name}`
//   //        }, (error, result) => {
//   //         if (error) reject(error);
//   //         else resolve(result);
//   //       })
//   //       .end(file.buffer);
//   //   });

//   //   const newEntry = {
//   //     name,
//   //     email,
//   //     imageUrl: result.secure_url,
//   //     publicId: result.public_id,
//   //   };

//   //   const dataPath = path.join(__dirname, "data.json");
//   //   let prevData = [];

//   //   if (fs.existsSync(dataPath)) {
//   //     const fileData = fs.readFileSync(dataPath, "utf-8");
//   //     prevData = JSON.parse(fileData || "[]");
//   //   }

//   //   prevData.push(newEntry);
//   //   fs.writeFileSync(dataPath, JSON.stringify(prevData, null, 2));

//   //   res
//   //     .status(200)
//   //     .json({
//   //       success: true,
//   //       message: "Uploaded successfully!",
//   //       data: newEntry,
//   //     });
//   // } catch (err) {
//   //   console.error("Upload failed:", err.message);
//   //   res
//   //     .status(500)
//   //     .json({ success: false, message: "Upload failed", error: err.message });
//   // }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
