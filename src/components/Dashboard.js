import React, { useState } from 'react';
import { 
  Box, 
  CssBaseline, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Avatar, 
  Chip, 
  Badge, 
  InputBase,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  LinearProgress,
  alpha,
  Tooltip,
  Tab,
  Tabs,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MapIcon from '@mui/icons-material/Map';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import WarningIcon from '@mui/icons-material/Warning';
import CloudIcon from '@mui/icons-material/Cloud';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';

const drawerWidth = 280;

// Custom Color Palette for Crop Disease Detection
const customPalette = {
  primary: {
    main: '#2E7D32', // Deep green for healthy crops
    light: '#4CAF50', // Light green
    dark: '#1B5E20', // Dark green
  },
  secondary: {
    main: '#FF8F00', // Amber for warnings
    light: '#FFC107', // Light amber
    dark: '#FF6F00', // Dark amber
  },
  error: {
    main: '#D32F2F', // Red for disease alerts
    light: '#EF5350', // Light red
    dark: '#C62828', // Dark red
  },
  warning: {
    main: '#FFA000', // Orange for alerts
    light: '#FFC107', // Light orange
    dark: '#FF8F00', // Dark orange
  },
  info: {
    main: '#1976D2', // Blue for info
    light: '#42A5F5', // Light blue
    dark: '#1565C0', // Dark blue
  },
  success: {
    main: '#388E3C', // Green for success
    light: '#66BB6A', // Light green
    dark: '#1B5E20', // Dark green
  },
  background: {
    default: '#F5F5F5', // Light gray background
    paper: '#FFFFFF', // White paper
  },
  text: {
    primary: '#212121', // Dark text
    secondary: '#757575', // Gray text
  },
};

// Styled components
const OpenedDrawer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: customPalette.background.paper,
  color: customPalette.text.primary,
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      background: `linear-gradient(180deg, ${customPalette.primary.dark} 0%, ${customPalette.primary.main} 100%)`,
      color: customPalette.background.paper,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
      }),
    },
  }),
);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(customPalette.text.primary, 0.04),
  '&:hover': {
    backgroundColor: alpha(customPalette.text.primary, 0.08),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  borderRadius: '12px',
  overflow: 'hidden',
  position: 'relative',
}));

const GradientBox = styled(Box)(({ theme, color }) => ({
  background: color,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '8px',
}));

const IconWrapper = styled(Box)(({ theme, bgcolor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  backgroundColor: bgcolor,
  width: 55,
  height: 55,
}));

const ProgressCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  overflow: 'hidden',
}));

const ChartCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  overflow: 'hidden',
  height: '100%',
}));

// Mock chart component
const ChartComponent = () => {
  return (
    <Box
      sx={{
        height: 350,
        width: '100%',
        background: `linear-gradient(180deg, ${alpha(customPalette.primary.light, 0.2)} 0%, ${alpha(customPalette.primary.light, 0)} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Typography variant="caption" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        Chart Visualization Area
      </Typography>
    </Box>
  );
};

// Main Dashboard Component
export default function CropDiseaseDashboard() {
  const [open, setOpen] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  
  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: customPalette.background.default }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBarStyled position="fixed" open={open}>
        <Toolbar sx={{ pr: '24px' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ 
                mr: 2, 
                fontWeight: 700,
                display: { xs: 'none', sm: 'block' } 
              }}
            >
              AgroScan
            </Typography>
            
            <Chip
              label="PREMIUM"
              size="small"
              sx={{
                bgcolor: customPalette.success.main,
                color: customPalette.background.paper,
                fontSize: '0.65rem',
                height: 20,
                display: { xs: 'none', sm: 'flex' }
              }}
            />
          </Box>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search diseases, fields, or crops..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Weather Updates">
              <IconButton>
                <CloudIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Help">
              <IconButton>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Settings">
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="John Doe - Farm Manager">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar
                  sx={{ 
                    bgcolor: customPalette.primary.main,
                    width: 35,
                    height: 35
                  }}
                >
                  JD
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBarStyled>
      
      {/* Drawer */}
      <DrawerStyled variant="permanent" open={open}>
        <OpenedDrawer>
          <Box sx={{ display: 'flex', alignItems: 'center', mx: 'auto', mt: 1, mb: 1 }}>
            <LocalFloristIcon sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
              CROP GUARDIAN
            </Typography>
          </Box>
          <IconButton onClick={toggleDrawer} sx={{ color: customPalette.background.paper }}>
            <ChevronLeftIcon />
          </IconButton>
        </OpenedDrawer>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <Box sx={{ p: open ? 2 : 0 }}>
          <Avatar
            sx={{
              mx: 'auto',
              width: open ? 80 : 0,
              height: open ? 80 : 0,
              opacity: open ? 1 : 0,
              transition: '0.3s ease',
              border: '3px solid rgba(255,255,255,0.2)',
              mb: 1,
            }}
          >
            JD
          </Avatar>
          {open && (
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                John Doe
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.8rem' }}>
                Farm Manager
              </Typography>
            </Box>
          )}
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <List
          sx={{
            px: 2,
            '& .MuiListItemButton-root': {
              borderRadius: '8px',
              mb: 0.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.15)',
                },
              },
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.05)',
              },
            },
          }}
        >
          <ListItem disablePadding>
            <ListItemButton selected>
              <ListItemIcon sx={{ color: customPalette.background.paper, minWidth: 40 }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: customPalette.background.paper, minWidth: 40 }}>
                <BugReportIcon />
              </ListItemIcon>
              <ListItemText primary="Disease Library" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: customPalette.background.paper, minWidth: 40 }}>
                <CameraAltIcon />
              </ListItemIcon>
              <ListItemText primary="Scan Crops" />
              <Chip 
                label="New" 
                size="small" 
                sx={{ 
                  bgcolor: customPalette.error.main, 
                  color: customPalette.background.paper,
                  height: 20,
                  fontSize: '0.65rem',
                  visibility: open ? 'visible' : 'hidden'
                }} 
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: customPalette.background.paper, minWidth: 40 }}>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary="Field Mapping" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: customPalette.background.paper, minWidth: 40 }}>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Alert System" />
              <Badge 
                badgeContent={4} 
                color="error"
                sx={{ visibility: open ? 'visible' : 'hidden' }}
              />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: customPalette.background.paper, minWidth: 40 }}>
                <AgricultureIcon />
              </ListItemIcon>
              <ListItemText primary="Treatment Plans" />
            </ListItemButton>
          </ListItem>
        </List>
        
        <Box sx={{ flexGrow: 1 }} />
        
        {open && (
          <Box
            sx={{
              p: 2,
              m: 2,
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.1)',
              textAlign: 'center',
            }}
          >
            <WarningIcon sx={{ fontSize: 40, mb: 1, color: customPalette.warning.light }} />
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Need assistance?
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mb: 2 }}>
              Our experts are ready to help with any crop issues
            </Typography>
            <Button
              variant="contained"
              fullWidth
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.15)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.25)',
                },
              }}
            >
              Contact Support
            </Button>
          </Box>
        )}
        
        <List
          sx={{
            px: 2,
            '& .MuiListItemButton-root': {
              borderRadius: '8px',
              mb: 0.5,
            },
          }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: customPalette.background.paper, minWidth: 40 }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: customPalette.background.paper, minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </DrawerStyled>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          backgroundColor: customPalette.background.default,
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Box component="div" sx={{ height: 64 }} /> {/* Toolbar spacer */}
        
        <Box sx={{ p: 3 }}>
          {/* Page header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h4" fontWeight="700" sx={{ mb: 0.5 }}>
                Crop Health Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Welcome back, John! Here's your farm health overview for today.
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                startIcon={<RefreshIcon />}
                size="small"
              >
                Refresh
              </Button>
              
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<CameraAltIcon />}
                size="small"
              >
                Scan New Sample
              </Button>
            </Box>
          </Box>
          
          {/* Stats row */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} lg={3}>
              <StatsCard>
                <GradientBox color="linear-gradient(90deg, #4CAF50 0%, #81C784 100%)" />
                <CardContent sx={{ pt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Total Scans
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        3,721
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <ArrowUpwardIcon color="success" sx={{ fontSize: 14, mr: 0.5 }} />
                        <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                          +12.4%
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          vs last week
                        </Typography>
                      </Box>
                    </Box>
                    <IconWrapper bgcolor={alpha(customPalette.primary.main, 0.1)}>
                      <BugReportIcon sx={{ color: customPalette.primary.main, fontSize: 28 }} />
                    </IconWrapper>
                  </Box>
                </CardContent>
              </StatsCard>
            </Grid>
            
            <Grid item xs={12} sm={6} lg={3}>
              <StatsCard>
                <GradientBox color="linear-gradient(90deg, #81C784 0%, #A5D6A7 100%)" />
                <CardContent sx={{ pt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Healthy Crops
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        87.5%
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <ArrowDownwardIcon color="error" sx={{ fontSize: 14, mr: 0.5 }} />
                        <Typography variant="body2" color="error.main" sx={{ fontWeight: 500 }}>
                          -2.3%
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          vs last month
                        </Typography>
                      </Box>
                    </Box>
                    <IconWrapper bgcolor={alpha(customPalette.success.main, 0.1)}>
                      <LocalFloristIcon sx={{ color: customPalette.success.main, fontSize: 28 }} />
                    </IconWrapper>
                  </Box>
                </CardContent>
              </StatsCard>
            </Grid>
            
            <Grid item xs={12} sm={6} lg={3}>
              <StatsCard>
                <GradientBox color="linear-gradient(90deg, #D32F2F 0%, #E57373 100%)" />
                <CardContent sx={{ pt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Disease Alerts
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        24
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <ArrowUpwardIcon color="error" sx={{ fontSize: 14, mr: 0.5 }} />
                        <Typography variant="body2" color="error.main" sx={{ fontWeight: 500 }}>
                          +7.8%
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          past 7 days
                        </Typography>
                      </Box>
                    </Box>
                    <IconWrapper bgcolor={alpha(customPalette.error.main, 0.1)}>
                      <WarningIcon sx={{ color: customPalette.error.main, fontSize: 28 }} />
                    </IconWrapper>
                  </Box>
                </CardContent>
              </StatsCard>
            </Grid>
            
            <Grid item xs={12} sm={6} lg={3}>
              <StatsCard>
                <GradientBox color="linear-gradient(90deg, #1976D2 0%, #64B5F6 100%)" />
                <CardContent sx={{ pt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Treated Areas
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        142
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <ArrowUpwardIcon color="success" sx={{ fontSize: 14, mr: 0.5 }} />
                        <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                          +24.5%
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                          this month
                        </Typography>
                      </Box>
                    </Box>
                    <IconWrapper bgcolor={alpha(customPalette.info.main, 0.1)}>
                      <AgricultureIcon sx={{ color: customPalette.info.main, fontSize: 28 }} />
                    </IconWrapper>
                  </Box>
                </CardContent>
              </StatsCard>
            </Grid>
          </Grid>
          
          {/* Environmental factors */}
          <Paper sx={{ mb: 3, p: 3, borderRadius: '12px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="600">
                Environmental Factors
              </Typography>
              <Chip 
                label="Live Updates" 
                color="success" 
                size="small" 
                variant="outlined" 
                sx={{ fontSize: '0.7rem' }}
              />
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: alpha(customPalette.info.main, 0.1), color: customPalette.info.main, mr: 2 }}>
                    <ThermostatIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Temperature
                    </Typography>
                    <Typography variant="h6">
                      24.5°C
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={70} 
                      sx={{ 
                        mt: 0.5, 
                        height: 5, 
                        borderRadius: 5,
                        bgcolor: alpha(customPalette.info.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: customPalette.info.main
                        }
                      }} 
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: alpha(customPalette.primary.main, 0.1), color: customPalette.primary.main, mr: 2 }}>
                    <WaterDropIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Humidity
                    </Typography>
                    <Typography variant="h6">
                      68%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={68} 
                      sx={{ 
                        mt: 0.5, 
                        height: 5, 
                        borderRadius: 5,
                        bgcolor: alpha(customPalette.primary.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: customPalette.primary.main
                        }
                      }} 
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: alpha(customPalette.success.main, 0.1), color: customPalette.success.main, mr: 2 }}>
                    <CloudIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Precipitation
                    </Typography>
                    <Typography variant="h6">
                      12 mm
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={20} 
                      sx={{ 
                        mt: 0.5, 
                        height: 5, 
                        borderRadius: 5,
                        bgcolor: alpha(customPalette.success.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: customPalette.success.main
                        }
                      }} 
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: alpha(customPalette.warning.main, 0.1), color: customPalette.warning.main, mr: 2 }}>
                    <LightbulbIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Sunlight
                    </Typography>
                    <Typography variant="h6">
                      8.3 hrs
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={85} 
                      sx={{ 
                        mt: 0.5, 
                        height: 5, 
                        borderRadius: 5,
                        bgcolor: alpha(customPalette.warning.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: customPalette.warning.main
                        }
                      }} 
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Main charts row */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} lg={8}>
              <ChartCard>
                <CardHeader 
                  title="Disease Detection Trends" 
                  titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
                  action={
                    <>
                      <Tabs 
                        value={tabValue} 
                        onChange={handleTabChange} 
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{ minHeight: 0, '& .MuiTab-root': { minHeight: 40, py: 0 } }}
                      >
                        <Tab label="Weekly" />
                        <Tab label="Monthly" />
                        <Tab label="Yearly" />
                      </Tabs>
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </>
                  }
                />
                <Divider />
                <CardContent sx={{ p: 0 }}>
                  <ChartComponent />
                </CardContent>
              </ChartCard>
            </Grid>
            
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <ProgressCard>
                    <CardHeader 
                      title="Risk Assessment" 
                      titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
                      action={
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2">Wheat Rust</Typography>
                              <Typography variant="body2" fontWeight="600" color="error.main">High Risk (78%)</Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={78} 
                              sx={{ 
                                height: 8, 
                                borderRadius: 5,
                                bgcolor: alpha(customPalette.error.main, 0.1),
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: customPalette.error.main
                                }
                              }} 
                            />
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2">Late Blight</Typography>
                              <Typography variant="body2" fontWeight="600" color="warning.main">Medium Risk (45%)</Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={45} 
                              sx={{ 
                                height: 8, 
                                borderRadius: 5,
                                bgcolor: alpha(customPalette.warning.main, 0.1),
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: customPalette.warning.main
                                }
                              }} 
                            />
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2">Powdery Mildew</Typography>
                              <Typography variant="body2" fontWeight="600" color="success.main">Low Risk (12%)</Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={12} 
                              sx={{ 
                                height: 8, 
                                borderRadius: 5,
                                bgcolor: alpha(customPalette.success.main, 0.1),
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: customPalette.success.main
                                }
                              }} 
                            />
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2">Corn Smut</Typography>
                              <Typography variant="body2" fontWeight="600" color="info.main">Monitoring (5%)</Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={5} 
                              sx={{ 
                                height: 8, 
                                borderRadius: 5,
                                bgcolor: alpha(customPalette.info.main, 0.1),
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: customPalette.info.main
                                }
                              }} 
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </ProgressCard>
                </Grid>
                
                <Grid item xs={12}>
                  <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' }}>
                    <CardHeader 
                      title="Recent Alerts" 
                      titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
                      action={
                        <IconButton size="small">
                          <FilterListIcon fontSize="small" />
                        </IconButton>
                      }
                    />
                    <Divider />
                    <List sx={{ p: 0 }}>
                      <ListItem 
                        secondaryAction={
                          <Button 
                            size="small" 
                            color="primary" 
                            endIcon={<ArrowForwardIcon />}
                            sx={{ fontSize: '0.75rem' }}
                          >
                            View
                          </Button>
                        }
                        sx={{ 
                          bgcolor: alpha(customPalette.error.main, 0.05),
                          borderLeft: `4px solid ${customPalette.error.main}` 
                        }}
                      >
                        <ListItemText
                          primary="Wheat Rust Detected"
                          secondary="Field #12 - North Section"
                          primaryTypographyProps={{ fontWeight: 600, variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                      
                      <Divider />
                      
                      <ListItem 
                        secondaryAction={
                          <Button 
                            size="small" 
                            color="primary" 
                            endIcon={<ArrowForwardIcon />}
                            sx={{ fontSize: '0.75rem' }}
                          >
                            View
                          </Button>
                        }
                        sx={{ 
                          bgcolor: alpha(customPalette.warning.main, 0.05),
                          borderLeft: `4px solid ${customPalette.warning.main}` 
                        }}
                      >
                        <ListItemText
                          primary="Low Soil Moisture"
                          secondary="Field #8 - East Section"
                          primaryTypographyProps={{ fontWeight: 600, variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                      
                      <Divider />
                      
                      <ListItem 
                        secondaryAction={
                          <Button 
                            size="small" 
                            color="primary" 
                            endIcon={<ArrowForwardIcon />}
                            sx={{ fontSize: '0.75rem' }}
                          >
                            View
                          </Button>
                        }
                        sx={{ 
                          bgcolor: alpha(customPalette.info.main, 0.05),
                          borderLeft: `4px solid ${customPalette.info.main}` 
                        }}
                      >
                        <ListItemText
                          primary="Treatment Completed"
                          secondary="Field #3 - South Section"
                          primaryTypographyProps={{ fontWeight: 600, variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Recent scans table */}
          <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' }}>
            <CardHeader 
              title="Recent Disease Scans" 
              titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
              action={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<FilterListIcon />}
                  >
                    Filter
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small" 
                    startIcon={<AddIcon />}
                  >
                    Add New
                  </Button>
                </Box>
              }
            />
            <Divider />
            <Box sx={{ overflow: 'auto' }}>
              <Table>
                <TableHead sx={{ bgcolor: alpha(customPalette.primary.main, 0.03) }}>
                  <TableRow>
                    <TableCell>Crop Type</TableCell>
                    <TableCell>Disease</TableCell>
                    <TableCell>Confidence</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      crop: 'Wheat',
                      disease: 'Leaf Rust',
                      confidence: 98,
                      location: 'Field #12',
                      date: '12 Mar 2025',
                      status: 'High Risk'
                    },
                    {
                      crop: 'Corn',
                      disease: 'Healthy',
                      confidence: 95,
                      location: 'Field #7',
                      date: '11 Mar 2025',
                      status: 'Healthy'
                    },
                    {
                      crop: 'Tomato',
                      disease: 'Late Blight',
                      confidence: 87,
                      location: 'Greenhouse #2',
                      date: '10 Mar 2025',
                      status: 'Treated'
                    },
                    {
                      crop: 'Potato',
                      disease: 'Early Blight',
                      confidence: 92,
                      location: 'Field #5',
                      date: '09 Mar 2025',
                      status: 'Monitoring'
                    },
                    {
                      crop: 'Soybean',
                      disease: 'Downy Mildew',
                      confidence: 89,
                      location: 'Field #9',
                      date: '08 Mar 2025',
                      status: 'Treated'
                    }
                  ].map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {row.crop}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.disease}</TableCell>
                      <TableCell>{row.confidence}%</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status} 
                          size="small"
                          sx={{
                            bgcolor: row.status === 'High Risk' 
                              ? alpha(customPalette.error.main, 0.1)
                              : row.status === 'Monitoring'
                                ? alpha(customPalette.warning.main, 0.1)
                                : row.status === 'Treated'
                                  ? alpha(customPalette.info.main, 0.1)
                                  : alpha(customPalette.success.main, 0.1),
                            color: row.status === 'High Risk' 
                              ? customPalette.error.main
                              : row.status === 'Monitoring'
                                ? customPalette.warning.main
                                : row.status === 'Treated'
                                  ? customPalette.info.main
                                  : customPalette.success.main,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
              <Button size="small">View All Records</Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}