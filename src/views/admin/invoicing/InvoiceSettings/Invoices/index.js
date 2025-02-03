import React, { useEffect, useState } from 'react';
import Factory from '@/utils/Factory';
import InvoiceNumberFormat from './InvoiceNumberFormat';

export default function TabFour({ businessDetails, handleBack }) {
  const [open, setOpen] = useState(false);
  const [invoicesList, setInvoicesList] = useState([]);
  const [invoiceNumberFormatDialogue, setInvoiceNumberFormatDialogue] = useState(false);

  const getInvoicesList = async () => {
    let url = `/invoicing/invoice-retrieve/${businessDetails.id}`;
    const { res } = await Factory('get', url, {});
    if (res.status_cd === 0) {
      setInvoicesList(res.data.invoices);
    }
  };
  useEffect(() => {
    getInvoicesList();
  }, []);
  return (
    <>
      <InvoiceNumberFormat
        businessDetailsData={businessDetails}
        setInvoiceNumberFormatDialogue={setInvoiceNumberFormatDialogue}
        handleBack={handleBack}
      />
    </>
  );
}
