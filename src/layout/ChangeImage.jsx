import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ChangeImage() {
  const [selectedImage, setSelectedImage] = useState(null);  // State to hold the selected image
  const [imagePreview, setImagePreview] = useState(null);    // State to show image preview
  const [loading, setLoading] = useState(false);  // State to track loading state
  const history = useNavigate();

  // Retrieve token from localStorage (or wherever it's stored)
  const token = localStorage.getItem('Authorization'); // Make sure to use the correct key if it's stored differently

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Set the image preview URL
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    setLoading(true);

    try {
      // Send the image to the backend (replace with your API endpoint)
      await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Add the Authorization header with Bearer token
        },
      });

      alert('Image updated successfully');
      // Optionally redirect or update the state
      history('/profile');  // Redirect after successful upload (update with your path)
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to update image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Change Profile Picture</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Image preview */}
                <div className="text-center mb-4">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="alert alert-warning">No image selected</div>
                  )}
                </div>

                {/* File input */}
                <div className="form-group">
                  <label htmlFor="image" className="form-label">Select New Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="form-group mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading ? 'Uploading...' : 'Update Image'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
