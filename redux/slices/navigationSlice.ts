import { createSlice } from '@reduxjs/toolkit';

export interface NavigationStateTypes {
  dashboardMobileMenuActive: boolean;
}

const initialState: NavigationStateTypes = {
  dashboardMobileMenuActive: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    openDashboardMobileMenu: (state: NavigationStateTypes) => {
      state.dashboardMobileMenuActive = true;
    },
    closeDashboardMobileMenu: (state: NavigationStateTypes) => {
      state.dashboardMobileMenuActive = false;
    },
  },
});

export const { openDashboardMobileMenu, closeDashboardMobileMenu } =
  navigationSlice.actions;

export default navigationSlice.reducer;
