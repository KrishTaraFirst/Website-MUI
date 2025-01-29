'use client';

import React, { useEffect, useState } from 'react';

// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// @assets
import { IconTrash, IconUpload } from '@tabler/icons-react';

export default function CustomUpload({ title = 'Upload Avatar', setData, logoDetails = '' }) {
  const [avatar, setAvatar] = useState(null); // This will be for new image uploads
  const [preview, setPreview] = useState(''); // This will be the preview of the image

  useEffect(() => {
    if (avatar) {
      setPreview(URL.createObjectURL(avatar)); // Preview the newly uploaded image
    } else if (logoDetails) {
      setPreview(logoDetails); // Use the passed logo URL as the preview if no new image
    } else {
      setPreview(''); // If no logo or avatar, clear the preview
    }
  }, [avatar, logoDetails]); // Update whenever avatar or logoDetails change

  // Handle file selection
  const handleOnChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file); // Set the new uploaded image
      setData(file); // Pass the file to the parent component (OrganizationDetails)
    }
  };

  // Remove the avatar image
  const handleRemoveAvatar = () => {
    setAvatar(null); // Clear avatar
    setData(null); // Clear the data
    setPreview(logoDetails || ''); // If logoDetails is available, keep that preview
  };

  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center', mt: 3 }}>
      {/* Upload Button */}
      <label htmlFor="upload-avatar">
        <input id="upload-avatar" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleOnChange} />
        <Button component="span" variant="outlined" color="secondary" size="small" startIcon={<IconUpload size={16} stroke={1.5} />}>
          {title}
        </Button>
      </label>

      {/* Avatar Preview and File Info */}
      {preview && (
        <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
          <img
            src={preview}
            alt="Avatar Preview"
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }} // Style it as a circle for the logo
          />
          {avatar && (
            <Typography variant="body2" color="textPrimary">
              {avatar.name}
            </Typography>
          )}
        </Stack>
      )}

      {/* Remove Avatar Button */}
      {preview && (
        <Tooltip title="Remove Avatar">
          <IconButton color="error" onClick={handleRemoveAvatar} size="small" aria-label="delete">
            <IconTrash size={16} stroke={1.5} />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
