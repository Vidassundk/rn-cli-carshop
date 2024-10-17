Car Shop
Welcome to Car Shop, a comprehensive React Native application designed to help users manage and view car listings. Whether you're looking to add your own vehicles, explore cars from others, or fine-tune your preferences through filters and sorting, Car Shop offers a seamless and intuitive experience.

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

## Features

- Add New Cars: Users can add new cars with details such as brand, model, year, gearbox, color, and photo.
- View Car Listings: Browse through a comprehensive list of cars, including those uploaded by other users.
- Filter and Sort: Utilize advanced filtering and sorting options to find cars that match your preferences.
- Geolocation: Find cars near your current location with integrated geolocation features.
- User Settings: Manage personal information, set a username, and switch between light and dark themes.
- Dark Mode Support: Enjoy a sleek dark mode for a comfortable viewing experience in low-light environments.
- Responsive Design: Optimized for various screen sizes and devices to ensure a consistent user experience.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Install Node.js (version 14 or higher recommended).
- Yarn: Install Yarn package manager.
- React Native Environment: Set up your development environment for React Native by following the official guide.

### Installation

Clone the Repository:

```bash
git clone https://github.com/yourusername/car-shop.git
cd car-shop
```

Install Dependencies:

```bash
yarn
```

Install iOS Pods (if developing for iOS):

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

Ensure you have a backend server set up and configured properly.

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
  - Manages data operations through repositories like CarPostsService and SupportedCarsService.
  - Contains constants used across the app, such as car colors.

### View:

- Location: src/views
- Responsibilities:
  - Renders the UI components and screens.
  - Utilizes reusable components to build screens like HomeScreen, DataListScreen, AddDataScreen, etc.
  - Handles user interactions and displays data provided by the ViewModel.

### ViewModel:

- Location: src/viewmodels
- Responsibilities:
  - Acts as an intermediary between the Model and the View.
  - Manages state and business logic.
  - Provides data and actions to the View through context and custom hooks.
  - Handles operations like adding a car (useAddCarForm), filtering cars (useCarFilters), and managing user data (useCarDataHandling).

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

## Technologies Used

- React Native: Framework for building native mobile apps using JavaScript and React.
- TypeScript: Typed superset of JavaScript that compiles to plain JavaScript.
- React Navigation: Routing and navigation for React Native apps.
- React Context: For managing global state such as theme and user information.
- Jest: JavaScript testing framework.
- React Native Vector Icons: Icon library for React Native.
- Other Libraries: As required by components and features.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the Repository.
2. Create a New Branch:

```bash
git checkout -b feature/YourFeature
```

3. Make Your Changes and Commit Them:

```bash
git commit -m "Add your feature"
```

4. Push to the Branch:

```bash
git push origin feature/YourFeature
```

5. Open a Pull Request.

## License

This project is licensed under the MIT License.
