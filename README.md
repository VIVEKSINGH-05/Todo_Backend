# Todo Backend

A REST API for managing todo items with Node.js, Express, and MongoDB using Mongoose.

## Features

- Create new todos
- Fetch all todos with search, sorting, and pagination
- Fetch a single todo by ID
- Update a todo by ID
- Toggle the completion status of a todo
- Delete a todo
- Centralized error handling and validation

## Requirements

- Node.js
- npm
- MongoDB running locally or a MongoDB Atlas connection string

## Setup

1. Clone the repository and go to the project folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   PORT=8080
   MONGODB_URL=mongodb://127.0.0.1:27017/todo
   ```

   Replace the MongoDB URL with your own connection string as needed. Keep your credentials private and do not commit them.

4. Start the development server:

   ```bash
   npm run dev
   ```

The API runs on `http://localhost:8080` by default, or on the value set in `PORT`.

## API Endpoints

All responses are JSON. Todo documents include a title, optional description, completion status, and timestamps.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/todo` | Create a new todo |
| `GET` | `/api` | List todos with search, sort, and pagination |
| `GET` | `/api/:id` | Get a single todo by MongoDB ID |
| `PUT` | `/api/:id` | Update a todo by MongoDB ID |
| `PATCH` | `/api/:id/toggle` | Toggle the completed status |
| `DELETE` | `/api/:id` | Delete a todo by MongoDB ID |

### Create a todo

```http
POST /api/todo
Content-Type: application/json
```

```json
{
  "title": "Buy groceries",
  "description": "Milk and bread"
}
```

Response:

```json
{
  "success": true,
  "message": "Todo created successfully",
  "todo": {
    "_id": "...",
    "title": "Buy groceries",
    "description": "Milk and bread",
    "completed": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

`title` is required. `description` is optional.

### List todos

```http
GET /api?search=groceries&sort=asc&page=1&limit=10
```

Query params:

- `search`: case-insensitive match against the title
- `sort`: `asc` sorts by title in ascending order; any other value or omission defaults to descending order
- `page`: page number (default `1`)
- `limit`: items per page (default `10`)

Example response:

```json
{
  "success": true,
  "message": "Todos fetched successfully",
  "total": 25,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "_id": "...",
      "title": "Buy groceries",
      "description": "Milk and bread",
      "completed": false,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### Get a todo by ID

```http
GET /api/<todo-id>
```

Returns the todo item matching the provided MongoDB ObjectId.

### Update a todo

```http
PUT /api/<todo-id>
Content-Type: application/json
```

```json
{
  "title": "Buy groceries today",
  "description": "Milk, bread, and fruit"
}
```

The update endpoint requires a non-empty `title`. It updates the `title` and `description` values.

### Toggle a todo

```http
PATCH /api/<todo-id>/toggle
```

This toggles the todo's `completed` field between `true` and `false`.

### Delete a todo

```http
DELETE /api/<todo-id>
```

Deletes the todo matching the provided MongoDB ObjectId.

## Error Handling

The API returns JSON error responses with a `success: false` flag and a descriptive message for invalid input, invalid IDs, missing records, and server-side issues.
