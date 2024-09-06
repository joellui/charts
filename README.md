
# Django & Next.js Project

This project consists of a **Django backend** and a **Next.js frontend**, both running in Docker containers. The Django backend serves API endpoints, and the Next.js frontend fetches data from the backend to display charts.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

```
/bh_backend             # Django Backend
  ├── manage.py
  ├── Dockerfile
  ├── requirements.txt
  └── your_django_app/
  
/bh_frontend            # Next.js Frontend
  ├── package.json
  ├── Dockerfile
  └── pages/
  └── components/
  
docker-compose.yml      # Docker Compose configuration
README.md               # This file
```

## How to Run the Project

### Step 1: Clone the Repository

First, clone the project to your local machine:

```bash
git clone https://github.com/joellui/charts.git
cd charts
```

### Step 2: Build and Run the Containers

Use Docker Compose to build and start the containers for both the frontend and backend. Run the following command in the root of the project (where `docker-compose.yml` is located):

```bash
docker-compose up --build
```

This will:
- Build the Docker images for both the Django backend and Next.js frontend.
- Start both containers:
  - **Django backend** on `http://localhost:8000`
  - **Next.js frontend** on `http://localhost:3000`

### Step 3: Access the Application

Once the containers are up and running, you can access the application:

- **Django API**: `http://localhost:8000`
- **Next.js Frontend**: `http://localhost:3000`

### Step 4: Stopping the Containers

To stop the containers, press `Ctrl + C` in the terminal where Docker Compose is running. Alternatively, you can run the following command:

```bash
docker-compose down
```

This will stop and remove the containers.

## Troubleshooting

If you encounter issues with the setup, you can access the containers to inspect logs or files:

- To access the **Django backend** container:

  ```bash
  docker-compose exec bh_backend /bin/sh
  ```

- To access the **Next.js frontend** container:

  ```bash
  docker-compose exec bh_frontend /bin/sh
  ```

## Environment Variables

For customization, you can modify environment variables in the `docker-compose.yml` file. For example:

```yaml
bh_frontend:
  environment:
    - NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api
```

## Rebuilding Containers

If you make changes to the `Dockerfile`, `docker-compose.yml`, or any project code, you'll need to rebuild the containers:

```bash
docker-compose up --build
```

## Additional Commands

- **Running Django Migrations**:
  ```bash
  docker-compose exec bh_backend python manage.py migrate
  ```

- **Installing New Python Packages**:
  Add the package to `requirements.txt`, then rebuild the backend container:
  ```bash
  docker-compose up --build bh_backend
  ```

- **Installing New Node.js Packages**:
  Add the package to `package.json`, then rebuild the frontend container:
  ```bash
  docker-compose up --build bh_frontend
  ```


## Libraries and Tools Used

- **Django**: A Python web framework used for the backend API.
- **Django REST Framework**: Used for building the API in the Django backend.
- **Next.js**: A React framework used for the frontend, providing server-side rendering and static site generation.
- **React.js**: The JavaScript library used for building user interfaces.
- **Chart.js**: A charting library used in the frontend for rendering charts.
- **ApexCharts**: Used for rendering candlestick charts.
- **Docker**: Containerization tool used to run both the backend and frontend in isolated environments.
- **Docker Compose**: Used to manage multi-container Docker applications.

## Brief Explanation of Approach and Thought Process

1. **Containerization**: 
   The decision to use Docker ensures that the application can be run in any environment without dependency issues. Docker Compose is used to manage both the frontend (Next.js) and backend (Django) services, allowing for seamless communication between them.

2. **Separation of Frontend and Backend**: 
   The application is split into two distinct services: a Django backend that provides API endpoints and a Next.js frontend that fetches data from the backend and displays it using charts. This separation adheres to best practices and ensures that the services can be scaled independently if necessary.

3. **Data Visualization**:
   For visualizing data, Chart.js is used in the Next.js frontend for rendering various chart types (bar, line, pie), while ApexCharts is specifically used for rendering candlestick charts, which provide better support for financial-style data.

4. **TypeScript and Type Safety**: 
   In the frontend (Next.js), TypeScript is used to ensure that the data is strongly typed, which reduces runtime errors and improves maintainability. Interfaces were created for each chart data type to provide clarity and enforce structure.

By using modern technologies like Docker, Next.js, and Django, the project is set up to be modular, scalable, and easy to develop in different environments. The combination of REST APIs and frontend frameworks ensures that the project can be expanded with additional features in the future.
