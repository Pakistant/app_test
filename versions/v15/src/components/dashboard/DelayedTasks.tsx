import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';
import { useProjectStore } from '../../store';
import { format } from 'date-fns';

function DelayedTasks() {
  const { projects } = useProjectStore();

  // Récupérer toutes les tâches en retard de tous les projets
  const delayedTasks = projects.flatMap(project => {
    if (!('tasks' in project)) return [];
    
    const today = new Date();
    return project.tasks
      .filter(task => {
        const dueDate = new Date(task.dueDate);
        return task.status !== 'completed' && dueDate < today;
      })
      .map(task => ({
        ...task,
        projectName: project.couple,
        projectId: project.id,
        projectType: project.type,
        daysLate: Math.floor((today.getTime() - new Date(task.dueDate).getTime()) / (1000 * 60 * 60 * 24))
      }));
  });

  if (delayedTasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center text-gray-500 py-8">
          <p>Aucune tâche en retard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="text-red-500" size={20} />
          <h2 className="text-lg font-semibold">Tâches en retard ({delayedTasks.length})</h2>
        </div>
      </div>

      <div className="divide-y">
        {delayedTasks.map(task => (
          <div key={task.id} className="p-4 hover:bg-red-50">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium">{task.projectName}</h3>
                <p className="text-sm text-gray-600">{task.title}</p>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <Clock size={16} />
                <span className="text-sm font-medium">
                  {task.daysLate} {task.daysLate > 1 ? 'jours' : 'jour'} de retard
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span>Assigné à: {task.assignedTo}</span>
                <span>•</span>
                <span>Échéance: {format(new Date(task.dueDate), 'dd/MM/yyyy')}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority === 'high' ? 'Haute' :
                 task.priority === 'medium' ? 'Moyenne' : 'Basse'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DelayedTasks;