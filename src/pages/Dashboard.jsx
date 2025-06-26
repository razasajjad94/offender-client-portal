import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';

const Dashboard = () => {
  return (
    <div className="dashboard-grid">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;