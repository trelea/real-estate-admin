# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Routes Documentation

This section provides an overview of the various routes available within the admin dashboard. The routes are categorized based on the type of resources they handle: Authentication, Users, Apartments, Houses, Terrains, and Commercials.

### 1. **Authentication Routes**  
These routes handle user authentication and login.

- **`/signin`**  
  Route for user login. Used to authenticate users into the admin dashboard.

---

### 2. **Users Routes**  
These routes manage the user-related actions within the dashboard.

- **`/dashboard/users`**  
  This route displays a list of all users in the system. Admin can view and manage users.

---

### 3. **Apartment Routes**  
These routes are used to manage apartments within the admin dashboard. This includes listing, creating, viewing, editing, and filtering apartments based on various attributes.

- **`/dashboard/apartments`**  
  Route to view a list of all apartments.

- **`/dashboard/apartments/create`**  
  Route for creating a new apartment listing.

- **`/dashboard/apartments/{:id}`**  
  Route to view details of a specific apartment by its ID.

- **`/dashboard/apartments/{:id}/edit`**  
  Route for editing the details of a specific apartment.

- **`/dashboard/apartments/{stare, features, fond-locativ, ...}`**  
  Route for filtering apartments by various attributes, such as condition (`stare`), features, or type of property (`fond-locativ`).

---

### 4. **House Routes**  
These routes manage houses, similar to the apartment routes, allowing the admin to view, create, edit, and filter house listings.

- **`/dashboard/houses`**  
  Route to view a list of all houses.

- **`/dashboard/houses/create`**  
  Route for creating a new house listing.

- **`/dashboard/houses/{:id}`**  
  Route to view details of a specific house by its ID.

- **`/dashboard/houses/{:id}/edit`**  
  Route for editing the details of a specific house.

- **`/dashboard/houses/{stare, features, fond-locativ, ...}`**  
  Route for filtering houses by attributes like condition (`stare`), features, or type of property (`fond-locativ`).

---

### 5. **Terrain Routes**  
These routes manage terrain (land) listings. Admin can perform actions such as creating, editing, and filtering terrains based on specific criteria.

- **`/dashboard/terrains`**  
  Route to view a list of all terrains.

- **`/dashboard/terrains/create`**  
  Route for creating a new terrain listing.

- **`/dashboard/terrains/{:id}`**  
  Route to view details of a specific terrain by its ID.

- **`/dashboard/terrains/{:id}/edit`**  
  Route for editing the details of a specific terrain.

- **`/dashboard/terrains/{stare, features, fond-locativ, ...}`**  
  Route for filtering terrains by attributes like condition (`stare`), features, or type of property (`fond-locativ`).

---

### 6. **Commercial Routes**  
These routes handle commercial property listings. Similar to the routes for apartments, houses, and terrains, they provide functionality for creating, viewing, editing, and filtering commercial properties.

- **`/dashboard/commercials`**  
  Route to view a list of all commercial properties.

- **`/dashboard/commercials/create`**  
  Route for creating a new commercial property listing.

- **`/dashboard/commercials/{:id}`**  
  Route to view details of a specific commercial property by its ID.

- **`/dashboard/commercials/{:id}/edit`**  
  Route for editing the details of a specific commercial property.

- **`/dashboard/commercials/{stare, features, fond-locativ, ...}`**  
  Route for filtering commercial properties by attributes like condition (`stare`), features, or type of property (`fond-locativ`).

---

### Route Naming Convention

The naming convention for routes follows a clear pattern to maintain consistency across all resource types:

- **Create**: For adding new resources (e.g., `/dashboard/apartments/create`).
- **List**: For viewing all resources (e.g., `/dashboard/terrains`).
- **View**: For viewing details of a specific resource (e.g., `/dashboard/houses/{:id}`).
- **Edit**: For updating the details of an existing resource (e.g., `/dashboard/commercials/{:id}/edit`).
- **Filter**: For filtering resources based on specific attributes (e.g., `/dashboard/apartments/{stare, features, fond-locativ, ...}`).

This structure ensures that the admin dashboard is easy to navigate and maintain.

---

### Conclusion

These routes provide the necessary endpoints for managing resources within the admin dashboard. Each section corresponds to a specific resource type (users, apartments, houses, terrains, commercials) and follows a predictable route structure for creating, viewing, editing, and filtering data.

