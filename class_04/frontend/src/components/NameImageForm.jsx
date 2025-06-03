import axios, { Axios } from "axios";
import React, { useState } from "react";

const NameImageForm = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      alert("Please fill in all fields");
      return;
    }
    // Handle form submission logic here
    const formData = new FormData()
    formData.append("name", name);
    formData.append("image", image);

    console.log(formData)
    console.log("Name:", name);
    console.log("Image:", image);

  try {
    const res = await axios.post(
      "http://localhost:3000/upload_files",
      {name, image},
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    console.log(res.data)
    if(!res.data.success){
      console.log(res.data.message)
    } else {
      console.log(res.data.message)
    }
    
  } catch (error) {
    console.log(error);
    
  }

  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Submit Your Info
        </h2>

        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* Image Input */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NameImageForm;
