'use client';
import Individual from './individual';
import SuperAdmin from './superAdmin';
import CorporateEntity from './corporate';
import ServiceProvider from './serviceProvider';
import useCurrentUser from '@/hooks/useCurrentUser';
import { AuthRole } from '@/enum';

export default function UserDashboard() {
  const { userData } = useCurrentUser();
  switch (userData.role) {
    case AuthRole.SUPER_ADMIN:
      return <SuperAdmin />;
    case AuthRole.ADMIN:
      return <CorporateEntity />;
    case AuthRole.SERVICE_PROVIDER:
      return <ServiceProvider />;
    case AuthRole.USER:
      return <Individual />;
    default:
      return <Individual />;
  }
}
