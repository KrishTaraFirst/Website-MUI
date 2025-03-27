'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
// @project
import SvgIcon from '@/components/SvgIcon';

/***************************  MEGA MENU - 5  ***************************/

export default function MegaMenu6({ menuItems, bannerData, popperWidth = 750 }) {
  const theme = useTheme();
  let gridItem = menuItems.length === 1 ? 12 : 6;

  return (
    <Grid size={{ xs: 12, sm: 8 }}>
      <Grid container spacing={1}>
        {menuItems.map((items, index) => (
          <Grid size={{ xs: 12, sm: menuItems.length > 2 ? 4 : gridItem }}>
            <Grow key={index} in={true} timeout={index === 1 ? 1000 : 700}>
              <List
                component="nav"
                sx={{
                  p: 1,
                  width: '100%',
                  maxWidth: { xs: 1, md: popperWidth },
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {items?.itemsList &&
                  items?.itemsList.map((item, index) => (
                    // @ts-ignore
                    <ListItemButton
                      key={index}
                      {...(item && item?.link && item?.link !== undefined && { ...item.link })}
                      sx={{
                        py: 0.5,
                        px: 1.25,
                        my: 0.25,
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'grey.50' },
                        '&:focus-visible': { bgcolor: 'grey.200' }
                      }}
                      TouchRippleProps={{
                        style: {
                          color: alpha(theme.palette.primary.main, 0.3)
                        }
                      }}
                    >
                      <ListItemText
                        primary={item.title}
                        secondary={item.content}
                        primaryTypographyProps={{
                          variant: 'body1',
                          sx: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', mr: 0.5, color: 'text.secondary' }
                        }}
                      />
                      <SvgIcon name="tabler-arrow-up-right" size={16} stroke={2} color={theme.palette.grey[800]} />
                    </ListItemButton>
                  ))}
              </List>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

MegaMenu6.propTypes = { menuItems: PropTypes.array, bannerData: PropTypes.node, popperWidth: PropTypes.number };
