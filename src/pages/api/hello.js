// pages/api/sendNotification.js
import Cors from 'cors';
import { Novu } from '@novu/node';

// Initialize Novu instance with your API key
const novu = new Novu('1fc5f14ed8b3a4c442eded5cea80e0d1');

// CORS setup
const cors = (handler) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Update this with your frontend's origin in production
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return await handler(req, res);
};

// Function to remove circular references
const removeCircularReferences = (obj, seen = new WeakSet()) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (seen.has(obj)) {
    return;
  }
  seen.add(obj);

  if (Array.isArray(obj)) {
    return obj.map((item) => removeCircularReferences(item, seen));
  }

  const filteredObj = {};
  for (const [key, value] of Object.entries(obj)) {
    filteredObj[key] = removeCircularReferences(value, seen);
  }
  return filteredObj;
};

// Main handler function
const handler = async (req, res) => {
  console.log(req.body, "<----------------this is req body");

  if (req.method === 'POST') {
    const { recipient, templateId, payload } = req.body;
    console.log("--------------------------->", payload)
    try {
      const response = await novu.trigger(templateId, {
        to: {
          subscriberId: "info@hayatpump.com", // Use the recipient from the request body
          email: 'info@hayatpump.com'

        },
        payload: payload,
      });

      // Extract only the necessary data for the response
      const { data, status } = response;

      res.status(200).json({ data, status });
    } catch (error) {
      console.error('Error sending notification:', error);

      // Remove circular references before sending the error response
      const safeError = removeCircularReferences(error);

      res.status(500).json({ error: 'Failed to send notification', details: safeError.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

// Wrap the handler with CORS middleware
export default cors(handler);
