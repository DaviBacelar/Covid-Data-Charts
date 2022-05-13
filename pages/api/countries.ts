import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../small-owid-covid-data.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | unknown>
) {
  try {
    res.status(200).json(Object.keys(data) as string[]);
  } catch (error) {
    res.status(500).json({ error });
  }
}
