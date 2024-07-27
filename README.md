# Menu Creator API Service

## Overview
Menu Creator API Service is an API that allows restaurants to manage their menu items and categories, view their menus, and track their price history. The API supports user authentication and authorization processes, and ensures that users only have access to their own data.

## Endpoints

| Endpoint                        | Method | Description                                                   |
|---------------------------------|--------|---------------------------------------------------------------|
| `/auth/register`                | POST   | Registers a new user.                                        |
| `/auth/login`                   | POST   | Logs in a user and returns a token.                          |
| `/auth/profile`                 | GET    | Retrieves the profile of the logged-in user.                 |
| `/auth/change-password`         | PUT    | Allows the logged-in user to change their password.           |
| `/auth/confirm/:token`          | GET    | Confirms the email using the provided token.                 |
| `/categories`                   | GET    | Lists all categories of the logged-in user.                  |
| `/categories`                   | POST   | Creates a new category.                                     |
| `/categories/:id/items`         | GET    | Lists all items within a specific category.                  |
| `/categories/:id`               | PUT    | Updates a specific category.                                |
| `/categories/:id`               | DELETE | Deletes a specific category.                                |
| `/menu-items`                   | GET    | Lists all menu items of the logged-in user.                  |
| `/menu-items`                   | POST   | Creates a new menu item.                                    |
| `/menu-items/:id`               | GET    | Retrieves details of a specific menu item.                   |
| `/menu-items/:id`               | PUT    | Updates a specific menu item.                                |
| `/menu-items/:id`               | DELETE | Deletes a specific menu item.                                |
| `/menu-items/:id/price-history` | GET    | Retrieves the price history of a specific menu item.          |
| `/menu/:id`                     | GET    | Retrieves the final menu for a specific user or restaurant. |

## Technologies and Libraries Used

- **Node.js** - JavaScript runtime for server-side development
- **Express** - Web application framework for Node.js
- **Mongoose** - MongoDB Object Data Modeling (ODM) library for MongoDB interaction
- **jsonwebtoken (JWT)** - For user authentication and authorization
- **bcrypt** - For hashing passwords
- **crypto** - For generating random tokens

## Authentication

- User authentication and authorization are handled using **JSON Web Tokens (JWT)**. After logging in, users receive a JWT token, which is used to provide authorized access to the API.

## Database

- **MongoDB** - Used as the NoSQL database
- ![MongoDB Logo](https://www.mongodb.com/assets/images/global/leaf.png) <!-- Add MongoDB logo here -->
