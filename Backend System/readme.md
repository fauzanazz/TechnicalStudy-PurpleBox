# Backend System

This is a backend system built using Express.js. It provides various functionalities including user authentication, file uploads, and data retrieval with pagination and filtering.

## Table of Contents

- [Backend System](#backend-system)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Protected Route](#protected-route)
    - [Users](#users)
    - [File Upload](#file-upload)
    - [Cars](#cars)
    - [Items](#items)
  - [Dependencies](#dependencies)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fauzanazz/TechnicalStudy-PurpleBox.git
   cd backend-system
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server:**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

## Usage

This backend system provides several routes for different functionalities. You can use tools like [Postman](https://www.postman.com/downloads/) or `curl` to interact with the API.

## API Endpoints

### Authentication

- **Register a new user**

  - **URL:** `/auth/register`
  - **Method:** `POST`
  - **Body:** `{ "username": "yourusername", "password": "yourpassword" }`
  - **Response:** `{ "message": "User registered successfully" }`

- **Login a user**

  - **URL:** `/auth/login`
  - **Method:** `POST`
  - **Body:** `{ "username": "yourusername", "password": "yourpassword" }`
  - **Response:** `{ "token": "your_generated_token" }`

- **Logout a user**

  - **URL:** `/auth/logout`
  - **Method:** `POST`
  - **Response:** `{ "message": "User logged out successfully" }`

### Protected Route

- **Access a protected route**

  - **URL:** `/protected`
  - **Method:** `GET`
  - **Headers:** `Authorization: Bearer your_generated_token`
  - **Response:** `{ "message": "This is a protected route" }`

### Users

- **Get users listing**

  - **URL:** `/users`
  - **Method:** `GET`
  - **Response:** `respond with a resource`

### File Upload

- **Upload a file**

  - **URL:** `/upload`
  - **Method:** `POST`
  - **Body:** Form-data with a key `file` and a file to upload
  - **Response:** `{ "message": "File uploaded successfully", "file": { ... } }`

### Cars

- **Get cars with pagination**

  - **URL:** `/cars`
  - **Method:** `GET`
  - **Query Parameters:** `page`, `limit`
  - **Response:** Paginated list of cars

### Items

- **Get items with filtering and sorting**

  - **URL:** `/items`
  - **Method:** `GET`
  - **Query Parameters:** `category`, `minPrice`, `maxPrice`, `sortBy`, `order`
  - **Response:** Filtered and sorted list of items

## Dependencies

- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `cookie-parser`: Parse HTTP request cookies
- `morgan`: HTTP request logger middleware for Node.js
- `pg`: PostgreSQL client for Node.js
- `sequelize`: Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server
- `pug`: High-performance template engine
- `multer`: Middleware for handling `multipart/form-data`