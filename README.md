WEXA CognoDB — Frontend

React frontend for the WEXA CognoDB graph application.

Overview

The frontend provides the UI for:

Dashboard

Developers

Jobs

Skills

Projects

Developer recommendations

Recommendation graph visualization

It communicates with the Express backend through Axios and uses TanStack React Query for server-state management.

Tech Stack

React 19

TypeScript

Vite

Tailwind CSS v4

TanStack React Query

Axios

React Router

Lucide React

@xyflow/react / React Flow

Folder Structure

frontend/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── public/
└── src/
    ├── assets/
    ├── features/
    │   ├── api/
    │   │   └── api.ts
    │   ├── components/
    │   │   ├── common/
    │   │   ├── hooks/
    │   │   └── layout/
    │   └── pages/
    │       ├── Dashboard/
    │       ├── Developers/
    │       ├── Jobs/
    │       ├── Projects/
    │       ├── Recommendations/
    │       └── Skills/
    ├── App.tsx
    ├── App.css
    ├── index.css
    └── main.tsx

Feature Architecture

The feature pages use a presentation/domain/data separation.

Page
  ↓
Presentation Hook
  ↓
Domain Use Case
  ↓
Domain Repository Interface
  ↓
Data Repository Implementation
  ↓
Axios API
  ↓
Backend API

For example, the Developers feature follows:

Developers.tsx
  ↓
useDevelopers()
  ↓
GetDevelopers
  ↓
DeveloperRepositoryImpl
  ↓
API client
  ↓
GET /api/developers

The same pattern is used for Jobs, Skills, Projects, and Recommendations.

Main Routes

/                         Dashboard
/developers               Developers
/jobs                     Jobs
/skills                   Skills
/projects                 Projects
/recommendations/:id      Developer Recommendations

Example recommendation route:

/recommendations/DEV001

The developer ID is taken from the route and passed to the recommendation hooks.

Search and Infinite Scroll

Developers and Skills use infinite scrolling.

Search input
   ↓
useDebounce()
   ↓
React Query queryKey
   ↓
API request
   ↓
First page
   ↓
IntersectionObserver
   ↓
fetchNextPage()
   ↓
Next page

The listing API uses:

?page=1&limit=10&search=react

The frontend combines the returned pages into one list.

Jobs and Projects use the corresponding backend pagination/search response according to their feature implementation.

Recommendation Graph

The recommendation page uses the recommendation hooks:

useDeveloperJobs()
useRelatedSkillJobs()
useSimilarDevelopers()

The flow is:

Recommendations/:developerId
        ↓
Recommendation Hooks
        ↓
Recommendation Repository
        ↓
Backend Recommendation API
        ↓
Recommendation Results
        ↓
React Flow

The graph represents:

Developer
   ├── Matching Jobs
   │      └── Company
   │
   ├── Related Skill Jobs
   │      └── Related Skills
   │
   └── Similar Developers

React Flow provides the interactive graph with nodes, edges, arrows, zoom controls, minimap and responsive graph layout.

Backend Connection

The current local backend/API configuration is:

Frontend: http://localhost:5173
Backend:  http://localhost:5001
API:      http://localhost:5001/api

If the backend port changes, update the frontend API configuration accordingly.

Installation

From the frontend directory:

npm install

Run Development Server

npm run dev

Vite normally starts the frontend at:

http://localhost:5173

Production Build

npm run build

Preview Production Build

npm run preview

Lint

npm run lint

Frontend Environment

If the project uses frontend environment configuration, create the required .env file from the provided environment template/configuration.

Do not commit private credentials or secrets.

Development Flow

For a UI change:

Page
 ↓
Presentation Component
 ↓
Hook
 ↓
Use Case
 ↓
Repository
 ↓
API

For a data/API issue, trace the feature in the reverse direction:

UI
 ↓
Hook
 ↓
Repository
 ↓
API endpoint
 ↓
Backend

For navigation issues, check the React Router configuration.

For graph issues, check:

Recommendations page
 ↓
useDeveloperJobs()
useRelatedSkillJobs()
useSimilarDevelopers()
 ↓
RecommendationRepositoryImpl
 ↓
API response shape
 ↓
Node/edge mapping
 ↓
React Flow

Important Dependency

The recommendation graph requires:

npm install @xyflow/react

The project package declares @xyflow/react; running npm install in the frontend should install it.

Common Commands

npm install
npm run dev
npm run build
npm run lint
npm run preview

Troubleshooting

Frontend cannot reach backend

Check that the backend is running:

http://localhost:5001

Then verify the frontend API base URL points to:

http://localhost:5001/api

Recommendation graph is empty

Check:

A valid developer ID is present in the URL.

Recommendation APIs return data.

The frontend response mapping uses job.id, company.id, and developer.id.

Graph node IDs are unique.

Graph edges reference existing node IDs.

Duplicate React keys

Every graph node should have a unique ID. Avoid values such as:

developer-job-undefined

Use the actual API IDs:

developer-job-JOB001
developer-skill-job-JOB013
developer-similar-DEV006

Objects rendered as React children

Recommendation API objects such as company and job must be accessed through their properties.

For example:

company.name
job.title
developer.name

Do not render the complete object directly.

Recommended Reading Order

package.json
   ↓
vite.config.ts
   ↓
tsconfig files
   ↓
src/main.tsx
   ↓
src/App.tsx
   ↓
feature page
   ↓
presentation hook
   ↓
domain use case
   ↓
repository
   ↓
API client