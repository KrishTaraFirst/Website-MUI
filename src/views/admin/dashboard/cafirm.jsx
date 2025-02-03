'use client';
import UserBehaviourTable from '@/sections/dashboard/analytics/user-behavior';
import HomeCard from '@/components/cards/HomeCard';

export default function CAFirm() {
  return (
    <HomeCard title="CA Firm" tagline="Charted Accountant Dashbord">
      <UserBehaviourTable />
    </HomeCard>
  );
}
