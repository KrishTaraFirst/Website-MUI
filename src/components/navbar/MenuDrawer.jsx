'use client';
import PropTypes from 'prop-types';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Slide from '@mui/material/Slide';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import { SECTION_COMMON_PY } from '@/utils/constant';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
// @project
import SvgIcon from '@/components/SvgIcon';

/***************************  MENU - POPPER  ***************************/

export default function MenuDrawer({
  toggleProps,
  defaultOpen = false,
  children,
  border = true,
  popperWidth = 368,
  offset = 0,
  offsetX = 0,
  menuTextColor
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const theme = useTheme();
  const upMD = useMediaQuery(theme.breakpoints.up('md'));
  const upXL = useMediaQuery(theme.breakpoints.up('xl'));
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const isDesktop = (upMD || upXL) && !downMD;

  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    defaultOpen && setAnchorEl(anchorRef.current);
  }, [defaultOpen]);

  const open = Boolean(anchorEl);
  const id = open ? 'menu-popper' : undefined;

  return (
    <>
      <Button
        ref={anchorRef}
        aria-describedby={id}
        onClick={handleClick}
        size="small"
        {...toggleProps}
        sx={{ ...toggleProps.sx, ...(toggleProps.endIcon && { pr: 4 }), ...(open && { color: 'primary.main', fontWeight: 600 }) }}
        {...(toggleProps.endIcon && {
          position: 'relative',
          endIcon: (
            <Box
              sx={{
                position: 'absolute',
                top: '56%',
                transform: 'translateY(-70%)',
                transition: `transform 0.15s`,
                ...(open && { transform: 'translateY(-74%) rotate(-180deg)' })
              }}
            >
              {typeof toggleProps.endIcon === 'boolean' ? (
                <SvgIcon
                  name="tabler-chevron-down"
                  size={16}
                  color={open ? 'primary.main' : menuTextColor || 'text.primary'}
                  stroke={2.5}
                />
              ) : (
                toggleProps.endIcon
              )}
            </Box>
          )
        })}
      />
      <Popper
        placement="bottom"
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ width: { xs: 1, md: 'auto' }, zIndex: 1201 }}
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [offsetX, offset] } }] }}
      >
        {({ TransitionProps }) => (
          <Slide in={open} {...TransitionProps} timeout={280}>
            <Card
              sx={{
                borderRadius: 0,
                boxShadow: `0px 16px 10px 0px ${alpha(theme.palette.grey[900], 0.06)}`,
                width: '100vw',
                py: SECTION_COMMON_PY,
                // px: SECTION_COMMON_PY,
                bgcolor: isHomePage ? '#FFF' : '#F1F4F9'
              }}
            >
              <Container {...(isDesktop && { maxWidth: upXL ? 'xl' : 'lg' })} sx={{ ...(downMD && { px: { xs: 2, sm: 4, md: 0 } }) }}>
                <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                  <Box>{children}</Box>
                </ClickAwayListener>
              </Container>
            </Card>
          </Slide>
        )}
      </Popper>
    </>
  );
}

MenuDrawer.propTypes = {
  toggleProps: PropTypes.any,
  defaultOpen: PropTypes.bool,
  children: PropTypes.node,
  border: PropTypes.bool,
  popperWidth: PropTypes.number,
  offset: PropTypes.number,
  offsetX: PropTypes.number,
  menuTextColor: PropTypes.string
};
