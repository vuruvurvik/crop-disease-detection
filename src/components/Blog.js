// App.jsx - Main application component
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  Box, 
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Paper,
  Avatar,
  Divider,
  Chip,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Fab
} from '@mui/material';

// Import Material UI Icons
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import BugReportIcon from '@mui/icons-material/BugReport';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ScienceIcon from '@mui/icons-material/Science';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';

// Sample data for blog posts
const blogPosts = [
  {
    id: 1,
    title: 'Early Detection of Rice Blast Disease Using AI',
    excerpt: 'Learn how cutting-edge AI technology is revolutionizing the early detection of rice blast, potentially saving millions in crop yields.',
    image: 'assets/rice_blast.jpg',
    date: 'March 10, 2025',
    author: 'Dr. Emily Chen',
    category: 'AI Detection',
    tags: ['Rice', 'Fungal Disease', 'AI', 'Early Detection']
  },
  {
    id: 2,
    title: 'Combating Wheat Rust: New Resistant Varieties',
    excerpt: 'Discover the latest wheat varieties that show promising resistance to multiple strains of wheat rust, a devastating crop disease.',
    image: 'assets/wheat_rust.jpg',
    date: 'March 5, 2025',
    author: 'Prof. Michael Johnson',
    category: 'Resistant Crops',
    tags: ['Wheat', 'Rust Disease', 'Plant Breeding', 'Resistance']
  },
  {
    id: 3,
    title: 'Mobile Apps for Instant Crop Disease Diagnosis',
    excerpt: 'A review of the top smartphone applications that farmers can use in the field to quickly identify potential crop diseases.',
    image: 'assets/mobileblog.jpg',
    date: 'February 28, 2025',
    author: 'Sarah Williams',
    category: 'Technology',
    tags: ['Mobile Apps', 'Diagnosis', 'Field Technology', 'Accessibility']
  },
  {
    id: 4,
    title: 'Climate Change and Its Impact on Plant Pathogens',
    excerpt: 'How rising temperatures and changing weather patterns are affecting the spread and virulence of crop diseases globally.',
    image: 'assets/climateblog.jpg',
    date: 'February 20, 2025',
    author: 'Dr. James Rodriguez',
    category: 'Climate Effects',
    tags: ['Climate Change', 'Pathogen Spread', 'Global Impact', 'Research']
  },
  {
    id: 5,
    title: 'Biological Control Methods for Sustainable Farming',
    excerpt: 'Exploring eco-friendly approaches to managing crop diseases using natural predators and beneficial microorganisms.',
    image: 'assets/biological-control.jpg',
    date: 'February 15, 2025',
    author: 'Dr. Aisha Patel',
    category: 'Sustainable Farming',
    tags: ['Biological Control', 'Sustainable', 'Eco-friendly', 'Microorganisms']
  },
  {
    id: 6,
    title: 'Deep Learning Models for Leaf Disease Classification',
    excerpt: 'A technical deep dive into the latest neural network architectures being used to classify plant diseases from leaf images.',
    image: 'assets/deeplearning.jpg',
    date: 'February 8, 2025',
    author: 'Prof. Robert Kim',
    category: 'AI Research',
    tags: ['Deep Learning', 'Neural Networks', 'Image Classification', 'Technical']
  }
];

// Featured tools data
const featuredTools = [
  {
    id: 1,
    title: 'CropGuard AI Scanner',
    description: 'Upload photos of your plants and get instant disease detection with our AI-powered tool.',
    icon: <ScienceIcon fontSize="large" />
  },
  {
    id: 2,
    title: 'Disease Database',
    description: 'Access our comprehensive library of crop diseases, symptoms, and treatment options.',
    icon: <ArticleIcon fontSize="large" />
  },
  {
    id: 3,
    title: 'Expert Community',
    description: 'Connect with agricultural experts and fellow farmers to share knowledge and get advice.',
    icon: <PeopleIcon fontSize="large" />
  }
];

// Define theme
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#81c784' : '#2e7d32',
      light: mode === 'dark' ? '#a5d6a7' : '#60ad5e',
      dark: mode === 'dark' ? '#519657' : '#005005',
    },
    secondary: {
      main: '#fb8c00',
      light: '#ffbd45',
      dark: '#c25e00',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f5f5',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: mode === 'dark' 
              ? '0 8px 20px rgba(0, 0, 0, 0.5)' 
              : '0 8px 20px rgba(0, 0, 0, 0.15)',
          }
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

function App() {
  const [mode, setMode] = useState('light');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  // Handle theme toggle
  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  // Handle search toggle
  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };
  
  // Handle scroll event
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Category menu items
  const categories = ['All', 'AI Detection', 'Resistant Crops', 'Technology', 'Climate Effects', 'Sustainable Farming', 'AI Research'];
  
  // Filter posts by category
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);
  
  // Drawer content
  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60 }}>
          <LocalFloristIcon fontSize="large" />
        </Avatar>
      </Box>
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 3 }}>
        AgroScan
      </Typography>
      <Divider />
      <List>
        {[
          { text: 'Home', icon: <HomeIcon /> },
          { text: 'About', icon: <InfoIcon /> },
          { text: 'Crop Diseases', icon: <BugReportIcon /> },
          { text: 'Detection Tools', icon: <ScienceIcon /> },
          { text: 'Upload & Analyze', icon: <CloudUploadIcon /> }
        ].map((item, index) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography>Dark Mode</Typography>
        <Switch 
          checked={mode === 'dark'} 
          onChange={handleThemeToggle} 
          color="primary" 
          icon={<LightModeIcon />}
          checkedIcon={<DarkModeIcon />}
        />
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar position="fixed" elevation={0} color="default" sx={{ backdropFilter: 'blur(20px)', backgroundColor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <LocalFloristIcon sx={{ color: 'primary.main', mr: 1, display: { xs: 'none', sm: 'block' } }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700 }}
          >
            AgroScan
          </Typography>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Crop Diseases</Button>
            <Button color="inherit" component={Link} to="/crop-disease-management">CropDiseaseManagement</Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<CloudUploadIcon />}
              component={Link} to="/signin"
            >
              Upload & Analyze
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', ml: 2 }}>
            <IconButton
              color="inherit"
              aria-label="search"
              onClick={handleSearchToggle}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="notifications"
            >
              <NotificationsIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="toggle theme"
              onClick={handleThemeToggle}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Search Bar */}
      {searchOpen && (
        <Paper
          elevation={4}
          sx={{
            position: 'fixed',
            top: { xs: 56, sm: 64 },
            left: 0,
            right: 0,
            zIndex: 1099,
            p: 2,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search crop diseases, treatments, and more..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            autoFocus
          />
        </Paper>
      )}
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, pt: { xs: 10, sm: 12 } }}>
        {/* Hero Section */}
        <Paper 
          sx={{ 
            position: 'relative',
            height: { xs: 300, md: 500 },
            background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://via.placeholder.com/1600/228B22/FFFFFF?text=Healthy+Crops)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 0,
            mb: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: 800, textAlign: 'center' }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Protecting Crops Through Early Disease Detection
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Leveraging advanced AI technology to identify plant diseases before they devastate your harvest
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large" 
                color="secondary"
                startIcon={<CloudUploadIcon />}
                sx={{ px: 4, py: 1.5 }}
                component={Link} to="/signin"
              >
                Upload Image
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderColor: 'white', 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white',
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Paper>
        
        {/* Featured Tools Section */}
        <Container>
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center', fontWeight: 600 }}>
              Featured Tools
            </Typography>
            <Grid container spacing={4}>
              {featuredTools.map((tool) => (
                <Grid item xs={12} md={4} key={tool.id}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 4,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 8,
                      }
                    }}
                  >
                    <Box sx={{ 
                      mb: 2, 
                      bgcolor: 'primary.main', 
                      color: 'white', 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {tool.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {tool.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {tool.description}
                    </Typography>
                    <Button 
                      variant="text" 
                      color="primary" 
                      sx={{ mt: 2 }}
                    >
                      Try It Now
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
        
        {/* Blog Posts Section */}
        <Container>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Latest Articles
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Stay updated with the latest research and insights on crop disease detection
            </Typography>
            
            {/* Category Filter */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', overflow: 'auto', pb: 1 }}>
              <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary', whiteSpace: 'nowrap' }}>
                Filter by:
              </Typography>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  clickable
                  color={selectedCategory === category ? 'primary' : 'default'}
                  onClick={() => setSelectedCategory(category)}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
            
            <Grid container spacing={3}>
              {filteredPosts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.image}
                      alt={post.title}
                    />
                    <CardContent>
                      <Typography variant="overline" color="text.secondary">
                        {post.category}
                      </Typography>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {post.excerpt}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {post.tags.map((tag) => (
                          <Chip 
                            key={tag} 
                            label={tag} 
                            size="small" 
                            variant="outlined" 
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
                            {post.author.charAt(0)}
                          </Avatar>
                          <Typography variant="caption" color="text.secondary">
                            {post.author}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {post.date}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">Read More</Button>
                      <Button size="small">Share</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {/* Load More Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                variant="outlined" 
                color="primary"
                sx={{ px: 4 }}
              >
                Load More Articles
              </Button>
            </Box>
          </Box>
        </Container>
        
        {/* Call to Action */}
        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            py: 8, 
            px: 3,
            mt: 8,
            textAlign: 'center'
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Join Our Community
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Connect with experts and farmers worldwide to share knowledge, experiences, and stay updated with the latest in crop disease prevention.
            </Typography>
            <Box 
              component="form" 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' }, 
                gap: 2,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              <TextField
                fullWidth
                placeholder="Your email address"
                variant="outlined"
                sx={{ 
                  bgcolor: 'white',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                }}
              />
              <Button 
                variant="contained" 
                color="secondary"
                size="large"
                sx={{ 
                  px: 4,
                  whiteSpace: 'nowrap'
                }}
              >
                Subscribe Now
              </Button>
            </Box>
          </Container>
        </Box>
        
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 6,
            px: 2,
            mt: 'auto',
            backgroundColor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalFloristIcon sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                    AgroScan
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Empowering farmers with AI-powered crop disease detection technology to ensure food security and sustainable agriculture worldwide.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  {/* Social media icons would go here */}
                </Box>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Quick Links
                </Typography>
                <List dense disablePadding>
                  {['Home', 'About Us', 'Blog', 'Contact'].map((item) => (
                    <ListItem key={item} disablePadding sx={{ py: 0.5 }}>
                      <Button sx={{ color: 'text.secondary', p: 0, textAlign: 'left' }}>
                        {item}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Resources
                </Typography>
                <List dense disablePadding>
                  {['Disease Database', 'Detection Tools', 'Research Papers', 'Help Center'].map((item) => (
                    <ListItem key={item} disablePadding sx={{ py: 0.5 }}>
                      <Button sx={{ color: 'text.secondary', p: 0, textAlign: 'left' }}>
                        {item}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Stay Updated
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Join our newsletter for the latest updates on crop disease research and technology.
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField 
                    size="small" 
                    placeholder="Your email" 
                    sx={{ flexGrow: 1 }}
                  />
                  <Button variant="contained" color="primary">
                    Subscribe
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} />
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} AgroScan. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
      
      {/* Floating Action Buttons */}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 2, zIndex: 1000 }}>
        {scrollToTop && (
          <Fab 
            color="primary" 
            size="small" 
            aria-label="scroll back to top"
            onClick={handleScrollToTop}
          >
            <ArrowUpwardIcon />
          </Fab>
        )}
        <Fab 
          color="secondary" 
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Box>
    </ThemeProvider>
  );
}

export default App;
