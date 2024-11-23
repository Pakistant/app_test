import React, { useState } from 'react';
import { Search, Archive, Home, List, Calendar, Clock, Grid, Table } from 'lucide-react';
import ProjectList from './ProjectList';
import ProjectGrid from './ProjectGrid';
import ProjectCalendar from './ProjectCalendar';
import QuickStats from './dashboard/QuickStats';
import QuickFilters from './dashboard/QuickFilters';
import DelayedTasks from './dashboard/DelayedTasks';
import ImportExportProjects from './ImportExportProjects';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store';

function Dashboard() {
  // ... reste du code existant ...

  return (
    <div className="space-y-6">
      {/* ... autres composants ... */}

      {/* Tâches en retard */}
      <DelayedTasks />

      {/* ... reste des composants ... */}
    </div>
  );
}

export default Dashboard;