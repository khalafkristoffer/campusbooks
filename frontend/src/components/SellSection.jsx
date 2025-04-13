// src/components/SellSection.jsx
import React, { useState } from "react";
import Button from "./Button";
import "../styles/sell-section.css";
import apiClient from "../api/client"; // Import apiClient
import { useQuery } from "@tanstack/react-query"; // Import useQuery

const SellSection = () => {
  // State remains the same
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    courseCode: "",
    description: "",
    condition: "",
    phone_number: "",
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch course codes using React Query
  const { isLoading, error, data: course_code } = useQuery({
    queryKey: ["course_code"],
    queryFn: async () => {
      const response = await apiClient.get("/course_codes/");
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
      e.target.value = null;
      setImage(null);
      setPreviewImage(null);
      return;
    }

    if (selectedImage.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      e.target.value = null;
      setImage(null);
      setPreviewImage(null);
      return;
    }

    setImage(selectedImage);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      if (image) {
        formDataToSend.append("image", image);
      }
      formDataToSend.append("title", formData.title);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("course_code", formData.courseCode);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("condition", formData.condition);
      // Location field removed from form submission

      const response = await apiClient.post("/books/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Book created:", response.data);
      // Reset form and show success message
      alert("Book successfully added!");
      setFormData({
        title: "",
        author: "",
        price: "",
        courseCode: "",
        description: "",
        condition: "",
      });
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="sell-section">
      <h2>Lägg upp din bok</h2>
      <input
        className="sell-input"
        type="text"
        placeholder="Boktitel"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        className="sell-input"
        type="text"
        placeholder="Författare"
        name="author"
        value={formData.author}
        onChange={handleChange}
      />
      <input
        className="sell-input"
        type="number"
        placeholder="Pris"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <textarea
        className="sell-description"
        placeholder="Beskrivning"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
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

      {/* File input and preview section */}
      <div className="file-input-container">
        {!image ? (
          <>
            <label htmlFor="book-image-upload" className="custom-file-upload">
              <i className="fa fa-cloud-upload"></i> Ladda upp bild
            </label>
            <input
              id="book-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </>
        ) : (
          <div className="file-selected">
            <span>{image.name}</span>
            <button
              type="button"
              className="change-image-btn"
              onClick={() => {
                setImage(null);
                setPreviewImage(null);
              }}
            >
              Ta bort bild
            </button>
          </div>
        )}
      </div>

      {/* Image preview */}
      {previewImage && (
        <div className="image-preview-container">
          <img
            src={previewImage}
            alt="Book preview"
            className="preview-image"
          />
        </div>
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
