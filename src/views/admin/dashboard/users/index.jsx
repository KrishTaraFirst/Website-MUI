'use client';
import UserBehaviourTable from '@/sections/dashboard/analytics/user-behavior';
import AnalyticsBehaviorTable from './DataTable';
import ManageAccess from './manage-access';

export default function Dashboard({ tab }) {
  switch (tab) {
    case 'corporate-entities':
      return <CorporateEntity />;
    case 'service-providers':
      return <ServiceProvider />;
    case 'ca-firms':
      return <CAFirm />;
    case 'individual':
      return <Individual />;
    default:
      return <Individual />;
  }
}

function CorporateEntity() {
  return (
    <>
      <ManageAccess />
      <AnalyticsBehaviorTable type={'corporateEntity'} />
    </>
  );
}

function ServiceProvider() {
  return <UserBehaviourTable />;
}

function CAFirm() {
  return <AnalyticsBehaviorTable type={'caFirm'} />;
}

function Individual() {
  return <AnalyticsBehaviorTable type={'individual'} />;
}
