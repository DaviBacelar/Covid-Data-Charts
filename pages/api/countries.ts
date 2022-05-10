import type { NextApiRequest, NextApiResponse } from 'next'
import data from '../../small-owid-covid-data.json';

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(Object.keys(data));
}
