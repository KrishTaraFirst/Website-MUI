'use client';
import React, { useState } from 'react';
import InvoicingComponent from './InvoicingComponent';
import InvoiceSettings from './InvoiceSettings';
function index() {
  const [isValid, setIsValid] = useState(true);
  return <div>{isValid ? <InvoicingComponent isValid={isValid} setIsValid={setIsValid} /> : <InvoiceSettings />}</div>;
}

export default index;
