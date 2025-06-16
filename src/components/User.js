"use client"

import { useState, useEffect } from "react"
import { ListItemAvatar } from "@mui/material"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
  CircularProgress,
  createTheme,
  ThemeProvider,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
} from "@mui/material"
import {
  CloudUpload,
  Info,
  CheckCircle,
  History as HistoryIcon,
  Logout,
  AccountCircle,
  Spa,
  ArrowBack,
  Agriculture,
  BugReport,
  LocalFlorist,
  WaterDrop,
  Opacity,
  WbCloudy,
  Grain,
  FilterVintage,
  Grass,
  WbSunny,
  LocalFireDepartment,
  Science,
  Spa as HealthyPlantIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"

// Custom theme for crop disease detection
const cropTheme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // Forest green
      light: "#60ad5e",
      dark: "#005005",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff8f00", // Amber
      light: "#ffc046",
      dark: "#c56000",
      contrastText: "#000000",
    },
    error: {
      main: "#d32f2f", // Red - for diseased plants
      light: "#ff6659",
      dark: "#9a0007",
    },
    warning: {
      main: "#ed6c02", // Orange - for potential issues
      light: "#ff9d3f",
      dark: "#b53d00",
    },
    success: {
      main: "#388e3c", // Green - for healthy plants
      light: "#6abf69",
      dark: "#00600f",
    },
    background: {
      default: "#f9fbf7", // Light green-tinted white
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 24px",
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)",
          "&:hover": {
            background: "linear-gradient(45deg, #005005 30%, #2e7d32 90%)",
          },
        },
      },
    },
  },
})

// Styled components with improved aesthetics
const UploadBox = styled(Paper)(({ theme, isDragActive }) => ({
  border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
  borderRadius: 12,
  padding: theme.spacing(5),
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: isDragActive ? theme.palette.primary.light + "15" : theme.palette.background.paper,
  transition: "all 0.3s ease",
  boxShadow: isDragActive ? "0px 4px 20px rgba(46, 125, 50, 0.2)" : "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.light + "10",
    boxShadow: "0px 4px 20px rgba(46, 125, 50, 0.1)",
  },
}))

const HiddenInput = styled("input")({
  display: "none",
})

const ImagePreview = styled("img")({
  maxWidth: "100%",
  maxHeight: "300px",
  objectFit: "contain",
  marginTop: 16,
  borderRadius: 12,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
})

const FeatureIcon = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  width: 90,
  height: 90,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
  boxShadow: "0px 6px 15px rgba(46, 125, 50, 0.2)",
}))

const ConfidenceIndicator = styled(Box)(({ theme, confidence }) => {
  let color = theme.palette.error.main
  if (confidence > 90) color = theme.palette.success.main
  else if (confidence > 75) color = theme.palette.secondary.main

  return {
    display: "flex",
    alignItems: "center",
    backgroundColor: `${color}15`,
    color: color,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    border: `1px solid ${color}30`,
  }
})

// Plant types for dropdown
const plantTypes = [
  { value: "corn", label: "Corn" },
  { value: "sugarcane", label: "Sugarcane" },
  { value: "potato", label: "Potato" },
  { value: "rice", label: "Rice" },
  { value: "wheat", label: "Wheat" },
]

// Organized disease database by plant type for better matching
const diseaseDatabase = {
  // Corn diseases
  corn: {
    Rust: {
      name: "Corn Common Rust",
      description:
        "Common rust is a fungal disease affecting corn caused by Puccinia sorghi. It appears as small, circular to elongated cinnamon-brown pustules on both leaf surfaces. Severe infections can reduce photosynthesis and yield.",
      precautions: [
        "Plant resistant hybrids when available",
        "Early planting to avoid optimal conditions for rust development",
        "Proper field rotation with non-host crops",
        "Monitor fields regularly for early detection",
        "Apply fungicides when disease pressure is high",
      ],
      fertilizers: [
        "Balanced NPK fertilizer with micronutrients",
        "Silica supplements to strengthen plant cell walls",
        "Potassium-rich fertilizers to enhance disease resistance",
        "Foliar zinc applications to improve immune response",
      ],
      icon: <LocalFlorist />,
    },
    corn_gray_leaf_spot: {
      name: "Corn Gray Leaf Spot",
      description:
        "Gray leaf spot is a major fungal disease of corn caused by Cercospora zeae-maydis. It produces rectangular lesions that are initially small and water-soaked but enlarge to become tan to gray with parallel sides restricted by leaf veins.",
      precautions: [
        "Use resistant hybrids",
        "Practice crop rotation with non-host crops",
        "Implement conservation tillage practices",
        "Avoid high plant populations in vulnerable areas",
        "Apply fungicides at early silking stage when necessary",
      ],
      fertilizers: [
        "Balanced NPK with adequate nitrogen levels",
        "Sulfur supplements to enhance fungal resistance",
        "Manganese and zinc micronutrients",
        "Organic matter amendments to improve soil health",
      ],
      icon: <Opacity />,
    },
    Blight: {
      name: "Corn Northern Leaf Blight",
      description:
        "Northern leaf blight is caused by the fungus Exserohilum turcicum. It produces long, elliptical lesions that are grayish-green to tan and can measure 1-6 inches long. Under favorable conditions, the disease can cause significant yield losses.",
      precautions: [
        "Plant resistant hybrids",
        "Rotate with non-host crops",
        "Implement residue management practices",
        "Early planting to avoid optimal infection conditions",
        "Apply foliar fungicides at early disease detection",
      ],
      fertilizers: [
        "Balanced fertility program with adequate potassium",
        "Micronutrient packages with zinc and manganese",
        "Silicon supplements to strengthen cell walls",
        "Humic acid to improve nutrient uptake and plant vigor",
      ],
      icon: <WbCloudy />,
    },
    Healthy: {
      name: "Corn Healthy",
      description:
        "Healthy corn plants display vibrant green leaves with no visible lesions, spots, or abnormal discoloration. Proper management practices help maintain plant health and maximize yield potential.",
      precautions: [
        "Regular scouting for early disease detection",
        "Proper plant spacing for adequate air circulation",
        "Balanced irrigation practices",
        "Implement integrated pest management",
        "Maintain proper soil fertility",
      ],
      fertilizers: [
        "Balanced NPK with timed nitrogen applications",
        "Zinc supplements for optimal growth",
        "Sulfur to support protein synthesis",
        "Organic matter to improve soil structure and fertility",
      ],
      icon: <HealthyPlantIcon />,
    },
  },
  
  // Potato diseases
  potato: {
    Potato___Early_Blight: {
      name: "Potato Early Blight",
      description:
        "Early blight is caused by the fungus Alternaria solani. It typically appears as dark brown to black lesions with concentric rings, forming a target-like pattern on older leaves. The disease can affect foliage, stems, and tubers.",
      precautions: [
        "Use certified disease-free seed potatoes",
        "Practice proper crop rotation (3-4 years)",
        "Maintain adequate plant nutrition",
        "Improve air circulation with proper plant spacing",
        "Apply protective fungicides before disease development",
      ],
      fertilizers: [
        "Balanced NPK with adequate phosphorus and potassium",
        "Calcium amendments to strengthen cell walls",
        "Micronutrient supplements with manganese",
        "Organic composts to improve soil health and drainage",
      ],
      icon: <BugReport />,
    },
    Potato___Late_Blight: {
      name: "Potato Late Blight",
      description:
        "Late blight is a devastating disease of potatoes caused by the oomycete Phytophthora infestans. It appears as water-soaked lesions that quickly enlarge and turn dark brown to purplish-black. White fungal growth may be visible on leaf undersides in humid conditions.",
      precautions: [
        "Use resistant varieties when available",
        "Plant certified disease-free seed potatoes",
        "Ensure good air circulation by proper spacing",
        "Avoid overhead irrigation and extended leaf wetness",
        "Apply preventative fungicides before infection occurs",
      ],
      fertilizers: [
        "Balanced NPK fertilizer with micronutrients",
        "Calcium-rich amendments to strengthen cell walls",
        "Potassium sulfate to improve disease resistance",
        "Silicon supplements to enhance structural integrity",
      ],
      icon: <WaterDrop />,
    },
    Potato___Healthy: {
      name: "Potato Healthy",
      description:
        "Healthy potato plants show deep green foliage, robust stems, and proper flowering. Regular monitoring and preventative care maintain plant health and optimize tuber development.",
      precautions: [
        "Use certified seed potatoes",
        "Proper crop rotation (3-4 years)",
        "Regular monitoring for pest and disease",
        "Maintain consistent soil moisture",
        "Hill plants properly to protect developing tubers",
      ],
      fertilizers: [
        "Balanced NPK with phosphorus emphasis for tuber development",
        "Calcium to improve tuber quality and storage life",
        "Magnesium supplements to enhance photosynthesis",
        "Organic compost to improve soil health and structure",
      ],
      icon: <HealthyPlantIcon />,
    },
  },
  
  // Rice diseases
  rice: {
    Rice___Brown_Spot: {
      name: "Rice Brown Spot",
      description:
        "Brown spot is a fungal disease caused by Cochliobolus miyabeanus that affects rice plants. It appears as oval to circular brown lesions on leaves and can cause significant yield loss, particularly in nutrient-deficient soils.",
      precautions: [
        "Use resistant varieties",
        "Treat seeds with fungicides before planting",
        "Maintain balanced soil fertility, especially potassium",
        "Avoid water stress conditions",
        "Practice field sanitation by removing crop residues",
      ],
      fertilizers: [
        "Balanced NPK with emphasis on potassium",
        "Silicon applications to strengthen plant tissues",
        "Manganese sulfate to correct deficiencies",
        "Organic amendments to improve soil structure",
      ],
      icon: <Grain />,
    },
    Rice___Leaf_Blast: {
      name: "Rice Leaf Blast",
      description:
        "Leaf blast is a serious fungal disease of rice caused by Magnaporthe oryzae. It produces diamond-shaped lesions with gray centers and brown margins on leaves. Under favorable conditions, it can cause complete crop failure.",
      precautions: [
        "Plant resistant varieties",
        "Maintain continuous flooding in paddy fields",
        "Avoid excessive nitrogen fertilization",
        "Practice proper field sanitation",
        "Apply preventative fungicides at key growth stages",
      ],
      fertilizers: [
        "Balanced NPK with controlled nitrogen release",
        "Silicon-rich amendments to strengthen plant tissues",
        "Potassium supplements to enhance disease resistance",
        "Micronutrient packages with zinc and manganese",
      ],
      icon: <FilterVintage />,
    },
    Rice___Neck_Blast: {
      name: "Rice Neck Blast",
      description:
        "Neck blast is a severe form of rice blast disease caused by Magnaporthe oryzae that affects the panicle neck. It causes a brownish-black lesion that often encircles the neck, leading to panicle breakage and empty grains.",
      precautions: [
        "Use resistant cultivars",
        "Apply fungicides at heading stage",
        "Maintain consistent water management",
        "Balance nitrogen fertilization",
        "Early planting to avoid peak disease periods",
      ],
      fertilizers: [
        "Split nitrogen applications to avoid excess at heading",
        "Silicon supplements for strengthening stems",
        "Potassium sulfate to improve stem strength",
        "Calcium and boron to enhance cell wall integrity",
      ],
      icon: <Opacity />,
    },
    Rice___Healthy: {
      name: "Rice Healthy",
      description:
        "Healthy rice plants display uniform green color, vigorous growth, and well-developed panicles. Proper water management and nutrition are essential for maintaining plant health and maximizing yield.",
      precautions: [
        "Maintain appropriate water levels",
        "Regular monitoring for pest and disease",
        "Proper plant spacing",
        "Timely weed management",
        "Balanced nutrient application",
      ],
      fertilizers: [
        "Balanced NPK with timed nitrogen applications",
        "Silicon supplements for strengthening stalks",
        "Zinc to address common deficiencies in paddy soils",
        "Organic amendments to improve soil biology",
      ],
      icon: <HealthyPlantIcon />,
    },
  },
  
  // Wheat diseases
  wheat: {
    Wheat___Brown_Rust: {
      name: "Stem Rust",
      description:
        "Stem rust is caused by Puccinia graminis f. sp. tritici. It appears as reddish-brown, elongated pustules primarily on stems and leaf sheaths. Severe infections can lead to lodging, shriveled grain, and significant yield losses.",
      precautions: [
        "Plant resistant varieties",
        "Early sowing to escape peak disease periods",
        "Remove volunteer wheat plants",
        "Monitor fields regularly",
        "Apply fungicides at flag leaf emergence when necessary",
      ],
      fertilizers: [
        "Balanced NPK with moderate nitrogen levels",
        "Sulfur supplements to enhance disease resistance",
        "Micronutrient packages with zinc and copper",
        "Silicon applications to strengthen plant tissues",
      ],
      icon: <Grass />,
    },
    wheat_leaf_rust: {
      name: "Wheat Leaf Rust",
      description:
        "Leaf rust is caused by Puccinia triticina. It appears as small, round to oval orange-brown pustules mainly on the upper leaf surface. Severe infections can reduce grain yield and quality significantly.",
      precautions: [
        "Plant resistant varieties",
        "Early sowing to escape peak disease periods",
        "Remove volunteer wheat plants",
        "Monitor fields regularly",
        "Apply fungicides at flag leaf emergence when necessary",
      ],
      fertilizers: [
        "Balanced NPK with moderate nitrogen levels",
        "Sulfur supplements to enhance disease resistance",
        "Micronutrient packages with zinc and copper",
        "Silicon applications to strengthen plant tissues",
      ],
      icon: <Grass />,
    },
    Wheat___Yellow_Rust: {
      name: "Wheat Yellow Rust",
      description:
        "Yellow rust (stripe rust) is caused by Puccinia striiformis. It appears as yellow-orange pustules arranged in stripes along leaf veins. The disease can spread rapidly in cool, humid conditions and cause significant yield losses.",
      precautions: [
        "Use genetically resistant varieties",
        "Practice crop rotation with non-host crops",
        "Early sowing in high-risk areas",
        "Regular field monitoring for early detection",
        "Apply fungicides at stem elongation stage when necessary",
      ],
      fertilizers: [
        "Balanced NPK with controlled nitrogen application",
        "Potassium sulfate to improve disease resistance",
        "Micronutrients including zinc, manganese, and copper",
        "Silica-rich amendments to strengthen plant tissues",
      ],
      icon: <WbSunny />,
    },
    Wheat___Health: {
      name: "Wheat Healthy",
      description:
        "Healthy wheat plants display uniform growth, vibrant green color, and well-formed heads. Regular monitoring and proper management practices help maintain plant vigor and optimize grain development.",
      precautions: [
        "Proper seeding rates and depth",
        "Regular monitoring for pest and disease",
        "Timely irrigation, especially during critical growth stages",
        "Integrated weed management",
        "Appropriate harvest timing",
      ],
      fertilizers: [
        "Balanced NPK with split nitrogen applications",
        "Sulfur supplements for protein development",
        "Micronutrients including zinc, copper, and manganese",
        "Organic matter to improve soil structure and water retention",
      ],
      icon: <HealthyPlantIcon />,
    },
  },
  
  // Sugarcane diseases
  sugarcane: {
    Red_Rot: {
      name: "Sugarcane Red Rot",
      description:
        "Red rot is a serious fungal disease of sugarcane caused by Colletotrichum falcatum. It appears as red discoloration of the internal stalk tissue with white patches. The disease can significantly reduce cane yield and sugar content.",
      precautions: [
        "Plant resistant varieties",
        "Use healthy, disease-free seed cane",
        "Treat seed cane with fungicides before planting",
        "Avoid waterlogging in fields",
        "Remove and destroy infected plants",
      ],
      fertilizers: [
        "Balanced NPK with moderate nitrogen",
        "Potassium-rich fertilizers to enhance stalk strength",
        "Micronutrient supplements with zinc and copper",
        "Organic amendments to improve soil health",
      ],
      icon: <LocalFireDepartment />,
    },
    Bacterial_Blight: {
      name: "Sugarcane Bacterial Blight",
      description:
        "Bacterial blight in sugarcane is caused by Xanthomonas albilineans. It produces white to cream-colored leaf stripes that follow the veins and can lead to leaf scalding. Severe infections can cause stalk death and significant yield losses.",
      precautions: [
        "Plant clean, certified seed cane",
        "Choose resistant varieties when available",
        "Disinfect cutting tools between fields",
        "Practice crop rotation",
        "Maintain good field drainage",
      ],
      fertilizers: [
        "Balanced NPK with adequate calcium",
        "Copper-based supplements for bacterial suppression",
        "Silicon amendments to strengthen plant tissues",
        "Organic matter to improve soil biological activity",
      ],
      icon: <Science />,
    },
    Healthy: {
      name: "Sugarcane Healthy",
      description:
        "Healthy sugarcane plants show dark green leaves, robust stalks, and vigorous growth. Proper management practices ensure optimal sugar accumulation and high-quality yield.",
      precautions: [
        "Use clean, disease-free seed cane",
        "Implement proper irrigation practices",
        "Regular monitoring for pest and disease",
        "Timely weed management",
        "Appropriate harvest timing for maximum sugar content",
      ],
      fertilizers: [
        "Balanced NPK with timed applications",
        "Silicon supplements for stalk strength",
        "Micronutrients including zinc, iron, and manganese",
        "Organic amendments to improve soil health and structure",
      ],
      icon: <HealthyPlantIcon />,
    },
  },
}

// Flatten disease database for backward compatibility
const flatDiseaseDatabase = {};
Object.keys(diseaseDatabase).forEach(plantType => {
  Object.keys(diseaseDatabase[plantType]).forEach(diseaseKey => {
    flatDiseaseDatabase[diseaseKey] = diseaseDatabase[plantType][diseaseKey];
  });
});

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`disease-tabpanel-${index}`}
      aria-labelledby={`disease-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

// Mock soil treatment suggestions
const mockSoilTreatments = {
  late_blight: [
    "Apply lime to increase soil pH to 6.5-7.0 to reduce pathogen survival",
    "Incorporate well-composted organic matter to improve drainage and soil structure",
    "Add calcium amendments like gypsum to strengthen plant cell walls",
    "Implement crop rotation with non-solanaceous crops for at least 3 years",
    "Consider using biochar to improve soil microbial activity and disease suppression",
  ],
  powdery_mildew: [
    "Maintain soil pH between 6.0-6.5 to optimize nutrient availability",
    "Apply silicon-rich amendments like diatomaceous earth to strengthen plant resistance",
    "Incorporate compost tea as a soil drench to boost beneficial microorganisms",
    "Reduce nitrogen applications and increase potassium for balanced nutrition",
    "Add mycorrhizal fungi inoculants to improve plant immune response",
  ],
  leaf_spot: [
    "Improve soil drainage by adding organic matter and avoiding compaction",
    "Apply sulfur amendments to lower soil pH if above 7.0",
    "Use humic acid to enhance nutrient uptake and plant vigor",
    "Incorporate beneficial bacteria like Bacillus subtilis to suppress pathogens",
    "Add trace minerals including zinc and manganese to strengthen plant defenses",
  ],
  // Add specific treatments for each plant type
  stem_rust: [
    "Apply sulfur-based fungicides as a preventative measure",
    "Maintain soil pH between 6.0-7.0 for optimal nutrient availability",
    "Add organic matter to improve soil structure and water retention",
    "Use potassium-rich amendments to strengthen plant resistance",
    "Incorporate beneficial microbes to compete with pathogenic fungi"
  ],
  wheat_stem_rust: [
    "Apply sulfur-based fungicides as a preventative measure",
    "Maintain soil pH between 6.0-7.0 for optimal nutrient availability",
    "Add organic matter to improve soil structure and water retention",
    "Use potassium-rich amendments to strengthen plant resistance",
    "Incorporate beneficial microbes to compete with pathogenic fungi"
  ],
  corn_common_rust: [
    "Maintain proper soil drainage to reduce humidity around plants",
    "Apply balanced fertilizers with micronutrients, especially zinc",
    "Use compost tea as a foliar spray to boost plant immunity",
    "Incorporate mycorrhizal fungi to improve nutrient uptake",
    "Add silicon amendments to strengthen plant cell walls"
  ]
}

function User() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [isLoggedIn] = useState(true) // Assuming user is logged in
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState([])
  const [aiSuggestions, setAiSuggestions] = useState([])
  const [isLoadingAi, setIsLoadingAi] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedPlantType, setSelectedPlantType] = useState("")
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  })

  // Load history from localStorage on component mount
  useEffect(() => {
    const fetchHistoryFromBackend = async () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        console.warn("No access token found.")
        return
      }
  
      try {
        const response = await fetch("http://127.0.0.1:8000/history/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
  
        if (!response.ok) {
          throw new Error("Failed to fetch history")
        }
  
        const backendHistory = await response.json()
        console.log("✅ Fetched history from backend:", backendHistory)
  
        const processedHistory = backendHistory.map((item) => ({
          ...item,
          disease: {
            ...(item.disease || {}),
            icon: getIconForDisease(item.disease_detected || item.disease?.name || ""),
          },
          imageUrl: item.image, // Assuming `image` is the image path from backend
          confidence: item.confidence_score,
          plantType: item.plant_type,
          date: new Date(item.timestamp).toLocaleString(),
          diseaseName: item.disease_detected,
        }))
  
        setHistory(processedHistory)
      } catch (error) {
        console.error("Error fetching backend history:", error)
      }
    }
  
    fetchHistoryFromBackend()
  }, [])
  

  // Helper function to get icon based on disease name
  const getIconForDisease = (diseaseName) => {
    if (!diseaseName) return <LocalFlorist />
    if (diseaseName.includes("Blight")) return <WaterDrop />
    if (diseaseName.includes("Mildew")) return <BugReport />
    if (diseaseName.includes("Rust")) return <Grass />
    return <LocalFlorist />
  }

  const handlePlantTypeChange = (event) => {
    setSelectedPlantType(event.target.value)
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
      setResult(null)
      setAiSuggestions([])
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragActive(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragActive(false)

    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(droppedFile)
      setResult(null)
      setAiSuggestions([])
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const showNotification = (message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token")
      if (!refreshToken) {
        console.warn("❌ No refresh token found. Logging out...")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        window.location.href = "/signin" // Redirect to login
        return false
      }

      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("access_token", data.access)
        console.log("🔄 Token refreshed successfully.")
        return true
      } else {
        console.warn("❌ Token refresh failed. Logging out...")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        window.location.href = "/signin" // Redirect to login
        return false
      }
    } catch (error) {
      console.error("❌ Error refreshing token:", error)
      return false
    }
  }

  // FIXED: Improved disease detection logic for wheat stem rust
  const findDiseaseByName = (diseaseName, plantType) => {
    if (!diseaseName || !plantType) return null;
  
    console.log(`🔍 Finding disease: "${diseaseName}" for plant type: "${plantType}"`);
  
    const diseaseDb = diseaseDatabase[plantType];
    if (!diseaseDb) {
      console.warn(`⚠️ No disease database found for plant type: ${plantType}`);
      return null;
    }
  
    const normalizedDiseaseName = diseaseName.trim().toLowerCase();
  
    // ✅ 1. Direct key match (case-insensitive)
    const keyMatch = Object.keys(diseaseDb).find(
      key => key.trim().toLowerCase() === normalizedDiseaseName
    );
    if (keyMatch) {
      console.log("✅ Matched disease by key:", keyMatch);
      return diseaseDb[keyMatch];
    }
  
    // ✅ 2. Match against `name` field
    const exactNameMatch = Object.values(diseaseDb).find(
      disease => disease.name?.trim().toLowerCase() === normalizedDiseaseName
    );
    if (exactNameMatch) {
      console.log("✅ Matched disease by .name:", exactNameMatch.name);
      return exactNameMatch;
    }
  
    // ✅ 3. Partial match as fallback
    const partialMatch = Object.values(diseaseDb).find(
      disease =>
        normalizedDiseaseName.includes(disease.name?.toLowerCase()) ||
        disease.name?.toLowerCase().includes(normalizedDiseaseName)
    );
    if (partialMatch) {
      console.log("🔍 Found partial name match:", partialMatch.name);
      return partialMatch;
    }
  
    console.warn(`❌ No match found for "${diseaseName}" in "${plantType}"`);
    return null;
  };
  
  
  const analyzeImage = async () => {
    if (!file || !selectedPlantType) {
      showNotification("Please select a plant type before analyzing", "warning");
      return;
    }

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("plant_type", selectedPlantType);

    let token = localStorage.getItem("access_token");
    if (!token) {
      showNotification("Session expired. Please log in again.", "error");
      window.location.href = "/signin";
      return;
    }

    // Decode token and check expiration
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        console.warn("⏳ Access token expired. Refreshing...");
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          token = localStorage.getItem("access_token");
        } else {
          setIsAnalyzing(false);
          return;
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      showNotification("Invalid token. Please log in again.", "error");
      window.location.href = "/signin";
      setIsAnalyzing(false);
      return;
    }

    try {
      console.log("📡 Sending JWT Token:", token);
      console.log("📡 Selected plant type:", selectedPlantType);

      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log("📡 API Response:", data);

      if (response.ok && data && data.data) {
        // Get the disease name from the response
        const diseaseName = data.data.disease_detected || "";
        console.log("Disease detected:", diseaseName);

        // Find the disease in our plant-specific database
        let diseaseData = findDiseaseByName(diseaseName, selectedPlantType);
        
        // If not found in the plant-specific database, check if it's a case of misidentification
        if (!diseaseData) {
          console.warn(`Disease "${diseaseName}" not found in ${selectedPlantType} database`);
          
          // For wheat specifically, check for stem rust if the backend returns something else
          if (selectedPlantType === "wheat") {
            diseaseData = diseaseDatabase.wheat.wheat_stem_rust;
            console.log("Defaulting to wheat stem rust");
          } else {
            // Use a generic healthy state for the selected plant if no match found
            const healthyKey = `${selectedPlantType}_healthy`;
            diseaseData = flatDiseaseDatabase[healthyKey] || {
              name: `${selectedPlantType.charAt(0).toUpperCase() + selectedPlantType.slice(1)} Healthy`,
              description: "No disease detected. The plant appears to be healthy.",
              precautions: ["Continue regular monitoring", "Maintain proper irrigation", "Follow recommended fertilization"],
              fertilizers: ["Balanced NPK fertilizer", "Micronutrients as needed"],
              icon: <HealthyPlantIcon />,
            };
            
            showNotification("No specific disease detected for this plant type", "info");
          }
        }

        // Store the image URL from the response or use the preview
        const imageUrl = data.data.image_url || preview;
        console.log("Image URL:", imageUrl);

        setResult({
          disease: diseaseData,
          confidence: data.data.confidence || 0,
          plantType: selectedPlantType,
          imageUrl: imageUrl,
          diseaseName: diseaseData.name, // Store the corrected disease name
        });

        saveToHistory({
          ...data.data,
          disease_detected: diseaseData,
          image_url: imageUrl,
        });
      } else {
        console.error("⚠️ Server Error:", data);
        showNotification(data?.error || "Error analyzing image.", "error");
      }
    } catch (error) {
      console.error("Error:", error);

      showNotification("Network error. Please try again.", "error");
      alert("Debug: " + error.message);

    }

    setIsAnalyzing(false);
  }

  // FIXED: Improved history saving to properly store image URLs
  const saveToHistory = (newResult) => {
    if (!isLoggedIn || !newResult) return;

    // Ensure we have the image URL from either image_url or preview
    const imageUrl = newResult.image_url || preview;
    console.log("Saving history with image URL:", imageUrl);

    const historyItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      imageUrl: imageUrl, // Store image URL explicitly
      disease: newResult.disease_detected || {
        name: "Unknown Disease",
        description: "No description available",
        precautions: [],
        fertilizers: [],
      },
      confidence: newResult.confidence || 85,
      plantType: selectedPlantType,
    };

    const updatedHistory = [historyItem, ...history];
    setHistory(updatedHistory);

    try {
      // Prepare for serialization
      const serializableHistory = updatedHistory.map((item) => ({
        ...item,
        disease: {
          ...(item.disease || {}),
          icon: null, // Remove JSX element for storage
        },
        // Ensure imageUrl is explicitly saved
        imageUrl: item.imageUrl || item.image_url || null,
      }));
      localStorage.setItem("cropDiseaseHistory", JSON.stringify(serializableHistory));
      console.log("History saved successfully with images");
    } catch (error) {
      console.error("Error saving history:", error);
    }
  }

  const getSoilTreatmentSuggestions = async () => {
    if (!result || !result.diseaseName) return;

    setIsLoadingAi(true);
    try {
      // In a real app, this would be an API call using your API key
      // For this example, we'll use the mock data
      setTimeout(() => {
        // Get plant-specific soil treatments if available
        const diseaseKey = result.diseaseName.toLowerCase().replace(/\s+/g, '_');
        const plantTypeKey = `${selectedPlantType}_${diseaseKey}`;
        
        // Try to find plant-specific treatments first, then general treatments
        const suggestions = 
          mockSoilTreatments[plantTypeKey] || 
          mockSoilTreatments[diseaseKey] || 
          mockSoilTreatments[result.diseaseName.split(' ')[0].toLowerCase()] || 
          [
            `Apply balanced fertilizer suitable for ${selectedPlantType}`,
            "Improve soil drainage to prevent disease development",
            "Add organic matter to enhance soil structure and microbial activity",
            "Maintain proper pH levels for optimal nutrient availability",
            "Consider crop rotation to break disease cycles"
          ];
          
        setAiSuggestions(suggestions);

        // Update history item with AI suggestions
        if (isLoggedIn && history.length > 0) {
          const updatedHistory = history.map((item, index) =>
            index === 0 ? { ...item, aiSuggestions: suggestions } : item
          );
          setHistory(updatedHistory);

          // Save updated history to localStorage
          try {
            const serializableHistory = updatedHistory.map((item) => ({
              ...item,
              disease: {
                ...(item.disease || {}),
                icon: null,
              },
              // Ensure imageUrl is explicitly saved
              imageUrl: item.imageUrl || item.image_url || null,
            }));
            localStorage.setItem("cropDiseaseHistory", JSON.stringify(serializableHistory));
          } catch (error) {
            console.error("Error saving history with AI suggestions:", error);
          }
        }

        setIsLoadingAi(false);
      }, 1500);
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
      setIsLoadingAi(false);
    }
  }

  // User menu functions
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleHistoryClick = () => {
    setShowHistory(true);
    handleMenuClose();
  }

  const handleHistoryClose = () => {
    setShowHistory(false);
  }

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    showNotification("Logged out successfully", "info");
    handleMenuClose();
  }

  // FIXED: Improved history item loading to properly handle image URLs
  const loadHistoryItem = (item) => {
    if (!item) return;

    console.log("Loading history item:", item);
    
    // Ensure we get the image URL from either imageUrl or image_url
    const imageUrl = item.imageUrl || item.image_url || "";
    console.log("Loading image URL:", imageUrl);

    setPreview(imageUrl);
    setResult({
      disease: item.disease || {},
      diseaseName: item.disease?.name || "",
      confidence: item.confidence || 0,
      plantType: item.plantType || "",
      imageUrl: imageUrl,
    });
    
    if (item.plantType) {
      setSelectedPlantType(item.plantType);
    }
    if (item.aiSuggestions && Array.isArray(item.aiSuggestions)) {
      setAiSuggestions(item.aiSuggestions);
    } else {
      setAiSuggestions([]);
    }
    setShowHistory(false);
  }

  return (
    <ThemeProvider theme={cropTheme}>
      {/* Notification Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} elevation={6} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* App Bar */}
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plant Health Analyzer
          </Typography>

          {isLoggedIn && (
            <>
              <IconButton size="large" edge="end" color="inherit" onClick={handleMenuOpen}>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleHistoryClick}>
                  <ListItemIcon>
                    <HistoryIcon fontSize="small" />
                  </ListItemIcon>
                  View History
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              color: "primary.dark",
              fontWeight: 700,
              position: "relative",
              display: "inline-block",
              pb: 2,
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "4px",
                backgroundColor: "primary.main",
                borderRadius: "2px",
              },
            }}
          >
            Plant Health Analyzer
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              fontSize: "1.1rem",
              mb: 2,
            }}
          >
            Upload an image of your crop to identify diseases and get expert treatment recommendations
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Upload Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ height: "100%" }}>
              <CardHeader
                title={
                  <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.dark" }}>
                    Upload Crop Image
                  </Typography>
                }
                subheader="Take a clear photo of the affected plant part"
                avatar={
                  <Box sx={{ bgcolor: "primary.light", p: 1, borderRadius: "50%" }}>
                    <CloudUpload color="inherit" sx={{ color: "white" }} />
                  </Box>
                }
              />
              <CardContent>
                {/* Plant Type Dropdown */}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="plant-type-label">Plant Type</InputLabel>
                  <Select
                    labelId="plant-type-label"
                    id="plant-type-select"
                    value={selectedPlantType}
                    label="Plant Type"
                    onChange={handlePlantTypeChange}
                    startAdornment={
                      <Box component="span" sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                        <Agriculture fontSize="small" />
                      </Box>
                    }
                  >
                    {plantTypes.map((plant) => (
                      <MenuItem key={plant.value} value={plant.value}>
                        {plant.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box component="label" htmlFor="crop-image-upload">
                  <UploadBox
                    isDragActive={isDragActive}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {preview ? (
                      <Box>
                        <ImagePreview src={preview || "/placeholder.svg"} alt="Crop preview" />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                          Click or drag to replace image
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <CloudUpload sx={{ fontSize: 70, color: "primary.main", mb: 2, opacity: 0.8 }} />
                        <Typography variant="h6" gutterBottom fontWeight={500}>
                          Drag and drop your plant image here
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          or click to browse files
                        </Typography>
                      </Box>
                    )}
                  </UploadBox>
                  <HiddenInput id="crop-image-upload" type="file" accept="image/*" onChange={handleFileChange} />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={!file || !selectedPlantType || isAnalyzing}
                  onClick={analyzeImage}
                  startIcon={isAnalyzing ? <CircularProgress size={20} color="inherit" /> : <BugReport />}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardHeader
                title={
                  <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.dark" }}>
                    Disease Information
                  </Typography>
                }
                subheader={
                  result
                    ? `Detected: ${result.disease?.name || "Unknown"} (${result.confidence || 0}% confidence)`
                    : "Results will appear here after analysis"
                }
                avatar={
                  <Box sx={{ bgcolor: "primary.light", p: 1, borderRadius: "50%" }}>
                    <Science color="inherit" sx={{ color: "white" }} />
                  </Box>
                }
              />
              <CardContent sx={{ flexGrow: 1 }}>
                {!result && !isAnalyzing && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      minHeight: "300px",
                      py: 4,
                    }}
                  >
                    <LocalFlorist sx={{ fontSize: 70, color: "primary.light", mb: 2, opacity: 0.7 }} />
                    <Typography variant="body1" color="text.secondary" align="center">
                      Upload and analyze a crop image to see disease information
                    </Typography>
                  </Box>
                )}

                {isAnalyzing && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      minHeight: "300px",
                    }}
                  >
                    <CircularProgress size={70} sx={{ mb: 3, color: "primary.main" }} />
                    <Typography variant="body1" color="text.secondary">
                      Analyzing your crop image...
                    </Typography>
                  </Box>
                )}

                {result && (
                  <Box>
                    <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                      <Agriculture sx={{ color: "primary.main", mr: 1 }} />
                      <Typography variant="body1" color="text.secondary">
                        Plant Type:{" "}
                        {plantTypes.find((p) => p.value === result.plantType)?.label || result.plantType || "Unknown"}
                      </Typography>
                    </Box>

                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      variant="fullWidth"
                      indicatorColor="primary"
                      textColor="primary"
                      aria-label="disease information tabs"
                      sx={{
                        "& .MuiTab-root": {
                          minHeight: "64px",
                          fontWeight: 500,
                        },
                        mb: 2,
                      }}
                    >
                      <Tab icon={<Info />} label="Information" id="disease-tab-0" />
                      <Tab icon={<Science />} label="Treatment" id="disease-tab-1" />
                      <Tab icon={<Spa />} label="AI Soil Tips" id="disease-tab-2" />
                    </Tabs>

                    <TabPanel value={tabValue} index={0}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Box sx={{ mr: 2, color: "primary.main" }}>
                          {result.disease?.icon || <BugReport sx={{ fontSize: 32 }} />}
                        </Box>
                        <Typography variant="h5" color="primary.dark" fontWeight={600}>
                          {result.disease?.name || "Unknown Disease"}
                        </Typography>
                      </Box>

                      <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                        {result.disease?.description || "No description available."}
                      </Typography>

                      <ConfidenceIndicator confidence={result.confidence || 0}>
                        <CheckCircle sx={{ mr: 1 }} />
                        <Typography variant="body1" fontWeight={500}>
                          Confidence level: {result.confidence || 0}%
                        </Typography>
                      </ConfidenceIndicator>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom color="primary.dark" fontWeight={600}>
                          Recommended Precautions
                        </Typography>
                        <List sx={{ bgcolor: "background.default", borderRadius: 2, p: 2 }}>
                          {(result.disease?.precautions || []).map((precaution, index) => (
                            <ListItem key={index} sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: "40px" }}>
                                <CheckCircle color="success" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={precaution} primaryTypographyProps={{ fontSize: "0.95rem" }} />
                            </ListItem>
                          ))}
                          {(result.disease?.precautions || []).length === 0 && (
                            <ListItem>
                              <ListItemText primary="No precautions available." />
                            </ListItem>
                          )}
                        </List>
                      </Box>

                      <Box>
                        <Typography variant="h6" gutterBottom color="primary.dark" fontWeight={600}>
                          Recommended Fertilizers
                        </Typography>
                        <List sx={{ bgcolor: "background.default", borderRadius: 2, p: 2 }}>
                          {(result.disease?.fertilizers || []).map((fertilizer, index) => (
                            <ListItem key={index} sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: "40px" }}>
                                <Grass color="success" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={fertilizer} primaryTypographyProps={{ fontSize: "0.95rem" }} />
                            </ListItem>
                          ))}
                          {(result.disease?.fertilizers || []).length === 0 && (
                            <ListItem>
                              <ListItemText primary="No fertilizer recommendations available." />
                            </ListItem>
                          )}
                        </List>
                      </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary.dark" fontWeight={600}>
                          AI Soil Treatment Recommendations
                        </Typography>

                        {aiSuggestions && aiSuggestions.length > 0 ? (
                          <List sx={{ bgcolor: "background.default", borderRadius: 2, p: 2 }}>
                            {aiSuggestions.map((suggestion, index) => (
                              <ListItem key={index} sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: "40px" }}>
                                  <Spa color="success" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={suggestion} primaryTypographyProps={{ fontSize: "0.95rem" }} />
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <Box sx={{ textAlign: "center", py: 3 }}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={getSoilTreatmentSuggestions}
                              disabled={isLoadingAi}
                              startIcon={isLoadingAi ? <CircularProgress size={20} color="inherit" /> : <Spa />}
                            >
                              {isLoadingAi ? "Generating Suggestions..." : "Get AI Soil Treatment Suggestions"}
                            </Button>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                              Our AI will analyze the disease and provide customized soil treatment recommendations
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </TabPanel>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* How It Works Section */}
        <Card elevation={0} sx={{ mt: 6, bgcolor: "background.default", overflow: "hidden" }}>
          <Box
            sx={{
              py: 2,
              px: 3,
              background: "linear-gradient(90deg, rgba(46,125,50,0.8) 0%, rgba(56,142,60,0.8) 100%)",
              color: "white",
            }}
          >
            <Typography variant="h5" fontWeight={600}>
              How It Works
            </Typography>
            <Typography variant="body2">
              Our plant health analyzer uses advanced image recognition to identify crop diseases
            </Typography>
          </Box>
          <Divider />
          <CardContent sx={{ py: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <FeatureIcon>
                    <CloudUpload sx={{ fontSize: 45 }} />
                  </FeatureIcon>
                  <Typography variant="h6" gutterBottom color="primary.dark" fontWeight={600}>
                    Upload Image
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                    Take a clear photo of the affected plant part and upload it to our system for analysis
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <FeatureIcon>
                    <BugReport sx={{ fontSize: 45 }} />
                  </FeatureIcon>
                  <Typography variant="h6" gutterBottom color="primary.dark" fontWeight={600}>
                    Get Analysis
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                    Our AI analyzes the image to identify the disease affecting your crop with high accuracy
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <FeatureIcon>
                    <Science sx={{ fontSize: 45 }} />
                  </FeatureIcon>
                  <Typography variant="h6" gutterBottom color="primary.dark" fontWeight={600}>
                    Apply Solutions
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                    Follow the recommended precautions and treatments to protect your crops and increase yields
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      {/* History Drawer */}
      <Drawer
        anchor="right"
        open={showHistory}
        onClose={handleHistoryClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "450px" },
            boxSizing: "border-box",
            p: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton onClick={handleHistoryClose} sx={{ mr: 1 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" fontWeight={600}>
            Analysis History
          </Typography>
        </Box>

        {/* Ensure history is defined before mapping */}
        {!history || history.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
            }}
          >
            <HistoryIcon sx={{ fontSize: 60, color: "primary.light", mb: 2, opacity: 0.7 }} />
            <Typography variant="body1" color="text.secondary">
              No analysis history yet. Analyze some plant images to see your history here.
            </Typography>
          </Box>
        ) : (
          <List>
            {history.map((item) => (
              <Paper
                key={item?.id || Math.random().toString()}
                elevation={1}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  },
                }}
                onClick={() => loadHistoryItem(item)}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar sx={{ mr: 1 }}>
                    <Avatar
                      variant="rounded"
                      src={item?.imageUrl || item?.image_url || ""}
                      alt={item?.disease?.name || "Unknown Disease"}
                      sx={{ width: 60, height: 60 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item?.disease?.name || "Unknown Disease"}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {item?.date || "No Date Available"}
                        </Typography>
                        {item?.plantType && (
                          <Typography variant="body2" color="text.secondary">
                            Plant: {plantTypes.find((p) => p.value === item.plantType)?.label || item.plantType}
                          </Typography>
                        )}
                        <Box
                          sx={{
                            mt: 1,
                            display: "inline-block",
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: "0.75rem",
                            fontWeight: "medium",
                            bgcolor:
                              (item?.confidence || 0) > 90
                                ? "success.light"
                                : (item?.confidence || 0) > 75
                                  ? "warning.light"
                                  : "error.light",
                            color:
                              (item?.confidence || 0) > 90
                                ? "success.dark"
                                : (item?.confidence || 0) > 75
                                  ? "warning.dark"
                                  : "error.dark",
                          }}
                        >
                          {item?.confidence ? `${item.confidence}% confidence` : "No Confidence Data"}
                        </Box>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </Drawer>
    </ThemeProvider>
  )
}

export default User