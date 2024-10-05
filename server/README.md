# Running the Express Server

To run the Express server for this project, follow these steps:

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ctp-project.git
   ```
2. Navigate to the server directory:
   ```sh
   cd ctp-project/server
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Running the Server

1. Start the server:
   ```sh
   npm run start
   ```
2. The server should now be running on `http://localhost:3000`.

## Development

For development purposes, you can use `--watch` to automatically restart the server on file changes:

1. Run the script:
   ```sh
   npm run dev
   ```

## Testing

To run tests, use the following command:

```sh
npm test
```

## Environment Variables

Create a `.env` file in the `server` directory and add any necessary environment variables. For example:

```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/ctp-project
```

## Troubleshooting

If you encounter any issues, check the following:

- Ensure all dependencies are installed.
- Verify that the required environment variables are set correctly.
- Check the server logs for error messages.

For further assistance, refer to the project's [issue tracker](https://github.com/your-username/ctp-project/issues).
