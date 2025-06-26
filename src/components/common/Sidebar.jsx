import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <div className="sidebar-header">
          <h3>Navigation</h3>
        </div>
        
        <ul className="sidebar-menu">
          <li>
            <NavLink 
              to="/dashboard" 
              end
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Dashboard
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/dashboard/api-access"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              API Access
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/dashboard/subscription"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Subscription
            </NavLink>
          </li>
          
          {user && (
            <>
              <li>
                <NavLink 
                  to="/documentation"
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  Documentation
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/profile"
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;