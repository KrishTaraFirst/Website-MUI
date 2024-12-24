// @next
import dynamic from 'next/dynamic';

// @project
const AuthLayout = dynamic(() => import('@/layouts/AuthLayout'));
const AuthLogin = dynamic(() => import('@/views/auth/login'));
const Landing = dynamic(() => import('@/views/landings/ai/index'));
const Layout = dynamic(() => import('@/views/landings/ai/layout'));

/***************************  MAIN - DEFAULT PAGE  ***************************/

export default function Home() {
  return (
    // <h1>Hello</h1>
    <Layout>
      <Landing />
    </Layout>
    //   <AuthLogin />
    // </AuthLayout>
  );
}
