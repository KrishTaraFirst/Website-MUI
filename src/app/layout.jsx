import PropTypes from 'prop-types';
import './globals.css';
import branding from '@/branding.json';
import ProviderWrapper from './ProviderWrapper';
import ReduxProvider from '../providers/ReduxProvider';

export const viewport = {
  userScalable: false
};

export const metadata = {
  title: `${branding.brandName}`,
  description: `${branding.brandName} Finance and Solutions`
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ProviderWrapper>{children}</ProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.any };
