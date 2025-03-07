import PropTypes from 'prop-types';
// @mui
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

// @project
import NavCollapse from './NavCollapse';
import NavItem from './NavItem';
import useCurrentUser from '@/hooks/useCurrentUser';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Stack } from '@mui/material';
import DynamicIcon from '@/components/DynamicIcon';
import { roles } from '@/enum';
import { useRouter } from 'next/navigation';
import { APP_DEFAULT_PATH, AUTH_USER_KEY } from '@/config';

/***************************  RESPONSIVE DRAWER - GROUP  ***************************/

export default function NavGroup({ item }) {
  const { userData } = useCurrentUser();
  const router = useRouter();

  const renderNavItem = (menuItem) => {
    const userRole = userData?.role;

    // Check if menuItem has roles and whether userRole is allowed
    if (menuItem.roles?.length && userRole && !menuItem.roles.includes(userRole)) {
      return null;
    }

    // Render items based on the type
    switch (menuItem.type) {
      case 'collapse':
        return <NavCollapse key={menuItem.id} item={menuItem} />;
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  };

  const getHome = () => {
    let bool = userData.role === roles[userData.user_type];
    return !bool;
  };

  const returnHome = () => {
    let userDAta = {
      ...userData,
      role: roles[userData.user_type],
      dashboardChange: false
    };
    delete userDAta.businesssDetails;
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userDAta));
    router.push(APP_DEFAULT_PATH);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <List component="div" subheader={<></>} sx={{ '&:not(:first-of-type)': { pt: 1, borderTop: '1px solid', borderColor: 'divider' } }}>
      {getHome() && (
        <ListItemButton
          id={`home-btn`}
          component={Link}
          href="#"
          onClick={returnHome}
          sx={{
            color: 'text.primary'
          }}
        >
          <ListItemIcon>
            <DynamicIcon name={'IconArrowLeft'} size={18} stroke={1.5} />
          </ListItemIcon>
          <ListItemText primary={'Back To Home'} sx={{ mb: '-1px' }} />
        </ListItemButton>
        //       <Typography variant="subtitle2" onClick={returnHome} sx={{ cursor: 'pointer', color: 'grey.700' }}>
        //   Back to Home
        // </Typography>
      )}
      {item.children?.map((menuItem) => renderNavItem(menuItem))}
    </List>
  );
}

NavGroup.propTypes = { item: PropTypes.any };
