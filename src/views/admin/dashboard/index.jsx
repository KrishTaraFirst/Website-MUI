'use client';
import Individual from './individual';
import SuperAdmin from './superAdmin';
import CorporateEntity from './corporate';
import ServiceProvider from './serviceProvider';
import useCurrentUser from '@/hooks/useCurrentUser';
import { AuthRole } from '@/enum';

export default function UserDashboard() {
  const { userData } = useCurrentUser();
  console.log(userData.role);
  switch (userData.role) {
    case AuthRole.SUPER_ADMIN:
      return <SuperAdmin />;
    case AuthRole.CORPORATE_ADMIN:
      return <CorporateEntity />;
    case AuthRole.SERVICE_PROVIDER:
      return <ServiceProvider />;
    case AuthRole.INDIVIDUAL:
      return <Individual />;
    default:
      return <Individual />;
  }
}
