'use client';

import React, { useState } from 'react';

// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// @third-party
import { useDropzone } from 'react-dropzone';

// @assets
import { IconTrash, IconUpload } from '@tabler/icons-react';

export default function CustomUpload({ title, setLogoDetails }) {
  const [avatar, setAvatar] = useState(null); // default avatar

  // Handle file drop or file selection
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Grab the first file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an object with the required properties
        const fileDetails = {
          url: reader.result, // The base64 encoded file
          name: file.name, // The file name
          size: file.size / (1024 * 1024) // File size in MB
        };

        setAvatar(fileDetails); // Set the avatar state with the file details
        setLogoDetails(fileDetails);
      };
      reader.readAsDataURL(file); // Convert file to data URL for the avatar
    }
  };

  // Set up react-dropzone for drag-and-drop or file input
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Only accept image files
    multiple: false // Allow single file selection
  });

  // Remove the avatar image
  const handleRemoveAvatar = () => {
    setAvatar(null); // Reset to default avatar
    setLogoDetails(null);
  };

  return (
    <>
      <Stack direction="row" sx={{ gap: 2, justifyContent: 'space-between', mt: 3 }}>
        {/* Avatar Preview */}
        {/* <ListItemAvatar>
          <Avatar
            src={avatar ? avatar.url : undefined} // Display the uploaded image as the avatar
            alt="Uploaded Image"
            sx={{ width: 80, height: 80 }}
          />
        </ListItemAvatar> */}

        {/* Upload Button */}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Button variant="outlined" color="secondary" size="small" startIcon={<IconUpload size={16} stroke={1.5} />}>
            {title || 'Upload Avatar'}
          </Button>
        </div>

        {/* File Info */}
        {avatar && (
          <Stack direction="column" sx={{ alignItems: 'flex-start' }}>
            <Typography variant="body2" color="textPrimary">
              {avatar.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {avatar.size.toFixed(2)} MB
            </Typography>
          </Stack>
        )}

        {/* Remove Avatar Button */}
        {avatar && (
          <Tooltip title="Remove Avatar">
            <IconButton color="error" onClick={handleRemoveAvatar} size="small" aria-label="delete">
              <IconTrash size={16} stroke={1.5} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </>
  );
}
