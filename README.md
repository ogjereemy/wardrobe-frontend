# Wardrobe Management System - Frontend

This is the frontend for the Wardrobe Management System, a Vue 3 application that allows users to manage their clothing items. The application provides features for adding, editing, deleting, and searching clothing items, with categories for better organization.

## Features

- User Authentication (Login/Registration)
- Add, Edit, and Delete Clothing Items
- Categorize Clothing Items (e.g., Tops, Bottoms, Shoes)
- Search and Filter Items
- Responsive and User-Friendly Interface

## Technologies Used

- Vue 3
- Vue Router
- Axios (for API requests)
- Tailwind CSS (for styling)

## Project Setup

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone
    https://github.com/ogjereemy/wardrobe-frontend.git or
   git@github.com:ogjereemy/wardrobe-frontend.git

   cd wardrobe-management-frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
   or if you're using yarn:
   ```bash
   yarn install
   ```

### Running the Application

To run the application in development mode, use the following command:

```bash
npm run serve
```

This will start a local server and you can view the application in your browser at `http://localhost:5173`.

### Building for Production

To build the application for production, use:

```bash
npm run build
```

This will create a `dist` folder with optimized assets ready for deployment.

### Linting

To lint and fix errors in the project, run:

```bash
npm run lint
```

## API Integration

The application interacts with a backend API to manage clothing items. Ensure that the backend is running and properly configured to allow the frontend to communicate via API requests. You can configure the backend API URL in the `.env` file.

### Example `.env` Configuration

Create a `.env` file in the project root and add the following:

```
    Backend repository Url = https://github.com/ogjereemy/wardrobe-backend.git
```

```
Backend_Url=http://localhost:8000/api/
```

## Folder Structure

- `src/`
  - `assets/` - Static assets such as images and fonts
  - `components/` - Vue components used across the app
  - `views/` - Main pages (e.g., Home, Add Item, Edit Item)
  - `store/` - Vuex store for managing application state
  - `router/` - Vue Router configuration
  - `services/` - API service integration (e.g., Axios)

## Contributions

Feel free to contribute to the project by submitting pull requests or opening issues. Please follow the code style and conventions already in place.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
