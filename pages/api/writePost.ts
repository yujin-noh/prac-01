import { NextApiRequest, NextApiResponse } from 'next';
import excuteQuery from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = 'INSERT INTO test (title) VALUES (?)';
  const values = req.body.title;
  try {
    await excuteQuery({ query, values });
    const result: any = await excuteQuery({
      query: 'SELECT * FROM test ORDER BY id DESC LIMIT 1',
    });
    return res.status(200).json(result[0]);
  } catch (e) {
    return res.status(403).send({ message: e });
  }
};
export default handler;
