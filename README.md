# 🎬 Best Movies App

A web application for discovering movies, built with **React** and integrated with the **TMDB (The Movie Database) API**.

The application allows users to search for movies, view relevant information, and track the most searched titles. **Appwrite** is used as the backend service to store search metrics and generate the trending movies section.

🔗 **[Live Demo](https://bestmovies-app-felipeazsantos.vercel.app/)**

🔗 **[GitHub Repository](https://github.com/felipeazsantos/bestmovies-app)**

---

## 📸 Preview

> Add a screenshot or GIF of the application here.
>
> For a portfolio project, I recommend adding one image showing the home page and another showing a movie search.

```text
public/
└── preview.png
```

Then:

```markdown
![Best Movies App](./public/preview.png)
```

---

## ✨ Features

* 🔎 Search for movies using the TMDB API
* 🎬 Display movies and their main information
* ⭐ Display movie ratings
* 📊 Track user searches
* 🔥 Display the most searched movies
* ⏳ Loading states during API requests
* ⚠️ Empty and error states
* 📱 Responsive interface
* ⚡ Fast development and production builds with Vite
* 💾 Search metrics persistence using Appwrite

---

## 🛠️ Technologies

### Frontend

* [React](https://react.dev/) — UI development
* [Vite](https://vite.dev/) — development server and build tool
* [Tailwind CSS](https://tailwindcss.com/) — styling
* [React Use](https://github.com/streamich/react-use) — utility hooks

### Backend / BaaS

* [Appwrite](https://appwrite.io/) — search metrics persistence

### API

* [TMDB](https://www.themoviedb.org/) — movie data and information

### Deployment

* [Vercel](https://vercel.com/) — hosting and deployment

---

## 🏗️ Architecture

The application uses a React-based frontend that communicates with two external services:

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      React      │
                    │      + Vite     │
                    └───────┬─┬───────┘
                            │ │
                ┌───────────┘ └────────────┐
                ▼                          ▼
       ┌─────────────────┐        ┌─────────────────┐
       │       TMDB      │        │     Appwrite    │
       │                 │        │                 │
       │  Movie data     │        │ Search metrics  │
       │                 │        │                 │
       └─────────────────┘        └─────────────────┘
```

**TMDB** provides the movie data, while **Appwrite** is used to store and retrieve user search metrics.

---

## 🔎 How Search Works

When a user searches for a movie:

```text
User
 │
 │ searches "Spider"
 ▼
React
 │
 ├──────────────► TMDB
 │                   │
 │                   ▼
 │              Search results
 │
 └──────────────► Appwrite
                     │
                     ▼
                 Search metric
```

The application retrieves the movie results from TMDB and also records the search term in Appwrite.

This allows the application to identify which search terms are generating the most interest.

---

## 📊 Trending Movies

Searches performed by users are stored in Appwrite.

The application uses this data to identify the most frequently searched terms and display them in the trending section.

For example:

```text
Search              Count

Spider-Man          ███████████████
Batman              ███████████
Avengers            ████████
Interstellar        █████
```

This adds a simple **behavior-based analytics layer** to the application rather than making it only a movie search interface.

---

## 📁 Project Structure

The main project structure is organized as follows:

```text
bestmovies-app/
│
├── public/
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── App.jsx
│   ├── appwrite.js
│   ├── index.css
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

The separation between UI components, API integrations, and Appwrite configuration helps keep the application organized and maintainable.

---

## ⚙️ Getting Started

### Prerequisites

Before running the project, make sure you have:

* Node.js installed
* npm installed
* A TMDB account
* An Appwrite project

### 1. Clone the repository

```bash
git clone https://github.com/felipeazsantos/bestmovies-app.git
```

Navigate to the project directory:

```bash
cd bestmovies-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```bash
touch .env
```

Use `.env.example` as a reference.

Example:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key

VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
```

> **Important:** Never commit your `.env` file to GitHub.

The application uses the `VITE_` prefix because these environment variables need to be available to the frontend during the Vite build process.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the URL provided by Vite, usually:

```text
http://localhost:5173
```

---

## 🗄️ Appwrite Configuration

To enable search metrics, you need to configure an Appwrite project.

Create a database and a table for storing search metrics:

```text
Appwrite Project
      │
      ▼
   Database
      │
      ▼
    Metrics
      │
      ├── searchTerm
      └── ...
```

The application uses Appwrite to store user search terms and retrieve this information when generating the trending section.

> The IDs configured in the application must match the actual Database and Table IDs configured in Appwrite.

---

## 🔐 Environment Variables

| Variable                   | Description                 |
| -------------------------- | --------------------------- |
| `VITE_TMDB_API_KEY`        | API key used to access TMDB |
| `VITE_APPWRITE_ENDPOINT`   | Appwrite project endpoint   |
| `VITE_APPWRITE_PROJECT_ID` | Appwrite project ID         |

### Security

Since this is a frontend application, any variable prefixed with `VITE_` can potentially be exposed in the final JavaScript bundle.

Therefore:

**Never store server-side API keys, administrative credentials, or private secrets in `VITE_*` environment variables.**

Appwrite should be configured with appropriate permissions for the operations performed by the frontend.

---

## 🚀 Deployment

The application is deployed using Vercel.

### Deploying with GitHub + Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the application.

Vite uses the following command to generate the production build:

```bash
npm run build
```

The production files are generated in:

```text
dist/
```

After the project is configured, new pushes to the production branch can automatically trigger new deployments.

---

## 📜 Scripts

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Starts the development server         |
| `npm run build`   | Creates the production build          |
| `npm run preview` | Previews the production build locally |
| `npm run lint`    | Runs ESLint                           |

---

## 🎯 Project Goals

This project was developed as part of my journey to deepen my knowledge of frontend development with React.

Beyond building the interface, the project focuses on practicing concepts commonly used in real-world applications:

* REST API consumption
* State management
* Reusable components
* React hooks
* Asynchronous operations
* Loading and error states
* Integration with external services
* Data persistence
* Usage metrics
* Environment variables
* Production builds
* Continuous deployment

---

## 📚 What I Learned

During the development of this project, I practiced several important concepts.

### React

* Component composition
* State management
* `useEffect`
* Custom hooks
* Conditional rendering
* Component communication

### APIs

* Consuming external APIs
* Handling asynchronous requests
* Error handling
* Organizing API calls

### Appwrite

* Setting up an Appwrite project
* Connecting a frontend application to Appwrite
* Creating and querying records
* Using queries
* Storing search metrics

### Frontend Development

* Building responsive interfaces
* Component organization
* Loading states
* Empty states
* Search experience

### Deployment

* Environment variable configuration
* Production builds
* Deployment with Vercel

---

## 🔮 Future Improvements

Some possible improvements for future versions:

* [ ] Add a movie details page
* [ ] Add pagination
* [ ] Improve error handling
* [ ] Add automated tests
* [ ] Add component tests
* [ ] Improve accessibility
* [ ] Add favorite movies
* [ ] Add user authentication
* [ ] Add filters by genre, year, and rating
* [ ] Improve analytics
* [ ] Migrate the project to TypeScript
* [ ] Optimize image loading
* [ ] Add skeleton loading states

---

## 👨‍💻 Author

**Felipe Azevedo**

Software developer with experience in backend and full-stack development, currently focusing on deepening my knowledge of frontend development.

### Connect with me

* GitHub: [@felipeazsantos](https://github.com/felipeazsantos)
* LinkedIn: [Felipe Azevedo](https://www.linkedin.com/)

---

## 📄 License

This project was developed for learning and portfolio purposes.
