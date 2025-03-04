// @next
import dynamic from 'next/dynamic';

// @project
const AuthRegisterBusiness = dynamic(() => import('@/views/auth/businessRegister'));

/***************************  AUTH - REGISTER  ***************************/

export default function BusinessRegistration() {
  return <AuthRegisterBusiness />;
}
