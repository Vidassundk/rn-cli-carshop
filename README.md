## Car Shop

Car Shop is a React Native app for managing and exploring car listings. Users can add their own vehicles, browse listings from others, and use filters and sorting to refine their search. For added realism, users are only permitted to delete vehicles they have personally uploaded (pre-loaded data in the database reflects this, among ability to add your own). The app also features Geolocation capabilities, including map integration with real-time location tracking, zoom controls, re-centering, and following functionality.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
- [MVVM Architecture Overview](#mvvm-architecture-overview)
  - [Benefits of MVVM](#benefits-of-mvvm)
  - [File Responsibilities](#file-responsibilities)
- [Running Tests](#running-tests)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Screens

- Home Screen - Welcomes the user and provides information about navigation options and the current data or connection status.
- Data List Screen - Data List with filtration, sorting, searching and crud available under one screen. Also linking to "Add Car Screen" and "Detail Screen".
- Add Car Screen - Fun form to have your own vehicles to the list.
- Detail Screen - Larger image of a car and ability to clearly see all related data.
- Geolocation Screen - Full screen map with close tracking of coordinates and basic exploration features.
- Settings Screen - Alter User State or Theme State in form of Settings.

## Features

- Add New Cars: Users can add new cars with details such as brand, model, year, gearbox, color, and photo.
- View Car Listings: Browse through a comprehensive list of cars, including those uploaded by other users.
- Filter and Sort: Utilize advanced filtering and sorting options to find cars that match your preferences.
- Geolocation: Geolocation feature to see your coordinates on the map and track your movement.
- User Settings: Manage personal information, set a username, and switch between light and dark themes.
- Dark Mode Support: Enjoy a sleek dark mode for a comfortable viewing experience in low-light environments.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Install Node.js (version 14 or higher recommended).
- Yarn: Install Yarn package manager.
- React Native Environment: Set up your development environment for React Native by following the official guide.

### Installation

Clone the Repository:

```bash
git clone https://github.com/Vidassundk/rn-cli-carshop.git
cd CarShop
```

Install Dependencies:

```bash
yarn quick-start
```

Install Pods without quick-start

```bash
yarn pods
```

Start the Metro Bundler:

```bash
yarn start
```

Run the App:

- For iOS:

```bash
yarn ios
```

- For Android:

```bash
yarn android
```

Start the Backend Server (if applicable):

```bash
yarn server
```

json-server is located in db.json

## Project Structure

The project follows the MVVM (Model-View-ViewModel) architectural pattern, promoting a clear separation of concerns and facilitating maintainable, testable, and scalable code.

```markdown
src
├── App.tsx
├── models
│ ├── constants
│ │ └── carColors.ts
│ ├── entities
│ │ ├── Car.ts
│ │ ├── SupportedCar.ts
│ │ └── User.ts
│ └── repositories
│ ├── CarPostsService.ts
│ ├── SupportedCarsService.ts
│ └── tests
│ ├── CarPostsService.test.ts
│ └── SupportedCarsService.test.ts
├── navigation
│ └── AppNavigator.tsx
├── utils
│ └── hooks
│ ├── tests
│ │ └── useYearOptions.test.ts
│ └── useYearOptions.ts
├── viewmodels
│ ├── context
│ │ ├── ThemeContext.tsx
│ │ ├── UserContext.tsx
│ │ └── tests
│ │ ├── ThemeContext.test.tsx
│ │ └── UserContext.test.tsx
│ ├── data
│ │ ├── tests
│ │ │ ├── useCarPostsService.test.ts
│ │ │ ├── useGeolocation.test.ts
│ │ │ └── useSupportedCarService.test.ts
│ │ ├── useCarPostsService.ts
│ │ ├── useGeolocation.ts
│ │ └── useSupportedCarService.ts
│ └── handling
│ ├── addCar
│ │ ├── tests
│ │ │ ├── useAddCarForm.test.ts
│ │ │ ├── useCarImageUploader.test.ts
│ │ │ └── useCarValidation.test.ts
│ │ ├── useAddCarForm.ts
│ │ ├── useCarImageUpdater.ts
│ │ └── useCarValidation.ts
│ └── viewCars
│ ├── tests
│ │ ├── useCarDataHandling.test.ts
│ │ ├── useCarFilters.test.ts
│ │ ├── useCarSearch.test.ts
│ │ └── useCarSorting.test.ts
│ ├── useCarDataHandling.ts
│ ├── useCarFilters.ts
│ ├── useCarSearch.ts
│ └── useCarSorting.ts
└── views
├── components
│ ├── CarItem.tsx
│ ├── FilterButton.tsx
│ ├── FilterModal.tsx
│ ├── Loader.tsx
│ ├── NavigatableText.tsx
│ ├── PickerComponent.tsx
│ ├── PickerField.tsx
│ ├── PickerModal.tsx
│ └── ThemedText.tsx
└── screens
├── AddDataScreen.tsx
├── DataListScreen
│ ├── tests
│ │ └── DataListScreen.test.tsx
│ ├── components
│ │ ├── FiltersHeader.tsx
│ │ ├── SearchBar.tsx
│ │ ├── SortingHeader.tsx
│ │ └── tests
│ │ ├── FiltersHeader.test.tsx
│ │ ├── SearchBar.test.tsx
│ │ └── SortingHeader.test.tsx
│ └── index.tsx
├── DetailScreen
│ ├── AnimatedHeader.tsx
│ ├── tests
│ │ ├── AnimatedHeader.test.tsx
│ │ └── DetailScreen.test.tsx
│ └── index.tsx
├── GeolocationScreen.tsx
├── HomeScreen.tsx
├── SettingsScreen.tsx
└── tests
├── AddDataScreen.test.tsx
├── GeolocationScreen.test.tsx
├── HomeScreen.test.tsx
└── SettingsScreen.test.tsx
```

## MVVM Architecture Overview

### Model:

- Location: src/models
- Responsibilities:
  - Defines the data structures (entities) such as Car, User, and SupportedCar.
  - Manages car data operations using repositories such as CarPostsService and SupportedCarsService, leveraging Axios for server communication. These services perform key actions like retrieving the list of cars, adding new cars, updating existing ones, and deleting cars from the system.
  - Contains constants used across the app, such as car colors.

### View:

- Location: src/views
- Responsibilities, Benefits, and Features:
  - Renders the UI components and screens.
  - Utilizes reusable components to build UI @/views/components.
  - Full unique screen UI's from /components and react-native components @/views/screens - sometimes broken down into smaller components.
  - Handles user interactions and displays data provided by the ViewModel.
  - Only Handles UI logic, keeping testing simple.
  - Test Covered full Screens.

### ViewModel:

- Location: src/viewmodels
- Responsibilities, Benefits, and Features:
- Acts as an intermediary between the Model and the View, managing data flow and UI updates.
- Manages state and business logic effectively, ensuring a clear separation of concerns.
- Provides Context State (e.g., UserContext, ThemeContext) for accessing and modifying preferences, with automatic persistence in AsyncStorage.
- Integrates with server data through React Query, synchronizing state with APIs like /api/carPosts and /api/supportedCarBrandsAndModels.
- Handles complex operations such as adding new cars via forms (e.g., useAddCarForm) or displaying fully filtered and sorted live data (useCarDataHandling), leveraging modular and reusable custom hooks like useCarImageUpdater, useCarFilters, useCarSearch, and useCarValidation.
- Grouped into feature-specific modules (e.g., handlers/viewCars, handlers/addCar), with a collection of hooks that offer clear organization and scalability.
- Hook modularization allows separation of concerns for easier testing and improved functionality. Larger grouped hooks can be used for specific screens, while smaller hooks remain flexible for other components.
- The useGeolocation hook enables access to user location coordinates, live updates, and features like "follow," "re-center," and "zoom," which can be integrated with MapView.
- All files are covered by unit tests, ensuring reliability and maintainability.

### Benefits of MVVM

- Separation of Concerns:
  - Model, View, and ViewModel are clearly separated, making the codebase easier to manage and understand.
  - Enhances maintainability by allowing developers to work on different parts of the app independently.
- Testability:
  - ViewModels can be unit tested without relying on the UI, ensuring that business logic works as expected.
  - Facilitates writing comprehensive tests for data handling and state management.
- Reusability:
  - Reusable components and hooks reduce code duplication and promote consistency across the app.
  - ViewModels can be reused across different views if needed.
- Scalability:
  - The architecture supports scaling as the app grows, allowing for the addition of new features without major refactoring.
  - Modular structure makes it easier to navigate and extend the codebase.
- Enhanced Readability:
  - Clear separation and organized file structure improve code readability and developer onboarding.
  - Simplifies understanding the flow of data and control within the app.

## Running Tests

The project includes unit tests for various components, hooks, and services. To run the tests, execute:

```bash
yarn test
```

This command will run all test suites located in the **tests** directories throughout the project.

## Running TypeScript Checks

To ensure type safety and catch potential issues, you can run TypeScript checks by executing:

```bash
yarn tsc
```

This command will run typescript checks on all typescript files.

## Running Linting

To ensure type safety and catch potential issues, you can run TypeScript checks by executing:

```bash
yarn lint
```

This command will run lint on all files in the repository.

## Key Technologies Used

- React Native: The framework at the core of CarShop, allowing you to build native mobile apps using JavaScript and React. It powers both Android and iOS versions of the app.
- TypeScript: A typed superset of JavaScript, providing static type-checking, improving code quality, and preventing runtime errors. It ensures robust type safety throughout the codebase.
- React Navigation: Used to manage navigation and routing within the app. CarShop uses @react-navigation/native, @react-navigation/stack, and @react-navigation/bottom-tabs to provide a seamless multi-screen experience with tabbed and stack-based navigation.
- React Query: Integrated via @tanstack/react-query, it simplifies server data synchronization for CarShop. It manages caching, background updates, and syncing of the car data from APIs like api/carPosts and api/supportedCarBrandsAndModels.
- React Context: Manages global state such as user preferences (UserContext) and theme preferences (ThemeContext), with automatic persistence through AsyncStorage (@react-native-async-storage/async-storage).
- Axios: The app uses axios for handling all HTTP requests, allowing CarShop to interact with server data for actions like fetching, adding, updating, and deleting car posts.
- Geolocation and Maps: CarShop includes location-based features with react-native-geolocation-service for accessing the user’s GPS coordinates and react-native-maps for map integration. This is especially useful in features such as showing nearby car dealerships or visualizing a car’s location.
- JSON Server: A lightweight mock server (json-server) used during development to simulate RESTful API behavior, enabling you to develop and test against car data without requiring a full backend.
- Jest and React Testing Library: The app’s testing framework includes Jest (jest, babel-jest) and React Testing Library for unit and integration tests on components, hooks, and services. Testing hooks like useAddCarForm, useCarFilters, and more ensure all business logic works as expected.
- Prettier and ESLint: Prettier is used for formatting code, and ESLint ensures consistent code style and catches potential errors early. The setup helps maintain clean, readable, and high-quality code.

## What could be better, where to continue?

- UI is responsive but not beautiful. It functions well but needs expansion of UI components and more time on screens.
- View /components Unit Tests - Only Screens are covered.
- Android adjustments for smooth multi-platform experience. App was built as IOS-first.
- Navigation types streamlining and refactoring. We have to TS errors but it still needs work.
- Type casting / "any" being used in a few tests. There are not many of them so it would be good to refactor. "any" is never used in components / hooks.

## License

This project is licensed under the MIT License.
