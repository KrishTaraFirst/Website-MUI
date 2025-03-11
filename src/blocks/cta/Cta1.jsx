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
import { useRouter } from 'next/navigation';

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
  { label: 'Virtual CFO', path: '/services/virtual-cfo' },
  // { label: 'Accounting & Compliance', path: PAGE_PATH.accounting_compliance },
  // { label: 'Business Incorporation', path: PAGE_PATH.business_incorporation },
  // { label: 'Licenses & Registrations', path: PAGE_PATH.licenses_registrations },
  // { label: 'GST Services', path: PAGE_PATH.gst_services },
  // { label: 'Income Tax Services', path: PAGE_PATH.income_tax_services },
  // { label: 'RoC Compliance', path: PAGE_PATH.roc_compliance },
  // { label: 'TDS Services', path: PAGE_PATH.tds_services },
  // { label: 'Payroll & Compliance', path: PAGE_PATH.payroll_compliance },
  // { label: 'Loans', path: PAGE_PATH.loans },
  // { label: 'Insurance', path: PAGE_PATH.insurance },

  // Financial Advisory
  { label: 'Financial Modelling', path: '/services/financial-modelling' },
  { label: 'Valuation', path: '/services/valuation' },
  { label: 'Due Diligence', path: '/services/due-diligence' },
  { label: 'Franchise Advisory', path: '/services/franchise-advisory' },
  { label: 'Financial Planning & Analysis', path: '/services/financial-planning-analysis' },
  { label: 'Working Capital Management', path: '/services/working-capital-management' },
  { label: 'Fundraising & Investment Advisory', path: '/services/financial-planning-analysis' },
  { label: 'Internal Audit', path: '/services/internal-audit' },
  { label: 'Tax Litigation & Advisory', path: '/services/tax-litigation-advisory' },
  { label: 'Management Consultancy', path: '/services/management-consultancy' },
  { label: 'Business Insurance Advisory', path: '/services/business-insurance-advisory' },

  // Virtual CFO
  { label: 'Strategic Financial Planning', path: '/services/ strategic-financial-planning' },
  { label: 'Cash Flow Management', path: '/services/cash-flow-management' },
  { label: 'Budgeting & Forecasting', path: '/services/budgeting-forecasting' },
  { label: 'Financial Reporting & Analysis', path: '/services/financial-reporting-analysis' },
  { label: 'Risk Management & Compliance', path: '/services/risk-management-compliance' },
  { label: 'Investment & Capital Management', path: '/services/investment-capital-management' },
  { label: 'Improving ROI Using Automation', path: '/services/improving-roi-using-automation' },

  // Accounting & Compliance
  { label: 'Invoicing', path: '/services/invoicing' },
  { label: 'Bank Account Integration', path: '/services/bank-account-integration' },
  { label: 'Automated Bank Reconciliation', path: '/services/automated-bank-reconciliation' },
  { label: 'Bank Statement Import', path: '/services/bank-statement-import' },
  { label: 'Trial Balance', path: '/services/trial-balance' },
  { label: 'Cash Flow Statement', path: '/services/cash-flow-statement' },
  { label: 'Profit & Loss Statement', path: '/services/profit-loss-statement' },
  { label: 'Balance Sheet', path: '/services/ balance-sheet' },
  { label: 'Tax Deducted at Source (TDS)', path: '/services/tax-deducted-at-source' },
  { label: 'Goods and Services Tax (GST)', path: '/services/goods-and-service-tax' },
  { label: "Employees' Provident Fund Organisation (EPFO)", path: '/services/employees-provident-fund -organisation' },
  { label: "Employees' State Insurance Corporation (ESIC)", path: '/services/employees-state-insurance-corporation' },
  { label: 'Professional Tax (PT)', path: '/services/ professional-tax' },
  // Business Incorporati
  { label: 'Private Limited Company', path: '/services/private-limited-company' },
  { label: 'Limited Liability Partnership (LLP)', path: '/services/limited-liability-partnership' },
  { label: 'One Person Company (OPC)', path: '/services/one-person-company' },
  { label: 'Public Limited Company', path: '/services/public-limited-company' },
  { label: 'Trusts', path: '/services/trusts-non-profit' },
  // { 'label': 'Societies', 'path': '/services/' },
  // { 'label': 'Section 8 (Non-Profit) Companies', 'path': '/services/' },
  { label: 'Partnership Firm', path: '/services/partnership-firm' },
  { label: 'Proprietorship (Sole Proprietor)', path: '/services/proprietorship' },
  { label: 'Foreign Company', path: '/services/foreign-company-registration' },
  { label: 'Producer Company', path: '/services/producer-company' },
  { label: 'Nidhi Company', path: '/services/nidhi-company' },

  // Licenses & Registrations
  { label: 'MSME Registration', path: '/services/msme-registration' },
  { label: 'Start Up India Registration', path: '/services/startup-india-registration' },
  { label: 'Import Export Code', path: '/services/import-export-code' },
  { label: 'Trade License', path: '/services/trade-license' },
  { label: 'Trade Mark', path: '/services/trademark-registration' },
  { label: 'Labour License (Shop & Establishment Act)', path: '/services/labour-license' },
  { label: 'Food License', path: '/services/food-license' },
  { label: 'EPF Registration', path: '/services/epf-registration' },
  { label: 'ESI Registration', path: '/services/esi-registration' },
  { label: 'PT (Professional Tax) Registration', path: '/services/professional-tax' },
  { label: 'PAN/TAN Registration', path: '/services/pan-tan-registration' },
  { label: 'GST Registration', path: '/services/gst-registration' },
  { label: 'RERA Registration', path: '/services/rera-registration' },
  { label: 'DSC (Digital Signature Certificate)', path: '/services/dsc-registration' },
  { label: 'NBFC Registration', path: '/services/nbfc-registration' },
  { label: 'SEBI Registration', path: '/services/sebi-registration' },
  { label: 'Insurance License', path: '/services/insurance-license' },

  // GST Services
  { label: 'Amendment of GST Registration', path: 'services/gst-amendment' },
  { label: 'GST Cancellation', path: 'services/gst-cancellation' },
  { label: 'GST Revocation of Cancellation', path: 'services/gst-revocation' },
  { label: 'GST Registration for Non-Resident Taxpayers', path: 'services/ gst-non-resident' },
  { label: 'GST Registration for E-commerce Operators', path: 'services/gst-ecommerce' },
  { label: 'GST Registration for ISD', path: 'services/gst-isd' },
  { label: 'GSTR-1', path: '/services/gstr-1' },
  { label: 'GSTR-3B', path: '/services/gstr-3b' },
  { label: 'GSTR-2A', path: '/services/gstr-2a' },
  { label: 'GSTR-2B', path: '/services/gstr-2b' },
  { label: 'GSTR-9', path: '/services/gstr-9' },
  { label: 'GSTR-9C', path: '/services/gstr-9c' },
  { label: 'CMP-08', path: 'services/cmp-08' },
  { label: 'GSTR-4', path: '/services/gstr-4' },
  { label: 'GSTR-5', path: '/services/gstr-5' },
  { label: 'GSTR-6', path: '/services/gstr-6' },
  { label: 'GSTR-7', path: '/services/gstr-7' },
  { label: 'GSTR-8', path: '/services/gstr-8' },
  { label: 'GSTR-10', path: '/services/gstr-10' },
  { label: 'GSTR-11', path: '/services/gstr-11' },

  { label: 'Purchase Reconciliation', path: '/services/gst-reconciliations' },
  // { label: 'Tax Liability Reconciliation', path: '/services/' },
  // { label: 'Credit Note/Debit Note Reconciliation', path: '/services/' },
  // { label: 'HSN Code Reconciliation', path: '/services/' },
  // { label: 'E-Way Bill Reconciliation', path: '/services/' },
  // { label: 'GST TDS/TCS Reconciliation', path: '/services/' },
  // { label: 'ITC Utilisation Reconciliation', path: '/services/' },
  { label: 'GSTIN Wise Reconciliation', path: '/services/gstin-wise-reconciliation' },
  // { label: 'Annual Return Reconciliation', path: '/services/' },
  // { label: 'Reverse Charge Reconciliation', path: '/services/' },
  // { label: 'GST Payment', path: '/services/' },
  // { label: 'Challan Generation', path: '/services/' },
  // { label: 'E-Way Bill Generation', path: '/services/' },
  // { label: 'E-Invoicing', path: '/services/' },
  // { label: 'LUT Filing', path: PAGE_PATH.lut_filing },
  // { label: 'GST Refund', path: PAGE_PATH.gst_refund },
  { label: 'Notice Management', path: '/services/notice-management' },
  // { label: 'ITC Mismatch Resolution', path: PAGE_PATH.itc_mismatch_resolution },
  { label: 'Filing Appeals', path: '/services/notices-appeals' },
  { label: 'GST Audit', path: '/services/gst-audits' },

  { label: 'Scrutiny Notice 143(2)', path: '/services/scrutiny-notice' },
  { label: 'Defective/Non Filing 139(9)', path: '/services/defective-notice' },
  { label: 'Reassessment Notice 147', path: '/services/reassessment-notice' },
  { label: 'Penalty Notice 271', path: '/services/penalty-notice' },
  { label: 'Notice for Tax Audit 44AB', path: '/services/tax-audit-notice' },
  { label: 'Demand Notice 156', path: '/services/demand-notice' },
  { label: 'Income Tax Appeals', path: '/services/income-tax-appeals' },
  { label: 'Appeal to Commissioner 246', path: '/services/commissioner-appeal' },
  { label: 'Appeal to ITAT', path: '/services/itat-appeal' },
  { label: 'Penalty Appeal', path: '/services/penalty-appeal' },
  { label: 'ITR-1 (Salaried Individuals)', path: '/services/income-tax-filing-salaried' },
  { label: 'ITR-2', path: '/services/itr2-filing' },
  { label: 'ITR-3 (Business)', path: '/services/itr3-filing' },
  { label: 'ITR-4 (Presumptive Taxation)', path: '/services/itr4-filing' },
  { label: 'ITR-5 (Firm/LLP/AOP/BOI)', path: '/services/itr5-filing' },
  { label: 'ITR-6 (Companies)', path: '/services/itr6-filing' },
  { label: 'ITR-7 (Trusts, Political Parties, NGOs)', path: '/services/itr7-filing' },
  { label: 'ITR-8', path: '/services/itr8-filing' },
  { label: 'Advance Tax Payment Assistance', path: '/services/advance-tax-payment' },
  { label: 'Income Tax Filing for Non-Residents', path: '/services/income-tax-filing-nri' },
  { label: 'Income Tax Filing for Businesses', path: '/services/income-tax-filing-business' },
  { label: 'Tax Audit Report', path: '/services/tax-audit-report' },
  { label: 'Transfer Pricing Report', path: '/services/transfer-pricing-compliance' },
  { label: 'Lower/Nil TDS Certificate Application', path: '/services/lower-nil-tds-certificate' },
  { label: 'Section 12A & 80G Registrations', path: '/services/section-12a-80g-registrations' },
  { label: 'Form 15CA (Foreign Remittance Declaration)', path: '/services/form-15ca' },
  { label: 'Form 15CB (CA Certification for Foreign Payments)', path: '/services/form-15cb' },
  { label: 'Form 10E (Salary Arrears Relief)', path: '/services/form-10e' },
  { label: 'Form 15G/15H (No TDS for Low-Income Individuals)', path: '/services/form-15g-15h' },
  { label: 'Form 67 (Foreign Tax Credit Declaration)', path: '/services/form-67' },
  { label: 'Form 10BA (Deduction under Section 80GG)', path: '/services/form-10ba' },
  { label: 'Form 3CA/3CB & 3CD (Audit Reports)', path: '/services/form-3ca-3cb-3cd' },
  { label: 'Form 10DB (Tax Withholding Certificate)', path: '/services/form-10db' },
  { label: 'Form 10F (Non-Resident Tax Treaty Benefit)', path: '/services/form-10f' },
  { label: 'Form 10A (Trust/NGO Registration)', path: '/services/form-10a' },
  { label: 'Form 10B (Trust Audit Report)', path: '/services/form-10b' },
  { label: 'Form 3CEB (International Transactions Report)', path: '/services/form-3ceb' },
  { label: 'Form 61A (Statement of Financial Transactions - SFT)', path: '/services/form-61a' },
  { label: 'Form 5 (Charitable Institution Tax Exemption)', path: '/services/form-5' },
  { label: 'Form 10CCB (Section 80-IA Deduction)', path: '/services/form-10ccb' },
  { label: 'Form 10C (EPF Withdrawal/Transfer)', path: '/services/form-10c' },
  { label: 'Form 49A (PAN Application for Indian Entities)', path: '/services/form-49a' },
  { label: 'Form 49B (PAN Application for Non-Residents)', path: '/services/form-49b' },
  { label: 'Tax Planning for Individuals', path: '/services/tax-planning-individuals' },
  { label: 'Tax Planning for Businesses & HUFs', path: '/services/tax-planning-businesses-hufs' },
  { label: 'Capital Gain Transaction Advisory', path: '/services/capital-gain-transaction-advisory' },
  { label: 'Tax Saving Investment Advisory', path: '/services/tax-saving-investment-advisory' },
  { label: 'Transfer Pricing Advisory', path: '/services/transfer-pricing-advisory' },
  { label: 'Double Taxation Avoidance Agreement (DTAA) Advisory', path: '/services/dtaa-advisory' },
  { label: 'Cross-Border Tax Filing', path: '/services/cross-border-tax-filing' },
  { label: 'Withholding Tax Advisory', path: '/services/withholding-tax-advisory' },
  { label: 'Repatriation of Funds', path: '/services/repatriation-of-funds' },
  { label: 'Expatriate Taxation', path: '/services/expatriate-taxation' },
  { label: 'Tax Implications of Foreign Investments', path: '/services/foreign-investment-tax-implications' },
  { label: 'Handling NRI Tax Disputes and Appeals', path: '/services/handling-nri-tax-disputes' },
  { label: 'Tax Advisory on NRI Income', path: '/services/nri-income-tax-advisory' },
  { label: 'NRI Tax Filing Services', path: '/services/nri-tax-filing-services' },
  { label: 'Repatriation of Funds and Investments', path: '/services/repatriation-funds-investments' },
  { label: 'Managing Indian Assets for NRIs', path: '/services/managing-indian-assets-nris' },
  { label: 'NRI Banking and Financial Services', path: '/services/nri-banking-financial-services' },
  { label: 'Estate Planning for NRIs', path: '/services/estate-planning-nris' },
  { label: 'Power of Attorney (POA) Services for NRIs', path: '/services/poa-services-nris' },
  { label: 'NRI Loans and Mortgages', path: '/services/nri-loans-mortgages' },
  { label: 'Medical Insurance and Healthcare for NRIs', path: '/services/medical-insurance-nris' },

  //ROC Services
  // { label: 'Private Limited Company Registration', path: PAGE_PATH.private_limited_registration },
  // { label: 'Public Limited Company Registration', path: PAGE_PATH.public_limited_registration },
  // { label: 'One Person Company (OPC) Registration', path: PAGE_PATH.opc_registration },
  // { label: 'Limited Liability Partnership (LLP) Registration', path: PAGE_PATH.llp_registration },
  // { label: 'Section 8 Company (NGO) Registration', path: PAGE_PATH.section_8_registration },
  // { label: 'Producer Company Registration', path: PAGE_PATH.producer_company_registration },
  // { label: 'Foreign Company Registration (India)', path: PAGE_PATH.foreign_company_registration },
  { label: 'Annual Filing for Private Limited Company (AOC-4)', path: '/services/form-aoc-4' },
  { label: 'Annual Filing for Private Limited Company (MGT-7)', path: '/services/form-mgt-7' },
  { label: 'Annual Filing for LLP (Form 8 & Form 11)', path: '/services/form-8-LLP' },
  { label: 'Change in Directors (DIR-12)', path: '/services/form-dir-12' },
  { label: 'Issue of Share Certificates', path: '/services/issue-of-share-certificates' },
  // { label: 'Change in Registered Office Address (INC-22)', path: PAGE_PATH.change_registered_office },
  { label: 'Increase in Authorized Capital (SH-7)', path: '/services/form-sh-7' },
  // { label: 'MOA & AOA Amendments', path: PAGE_PATH.moa_aoa_amendment },
  { label: 'Closure of Company (Strike Off - STK-2)', path: '/services/form-stk-2' },
  // { label: 'Closure of LLP (Form 24)', path: PAGE_PATH.llp_closure },
  { label: 'Allotment of Shares (PAS-3)', path: '/services/formPAS3' },
  { label: 'Charge Creation & Modification (CHG-1, CHG-4)', path: '/services/form-chg-1' },
  { label: 'Change in Name of Company (INC-24)', path: '/services/form-inc-24' },
  // { label: 'Conversion of Private Limited to Public Limited', path: PAGE_PATH.conversion_pvt_to_public },
  // { label: 'Conversion of LLP to Private Limited', path: PAGE_PATH.conversion_llp_to_pvt },
  // { label: 'Director Identification Number (DIN) Application', path: PAGE_PATH.din_application },
  { label: 'DIN KYC Update (DIR-3 KYC)', path: '/services/form-dir-3-kyc' },
  // { label: 'Digital Signature Certificate (DSC) Application', path: PAGE_PATH.dsc_application },
  // { label: 'Merger & Acquisition Advisory', path: PAGE_PATH.merger_acquisition },
  // { label: 'Demerger Services', path: PAGE_PATH.demerger_services },
  // { label: 'Company Takeover & Buyback', path: PAGE_PATH.company_takeover },
  // { label: 'Conversion of Proprietorship to Private Limited', path: PAGE_PATH.proprietorship_to_pvt_ltd },
  // { label: 'Voluntary Winding Up of Company', path: PAGE_PATH.voluntary_winding_up },
  // { label: 'Insolvency & Bankruptcy Advisory', path: PAGE_PATH.insolvency_bankruptcy },
  // { label: 'Closure of Defunct Company (STK-2)', path: PAGE_PATH.defunct_company_closure },
  { label: 'ADT-1: Appointment of Auditor', path: '/services/form-adt-1' },
  { label: 'DPT-3: Return of Deposits', path: '/services/form-dpt-3' },

  // TDS Services
  { label: 'New TAN (Tax Deduction Account Number) Registration', path: '/services/new-tan-registration' },
  { label: 'TAN Amendment', path: '/services/tan-amendment' },
  { label: 'TAN Surrender', path: '/services/tan-surrender' },
  { label: 'TDS Payment & Challan Generation', path: '/services/tds-payment' },
  { label: 'Quarterly TDS Returns (Form 24Q & 26Q)', path: '/services/quarterly-tds-returns' },
  { label: 'Form 27Q Filing (Non-Resident Payments)', path: '/services/form-27q-filing' },
  { label: 'Form 27EQ Filing (TCS Return)', path: '/services/form-27eq-filing' },
  { label: 'Form 26QB Filing (TDS on Property Sale)', path: '/services/form-26qb-filing' },
  { label: 'Form 26QC Filing (TDS on Rent)', path: '/services/form-26qc-filing' },
  { label: 'Form 26QD Filing (TDS on Contract Payments)', path: '/services/form-26qd-filing' },
  { label: 'Form 16 Issuance (Salaried Employees)', path: '/services/form-16-issuance' },
  // { label: 'Form 16A Issuance (Non-Salary Income)', path: PAGE_PATH.form_16a },
  // { label: 'Form 16B Issuance (TDS on Property Sale)', path: PAGE_PATH.form_16b },
  // { label: 'Form 16C Issuance (TDS on Rent)', path: PAGE_PATH.form_16c },
  { label: 'Issuance of TCS Certificates (Form 27D)', path: '/services/issuance-tcs-certificates' },
  { label: 'TDS Return Correction & Revision', path: '/services/tds-return-correction' },
  { label: 'TDS/TCS Demand Notice Resolution', path: '/services/tds-tcs-demand-resolution' },
  { label: 'Form 26AS Reconciliation', path: '/services/form-26as-reconciliation' },
  { label: 'TDS Mismatch Resolution', path: '/services/tds-mismatch-resolution' },
  { label: 'TDS Exemption Certificate Filing', path: '/services/tds-exemption-certificate' },
  // { label: 'TDS Planning & Advisory', path: PAGE_PATH.tds_planning_advisory },
  { label: 'TDS Calculator', path: '/services/tds-calculator' },
  // { label: 'TDS Deduction Advisory', path: PAGE_PATH.tds_deduction_advisory },

  // Payroll & Compliance
  { label: 'Payroll ESI Registration', path: '/services/esi-registration' },
  { label: 'Payroll EPF Registration', path: '/services/epf-registration' },
  { label: 'Professional Tax (PT) Registration', path: '/services/professional-tax-registration' },
  { label: 'Labour License Registration', path: '/services/labour-license-registration' },
  { label: 'Group Insurance/Employee Insurance', path: '/services/group-insurance-registration' },
  { label: 'Employee Master Setup', path: '/services/employee-master' },
  { label: 'Offer Letter Generation', path: '/services/offer-letter' },
  { label: 'Employee Agreement Drafting', path: '/services/employee-agreement' },
  { label: 'Salary Structure Configuration', path: '/services/salary-structure-configuration' },
  { label: 'Attendance Management', path: '/services/attendance-management' },
  { label: 'TDS Calculation for Employees', path: '/services/tds-calculation' },
  { label: 'EPF Calculation', path: '/services/epf-calculation' },
  { label: 'ESI Calculation', path: '/services/esi-calculation' },
  { label: 'Gratuity Calculation', path: '/services/gratuity-calculation' },
  { label: 'PT Calculation', path: '/services/pt-calculation' },
  { label: 'Tax Computation for NRI Employees', path: '/services/tax-computation-nri' },
  { label: 'Salary Increment & Revision', path: '/services/salary-increment-revision' },
  { label: 'Monthly Payroll Generation', path: '/services/monthly-payroll-generation' },
  { label: 'Salary Slips Generation', path: '/services/salary-slips-generation' },
  { label: 'Direct Bank Payment Processing', path: '/services/direct-bank-payment' },
  { label: 'Multiple Salary Cycles Handling', path: '/services/multiple-salary-cycles' },
  { label: 'Form 16 Generation', path: '/services/generate-form16' },
  { label: 'Payslip Access', path: '/services/payslip-access' },
  { label: 'Leave Requests & Approvals', path: '/services/leave-requests-approvals' },
  { label: 'Tax Declaration Submission', path: '/services/tax-declaration' },
  { label: 'Profile Management', path: '/services/profile-management' },
  { label: 'Attendance & Overtime Tracking', path: '/services/attendance-overtime-tracking' },
  { label: 'Reimbursement Claims', path: '/services/reimbursement-claims' },
  { label: 'Loan Management for Employees', path: '/services/loan-management' },
  { label: 'EPF Filings', path: '/services/epf-filing' },
  { label: 'ESI Filings', path: '/services/esi-filing' },
  { label: 'Professional Tax (PT) Filings', path: '/services/professional-tax-filing' },
  { label: 'TDS Filings for Employees', path: '/services/tds-filing' },
  { label: 'Income Tax Return (ITR) Filing', path: '/services/income-tax-filing' },

  // Loans
  { label: 'Business Loans', path: '/services/business-loans' },
  { label: 'Personal Loans', path: '/services/personal-loans' },
  { label: 'LAP (Loan Against Property)', path: '/services/loan-against-property' },

  // Insurance
  { label: 'Life Insurance', path: '/services/life-insurance' },
  { label: 'Health Insurance', path: '/services/health-insurance' },
  { label: 'General Insurance', path: '/services/general-insurance' },
  { label: 'Business & Liability Insurance', path: '/services/business-liability-insurance' },
  { label: 'Property & Asset Insurance', path: '/services/property-asset-insurance' },

  //US Accounting, Taxation & Audits
  { label: 'US Accounting Services', path: '/services/us-accounting-services' },
  { label: 'US Taxation Services', path: '/services/us-taxation-service' },
  { label: 'US Audit & Assurance Services', path: '/services/us-audit-assurance-services' },

  //Investments
  { label: 'Investments', path: '/services/investments' },
  { label: 'Stock Market Investments', path: '/services/stock-market-investments' },
  { label: 'Mutual Funds & SIPs', path: '/services/mutual-funds-sips' },
  { label: 'Real Estate Investments', path: '/services/real-estate-investments' },
  { label: 'Retirement & Pension Planning', path: '/services/retirement-pension-planning' },
  { label: 'Alternative Investments', path: '/services/alternative-investments' },

  //Document Wallet
  { label: 'Document Wallet', path: '/services/document-wallet' },
  { label: 'Secure Digital Storage', path: '/services/secure-digital-storage' },
  { label: 'Document Categorization & Organization', path: '/services/document-categorization-organization' },
  { label: 'Compliance & Legal Document Storage', path: '/services/compliance-legal-document-storage' },
  { label: 'Digital Signature & Verification', path: '/services/digital-signature-verification' },
  { label: 'Document Sharing & Access Control', path: '/services/document-sharing-access-control' }
];

export default function Cta1({ bgImage, heading, captionLine, getStarted, search = false }) {
  const theme = useTheme();
  const router = useRouter();

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
