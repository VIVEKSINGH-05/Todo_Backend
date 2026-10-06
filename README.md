# Todo Backend

A REST API for creating, listing, searching, and updating todo items. It uses Node.js, Express, and MongoDB through Mongoose.

## Requirements

- Node.js and npm
- A MongoDB connection string (local MongoDB or MongoDB Atlas)

## Setup

1. Clone the repository and enter the project directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   PORT=8080
   MONGODB_URL=mongodb://127.0.0.1:27017/todo
   ```

   Replace the MongoDB URL with your own connection string as needed. Keep `.env` private and do not commit database credentials.

4. Start the development server:

   ```bash
   npm run dev
   ```

The API listens on port `8080` by default, or the port set in `PORT`. The server requires a reachable MongoDB instance.

## API

All responses are JSON. Todo documents include a title, optional description, completion status, and timestamps.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/todo` | Create a todo |
| `GET` | `/api` | List todos; supports search, sorting, and pagination |
| `GET` | `/api/:id` | Get one todo by its MongoDB ID |
| `PUT` | `/api/:id` | Update a todo by its MongoDB ID |

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

`title` is required. `description` is optional.

### List todos

```http
GET /api?search=groceries&sort=asc&page=1&limit=10
```

- `search`: case-insensitive match against the title
- `sort`: `asc` sorts titles ascending; any other value (or omission) sorts descending
- `page`: page number (default `1`)
- `limit`: results per page (default `10`)

### Get or update a todo

```http
GET /api/<todo-id>
```

```http
PUT /api/<todo-id>
Content-Type: application/json
```

```json
{
  "title": "Buy groceries today",
  "description": "Milk, bread, and fruit",
  "completed": true
}
```

The update endpoint requires a non-empty `title`. It updates `title` and `description`.