'use client';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Autocomplete, TextField, ListItem } from '@mui/material';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import FaqDetails from '@/components/faq/FaqDetails';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset2';

import useFocusWithin from '@/hooks/useFocusWithin';
import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import { SECTION_COMMON_PY } from '@/utils/constant';
import { alpha, useTheme } from '@mui/material/styles';

/***************************  FAQ - 6  ***************************/
const options = [
  'All',
  'MSME Registration',
  'Startup India Registration',
  'Import Export Code (IEC)',
  'Trade License',
  'Trademark Registration',
  'Labour License',
  'Food License (FSSAI Registration)',
  'Employee Provident Fund (EPF)',
  'Employee State Insurance (ESI)',
  'Professional Tax',
  'PAN & TAN Registration',
  'RERA Registration',
  'Digital Signature Certificate (DSC)',
  'Private Limited Company',
  'Limited Liability Partnership (LLP)',
  'One Person Company (OPC)',
  'Public Limited Company',
  'Trusts',
  'Societies',
  'Section 8 (Non-Profit) Companies',
  'Partnership Firm',
  'Proprietorship (Sole Proprietor)',
  'Foreign Company',
  'Producer Company',
  'Nidhi Company',
  'GST Registration',
  'Amendment of GST Registration',
  'GST Cancellation',
  'GST Revocation of Cancellation',
  'GST Registration for Non-Resident Taxpayers',
  'GST Registration for E-commerce Operators',
  'GST Registration for ISD',
  'Financial Modelling',
  'Valuation',
  'Due Diligence',
  'Franchise Advisory',
  'Financial Planning and Analysis',
  'Working Capital Management',
  'Fundraising and Investment Advisory',
  'Internal Audit',
  'Tax Litigation and Advisory',
  'Management Consultancy',
  'Business Insurance Advisory',
  'Strategic Financial Planning',
  'Cash Flow Management',
  'Budgeting and Forecasting',
  'Financial Reporting and Analysis',
  'Risk Management and Compliance',
  'Investment and Capital Management',
  'Improving ROI Using Automation',
  'Invoicing',
  'Bank Account Integration',
  'Automated Bank Reconciliation',
  'Bank Statement Import',
  'Trial Balance',
  'Cash Flow Statement',
  'Profit & Loss Statement',
  'Balance Sheet',
  'Tax Deducted at Source (TDS)',
  'Goods and Service Tax (GST)',
  "Employees' Provident Fund Organisation (EPFO)",
  "Employees' State Insurance Corporation (ESIC)",
  'Professional Tax (PT)',
  'GST Filings',
  'GSTR-1',
  'GSTR-2A',
  'GSTR-3B',
  'GSTR-4',
  'GSTR-5',
  'GSTR-6',
  'GSTR-7',
  'GSTR-8',
  'GSTR-9',
  'GSTR-10',
  'GSTR-11',
  'GST Reconciliations',
  'Purchase Reconciliation',
  'Tax Liability Reconciliation',
  'Credit Note/Debit Note Reconciliation',
  'HSN Code Reconciliation',
  'E-Way Bill Reconciliation',
  'GST TDS/TCS Reconciliation',
  'ITC Utilisation Reconciliation',
  'GSTIN Wise Reconciliation',
  'Reverse Charge Reconciliation',
  'GST Payment',
  'Challan Generation',
  'E-Way Bill Generation',
  'E-Invoicing',
  'LUT Filing',
  'GST Refund',
  'Notice Management',
  'ITC Mismatch Resolution'
];
export default function Faq6({ heading, caption, defaultExpanded, faqList, getInTouch, categories, activeCategory }) {
  const theme = useTheme();
  const isFocusWithin = useFocusWithin();
  const [expanded, setExpanded] = useState(defaultExpanded || false);
  const [activeTopic, setActiveTopic] = useState(activeCategory || '');
  const [filterFaqList, setFilterFaqList] = useState(activeCategory ? faqList.filter((item) => item.category === activeCategory) : faqList);

  const cardRadius = { xs: 4, sm: 6 };
  const accordionRadius = { xs: cardRadius.xs * 4, sm: cardRadius.sm * 4 };
  const accordionPX = { xs: 2, sm: 3 };
  const iconProps = { color: 'text.primary' };

  // Handles the expansion of accordion panels
  const handleChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  const slickStyle = { '& .slick-slide': { ' > div': { px: { xs: 0.5, md: 0.75 } } } };

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    swipeToSlide: true,
    initialSlide: 0,
    variableWidth: true
  };

  const handleSelect = (event, value) => {
    console.log(value);
    setFilterFaqList(value === 'All' || value === null ? faqList : faqList.filter((list) => list.category === value));
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.4
          }}
        >
          <Stack direction={{ sm: 'row' }} sx={{ gap: 2, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'end' } }}>
            <Typeset {...{ heading, caption }} />
            <Stack direction={'row'} sx={{ gap: 1 }}>
              <Autocomplete
                freeSolo
                autoComplete
                options={options}
                getOptionLabel={(option) => option}
                onChange={handleSelect}
                sx={{ bgcolor: 'grey.100', width: { xs: 1, sm: 300 }, borderRadius: '16px' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Topics..(e.g., Societies, GSTR-1, Loans)"
                    variant="outlined"
                    value={activeTopic || ''}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        sx: { '&.MuiOutlinedInput-root': { pl: 1.75, '& .MuiAutocomplete-input': { pl: 1.25 } } },
                        startAdornment: <SvgIcon name="tabler-search" size={22} color="grey.700" />,
                        'aria-label': 'Search blocks'
                      }
                    }}
                  />
                )}
                renderOption={(props, option) => {
                  return (
                    <ListItem {...props} key={option} sx={{ px: 1.75, py: 1, borderRadius: 3, '&:hover': { bgcolor: 'grey.200' } }}>
                      {option}
                    </ListItem>
                  );
                }}
                ListboxProps={{
                  sx: {
                    maxHeight: 250,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': { width: 8, borderRadius: 1 },
                    '&::-webkit-scrollbar-track': { bgcolor: 'grey.50', borderRadius: 1 },
                    '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.300', borderRadius: 1 }
                  }
                }}
                slotProps={{
                  paper: {
                    sx: {
                      pl: 1.5,
                      pr: 0.75,
                      py: 1.25,
                      borderRadius: 4,
                      boxShadow: `0px 16px 10px 0px ${alpha(theme.palette.grey[900], 0.06)}`
                    }
                  }
                }}
              />
              <ButtonAnimationWrapper>
                <Button
                  variant="contained"
                  size="large"
                  {...getInTouch.link}
                  {...(getInTouch.link && getInTouch.link.href && { component: NextLink })}
                  sx={{ minWidth: 215 }}
                />
              </ButtonAnimationWrapper>
            </Stack>
          </Stack>
        </motion.div>
        <Stack sx={{ gap: 2 }}>
          {/* <Autocomplete
              freeSolo
              autoComplete
              options={options}
              getOptionLabel={(option) => option}
              onChange={handleSelect}
              sx={{ bgcolor: 'grey.100', width: { xs: 1, sm: 410 }, borderRadius: '16px' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Topics..(e.g., Societies, GSTR-1, Loans)"
                  variant="outlined"
                  value={activeTopic || ''}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      sx: { '&.MuiOutlinedInput-root': { pl: 1.75, '& .MuiAutocomplete-input': { pl: 1.25 } } },
                      startAdornment: <SvgIcon name="tabler-search" size={22} color="grey.700" />,
                      'aria-label': 'Search blocks'
                    }
                  }}
                />
              )}
              renderOption={(props, option) => {
                return (
                  <ListItem {...props} key={option} sx={{ px: 1.75, py: 1, borderRadius: 3, '&:hover': { bgcolor: 'grey.200' } }}>
                    {option}
                  </ListItem>
                );
              }}
              ListboxProps={{
                sx: {
                  maxHeight: 250,
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': { width: 8, borderRadius: 1 },
                  '&::-webkit-scrollbar-track': { bgcolor: 'grey.50', borderRadius: 1 },
                  '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.300', borderRadius: 1 }
                }
              }}
              slotProps={{
                paper: {
                  sx: {
                    pl: 1.5,
                    pr: 0.75,
                    py: 1.25,
                    borderRadius: 4,
                    boxShadow: `0px 16px 10px 0px ${alpha(theme.palette.grey[900], 0.06)}`
                  }
                }
              }}
            /> */}
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4
            }}
          >
            <Stack direction={'row'} sx={{ gap: 1 }}>
              <Grid container spacing={{ xs: 0.5 }}>
                <Grid size={{ xs: 'auto' }}>
                  <Button
                    sx={{
                      minHeight: { xs: 40, sm: 48 },
                      color: activeTopic === '' ? '#fff' : 'text.primary',
                      borderColor: 'divider',
                      bgcolor: activeTopic === '' ? 'primary.main' : 'inherit',
                      '&.MuiButton-root:hover': {
                        bgcolor: 'primary.main',
                        borderColor: 'divider',
                        color: '#fff'
                      }
                    }}
                    variant="outlined"
                    onClick={() => {
                      setActiveTopic('');
                      setFilterFaqList(faqList);
                    }}
                  >
                    All
                  </Button>
                </Grid>
                {categories.map((item, index) => (
                  <Grid key={index} size={{ xs: 'auto' }}>
                    <Button
                      sx={{
                        minHeight: { xs: 40, sm: 48 },
                        color: activeTopic === item ? '#fff' : 'text.primary',
                        borderColor: 'divider',
                        bgcolor: activeTopic === item ? 'primary.main' : 'inherit',
                        '&.MuiButton-root:hover': {
                          bgcolor: 'primary.main',
                          borderColor: 'divider',
                          color: '#fff'
                        }
                      }}
                      variant="outlined"
                      onClick={() => {
                        setActiveTopic(item);
                        setFilterFaqList(faqList.filter((list) => list.category === item));
                      }}
                    >
                      {item}
                    </Button>
                  </Grid>
                ))}
              </Grid>

            </Stack>
          </motion.div> */}
          <Stack
            sx={{
              gap: 1.5,
              '& .MuiAccordion-root:first-of-type': { borderTopLeftRadius: accordionRadius, borderTopRightRadius: accordionRadius },
              '& .MuiAccordion-root:last-of-type': { borderBottomLeftRadius: accordionRadius, borderBottomRightRadius: accordionRadius }
            }}
          >
            {filterFaqList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  sx={{
                    borderRadius: cardRadius,
                    backgroundColor: 'grey.100',
                    ...(isFocusWithin && { '&:focus-within': generateFocusVisibleStyles(theme.palette.primary.main) })
                  }}
                >
                  <AccordionSummary
                    expandIcon={<SvgIcon name={expanded === `panel${index}` ? 'tabler-minus' : 'tabler-plus'} {...iconProps} size={20} />}
                    sx={{
                      p: accordionPX,
                      '& .MuiAccordionSummary-expandIconWrapper': { color: 'text.primary' },
                      '& .MuiAccordionSummary-content': { my: 0 },
                      '&.Mui-focusVisible': { bgcolor: 'transparent' },
                      '&:hover, &:hover svg': { color: 'primary.dark' }
                    }}
                  >
                    <Typography variant="h4">{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: accordionPX, pt: 0, pb: accordionPX }} key={index}>
                    <FaqDetails answer={item.answer} />
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </ContainerWrapper>
  );
}

Faq6.propTypes = {
  heading: PropTypes.any,
  caption: PropTypes.any,
  defaultExpanded: PropTypes.any,
  faqList: PropTypes.any,
  getInTouch: PropTypes.any,
  categories: PropTypes.array,
  activeCategory: PropTypes.string
};
