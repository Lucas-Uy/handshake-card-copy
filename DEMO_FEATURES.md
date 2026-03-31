# NFC Hub - Interactive Demo Features

A high-end, responsive web application featuring a 3D interactive business card and a customizable analytics dashboard with deep dark mode aesthetics and neon accents.

## Features

### 1. Landing Page - 3D Interactive Business Card
**Route:** `/landing`

#### Key Features:
- **3D Tilt Effect**: Card follows mouse movement using spring animations from Framer Motion
- **Glassmorphism Design**: Semi-transparent background with backdrop-blur effect
- **Dynamic Glare**: Light effect that moves with the mouse cursor
- **Interactive Flip**: Smooth 180-degree Y-axis rotation between front and back
- **Fully Responsive**: Scales appropriately for mobile devices

#### Front Side:
- Profile photo placeholder with gradient avatar
- Name and job title
- Pulsing "NFC Active" status badge
- Company branding

#### Back Side:
- Scannable QR code visualization
- Social media icons (LinkedIn, GitHub, Mail)
- Animated hover effects on social buttons

#### Animations:
- Spring-based tilt using `useMotionValue` and `useSpring`
- Smooth card flip with 0.6s ease-in-out transition
- Mouse position tracking with smooth interpolation

---

### 2. Analytics Dashboard - NFC Interaction Hub
**Route:** `/analytics`

#### Theme:
- Background: `slate-950`
- Cards: `slate-900`
- Neon Accents: `cyan-400` and `purple-500`

#### Features:

##### Data Visualization:
- **Custom Hook**: `useNfcData` generates mock NFC tap data based on timeframe
- **Recharts AreaChart**: Shows interaction trends with:
  - Linear gradient fill (cyan)
  - Stylized custom tooltip
  - Animated area rendering
  - Grid with subtle opacity

##### Widget Manager:
- **Customize Toggle**: Activates edit mode to show/hide stat cards
- **AnimatePresence**: Smooth animations when widgets appear/disappear
- **4 Stat Cards**:
  1. Total Taps (Cyan accent)
  2. Unique Users (Purple accent)
  3. Device Types (Cyan accent)
  4. Top Location (Purple accent)
- Each card features:
  - Icon with colored background
  - Hover glow effects
  - Trend indicators (up/down arrows)
  - Smooth fade-in animations

##### Timeframe Switcher:
- Three options: Daily, Weekly, Monthly
- Updates chart data and statistics dynamically
- Gradient button styling for active state

##### Interactive Elements:
- Edit mode indicator badge
- Checkbox controls for each widget
- Layout animations using Framer Motion's `layout` prop
- Scale and opacity transitions

---

## Technical Implementation

### Components:

1. **InteractiveBusinessCard.tsx**
   - Uses `useMotionValue` for mouse tracking
   - `useSpring` for smooth spring animations
   - `useTransform` for rotation and glare calculations
   - Backface visibility handling for 3D flip effect

2. **AnalyticsDashboard.tsx**
   - State management for timeframe and edit mode
   - Dynamic widget visibility control
   - Recharts integration with custom styling
   - Framer Motion AnimatePresence for smooth transitions

3. **StatCard.tsx**
   - Reusable component with color theming
   - Hover effects with gradient overlays
   - Trend indicators with conditional rendering
   - Framer Motion animations

### Custom Hook:

**useNfcData.ts**
- Generates mock data based on timeframe
- Returns chart data and statistics
- Memoized for performance
- Realistic data patterns

### State Management:
- React `useState` for:
  - Card flip state
  - Edit mode toggle
  - Timeframe selection
  - Widget visibility
- No external state management needed

### Responsive Design:
- Mobile-first approach
- Tailwind CSS breakpoints (sm, md, lg)
- Flexible grid layouts
- Touch-friendly interactive elements
- Proper scaling on small screens

---

## Navigation

Access the demo features from:
- Main Dashboard (`/`) - New buttons in header:
  - "3D Card Demo" button → `/landing`
  - "Advanced Analytics" button → `/analytics`
- Direct URL access to `/landing` or `/analytics`

---

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and dark mode
- **Framer Motion** - Animations and interactions
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **React Router** - Navigation

---

## Color Palette

### Primary Colors:
- Cyan: `#06b6d4` (cyan-400)
- Purple: `#a855f7` (purple-500)
- Green: `#22c55e` (green-400)
- Red: `#ef4444` (red-400)

### Dark Mode Base:
- Background: `#020617` (slate-950)
- Cards: `#0f172a` (slate-900)
- Borders: `#1e293b` (slate-800)
- Text: `#94a3b8` (slate-400)

### Gradients:
- Primary: `from-cyan-500 to-purple-500`
- Glow effects: Color with opacity variations
- Radial backgrounds for depth

---

## Performance Considerations

- Memoized data generation in `useNfcData`
- Efficient event listeners with proper cleanup
- Smooth 60fps animations with GPU acceleration
- Lazy state updates to prevent unnecessary renders
- Optimized Recharts rendering

---

## Browser Compatibility

- Modern browsers with CSS Grid support
- CSS `backdrop-filter` for glassmorphism
- CSS `transform-style: preserve-3d` for 3D effects
- Framer Motion with fallbacks for older browsers
