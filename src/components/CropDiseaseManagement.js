"use client"

import { useState } from "react"
import axios from "axios"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CssBaseline,
} from "@mui/material"
import {
  Grass as PlantIcon,
  BugReport as DiseaseIcon,
  Agriculture as FarmIcon,
  LocalFlorist as CropIcon,
  WaterDrop as WaterIcon,
  Thermostat as TempIcon,
  Science as ScienceIcon,
  Healing as TreatmentIcon,
  WbSunny as SunIcon,
  Cloud as CloudIcon,
  LocationOn as LocationIcon,
  Opacity as HumidityIcon,
  Info as InfoIcon,
} from "@mui/icons-material"

// Create a custom theme for the application
const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // Dark green
      light: "#4caf50", // Medium green
      dark: "#1b5e20", // Very dark green
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#795548", // Brown
      light: "#a1887f", // Light brown
      dark: "#4b2c20", // Dark brown
      contrastText: "#ffffff",
    },
    error: {
      main: "#d32f2f", // Red for high risk
    },
    warning: {
      main: "#f57c00", // Orange for moderate risk
    },
    info: {
      main: "#1976d2", // Blue for information
    },
    success: {
      main: "#388e3c", // Green for low risk
    },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
})

function CropDiseaseManagement() {
  // Crop and disease selection states
  const [cropType, setCropType] = useState("")
  const [diseaseType, setDiseaseType] = useState("")
  const [severity, setSeverity] = useState("moderate")
  
  // Weather data states
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [cityName, setCityName] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  
  // UI states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchType, setSearchType] = useState("coordinates")
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)
  
  // Combined results state
  const [managementData, setManagementData] = useState(null)

  // Disease options based on crop selection
  const getDiseaseOptions = () => {
    switch(cropType) {
      case "Rice":
        return ["Rice Blast", "Bacterial Leaf Blight", "Sheath Blight", "Brown Spot"];
      case "Wheat":
        return ["Leaf Rust", "Powdery Mildew", "Fusarium Head Blight", "Septoria Leaf Blotch"];
      case "Corn":
        return ["Gray Leaf Spot", "Northern Corn Leaf Blight", "Common Rust", "Southern Rust"];
      case "Tomato":
        return ["Early Blight", "Late Blight", "Bacterial Spot", "Septoria Leaf Spot"];
      case "Potato":
        return ["Late Blight", "Early Blight", "Black Scurf", "Common Scab"];
      case "Cotton":
        return ["Bacterial Blight", "Verticillium Wilt", "Cotton Leaf Curl", "Anthracnose"];
      default:
        return [];
    }
  };

  // Function to get current location
  const getCurrentLocation = () => {
    setUseCurrentLocation(true);
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
          fetchWeatherData(lat, lon);
        },
        (error) => {
          setError("Error getting current location. Please enter coordinates or city name manually.");
          setLoading(false);
          setUseCurrentLocation(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser. Please enter coordinates or city name manually.");
      setUseCurrentLocation(false);
    }
  };

  // Function to fetch weather data - now using the real API
  const fetchWeatherData = async (lat = null, lon = null, city = null) => {
    setLoading(true);
    setError("");

    const options = {
      method: 'GET',
      url: city 
        ? 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily' 
        : 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily',
      params: city 
        ? { 
            city: city,
            units: 'M', 
            lang: 'en' 
          }
        : {
            lat: lat || latitude,
            lon: lon || longitude,
            units: 'M', 
            lang: 'en'
          },
      headers: {
        'x-rapidapi-key': '48d902461cmshebcb47417291ed7p12751bjsn1e9736e0c429',
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
      }
    };

    try {
      // Validate input based on search type
      if (searchType === 'coordinates' && ((!latitude && !lat) || (!longitude && !lon))) {
        setError("Please enter both latitude and longitude");
        setLoading(false);
        return;
      }

      if (searchType === 'city' && (!cityName && !city)) {
        setError("Please enter a city name");
        setLoading(false);
        return;
      }

      // Make the actual API call instead of using mock data
      const response = await axios.request(options);
      
      // Set the real weather data from the API response
      setWeatherData(response.data);
      setLoading(false);

      // Reset input fields based on search type
      if (searchType === 'coordinates') {
        setCityName('');
      } else {
        setLatitude('');
        setLongitude('');
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching weather data. Please check your input and try again.");
      setLoading(false);
    }
  };

  // Function to generate management recommendations
  const generateRecommendations = () => {
    setLoading(true);
    
    // Validate inputs
    if (!cropType) {
      setError("Please select a crop type");
      setLoading(false);
      return;
    }
    
    if (!diseaseType) {
      setError("Please select a disease type");
      setLoading(false);
      return;
    }
    
    if (!weatherData) {
      setError("Please fetch weather data first");
      setLoading(false);
      return;
    }
    
    // Simulate processing time
    setTimeout(() => {
      // Generate recommendations based on crop, disease, and weather
      const currentTemp = weatherData.data[0].temp;
      const currentHumidity = weatherData.data[0].rh;
      const currentPrecip = weatherData.data[0].precip;
      const rainChance = weatherData.data[0].pop;
      
      // Define disease info and base recommendations
      const diseaseInfo = {
        name: diseaseType,
        scientificName: getScientificName(diseaseType),
        description: getDiseaseDescription(diseaseType),
        severity: severity,
        favorableConditions: getFavorableConditions(diseaseType)
      };
      
      // Determine risk based on weather
      const riskLevel = calculateRiskLevel(diseaseType, currentTemp, currentHumidity, rainChance);
      
      // Determine if current weather is favorable for disease spread
      const isWeatherFavorable = isConditionFavorable(diseaseType, currentTemp, currentHumidity);
      
      // Modify recommendations based on weather conditions
      const treatmentOptions = getBaseTreatments(diseaseType, severity);
      const weatherAdjustedTreatments = adjustTreatmentsForWeather(
        treatmentOptions, 
        currentTemp, 
        currentHumidity, 
        currentPrecip, 
        rainChance
      );
      
      // Prepare data for display
      const resultData = {
        crop: {
          name: cropType,
          scientificName: getCropScientificName(cropType)
        },
        disease: diseaseInfo,
        weatherConditions: {
          current: weatherData.data[0],
          location: {
            name: weatherData.city_name,
            country: weatherData.country_code
          },
          isFavorable: isWeatherFavorable,
          riskLevel: riskLevel
        },
        recommendations: weatherAdjustedTreatments,
        preventionMeasures: getPreventionMeasures(diseaseType, weatherData),
        forecast: {
          impactOnDisease: getWeatherImpactForecast(diseaseType, weatherData.data),
          riskTrend: calculateRiskTrend(diseaseType, weatherData.data)
        }
      };
      
      setManagementData(resultData);
      setLoading(false);
    }, 1500);
  };
  
  // Helper function to get scientific name for diseases
  const getScientificName = (disease) => {
    const scientificNames = {
      "Rice Blast": "Magnaporthe oryzae",
      "Bacterial Leaf Blight": "Xanthomonas oryzae pv. oryzae",
      "Sheath Blight": "Rhizoctonia solani",
      "Brown Spot": "Cochliobolus miyabeanus",
      "Leaf Rust": "Puccinia triticina",
      "Powdery Mildew": "Blumeria graminis",
      "Fusarium Head Blight": "Fusarium graminearum",
      "Septoria Leaf Blotch": "Zymoseptoria tritici",
      "Gray Leaf Spot": "Cercospora zeae-maydis",
      "Northern Corn Leaf Blight": "Exserohilum turcicum",
      "Common Rust": "Puccinia sorghi",
      "Southern Rust": "Puccinia polysora",
      "Early Blight": "Alternaria solani",
      "Late Blight": "Phytophthora infestans",
      "Bacterial Spot": "Xanthomonas campestris",
      "Septoria Leaf Spot": "Septoria lycopersici",
      "Black Scurf": "Rhizoctonia solani",
      "Common Scab": "Streptomyces scabies",
      "Bacterial Blight": "Xanthomonas citri pv. malvacearum",
      "Verticillium Wilt": "Verticillium dahliae",
      "Cotton Leaf Curl": "Cotton leaf curl virus",
      "Anthracnose": "Colletotrichum gossypii"
    };
    
    return scientificNames[disease] || "Unknown pathogen";
  };
  
  // Helper function to get crop scientific names
  const getCropScientificName = (crop) => {
    const scientificNames = {
      "Rice": "Oryza sativa",
      "Wheat": "Triticum aestivum",
      "Corn": "Zea mays",
      "Tomato": "Solanum lycopersicum",
      "Potato": "Solanum tuberosum",
      "Cotton": "Gossypium hirsutum"
    };
    
    return scientificNames[crop] || "Unknown species";
  };
  
  // Helper function to get disease descriptions
  const getDiseaseDescription = (disease) => {
    const descriptions = {
      "Rice Blast": "A fungal disease that affects all above-ground parts of the rice plant, causing lesions on leaves, stems, and panicles.",
      "Bacterial Leaf Blight": "A bacterial disease causing yellow to white lesions along the leaf veins, which can lead to complete wilting of affected leaves.",
      "Sheath Blight": "A fungal disease causing lesions on the leaf sheaths, which can spread to the culms and eventually the entire plant.",
      "Brown Spot": "A fungal disease causing brown lesions on leaves, which can reduce photosynthetic capacity and grain quality.",
      "Late Blight": "A devastating fungal disease causing dark, water-soaked lesions on leaves and stems, which can rapidly kill the entire plant.",
      "Early Blight": "A fungal disease characterized by dark brown spots with concentric rings on older leaves, stems, and occasionally fruits."
    };
    
    return descriptions[disease] || "A plant disease affecting crop health and yield.";
  };
  
  // Helper function to get favorable conditions for diseases
  const getFavorableConditions = (disease) => {
    const conditions = {
      "Rice Blast": {
        temperature: "24-28°C",
        humidity: "Above 90%",
        rainfall: "Frequent light rain"
      },
      "Bacterial Leaf Blight": {
        temperature: "25-30°C",
        humidity: "Above 85%",
        rainfall: "Heavy rainfall"
      },
      "Sheath Blight": {
        temperature: "28-32°C",
        humidity: "Above 95%",
        rainfall: "High rainfall"
      },
      "Brown Spot": {
        temperature: "25-30°C",
        humidity: "Above 90%",
        rainfall: "Intermittent rainfall"
      },
      "Late Blight": {
        temperature: "15-20°C",
        humidity: "Above 90%",
        rainfall: "Frequent rainfall"
      },
      "Early Blight": {
        temperature: "24-29°C",
        humidity: "Above 80%",
        rainfall: "Alternating wet and dry periods"
      }
    };
    
    return conditions[disease] || {
      temperature: "Moderate to high",
      humidity: "High humidity",
      rainfall: "Adequate moisture"
    };
  };
  
  // Function to calculate if current weather is favorable for disease development
  const isConditionFavorable = (disease, temp, humidity) => {
    // Different diseases have different favorable conditions
    switch (disease) {
      case "Rice Blast":
        return temp >= 24 && temp <= 28 && humidity > 85;
      case "Bacterial Leaf Blight":
        return temp >= 25 && temp <= 30 && humidity > 85;
      case "Sheath Blight":
        return temp >= 28 && temp <= 32 && humidity > 90;
      case "Late Blight":
        return temp >= 10 && temp <= 20 && humidity > 85;
      case "Early Blight":
        return temp >= 24 && temp <= 29 && humidity > 80;
      default:
        return temp >= 20 && temp <= 30 && humidity > 80;
    }
  };
  
  // Function to calculate disease risk level based on weather
  const calculateRiskLevel = (disease, temp, humidity, rainChance) => {
    let risk = "Low";
    
    // Base risk assessment on disease-specific favorable conditions
    if (isConditionFavorable(disease, temp, humidity)) {
      risk = "Moderate";
      
      // Increase risk if rain is likely
      if (rainChance > 50) {
        risk = "High";
      }
      
      // Specific disease conditions
      if (disease === "Late Blight" && temp < 20 && humidity > 90 && rainChance > 30) {
        risk = "Very High";
      }
      
      if (disease === "Rice Blast" && temp >= 24 && temp <= 28 && humidity > 90 && rainChance > 40) {
        risk = "Very High";
      }
    }
    
    return risk;
  };
  
  // Function to get base treatment recommendations
  const getBaseTreatments = (disease, severity) => {
    // Common treatments with base effectiveness
    const chemicalOptions = {
      "Rice Blast": [
        {
          name: "Trifloxystrobin + Tebuconazole",
          schedule: "Apply at early signs of infection",
          effectiveness: 85,
          notes: "Systemic fungicide with protective and curative properties"
        },
        {
          name: "Azoxystrobin",
          schedule: "10-14 day intervals",
          effectiveness: 80,
          notes: "Broad-spectrum fungicide"
        }
      ],
      "Bacterial Leaf Blight": [
        {
          name: "Copper Oxychloride",
          schedule: "Apply when symptoms first appear",
          effectiveness: 75,
          notes: "Bactericide with contact action"
        },
        {
          name: "Streptomycin Sulfate + Tetracycline",
          schedule: "7-10 day intervals",
          effectiveness: 70,
          notes: "Antibiotic combination"
        }
      ],
      "Late Blight": [
        {
          name: "Mancozeb + Metalaxyl",
          schedule: "Apply preventively before symptoms appear",
          effectiveness: 90,
          notes: "Combination of contact and systemic fungicide"
        },
        {
          name: "Chlorothalonil",
          schedule: "7-10 day intervals",
          effectiveness: 85,
          notes: "Broad-spectrum protective fungicide"
        }
      ],
      "Early Blight": [
        {
          name: "Difenoconazole",
          schedule: "Apply at first sign of disease",
          effectiveness: 80,
          notes: "Systemic fungicide with protective and curative action"
        },
        {
          name: "Azoxystrobin + Difenoconazole",
          schedule: "10-14 day intervals",
          effectiveness: 85,
          notes: "Combination fungicide for resistance management"
        }
      ]
    };
    
    const organicOptions = {
      "Rice Blast": [
        {
          name: "Bacillus subtilis",
          schedule: "Apply weekly as preventive measure",
          effectiveness: 70,
          notes: "Biological fungicide that colonizes leaf surface"
        },
        {
          name: "Neem Oil",
          schedule: "7-10 day intervals",
          effectiveness: 65,
          notes: "Plant-based fungicide with multiple modes of action"
        }
      ],
      "Bacterial Leaf Blight": [
        {
          name: "Pseudomonas fluorescens",
          schedule: "Seed treatment + foliar spray",
          effectiveness: 60,
          notes: "Beneficial bacteria that induces systemic resistance"
        },
        {
          name: "Garlic Extract",
          schedule: "5-7 day intervals",
          effectiveness: 55,
          notes: "Natural antibacterial properties"
        }
      ],
      "Late Blight": [
        {
          name: "Copper Soap",
          schedule: "7 day intervals",
          effectiveness: 75,
          notes: "OMRI-listed copper fungicide"
        },
        {
          name: "Bacillus pumilus",
          schedule: "Apply before disease development",
          effectiveness: 65,
          notes: "Biological fungicide that activates plant defenses"
        }
      ],
      "Early Blight": [
        {
          name: "Serenade (Bacillus subtilis)",
          schedule: "Apply every 7 days",
          effectiveness: 70,
          notes: "Biological fungicide that prevents spore germination"
        },
        {
          name: "Potassium Bicarbonate",
          schedule: "7-10 day intervals",
          effectiveness: 60,
          notes: "Contact fungicide that alters pH on leaf surface"
        }
      ]
    };
    
    // Default options if specific disease not found
    const defaultChemical = [
      {
        name: "Broad-spectrum Fungicide",
        schedule: "Apply according to manufacturer's instructions",
        effectiveness: 75,
        notes: "Select appropriate product based on crop and disease"
      }
    ];
    
    const defaultOrganic = [
      {
        name: "Copper-based Fungicide",
        schedule: "Apply weekly as preventive",
        effectiveness: 60,
        notes: "Organic-approved contact fungicide"
      }
    ];
    
    // Combine chemical and organic options
    const chemical = chemicalOptions[disease] || defaultChemical;
    const organic = organicOptions[disease] || defaultOrganic;
    
    return {
      chemical: chemical,
      organic: organic,
      cultural: [
        {
          name: "Field Sanitation",
          description: "Remove and destroy infected plant debris",
          effectiveness: 70
        },
        {
          name: "Crop Rotation",
          description: "Rotate with non-host crops for 2-3 seasons",
          effectiveness: 75
        },
        {
          name: "Adjust Planting Density",
          description: "Ensure adequate spacing for air circulation",
          effectiveness: 65
        }
      ]
    };
  };
  
  // Function to adjust treatments based on current weather
  const adjustTreatmentsForWeather = (treatments, temp, humidity, precip, rainChance) => {
    const adjustedTreatments = JSON.parse(JSON.stringify(treatments)); // Deep copy
    
    // Weather-specific adjustments
    if (rainChance > 40) {
      // Reduce effectiveness if rain is likely (washoff risk)
      adjustedTreatments.chemical.forEach(treatment => {
        treatment.effectiveness = Math.max(treatment.effectiveness - 15, 40);
        treatment.notes += ". Less effective due to rain forecast (washoff risk)";
      });
      
      adjustedTreatments.organic.forEach(treatment => {
        treatment.effectiveness = Math.max(treatment.effectiveness - 20, 30);
        treatment.notes += ". Significantly reduced efficacy due to expected rainfall";
      });
      
      // Add weather-specific recommendation
      adjustedTreatments.weatherSpecific = [
        {
          name: "Application Timing",
          description: "Apply treatments at least 24 hours before expected rainfall",
          importance: "Critical"
        },
        {
          name: "Sticker/Spreader",
          description: "Add agricultural sticker or spreader to improve rain fastness",
          importance: "High"
        }
      ];
    } else if (humidity > 85) {
      // High humidity increases disease pressure
      adjustedTreatments.chemical.forEach(treatment => {
        treatment.schedule = treatment.schedule.includes("interval") ? 
          treatment.schedule.replace(/\d+/g, match => Math.max(parseInt(match) - 2, 5)) : 
          "Shorten application interval by 2-3 days";
      });
      
      adjustedTreatments.organic.forEach(treatment => {
        treatment.schedule = treatment.schedule.includes("interval") ? 
          treatment.schedule.replace(/\d+/g, match => Math.max(parseInt(match) - 3, 4)) : 
          "Apply more frequently than normal";
      });
      
      // Add weather-specific recommendation
      adjustedTreatments.weatherSpecific = [
        {
          name: "Increased Application Frequency",
          description: "Shorten intervals between applications due to high humidity",
          importance: "High"
        },
        {
          name: "Improve Air Circulation",
          description: "Consider selective pruning to improve air movement around plants",
          importance: "Medium"
        }
      ];
    } else if (temp > 30) {
      // High temperature considerations
      adjustedTreatments.chemical.forEach(treatment => {
        treatment.notes += ". Apply during cooler parts of the day to prevent plant stress";
      });
      
      adjustedTreatments.organic.forEach(treatment => {
        treatment.notes += ". Avoid application during peak heat to prevent burning";
      });
      
      // Add weather-specific recommendation
      adjustedTreatments.weatherSpecific = [
        {
          name: "Application Timing",
          description: "Apply treatments early morning or late evening when temperatures are lower",
          importance: "Medium"
        },
        {
          name: "Water Management",
          description: "Ensure adequate soil moisture to reduce plant stress",
          importance: "High"
        }
      ];
    } else {
      // Normal/favorable application conditions
      adjustedTreatments.weatherSpecific = [
        {
          name: "Standard Application",
          description: "Current weather conditions are suitable for standard application protocols",
          importance: "Normal"
        }
      ];
    }
    
    // Add extra recommendations based on precipitation
    if (precip < 0.2) {
      // Dry conditions
      adjustedTreatments.weatherSpecific.push({
        name: "Water Management",
        description: "Ensure adequate irrigation while avoiding overhead watering",
        importance: "Medium"
      });
    }
    
    return adjustedTreatments;
  };
  
  // Function to get prevention measures based on disease and weather
  const getPreventionMeasures = (disease, weatherData) => {
    const baseMeasures = [
      "Use disease-resistant varieties when available",
      "Practice crop rotation with non-host plants",
      "Maintain proper field sanitation",
      "Optimize plant nutrition to improve natural resistance",
      "Implement appropriate spacing to improve air circulation"
    ];
    
    const currentTemp = weatherData.data[0].temp;
    const currentHumidity = weatherData.data[0].rh;
    const rainForecast = weatherData.data.some(day => day.pop > 40);
    
    const weatherSpecificMeasures = [];
    
    // Add weather-specific prevention measures
    if (currentHumidity > 85) {
      weatherSpecificMeasures.push(
        "Improve drainage in fields to reduce humidity around plants",
        "Consider wider spacing between plants to increase air circulation"
      );
    }
    
    if (rainForecast) {
      weatherSpecificMeasures.push(
        "Apply protective fungicides before forecasted rain events",
        "Avoid field operations when foliage is wet to prevent disease spread"
      );
    }
    
    if ((currentTemp > 28 && disease === "Rice Blast") || disease === "Bacterial Leaf Blight"){
      weatherSpecificMeasures.push(
        "Monitor water levels carefully - maintain optimum depth",
        "Consider adjusting planting dates for future crops to avoid high-risk periods"
      );
    }
    
    return [...baseMeasures, ...weatherSpecificMeasures];
  };
  
  // Function to get weather impact forecast on disease development
  const getWeatherImpactForecast = (disease, forecastData) => {
    const impacts = forecastData.map((day, index) => {
      const isFavorable = isConditionFavorable(disease, day.temp, day.rh);
      const riskLevel = calculateRiskLevel(disease, day.temp, day.rh, day.pop);
      
      return {
        day: index === 0 ? "Today" : index === 1 ? "Tomorrow" : `Day ${index + 1}`,
        date: day.datetime,
        conditions: day.weather.description,
        temperature: day.temp,
        humidity: day.rh,
        precipitationChance: day.pop,
        diseaseRisk: riskLevel,
        isFavorable: isFavorable,
        recommendation: getRecommendationForCondition(disease, day.temp, day.rh, day.pop, riskLevel)
      };
    });
    
    return impacts;
  };
  
  // Helper function to get daily recommendations based on conditions
  const getRecommendationForCondition = (disease, temp, humidity, rainChance, riskLevel) => {
    if (riskLevel === "Very High") {
      return "Apply protectant fungicide immediately if not done in past 7 days";
    } else if (riskLevel === "High") {
      return rainChance > 40 ? 
        "Apply treatments at least 24 hours before rainfall" : 
        "Apply protective treatments and increase monitoring frequency";
    } else if (riskLevel === "Moderate") {
      return "Monitor closely and be prepared to treat if symptoms appear";
    } else {
      return "Continue regular monitoring";
    }
  };
  
  // Function to calculate risk trend over forecast period
  const calculateRiskTrend = (disease, forecastData) => {
    const riskScores = forecastData.map(day => {
      const riskLevel = calculateRiskLevel(disease, day.temp, day.rh, day.pop);
      // Convert risk level to numeric score
      switch (riskLevel) {
        case "Very High": return 4;
        case "High": return 3;
        case "Moderate": return 2;
        case "Low": return 1;
        default: return 0;
      }
    });
    
    // Calculate if risk is increasing, decreasing or stable
    if (riskScores[0] < riskScores[1] || riskScores[0] < riskScores[2]) {
      return "Increasing";
    } else if (riskScores[0] > riskScores[1] && riskScores[0] > riskScores[2]) {
      return "Decreasing";
    } else {
      return "Stable";
    }
  };

  // Function to get appropriate weather icon
  const getWeatherIcon = (condition) => {
    if (!condition) return <CloudIcon fontSize="large" />;

    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
      return <SunIcon fontSize="large" />;
    } else if (conditionLower.includes("cloud")) {
      return <CloudIcon fontSize="large" />;
    } else if (conditionLower.includes("rain") || conditionLower.includes("shower")) {
      return <WaterIcon fontSize="large" />;
    } else {
      return <CloudIcon fontSize="large" />;
    }
  };

  // Get risk level color
  const getRiskLevelColor = (riskLevel) => {
    switch(riskLevel) {
      case "Very High": return theme.palette.error.light;
      case "High": return theme.palette.error.main;
      case "Moderate": return theme.palette.warning.main;
      case "Low": return theme.palette.success.main;
      default: return theme.palette.success.light;
    }
  };

  // Render the UI
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 3, mb: 4, background: 'linear-gradient(to right, #e8f5e9, #f1f8e9)' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: theme.palette.primary.dark
          }}>
            <FarmIcon sx={{ mr: 1, fontSize: 36 }} /> Crop Disease Management System
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Get personalized disease management recommendations based on crop, disease, and local weather conditions.
          </Typography>
        </Paper>
        
        <Grid container spacing={3}>
          {/* Crop and Disease Selection */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" component="h2" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: theme.palette.primary.main,
                borderBottom: `2px solid ${theme.palette.primary.light}`,
                pb: 1
              }}>
                <CropIcon sx={{ mr: 1 }} /> Crop & Disease Information
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2, mt: 3 }}>
                <InputLabel id="crop-select-label">Select Crop</InputLabel>
                <Select
                  labelId="crop-select-label"
                  id="crop-select"
                  value={cropType}
                  label="Select Crop"
                  onChange={(e) => {
                    setCropType(e.target.value);
                    setDiseaseType("");
                  }}
                >
                  <MenuItem value="">Select...</MenuItem>
                  <MenuItem value="Rice">Rice</MenuItem>
                  <MenuItem value="Wheat">Wheat</MenuItem>
                  <MenuItem value="Corn">Corn</MenuItem>
                  <MenuItem value="Tomato">Tomato</MenuItem>
                  <MenuItem value="Potato">Potato</MenuItem>
                  <MenuItem value="Cotton">Cotton</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 2 }} disabled={!cropType}>
                <InputLabel id="disease-select-label">Select Disease</InputLabel>
                <Select
                  labelId="disease-select-label"
                  id="disease-select"
                  value={diseaseType}
                  label="Select Disease"
                  onChange={(e) => setDiseaseType(e.target.value)}
                >
                  <MenuItem value="">Select...</MenuItem>
                  {getDiseaseOptions().map((disease) => (
                    <MenuItem key={disease} value={disease}>{disease}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="severity-select-label">Disease Severity</InputLabel>
                <Select
                  labelId="severity-select-label"
                  id="severity-select"
                  value={severity}
                  label="Disease Severity"
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="severe">Severe</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          
          {/* Weather Data */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" component="h2" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: theme.palette.primary.main,
                borderBottom: `2px solid ${theme.palette.primary.light}`,
                pb: 1
              }}>
                <CloudIcon sx={{ mr: 1 }} /> Weather Information
              </Typography>
              
              <ToggleButtonGroup
                value={searchType}
                exclusive
                onChange={(e, newValue) => {
                  if (newValue !== null) {
                    setSearchType(newValue);
                    setLatitude("");
                    setLongitude("");
                    setCityName("");
                  }
                }}
                sx={{ mb: 2, width: '100%', mt: 3 }}
              >
                <ToggleButton value="coordinates" sx={{ width: '50%' }}>
                  <LocationIcon sx={{ mr: 1 }} /> Coordinates
                </ToggleButton>
                <ToggleButton value="city" sx={{ width: '50%' }}>
                  <LocationIcon sx={{ mr: 1 }} /> City Name
                </ToggleButton>
              </ToggleButtonGroup>
              
              {searchType === "coordinates" ? (
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Latitude"
                        type="number"
                        fullWidth
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        disabled={useCurrentLocation}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Longitude"
                        type="number"
                        fullWidth
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        disabled={useCurrentLocation}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    variant="outlined"
                    startIcon={<LocationIcon />}
                    onClick={getCurrentLocation}
                    sx={{ mt: 2 }}
                  >
                    Use Current Location
                  </Button>
                </Box>
              ) : (
                <TextField
                  label="City Name"
                  fullWidth
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  sx={{ mb: 2 }}
                />
              )}
              
              <Button
                variant="contained"
                color="primary"
                onClick={() => searchType === "city" ? fetchWeatherData(null, null, cityName) : fetchWeatherData()}
                disabled={loading}
                fullWidth
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "Get Weather Data"}
              </Button>
            </Paper>
          </Grid>
          
          {/* Error Messages */}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error" onClose={() => setError("")} sx={{ mt: 2 }}>{error}</Alert>
            </Grid>
          )}
          
          {/* Weather Display */}
          {weatherData && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ 
                  color: theme.palette.primary.main,
                  borderBottom: `2px solid ${theme.palette.primary.light}`,
                  pb: 1
                }}>
                  Weather for {weatherData.city_name}, {weatherData.country_code}
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  {weatherData.data.slice(0, 3).map((day, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Card sx={{ 
                        height: '100%',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                        }
                      }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                            {index === 0 ? "Today" : index === 1 ? "Tomorrow" : `Day ${index + 1}`}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
                            {getWeatherIcon(day.weather.description)}
                          </Box>
                          <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
                            {day.weather.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <TempIcon fontSize="small" sx={{ mr: 1, color: theme.palette.secondary.main }} />
                            <Typography variant="body2">
                              Temp: {day.temp}°C (Min: {day.min_temp}°C, Max: {day.max_temp}°C)
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <HumidityIcon fontSize="small" sx={{ mr: 1, color: theme.palette.secondary.main }} />
                            <Typography variant="body2">
                              Humidity: {day.rh}%
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WaterIcon fontSize="small" sx={{ mr: 1, color: theme.palette.secondary.main }} />
                            <Typography variant="body2">
                              Precipitation: {day.precip}mm (Chance: {day.pop}%)
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          )}
          
          {/* Generate Recommendations Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={generateRecommendations}
              disabled={loading || !cropType || !diseaseType || !weatherData}
              sx={{ mt: 3, py: 1.5 }}
              fullWidth
              startIcon={<ScienceIcon />}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Management Recommendations"}
            </Button>
          </Grid>
          
          {/* Results Display */}
          {managementData && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: theme.palette.primary.dark,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1,
                  mb: 3
                }}>
                  <PlantIcon sx={{ mr: 1 }} /> Disease Management Recommendations
                </Typography>
                
                {/* Crop and Disease Info */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ mb: 3, height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          color: theme.palette.primary.main
                        }}>
                          <CropIcon sx={{ mr: 1 }} /> Crop Information
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          <strong>Name:</strong> {managementData.crop.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          <strong>Scientific Name:</strong> <em>{managementData.crop.scientificName}</em>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card sx={{ mb: 3, height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          color: theme.palette.primary.main
                        }}>
                          <DiseaseIcon sx={{ mr: 1 }} /> Disease Information
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          <strong>Name:</strong> {managementData.disease.name}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>Scientific Name:</strong> <em>{managementData.disease.scientificName}</em>
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {managementData.disease.description}
                        </Typography>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                          Favorable Conditions:
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>Temperature:</strong> {managementData.disease.favorableConditions.temperature}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Humidity:</strong> {managementData.disease.favorableConditions.humidity}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Rainfall:</strong> {managementData.disease.favorableConditions.rainfall}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                {/* Risk Assessment */}
                <Card sx={{ 
                  mb: 3, 
                  bgcolor: getRiskLevelColor(managementData.weatherConditions.riskLevel),
                  color: managementData.weatherConditions.riskLevel === "Very High" || 
                         managementData.weatherConditions.riskLevel === "High" ? '#fff' : 'inherit'
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Current Risk Assessment
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          <strong>Risk Level:</strong> {managementData.weatherConditions.riskLevel}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          <strong>Current Weather:</strong> {managementData.weatherConditions.isFavorable ? 
                            "Favorable for disease development" : 
                            "Not optimal for disease development"}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          <strong>Risk Trend:</strong> {managementData.forecast.riskTrend}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          <strong>Temperature:</strong> {managementData.weatherConditions.current.temp}°C
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          <strong>Humidity:</strong> {managementData.weatherConditions.current.rh}%
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          <strong>Precipitation Chance:</strong> {managementData.weatherConditions.current.pop}%
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                
                {/* Treatment Recommendations */}
                <Typography variant="h6" gutterBottom sx={{ 
                  mt: 4, 
                  mb: 3,
                  display: 'flex', 
                  alignItems: 'center',
                  color: theme.palette.primary.dark,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1
                }}>
                  <TreatmentIcon sx={{ mr: 1 }} /> Treatment Recommendations
                </Typography>
                
                <Grid container spacing={3}>
                  {/* Chemical Treatments */}
                  <Grid item xs={12} md={6}>
                    <Card sx={{ mb: 3, height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom sx={{ 
                          fontWeight: 'bold',
                          color: theme.palette.primary.main,
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <ScienceIcon sx={{ mr: 1, fontSize: 20 }} /> Chemical Control Options
                        </Typography>
                        
                        {managementData.recommendations.chemical.map((treatment, index) => (
                          <Box key={index} sx={{ 
                            mb: 2, 
                            p: 2, 
                            borderRadius: 1,
                            border: '1px solid #e0e0e0',
                            mt: 2
                          }}>
                            <Typography variant="body1" fontWeight="bold" color={theme.palette.primary.main}>
                              {treatment.name}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              <strong>Application:</strong> {treatment.schedule}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              <strong>Effectiveness:</strong> {treatment.effectiveness}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              <strong>Notes:</strong> {treatment.notes}
                            </Typography>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Organic Treatments */}
                  <Grid item xs={12} md={6}>
                    <Card sx={{ mb: 3, height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom sx={{ 
                          fontWeight: 'bold',
                          color: theme.palette.success.dark,
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <PlantIcon sx={{ mr: 1, fontSize: 20 }} /> Organic Control Options
                        </Typography>
                        
                        {managementData.recommendations.organic.map((treatment, index) => (
                          <Box key={index} sx={{ 
                            mb: 2, 
                            p: 2, 
                            borderRadius: 1,
                            border: '1px solidrgb(130, 114, 114)',
                            mt: 2
                          }}>
                            <Typography variant="body1" fontWeight="bold" color={theme.palette.success.dark}>
                              {treatment.name}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              <strong>Application:</strong> {treatment.schedule}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              <strong>Effectiveness:</strong> {treatment.effectiveness}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              <strong>Notes:</strong> {treatment.notes}
                            </Typography>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Cultural Practices */}
                  <Grid item xs={12}>
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom sx={{ 
                          fontWeight: 'bold',
                          color: theme.palette.secondary.main,
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2
                        }}>
                          <FarmIcon sx={{ mr: 1, fontSize: 20 }} /> Cultural Practices
                        </Typography>
                        
                        <Grid container spacing={2}>
                          {managementData.recommendations.cultural.map((practice, index) => (
                            <Grid item xs={12} md={4} key={index}>
                              <Box sx={{ 
                                p: 2, 
                                border: '1px solid #e0e0e0', 
                                borderRadius: 1,
                                height: '100%',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                  transform: 'translateY(-3px)',
                                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                }
                              }}>
                                <Typography variant="body1" fontWeight="bold" color={theme.palette.secondary.main}>
                                  {practice.name}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  {practice.description}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  <strong>Effectiveness:</strong> {practice.effectiveness}%
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Weather-Specific Recommendations */}
                  {managementData.recommendations.weatherSpecific && (
                    <Grid item xs={12}>
                      <Card sx={{ mb: 3, bgcolor: '#f3e5f5' }}>
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            fontWeight: 'bold',
                            color: theme.palette.primary.dark,
                            mb: 2
                          }}>
                            <CloudIcon sx={{ mr: 1 }} /> Weather-Specific Recommendations
                          </Typography>
                          
                          <Grid container spacing={2}>
                            {managementData.recommendations.weatherSpecific.map((rec, index) => (
                              <Grid item xs={12} md={6} key={index}>
                                <Box sx={{ 
                                  p: 2, 
                                  border: '1px solid #e1bee7', 
                                  borderRadius: 1, 
                                  bgcolor: '#fff',
                                  height: '100%'
                                }}>
                                  <Typography variant="body1" fontWeight="bold" color={theme.palette.primary.dark}>
                                    {rec.name}
                                  </Typography>
                                  <Typography variant="body2" sx={{ mt: 1 }}>
                                    {rec.description}
                                  </Typography>
                                  <Typography variant="body2" sx={{ mt: 1 }} color={
                                    rec.importance === "Critical" ? theme.palette.error.main : 
                                    rec.importance === "High" ? theme.palette.warning.main : 
                                    rec.importance === "Medium" ? theme.palette.info.main : theme.palette.success.main
                                  }>
                                    <strong>Importance:</strong> {rec.importance}
                                  </Typography>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Grid>
                
                {/* Prevention Measures */}
                <Typography variant="h6" gutterBottom sx={{ 
                  mt: 4, 
                  mb: 3,
                  display: 'flex', 
                  alignItems: 'center',
                  color: theme.palette.primary.dark,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1
                }}>
                  <ScienceIcon sx={{ mr: 1 }} /> Prevention Measures
                </Typography>
                
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      {managementData.preventionMeasures.map((measure, index) => (
                        <Grid item xs={12} md={6} key={index}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            p: 1,
                            borderRadius: 1,
                            '&:hover': {
                              bgcolor: '#f5f5f5'
                            }
                          }}>
                            <InfoIcon fontSize="small" sx={{ mr: 1, mt: 0.5, color: theme.palette.primary.main }} />
                            <Typography variant="body2">{measure}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
                
                {/* Weather Forecast Impact */}
                <Typography variant="h6" gutterBottom sx={{ 
                  mt: 4, 
                  mb: 3,
                  display: 'flex', 
                  alignItems: 'center',
                  color: theme.palette.primary.dark,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1
                }}>
                  <CloudIcon sx={{ mr: 1 }} /> Weather Forecast Impact
                </Typography>
                
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      {managementData.forecast.impactOnDisease.slice(0, 3).map((day, index) => (
                        <Grid item xs={12} md={4} key={index}>
                          <Card sx={{ 
                            bgcolor: getRiskLevelColor(day.diseaseRisk),
                            color: day.diseaseRisk === "Very High" || day.diseaseRisk === "High" ? '#fff' : 'inherit',
                            height: '100%'
                          }}>
                            <CardContent>
                              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {day.day} ({day.date})
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                <strong>Conditions:</strong> {day.conditions}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                <strong>Temperature:</strong> {day.temperature}°C
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                <strong>Humidity:</strong> {day.humidity}%
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                <strong>Rain Chance:</strong> {day.precipitationChance}%
                              </Typography>
                              <Divider sx={{ my: 1, bgcolor: day.diseaseRisk === "Very High" || day.diseaseRisk === "High" ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }} />
                              <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                                Disease Risk: {day.diseaseRisk}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {day.recommendation}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default CropDiseaseManagement;
