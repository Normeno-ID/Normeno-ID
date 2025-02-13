import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = process.env.WAKATIME_USER_ID;
    const apiKey = process.env.WAKATIME_API_KEY;

    console.log('Environment variables check:');
    console.log('userId exists:', !!userId);
    console.log('apiKey exists:', !!apiKey);

    if (!userId || !apiKey) {
      throw new Error('Missing environment variables');
    }

    const response = await fetch(
      `https://wakatime.com/api/v1/users/${userId}/stats/last_7_days`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(apiKey).toString('base64')}`
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Wakatime API error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Wakatime stats:', error);
    res.status(500).json({ error: 'Failed to fetch Wakatime stats' });
  }
} 