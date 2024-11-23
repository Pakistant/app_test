import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Upload, Image } from 'lucide-react';
import { useProjectStore } from '../../store';

interface FormulaImage {
  id: string;
  url: string;
  name: string;
}

interface Formula {
  id: string;
  name: string;
  type: 'photo_video' | 'photo' | 'video';
  description: string;
  price: {
    fr: number;
    cm: number;
  };
  features: string[];
  images: FormulaImage[];
  documents: {
    id: string;
    name: string;
    url: string;
  }[];
}

function FormulaManagement() {
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFormula, setEditingFormula] = useState<Formula | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'photo_video' as const,
    description: '',
    price: {
      fr: 0,
      cm: 0
    },
    features: [] as string[],
    images: [] as FormulaImage[],
    documents: [] as { id: string; name: string; url: string; }[]
  });

  const handleImageUpload = (files: FileList) => {
    // Simuler l'upload d'images
    const newImages = Array.from(files).map(file => ({
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleDocumentUpload = (files: FileList) => {
    // Simuler l'upload de documents
    const newDocs = Array.from(files).map(file => ({
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocs]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFormula) {
      setFormulas(formulas.map(formula => 
        formula.id === editingFormula.id 
          ? { ...formula, ...formData }
          : formula
      ));
    } else {
      setFormulas([...formulas, { 
        id: Date.now().toString(),
        ...formData
      }]);
    }
    
    setShowModal(false);
    setEditingFormula(null);
    setFormData({
      name: '',
      type: 'photo_video',
      description: '',
      price: { fr: 0, cm: 0 },
      features: [],
      images: [],
      documents: []
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Gestion des Formules</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Ajouter une Formule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formulas.map(formula => (
          <div key={formula.id} className="bg-white rounded-lg shadow-sm p-4">
            {formula.images[0] && (
              <img
                src={formula.images[0].url}
                alt={formula.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{formula.name}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingFormula(formula);
                    setFormData({
                      name: formula.name,
                      type: formula.type,
                      description: formula.description,
                      price: formula.price,
                      features: formula.features,
                      images: formula.images,
                      documents: formula.documents
                    });
                    setShowModal(true);
                  }}
                  className="p-1 text-gray-500 hover:text-blue-600"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formule ?')) {
                      setFormulas(formulas.filter(f => f.id !== formula.id));
                    }
                  }}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{formula.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Prix France:</span>
                <span className="font-medium">{formula.price.fr}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Prix Cameroun:</span>
                <span className="font-medium">{formula.price.cm} FCFA</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Caractéristiques:</h4>
              <ul className="space-y-1">
                {formula.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {editingFormula ? 'Modifier une formule' : 'Ajouter une formule'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingFormula(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la formule *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    type: e.target.value as 'photo_video' | 'photo' | 'video'
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="photo_video">Photo & Vidéo</option>
                  <option value="photo">Photo uniquement</option>
                  <option value="video">Vidéo uniquement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix France (€) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price.fr}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      price: { ...prev.price, fr: parseFloat(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix Cameroun (FCFA) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price.cm}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      price: { ...prev.price, cm: parseFloat(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caractéristiques
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...formData.features];
                          newFeatures[index] = e.target.value;
                          setFormData(prev => ({ ...prev, features: newFeatures }));
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            features: prev.features.filter((_, i) => i !== index)
                          }));
                        }}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      features: [...prev.features, '']
                    }))}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Ajouter une caractéristique
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images
                </label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <Image size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Cliquez pour ajouter des images
                    </span>
                  </label>
                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {formData.images.map(image => (
                        <div key={image.id} className="relative">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                images: prev.images.filter(img => img.id !== image.id)
                              }));
                            }}
                            className="absolute -top-1 -right-1 p-0.5 bg-red-600 text-white rounded-full"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Documents
                </label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => e.target.files && handleDocumentUpload(e.target.files)}
                    className="hidden"
                    id="document-upload"
                  />
                  <label
                    htmlFor="document-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Cliquez pour ajouter des documents
                    </span>
                  </label>
                  {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.documents.map(doc => (
                        <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{doc.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                documents: prev.documents.filter(d => d.id !== doc.id)
                              }));
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingFormula(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingFormula ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormulaManagement;