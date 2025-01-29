# Task Management System

This is a simple Task Management System built with Node.js, Express, and MongoDB.

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- Task validation and error handling

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd task_management_system
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

1. Create a [.env](http://_vscodecontentref_/1) file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    JWT_SECRET=secret
    ```

## Running the Application

1. Start the MongoDB server.
2. Run the application:
    ```sh
    npm start
    ```
3. The server will start on `http://localhost:3000`.

## API Endpoints

### User Routes

- `POST /api/register` - Register a new user
    - Request body:
        ```json
        {
            "username": "exampleUser",
            "password": "examplePassword"
        }
        ```
    - Response:
        ```json
        {
            "message": "User registered successfully"
        }
        ```

- `POST /api/login` - Login a user
    - Request body:
        ```json
        {
            "username": "exampleUser",
            "password": "examplePassword"
        }
        ```
    - Response:
        ```json
        {
            "token": "your_jwt_token"
        }
        ```

### Task Routes

- `POST /api/crud/create_task` - Create a new task
    - Request headers:
        ```json
        {
            "Authorization": "Bearer your_jwt_token"
        }
        ```
    - Request body:
        ```json
        {
            "title": "Sample Task",
            "description": "This is a sample task",
            "dueDate": "YYYY-MM-DD",
            "priority": ['Low', 'Medium', 'High'],
            "status": ['Pending', 'In Progress', 'Completed']
        }
        ```
    - Response:
        ```json
        {
            "message": "Task created successfully",
            "task": {
                "_id": "task_id",
                "title": "Sample Task",
                "description": "This is a sample task",
                "user": "user_id"
            }
        }
        ```

- `GET /api/crud/all_task` - Get all tasks
    - Request headers:
        ```json
        {
            "Authorization": "Bearer your_jwt_token"
        }
        ```
    - Response:
        ```json
        [
            {
                "_id": "task_id",
                "title": "Sample Task",
                "description": "This is a sample task",
                "user": "user_id",
            },
            ...
        ]
        ```

- `GET /api/crud/single_task/:id` - Get a single task by ID
    - Request headers:
        ```json
        {
            "Authorization": "Bearer your_jwt_token"
        }
        ```
    - Response:
        ```json
        {
            "_id": "task_id",
            "title": "Sample Task",
            "description": "This is a sample task",
            "user": "user_id",
        }
        ```

- `PUT /api/crud/update_task/:id` - Update a task by ID
    - Request headers:
        ```json
        {
            "Authorization": "Bearer your_jwt_token"
        }
        ```
    - Request body:
        ```json
        {
            "title": "Updated Task",
            "description": "This is an updated task"
        }
        ```
    - Response:
        ```json
        {
            "message": "Task updated successfully",
            "task": {
                "_id": "task_id",
                "title": "Updated Task",
                "description": "This is an updated task",
                "user": "user_id",
            }
        }
        ```

- `DELETE /api/crud/delete_task/:id` - Delete a task by ID
    - Request headers:
        ```json
        {
            "Authorization": "Bearer your_jwt_token"
        }
        ```
    - Response:
        ```json
        {
            "message": "Task deleted successfully"
        }
        ```

## License

This project is licensed under the ISC License.