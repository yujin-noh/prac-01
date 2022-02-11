import type { NextApiRequest, NextApiResponse } from 'next';
import excuteQuery from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = 'SELECT * FROM test';
  const result = await excuteQuery({ query });

  res.status(200).json(result);
};

export default handler;
