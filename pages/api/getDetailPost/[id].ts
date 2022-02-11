import { NextApiRequest, NextApiResponse } from 'next';
import excuteQuery from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const query = `SELECT * FROM test WHERE id = ${id}`;
  const result: any = await excuteQuery({ query });
  res.status(200).json(result[0]);
};

export default handler;
