import React from 'react';
import { useProjectStore } from '../../store';
import { format } from 'date-fns';

function ProjectTimeline() {
  const { projects } = useProjectStore();

  // Trier les projets par date
  const sortedProjects = [...projects].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Timeline des projets</h3>
      
      <div className="relative">
        {/* Ligne de temps */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-6">
          {sortedProjects.map((project, index) => (
            <div key={project.id} className="relative pl-10">
              {/* Point sur la timeline */}
              <div className={`absolute left-2 w-4 h-4 rounded-full transform -translate-x-1/2 ${
                project.type === 'wedding' ? 'bg-violet-500' :
                project.type === 'studio' ? 'bg-cyan-500' :
                'bg-amber-500'
              }`}></div>

              {/* Contenu du projet */}
              <div className={`p-4 rounded-lg ${
                project.type === 'wedding' ? 'bg-violet-50' :
                project.type === 'studio' ? 'bg-cyan-50' :
                'bg-amber-50'
              }`}>
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{project.couple}</h4>
                  <span className="text-sm text-gray-600">
                    {format(new Date(project.date), 'dd/MM/yyyy')}
                  </span>
                </div>
                
                <div className="mt-2 text-sm text-gray-600">
                  <p>{project.type === 'wedding' ? 'Mariage' : 
                      project.type === 'studio' ? 'Séance Studio' : 
                      'Événement Corporate'}</p>
                  {'formula' in project && (
                    <p className="mt-1">{project.formula.name}</p>
                  )}
                </div>

                {/* Barre de progression */}
                {'tasks' in project && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            project.type === 'wedding' ? 'bg-violet-500' :
                            project.type === 'studio' ? 'bg-cyan-500' :
                            'bg-amber-500'
                          }`}
                          style={{ 
                            width: `${(project.tasks.filter(t => t.status === 'completed').length / 
                              project.tasks.length) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm">
                        {Math.round((project.tasks.filter(t => t.status === 'completed').length / 
                          project.tasks.length) * 100)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectTimeline;