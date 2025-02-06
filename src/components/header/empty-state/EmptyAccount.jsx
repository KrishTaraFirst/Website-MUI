// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @images
import { MeditatingDoodle } from '@/images/illustration';

/***************************  HEADER - EMPTY NOTIFICATION ***************************/

export default function EmptyAccount() {
  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: 236, textAlign: 'center', gap: 1, p: 2 }}>
      <MeditatingDoodle />
      <Typography variant="h6" sx={{ fontWeight: 400, maxWidth: 232 }}>
        You&apos;re not associated with any other users.
      </Typography>
    </Stack>
  );
}
