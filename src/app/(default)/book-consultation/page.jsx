import dynamic from 'next/dynamic';

const Consultation = dynamic(() => import('@/views/landings/default/book-consultation'));

/***************************  BLOCK - COMING SOON  ***************************/

export default function BookConsultation() {
  return <Consultation />;
}
