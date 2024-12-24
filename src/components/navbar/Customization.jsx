// @mui
import { useTheme } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Switch from '@mui/material/Switch';

// @project
import MenuPopper from './MenuPopper';
import SvgIcon from '@/components/SvgIcon';
import { ThemeDirection, ThemeMode } from '@/config';
import useConfig from '@/hooks/useConfig';

/***************************  NAVBAR - CUSTOMIZATION  ***************************/

export default function Customization() {
  const theme = useTheme();
  const { onChangeThemeMode, onChangeThemeDirection } = useConfig();

  return (
    <MenuPopper
      offset={10}
      offsetX={15}
      toggleProps={{
        children: <SvgIcon name="tabler-settings" color="primary.main" size={18} />,
        color: 'primary',
        variant: 'outlined',
        'aria-label': 'settings',
        sx: { minWidth: 40, width: 40, height: 40, p: 0 }
      }}
      popperWidth={234}
    >
      <List sx={{ p: 1.5 }}>
        <ListItem sx={{ px: 1 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <SvgIcon name="tabler-sun-moon" color="text.primary" stroke={1} />
          </ListItemIcon>
          <ListItemText color="grey.100">DARK</ListItemText>
          <Switch
            inputProps={{ 'aria-label': 'dark-mode' }}
            checked={theme.palette.mode === ThemeMode.DARK}
            onChange={() => onChangeThemeMode(theme.palette.mode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)}
          />
        </ListItem>
        <ListItem sx={{ px: 1 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <SvgIcon name="tabler-text-direction-ltr" color="text.primary" stroke={1} />
          </ListItemIcon>
          <ListItemText color="grey.100">RTL</ListItemText>
          <Switch
            inputProps={{ 'aria-label': 'direction-ltr' }}
            checked={theme.direction === ThemeDirection.RTL}
            onChange={() => onChangeThemeDirection(theme.direction === ThemeDirection.RTL ? ThemeDirection.LTR : ThemeDirection.RTL)}
          />
        </ListItem>
      </List>
    </MenuPopper>
  );
}
