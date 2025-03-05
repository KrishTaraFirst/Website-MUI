'use client';
import PropTypes from 'prop-types';

// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useSnackbar } from '@/components/CustomSnackbar';
import { BASE_URL } from 'constants';
import axios from '@/utils/axios';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import GraphicsCard from '@/components/cards/GraphicsCard';
// import ContactUsForm2 from '@/components/contact-us/ContactUsForm2';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset2';
import { SECTION_COMMON_PY } from '@/utils/constant';

// @types

import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';

// @third-party
import { useForm, Controller } from 'react-hook-form';

// @project

import countries from '@/data/countries';
import { emailSchema, firstNameSchema, phoneSchema } from '@/utils/validationSchema';

/***************************  CONTACT US - CARD  ***************************/

function ContactCard({ icon, title, content, link }) {
  return (
    <GraphicsCard sx={{ height: 1 }}>
      <Stack direction={{ xs: 'row', sm: 'column' }} sx={{ gap: { xs: 2, sm: 4, md: 5 }, height: 1, p: { xs: 2, sm: 3, md: 4 } }}>
        <Avatar sx={{ width: 60, height: 60, bgcolor: 'grey.300' }}>
          <SvgIcon {...(typeof icon === 'string' ? { name: icon } : { ...icon })} />
        </Avatar>
        <Stack sx={{ gap: { xs: 2, md: 3 }, height: 1, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Typeset
            {...{
              heading: title,
              caption: content,
              stackProps: { sx: { gap: 1 } },
              headingProps: { variant: 'h4' },
              captionProps: { variant: 'body1' }
            }}
          />
          {link && (
            <ButtonAnimationWrapper>
              <Button color="primary" variant="outlined" {...link} />
            </ButtonAnimationWrapper>
          )}
        </Stack>
      </Stack>
    </GraphicsCard>
  );
}

/***************************  CONTACT US - 4  ***************************/

export default function ContactUs1({ heading, caption, list, showForm = true }) {
  const sectionPadding = { xs: 2, sm: 3, md: 5 };
  const cardRadius = { xs: 6, sm: 8 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Grid container spacing={1.5}>
          {showForm && (
            <Grid size={12}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.4
                }}
                style={{ height: '100%' }}
              >
                <GraphicsCard sx={{ height: 1, borderRadius: cardRadius }}>
                  <GraphicsCard sx={{ bgcolor: 'grey.200', borderRadius: cardRadius }}>
                    <Box sx={{ p: { xs: 2, sm: 4, md: 5 } }}>
                      {heading && (
                        <Typeset
                          {...{
                            heading,
                            caption,
                            stackProps: { sx: { alignItems: 'center', textAlign: 'center' } },
                            headingProps: { sx: { maxWidth: { xs: '85%', sm: '80%' } } },
                            captionProps: { sx: { maxWidth: { sm: '60%' } } }
                          }}
                        />
                      )}
                    </Box>
                  </GraphicsCard>
                  <Box sx={{ p: sectionPadding, px: { md: 24 } }}>
                    <ContactUsForm2 />
                  </Box>
                </GraphicsCard>
              </motion.div>
            </Grid>
          )}
          {list?.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: item.animationDelay
                }}
                style={{ height: '100%' }}
              >
                <ContactCard {...{ ...item }} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

ContactCard.propTypes = { icon: PropTypes.any, title: PropTypes.any, content: PropTypes.any, link: PropTypes.any };

ContactUs1.propTypes = { heading: PropTypes.any, caption: PropTypes.any, list: PropTypes.any, showForm: PropTypes.bool };

function FieldLabel({ name }) {
  return (
    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
      {name}
    </Typography>
  );
}

/***************************  FORM - ERROR MESSAGE  ***************************/

function ErrorMessage({ message }) {
  return (
    <Typography variant="caption" sx={{ color: 'error.main' }}>
      {message}
    </Typography>
  );
}

/***************************  CONTACT US - FORM 2  ***************************/

function ContactUsForm2() {
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const today = new Date().toISOString().split('T')[0];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'dialcode-popper' : undefined;

  // Initialize the form with default values and error handling
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
    setValue
  } = useForm({ defaultValues: { dialcode: '+91' } });

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const url = `/user_management/consultation`;
      const payload = { ...data, name: data.firstName, mobile_number: data.phone };
      const res = await axios.post(BASE_URL + url, payload);
      if (res.status === 201) {
        showSnackbar('Consultation Booked our team meember will call you!', 'success');
        reset();
      }
      reset();
    } catch (error) {
      showSnackbar(JSON.stringify(error), 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Grid container spacing={2.5} sx={{ justifyContent: 'space-between' }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Date" />
              <OutlinedInput
                {...register('date')}
                placeholder="Date"
                slotProps={{ input: { 'aria-label': 'Date', min: today } }}
                fullWidth
                type="date"
                inputProps={{ min: today }} // Restrict past dates
                error={errors.date && Boolean(errors.date)}
              />
              {errors.date?.message && <ErrorMessage message={errors.date?.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Time" />
              <OutlinedInput
                {...register('time')}
                placeholder="Time"
                type="time"
                slotProps={{ input: { 'aria-label': 'Time' } }}
                fullWidth
                notched
                error={errors.time && Boolean(errors.time)}
              />
              {errors.time?.message && <ErrorMessage message={errors.time?.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Name" />
              <OutlinedInput
                {...register('firstName', firstNameSchema)}
                placeholder="Name"
                slotProps={{ input: { 'aria-label': 'First name' } }}
                fullWidth
                error={errors.firstName && Boolean(errors.firstName)}
              />
              {errors.firstName?.message && <ErrorMessage message={errors.firstName?.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Email" />
              <OutlinedInput
                {...register('email', emailSchema)}
                placeholder="example@gmail.com"
                slotProps={{ input: { 'aria-label': 'Email Address' } }}
                fullWidth
                error={errors.email && Boolean(errors.email)}
              />
              {errors.email?.message && <ErrorMessage message={errors.email?.message} />}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Phone number" />
              <Controller
                control={control}
                name="phone"
                rules={phoneSchema}
                render={({ field: { onChange } }) => (
                  <OutlinedInput
                    placeholder="Phone number"
                    slotProps={{ input: { 'aria-label': 'Phone number' } }}
                    fullWidth
                    error={errors.phone && Boolean(errors.phone)}
                    onChange={onChange}
                    startAdornment={
                      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', pr: 1.5 }}>
                        <Button
                          endIcon={<SvgIcon name="tabler-chevron-down" size={16} color="text.primary" stroke={2} />}
                          sx={{
                            p: { xs: 0.25 },
                            borderRadius: 2,
                            color: 'text.primary',
                            '&:hover': { bgcolor: 'transparent' },
                            '&:before': { display: 'none' },
                            '& .MuiInputBase-input:focus': { bgcolor: 'transparent' },
                            width: 'max-content',
                            fontSize: 16
                          }}
                          disableRipple
                          aria-describedby={id}
                          type="button"
                          onClick={handleClick}
                        >
                          {watch('dialcode')}
                        </Button>
                        <Popper
                          placement="bottom-start"
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          transition
                          popperOptions={{
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [-16, 2]
                                }
                              }
                            ]
                          }}
                        >
                          {({ TransitionProps }) => (
                            <Fade in={open} {...TransitionProps}>
                              <Card elevation={0} sx={{ border: '1px solid', borderColor: theme.palette.divider, borderRadius: 4 }}>
                                <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                                  <Box sx={{ p: 1, pr: 0.5 }}>
                                    <List disablePadding>
                                      <Box sx={{ overflow: 'auto', maxHeight: 320, width: { xs: 296, sm: 320 } }}>
                                        {countries.map((country, index) => (
                                          <ListItemButton
                                            key={index}
                                            sx={{ borderRadius: 4, mb: 0.5 }}
                                            selected={country.dialCode === watch('dialcode')}
                                            onClick={() => {
                                              setValue('dialcode', country.dialCode);
                                              setAnchorEl(null);
                                            }}
                                          >
                                            <ListItemAvatar sx={{ minWidth: 32 }}>
                                              <CardMedia
                                                image={`https://flagcdn.com/w20/${country.countyCode.toLowerCase()}.png`}
                                                component="img"
                                                sx={{ height: 'fit-content', width: 21 }}
                                                loading="lazy"
                                              />
                                            </ListItemAvatar>
                                            <ListItemText primary={`${country.name} (${country.dialCode})`} />
                                          </ListItemButton>
                                        ))}
                                      </Box>
                                    </List>
                                  </Box>
                                </ClickAwayListener>
                              </Card>
                            </Fade>
                          )}
                        </Popper>
                        <Divider orientation="vertical" flexItem sx={{ height: 24, my: 'auto' }} />
                      </Stack>
                    }
                  />
                )}
              />
              {errors.phone?.message && <ErrorMessage message={errors.phone?.message} />}
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name="Message" />
              <OutlinedInput
                {...register('message', { required: 'Message is required' })}
                multiline
                rows={4}
                placeholder="Please type your message here.."
                fullWidth
                error={errors.message && Boolean(errors.message)}
                slotProps={{ input: { 'aria-label': 'Message' } }}
              />
              {errors.message?.message && <ErrorMessage message={errors.message?.message} />}
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center' }}>
          <ButtonAnimationWrapper>
            <Button type="submit" color="primary" size="large" variant="contained">
              Book Slot
            </Button>
          </ButtonAnimationWrapper>
        </Box>
      </Stack>
    </form>
  );
}

FieldLabel.propTypes = { name: PropTypes.string };

ErrorMessage.propTypes = { message: PropTypes.string };
