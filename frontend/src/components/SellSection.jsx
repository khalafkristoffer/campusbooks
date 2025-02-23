// src/components/SellSection.jsx
import React, { useState } from "react";
import Button from "./Button";
import "../styles/sell-section.css";
import apiClient from "../api/client"; // Import apiClient
import { useQuery } from "@tanstack/react-query"; // Import useQuery

const SellSection = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    courseCode: "",
    condition: "",
    location: "",
    phoneNumber: "",
  });
  const [image, setImage] = useState(null); // State for the image file
  const [previewImage, setPreviewImage] = useState(null); // State for image preview

  // Fetch course codes using React Query
  const { isLoading, error, data: course_code } = useQuery({
    queryKey: ["course_code"],
    queryFn: async () => {
      const response = await apiClient.get("/course_codes/"); // Replace with your actual endpoint
      return response.data;
    },
  });

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      setImage(null);
      setPreviewImage(null);
      return;
    }

    if (!selectedImage.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = null; // Clear the input
      setImage(null);
      setPreviewImage(null);
      return;
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("Image size must be less than 5MB.");
      e.target.value = null; // Clear the input
      setImage(null);
      setPreviewImage(null);
      return;
    }

    setImage(selectedImage);
    // Create a preview URL
    if (selectedImage) {
      setPreviewImage(URL.createObjectURL(selectedImage));
    } else {
      setPreviewImage(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("price", formData.price);
    form.append("course_code", formData.courseCode);
    form.append("condition", formData.condition);
    form.append("location", formData.location);
    form.append("image", image); // Append the image file

    try {
      const response = await apiClient.post("/books/", form, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      console.log("Book created:", response.data);
      // Reset form fields after successful submission
      setFormData({
        title: "",
        price: "",
        courseCode: "",
        condition: "",
        location: "",
        phoneNumber: "",
      });
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
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Pris"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <select
        className="sell-input"
        name="courseCode"
        value={formData.courseCode}
        onChange={handleChange}
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
        name="condition"
        value={formData.condition}
        onChange={handleChange}
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
        name="location"
        value={formData.location}
        onChange={handleChange}
      >
        <option value="">Plats</option>
        <option value="Hubben">Hubben</option>
        <option value="Biblioteket">Biblioteket</option>
        <option value="Lindholmen">Lindholmen</option>
        <option value="Chalmers Café">Chalmers Café</option>
        <option value="Doesn't matter">-</option>
      </select>
      <input
        type="text"
        placeholder="Phone number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
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
