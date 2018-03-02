// Update with your config settings.
module.exports = {
  client: 'pg',
  debug: true,
  connection: "postgres://yzlurtetpcmmtd:8d5734a5ac55fe3950ae4466a6b6c19a69ea51da87d26020def7551e6af2f692@ec2-174-129-26-203.compute-1.amazonaws.com:5432/dc82nloal602j1"
,
  migrations: {
      tableName: 'migrations'
  },
  ssl: true
  
};
