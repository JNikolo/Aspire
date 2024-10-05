# ctp-project

This repository contains the code for the CTP Project. The project is divided into two main parts: the client and the server.

## Client

The client folder contains the frontend code of the project. It is built using modern web technologies and frameworks.

### Structure

- **.gitignore**: Specifies files and directories to be ignored by Git.
- **eslint.config.js**: Configuration file for ESLint.
- **index.html**: The main HTML file for the client.
- **package.json**: Contains metadata about the project and its dependencies.
- **public/**: Contains static assets.
- **README.md**: Documentation for the client.
- **src/**: Contains the source code for the client.
  - **App.css**: CSS file for the main App component.
  - **App.jsx**: Main App component.
  - **assets/**: Contains images, fonts, and other assets.
  - **index.css**: Global CSS file.
  - **main.jsx**: Entry point for the client application.
- **vite.config.js**: Configuration file for Vite.

## Server

The server folder contains the backend code of the project. It is built using Node.js and Express.

### Structure

- **.gitignore**: Specifies files and directories to be ignored by Git.
- **index.js**: Entry point for the server application.
- **package.json**: Contains metadata about the project and its dependencies.
- **README.md**: Documentation for the server.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/ctp-project.git
   ```

2. Install dependencies for the client:

   ```sh
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```sh
   cd ../server
   npm install
   ```

### Running the Project

#### Client

To run the client application, navigate to the `client` directory and start the development server:

```sh
cd client
npm run dev
```

#### Server

To run the `server` application, navigate to the server directory and start the server:

```sh
cd server
npm start
```
