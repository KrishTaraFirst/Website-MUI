import React, { useEffect, useState } from 'react';
import Factory from '@/utils/Factory';
import InvoiceNumberFormat from './InvoiceNumberFormat';

export default function TabFour({ businessDetails, handleBack }) {
  return (
    <>
      <InvoiceNumberFormat businessDetailsData={businessDetails} handleBack={handleBack} />
    </>
  );
}
