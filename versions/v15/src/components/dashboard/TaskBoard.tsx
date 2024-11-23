import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useProjectStore } from '../../store';
import { format } from 'date-fns';

const columns = [
  { id: 'a_venir', title: 'À venir', color: 'bg-yellow-100' },
  { id: 'en_cours', title: 'En cours', color: 'bg-blue-100' },
  { id: 'en_retard', title: 'En retard', color: 'bg-red-100' },
  { id: 'termine', title: 'Terminé', color: 'bg-green-100' }
];

function TaskBoard() {
  const { projects, updateProjectStatus } = useProjectStore();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const projectId = parseInt(result.draggableId);
    const newStatus = result.destination.droppableId;
    
    updateProjectStatus(projectId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map(column => (
          <div key={column.id} className={`${column.color} rounded-lg p-4`}>
            <h3 className="font-medium mb-4">{column.title}</h3>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3"
                >
                  {projects
                    .filter(project => project.status === column.id)
                    .map((project, index) => (
                      <Draggable
                        key={project.id}
                        draggableId={project.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded-lg shadow-sm"
                          >
                            <h4 className="font-medium">{project.couple}</h4>
                            <p className="text-sm text-gray-500">
                              {format(new Date(project.date), 'dd/MM/yyyy')}
                            </p>
                            {'formula' in project && (
                              <p className="text-xs text-gray-600 mt-1">
                                {project.formula.name}
                              </p>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

export default TaskBoard;