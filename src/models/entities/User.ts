export type User = {
  userId: string;
  userName: string;
  darkModePreference: boolean;
  changeUserName: (newUserName: string) => void;
  toggleDarkMode: () => void;
};
