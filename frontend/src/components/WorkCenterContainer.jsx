// components/WorkCenter/WorkCenterContainer.js
import React, { useState } from 'react';
import WorkCenterMain from './WorkCenterMain';
import WorkCenterDashboard from './WorkCenterDashboard';
import WorkCenterSetup from './WorkCenterSetup';
import TopNavbar from './TopNavbar';

const WorkCenterContainer = () => {
  const [activeView, setActiveView] = useState('main');
  const [workCenters, setWorkCenters] = useState([
    {
      id: 1,
      name: 'Frame Assembly',
      code: 'FA',
      type: 'Assembly',
      supervisor: 'John Smith',
      status: 'Running',
      utilization: 85,
      currentJob: 'CON-2023-101',
      lastMaintenance: '2023-05-15',
      nextMaintenance: '2023-08-15'
    },
    {
      id: 2,
      name: 'Belt Installation',
      code: 'BI',
      type: 'Installation',
      supervisor: 'Sarah Johnson',
      status: 'Idle',
      utilization: 60,
      currentJob: '',
      lastMaintenance: '2023-06-01',
      nextMaintenance: '2023-09-01'
    }
  ]);

  const addWorkCenter = (newWorkCenter) => {
    setWorkCenters([...workCenters, { ...newWorkCenter, id: workCenters.length + 1 }]);
  };

  const updateWorkCenter = (updatedWorkCenter) => {
    setWorkCenters(workCenters.map(wc => 
      wc.id === updatedWorkCenter.id ? updatedWorkCenter : wc
    ));
  };

  return (
    <>
    <TopNavbar/>
    <div className="app-container">
      <div className="work-center-nav">
        <button 
          className={activeView === 'main' ? 'active' : ''}
          onClick={() => setActiveView('main')}
        >
          Work Centers
        </button>
        <button 
          className={activeView === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveView('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeView === 'setup' ? 'active' : ''}
          onClick={() => setActiveView('setup')}
        >
          Setup
        </button>
      </div>
      
      <div className="work-center-content">
        {activeView === 'main' && (
          <WorkCenterMain 
            workCenters={workCenters} 
            onUpdate={updateWorkCenter} 
          />
        )}
        {activeView === 'dashboard' && (
          <WorkCenterDashboard 
            workCenters={workCenters} 
            onStatusChange={updateWorkCenter} 
          />
        )}
        {activeView === 'setup' && (
          <WorkCenterSetup 
            workCenters={workCenters} 
            onAdd={addWorkCenter} 
            onUpdate={updateWorkCenter} 
          />
        )}
      </div>
    </div>
    </>
  );
};

export default WorkCenterContainer;
