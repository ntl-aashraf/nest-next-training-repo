# How to run this project

1. Clone the repo and run `﻿npm install` in terminal
2. Create tables in pgAdmin (queries given below)
3. After dependencies are installed run `﻿npm run start:dev`  to initialize the project. It will run the project on port 3005.
4. Hit routes using postman (routes given below)
---

### Create Table Queries:
```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  isActive BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);
```
```
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  userId INTEGER NOT NULL,

  CONSTRAINT fk_user
    FOREIGN KEY (userId)
    REFERENCES users(id)
    ON DELETE CASCADE
);
```
---

### Routes:
1. POST - Create new user: `﻿http://localhost:3005/user/create` 
2. GET -Get all users: `﻿http://localhost:3005/user/users` 
3. GET - Get active users: `﻿http://localhost:3005/user/active` 
4. POST - Create new task: `﻿http://localhost:3005/task/create` 
5. GET - Get all tasks: `http://localhost:3005/task/tasks` 
6. GET - Get active tasks: `http://localhost:3005/task/active` 
7. GET - Get all tasks of a specific user: `http://localhost:3005/task/user/:id` 
8. GET - Get pending tasks of a specific user: `http://localhost:3005/task/user/pending/:id` 
9. GET - Get pending tasks with id: `http://localhost:3005/task/pending/:id` 
10. GET - Get a task with id: `http://localhost:3005/task/:id` 
11. DELETE - Delete a specific task with id: `http://localhost:3005/task/deleteTask/:id` 
12. PUT - Update task status: `http://localhost:3005/task/updateTask/:id` 


