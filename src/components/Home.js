"use client"
import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
  TextField,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Rating,
  Fade,
  Slide,
  useScrollTrigger,
  createTheme,
  ThemeProvider,
} from "@mui/material"
import ChatBot from "./Chatbot"
import {
  Menu as MenuIcon,
  ArrowForward as ArrowForwardIcon,
  BugReport as BugReportIcon,
  Analytics as AnalyticsIcon,
  Notifications as NotificationsIcon,
  CloudUpload as CloudUploadIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom";


// Create a custom theme with agricultural colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // Green
      light: "#60ad5e",
      dark: "#005005",
    },
    secondary: {
      main: "#1565c0", // Blue
      light: "#5e92f3",
      dark: "#003c8f",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
        },
        containedPrimary: {
          boxShadow: "0 4px 14px 0 rgba(46, 125, 50, 0.39)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
})

// Scroll to hide AppBar
function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate();  
  // Handle mobile menu toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
      if (mobileOpen) setMobileOpen(false)
    }
  }

  // Features data
  const features = [
    {
      title: "Early Detection",
      description: "Identify crop diseases at their earliest stages before they spread and cause significant damage.",
      icon: <BugReportIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
    },
    {
      title: "Real-time Analytics",
      description: "Access comprehensive analytics and insights about disease patterns and treatment effectiveness.",
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
    },
    {
      title: "Instant Alerts",
      description: "Receive immediate notifications when diseases are detected so you can take prompt action.",
      icon: <NotificationsIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
    },
    {
      title: "Cloud-based Platform",
      description: "Access your data from anywhere, anytime with our secure cloud-based solution.",
      icon: <CloudUploadIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
    },
    {
      title: "High Accuracy",
      description: "Our AI models provide up to 95% accuracy in identifying common crop diseases.",
      icon: <SpeedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
    },
    {
      title: "Data Security",
      description: "Your farm data is protected with enterprise-grade security and encryption.",
      icon: <SecurityIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
    },
  ]

  // How it works steps
  const steps = [
    {
      number: "01",
      title: "Capture Images",
      description: "Take photos of your crops using our mobile app or upload images from drones or other devices.",
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our advanced AI algorithms analyze the images to identify signs of diseases with high accuracy.",
    },
    {
      number: "03",
      title: "Get Results",
      description:
        "Receive detailed reports about detected diseases, including severity levels and treatment recommendations.",
    },
    {
      number: "04",
      title: "Take Action",
      description: "Implement targeted treatments based on our recommendations to protect your crops effectively.",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Vurvik Korukonda",
      role: "Farm Manager, Green Valley Farms",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "AgroScan AI has revolutionized how we manage crop diseases. We've reduced pesticide use by 40% while improving crop yields.",
      rating: 5,
    },
    {
      name: "Karthik Charry",
      role: "Agricultural Consultant",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "I recommend this platform to all my clients. The early detection capabilities have saved countless crops from devastating diseases.",
      rating: 5,
    },
    {
      name: "Saida Dharavath",
      role: "Owner, Chen Family Orchards",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "The accuracy of disease detection is impressive. We've been able to address issues before they become serious problems.",
      rating: 4,
    },
  ]

  // Pricing plans
  
  // Mobile drawer content
  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <BugReportIcon sx={{ color: "primary.main", mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          AgroScan AI
        </Typography>
      </Box>
      <Divider />
      <List>
        {["home", "features", "how-it-works", "testimonials", "pricing"].map((item) => (
          <ListItem button key={item} onClick={() => scrollToSection(item)}>
            <ListItemText
              primary={item
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              sx={{
                textAlign: "center",
                color: activeSection === item ? "primary.main" : "inherit",
                fontWeight: activeSection === item ? "bold" : "normal",
              }}
            />
          </ListItem>
        ))}
        <ListItem>
          <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/signup")}>
            Get Started
          </Button>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        {/* App Bar */}
        <HideOnScroll>
          <AppBar position="fixed" color="default" elevation={1} sx={{ bgcolor: "rgba(255, 255, 255, 0.95)" }}>
            <Toolbar>
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                <BugReportIcon sx={{ color: "primary.main", mr: 1 }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  AgroScan AI
                </Typography>
              </Box>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {["home", "features", "how-it-works", "testimonials"].map((item) => (
                    <Button
                      key={item}
                      color="inherit"
                      onClick={() => scrollToSection(item)}
                      sx={{
                        mx: 1,
                        color: activeSection === item ? "primary.main" : "inherit",
                        fontWeight: activeSection === item ? "bold" : "normal",
                      }}
                    >
                      {item
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </Button>
                  ))}
                  <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={() => navigate("/casestudies")}>
                    CaseStudies
                  </Button>
                  <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={() => navigate("/blog")}>
                    Blogs
                  </Button>
                  <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={() => navigate("/signup")}>
                    Get Started
                  </Button>
                  <ChatBot />
                </Box>
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
        </HideOnScroll>

        {/* Mobile Navigation Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
          }}
        >
          {drawer}
        </Drawer>

        {/* Main Content */}
        <Box component="main">
          {/* Hero Section */}
          <Box
            id="home"
            sx={{
              pt: { xs: 10, md: 15 },
              pb: { xs: 8, md: 12 },
              background: "linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%)",
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Fade in={true} timeout={1000}>
                    <Box>
                      <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                          fontSize: { xs: "2.5rem", md: "3.5rem" },
                          lineHeight: 1.2,
                        }}
                      >
                        Protect Your Crops with AI-Powered Disease Detection
                      </Typography>
                      <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
                        Early detection, accurate diagnosis, and timely treatment recommendations to maximize your crop
                        yield and minimize losses.
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          endIcon={<ArrowForwardIcon />}
                          onClick={() => navigate("/signin")}
                        >
                          Get Started
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="large"
                          onClick={() => navigate("/signup")}
                        >
                          How It Works
                        </Button>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
                        <Box sx={{ display: "flex" }}>
                          {[1, 2, 3].map((i) => (
                            <Avatar
                              key={i}
                              src="assets/home_accuracy.jpg"
                              sx={{
                                width: 40,
                                height: 40,
                                border: "2px solid white",
                                marginLeft: i > 1 ? -1.5 : 0,
                              }}
                            />
                          ))}
                        </Box>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Trusted by 2,000+ farmers worldwide
                          </Typography>
                          <Rating value={4.8} precision={0.1} size="small" readOnly />
                        </Box>
                      </Box>
                    </Box>
                  </Fade>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Fade in={true} timeout={1500}>
                    <Box
                      sx={{
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          width: "80%",
                          height: "80%",
                          bottom: -20,
                          right: -20,
                          borderRadius: 4,
                          backgroundColor: "primary.light",
                          opacity: 0.3,
                          zIndex: 0,
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src="assets/home_img.jpg"
                        alt="Crop disease detection"
                        sx={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 4,
                          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                          position: "relative",
                          zIndex: 1,
                        }}
                      />
                    </Box>
                  </Fade>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Stats Section */}
          <Box sx={{ py: 6, bgcolor: "background.paper" }}>
            <Container maxWidth="lg">
              <Grid container spacing={3} justifyContent="center">
                {[
                  { value: "95%", label: "Detection Accuracy" },
                  { value: "40%", label: "Reduced Crop Loss" },
                  { value: "2,000+", label: "Farmers Worldwide" },
                  { value: "5M+", label: "Acres Protected" },
                ].map((stat, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h3" component="div" color="primary.main" sx={{ fontWeight: "bold" }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* Features Section */}
          <Box id="features" sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
              <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                  Powerful Features
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
                  Our comprehensive platform provides everything you need to detect, monitor, and manage crop diseases
                  effectively.
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 4 }}>
                        <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                        <Typography variant="h5" component="h3" gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* How It Works Section */}
          <Box
            id="how-it-works"
            sx={{
              py: { xs: 8, md: 12 },
              bgcolor: "background.paper",
            }}
          >
            <Container maxWidth="lg">
              <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                  How It Works
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
                  Our simple four-step process makes crop disease detection easy and efficient.
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {steps.map((step, index) => (
                  <Grid item xs={12} md={6} lg={3} key={index}>
                    <Box
                      sx={{
                        position: "relative",
                        p: 3,
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          color: "rgba(46, 125, 50, 0.1)",
                          fontWeight: "bold",
                          fontSize: "5rem",
                          lineHeight: 1,
                        }}
                      >
                        {step.number}
                      </Typography>
                      <Box sx={{ position: "relative", pt: 5 }}>
                        <Typography variant="h5" component="h3" gutterBottom>
                          {step.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {step.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 8, textAlign: "center" }}>
                <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection("contact")}>
                  Start Detecting Now
                </Button>
              </Box>
            </Container>
          </Box>

          {/* Testimonials Section */}
          <Box id="testimonials" sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#f9f9f9" }}>
  <Container maxWidth="lg">
    <Box sx={{ textAlign: "center", mb: 8 }}>
      <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
        🌾 Success Stories
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720, mx: "auto" }}>
        Real stories from farmers and agronomists who’ve revolutionized their crop management with our intelligent platform.
      </Typography>
    </Box>

    <Grid container spacing={4}>
      {testimonials.map((testimonial, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              borderRadius: 3,
              backgroundColor: "#ffffff",
            }}
          >
            <Box>
              <Box sx={{ mb: 2 }}>
                <Rating value={testimonial.rating} readOnly size="small" />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "italic",
                  color: "text.primary",
                  position: "relative",
                  lineHeight: 1.7,
                  "&::before": {
                    content: '"“"',
                    fontSize: "3.5rem",
                    color: "rgba(0,0,0,0.05)",
                    position: "absolute",
                    top: -20,
                    left: -10,
                  },
                }}
              >
                {testimonial.quote}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
              <Avatar
                src={testimonial.image || "assets/home_img.jpg"}
                alt={testimonial.name}
                sx={{ width: 50, height: 50, mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.role}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>


          {/* CTA Section */}
          <Box
            id="contact"
            sx={{
              py: { xs: 8, md: 12 },
              background: "linear-gradient(135deg, #e8f5e9 0%, #f8f9fa 100%)",
            }}
          >
            <Container maxWidth="md">
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                    Ready to protect your crops?
                  </Typography>
                  <Typography variant="h6" paragraph color="text.secondary">
                    Get started today and see how our AI-powered disease detection can transform your farm management.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    <CheckCircleIcon sx={{ color: "primary.main", mr: 1 }} />
                    <Typography variant="body1">No credit card required</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    <CheckCircleIcon sx={{ color: "primary.main", mr: 1 }} />
                    <Typography variant="body1">14-day free trial</Typography>
                    <Typography variant="body1">14-day free trial</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    <CheckCircleIcon sx={{ color: "primary.main", mr: 1 }} />
                    <Typography variant="body1">Cancel anytime</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Get Started
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Fill out the form below and we ll contact you to set up your account.
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="First Name" variant="outlined" required />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Last Name" variant="outlined" required />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Email Address" variant="outlined" type="email" required />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Farm/Company Name" variant="outlined" />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Phone Number" variant="outlined" />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" color="primary" size="large" fullWidth>
                          Request Demo
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              py: 6,
              bgcolor: "background.paper",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <BugReportIcon sx={{ color: "primary.main", mr: 1 }} />
                    <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                      AgroScan AI
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Protecting crops worldwide with advanced AI-powered disease detection technology.
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton size="small" sx={{ color: "#1877F2" }}>
                      <FacebookIcon />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#1DA1F2" }}>
                      <TwitterIcon />
                    </IconButton>
                    <IconButton size="small" sx={{ color: "#0A66C2" }}>
                      <LinkedInIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
                    Product
                  </Typography>
                  <List disablePadding>
                    {["Features", "Pricing", "Case Studies", "Testimonials"].map((item) => (
                      <ListItem key={item} disablePadding sx={{ py: 0.5 }}>
                        <Button color="inherit" sx={{ p: 0, textTransform: "none" }}>
                          {item}
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
                    Company
                  </Typography>
                  <List disablePadding>
                    {["About Us", "Blog", "Careers", "Chatbot"].map((item) => (
                      <ListItem key={item} disablePadding sx={{ py: 0.5 }}>
                        <Button color="inherit" sx={{ p: 0, textTransform: "none" }}>
                          {item}
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
                    Resources
                  </Typography>
                  <List disablePadding>
                    {["Documentation", "Help Center", "API", "Partners"].map((item) => (
                      <ListItem key={item} disablePadding sx={{ py: 0.5 }}>
                        <Button color="inherit" sx={{ p: 0, textTransform: "none" }}>
                          {item}
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
                    Legal
                  </Typography>
                  <List disablePadding>
                    {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map((item) => (
                      <ListItem key={item} disablePadding sx={{ py: 0.5 }}>
                        <Button color="inherit" sx={{ p: 0, textTransform: "none" }}>
                          {item}
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
              <Box sx={{ mt: 6, pt: 3, borderTop: "1px solid", borderColor: "divider", textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  © {new Date().getFullYear()} AgroScan AI. All rights reserved.
                </Typography>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default HomePage

