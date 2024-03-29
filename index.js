import inquirer from "inquirer";
import mysql from "mysql2";
import {
  addADepartment,
  addAnEmployee,
  addARole,
  questions,
  UpdateARole,
  ViewByDept,
} from "./questions.js";

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Rousseau65@",
    database: "fakecompany_db",
  },
  console.log(`Connected to the fakecompany1_2023_db database.`)
);

inquirer.prompt(questions).then((response) => {
  if (response.OpeningMenu === "I am finished") {
    // process Exit
  } else if (response.OpeningMenu === "View All Departments") {
    db.query("SELECT * FROM departments", (err, results) => {
      console.table(results);
    });
    promptViewQuestions(questions);
  } else if (response.OpeningMenu === "View All Roles") {
    db.query(
      "SELECT role.id, role.title, role.salary, departments.name FROM role JOIN departments ON role.department_id = departments.id",
      (err, results) => {
        console.table(results);
      }
    );
    promptViewQuestions(questions);
  } else if (response.OpeningMenu === "View All Employees") {
    db.query(
      "SELECT e.id,CONCAT(e.first_name,' ', e.last_name) AS 'Employee', IFNULL( CONCAT(m.first_name,' ', m.last_name),'Executive') AS 'Manager', role.title AS Title, role.salary AS Salary, departments.name AS Dept FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN role ON e.role_id = role.id JOIN departments ON role.department_id = departments.id;",
      (err, results) => {
        console.table(results);
      }
    );
    promptViewQuestions(questions);
  } else if (response.OpeningMenu === "Add A Department") {
    promptDeptQuestions(addADepartment);
  } else if (response.OpeningMenu === "Add A Role") {
    promptRoleQuestions(addARole);
  } else if (response.OpeningMenu === "Add An Employee") {
    promptEmployeeQuestions(addAnEmployee);
  } else if (response.OpeningMenu === "Update An Employee Role") {
    promptUpdateQuestions(UpdateARole);
  } else if (response.OpeningMenu === "View Employees by Dept") {
    promptViewByDept(ViewByDept);
  }
});

// Functions for the Cycling of questions and the Code above.
// ADD department
function promptDeptQuestions(questionDeptSet) {
  inquirer.prompt(questionDeptSet).then((response) => {
    db.query(
      `INSERT INTO departments (name) VALUES ('${response.departmentName}')`
    );
    promptViewQuestions(questions);
  });
}

// Add Role

function promptRoleQuestions(questionRoleSet) {
  inquirer.prompt(questionRoleSet).then((response) => {
    db.query(
      `INSERT INTO role (title,salary,department_id) VALUES ('${response.roleName}','${response.roleSalary}','${response.roleDepartmentID}')`
    );
    promptViewQuestions(questions);
  });
}

// Add employee

function promptEmployeeQuestions(questionRoleSet) {
  inquirer.prompt(questionRoleSet).then((response) => {
    db.query(
      `INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('${response.employeeFirstName}','${response.employeeLastName}',${response.employeeRoleID},${response.employeeManagerID})`
    );
    promptViewQuestions(questions);
  });
}

// Update employee

function promptUpdateQuestions(questionRoleSet) {
  inquirer.prompt(questionRoleSet).then((response) => {
    db.query(
      `UPDATE employees SET role_id = ${response.updateRole} WHERE first_name = '${response.updateFirstName}' AND last_name = '${response.updateLastName}'`
    );
    promptViewQuestions(questions);
  });
}

// view by dept
function promptViewByDept(questionRoleSet) {
  inquirer.prompt(questionRoleSet).then((response) => {
    db.query(
      `SELECT e.id,CONCAT(e.first_name," ", e.last_name) AS 'Employee', IFNULL( CONCAT(m.first_name," ", m.last_name),"Executive") AS 'Manager', role.title AS Title, role.salary AS Salary, departments.name AS Dept FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN role ON e.role_id = role.id JOIN departments ON role.department_id = departments.id WHERE department_id = ${response.viewByDeptID}`,
      (err, results) => {
        console.table(results);
      }
    );
    promptViewQuestions(questions);
  });
}

function promptViewQuestions(questionSet) {
  inquirer.prompt(questionSet).then((response) => {
    questionSetFollowUp(response);
  });
}

function questionSetFollowUp(response) {
  if (response.OpeningMenu === "I am finished") {
    // process Exit
  } else if (response.OpeningMenu === "View All Departments") {
    db.query("SELECT * FROM departments", (err, results) => {
      console.table(results);
    });
    promptViewQuestions(questions);
  } else if (response.OpeningMenu === "View All Roles") {
    db.query(
      "SELECT role.id, role.title, role.salary, departments.name FROM role JOIN departments ON role.department_id = departments.id",
      (err, results) => {
        console.table(results);
      }
    );
    promptViewQuestions(questions);
  } else if (response.OpeningMenu === "View All Employees") {
    db.query(
      "SELECT e.id,CONCAT(e.first_name,' ', e.last_name) AS 'Employee', IFNULL( CONCAT(m.first_name,' ', m.last_name),'Executive') AS 'Manager', role.title AS Title, role.salary AS Salary, departments.name AS Dept FROM employees e LEFT JOIN employees m ON m.id = e.manager_id JOIN role ON e.role_id = role.id JOIN departments ON role.department_id = departments.id;",
      (err, results) => {
        console.table(results);
      }
    );
    promptViewQuestions(questions);
  } else if (response.OpeningMenu === "Add A Department") {
    promptDeptQuestions(addADepartment);
  } else if (response.OpeningMenu === "Add A Role") {
    promptRoleQuestions(addARole);
  } else if (response.OpeningMenu === "Add An Employee") {
    promptEmployeeQuestions(addAnEmployee);
  } else if (response.OpeningMenu === "Update An Employee Role") {
    promptUpdateQuestions(UpdateARole);
  } else if (response.OpeningMenu === "View Employees by Dept") {
    promptViewByDept(ViewByDept);
  }
}
