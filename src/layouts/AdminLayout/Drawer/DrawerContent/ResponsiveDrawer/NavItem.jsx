import PropTypes from 'prop-types';
import { useEffect } from 'react';

// @next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Factory from '@/utils/Factory';
import { AUTH_USER_KEY } from '@/config';

// @project
import { handlerActiveItem, handlerDrawerOpen, useGetMenuMaster } from '@/states/menu';
import DynamicIcon from '@/components/DynamicIcon';
import useCurrentUser from '@/hooks/useCurrentUser';
// import { BASE_URL } from 'constants';
import { ThemeMode } from '@/config';

/***************************  RESPONSIVE DRAWER - ITEM  ***************************/

export default function NavItem({ item, level = 0 }) {
  const { userData } = useCurrentUser();
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const openItem = menuMaster.openedItem;

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  // Active menu item on page load
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === item.url) handlerActiveItem(item.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const iconcolor =
    openItem === item.id && theme.palette.mode === ThemeMode.DARK ? theme.palette.background.default : theme.palette.text.primary;

  const getNavPermissions = async (id) => {
    let localStorageData = typeof window !== 'undefined' ? localStorage.getItem(AUTH_USER_KEY) : null;
    localStorageData = JSON.parse(localStorageData);
    let url = `/user_management/user-group?user_id=${userData.id}&name=${id}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      localStorageData[id] = res.data.custom_permissions;
    } else {
      console.log(res);
    }
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(localStorageData));
  };

  const itemHandler = () => {
    downMD && handlerDrawerOpen(false);
  };

  return (
    <ListItemButton
      id={`${item.id}-btn`}
      component={Link}
      href={item.url}
      {...(item?.target && { target: '_blank' })}
      selected={openItem === item.id}
      disabled={item.disabled}
      onClick={() => {
        itemHandler();
        getNavPermissions(item.id);
      }}
      sx={{
        color: 'text.primary',
        ...(level === 0 && { my: 0.25, '&.Mui-selected.Mui-focusVisible': { bgcolor: 'primary.light' } }),
        ...(level > 0 && {
          '&.Mui-selected': {
            color: 'primary.main',
            bgcolor: 'transparent',
            ...theme.applyStyles('dark', { color: 'primary.light' }),
            '&:hover': { bgcolor: 'action.hover' },
            '&.Mui-focusVisible': { bgcolor: 'action.focus' },
            '& .MuiTypography-root': { fontWeight: 600 }
          }
        })
      }}
    >
      {level === 0 && (
        <ListItemIcon>
          <DynamicIcon name={item.icon} color={iconcolor} size={18} stroke={1.5} />
        </ListItemIcon>
      )}
      <ListItemText primary={item.title} sx={{ mb: '-1px' }} />
    </ListItemButton>
  );
}

NavItem.propTypes = { item: PropTypes.any, level: PropTypes.number };
