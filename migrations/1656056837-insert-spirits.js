const spirits = [{ id: '1', name: 'gin' }];

exports.up = async (sql) => {
  await sql`
    INSERT INTO spirits ${sql(spirits, 'name')}
  `;
};

exports.down = async (sql) => {
  for (const spirit of spirits) {
    await sql`
    DELETE FROM spirits
    WHERE
name = ${spirit.name}`;
  }
};
