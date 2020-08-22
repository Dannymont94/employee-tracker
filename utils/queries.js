const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'organization_db'
});

async function viewAllEmployees() {
  const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager 
    FROM employees 
    LEFT JOIN roles ON employees.role_id = roles.id 
    LEFT JOIN departments ON roles.department_id = departments.id 
    LEFT JOIN employees managers ON managers.id = employees.manager_id`;
  const params = [];
  const query = await connection.promise().query(sql, params);
  console.table(query[0]);
}

async function viewAllEmployeesByDepartment() {
  const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager 
    FROM employees LEFT JOIN roles ON employees.role_id = roles.id 
    LEFT JOIN departments ON roles.department_id = departments.id 
    LEFT JOIN employees managers ON managers.id = employees.manager_id 
    ORDER BY department`;
  const params = [];
  const query = await connection.promise().query(sql, params);
  console.table(query[0]);
}

async function viewAllEmployeesByManager() {
  const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees managers ON managers.id = employees.manager_id
    ORDER BY manager`;
  const params = [];
  const query = await connection.promise().query(sql, params);
  console.table(query[0]);
}

async function viewAllRoles() {
  const sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department
  FROM roles
  LEFT JOIN departments ON departments.id = roles.department_id`;
  const params = [];
  const query = await connection.promise().query(sql, params);
  console.table(query[0]);
}

async function viewAllDepartments() {
  const sql = `SELECT departments.id, departments.name
  FROM departments`;
  const params = [];
  const query = await connection.promise().query(sql, params);
  console.table(query[0]);
}

async function viewBudgetByDepartment() {
  const sql = `SELECT departments.name AS department, SUM(roles.salary) AS budget_utilized from employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    GROUP BY departments.name`;
    const params = [];
    const query = await connection.promise().query(sql, params);
    console.table(query[0]);
}

// // Update employee managers
// `UPDATE employees SET manager_id = ? WHERE id = ?;`

// // WHEN I choose to update an employee role
// // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
// `UPDATE employees SET employees.role_id = ? WHERE id = ?;`

// // WHEN I choose to add an employee
// // THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// `INSERT INTO employees
//   (first_name, last_name, role_id, manager_id)
// VALUES
//   (?,?,?,?);`
  
// // WHEN I choose to add a role
// // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// `INSERT INTO roles
//   (title, salary, department_id)
// VALUES
//   (?,?,?);`

// // WHEN I choose to add a department
// // THEN I am prompted to enter the name of the department and that department is added to the database
// `INSERT INTO departments
//   (name)
// VALUES  
//   (?);`

// // Delete an employee
// `DELETE FROM employees WHERE id = ?`

// // Delete a role
// `DELETE FROM roles WHERE id = ?;`

// // Delete a department
// `DELETE FROM departments WHERE id = ?;`

module.exports = {
  connection,
  viewAllEmployees,
  viewAllEmployeesByDepartment,
  viewAllEmployeesByManager,
  viewAllRoles,
  viewAllDepartments,
  viewBudgetByDepartment 
}