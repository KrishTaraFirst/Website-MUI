import React, { useEffect, useState } from 'react';
import Factory from '@/utils/Factory';
import InvoiceNumberFormat from './InvoiceNumberFormat';
import { useRouter } from 'next/navigation';
import { Button, Box } from '@mui/material';

export default function TabFour({ businessDetails, handleNext, handleBack }) {
  return (
    <>
      <InvoiceNumberFormat businessDetailsData={businessDetails} handleBack={handleBack} />
    </>
  );
}
