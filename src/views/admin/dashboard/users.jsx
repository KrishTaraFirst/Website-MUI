'use client';
import UserBehaviourTable from '@/sections/dashboard/analytics/user-behavior';
import AnalyticsBehaviorTable from '@/sections/dashboard/analytics/user-behavior/AnalyticsBehaviorTable';

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
  return <AnalyticsBehaviorTable />;
}

function ServiceProvider() {
  return <UserBehaviourTable />;
}

function CAFirm() {
  return <AnalyticsBehaviorTable />;
}

function Individual() {
  return <AnalyticsBehaviorTable />;
}
