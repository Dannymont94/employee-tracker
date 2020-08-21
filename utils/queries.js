// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees managers ON managers.id = employees.manager_id;`

// View employees by department
`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees managers ON managers.id = employees.manager_id
ORDER BY department;`

// View employees by manager
`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees managers ON managers.id = employees.manager_id
ORDER BY manager;`

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
`SELECT roles.id, roles.title, roles.salary, departments.name AS department
FROM roles
LEFT JOIN departments ON departments.id = roles.department_id;`

// WHEN I choose to view all departments  
// THEN I am presented with a formatted table showing department names and department ids
`SELECT departments.id, departments.name
FROM departments;`

// View the total utilized budget of a department—i.e., the combined salaries of all employees in that department
`SELECT departments.name AS department, SUM(roles.salary) AS budget_utilized from employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
GROUP BY departments.name;`

// Update employee managers
`UPDATE employees SET manager_id = ? WHERE id = ?;`

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
`UPDATE employees SET employees.role_id = ? WHERE id = ?;`

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
`INSERT INTO employees
  (first_name, last_name, role_id, manager_id)
VALUES
  (?,?,?,?);`
  
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
`INSERT INTO roles
  (title, salary, department_id)
VALUES
  (?,?,?);`

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
`INSERT INTO departments
  (name)
VALUES  
  (?);`

// Delete an employee
`DELETE FROM employees WHERE id = ?`

// Delete a role
`DELETE FROM roles WHERE id = ?;`

// Delete a department
`DELETE FROM departments WHERE id = ?;`


