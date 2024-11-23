# Discussion du 19 mars 2024 : Ajout des drapeaux

## Contexte
Ajout de la sélection des drapeaux (France/Cameroun) dans les formulaires avec liaison automatique au type de mariage.

## Modifications
- Mise à jour du composant `ProjectCreation.tsx`
- Ajout de la sélection automatique du type de mariage en fonction du pays
- Utilisation des drapeaux de flagcdn.com

## Solution
```typescript
onChange={(value) => {
  setFormData(prev => ({ 
    ...prev, 
    country: value,
    weddingType: value === 'fr' ? 'french' : 'cameroonian'
  }));
}}
```

## Fichiers modifiés
- src/components/ProjectCreation.tsx
- src/components/CountrySelector.tsx