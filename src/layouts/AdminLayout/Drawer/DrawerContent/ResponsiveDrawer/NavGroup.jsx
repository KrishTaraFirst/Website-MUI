import PropTypes from 'prop-types';
// @mui
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

// @project
import NavCollapse from './NavCollapse';
import NavItem from './NavItem';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Stack } from '@mui/material';
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
      role: roles[userData.user_type]
    };
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userDAta));
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userDAta));
    router.push(APP_DEFAULT_PATH);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <List
      component="div"
      subheader={
        <Stack direction={'row'} sx={{ justifyContent: 'space-between', mb: 0.75 }}>
          <Typography variant="caption" sx={{ color: 'grey.700' }}>
            {item.title}
          </Typography>
          {getHome() && (
            <Typography variant="caption" onClick={returnHome} sx={{ cursor: 'pointer', color: 'grey.700' }}>
              Back to Home
            </Typography>
          )}
        </Stack>
      }
      sx={{ '&:not(:first-of-type)': { pt: 1, borderTop: '1px solid', borderColor: 'divider' } }}
    >
      {item.children?.map((menuItem) => renderNavItem(menuItem))}
    </List>
  );
}

NavGroup.propTypes = { item: PropTypes.any };
