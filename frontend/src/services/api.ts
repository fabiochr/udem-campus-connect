import axios from 'axios';
import { StudentProfile, MatchResult } from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// services/api.ts - UPDATED
export const apiService = {
  // Student management (existing)
  registerStudent: (student: StudentProfile) => 
    api.post('/api/students/register', student),
  
  getMatches: (studentName: string, language: string = 'en') => 
    api.get(`/api/students/matches/${studentName}?language=${language}`),
  
  // CONNECTION SYSTEM - NEW
  connectWithStudent: (studentId: string, partnerId: string) =>
    api.post('/api/connections/connect', {
      student_id: studentId,
      partner_id: partnerId
    }),
  
  getConnections: (studentId: string) =>
    api.get(`/api/connections/${studentId}`),
  
  // EVENTS SYSTEM - NEW (for your event images)
  getEvents: () => 
    api.get('/api/events'),
  
  registerForEvent: (studentId: string, eventId: string) =>
    api.post('/api/events/register', {
      student_id: studentId,
      event_id: eventId
    }),
  
  // Existing methods
  getAllStudents: () => api.get('/api/students'),
  getStudent: (studentName: string) => api.get(`/api/students/${studentName}`),
  deleteStudent: (studentName: string) => api.delete(`/api/students/${studentName}`),
  suggestChallenges: (studentName: string, language: string = 'en') => 
    api.get(`/api/challenges/suggest/${studentName}?language=${language}`),
  healthCheck: () => api.get('/api/health'),
};

export default api;