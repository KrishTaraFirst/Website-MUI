'use client';
import UserBehaviourTable from '@/sections/dashboard/analytics/user-behavior';
import HomeCard from '@/components/cards/HomeCard';

export default function Individual() {
  return (
    <HomeCard title="Individual" tagline="Individual Dashbord">
      <UserBehaviourTable />
    </HomeCard>
  );
}
