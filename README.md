# Blog API

This is a RESTful API for a blogging platform. It allows users to register, log in, create, update, delete, and search for blogs. The API also includes user authentication and role-based access control.

## Features

- **Authentication**: User registration and login with JWT-based authentication.
- **Blog Management**: Create, update, delete, and search blogs.
- **Pagination**: Supports pagination for listing blogs.
- **Role-Based Access Control**: Admin-specific operations.
- **Swagger Documentation**: API documentation using Swagger.

## Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **MongoDB**: Database.
- **Mongoose**: MongoDB object modeling.
- **Joi**: Validation library.
- **JWT**: Authentication.
- **Swagger**: API documentation.



## API Endpoints

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in a user.

### Blogs

- **GET** `/api/blogs`: Get all blogs with pagination.
- **GET** `/api/blogs/search`: Search blogs by term.
- **GET** `/api/blogs/:id`: Get a specific blog by ID.
- **POST** `/api/blogs`: Create a new blog (requires authentication).
- **PATCH** `/api/blogs/:id`: Update a blog (requires authentication).
- **DELETE** `/api/blogs/:id`: Delete a blog (requires admin privileges).

### User Blogs

- **GET** `/api/blogs/user/myblogs`: Get blogs created by the authenticated user.

## Swagger Documentation

Access the API documentation at `http://localhost:8080/api-docs`.

## Project Structure

```
/blog
├── controllers/       # Business logic for routes
├── db/                # Database connection
├── middleware/        # Middleware for authentication and validation
├── models/            # Mongoose models
├── routes/            # API routes
├── swagger/           # Swagger configuration and definitions
├── utils/             # Utility functions
├── .env               # Environment variables
├── index.js           # Entry point
└── package.json       # Project metadata and dependencies
```

