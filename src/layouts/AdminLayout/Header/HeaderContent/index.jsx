// @mui
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import Notification from './Notification';
import AccountSwitcher from './AccountSwitcher';
import Profile from './Profile';
import SearchBar from './SearchBar';
import Breadcrumbs from '@/components/CustomBreadcrumbs';

/***************************  HEADER CONTENT  ***************************/

export default function HeaderContent() {
  return (
    <>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: { xs: 'flex-end', md: 'space-between' }, gap: 2, width: 1 }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Breadcrumbs />
        </Box>
        <Stack direction="row" sx={{ alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
          <SearchBar />
          <AccountSwitcher />
          <Notification />
          <Profile />
        </Stack>
      </Stack>
    </>
  );
}
