import { createSlice } from '@reduxjs/toolkit';

export interface NavigationStateTypes {
  dashboardMobileMenuActive: boolean;
  dashboardHeaderLinks: boolean;
}

const initialState: NavigationStateTypes = {
  dashboardMobileMenuActive: false,
  dashboardHeaderLinks: false,
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
    openDashboardHeaderLinks: (state: NavigationStateTypes) => {
      state.dashboardHeaderLinks = true;
    },
    closeDashboardHeaderLinks: (state: NavigationStateTypes) => {
      state.dashboardHeaderLinks = false;
    },
    toggleDashboardHeaderLinks: (state: NavigationStateTypes) => {
      if (state.dashboardHeaderLinks) {
        state.dashboardHeaderLinks = false;
      } else {
        state.dashboardHeaderLinks = true;
      }
    },
  },
});

export const {
  openDashboardMobileMenu,
  closeDashboardMobileMenu,
  openDashboardHeaderLinks,
  closeDashboardHeaderLinks,
  toggleDashboardHeaderLinks,
} = navigationSlice.actions;

export default navigationSlice.reducer;
