import { http, HttpResponse } from 'msw';
import { data } from './data';

export const handlers = [
  http.get('http://localhost:3000/api/tasks', () => {
    return HttpResponse.json(data, { status: 200 });
  }),
];
