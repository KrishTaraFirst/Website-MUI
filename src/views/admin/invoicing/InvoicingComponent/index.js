'use client';
import React, { useState, useEffect } from 'react';
import AddInvoice from '../InvoicingComponent/AddInvoice';
import Factory from '@/utils/Factory';
import { useSearchParams } from 'next/navigation';
import { IconDivide } from '@tabler/icons-react';

function Index() {
  const [invoicesList, setInvoicesList] = useState([]);
  const [businessDetails, setBusinessDetails] = useState({});
  const [customers, setCustomers] = useState([]);
  const [invoiceNumberFormat, setInvoiceNumberFormat] = useState('');
  const [itemsList, setItemsList] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const searchParams = useSearchParams();
  const invoiceId = searchParams.get('id');

  const fetchBusinessDetails = async () => {
    try {
      const { res } = await Factory('get', '/invoicing/invoicing-profiles/', {});
      if (res) {
        setBusinessDetails({ ...res.data, state: 'Telangana' });
      }
    } catch (error) {
      console.error('Failed to fetch business details:', error);
    }
  };

  // Fetch Invoices List
  const getInvoicesList = async () => {
    if (businessDetails?.id) {
      const { res } = await Factory('get', `/invoicing/invoice-retrieve/${businessDetails?.id}`, {});
      if (res.status_cd === 0) {
        setInvoicesList(res.data.invoices);
      }
    }
  };

  // Fetch Customers Data
  const getCustomersData = async () => {
    const { res } = await Factory('get', '/invoicing/customer_profiles/', {});
    if (res.status_cd === 0) {
      setCustomers(res.data.customer_profiles);
    }
  };
  const get_Goods_and_Services_Data = async () => {
    let url = `/invoicing/goods-services/${businessDetails?.id}`;
    const { res } = await Factory('get', url, {});

    if (res.status_cd === 0) {
      setItemsList(res.data.goods_and_services);
    }
  };
  // Fetch Invoice Number Format
  const getInvoiceFormat = async () => {
    const { res } = await Factory('get', `/invoicing/latest/${businessDetails?.id}/`, {});
    if (res.status_cd === 0) {
      setInvoiceNumberFormat(res.data.latest_invoice_number);
    }
  };
  const get_Individual_Invoice_Data = async () => {
    const { res } = await Factory('get', `/invoicing/individual-invoice/${invoiceId}/`, {});
    if (res.status_cd === 0) {
      setSelectedInvoice({ ...res.data });
    } else {
      console.log('Failed to fetch  details');
    }
  };
  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  useEffect(() => {
    if (businessDetails?.id) {
      get_Goods_and_Services_Data();
    }
  }, [businessDetails]);
  useEffect(() => {
    if (businessDetails?.id && !invoiceId) {
      //   getInvoicesList();
      getInvoiceFormat();
    }
  }, [businessDetails]);
  useEffect(() => {
    getCustomersData();
  }, []);
  useEffect(() => {
    if (invoiceId) {
      get_Individual_Invoice_Data();
    }
  }, [invoiceId]);

  return (
    <AddInvoice
      invoicesList={invoicesList}
      businessDetailsData={businessDetails}
      customers={customers}
      invoice_number_format={invoiceNumberFormat}
      itemsList={itemsList}
      selectedInvoice={selectedInvoice}
    />
  );
}

export default Index;
