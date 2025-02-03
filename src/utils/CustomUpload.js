import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Stack, IconButton } from '@mui/material';
import { IconUpload, IconTrash } from '@tabler/icons-react';

const CustomUpload = ({ title, setData, logoDetails, onDelete }) => {
  const [preview, setPreview] = useState(null);

  // If logoDetails (image URL or File object) exists, use it as a preview
  useEffect(() => {
    if (logoDetails) {
      // Check if logoDetails is a URL or File object
      if (typeof logoDetails === 'string') {
        // If it's a string (image URL), use it directly for preview
        setPreview(logoDetails);
      } else if (logoDetails instanceof File) {
        // If it's a File object, create a preview using FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(logoDetails);
      }
    }
  }, [logoDetails]);

  // Handle the deletion of the image
  const handleDeleteLogo = () => {
    setPreview(null); // Clear the image preview
    setData(null); // Clear the file or URL
    if (onDelete) {
      onDelete(); // Call the onDelete callback if provided
    }
  };

  // Handle file selection and preview
  const handleOnChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setData(file); // Update parent component state with the selected file

      // Create a preview of the image (if it's an image)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Display Existing Image with a Delete Option */}
      {preview ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <img
            src={preview}
            alt="Current Logo"
            style={{
              maxWidth: '60px', // Reduce width
              maxHeight: '60px', // Reduce height
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Delete Icon */}
            <IconButton color="error" onClick={handleDeleteLogo} aria-label="delete">
              <IconTrash size={16} stroke={1.5} />
            </IconButton>
          </Stack>
        </Box>
      ) : (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          No image uploaded yet.
        </Typography>
      )}

      {/* Label to trigger the file input */}
      <label htmlFor="upload-avatar">
        <input
          id="upload-avatar"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleOnChange} // Handle file selection
        />
        <Button component="span" variant="outlined" color="secondary" size="small" startIcon={<IconUpload size={16} stroke={1.5} />}>
          {title}
        </Button>
      </label>

      {/* Optionally show file name if you want */}
      {logoDetails && logoDetails.name && (
        <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
          Uploaded: {logoDetails.name}
        </Typography>
      )}
    </div>
  );
};

export default CustomUpload;
