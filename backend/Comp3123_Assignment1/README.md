# COMP 3123 - Assignment 1: MongoDB API

## Project Overview
This project is a RESTful API built using Node.js, Express, and the **Native MongoDB Driver**. It implements a secure backend system with two main functions: User Authentication (Sign Up/Log In) and Employee Management (CRUD operations).

The API endpoints are protected using **JSON Web Tokens (JWT)** for authorization and include **input validation** using `express-validator`.

***

## Tech Stack

* **Runtime:** Node.js
* **Web Framework:** Express.js
* **Database:** MongoDB (using the **Native MongoDB Driver** - `mongodb` package)
* **Security:** JWT (for authentication), bcryptjs (for password hashing)
* **Validation:** express-validator
* **Deployment Target:** Render/Vercel (Note: deployed server is required for full testing)

***

## Setup and Installation

### Prerequisites

1.  Node.js (LTS version recommended)
2.  MongoDB Atlas Cluster (or local instance)
3.  Postman for API testing

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone [Your Repository URL]
    cd Comp3123_Assignment1
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named **`.env`** in the root directory and add the following variables:

    ```env
    # Required Database URI (Must include the database name: /comp3123_assigment1)
    MONGO_URI=mongodb+srv://comp3123_user:[PASSWORD]@[CLUSTER_URL]/comp3123_assigment1?retryWrites=true&w=majority&appName=Assignment1

    # Port for the Express server
    PORT=3000

    # Secret key for signing and verifying JWTs
    JWT_SECRET=[Your Long Random JWT Secret] 
    ```

4.  **Start the Server:**
    ```bash
    npm run dev
    ```
    The server will start at `http://localhost:3000`.

***

## API Endpoints

The API is structured with two base paths: `/api/v1/user` for authentication and `/api/v1/emp` for employee management.

### User Authentication

| Endpoint | Method | Description | Security | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/api/v1/user/signup` | **POST** | Creates a new user. | None | `201 Created` |
| `/api/v1/user/login` | **POST** | Authenticates a user and returns a **JWT token**. | None | `200 OK` |

### Employee Management (CRUD)

**Note:** All employee endpoints require a valid **Bearer Token** in the `Authorization` header.

| Endpoint | Method | Description | Access Type | Status |
| :--- | :--- | :--- | :--- | :--- |
| `/api/v1/emp/employees` | **POST** | Creates a new employee record. | Protected | `201 Created` |
| `/api/v1/emp/employees` | **GET** | Retrieves a list of all employees. | Protected | `200 OK` |
| `/api/v1/emp/employees/:eid` | **GET** | Retrieves a single employee by ID (URL Parameter). | Protected | `200 OK` |
| `/api/v1/emp/employees/:eid` | **PUT** | Updates the complete employee record by ID (URL Parameter). | Protected | `200 OK` |
| `/api/v1/emp/employees?eid=xxx` | **DELETE** | Deletes an employee record by ID (Query Parameter). | Protected | `204 No Content` |

***

## Testing and Deliverables

All endpoints were tested using Postman. The server successfully handles:

* Successful database connection and operation.
* **400 Bad Request** responses (via `express-validator`).
* **401 Unauthorized** responses (via `auth.js` middleware).
* **404 Not Found** responses (for non-existent resources).

The following deliverables are included in the submission:
* [ ] Full source code on GitHub.
* [ ] Postman Collection JSON file.
* [ ] Screenshots of all successful and error-handling API tests.