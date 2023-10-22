import { createSlice } from '@reduxjs/toolkit';

export interface NavigationStateTypes {
  dashboardMobileMenuActive: boolean;
  dashboardHeaderLinksActive: boolean;
}

const initialState: NavigationStateTypes = {
  dashboardMobileMenuActive: false,
  dashboardHeaderLinksActive: false,
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
      state.dashboardHeaderLinksActive = true;
    },
    closeDashboardHeaderLinks: (state: NavigationStateTypes) => {
      state.dashboardHeaderLinksActive = false;
    },
    toggleDashboardHeaderLinks: (state: NavigationStateTypes) => {
      if (state.dashboardHeaderLinksActive) {
        state.dashboardHeaderLinksActive = false;
      } else {
        state.dashboardHeaderLinksActive = true;
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
