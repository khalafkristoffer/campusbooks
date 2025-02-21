// src/components/SellSection.jsx
import React, { useState } from "react";
import Button from "./Button";
import "../styles/sell-section.css";
import apiClient from "../api/client"; // Import apiClient
import { useQuery } from "react-query"; // Import useQuery

const SellSection = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null); // State for the image file
  const [previewImage, setPreviewImage] = useState(null); // State for image preview

  // Fetch course codes using React Query
  const { isLoading, error, data: course_code } = useQuery("course_code", async () => {
    const response = await apiClient.get("/course_codes/"); // Replace with your actual endpoint
    return response.data;
  });

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    // Create a preview URL
    if (selectedImage) {
      setPreviewImage(URL.createObjectURL(selectedImage));
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("course_code", course_code);
    formData.append("condition", condition);
    formData.append("location", location);
    formData.append("image", image); // Append the image file

    try {
      const response = await apiClient.post("/books/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      console.log("Book created:", response.data);
      // Reset form fields after successful submission
      setTitle("");
      setPrice("");
      setCourseCode("");
      setCondition("");
      setLocation("");
      setPhoneNumber("");
      setImage(null);
      setPreviewImage(null); // Clear the preview image
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div className="sell-section">
      <h2>Lägg upp din bok</h2>
      <input
        type="text"
        placeholder="Boktitel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Pris"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <select
        className="sell-input"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      >
        <option value="">Kurskod</option>
        {isLoading ? (
          <option disabled>Loading...</option>
        ) : error ? (
          <option disabled>Error: {error.message}</option>
        ) : (
          course_code?.map((course) => (
            <option key={course.code} value={course.code}>
              {course.code}
            </option>
          ))
        )}
      </select>
      <select
        className="sell-input"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      >
        <option value="">Skick</option>
        <option value="Ny">Ny</option>
        <option value="Mycket bra">Mycket bra</option>
        <option value="Bra">Bra</option>
        <option value="Använd">Använd</option>
        <option value="Mycket använd">Mycket använd</option>
      </select>
      <select
        className="sell-input"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">Plats</option>
        <option value="Hubben">Dust 2</option>
        <option value="Biblioteket">Mirage</option>
        <option value="Lindholmen">Cobblestone</option>
        <option value="Chalmers Café">Cache</option>
        <option value="Doesn't matter">Buyer Chooses</option>
      </select>
      <input
        type="text"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} /> {/* File input for image */}
      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          style={{ width: "300px", marginTop: "10px", height : "500px", objectFit: "cover" }}
        />
      )}
      <Button className="button-primary" onClick={handleSubmit}>
        ➕ Lägg till boken
      </Button>
      <div style={{ marginTop: "40px" }}></div>
      <p style={{ fontSize: "0.9rem", margin: "10px 0", textAlign: "center" }}>
        Får du inte sålt din bok? Vi köper den!
      </p>
      <Button className="sell-button">📦 Sälj direkt till oss</Button>
    </div>
  );
};

export default SellSection;
