import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useProjectStore } from '../../store';
import { Project } from '../../types';

const columns = [
  { id: 'a_venir', title: 'À venir' },
  { id: 'en_cours', title: 'En cours' },
  { id: 'en_retard', title: 'En retard' },
  { id: 'termine', title: 'Terminé' }
];

function KanbanView() {
  const { projects, updateProjectStatus } = useProjectStore();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const projectId = parseInt(result.draggableId);
    const newStatus = result.destination.droppableId as Project['status'];
    
    updateProjectStatus(projectId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(column => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <div className="bg-gray-100 rounded-lg p-4">
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
                              <p className="text-sm text-gray-500">{project.date}</p>
                              <div className="mt-2 flex gap-2">
                                {project.tags?.map(tag => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

export default KanbanView;