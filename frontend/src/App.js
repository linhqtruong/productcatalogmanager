import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, AppBar, Toolbar, Typography, Tabs, Tab, Box, Link } from '@mui/material';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';
import BrandSummary from './components/BrandSummary';
import ErrorBoundary from './components/ErrorBoundary';
import enterBridgeLogo from './enterBridgeLogo.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function NavigationTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentTab = () => {
    if (location.pathname === '/brand-summary') return 1;
    return 0;
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate('/');
    } else if (newValue === 1) {
      navigate('/brand-summary');
    }
  };

  return (
    <Tabs 
      value={getCurrentTab()} 
      onChange={handleTabChange} 
      sx={{ 
        backgroundColor: '#f5f5f5',
        '& .MuiTab-root': {
          fontWeight: 'bold',
          fontSize: '1.1rem',
          textTransform: 'none',
          minHeight: '64px',
          '&:hover': {
            backgroundColor: '#e3f2fd',
            color: '#1976d2'
          },
          '&.Mui-selected': {
            color: '#1976d2',
            fontWeight: 'bold',
            backgroundColor: '#bbdefb'
          }
        },
        '& .MuiTabs-indicator': {
          height: '4px',
          backgroundColor: '#1976d2'
        }
      }}
    >
      <Tab label="Products" />
      <Tab label="Brand Summary" />
    </Tabs>
  );
}

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static">
            <Toolbar>
              <a 
                href="https://enterbridge.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  textDecoration: 'none'
                }}
              >
                <img 
                  src={enterBridgeLogo} 
                  alt="EnterBridge Logo" 
                  style={{ 
                    height: '40px', 
                    width: 'auto',
                    marginRight: '16px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }} 
                />
              </a>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Product Catalog Manager
              </Typography>
            </Toolbar>
          </AppBar>
          <NavigationTabs />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/brand-summary" element={<BrandSummary />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/add" element={<ProductForm />} />
                <Route path="/edit/:id" element={<ProductForm />} />
              </Routes>
            </ErrorBoundary>
          </Container>
          <Box 
            component="footer" 
            sx={{ 
              py: 2, 
              px: 2, 
              mt: 'auto',
              backgroundColor: '#f5f5f5',
              borderTop: '1px solid #e0e0e0',
              textAlign: 'center'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {currentYear}{' '}
              <Link 
                href="https://enterbridge.com" 
                target="_blank" 
                rel="noopener noreferrer"
                color="primary"
                sx={{ textDecoration: 'none' }}
              >
                enterbridge.com
              </Link>
            </Typography>
          </Box>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
