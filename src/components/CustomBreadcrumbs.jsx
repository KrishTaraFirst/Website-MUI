'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// @next
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

// @mui
import { useTheme } from '@mui/material/styles';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

// @project
import { APP_DEFAULT_PATH } from '@/config';
import { generateFocusStyle } from '@/utils/generateFocusStyle';
import { breadcrumbData } from '@/data/breadcrumbData';

// @assets
import { IconChevronRight } from '@tabler/icons-react';

const homeBreadcrumb = { title: 'Home', url: APP_DEFAULT_PATH };

/***************************  BREADCRUMBS  ***************************/

export default function CustomBreadcrumbs({ data }) {
  const theme = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    if (!pathname) return;

    // Define custom mapping rules for URLs
    const customBreadcrumbMap = {
      '/dashboard/user': { title: 'dashboard', url: '/dashboard/user' },
      'dashboard/user/corporate-entities': { title: 'corporate-entities', url: 'dashboard/user/corporate-entities' },
      '/dashboard/user': { title: 'dashboard', url: '/dashboard/user' }
    };

    // Check if the current path matches a custom rule
    const matchedBreadcrumb = customBreadcrumbMap[pathname];
    if (matchedBreadcrumb) {
      // Use the mapped breadcrumb if available
      setBreadcrumbItems([matchedBreadcrumb]);
    } else {
      // Default behavior: split the path and create breadcrumbs
      const pathSegments = pathname.split('/').filter((segment) => segment);
      const breadcrumbData = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        return { title: decodeURIComponent(segment), url: href };
      });

      // Add "Home" as the first breadcrumb
      setBreadcrumbItems([...breadcrumbData]);
    }
  }, [pathname]);

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" separator={<IconChevronRight size={16} />}>
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;
        return (
          <Typography
            {...(item.url && { component: Link, href: item.url })}
            variant="body2"
            sx={{
              p: 0.5,
              color: isLast ? 'grey.700' : 'grey.700',
              textDecoration: 'none',
              cursor: isLast ? 'default' : 'pointer',
              ':hover': !isLast && { color: 'primary.main' },
              ':focus-visible': {
                outline: 'none',
                borderRadius: 0.25,
                ...(!isLast && generateFocusStyle(theme.palette.primary.main))
              }
            }}
            key={index}
          >
            {breadcrumbData[item.title]}
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
}

CustomBreadcrumbs.propTypes = { data: PropTypes.array };
