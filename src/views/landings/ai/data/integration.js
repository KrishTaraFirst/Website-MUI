// @project
import { PAGE_PATH } from '@/path';

// const tagList = [
//   {
//     label: 'Slack',
//     icon: ''
//   },
//   {
//     label: 'Abstract',
//     icon: 'tabler-brand-abstract'
//   },
//   {
//     label: 'Asana',
//     icon: 'tabler-brand-asana'
//   },
//   {
//     label: 'Back Bone',
//     icon: 'tabler-brand-backbone'
//   },
//   {
//     label: 'Intercom',
//     icon: 'tabler-brand-intercom'
//   },
//   {
//     label: 'Master Card',
//     icon: 'tabler-brand-mastercard'
//   },
//   {
//     label: 'Skype',
//     icon: 'tabler-brand-skype'
//   },
//   {
//     label: 'Google Drive',
//     icon: 'tabler-brand-google-drive'
//   },
//   {
//     label: 'Tripadvisor',
//     icon: 'tabler-brand-tripadvisor'
//   },
//   {
//     label: 'Facebook Messenger',
//     icon: 'tabler-brand-messenger'
//   },
//   {
//     label: 'Paypal',
//     icon: 'tabler-brand-paypal'
//   }
// ];

const tagListLine1 = [
  { label: 'Business Registration Services', icon: '' },
  { label: 'Licences & Registrations', icon: '' },
  { label: 'Financial Certifications', icon: '' },
  { label: 'Tax Certifications', icon: '' },
  { label: 'Business Certifications', icon: '' },
  { label: 'Statutory & Compliance Certifications', icon: '' },
  { label: 'Certifications for Individuals', icon: '' }
];

const tagListLine2 = [
  { label: 'GST Registration', icon: '' },
  { label: 'GST Filings & Reconciliation', icon: '' },
  { label: 'GST Audits', icon: '' },
  { label: 'Income Tax Filings', icon: '' },
  { label: 'Income Tax Appeals', icon: '' },
  { label: 'Income Tax Notices', icon: '' }
];

const tagListLine3 = [
  { label: 'Tax Planning & Investment Advisory', icon: '' },
  { label: 'International Taxation Services', icon: '' },
  { label: 'NRI Support Center', icon: '' },
  { label: 'RoC Compliance', icon: '' },
  { label: 'RoC Filings', icon: '' }
];

const tagListLine4 = [
  { label: 'TDS', icon: '' },
  { label: 'Payroll Preparation', icon: '' },
  { label: 'Payroll Processing', icon: '' },
  { label: 'Employee Self Service Portal', icon: '' },
  { label: 'Accounting & Bookkeeping', icon: '' },
  { label: 'US Accounting, Taxation & Audits', icon: '' }
];

const tagListLine5 = [
  { label: 'Virtual CFO', icon: '' },
  { label: 'Loans', icon: '' },
  { label: 'Advisory Services', icon: '' },
  { label: 'Insurance', icon: '' },
  { label: 'Investments', icon: '' },
  { label: 'Document Wallet', icon: '' },
  { label: 'Document Drafting', icon: '' },
  { label: 'Operating System for Visa Consultants', icon: '' },
  { label: 'Office Workflow Automation', icon: '' }
];

const marquee1 = [...tagListLine1];
const marquee2 = [...tagListLine2].reverse();
const marquee3 = [...tagListLine3].sort((a, b) => a.label.localeCompare(b.label));
const marquee4 = [...tagListLine4].sort((a, b) => a.label.localeCompare(b.label)).reverse();
const marquee5 = [...tagListLine5].sort((a, b) => b.label.localeCompare(a.label)).reverse();

const marquees = [
  {
    id: 'marquee1',
    marqueeProps: { speed: 20, direction: 'left' },
    data: marquee1
  },
  {
    id: 'marquee2',
    marqueeProps: { speed: 30, direction: 'right' },
    data: marquee2
  },
  {
    id: 'marquee3',
    marqueeProps: { speed: 35, direction: 'left' },
    data: marquee3
  },
  {
    id: 'marquee4',
    marqueeProps: { speed: 40, direction: 'right' },
    data: marquee4
  },
  {
    id: 'marquee3',
    marqueeProps: { speed: 45, direction: 'left' },
    data: marquee5
  }
];

export const integration = {
  headLine: 'Embrace Complete Financial Control with Tara.',
  captionLine:
    'Tara is here to simplify the complexities of financial management with a fresh perspective and an eye on innovation. We’re on a mission to transform the financial landscape, empowering everyone to take control with confidence and ease.',
  // primaryBtn: { children: '', href: PAGE_PATH.integration, target: '_blank', rel: 'noopener noreferrer' },
  marquees
};
