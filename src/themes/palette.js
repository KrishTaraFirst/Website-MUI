// @mui
import { alpha } from '@mui/material/styles';

// @project
import { ThemeMode } from '@/config';

/***************************  DEFAULT - PALETTE  ***************************/

export default function palette(mode) {

  const secondaryMain = '#5A5C78'; // Hosting/secondary/40 - secondary
  const disabled = '#777680'; // Hosting/neutral variant/50 - outline
  const disabledBackground = '#E4E1E6'; // Hosting/neutral/90 - surface container highest

  const textPrimary = '#1A1C1E'; // AI/neutral/10 - on surface
  const textSecondary = '#42474E'; // AI/neutral variant/30 - on surface variant
  const divider = '#C2C7CE'; // AI/neutral variant/80 - outline variant
  const background = '#FFF';

  const textPrimaryDark = '#E2E2E5'; // AI/neutral/90 - on surface
  const textSecondaryDark = '#C2C7CE'; // AI/neutral variant/80 - on surface variant
  const dividerDark = '#42474E'; // AI/neutral variant/30 - outline variant
  const backgroundDark = '#0B0F12'; // AI/neutral/04 - container lowest


  const lightPalette = {
    primary: {
      lighter: '#CCE5FF', // AI/primary/90 - primary container / primary fixed
      light: '#92CCFF', // AI/primary/80 - primary fixed dim
      main: '#006397', // AI/primary/40 - primary
      dark: '#004B73', // AI/primary/30 - on primary fixed variant
      darker: '#001D31' // AI/primary/10 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#D3E4F8', // AI/secondary/90 - secondary container / secondary fixed
      light: '#B7C8DB', // AI/secondary/80 - secondary fixed dim
      main: '#4F6070', // AI/secondary/40 - secondary
      dark: '#384858', // AI/secondary/30 - on secondary fixed variant
      darker: '#0B1D2B' // AI/secondary/10 - on secondary container / on secondary fixed
    },
    error: {
      lighter: '#FFEDEA', // error/90 - error container / error fixed
      light: '#FFDAD6', // error/80 - error fixed dim
      main: '#DE3730', // error/40 - error
      dark: '#BA1A1A', // error/30 - on error fixed variant
      darker: '#690005' // error/10 - on error container / on error fixed
    },
    warning: {
      lighter: '#FFEEE1', // warning/90 - warning container / warning fixed
      light: '#FFDCBE', // warning/80 - warning fixed dim
      main: '#AE6600', // warning/40 - warning
      dark: '#8B5000', // warning/30 - on warning fixed variant
      darker: '#4A2800' // warning/10 - on warning container / on warning fixed
    },
    success: {
      lighter: '#C8FFC0', // success/90 - success container / success fixed
      light: '#B6F2AF', // success/80 - success fixed dim
      main: '#22892F', // success/40 - success
      dark: '#006E1C', // success/30 - on success fixed variant
      darker: '#00390A' // success/10 - on success container / on success fixed
    },
    info: {
      lighter: '#D4F7FF', // info/90 - info container / info fixed
      light: '#A1EFFF', // info/80 - info fixed dim
      main: '#008394', // info/40 - info
      dark: '#006876', // info/30 - on info fixed variant
      darker: '#00363E' // info/10 - on info container / on info fixed
    },
    grey: {
      50: '#F9F9FC', // AI/neutral/98 - surface / surface bright
      100: '#F1F4F9', // AI/neutral/96 - surface container low
      200: '#EBEEF3', // AI/neutral/94 - surface container
      300: '#E6E8EE', // AI/neutral/92 - surface container high
      400: '#E2E2E5', // AI/neutral/90 - surface container highest
      500: '#D7DADF', // AI/neutral/87 - surface dim
      600: divider, // AI/neutral variant/80 - outline variant
      700: '#72787E', // AI/neutral variant/50 - outline
      800: textSecondary, // AI/neutral variant/30 - on surface variant
      900: textPrimary // AI/neutral/10 - on surface
    },
    text: {
      primary: textPrimary, // Hosting/neutral/10 - on surface
      secondary: textSecondary, // Hosting/neutral variant/30 - on surface variant
      disabled: disabled
    },
    divider,
    background: {
      default: background
    },
    action: {
      hover: alpha(secondaryMain, 0.05),
      disabled: alpha(disabled, 0.6),
      disabledBackground: alpha(disabledBackground, 0.9)
    }
  };

  // @dark mode
  const secondaryMainDark = '#C3C4E4'; // Hosting/secondary/80 - secondary
  const disabledDark = '#91909A'; // Hosting/neutral variant/60 - outline
  const disabledBackgroundDark = '#36343B'; // Hosting/neutral/22 - surface container highest

  
  const darkPalette = {
    primary: {
      lighter: '#004B73', // AI/primary/30 - primary container / on primary fixed variant
      light: '#3398DB', // AI/primary/60 - primary fixed dim
      main: '#92CCFF', // AI/primary/80 - primary
      dark: '#CCE5FF ', // AI/primary/90 - on primary container / primary fixed
      darker: '#E7F2FF' // AI/primary/95 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#384858', // AI/secondary/30 - secondary container / on secondary fixed variant
      light: '#8193A4', // AI/secondary/60 - secondary fixed dim
      main: '#B7C8DB', // AI/secondary/80 - secondary
      dark: '#D3E4F8', // AI/secondary/90 - on secondary container / secondary fixed
      darker: '#E7F2FF' // AI/secondary/95   - on secondary container / on secondary fixed
    },
    error: {
      lighter: '#BA1A1A', // error/30 - error container / on error fixed variant
      light: '#FF897D', // error/60 - error fixed dim
      main: '#FFDAD6', // error/80 - error
      dark: '#FFEDEA', // error/90 - on error container / error fixed
      darker: '#FFF8F7' // error/95   - on error container / on error fixed
    },
    warning: {
      lighter: '#8B5000', // warning/30 - warning container / on warning fixed variant
      light: '#F79300', // warning/60 - warning fixed dim
      main: '#FFDCBE', // warning/80 - warning
      dark: '#FFEEE1', // warning/90 - on warning container / warning fixed
      darker: '#FFF8F5' // warning/95   - on warning container / on warning fixed
    },
    success: {
      lighter: '#006E1C', // success/30 - success container / on success fixed variant
      light: '#5DC05E', // success/60 - success fixed dim
      main: '#B6F2AF', // success/80 - success
      dark: '#C8FFC0', // success/90 - on success container / success fixed
      darker: '#ECFFE4' // success/95   - on success container / on success fixed
    },
    info: {
      lighter: '#006876', // info/30 - info container / on info fixed variant
      light: '#00BCD4', // info/60 - info fixed dim
      main: '#A1EFFF', // info/80 - info
      dark: '#D4F7FF', // info/90 - on info container / info fixed
      darker: '#EEFCFF' // info/95   - on info container / on info fixed
    },
    grey: {
      50: '#101418', // AI/neutral/06 - surface / surface dim
      100: '#1A1C1E', // AI/neutral/10 - surface container low
      200: '#1C2024', // AI/neutral/12 - surface container
      300: '#272A2E', // AI/neutral/17 - surface container high
      400: '#313539', // AI/neutral/22 - surface container highest
      500: backgroundDark, // AI/neutral/04 - surface container lowest
      600: dividerDark, // AI/neutral variant/30 - outline variant
      700: '#8C9198', // AI/neutral variant/60 - outline
      800: textSecondaryDark, // AI/neutral variant/80 - on surface variant
      900: textPrimaryDark // AI/neutral/90 - on surface
    },
    text: {
      primary: textPrimaryDark, // Hosting/neutral/90 - on surface
      secondary: textSecondaryDark, // Hosting/neutral variant/80 - on surface variant
      disabled: disabledDark // Hosting/neutral variant/60 - outline
    },
    divider: dividerDark,
    background: {
      default: backgroundDark,
      paper: backgroundDark
    },
    action: {
      hover: alpha(secondaryMainDark, 0.05),
      disabled: alpha(disabledDark, 0.6),
      disabledBackground: alpha(disabledBackgroundDark, 0.9)
    }
  };

  return {
    mode,
    ...(mode === ThemeMode.DARK ? darkPalette : lightPalette)
  };
}
