'use client';
import UserBehaviourTable from '@/sections/dashboard/analytics/user-behavior';
import HomeCard from '@/components/cards/HomeCard';

export default function CorporateEntity() {
  return (
    <HomeCard title="Corporate Entity" tagline="Corporate Entity Dashbord">
      <UserBehaviourTable />
    </HomeCard>
  );
}
