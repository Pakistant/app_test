// Add country selection and delivery days
import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useProjectStore } from '../store';
import { CorporateProject } from '../types';
import CountrySelector from './CountrySelector';
import DeliveryDaysInput from './DeliveryDaysInput';

interface CorporateProjectCreationProps {
  onClose: () => void;
}

function CorporateProjectCreation({ onClose }: CorporateProjectCreationProps) {
  const { addProject, activeSeason } = useProjectStore();
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    country: 'fr', // Default to France
    deliveryDays: 14, // Default delivery days for corporate events
    company: {
      name: '',
      contact: '',
      position: ''
    },
    email: '',
    phone: '',
    location: '',
    eventType: 'conference' as CorporateProject['eventType'],
    attendees: 0,
    requirements: [] as string[],
    deliverables: {
      photos: true,
      video: false,
      streaming: false,
      prints: false
    },
    notes: '',
    documents: [] as File[]
  });

  // Rest of the component implementation...

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Existing form fields... */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pays *
          </label>
          <CountrySelector
            value={formData.country}
            onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
          />
        </div>

        <DeliveryDaysInput
          value={formData.deliveryDays}
          onChange={(value) => setFormData(prev => ({ ...prev, deliveryDays: value }))}
          className="mt-6"
        />

        {/* Rest of the form... */}
      </div>
    </div>
  );
}

export default CorporateProjectCreation;