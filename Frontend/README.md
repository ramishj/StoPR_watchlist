# StoPR Watchlist App

The StoPR Watchlist App is a web application that allows users to manage a personal watchlist of stocks. Users can add and remove stocks from their watchlist and view the latest stock prices. The app is built with a React frontend and a Node.js backend.

## Features

- User authentication (login and registration)
- Add and remove stocks from a personalized watchlist
- Fetch and display the latest stock prices
- Responsive design using Material-UI

## Project Structure

The project consists of two main parts:
1. **Frontend**: A React application that provides the user interface.
2. **Backend**: A Node.js server that handles authentication and manages the watchlist.

## Links

- **Frontend Repository**: [StoPR Watchlist Frontend](https://github.com/ramishj/StoPR_watchlist)
- **Backend Repository**: [StoPR Backend](https://github.com/ramishj/Stopr_Backend)
- **Backend Deployment**: [Backend Service](https://backend-12-5q67.onrender.com)
- **Frontend Deployment**: [Frontend Application](https://sto-pr-watchlist-gciv-4uj8zlpna-ramishjs-projects.vercel.app/)

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)
- Git

### Installation

1. **Clone the repositories:**

```bash
git clone https://github.com/ramishj/StoPR_watchlist.git
git clone https://github.com/ramishj/Stopr_Backend.git
```

2. **Install Dependencies:**

    Navigate to the frontend directory and install dependencies:

```bash
cd StoPR_watchlist
npm install
```  
     Navigate to the backend directory and install dependencies:

```bash 
cd ./Backend
npm install
```
3. ***Configuration:***<br>

    ### Backend Configuration:
    Create a .env file in the root of the backend directory and add the following environment variables, replacing placeholders with your actual values:
    ### Frontend Configuration:
    Update the `ServerLink` variable in the `ServerLink.tsx` file to point to your local backend server (e.g., `http://localhost:5000`).

4. **Running the Applications Locally:**<br>

    ### Start the backend server:
     ```bash
     cd ./Backend
     yarn install && yarn build
     yarn start
     ```
     ### Start the frontend server:
     ```bash
     cd ./StoPR_watchlist
     npm start
     ```

    The frontend application should now be running on http://localhost:3000

    ### Usage
    Get started with the StoPR Watchlist App and manage your stock watchlist effectively:

    #### Register or Login:

    - Create a new account if you're a new user.
    - Log in with your existing account credentials if you've already registered.

    #### Build Your Watchlist:

    - Use the search bar to find stocks you're interested in.
    - Add the desired stocks to your personalized watchlist.

    #### Track Market Trends:

    - View real-time stock prices on your dedicated dashboard.
    - Stay informed about market fluctuations and make informed decisions.

    #### Manage Your Watchlist:

    - Remove stocks from your watchlist when they no longer interest you.
    - Keep your watchlist focused and relevant to your investment goals.
