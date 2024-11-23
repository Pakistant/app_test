import React, { useState } from 'react';
import { Clock, MessageSquare, Tag, Users, Plus, Timer, Link } from 'lucide-react';
import { Task, SubTask, Comment } from '../types';
import { useProjectStore } from '../store';
import { format } from 'date-fns';

interface TaskDetailsProps {
  task: Task;
  projectId: number;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

function TaskDetails({ task, projectId }: TaskDetailsProps) {
  const { updateTask, projects } = useProjectStore();
  const [newComment, setNewComment] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newSubTask, setNewSubTask] = useState('');
  const [showTimeTracking, setShowTimeTracking] = useState(false);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: 'current-user',
      createdAt: new Date().toISOString(),
      mentions: extractMentions(newComment)
    };

    updateTask(projectId, task.id, {
      ...task,
      comments: [...task.comments, comment]
    });

    setNewComment('');
  };

  const extractMentions = (text: string): string[] => {
    const mentions = text.match(/@[\w-]+/g) || [];
    return mentions.map(mention => mention.substring(1));
  };

  const handleAddSubTask = () => {
    if (!newSubTask.trim()) return;

    const subTask: SubTask = {
      id: Date.now().toString(),
      title: newSubTask,
      status: 'pending',
      assignedTo: [],
      estimatedTime: 0,
      actualTime: 0
    };

    updateTask(projectId, task.id, {
      ...task,
      subTasks: [...task.subTasks, subTask]
    });

    setNewSubTask('');
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    updateTask(projectId, task.id, {
      ...task,
      tags: [...task.tags, newTag.trim()]
    });

    setNewTag('');
  };

  const handleUpdatePriority = (priority: Task['priority']) => {
    updateTask(projectId, task.id, { ...task, priority });
  };

  const handleTimeUpdate = (type: 'estimated' | 'actual', value: number) => {
    updateTask(projectId, task.id, {
      ...task,
      [type === 'estimated' ? 'estimatedTime' : 'actualTime']: value
    });
  };

  const handleSubTaskStatusChange = (subTaskId: string, status: SubTask['status']) => {
    const updatedSubTasks = task.subTasks.map(st =>
      st.id === subTaskId ? { ...st, status } : st
    );

    updateTask(projectId, task.id, { ...task, subTasks: updatedSubTasks });
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{task.title}</h3>
        <div className="flex items-center gap-2">
          <select
            value={task.priority}
            onChange={(e) => handleUpdatePriority(e.target.value as Task['priority'])}
            className={`px-2 py-1 rounded-full text-sm ${priorityColors[task.priority]}`}
          >
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </div>
      </div>

      {/* Temps et assignation */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <span className="text-sm">
            Échéance: {format(new Date(task.dueDate), 'dd/MM/yyyy')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Timer size={16} className="text-gray-500" />
          <button
            onClick={() => setShowTimeTracking(!showTimeTracking)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Suivi du temps
          </button>
        </div>
      </div>

      {/* Suivi du temps */}
      {showTimeTracking && (
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temps estimé (minutes)
            </label>
            <input
              type="number"
              value={task.estimatedTime || 0}
              onChange={(e) => handleTimeUpdate('estimated', parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temps réel (minutes)
            </label>
            <input
              type="number"
              value={task.actualTime || 0}
              onChange={(e) => handleTimeUpdate('actual', parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Sous-tâches */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">Sous-tâches</h4>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newSubTask}
              onChange={(e) => setNewSubTask(e.target.value)}
              placeholder="Nouvelle sous-tâche..."
              className="px-3 py-1 border rounded-lg text-sm"
            />
            <button
              onClick={handleAddSubTask}
              className="text-blue-600 hover:text-blue-700"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {task.subTasks.map(subTask => (
            <div key={subTask.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <select
                  value={subTask.status}
                  onChange={(e) => handleSubTaskStatusChange(subTask.id, e.target.value as SubTask['status'])}
                  className="text-sm border rounded"
                >
                  <option value="pending">À faire</option>
                  <option value="in_progress">En cours</option>
                  <option value="completed">Terminé</option>
                </select>
                <span className={subTask.status === 'completed' ? 'line-through text-gray-500' : ''}>
                  {subTask.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-500" />
                <span className="text-sm text-gray-500">
                  {subTask.assignedTo.length} assigné(s)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">Tags</h4>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Nouveau tag..."
              className="px-3 py-1 border rounded-lg text-sm"
            />
            <button
              onClick={handleAddTag}
              className="text-blue-600 hover:text-blue-700"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {task.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Dépendances */}
      <div>
        <h4 className="font-medium mb-2">Dépendances</h4>
        <div className="space-y-2">
          {task.dependencies.map(depId => {
            const dependentTask = projects
              .find(p => p.id === projectId)
              ?.tasks.find(t => t.id === depId);
            
            return dependentTask && (
              <div key={depId} className="flex items-center gap-2 text-sm">
                <Link size={16} className="text-gray-500" />
                <span>{dependentTask.title}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  dependentTask.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {dependentTask.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commentaires */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={16} className="text-gray-500" />
          <h4 className="font-medium">Commentaires</h4>
        </div>
        <div className="space-y-4">
          {task.comments.map(comment => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{comment.author}</span>
                <span className="text-sm text-gray-500">
                  {format(new Date(comment.createdAt), 'dd/MM/yyyy HH:mm')}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">
                {comment.text.split(/@[\w-]+/).map((text, i, arr) => (
                  <React.Fragment key={i}>
                    {text}
                    {i < arr.length - 1 && (
                      <span className="text-blue-600">
                        @{comment.mentions[i]}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire... (@mention pour notifier)"
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;