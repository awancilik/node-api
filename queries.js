var mysql = require('mysql');

var con = mysql.createConnection({
  host: "103.146.202.108",
  user: "lbs",
  password: "Baggage#123",
  database: "dev_fesindo"
});

const tableuser = 'dev_fesindo.ha_user';

const getUsers = (request, response) => {
    con.query(`SELECT * FROM ${tableuser} ORDER BY userid ASC`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results)
    })
  }

  const getUserById = (request, response) => {
    const id = request.params.id

    con.query(`SELECT * FROM ${tableuser} WHERE userid = ?`, [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results)
    })
  }

  const createUser = (request, response) => {
    const { userid, userpwd, userdesc, isactive, createdby, createddate, updatedby, updateddate } = request.body
  
    con.query(`INSERT INTO ${tableuser} (userid, userpwd, userdesc, isactive, createdby, createddate, updatedby, updateddate) 
               VALUES (?,?,?,?,?,?,?,?)`, [userid, userpwd, userdesc, isactive, createdby, createddate, updatedby, updateddate], (error, results) => {
      if (error) {
        console.log(error)
      }
      response.status(201).send(`User added with ID: ${userid}`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    con.query(
      `UPDATE ${tableuser} SET name = ?, email = ? WHERE id = ?`,
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = request.params.id
  
    con.query(`DELETE FROM ${tableuser} WHERE userid = ?`, [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }


  const tablerecepient = 'dev_fesindo.recepient';

  const createRecepient = (request, response) => {
    const {
      recepient_name,
      recepient_address,
      recepient_phonenumber,
      created_by,
      created_date,
      updated_by,
      updated_date
    } = request.body
  
    con.query(`INSERT INTO ${tablerecepient} 
              (
                recepient_name,
                recepient_address,
                recepient_phonenumber,
                created_by,
                created_date,
                updated_by,
                updated_date
              )
               VALUES (?,?,?,?,?,?,?)`, [
                recepient_name,
                recepient_address,
                recepient_phonenumber,
                created_by,
                created_date,
                updated_by,
                updated_date
                ], (error, results) => {
      if (error) {
        console.log(error)
      }
      response.status(201).send(`User added with ID: ${recepient_name}`)
    })
  }

  const getRecepientId = (request, response) => {
    con.query('SELECT * FROM dev_fesindo.recepient', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results)
    })
  }

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createRecepient,
    getRecepientId
  }