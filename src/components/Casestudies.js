import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  Tabs, 
  Tab, 
  Button, 
  Dialog, 
  DialogContent, 
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
  Paper,
  Avatar,
  LinearProgress
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  Agriculture, 
  Close, 
  Warning, 
  CheckCircle,
  LocalFlorist,
  Spa,
  Grass,
  NavigateNext,
  BugReport
} from '@mui/icons-material';

// Custom theme with agricultural colors
const cropDiseaseTheme = createTheme({
  palette: {
    primary: {
      main: '#1b5e20', // Deep forest green
      light: '#4c8c4a',
      dark: '#003300',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f9a825', // Warm gold/amber like ripe crops
      light: '#ffd95a',
      dark: '#c17900',
      contrastText: '#000000',
    },
    error: {
      main: '#d32f2f', // Red for severe disease
      light: '#ff6659',
      dark: '#9a0007',
    },
    warning: {
      main: '#ff9800', // Orange for moderate disease
      light: '#ffc947',
      dark: '#c66900',
    },
    info: {
      main: '#1976d2', // Blue for water/irrigation
      light: '#63a4ff',
      dark: '#004ba0',
    },
    success: {
      main: '#388e3c', // Healthy plant green
      light: '#6abf69',
      dark: '#00600f',
    },
    background: {
      default: '#f1f8e9', // Very light green tint
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
          borderRadius: 12,
          overflow: 'hidden',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

// Mock data for each disease class
const diseaseCaseStudies = {
  "Corn___Common_Rust": {
    title: "Corn Common Rust",
    shortDescription: "A fungal disease caused by Puccinia sorghi affecting corn plants worldwide.",
    fullDescription: "Common rust is caused by the fungus Puccinia sorghi and is found in corn growing regions throughout the world. The disease is favored by cool temperatures (60-74°F) and high humidity. Symptoms appear as small, circular to elongate, cinnamon-brown pustules on both leaf surfaces. These pustules break through the leaf epidermis and release powdery, brick-red spores. Severe infections can cause leaf death and significantly reduce yield. Early detection and fungicide application can help mitigate crop losses. Resistant corn varieties are available and represent the most economical method of control.",
    impact: "Can reduce yields by 10-20% in severe cases",
    managementOptions: ["Resistant varieties", "Fungicide applications", "Early planting"],
    image: "assets/corn_common_rust.jpeg",
    category: "Corn",
    severity: "Moderate",
    severityLevel: 65,
    color: "#e3a008"
  },
  "Corn___Gray_Leaf_Spot": {
    title: "Corn Gray Leaf Spot",
    shortDescription: "A fungal disease caused by Cercospora zeae-maydis affecting corn production.",
    fullDescription: "Gray leaf spot is caused by the fungus Cercospora zeae-maydis and is one of the most yield-limiting diseases of corn worldwide. The disease thrives in warm, humid conditions with extended periods of leaf wetness. Symptoms begin as small, rectangular lesions with a yellowish halo that eventually expand into distinct rectangular spots with a gray to tan color. Lesions run parallel to leaf veins and may coalesce, causing extensive leaf blighting. The disease reduces photosynthetic area and can lead to significant yield losses, particularly in no-till farming systems where residue harbors the pathogen. Crop rotation and resistant hybrids are key management strategies.",
    impact: "Yield losses of 20-60% in severely affected fields",
    managementOptions: ["Resistant hybrids", "Crop rotation", "Residue management", "Fungicides"],
    image: "assets/corn_green.jpeg",
    category: "Corn",
    severity: "High",
    severityLevel: 85,
    color: "#c81e1e"
  },
  "Corn___Healthy": {
    title: "Healthy Corn",
    shortDescription: "Characteristics and maintenance of healthy corn plants.",
    fullDescription: "Healthy corn plants exhibit deep green foliage, sturdy stalks, and uniform growth. Proper corn development includes V stages (vegetative) and R stages (reproductive). Optimal growth requires adequate nutrition, particularly nitrogen, phosphorus, and potassium. Corn thrives in well-drained soils with a pH between 5.8 and 6.8. Water requirements are highest during tasseling and silking stages. Healthy plants have straight rows of kernels filling the entire ear. Proper spacing between plants optimizes yield potential. Regular scouting helps identify potential issues before they impact plant health. Maintaining soil health through cover crops and crop rotation contributes to sustainable corn production and reduces disease pressure in subsequent seasons.",
    impact: "Optimal yield potential with proper management",
    managementOptions: ["Balanced nutrition", "Adequate irrigation", "Proper plant spacing", "Regular scouting"],
    image: "assets/healthy_corn.jpeg",
    category: "Corn",
    severity: "None",
    severityLevel: 0,
    color: "#388e3c"
  },
  "Corn___Northern_Leaf_Blight": {
    title: "Corn Northern Leaf Blight",
    shortDescription: "A fungal disease caused by Exserohilum turcicum affecting corn plants.",
    fullDescription: "Northern corn leaf blight (NCLB) is caused by the fungus Exserohilum turcicum and is a significant foliar disease in humid corn-growing regions. The disease is characterized by large, cigar-shaped lesions that are grayish-green to tan in color and can range from 1 to 7 inches long. Lesions typically begin on lower leaves and progress upward. Under favorable conditions (moderate temperatures and extended periods of leaf wetness), lesions can cover entire leaves, significantly reducing photosynthetic area. The fungus overwinters in corn debris, making the disease more severe in continuous corn and conservation tillage systems. Multiple races of the pathogen exist, complicating breeding for resistance. Yield losses are most significant when infection occurs before or during tasseling and silking stages.",
    impact: "Yield reductions of 30-50% in susceptible hybrids with early infection",
    managementOptions: ["Resistant hybrids", "Crop rotation", "Tillage", "Fungicide application"],
    image: "assets/northencorn.jpeg",
    category: "Corn",
    severity: "High",
    severityLevel: 90,
    color: "#b91c1c"
  },
  "Potato___Early_Blight": {
    title: "Potato Early Blight",
    shortDescription: "A fungal disease caused by Alternaria solani affecting potato plants.",
    fullDescription: "Early blight of potato is caused by the fungus Alternaria solani and occurs worldwide wherever potatoes are grown. The disease first appears as small, dark, irregular spots on lower leaves that enlarge to form concentric rings, creating a target-like pattern. Lesions may coalesce, causing extensive defoliation. The disease progresses from lower to upper leaves as the season advances. Early blight is favored by warm temperatures (75-85°F), high humidity, and alternating wet and dry periods. The fungus overwinters on infected plant debris and can survive for several years in soil. Disease development is often accelerated on plants stressed by inadequate nutrition, drought, or insect damage. Early blight can also affect tubers, causing dark, sunken lesions with defined margins and underlying dry, corky tissue.",
    impact: "Yield losses of 20-30% and reduced tuber quality",
    managementOptions: ["Fungicide applications", "Crop rotation", "Proper plant spacing", "Adequate nutrition"],
    image: "assets/potato_early_blight.jpeg",
    category: "Potato",
    severity: "Moderate to High",
    severityLevel: 75,
    color: "#d97706"
  },
  "Potato___Healthy": {
    title: "Healthy Potato",
    shortDescription: "Characteristics and maintenance of healthy potato plants.",
    fullDescription: "Healthy potato plants display robust, deep green foliage with a full canopy. Properly developed plants have strong stems and well-distributed leaves maximizing photosynthetic capacity. Potato plants grow best in loose, well-drained soil with pH 5.8-6.5. Optimal nutrition includes adequate phosphorus for tuber development and balanced nitrogen to avoid excessive vine growth at the expense of tuber formation. Consistent soil moisture is essential during tuber initiation and bulking phases. Healthy potato production requires proper seed preparation, timely planting, and hilling to protect tubers from greening. Regular monitoring for pests and diseases allows for early intervention. Crop rotation of 3-4 years helps prevent soil-borne disease buildup. Well-maintained plants produce higher yields of quality tubers with proper skin set and appropriate size distribution.",
    impact: "Maximized yield and quality with proper management",
    managementOptions: ["Quality seed potatoes", "Proper hilling", "Consistent irrigation", "Balanced fertility"],
    image: "assets/healthypotato.jpeg",
    category: "Potato",
    severity: "None",
    severityLevel: 0,
    color: "#388e3c"
  },
  "Potato___Late_Blight": {
    title: "Potato Late Blight",
    shortDescription: "A devastating oomycete disease caused by Phytophthora infestans affecting potato plants.",
    fullDescription: "Late blight, caused by the oomycete Phytophthora infestans, is historically one of the most destructive plant diseases, responsible for the Irish Potato Famine in the 1840s. The pathogen can infect all above-ground parts of the potato plant and tubers. Symptoms begin as pale green, water-soaked spots that rapidly enlarge to become brown-black, greasy lesions. Under humid conditions, a white, fuzzy growth (sporangia) appears on leaf undersides, particularly around lesion margins. The disease can destroy entire fields within days under favorable conditions (cool, wet weather with temperatures between 50-75°F). The pathogen produces spores that can travel miles on wind currents, allowing for rapid spread. Tuber infection causes a reddish-brown, granular rot that can lead to significant storage losses and serves as inoculum for subsequent seasons.",
    impact: "Complete crop loss within weeks without intervention",
    managementOptions: ["Fungicide applications", "Resistant varieties", "Proper field sanitation", "Weather monitoring"],
    image: "assets/potato_late_blight.jpeg",
    category: "Potato",
    severity: "Extremely High",
    severityLevel: 98,
    color: "#7f1d1d"
  },
  "Rice___Brown_Spot": {
    title: "Rice Brown Spot",
    shortDescription: "A fungal disease caused by Cochliobolus miyabeanus affecting rice plants.",
    fullDescription: "Brown spot, caused by the fungus Cochliobolus miyabeanus (anamorph: Bipolaris oryzae), is an important rice disease in most rice-growing regions. The disease is associated with nutrient-deficient soils, particularly potassium deficiency. Symptoms appear as small, circular to oval, dark brown lesions that can develop on leaves, leaf sheaths, panicles, glumes, and grains. Leaf lesions are initially small, circular, and dark brown, later expanding to become oval with a light brown to gray center surrounded by a reddish-brown margin. Severe infections cause premature leaf senescence and unfilled or chalky grains. The disease gained historical significance during the Great Bengal Famine of 1943, where it contributed to massive crop failures. The fungus survives in infected seeds and crop residue, with warm temperatures (24-30°C) and high humidity favoring disease development.",
    impact: "Yield losses of 10-45% and reduced grain quality",
    managementOptions: ["Balanced nutrition", "Disease-free seeds", "Fungicide treatment", "Resistant varieties"],
    image: "assets/rice_brown_spot.jpeg",
    category: "Rice",
    severity: "Moderate to High",
    severityLevel: 70,
    color: "#d97706"
  },
  "Rice___Healthy": {
    title: "Healthy Rice",
    shortDescription: "Characteristics and maintenance of healthy rice plants.",
    fullDescription: "Healthy rice plants exhibit vibrant green leaves, vigorous tillering, and uniform growth. Optimal plant development includes vegetative, reproductive, and ripening phases with specific management requirements at each stage. Rice thrives in flooded conditions for most varieties, with consistent water management being critical for yield potential. Proper spacing optimizes resource utilization and reduces disease pressure. Healthy rice requires balanced nutrition with particular attention to nitrogen timing and split applications. Careful water management during critical growth stages enhances grain filling and quality. Regular monitoring allows for early pest and disease detection. Well-maintained rice fields develop strong panicles with high grain count and proper filling. Harmonizing cultural practices with local environmental conditions is essential for sustainable production and maximizing yield potential without compromising grain quality.",
    impact: "Optimal yield and quality under proper management",
    managementOptions: ["Water management", "Balanced fertilization", "Proper spacing", "Integrated pest management"],
    image: "assets/healthy_rice.jpeg",
    category: "Rice",
    severity: "None",
    severityLevel: 0,
    color: "#388e3c"
  },
  "Rice___Leaf_Blast": {
    title: "Rice Leaf Blast",
    shortDescription: "A devastating fungal disease caused by Magnaporthe oryzae affecting rice foliage.",
    fullDescription: "Rice blast, caused by the fungus Magnaporthe oryzae (anamorph: Pyricularia oryzae), is one of the most destructive rice diseases worldwide. Leaf blast symptoms begin as small, water-soaked, bluish-green specks that enlarge to form diamond-shaped or spindle-shaped lesions with pointed ends. Mature lesions have grayish-white centers with brown to reddish-brown borders. Under favorable conditions, lesions can coalesce, killing entire leaves. The disease is favored by moderate temperatures (24-28°C), high humidity, extended leaf wetness periods, and excessive nitrogen fertilization. The pathogen produces abundant spores on lesions that are dispersed by wind and rain, allowing for multiple infection cycles during a growing season. The fungus can infect all above-ground parts of the rice plant at various growth stages, with different symptoms manifesting on leaves, nodes, panicles, and grains.",
    impact: "Yield losses of 10-100% depending on timing and severity",
    managementOptions: ["Resistant varieties", "Balanced nitrogen application", "Fungicide treatment", "Water management"],
    image: "assets/rice_blast.jpg",
    category: "Rice",
    severity: "High",
    severityLevel: 85,
    color: "#b91c1c"
  },
  "Rice___Neck_Blast": {
    title: "Rice Neck Blast",
    shortDescription: "A severe form of rice blast disease caused by Magnaporthe oryzae affecting the panicle neck.",
    fullDescription: `Neck blast is the most destructive form of rice blast disease, caused by the same fungus (Magnaporthe oryzae) that causes leaf blast. The infection occurs at the panicle neck node just below the seed head, resulting in a brownish-black lesion that often girdles the neck. This causes the panicle to break at the infected point or prevents grain filling above the lesion, leading to empty or partially filled grains and "whiteheads" visible in the field. Neck blast typically occurs later in the growing season than leaf blast, often during or after heading. The disease is most severe when cool, rainy weather coincides with heading and flowering stages. Yield losses from neck blast are significantly higher than from leaf blast alone, as the disease directly impacts grain production. The pathogen survives on crop residue and can be seed-borne. Management requires an integrated approach focusing on critical protection during the vulnerable heading stage.`,
    impact: "Yield losses of 30-80% when infection occurs at heading",
    managementOptions: ["Resistant varieties", "Protective fungicides at heading", "Balanced nutrition", "Proper timing of planting"],
    image: "assets/rice_neck.jpeg",
    category: "Rice",
    severity: "Extremely High",
    severityLevel: 95,
    color: "#7f1d1d"
  },
  "Wheat___Brown_Rust": {
    title: "Wheat Brown Rust",
    shortDescription: "A fungal disease caused by Puccinia triticina affecting wheat production worldwide.",
    fullDescription: "Brown rust, also known as leaf rust, is caused by the fungus Puccinia triticina and is one of the most widely distributed wheat diseases globally. The disease is characterized by circular to oval, orange-brown pustules primarily on the upper surface of leaves. These pustules contain thousands of urediniospores that give the lesions their rusty appearance. The spores are wind-dispersed and can travel hundreds of miles, allowing for rapid spread. The disease is favored by temperatures between 15-25°C and high humidity or free moisture. Brown rust reduces photosynthetic area and increases water loss through damaged leaf tissue, leading to lower grain fill and reduced yields. The pathogen is highly variable, with over 100 physiological races identified worldwide, making breeding for durable resistance challenging. The fungus can overwinter on volunteer wheat in mild climates or alternate hosts like meadow rue (Thalictrum spp.).",
    impact: "Yield losses of 5-30% depending on infection timing and severity",
    managementOptions: ["Resistant varieties", "Fungicide applications", "Early planting", "Elimination of volunteer wheat"],
    image: "assets/wheat_brown_rust.jpeg",
    category: "Wheat",
    severity: "Moderate to High",
    severityLevel: 70,
    color: "#d97706"
  },
  "Wheat___Healthy": {
    title: "Healthy Wheat",
    shortDescription: "Characteristics and maintenance of healthy wheat plants.",
    fullDescription: "Healthy wheat plants display uniform emergence and development, with deep green leaves and strong tillers. Wheat development follows distinct growth stages from germination through tillering, stem elongation, heading, flowering, and grain fill. Optimal management practices vary by growth stage, with timing of inputs critical for maximizing yield potential. Wheat thrives in well-drained soils with pH 6.0-7.0 and requires adequate nitrogen, phosphorus, and potassium along with micronutrients. Strategic nitrogen application timing supports critical growth phases while minimizing lodging risk. Regular scouting enables timely pest and disease management. Healthy wheat stands develop synchronized flowering, effective grain fill, and uniform maturity. Well-maintained wheat fields produce plump kernels with high test weight and appropriate protein content for intended end use. Sustainable production practices include crop rotation, residue management, and precise input application to maintain soil health while optimizing yield and quality parameters.",
    impact: "Maximum yield and quality under proper management",
    managementOptions: ["Proper variety selection", "Balanced nutrition", "Timely pest management", "Optimal planting date"],
    image: "assets/healthywheat.jpeg",
    category: "Wheat",
    severity: "None",
    severityLevel: 0,
    color: "#388e3c"
  },
  "Wheat___Yellow_Rust": {
    title: "Wheat Yellow Rust",
    shortDescription: "A destructive fungal disease caused by Puccinia striiformis affecting wheat production.",
    fullDescription: "Yellow rust, also known as stripe rust, is caused by the fungus Puccinia striiformis f. sp. tritici and is a major threat to wheat production in cool, humid environments. The disease appears as yellow-orange, pustule-filled stripes that run parallel to leaf veins, distinguishing it from other rust diseases. These pustules contain urediniospores that give the lesions their yellow appearance. The disease is favored by cool temperatures (10-15°C) with high humidity or dew. Unlike other wheat rusts, yellow rust can develop at lower temperatures, making it problematic in early spring. Severe infections can spread to glumes and awns. The pathogen is highly variable with numerous races and can rapidly overcome genetic resistance in wheat varieties. Recent aggressive strains have adapted to warmer temperatures, expanding their geographic range. The fungus primarily overwinters on living wheat plants and can be transported long distances by wind currents.",
    impact: "Yield losses of 10-70% in susceptible varieties",
    managementOptions: ["Resistant varieties", "Fungicide applications", "Early disease monitoring", "Diversification of wheat varieties"],
    image: "assets/wheatyellow.jpeg",
    category: "Wheat",
    severity: "High",
    severityLevel: 80,
    color: "#b91c1c"
  },
  "Sugarcane__Red_Rot": {
    title: "Sugarcane Red Rot",
    shortDescription: "A destructive fungal disease caused by Colletotrichum falcatum affecting sugarcane production.",
    fullDescription: "Red rot, caused by the fungus Colletotrichum falcatum, is one of the most serious diseases of sugarcane worldwide. The disease mainly affects the stalk, where the fungus enters through nodes, growth cracks, or injuries. The most characteristic symptom is the reddening of internal stalk tissue with white patches (giving a candy-striped appearance when cut longitudinally). As the disease progresses, the pith becomes disintegrated and emits an alcoholic odor. External symptoms include leaf midrib reddening, wilting, and drying of leaves. The disease causes significant reduction in cane weight, juice quality, and sugar recovery. Infection spreads primarily through infected seed cane, with the pathogen surviving in plant debris and soil. The disease is favored by temperatures between 25-30°C and high humidity. Multiple races of the pathogen exist, complicating breeding for durable resistance. Management focuses on clean seed programs and resistant varieties.",
    impact: "Yield losses of 15-100% and significant reduction in sugar content",
    managementOptions: ["Disease-free seed cane", "Resistant varieties", "Hot water treatment of setts", "Field sanitation"],
    image: "assets/sugarcane_redhot.jpeg",
    category: "Sugarcane",
    severity: "High",
    severityLevel: 85,
    color: "#b91c1c"
  },
  "Sugarcane__Healthy": {
    title: "Healthy Sugarcane",
    shortDescription: "Characteristics and maintenance of healthy sugarcane plants.",
    fullDescription: "Healthy sugarcane exhibits vigorous stalks with uniform internodes, vibrant green leaves, and extensive root systems. Optimal growth requires well-drained soils with pH 6.0-7.5 and adequate organic matter. Sugarcane development includes germination, tillering, grand growth, and maturation phases, each with specific management requirements. Proper row spacing and orientation maximizes light interception while facilitating harvesting operations. Balanced nutrition with appropriate timing supports critical growth stages, with nitrogen requirements varying by growth phase. Effective water management is essential, particularly during the grand growth phase when rapid stalk elongation occurs. Regular scouting enables early pest and disease detection. Well-maintained sugarcane fields develop thick, juicy stalks with high sugar concentration. Sustainable production incorporates crop rotation, green manuring, and precision nutrient management. Healthy ratoon management extends productive field life and maintains yield potential across multiple harvests.",
    impact: "Optimal yield and sugar content under proper management",
    managementOptions: ["Quality seed material", "Balanced fertilization", "Irrigation management", "Integrated pest management"],
    image: "assets/healthy_sugarcane.jpeg",
    category: "Sugarcane",
    severity: "None",
    severityLevel: 0,
    color: "#388e3c"
  },
  "Sugarcane__Bacterial Blight": {
    title: "Sugarcane Bacterial Blight",
    shortDescription: "A bacterial disease caused by Xanthomonas albilineans affecting sugarcane production.",
    fullDescription: "Bacterial leaf blight, also known as leaf scald, is caused by Xanthomonas albilineans and affects sugarcane worldwide. The disease manifests in three phases: latent, chronic, and acute. In the latent phase, plants show no visible symptoms but harbor the pathogen. The chronic phase is characterized by white, narrow, sharply defined leaf stripes that follow the leaf veins, often with red borders. These stripes may extend the entire leaf length and can broaden and coalesce, causing leaf necrosis. In the acute phase, sudden wilting and death of entire stools occur, often following stress conditions. The bacterium is primarily spread through infected seed cane and cutting tools, and can survive in plant debris. It invades the xylem vessels, causing blockage and systemic infection. The disease reduces stalk diameter, height, juice quality, and sugar content. Management relies heavily on clean seed programs, as chemical control is largely ineffective against the systemic bacterial infection.",
    impact: "Yield losses of 15-50% and significant reduction in sugar recovery",
    managementOptions: ["Disease-free seed cane", "Resistant varieties", "Tool sterilization", "Roguing infected plants"],
    image: "assets/sugarcane_baterial.jpeg",
    category: "Sugarcane",
    severity: "High",
    severityLevel: 80,
    color: "#b91c1c"
  }
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openCaseStudy, setOpenCaseStudy] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Filter case studies by category
  const filteredCaseStudies = Object.values(diseaseCaseStudies).filter(study => 
    selectedCategory === 'All' || study.category === selectedCategory
  );
  
  // Get unique categories
  const categories = ['All', ...new Set(Object.values(diseaseCaseStudies).map(study => study.category))];
  
  // Handle dialog open/close
  const handleOpenCaseStudy = (study) => {
    setOpenCaseStudy(study);
  };
  
  const handleCloseCaseStudy = () => {
    setOpenCaseStudy(null);
  };
  
  // Function to get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Corn':
        return <Grass />;
      case 'Potato':
        return <Spa />;
      case 'Rice':
        return <Grass />;
      case 'Wheat':
        return <Agriculture />;
      case 'Sugarcane':
        return <LocalFlorist />;
      default:
        return <Grass />;
    }
  };
  
  // Get icon for severity level
  const getSeverityIcon = (severityLevel) => {
    if (severityLevel === 0) {
      return <CheckCircle sx={{ color: 'success.main' }} />;
    } else if (severityLevel < 50) {
      return <BugReport sx={{ color: 'info.main' }} />;
    } else if (severityLevel < 80) {
      return <Warning sx={{ color: 'warning.main' }} />;
    } else {
      return <Warning sx={{ color: 'error.main' }} />;
    }
  };
  
  return (
    <ThemeProvider theme={cropDiseaseTheme}>
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" elevation={0} sx={{ 
          background: 'linear-gradient(90deg, rgba(27,94,32,1) 0%, rgba(56,142,60,1) 100%)'
        }}>
          <Toolbar>
            <Agriculture sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Crop Disease Detection & Analysis
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Box sx={{ 
          py: 3, 
          px: 4, 
          background: 'linear-gradient(180deg, rgba(46,125,50,0.1) 0%, rgba(200,230,201,0.3) 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ 
            color: 'primary.dark', 
            mb: 3,
            fontWeight: 'bold',
            textShadow: '0px 1px 1px rgba(255,255,255,0.5)'
          }}>
            Plant Disease Case Studies
          </Typography>
          
          <Paper elevation={0} sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(10px)'
          }}>
            <Tabs 
              value={selectedCategory}
              onChange={(e, newValue) => setSelectedCategory(newValue)}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              allowScrollButtonsMobile
              textColor="primary"
              indicatorColor="secondary"
              sx={{ 
                '& .MuiTab-root': {
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  py: 2
                }
              }}
            >
              {categories.map((category) => (
                <Tab 
                  key={category} 
                  label={category} 
                  value={category} 
                  icon={category === 'All' ? <Agriculture /> : getCategoryIcon(category)}
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </Paper>
        </Box>
        
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ 
              color: 'primary.dark',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center'
            }}>
              {selectedCategory === 'All' ? 'All Crop Diseases' : `${selectedCategory} Disease Analysis`}
              <NavigateNext sx={{ color: 'secondary.main', ml: 1 }} />
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '800px' }}>
              {selectedCategory === 'All' 
                ? 'Comprehensive analysis of common crop diseases across various agricultural species. Each case study provides identification markers, impact assessment, and management solutions.' 
                : `Detailed case studies for ${selectedCategory.toLowerCase()} diseases, providing early detection markers, progression patterns, and effective management strategies to minimize crop loss.`}
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
          {filteredCaseStudies.map((study) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={study.title}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                    cursor: 'pointer'
                  }
                }}
                onClick={() => handleOpenCaseStudy(study)}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={study.image}
                  alt={study.title}
                />
                <Box sx={{ 
                  position: 'absolute', 
                  top: 12, 
                  right: 12,
                  display: 'flex',
                  gap: 1
                }}>
                  <Chip 
                    icon={getSeverityIcon(study.severityLevel)}
                    label={study.severity} 
                    size="small"
                    sx={{ 
                      bgcolor: study.color,
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', mr: 1, width: 28, height: 28 }}>
                      {getCategoryIcon(study.category)}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                      {study.category}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      color: 'primary.dark',
                      fontWeight: 'bold'
                    }}
                  >
                    {study.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      flexGrow: 1 
                    }}
                  >
                    {study.shortDescription}
                  </Typography>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'block',
                        mb: 1 
                      }}
                    >
                      Impact:
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'medium',
                        color: study.severityLevel > 50 ? 'error.dark' : 'success.main'
                      }}
                    >
                      {study.impact}
                    </Typography>
                  </Box>
                </CardContent>
                
                <Box sx={{ 
                  px: 2, 
                  pb: 2, 
                  mt: 'auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Button 
                    size="small" 
                    color="primary" 
                    endIcon={<NavigateNext />}
                    sx={{ fontWeight: 'bold' }}
                  >
                    Details
                  </Button>
                  
                  {study.severityLevel > 0 && (
                    <Box sx={{ width: '40%' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        Severity
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={study.severityLevel} 
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'rgba(0,0,0,0.1)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: study.color
                          }
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}          
        </Grid>
      </Container>
      
      {/* Detailed Case Study Dialog */}
      <Dialog
        open={!!openCaseStudy}
        onClose={handleCloseCaseStudy}
        maxWidth="md"
        fullWidth
        PaperProps={{ 
          sx: { 
            borderRadius: 4,
            overflow: 'hidden'
          } 
        }}
      >
        {openCaseStudy && (
          <>
            <Box sx={{ 
              position: 'relative', 
              height: 200, 
              bgcolor: openCaseStudy.color,
              display: 'flex',
              alignItems: 'flex-end',
              p: 3,
              backgroundImage: `url(${openCaseStudy.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(to top, ${openCaseStudy.color}ee, transparent)`,
              }
            }}>
              <IconButton 
                aria-label="close"
                onClick={handleCloseCaseStudy}
                sx={{ 
                  position: 'absolute', 
                  top: 8, 
                  right: 8,
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.5)',
                  }
                }}
              >
                <Close />
              </IconButton>
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Chip 
                  label={openCaseStudy.category}
                  icon={getCategoryIcon(openCaseStudy.category)}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: 'primary.dark',
                    fontWeight: 'bold',
                    mb: 1
                  }}
                />
                <Typography 
                  variant="h4" 
                  component="h2"
                  sx={{ 
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {openCaseStudy.title}
                </Typography>
              </Box>
            </Box>
            
            <DialogContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
                    Disease Profile
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {openCaseStudy.fullDescription}
                  </Typography>
                  
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
                      Management Options
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {openCaseStudy.managementOptions.map((option, index) => (
                        <Typography component="li" key={index} variant="body1" paragraph>
                          {option}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{ 
                      p: 2, 
                      bgcolor: 'background.default',
                      borderRadius: 2,
                      border: '1px solid rgba(0,0,0,0.1)',
                      mb: 3
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
                      Severity Assessment
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Impact Level:
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography 
                          variant="body1"
                          sx={{ 
                            fontWeight: 'bold',
                            color: openCaseStudy.color,
                            mr: 1
                          }}
                        >
                          {openCaseStudy.severity}
                        </Typography>
                        {getSeverityIcon(openCaseStudy.severityLevel)}
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Severity Score:
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: openCaseStudy.color }}>
                          {openCaseStudy.severityLevel}%
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={openCaseStudy.severityLevel} 
                          sx={{
                            flexGrow: 1,
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(0,0,0,0.1)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: openCaseStudy.color
                            }
                          }}
                        />
                      </Box>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Potential Impact:
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {openCaseStudy.impact}
                      </Typography>
                    </Box>
                  </Paper>
                  
                  <Paper
                    elevation={0}
                    sx={{ 
                      p: 2, 
                      bgcolor: 'background.default',
                      borderRadius: 2,
                      border: '1px solid rgba(0,0,0,0.1)'
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
                      Detection Info
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      Last Updated:
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      March 10, 2025
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      Detection Confidence:
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      98.7%
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      AI Model:
                    </Typography>
                    <Typography variant="body1">
                      AgriVision v3.5
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  </ThemeProvider>
);
}

export default App;