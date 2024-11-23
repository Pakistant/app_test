import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useProjectStore } from '../../store';
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

function CalendarOverview() {
  const { projects } = useProjectStore();

  const events = projects.flatMap(project => {
    // Événement principal
    const mainEvent = {
      id: `project-${project.id}`,
      title: project.couple,
      start: new Date(project.date),
      end: new Date(project.date),
      allDay: true,
      resource: project
    };

    // Événements pour chaque tâche
    const taskEvents = 'tasks' in project ? project.tasks.map(task => ({
      id: task.id,
      title: `${project.couple} - ${task.title}`,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      allDay: true,
      resource: { ...task, projectId: project.id }
    })) : [];

    return [mainEvent, ...taskEvents];
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="h-[600px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          views={['month', 'week', 'day']}
          messages={{
            next: 'Suivant',
            previous: 'Précédent',
            today: 'Aujourd\'hui',
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour'
          }}
          eventPropGetter={(event) => ({
            className: event.id.startsWith('project-')
              ? 'bg-blue-600 border-blue-700'
              : 'bg-green-500 border-green-600'
          })}
        />
      </div>
    </div>
  );
}

export default CalendarOverview;