export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: string;
  daysOffset: number;
  priority: 'low' | 'medium' | 'high';
  comments: Comment[];
  tags: string[];
  completedDate?: string;
  estimatedTime?: number;
  actualTime?: number;
  subTasks: SubTask[];
  dependencies: string[];
}

export interface SubTask {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: string[];
  estimatedTime: number;
  actualTime: number;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  mentions: string[];
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ActivityLog {
  id: string;
  type: string;
  description: string;
  user: string;
  timestamp: string;
  details?: any;
}

export interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Filter {
  weddingType: string[];
  formula: string[];
  status: string[];
  search: string;
  date: string | null;
  priority: string[];
  tags: string[];
}

export interface Formula {
  id: string;
  name: string;
  type: 'photo_video' | 'photo' | 'video';
  description: string;
  tasks: {
    title: string;
    daysOffset: number;
    assignedTo: string;
    priority?: 'low' | 'medium' | 'high';
  }[];
}

export interface Staff {
  id: string;
  name: string;
  role: string[];
}

export interface BaseProject {
  id: number;
  couple: string;
  date: string;
  email: string;
  phone: string;
  country: string;
  deliveryDays: number;
  status: 'en_cours' | 'en_retard' | 'termine' | 'a_venir';
  notes?: string;
  tags: string[];
  activityLog: ActivityLog[];
  documents: Document[];
  seasonId: string;
  priority: 'low' | 'medium' | 'high';
}

export interface WeddingProject extends BaseProject {
  type: 'wedding';
  weddingType: 'french' | 'cameroonian';
  location: string;
  formula: {
    type: 'photo_video' | 'photo' | 'video';
    hasTeaser: boolean;
    hasAlbum: boolean;
    name: string;
  };
  tasks: Task[];
}

export interface StudioProject extends BaseProject {
  type: 'studio';
  sessionType: 'portrait' | 'couple' | 'family' | 'children' | 'pregnancy' | 'newborn' | 
               'fashion' | 'product' | 'corporate' | 'event' | 'graduation' | 'artistic' | 
               'boudoir' | 'pet' | 'other';
  deliverables: {
    hdPhotos: number;
    webPhotos: number;
  };
  price: number;
  backdrop: string;
  props: string[];
  duration: number;
  withMakeup: boolean;
}

export interface CorporateProject extends BaseProject {
  type: 'corporate';
  eventType: 'conference' | 'team_building' | 'product_launch' | 'corporate_portrait' | 'seminar' | 
             'training' | 'award_ceremony' | 'gala' | 'exhibition' | 'press_conference' | 
             'inauguration' | 'anniversary' | 'workshop' | 'networking' | 'other';
  location: string;
  company: {
    name: string;
    contact: string;
    position: string;
  };
  attendees: number;
  requirements: string[];
  deliverables: {
    photos: boolean;
    video: boolean;
    streaming: boolean;
    prints: boolean;
    numberOfPhotos: number;
    videoDuration: number;
  };
  duration: number;
}

export type Project = WeddingProject | StudioProject | CorporateProject;