// Add country selection and delivery days
import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useProjectStore } from '../store';
import CountrySelector from './CountrySelector';
import DeliveryDaysInput from './DeliveryDaysInput';

interface StudioProjectCreationProps {
  onClose: () => void;
}

function StudioProjectCreation({ onClose }: StudioProjectCreationProps) {
  const { addProject, activeSeason } = useProjectStore();
  const [formData, setFormData] = useState({
    clientName: '',
    date: '',
    email: '',
    phone: '',
    country: 'fr', // Default to France
    deliveryDays: 7, // Default delivery days
    sessionType: 'portrait',
    deliverables: {
      hdPhotos: 0,
      webPhotos: 0
    },
    price: 0,
    backdrop: '',
    props: [] as string[],
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

export default StudioProjectCreation;