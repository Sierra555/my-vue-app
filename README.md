# Find Vue Job

Find Vue Job is a job listing application built with Vue.js and an Express backend, using MongoDB for data storage.

## Features

- Display job listings with details like title, type, location, and salary.
- Fetch job listings from MongoDB.
- Add, update, and delete job listings.
- Serve the frontend from the Express server.

## Technologies Used

- **Frontend:** Vue.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Deployment:** Render

## Setup Instructions

1. Clone the repository:

   ```sh
   git clone https://github.com/Sierra555/my-vue-app
   cd find-vue-job
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and add your MongoDB connection string:

   ```sh
   MONGO_URL=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the server:

   ```sh
   npm start
   ```

5. The app will be available at `http://localhost:5173`.

## API Endpoints

- `GET /api/jobs` - Get all job listings
- `GET /api/jobs/:id` - Get a single job by ID
- `POST /api/jobs` - Add a new job
- `PUT /api/jobs/:id` - Update a job
- `DELETE /api/jobs/:id` - Delete a job

## Deployment

- The frontend is served from the `dist` folder.
- Make sure to build the frontend before deployment:

  ```sh
  npm run build
  ```

## License

This project is licensed under the MIT License.
