# Implementation Plan

- [x] 1. Initialize project structure and dependencies





  - Create Vite project with vanilla template
  - Install and configure Tailwind CSS, PostCSS, and Autoprefixer
  - Install Chart.js library
  - Set up project directory structure (src/api, src/components, src/views, src/ui)
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 2. Create mock data and API adapter layer





  - [x] 2.1 Implement mock data source


    - Create src/api/api.mock.js with KPI data structure
    - Add revenue chart mock data (monthly, weekly, today periods)
    - Add orders summary chart mock data (monthly, weekly, today periods)
    - Add orders list mock data (minimum 6 order records)
    - _Requirements: 6.3, 6.4_

  - [x] 2.2 Implement API adapter interface

    - Create src/api/api.adapter.js with getKpis() function
    - Implement getRevenue(period) function
    - Implement getOrdersSummary(period) function
    - Implement getOrders() function
    - Ensure all functions return mock data initially
    - _Requirements: 6.1, 6.2, 6.5, 6.6, 6.7_

- [x] 3. Build reusable UI components






  - [x] 3.1 Create Progress Bar component


    - Implement createProgressBar() function in src/components/progress-bar.js
    - Add support for percentage, color (purple/black/gray/pink), and height parameters
    - Add smooth animation for progress fill
    - _Requirements: 1.6, 1.7, 8.2_
  - [x] 3.2 Create KPI Card component


    - Implement createKpiCard() function in src/components/kpi-card.js
    - Add support for title, value, percentage, progress, and variant (dark/light) parameters
    - Integrate Progress Bar component
    - Apply dark background styling for 'dark' variant
    - Apply light background styling for 'light' variant
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 8.1_
  - [x] 3.3 Create Status Badge component



    - Implement createStatusBadge() function in src/components/status-badge.js
    - Add color mapping for 'new', 'on-delivery', and 'completed' statuses
    - Apply pastel colors according to design system
    - _Requirements: 4.4, 4.5, 8.5_
  - [x] 3.4 Create Data Table component



    - Implement createDataTable() function in src/components/data-table.js
    - Add support for columns configuration (key, label, sortable, render)
    - Implement table header with sort icons
    - Implement table body with row rendering
    - Add hover effect for table rows
    - Enable horizontal scrolling for mobile devices
    - Integrate Status Badge component for status column
    - _Requirements: 4.1, 4.2, 4.3, 4.6, 4.7, 8.4_
  - [x] 3.5 Create Chart Card component



    - Implement createChartCard() function in src/components/chart-card.js
    - Add support for title, chartType (line/bar), data, and periods parameters
    - Create period switcher buttons (Monthly/Weekly/Today)
    - Implement Chart.js canvas integration
    - Add onPeriodChange callback for data updates
    - Return both element and updateChart function
    - _Requirements: 2.8, 3.7, 8.3_

- [x] 4. Implement Chart.js configurations





  - [x] 4.1 Configure Revenue line chart


    - Set up Chart.js global defaults (font, colors)
    - Create line chart configuration with area fill
    - Configure two datasets: Income and Expenses
    - Set up X-axis with monthly labels (Jan-Jul)
    - Add smooth curve tension (0.4)
    - Configure legend position and tooltip
    - Format Y-axis ticks to show 'k' suffix
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 4.2 Configure Orders Summary bar chart

    - Create bar chart configuration
    - Configure 2-3 datasets with pastel colors (black, light purple, gray)
    - Set up X-axis with date labels (Jun 24-27)
    - Format Y-axis ticks to show 'k' suffix
    - Disable legend display
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 4.3 Implement chart data update mechanism

    - Create updateChart() function to refresh chart data
    - Handle period switching (monthly/weekly/today)
    - Ensure smooth transitions between data updates
    - _Requirements: 2.5, 2.6, 2.7, 3.5, 3.6_

- [x] 5. Build Dashboard view




  - [x] 5.1 Create dashboard layout structure


    - Implement renderDashboard() function in src/views/dashboard.js
    - Create main container with proper spacing
    - Set up grid layout for KPI cards section
    - Set up grid layout for chart cards section
    - Set up full-width section for order list table
    - _Requirements: 1.1, 2.1, 3.1, 4.1_

  - [x] 5.2 Integrate KPI cards

    - Fetch KPI data using getKpis() from API adapter
    - Render Total Menus card with dark variant
    - Render Total Orders Today card with light variant
    - Render Total Client Today card with light variant
    - Render Revenue Day Ratio card with light variant
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 5.3 Integrate Revenue chart

    - Fetch revenue data using getRevenue() from API adapter
    - Create Revenue chart card with line chart type
    - Implement period switcher event handlers
    - Update chart data when period changes
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

  - [x] 5.4 Integrate Orders Summary chart

    - Fetch orders summary data using getOrdersSummary() from API adapter
    - Create Orders Summary chart card with bar chart type
    - Implement period switcher event handlers
    - Update chart data when period changes
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [x] 5.5 Integrate Order List table

    - Fetch orders data using getOrders() from API adapter
    - Define table columns (No, ID, Date, Customer Name, Location, Amount, Status Order, Action)
    - Create Data Table with orders data
    - Ensure Status Order column uses Status Badge component
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 6. Create application layout and navigation




  - [x] 6.1 Build vertical navbar


    - Create navbar HTML structure in index.html
    - Apply dark background styling (#1F1F1F)
    - Add vertical icon menu items
    - Implement active icon highlight effect
    - Position navbar fixed on left side (84px width)
    - _Requirements: 7.2, 7.8_
  - [x] 6.2 Build header bar


    - Create header HTML structure in index.html
    - Apply light background styling
    - Add logo/title on the left
    - Add profile icons on the right
    - Set header height to 64px
    - Add subtle bottom shadow
    - _Requirements: 7.3_
  - [x] 6.3 Initialize main application


    - Create src/main.js as entry point
    - Import and apply Tailwind styles
    - Call renderDashboard() to mount dashboard view
    - Set up main content area with proper margins for navbar and header
    - _Requirements: 10.5, 10.6_

- [x] 7. Implement responsive design




  - [x] 7.1 Configure Tailwind breakpoints


    - Set up custom breakpoints in tailwind.config.js (360px, 768px, 1024px)
    - _Requirements: 5.1_
  - [x] 7.2 Apply responsive grid for KPI cards


    - Mobile (< 768px): 1-column layout
    - Tablet (768px - 1023px): 2x2 grid layout
    - Desktop (>= 1024px): 4-column layout
    - _Requirements: 5.2, 5.3, 5.4_
  - [x] 7.3 Apply responsive grid for chart cards


    - Mobile (< 768px): 1-column layout
    - Tablet and Desktop (>= 768px): 2-column layout
    - _Requirements: 5.5, 5.6_
  - [x] 7.4 Apply responsive behavior for table


    - Enable horizontal scrolling on small screens
    - Ensure table layout doesn't break on mobile
    - _Requirements: 5.7_

- [x] 8. Apply design system and styling






  - [x] 8.1 Configure Tailwind theme

    - Extend Tailwind config with custom colors (background, text, accent, status colors)
    - Add custom spacing values
    - Configure custom shadows
    - Configure custom border radius values
    - _Requirements: 7.1, 7.4, 7.5, 7.6, 7.7_


  - [x] 8.2 Create global styles
    - Add Tailwind directives to src/styles.css
    - Define custom CSS for card shadows
    - Define custom CSS for hover effects
    - Set up system font stack
    - _Requirements: 7.1, 7.4_
  - [x] 8.3 Apply component-specific styling


    - Style KPI cards with rounded corners and shadows
    - Style chart cards with proper padding and spacing
    - Style table with clean borders and hover effects
    - Style buttons with proper focus states
    - _Requirements: 7.4, 7.5_

- [x] 9. Implement accessibility features




  - [x] 9.1 Add keyboard navigation support


    - Ensure all buttons are keyboard accessible
    - Add visible focus rings to interactive elements
    - Test Tab navigation flow
    - Test Enter/Space activation on buttons
    - _Requirements: 9.1, 9.2, 9.3, 9.4_


  - [x] 9.2 Add ARIA labels





    - Add aria-label to chart canvas elements
    - Add aria-label to icon-only buttons


    - Add aria-label to status badges
    - _Requirements: 9.5_
  - [ ] 9.3 Ensure color contrast compliance

















    - Verify text color contrast ratios meet WCAG AA standards (4.5:1 minimum)
    - Test all text on different background colors
    - _Requirements: 9.5_

- [x] 10. Create documentation and finalize project





  - [x] 10.1 Write README.md

    - Add project overview and features
    - Add setup instructions (npm install, npm run dev)
    - Add project structure explanation
    - Add "How to connect to backend" section with adapter modification guide
    - Add browser compatibility information
    - _Requirements: 10.7_
  - [x] 10.2 Final testing and validation


    - Test application startup (npm install and npm run dev)
    - Verify no console errors
    - Test all interactive features (period switchers, table hover)
    - Test responsive behavior at all breakpoints (360px, 768px, 1024px)
    - Verify visual design matches reference screenshot
    - Verify all acceptance criteria are met
    - _Requirements: 10.5, 10.6, 1.1-9.5_
