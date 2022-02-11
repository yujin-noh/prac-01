import { NextApiRequest, NextApiResponse } from 'next';
import excuteQuery from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const query = `DELETE FROM test WHERE id = ${id}`;
    await excuteQuery({ query });
    return res.status(200).json({ id });
  } catch (e) {
    return res.status(403).send({ message: e });
  }
};

export default handler;
