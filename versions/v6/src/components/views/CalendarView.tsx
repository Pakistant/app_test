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

function CalendarView() {
  const { projects } = useProjectStore();

  const events = projects.flatMap(project => {
    // Événement principal du mariage
    const mainEvent = {
      id: `wedding-${project.id}`,
      title: `Mariage ${project.couple}`,
      start: new Date(project.date),
      end: new Date(project.date),
      allDay: true,
      resource: project
    };

    // Événements pour chaque tâche
    const taskEvents = project.tasks.map(task => ({
      id: task.id,
      title: task.title,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      allDay: true,
      resource: { ...task, projectId: project.id }
    }));

    return [mainEvent, ...taskEvents];
  });

  return (
    <div className="h-[600px] bg-white rounded-lg shadow-sm p-4">
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
        eventPropGetter={(event) => {
          const isWedding = event.id.startsWith('wedding-');
          return {
            className: isWedding 
              ? 'bg-purple-600 border-purple-700'
              : 'bg-blue-500 border-blue-600'
          };
        }}
      />
    </div>
  );
}

export default CalendarView;