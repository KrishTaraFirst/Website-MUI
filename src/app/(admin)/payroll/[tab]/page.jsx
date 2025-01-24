import PropTypes from 'prop-types';
// @next
import dynamic from 'next/dynamic';

// @project
const PayrollComponent = dynamic(() => import('@/views/admin/payroll'));

const Organizationdetails = dynamic(() => import('@/views/admin/payroll/Payrollsettings/Organizationdetails'));
const Worklocation = dynamic(() => import('@/views/admin/payroll/Payrollsettings/Worklocation'));
const Departments = dynamic(() => import('@/views/admin/payroll/Payrollsettings/Departments'));
const Designations = dynamic(() => import('@/views/admin/payroll/Payrollsettings/Designations'));
const StatuitoryComponents = dynamic(() => import('@/views/admin/payroll/Payrollsettings/StatuitoryComponents'));
const SalaryComponents = dynamic(() => import('@/views/admin/payroll/Payrollsettings/SalaryComponents'));
const SalaryTemplate = dynamic(() => import('@/views/admin/payroll/Payrollsettings/SalaryTemplate'));
const AddEmployee = dynamic(() => import('@/views/admin/payroll/PayrollDashboard/AddEmployee'));

export default async function Dashboard({ params }) {
  const { tab } = await params;
  console.log(tab);

  return (
    <>
      {['organization_details'].includes(tab) ? (
        <Organizationdetails tab={tab} />
      ) : ['set_up_work_location'].includes(tab) ? (
        <Worklocation tab={tab} />
      ) : ['set_up_departments'].includes(tab) ? (
        <Departments tab={tab} />
      ) : ['set_up_designations'].includes(tab) ? (
        <Designations tab={tab} />
      ) : ['set_up_statutory_components'].includes(tab) ? (
        <StatuitoryComponents tab={tab} />
      ) : ['set_up_salary_components'].includes(tab) ? (
        <SalaryComponents tab={tab} />
      ) : ['set_up_salary_template'].includes(tab) ? (
        <SalaryTemplate tab={tab} />
      ) : ['add-employee'].includes(tab) ? (
        <AddEmployee tab={tab} />
      ) : (
        <PayrollComponent tab={tab} />
      )}
    </>
  );
}

export async function generateStaticParams() {
  const response = [
    'organization_details',
    'set_up_work_location',
    'set_up_departments',
    'set_up_designations',
    'set_up_statutory_components',
    'set_up_salary_components',
    'set_up_salary_template',
    'add-employee'
  ];

  return response.map((tab) => ({
    tab: tab
  }));
}

Dashboard.propTypes = { params: PropTypes.object };
