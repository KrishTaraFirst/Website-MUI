// @next
import dynamic from 'next/dynamic';

// @project
const Activation = dynamic(() => import('@/views/auth/activation'));

/***************************  AUTH - LOGIN  ***************************/

export default function Login() {
  return <Activation />;
}
