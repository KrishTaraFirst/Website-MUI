'use client';

import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';

// @mui
import { keyframes, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from '@mui/material';
import { APP_DEFAULT_PATH, AUTH_USER_KEY } from '@/config';
import { AuthRole } from '@/enum';
import Factory from '@/utils/Factory';

// @project
import { ThemeDirection } from '@/config';
import EmptyAccount from '@/components/header/empty-state/EmptyAccount';
import MainCard from '@/components/MainCard';
import NotificationItem from '@/components/NotificationItem';
import SimpleBar from '@/components/third-party/SimpleBar';
import useCurrentUser from '@/hooks/useCurrentUser';

// @assets
import { IconBell, IconCode, IconChevronDown, IconBuildingEstate, IconUser, IconArrowsExchange } from '@tabler/icons-react';

const swing = keyframes`
  20% {
    transform: rotate(15deg) scale(1);
}
40% {
    transform: rotate(-10deg) scale(1.05);
}
60% {
    transform: rotate(5deg) scale(1.1);
}
80% {
    transform: rotate(-5deg) scale(1.05);
}
100% {
    transform: rotate(0deg) scale(1);
}
`;

/***************************  HEADER - NOTIFICATION  ***************************/

const roles = {
  TaraTeam: AuthRole.SUPER_ADMIN,
  CA: AuthRole.CHARTED_ACCOUNTANT_FIRM,
  Business: AuthRole.CORPORATE_ADMIN,
  ServiceProvider: AuthRole.SERVICE_PROVIDER,
  Individual: AuthRole.INDIVIDUAL
};

export default function AccountSwitcher() {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { userData } = useCurrentUser();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [innerAnchorEl, setInnerAnchorEl] = useState(null);
  const [allRead, setAllRead] = useState(false);
  const [showEmpty, setShowEmpty] = useState(true);
  const [poperOptions, setPoperOptions] = useState([]);

  const open = Boolean(anchorEl);
  const innerOpen = Boolean(innerAnchorEl);
  const id = open ? 'notification-action-popper' : undefined;
  const innerId = innerOpen ? 'notification-inner-popper' : undefined;
  const buttonStyle = { borderRadius: 2, p: 1 };

  const [notifications, setNotifications] = useState([]);
  const [notifications2, setNotifications2] = useState([]);

  const handleActionClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleInnerActionClick = (event, data = []) => {
    setPoperOptions([...data]);
    setInnerAnchorEl(innerAnchorEl ? null : event.currentTarget);
  };

  const handleAccountSelection = async (event, item) => {
    let url = `/user_management/account-switch?user_id=${item.id}`;
    const { res } = await Factory('post', url, {});
    if (res.status_cd === 0) {
      let userDAta = {
        ...userData,
        id: res.data.id,
        email: res.data.email,
        role: roles[res.data.user_type],
        // role: AuthRole.SUPER_ADMIN,
        contact: '123456789',
        dialcode: '+91',
        firstname: res.data.name,
        lastname: '',
        user_groups: res.data.user_groups,
        associated_services: res.data.associated_services,
        mobile: res.data.mobile_number,
        access_token: res.data.access,
        user_role: res.data.user_role,
        user_type: res.data.user_type,
        user_kyc: res.data.user_kyc,
        user_groups: res.data.user_groups,
        associated_services: res.data.associated_services,
        business_exists: res.data.business_exists
      };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userDAta));
      router.push(APP_DEFAULT_PATH);
      window.location.reload();
    } else {
      console.log(res);
    }

    // let localStorageData = typeof window !== 'undefined' ? localStorage.getItem(AUTH_USER_KEY) : null;
    // localStorageData = JSON.parse(localStorageData);
    // let __userData = { ...localStorageData };
    // if (item === 'Surya') {
    //   __userData.role = AuthRole.INDIVIDUAL;
    //   __userData.user_type = AuthRole.INDIVIDUAL;
    // } else if (item === 'Madhu Travels') {
    //   __userData.role = AuthRole.CORPORATE_ADMIN;
    //   __userData.user_type = AuthRole.CORPORATE_ADMIN;
    // }
    // setInnerAnchorEl(innerAnchorEl ? null : event.currentTarget);
    // // localStorage.setItem(AUTH_USER_KEY, JSON.stringify(__userData));
    // router.push(APP_DEFAULT_PATH);
    // window.location.reload();
    // router.refresh();
  };

  // Function to mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) => prevNotifications.map((notification) => ({ ...notification, isSeen: true })));
    setNotifications2((prevNotifications2) => prevNotifications2.map((notification) => ({ ...notification, isSeen: true })));
    setAllRead(true);
  };

  const handleClearAll = () => {
    setNotifications([]);
    setNotifications2([]);
    setShowEmpty(true); // Set empty state to true when cleared
  };

  return (
    <>
      <Tooltip describeChild title="Account Switcher">
        <IconButton
          variant="outlined"
          color="secondary"
          size="small"
          onClick={handleActionClick}
          aria-label="show notifications"
          {...(notifications.length !== 0 && !allRead && { sx: { '& svg': { animation: `${swing} 1s ease infinite` } } })}
        >
          <Badge
            color="error"
            variant="dot"
            invisible={allRead || notifications.length === 0}
            sx={{
              '& .MuiBadge-badge': { height: 6, minWidth: 6, top: 4, right: 4, border: `1px solid ${theme.palette.background.default}` }
            }}
          >
            <IconArrowsExchange size={20} />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popper
        placement="bottom-end"
        id={id}
        open={open}
        anchorEl={anchorEl}
        popperOptions={{
          modifiers: [{ name: 'offset', options: { offset: [downSM ? (theme.direction === ThemeDirection.RTL ? -45 : 45) : 0, 8] } }]
        }}
        transition
      >
        {({ TransitionProps }) => (
          <Fade in={open} {...TransitionProps}>
            <MainCard
              sx={{
                borderRadius: 2,
                boxShadow: theme.customShadows.tooltip,
                width: 1,
                minWidth: { xs: 352, sm: 240 },
                maxWidth: { xs: 352, md: 420 },
                p: 0
              }}
            >
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <Box>
                  <CardHeader
                    sx={{ p: 1 }}
                    title={
                      <Stack direction="row" sx={{ gap: 1, justifyContent: 'space-between' }}>
                        <Button
                          color="secondary"
                          size="small"
                          sx={{ typography: 'subtitle1' }}
                          startIcon={<IconUser size={16} />}
                          endIcon={<IconChevronDown size={16} />}
                          onClick={(e) => {
                            handleInnerActionClick(e, userData.individual_affiliated);
                          }}
                        >
                          Individual
                        </Button>
                      </Stack>
                    }
                  />
                  {!showEmpty ? (
                    <EmptyAccount />
                  ) : (
                    <CardHeader
                      sx={{ p: 1 }}
                      title={
                        <Stack direction="row" sx={{ gap: 1, justifyContent: 'space-between' }}>
                          <Button
                            color="secondary"
                            size="small"
                            sx={{ typography: 'subtitle1' }}
                            startIcon={<IconBuildingEstate size={16} />}
                            endIcon={<IconChevronDown size={16} />}
                            onClick={(e) => {
                              handleInnerActionClick(e, userData.business_affiliated);
                            }}
                          >
                            Business
                          </Button>
                          <Popper
                            placement="bottom-start"
                            id={innerId}
                            open={innerOpen}
                            anchorEl={innerAnchorEl}
                            transition
                            popperOptions={{ modifiers: [{ name: 'preventOverflow', options: { boundary: 'clippingParents' } }] }}
                          >
                            {({ TransitionProps }) => (
                              <Fade in={innerOpen} {...TransitionProps}>
                                <MainCard sx={{ borderRadius: 2, boxShadow: theme.customShadows.tooltip, minWidth: 156, p: 0.5 }}>
                                  <ClickAwayListener onClickAway={() => setInnerAnchorEl(null)}>
                                    <List disablePadding>
                                      {poperOptions.map((item, index) => (
                                        <ListItemButton
                                          key={index}
                                          sx={buttonStyle}
                                          onClick={(e) => {
                                            handleAccountSelection(e, item);
                                          }}
                                        >
                                          <ListItemText>{item.full_name}</ListItemText>
                                        </ListItemButton>
                                      ))}
                                    </List>
                                  </ClickAwayListener>
                                </MainCard>
                              </Fade>
                            )}
                          </Popper>
                        </Stack>
                      }
                    />
                  )}
                  <CardHeader
                    sx={{ p: 1 }}
                    title={
                      <Stack direction="row" sx={{ gap: 1, justifyContent: 'space-between' }}>
                        <Button
                          color="secondary"
                          size="small"
                          sx={{ typography: 'subtitle1' }}
                          startIcon={<IconUser size={16} />}
                          endIcon={<IconChevronDown size={16} />}
                          onClick={(e) => {
                            handleInnerActionClick(e, userData.ca_firm_affiliated);
                          }}
                        >
                          CA Firm
                        </Button>
                      </Stack>
                    }
                  />
                </Box>
              </ClickAwayListener>
            </MainCard>
          </Fade>
        )}
      </Popper>
    </>
  );
}
