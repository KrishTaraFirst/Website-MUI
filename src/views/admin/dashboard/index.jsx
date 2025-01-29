'use client';
import Individual from './individual';
import SuperAdmin from './superAdmin';
import CorporateEntity from './corporate';
import CAFirm from './cafirm';
import ServiceProvider from './serviceProvider';
import useCurrentUser from '@/hooks/useCurrentUser';
import { AuthRole } from '@/enum';

export default function UserDashboard() {
  const { userData } = useCurrentUser();
  switch (userData.role) {
    case AuthRole.SUPER_ADMIN:
      return <SuperAdmin />;
    case AuthRole.CORPORATE_ADMIN:
      return <CorporateEntity />;
    case AuthRole.CHARTED_ACCOUNTANT_FIRM:
      return <CAFirm />;
    case AuthRole.SERVICE_PROVIDER:
      return <ServiceProvider />;
    case AuthRole.INDIVIDUAL:
      return <Individual />;
    default:
      return <Individual />;
  }
}
