// ... existing types ...

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
}

export interface CorporateProject extends BaseProject {
  type: 'corporate';
  eventType: 'conference' | 'team_building' | 'product_launch' | 'corporate_portrait' | 'other';
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
  };
}

export type Project = WeddingProject | StudioProject | CorporateProject;