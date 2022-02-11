import serverlessMysql from 'serverless-mysql';

const db = serverlessMysql({
  config: {
    host: 'localhost',
    port: 3306,
    database: 'test',
    user: 'root',
    password: 'shdbwls1!',
  },
});

export default async function excuteQuery({ query, values }: any) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (e) {
    return { e };
  }
}
