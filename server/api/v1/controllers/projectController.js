const db = require('../../../config/dbConnection');


exports.get_projects = (req, res) => {
  const sql = 'SELECT * FROM projects';
  const query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
}

exports.get_project_by_id = (req, res) => {
  const sql = `SELECT * FROM projects WHERE id = ${req.params.id}`;
  const query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
}