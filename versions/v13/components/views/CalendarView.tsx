import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useProjectStore } from '../../store';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Rest of the file remains the same...