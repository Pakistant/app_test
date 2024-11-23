import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useProjectStore } from '../../store';
import { staff } from '../../data/staff';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'fr': fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function TeamAvailability() {
  const { projects } = useProjectStore();

  // Créer les événements pour chaque membre de l'équipe
  const events = projects.flatMap(project => {
    if (!('tasks' in project)) return [];

    return project.tasks.map(task => ({
      id: task.id,
      title: `${project.couple} - ${task.title}`,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      resourceId: task.assignedTo,
      status: task.status
    }));
  });

  // Créer les ressources (membres de l'équipe)
  const resources = staff.map(member => ({
    id: member.id,
    title: member.name
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Disponibilités de l'équipe</h3>
      <div className="h-[600px]">
        <Calendar
          localizer={localizer}
          events={events}
          resources={resources}
          resourceIdAccessor="resourceId"
          views={['day', 'work_week', 'month']}
          defaultView="work_week"
          step={60}
          style={{ height: '100%' }}
          messages={{
            next: 'Suivant',
            previous: 'Précédent',
            today: 'Aujourd\'hui',
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour'
          }}
          eventPropGetter={event => ({
            className: `bg-${event.status === 'completed' ? 'green' : 'blue'}-600`
          })}
        />
      </div>
    </div>
  );
}

export default TeamAvailability;