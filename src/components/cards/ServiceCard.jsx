import PropTypes from 'prop-types';
import NextLink from 'next/link';
// @mui
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

// @project
import GraphicsCard from '@/components/cards/GraphicsCard';
import SvgIcon from '@/components/SvgIcon';

// @types

/***************************  COMMON - ICON CARD  ***************************/

export default function ServiceCard({
  icon,
  title,
  content,
  href,
  iconAvatar,
  contentCard,
  titleProps,
  stackProps,
  contentProps,
  cardPadding
}) {
  const defaultBoxPadding = { xs: 3, sm: 4, md: 5 };
  const boxPadding = cardPadding ? { ...cardPadding } : defaultBoxPadding;

  return (
    <GraphicsCard
      sx={{
        p: boxPadding,
        minHeight: 240, // Ensures consistent height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Ensures spacing consistency
        height: 1,
        ...(contentCard && { bgcolor: typeof contentCard === 'boolean' ? 'grey.200' : contentCard })
      }}
    >
      <Stack sx={{ gap: { xs: 0.5, sm: 1 } }}>
        {title && (
          <Link component={NextLink} underline="hover" variant="h4" href={href} sx={{ '&:hover': { color: 'primary.dark' } }}>
            {title}
          </Link>
        )}
        {content && (
          <Typography {...(contentProps && { ...contentProps })} sx={{ color: 'text.secondary' }}>
            {content}
          </Typography>
        )}
      </Stack>
    </GraphicsCard>
  );
}

ServiceCard.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.any,
  content: PropTypes.any,
  iconAvatar: PropTypes.any,
  contentCard: PropTypes.any,
  titleProps: PropTypes.any,
  stackProps: PropTypes.any,
  contentProps: PropTypes.any,
  cardPadding: PropTypes.any
};
