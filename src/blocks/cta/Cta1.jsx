'use client';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SvgIcon from '@/components/SvgIcon';
import ListItem from '@mui/material/ListItem';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsCard from '@/components/cards/GraphicsCard';
import { SECTION_COMMON_PY } from '@/utils/constant';
import { PAGE_PATH } from '@/path';

/***************************  CALL TO ACTION - 1  ***************************/

const options = [
  { label: 'Financial Advisory', path: PAGE_PATH.financial_advisory },
  { label: 'Virtual CFO', path: PAGE_PATH.virtual_cfo },
  { label: 'Accounting & Compliance', path: PAGE_PATH.accounting_compliance },
  { label: 'Business Incorporation', path: PAGE_PATH.business_incorporation },
  { label: 'Licenses & Registrations', path: PAGE_PATH.licenses_registrations },
  { label: 'GST Services', path: PAGE_PATH.gst_services },
  { label: 'Income Tax Services', path: PAGE_PATH.income_tax_services },
  { label: 'RoC Compliance', path: PAGE_PATH.roc_compliance },
  { label: 'TDS Services', path: PAGE_PATH.tds_services },
  { label: 'Payroll & Compliance', path: PAGE_PATH.payroll_compliance },
  { label: 'Loans', path: PAGE_PATH.loans },
  { label: 'Insurance', path: PAGE_PATH.insurance },

  // Financial Advisory
  { label: 'Financial Modelling', path: PAGE_PATH.financial_modelling },
  { label: 'Valuation', path: PAGE_PATH.valuation },
  { label: 'Due Diligence', path: PAGE_PATH.due_diligence },
  { label: 'Franchise Advisory', path: PAGE_PATH.franchise_advisory },
  { label: 'Financial Planning & Analysis', path: PAGE_PATH.financial_planning_analysis },
  { label: 'Working Capital Management', path: PAGE_PATH.working_capital_management },
  { label: 'Fundraising & Investment Advisory', path: PAGE_PATH.fundraising_investment_advisory },
  { label: 'Internal Audit', path: PAGE_PATH.internal_audit },
  { label: 'Tax Litigation & Advisory', path: PAGE_PATH.tax_litigation_advisory },
  { label: 'Management Consultancy', path: PAGE_PATH.management_consultancy },
  { label: 'Business Insurance Advisory', path: PAGE_PATH.business_insurance_advisory },

  // Virtual CFO
  { label: 'Strategic Financial Planning', path: PAGE_PATH.strategic_financial_planning },
  { label: 'Cash Flow Management', path: PAGE_PATH.cash_flow_management },
  { label: 'Budgeting & Forecasting', path: PAGE_PATH.budgeting_forecasting },
  { label: 'Financial Reporting & Analysis', path: PAGE_PATH.financial_reporting_analysis },
  { label: 'Risk Management & Compliance', path: PAGE_PATH.risk_management_compliance },
  { label: 'Investment & Capital Management', path: PAGE_PATH.investment_capital_management },
  { label: 'Improving ROI Using Automation', path: PAGE_PATH.roi_using_automation },

  // Accounting & Compliance
  { label: 'Invoicing', path: PAGE_PATH.invoicing },
  { label: 'Bank Account Integration', path: PAGE_PATH.bank_account_integration },
  { label: 'Automated Bank Reconciliation', path: PAGE_PATH.automated_bank_reconciliation },
  { label: 'Bank Statement Import', path: PAGE_PATH.bank_statement_import },
  { label: 'Trial Balance', path: PAGE_PATH.trial_balance },
  { label: 'Cash Flow Statement', path: PAGE_PATH.cash_flow_statement },
  { label: 'Profit & Loss Statement', path: PAGE_PATH.profit_loss_statement },
  { label: 'Balance Sheet', path: PAGE_PATH.balance_sheet },
  { label: 'Tax Deducted at Source (TDS)', path: PAGE_PATH.tds },
  { label: 'Goods and Services Tax (GST)', path: PAGE_PATH.gst },
  { label: "Employees' Provident Fund Organisation (EPFO)", path: PAGE_PATH.epfo },
  { label: "Employees' State Insurance Corporation (ESIC)", path: PAGE_PATH.esic },
  { label: 'Professional Tax (PT)', path: PAGE_PATH.professional_tax },

  // Business Incorporation
  { label: 'Private Limited Company', path: PAGE_PATH.private_limited_company },
  { label: 'Limited Liability Partnership (LLP)', path: PAGE_PATH.llp },
  { label: 'One Person Company (OPC)', path: PAGE_PATH.opc },
  { label: 'Public Limited Company', path: PAGE_PATH.public_limited_company },
  { label: 'Trusts', path: PAGE_PATH.trusts },
  { label: 'Societies', path: PAGE_PATH.societies },
  { label: 'Section 8 (Non-Profit) Companies', path: PAGE_PATH.section_8_companies },
  { label: 'Partnership Firm', path: PAGE_PATH.partnership_firm },
  { label: 'Proprietorship (Sole Proprietor)', path: PAGE_PATH.proprietorship },
  { label: 'Foreign Company', path: PAGE_PATH.foreign_company },
  { label: 'Producer Company', path: PAGE_PATH.producer_company },
  { label: 'Nidhi Company', path: PAGE_PATH.nidhi_company },

  // Licenses & Registrations
  { label: 'MSME Registration', path: PAGE_PATH.msme_registration },
  { label: 'Start Up India Registration', path: PAGE_PATH.startup_india_registration },
  { label: 'Import Export Code', path: PAGE_PATH.import_export_code },
  { label: 'Trade License', path: PAGE_PATH.trade_license },
  { label: 'Trade Mark', path: PAGE_PATH.trade_mark },
  { label: 'Labour License (Shop & Establishment Act)', path: PAGE_PATH.labour_license },
  { label: 'Food License', path: PAGE_PATH.food_license },
  { label: 'EPF Registration', path: PAGE_PATH.epf_registration },
  { label: 'ESI Registration', path: PAGE_PATH.esi_registration },
  { label: 'PT (Professional Tax) Registration', path: PAGE_PATH.pt_registration },
  { label: 'PAN/TAN Registration', path: PAGE_PATH.pan_tan_registration },
  { label: 'GST Registration', path: PAGE_PATH.gst_registration },
  { label: 'RERA Registration', path: PAGE_PATH.rera_registration },
  { label: 'DSC (Digital Signature Certificate)', path: PAGE_PATH.dsc_registration },
  { label: 'NBFC Registration', path: PAGE_PATH.nbfc_registration },
  { label: 'SEBI Registration', path: PAGE_PATH.sebi_registration },
  { label: 'Insurance License', path: PAGE_PATH.insurance_license },

  // GST Services
  { label: 'Amendment of GST Registration', path: PAGE_PATH.gst_registration_amendment },
  { label: 'GST Cancellation', path: PAGE_PATH.gst_cancellation },
  { label: 'GST Revocation of Cancellation', path: PAGE_PATH.gst_revocation_cancellation },
  { label: 'GST Registration for Non-Resident Taxpayers', path: PAGE_PATH.gst_non_resident },
  { label: 'GST Registration for E-commerce Operators', path: PAGE_PATH.gst_ecommerce },
  { label: 'GST Registration for ISD', path: PAGE_PATH.gst_isd },
  { label: 'GSTR-1', path: PAGE_PATH.gstr1 },
  { label: 'GSTR-3B', path: PAGE_PATH.gstr3b },
  { label: 'GSTR-2A', path: PAGE_PATH.gstr2a },
  { label: 'GSTR-2B', path: PAGE_PATH.gstr2b },
  { label: 'GSTR-9', path: PAGE_PATH.gstr9 },
  { label: 'GSTR-9C', path: PAGE_PATH.gstr9c },
  { label: 'CMP-08', path: PAGE_PATH.cmp08 },
  { label: 'GSTR-4', path: PAGE_PATH.gstr4 },
  { label: 'GSTR-5', path: PAGE_PATH.gstr5 },
  { label: 'GSTR-6', path: PAGE_PATH.gstr6 },
  { label: 'GSTR-7', path: PAGE_PATH.gstr7 },
  { label: 'GSTR-8', path: PAGE_PATH.gstr8 },
  { label: 'GSTR-10', path: PAGE_PATH.gstr10 },
  { label: 'GSTR-11', path: PAGE_PATH.gstr11 },
  { label: 'Purchase Reconciliation', path: PAGE_PATH.purchase_reconciliation },
  { label: 'Tax Liability Reconciliation', path: PAGE_PATH.tax_liability_reconciliation },
  { label: 'Credit Note/Debit Note Reconciliation', path: PAGE_PATH.credit_debit_reconciliation },
  { label: 'HSN Code Reconciliation', path: PAGE_PATH.hsn_code_reconciliation },
  { label: 'E-Way Bill Reconciliation', path: PAGE_PATH.eway_bill_reconciliation },
  { label: 'GST TDS/TCS Reconciliation', path: PAGE_PATH.gst_tds_tcs_reconciliation },
  { label: 'ITC Utilisation Reconciliation', path: PAGE_PATH.itc_utilisation_reconciliation },
  { label: 'GSTIN Wise Reconciliation', path: PAGE_PATH.gstin_reconciliation },
  { label: 'Annual Return Reconciliation', path: PAGE_PATH.annual_return_reconciliation },
  { label: 'Reverse Charge Reconciliation', path: PAGE_PATH.reverse_charge_reconciliation },
  { label: 'GST Payment', path: PAGE_PATH.gst_payment },
  { label: 'Challan Generation', path: PAGE_PATH.challan_generation },
  { label: 'E-Way Bill Generation', path: PAGE_PATH.eway_bill_generation },
  { label: 'E-Invoicing', path: PAGE_PATH.e_invoicing },
  { label: 'LUT Filing', path: PAGE_PATH.lut_filing },
  { label: 'GST Refund', path: PAGE_PATH.gst_refund },
  { label: 'Notice Management', path: PAGE_PATH.notice_management },
  { label: 'ITC Mismatch Resolution', path: PAGE_PATH.itc_mismatch_resolution },
  { label: 'Filing Appeals', path: PAGE_PATH.filing_appeals },
  { label: 'GST Audit', path: PAGE_PATH.gst_audit },

  // Income Tax Services
  { label: 'Scrutiny Notice 143(2)', path: PAGE_PATH.scrutiny_notice_143_2 },
  { label: 'Defective/Non Filing 139(9)', path: PAGE_PATH.defective_filing_139_9 },
  { label: 'Reassessment Notice 147', path: PAGE_PATH.reassessment_notice_147 },
  { label: 'Penalty Notice 271', path: PAGE_PATH.penalty_notice_271 },
  { label: 'Notice for Tax Audit 44AB', path: PAGE_PATH.notice_tax_audit_44AB },
  { label: 'Demand Notice 156', path: PAGE_PATH.demand_notice_156 },
  { label: 'Appeal to Commissioner 246', path: PAGE_PATH.appeal_commissioner_246 },
  { label: 'Appeal to ITAT', path: PAGE_PATH.appeal_itat },
  { label: 'Penalty Appeal', path: PAGE_PATH.penalty_appeal },
  { label: 'ITR-1 (Salaried Individuals)', path: PAGE_PATH.itr1 },
  { label: 'ITR-2', path: PAGE_PATH.itr2 },
  { label: 'ITR-3 (Business)', path: PAGE_PATH.itr3 },
  { label: 'ITR-4 (Presumptive Taxation)', path: PAGE_PATH.itr4 },
  { label: 'ITR-5 (Firm/LLP/AOP/BOI)', path: PAGE_PATH.itr5 },
  { label: 'ITR-6 (Companies)', path: PAGE_PATH.itr6 },
  { label: 'ITR-7 (Trusts, Political Parties, NGOs)', path: PAGE_PATH.itr7 },
  { label: 'ITR-8', path: PAGE_PATH.itr8 },
  { label: 'Advance Tax Payment Assistance', path: PAGE_PATH.advance_tax_payment },
  { label: 'Income Tax Filing for Non-Residents', path: PAGE_PATH.nri_tax_filing },
  { label: 'Income Tax Filing for Businesses', path: PAGE_PATH.business_tax_filing },
  { label: 'Tax Audit Report', path: PAGE_PATH.tax_audit_report },
  { label: 'Transfer Pricing Report', path: PAGE_PATH.transfer_pricing },
  { label: 'Lower/Nil TDS Certificate Application', path: PAGE_PATH.lower_tds_certificate },
  { label: 'Section 12A & 80G Registrations', path: PAGE_PATH.section_12a_80g },
  { label: 'Form 15CA (Foreign Remittance Declaration)', path: PAGE_PATH.form_15ca },
  { label: 'Form 15CB (CA Certification for Foreign Payments)', path: PAGE_PATH.form_15cb },
  { label: 'Form 10E (Salary Arrears Relief)', path: PAGE_PATH.form_10e },
  { label: 'Form 15G/15H (No TDS for Low-Income Individuals)', path: PAGE_PATH.form_15g_15h },
  { label: 'Form 67 (Foreign Tax Credit Declaration)', path: PAGE_PATH.form_67 },
  { label: 'Form 10BA (Deduction under Section 80GG)', path: PAGE_PATH.form_10ba },
  { label: 'Form 3CA/3CB & 3CD (Audit Reports)', path: PAGE_PATH.form_3ca_3cb_3cd },
  { label: 'Form 10DB (Tax Withholding Certificate)', path: PAGE_PATH.form_10db },
  { label: 'Form 10F (Non-Resident Tax Treaty Benefit)', path: PAGE_PATH.form_10f },
  { label: 'Form 10A (Trust/NGO Registration)', path: PAGE_PATH.form_10a },
  { label: 'Form 10B (Trust Audit Report)', path: PAGE_PATH.form_10b },
  { label: 'Form 3CEB (International Transactions Report)', path: PAGE_PATH.form_3ceb },
  { label: 'Form 61A (Statement of Financial Transactions - SFT)', path: PAGE_PATH.form_61a },
  { label: 'Form 5 (Charitable Institution Tax Exemption)', path: PAGE_PATH.form_5 },
  { label: 'Form 10CCB (Section 80-IA Deduction)', path: PAGE_PATH.form_10ccb },
  { label: 'Form 10C (EPF Withdrawal/Transfer)', path: PAGE_PATH.form_10c },
  { label: 'Form 49A (PAN Application for Indian Entities)', path: PAGE_PATH.form_49a },
  { label: 'Form 49B (PAN Application for Non-Residents)', path: PAGE_PATH.form_49b },
  { label: 'Tax Planning for Individuals', path: PAGE_PATH.tax_planning_individuals },
  { label: 'Tax Planning for Businesses & HUFs', path: PAGE_PATH.tax_planning_businesses },
  { label: 'Capital Gain Transaction Advisory', path: PAGE_PATH.capital_gain_advisory },
  { label: 'Tax Saving Investment Advisory', path: PAGE_PATH.tax_saving_investment },
  { label: 'Transfer Pricing Advisory', path: PAGE_PATH.transfer_pricing_advisory },
  { label: 'Double Taxation Avoidance Agreement (DTAA) Advisory', path: PAGE_PATH.dtaa_advisory },
  { label: 'Cross-Border Tax Filing', path: PAGE_PATH.cross_border_filing },
  { label: 'Withholding Tax Advisory', path: PAGE_PATH.withholding_tax_advisory },
  { label: 'Repatriation of Funds', path: PAGE_PATH.repatriation_funds },
  { label: 'Expatriate Taxation', path: PAGE_PATH.expatriate_taxation },
  { label: 'Tax Implications of Foreign Investments', path: PAGE_PATH.foreign_investments_tax },
  { label: 'Handling NRI Tax Disputes and Appeals', path: PAGE_PATH.nri_tax_disputes },
  { label: 'Tax Advisory on NRI Income', path: PAGE_PATH.nri_income_advisory },
  { label: 'NRI Tax Filing Services', path: PAGE_PATH.nri_tax_filing },
  { label: 'Repatriation of Funds and Investments', path: PAGE_PATH.nri_repatriation },
  { label: 'Managing Indian Assets for NRIs', path: PAGE_PATH.nri_asset_management },
  { label: 'NRI Banking and Financial Services', path: PAGE_PATH.nri_banking },
  { label: 'Estate Planning for NRIs', path: PAGE_PATH.nri_estate_planning },
  { label: 'Power of Attorney (POA) Services for NRIs', path: PAGE_PATH.nri_poa_services },
  { label: 'NRI Loans and Mortgages', path: PAGE_PATH.nri_loans },
  { label: 'Medical Insurance and Healthcare for NRIs', path: PAGE_PATH.nri_healthcare },

  //ROC Services
  { label: 'Private Limited Company Registration', path: PAGE_PATH.private_limited_registration },
  { label: 'Public Limited Company Registration', path: PAGE_PATH.public_limited_registration },
  { label: 'One Person Company (OPC) Registration', path: PAGE_PATH.opc_registration },
  { label: 'Limited Liability Partnership (LLP) Registration', path: PAGE_PATH.llp_registration },
  { label: 'Section 8 Company (NGO) Registration', path: PAGE_PATH.section_8_registration },
  { label: 'Producer Company Registration', path: PAGE_PATH.producer_company_registration },
  { label: 'Foreign Company Registration (India)', path: PAGE_PATH.foreign_company_registration },
  { label: 'Annual Filing for Private Limited Company (AOC-4, MGT-7)', path: PAGE_PATH.annual_filing_pvt_ltd },
  { label: 'Annual Filing for LLP (Form 8 & Form 11)', path: PAGE_PATH.annual_filing_llp },
  { label: 'Change in Directors (DIR-12)', path: PAGE_PATH.change_director },
  { label: 'Change in Registered Office Address (INC-22)', path: PAGE_PATH.change_registered_office },
  { label: 'Increase in Authorized Capital (SH-7)', path: PAGE_PATH.increase_authorized_capital },
  { label: 'MOA & AOA Amendments', path: PAGE_PATH.moa_aoa_amendment },
  { label: 'Closure of Company (Strike Off - STK-2)', path: PAGE_PATH.company_closure },
  { label: 'Closure of LLP (Form 24)', path: PAGE_PATH.llp_closure },
  { label: 'Allotment of Shares (PAS-3)', path: PAGE_PATH.allotment_shares },
  { label: 'Charge Creation & Modification (CHG-1, CHG-4)', path: PAGE_PATH.charge_creation },
  { label: 'Change in Name of Company (INC-24)', path: PAGE_PATH.change_company_name },
  { label: 'Conversion of Private Limited to Public Limited', path: PAGE_PATH.conversion_pvt_to_public },
  { label: 'Conversion of LLP to Private Limited', path: PAGE_PATH.conversion_llp_to_pvt },
  { label: 'Director Identification Number (DIN) Application', path: PAGE_PATH.din_application },
  { label: 'DIN KYC Update (DIR-3 KYC)', path: PAGE_PATH.din_kyc },
  { label: 'Digital Signature Certificate (DSC) Application', path: PAGE_PATH.dsc_application },
  { label: 'Merger & Acquisition Advisory', path: PAGE_PATH.merger_acquisition },
  { label: 'Demerger Services', path: PAGE_PATH.demerger_services },
  { label: 'Company Takeover & Buyback', path: PAGE_PATH.company_takeover },
  { label: 'Conversion of Proprietorship to Private Limited', path: PAGE_PATH.proprietorship_to_pvt_ltd },
  { label: 'Voluntary Winding Up of Company', path: PAGE_PATH.voluntary_winding_up },
  { label: 'Insolvency & Bankruptcy Advisory', path: PAGE_PATH.insolvency_bankruptcy },
  { label: 'Closure of Defunct Company (STK-2)', path: PAGE_PATH.defunct_company_closure },

  // TDS Services
  { label: 'New TAN (Tax Deduction Account Number) Registration', path: PAGE_PATH.tan_registration },
  { label: 'TAN Amendment', path: PAGE_PATH.tan_amendment },
  { label: 'TAN Surrender', path: PAGE_PATH.tan_surrender },
  { label: 'TDS Payment & Challan Generation', path: PAGE_PATH.tds_payment },
  { label: 'Quarterly TDS Returns (Form 24Q & 26Q)', path: PAGE_PATH.quarterly_tds_returns },
  { label: 'Form 27Q Filing (Non-Resident Payments)', path: PAGE_PATH.form_27q },
  { label: 'Form 27EQ Filing (TCS Return)', path: PAGE_PATH.form_27eq },
  { label: 'Form 26QB Filing (TDS on Property Sale)', path: PAGE_PATH.form_26qb },
  { label: 'Form 26QC Filing (TDS on Rent)', path: PAGE_PATH.form_26qc },
  { label: 'Form 26QD Filing (TDS on Contract Payments)', path: PAGE_PATH.form_26qd },
  { label: 'Form 16 Issuance (Salaried Employees)', path: PAGE_PATH.form_16 },
  { label: 'Form 16A Issuance (Non-Salary Income)', path: PAGE_PATH.form_16a },
  { label: 'Form 16B Issuance (TDS on Property Sale)', path: PAGE_PATH.form_16b },
  { label: 'Form 16C Issuance (TDS on Rent)', path: PAGE_PATH.form_16c },
  { label: 'Issuance of TCS Certificates (Form 27D)', path: PAGE_PATH.form_27d },
  { label: 'TDS Return Correction & Revision', path: PAGE_PATH.tds_correction },
  { label: 'TDS/TCS Demand Notice Resolution', path: PAGE_PATH.tds_demand_notice },
  { label: 'Form 26AS Reconciliation', path: PAGE_PATH.form_26as_reconciliation },
  { label: 'TDS Mismatch Resolution', path: PAGE_PATH.tds_mismatch_resolution },

  { label: 'TDS Exemption Certificate Filing', path: PAGE_PATH.tds_exemption_certificate },
  { label: 'TDS Planning & Advisory', path: PAGE_PATH.tds_planning_advisory },
  { label: 'TDS Calculator', path: PAGE_PATH.tds_calculator },
  { label: 'TDS Deduction Advisory', path: PAGE_PATH.tds_deduction_advisory },

  // Payroll & Compliance
  { label: 'Payroll ESI Registration', path: PAGE_PATH.esi_registration },
  { label: 'Payroll EPF Registration', path: PAGE_PATH.epf_registration },
  { label: 'Professional Tax (PT) Registration', path: PAGE_PATH.pt_registration },
  { label: 'Labour License Registration', path: PAGE_PATH.labour_license },
  { label: 'Group Insurance/Employee Insurance', path: PAGE_PATH.group_insurance },
  { label: 'Employee Master Setup', path: PAGE_PATH.employee_master },
  { label: 'Offer Letter Generation', path: PAGE_PATH.offer_letter },
  { label: 'Employee Agreement Drafting', path: PAGE_PATH.employee_agreement },
  { label: 'Salary Structure Configuration', path: PAGE_PATH.salary_structure },
  { label: 'Attendance Management', path: PAGE_PATH.attendance_management },
  { label: 'TDS Calculation for Employees', path: PAGE_PATH.tds_calculation },
  { label: 'EPF Calculation', path: PAGE_PATH.epf_calculation },
  { label: 'ESI Calculation', path: PAGE_PATH.esi_calculation },
  { label: 'Gratuity Calculation', path: PAGE_PATH.gratuity_calculation },
  { label: 'PT Calculation', path: PAGE_PATH.pt_calculation },
  { label: 'Tax Computation for NRI Employees', path: PAGE_PATH.nri_tax_computation },
  { label: 'Salary Increment & Revision', path: PAGE_PATH.salary_revision },
  { label: 'Monthly Payroll Generation', path: PAGE_PATH.monthly_payroll },
  { label: 'Salary Slips Generation', path: PAGE_PATH.salary_slips },
  { label: 'Direct Bank Payment Processing', path: PAGE_PATH.bank_payment },
  { label: 'Multiple Salary Cycles Handling', path: PAGE_PATH.multiple_salary_cycles },
  { label: 'Form 16 Generation', path: PAGE_PATH.form_16_generation },
  { label: 'Payslip Access', path: PAGE_PATH.payslip_access },
  { label: 'Leave Requests & Approvals', path: PAGE_PATH.leave_management },
  { label: 'Tax Declaration Submission', path: PAGE_PATH.tax_declaration },
  { label: 'Profile Management', path: PAGE_PATH.profile_management },
  { label: 'Attendance & Overtime Tracking', path: PAGE_PATH.attendance_tracking },
  { label: 'Reimbursement Claims', path: PAGE_PATH.reimbursement_claims },
  { label: 'Loan Management for Employees', path: PAGE_PATH.loan_management },
  { label: 'EPF Filings', path: PAGE_PATH.epf_filing },
  { label: 'ESI Filings', path: PAGE_PATH.esi_filing },
  { label: 'Professional Tax (PT) Filings', path: PAGE_PATH.pt_filing },
  { label: 'TDS Filings for Employees', path: PAGE_PATH.tds_filing },
  { label: 'Income Tax Return (ITR) Filing', path: PAGE_PATH.itr_filing },

  // Loans
  { label: 'Business Loans', path: PAGE_PATH.business_loans },
  { label: 'Personal Loans', path: PAGE_PATH.personal_loans },
  { label: 'LAP (Loan Against Property)', path: PAGE_PATH.lap_loans },

  // Insurance
  { label: 'Life Insurance', path: PAGE_PATH.life_insurance },
  { label: 'Health Insurance', path: PAGE_PATH.health_insurance },
  { label: 'General Insurance', path: PAGE_PATH.general_insurance },
  { label: 'Business & Liability Insurance', path: PAGE_PATH.business_liability_insurance },
  { label: 'Property & Asset Insurance', path: PAGE_PATH.property_asset_insurance }
];

export default function Cta1({ bgImage, heading, captionLine, getStarted, search = false }) {
  const theme = useTheme();

  const handleSelect = (event, value) => {
    if (typeof value === 'object' && value !== null) {
      value.path && router.push(value.path);
    }
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.4
        }}
      >
        <GraphicsCard
          {...(bgImage && {
            sx: {
              position: 'relative',
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              '&:before': {
                content: `' '`,
                position: 'absolute',
                width: 1,
                height: 1,
                left: 0,
                bottom: 0,
                background: `linear-gradient(180deg, ${alpha(theme.palette.grey[100], 0)} -280%, ${theme.palette.grey[100]} 143.54%)`
              }
            }
          })}
        >
          <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, position: 'relative', width: 1 }}>
            <Stack sx={{ alignItems: 'center', justifyContent: 'center', gap: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h2" align="center">
                {heading}
              </Typography>
              {captionLine && (
                <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                  {captionLine}
                </Typography>
              )}
            </Stack>
          </Box>
          {search && (
            <Stack sx={{ pb: { xs: 1.5, sm: 2, md: 3 }, alignItems: 'center' }}>
              <Autocomplete
                freeSolo
                autoComplete
                options={options}
                getOptionLabel={(option) => (typeof option !== 'string' ? option.label : '')}
                onChange={handleSelect}
                sx={{ bgcolor: 'grey.100', width: { xs: 1, sm: 410 }, borderRadius: '16px' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Services..(e.g., TDS Calculation, GSTR-1, Loans)"
                    variant="outlined"
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
                    <ListItem {...props} key={option.label} sx={{ px: 1.75, py: 1, borderRadius: 3, '&:hover': { bgcolor: 'grey.200' } }}>
                      {option.label}
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
            </Stack>
          )}
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

Cta1.propTypes = { bgImage: PropTypes.any, heading: PropTypes.string, primaryBtn: PropTypes.any };
