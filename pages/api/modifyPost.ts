import { NextApiRequest, NextApiResponse } from 'next';
import excuteQuery from '../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title } = req.body;
  try {
    const query = `UPDATE test SET title='${title}' WHERE id=${id}`;
    await excuteQuery({ query });
    const result: any = await excuteQuery({
      query: `SELECT * from test where id=${id}`,
    });

    return res.status(200).json(result[0]);
  } catch (e) {
    return res.status(403).send({ message: e });
  }
};

export default handler;
