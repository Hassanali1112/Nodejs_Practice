import { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !form.name || !form.email) {
      setMessage("Please fill all fields and upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("file", file);

    try {
      const res = await axios.post(
        "/api/upload",
        formData
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        "Upload failed: " + err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Upload Image with Name & Email</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          className="border-3"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />{" "}
        <br />
        <br />
        <input
          className="border-3"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />{" "}
        <br />
        <br />
        <input
          className="border-3"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />{" "}
        <br />
        <br />
        <button type="submit">Upload</button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
};

export default UploadForm;
