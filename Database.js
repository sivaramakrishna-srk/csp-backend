const oracledb = require("oracledb");
// Set database connection details
const dbConfig = {
  user: "system",
  password: "manager",
  connectString: "localhost:1521/orcl",
};

const Query = async (sql) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql);
    await connection.commit();
    return result;
  } catch (error) {
    return error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const Result = async (...Parameters) => {
  let Sql;
  console.log(typeof Parameters[2]);
  Details = Parameters[2];
  try {
    Details = eval(`(${Parameters[2]})`);
  } catch (err) {}
  switch (Parameters[1]) {
    case "Insert":
      if (Parameters[0] == "Staff_table") {
        Sql = `insert into ${Parameters[0]} values('${Details.Id_No}','${Details.Name}','${Details.UserName}','${Details.Password}',${Details.Age},'${Details.DOB}','${Details.Address}')`;
        break;
      } else if (Parameters[0] == "Mothers_table") {
        Sql = `insert into ${Parameters[0]} values('${Details.Id_No}','${Details.Name}',${Details.Age},'${Details.DOB}',${Details.Aadhar_no},'${Details.Address}')`;
        break;
      } else if (Parameters[0] == "Childrens_table") {
        Sql = `insert into ${Parameters[0]} values('${Details.Id_No}','${Details.Name}',${Details.Age},'${Details.DOB}','${Details.Mothers_name}',${Details.Parents_mobile},'${Details.Address}')`;
        break;
      } else if (Parameters[0] == "Items_table") {
        Sql = `insert into ${Parameters[0]} values('${Details.Id_No}','${Details.Name}','${Details.Instock}','${Details.ExpDate}')`;
        break;
      }
    case "Update":
      if (Parameters[0] == "Staff_table") {
        Sql = `update ${Parameters[0]} set Id_No = '${Parameters[3].Id_No}', Name = '${Parameters[3].Name}', UserName = '${Parameters[3].UserName}', Password = '${Parameters[3].Password}', Age = ${Parameters[3].Age}, DOB = '${Parameters[3].DOB}', Address = '${Parameters[3].Address}' where Id_No = '${Details}'`;
        break;
      } else if (Parameters[0] == "Mothers_table") {
        Sql = `update ${Parameters[0]} set Id_No = '${Parameters[3].Id_No}', Name = '${Parameters[3].Name}', Age = ${Parameters[3].Age}, DOB = '${Parameters[3].DOB}', Aadhar_no = ${Parameters[3].Aadhar_no}, Address = '${Parameters[3].Address}' where Id_No = '${Details}'`;
        break;
      } else if (Parameters[0] == "Childrens_table") {
        Sql = `update ${Parameters[0]} set Id_No = '${Parameters[3].Id_No}', Name = '${Parameters[3].Name}', Age = ${Parameters[3].Age}, DOB = '${Parameters[3].DOB}', Mothers_name = '${Parameters[3].Mothers_name}', Parents_mobile = ${Parameters[3].Parents_mobile}, Address = '${Parameters[3].Address}' where Id_No = '${Details}'`;
        break;
      } else if (Parameters[0] == "Items_table") {
        Sql = `update ${Parameters[0]} set Id_No = '${Parameters[3].Id_No}', Name = '${Parameters[3].Name}', Instock = '${Parameters[3].Instock}', ExpDate = '${Parameters[3].ExpDate}' where Id_No = '${Details}'`;
        break;
      }
    case "Delete":
      Sql = `delete from ${Parameters[0]} where Id_No = '${Details}'`;
      break;
    case "Read":
      if (Parameters[0] == "Items_table"){
        Sql = `select * from ${Parameters[0]}`;
      if (Details != "All") {
        Sql = `select * from ${Parameters[0]} where Id_No = '${Details}'`;
      }
      break;
      }
      else if (Parameters[0] == "Mothers_table"){
        Sql = `select * from ${Parameters[0]}`;
      if (Details != "All") {
        Sql = `select * from ${Parameters[0]} where Id_No = '${Details}'`;
      }
      break;
      }
      
      Sql = `select * from ${Parameters[0]}`;
      if (Details != "All") {
        Sql = `select * from ${Parameters[0]} where UserName = '${Details}'`;
      }
      break;
    case "login":
      Sql = `select UserName,Password from ${Parameters[0]} where UserName = '${Details}'`;
      break;
  }
  console.log(Sql);
  var result = await Query(Sql);
  return result;
};
module.exports = Result;
