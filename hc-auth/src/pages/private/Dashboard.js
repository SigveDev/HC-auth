import './styles/Dashboard.css';
import React, { useEffect } from 'react';

import DashboardHeader from '../../components/DashboardHeader';
import ListAppReg from '../../components/ListAppReg';
import ListAuthLogins from '../../components/ListAuthLogins';

const Dashboard = ({ account }) => {
    useEffect(() => {
        if (account === "error") {
            window.location.href = "/login";
        }
    }, [account]);

    return (
      <div className='Dashboard'>
          <DashboardHeader account={account} />
          <main>
              <h1 className='dbHeader'>Dashboard</h1>
              <p className='welcome'>Welcome to the dashboard, <span>{account.name}</span>!</p>

              <ListAppReg account={account} />
              <ListAuthLogins account={account} />
          </main>
      </div>
    );
}

export default Dashboard;
