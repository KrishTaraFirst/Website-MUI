'use client';
import PropTypes from 'prop-types';

// @next
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// @project
import PageLoader from '@/components/PageLoader';
import useCurrentUser from '@/hooks/useCurrentUser';
import menuItems from '@/menu';

/***************************  ROLE GUARD  ***************************/

const restrictedRoutes = {
  'service-provider': [
    '/dashboard/user/corporate-entities',
    '/dashboard/user/indivial',
    '/dashboard/user/ca-firms',
    '/dashboard/user/service-providers'
  ],
  'corporate-admin': [
    '/dashboard/user/corporate-entities',
    '/dashboard/user/indivial',
    '/dashboard/user/ca-firms',
    '/dashboard/user/service-providers'
  ],
  'charted-accountant-firm': [
    // '/dashboard/user/corporate-entities',
    // '/dashboard/user/indivial',
    '/dashboard/user/ca-firms'
    // '/dashboard/user/service-providers'
  ],
  individual: [
    // '/dashboard/user/corporate-entities',
    '/dashboard/user/indivial',
    '/dashboard/user/ca-firms',
    '/dashboard/user/service-providers'
  ],
  'super-admin': []
};

export default function RoleGuard({ children, sx }) {
  const pathname = usePathname();

  const [activeItem, setActiveItem] = useState();

  const { isProcessing, userData } = useCurrentUser();
  const currentRole = userData?.role;

  useEffect(() => {
    const findMenuItem = async () => {
      const matchedItem = await findMenu();
      setActiveItem(matchedItem);
    };
    findMenuItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const findMenu = () => {
    return new Promise((resolve) => {
      for (const menu of menuItems?.items) {
        if (menu.type === 'group') {
          const matchedParents = findParentElements(menu.children || [], pathname);
          if (matchedParents) {
            resolve(matchedParents[0]); // Get the first matched parent item
            return;
          }
        }
      }
      resolve(undefined);
    });
  };

  const findParentElements = (navItems, targetUrl, parents = []) => {
    for (const item of navItems) {
      const newParents = [...parents, item];

      if (item.url === targetUrl) {
        return newParents;
      }

      if (item.children) {
        const result = findParentElements(item.children, targetUrl, newParents);
        if (result) {
          return result;
        }
      }
    }

    return null;
  };

  const getRoleGuard = () => {
    let __currentRole = typeof currentRole === 'undefined' ? 'individual' : currentRole === null ? 'individual' : currentRole;
    let __permission = activeItem?.roles?.length && __currentRole && !activeItem.roles.includes(__currentRole);
    if (__permission) return __permission;
    else if (restrictedRoutes[__currentRole].includes(pathname)) return true;
    else return false;
  };

  if (isProcessing) return <PageLoader />;

  if (getRoleGuard()) {
    return (
      <Container sx={{ textAlign: 'center', ...sx }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Permission Denied
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>You do not have permission to access this page.</Typography>
      </Container>
    );
  }

  return <>{children}</>;
}

RoleGuard.propTypes = { children: PropTypes.node, sx: PropTypes.object };
