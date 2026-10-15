import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5 },   
    { duration: '1m', target: 15 },   
    { duration: '30s', target: 0 },   
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], 
    http_req_failed: ['rate<0.01'],   
  },
};

const BASE_URL = 'https://api.langrepo.cloud';
const TOKEN = " ";

export default function () {
  let res = http.get(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    tags: { name: "protected_api" },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}