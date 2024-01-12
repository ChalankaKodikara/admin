import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Modal } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "../listitems";
import { AppBar, Drawer, mdTheme } from "../Structure";
import Button from "@mui/material/Button";
import Itemcard from "./Itemcard";
import ShoppingCart from "./ShoppingCart";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
function Item(props) {
  return (
    <Paper sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
      {props.children}
    </Paper>
  );
}

export default function Posarchi() {
  const [open, setOpen] = React.useState(true);
  const [cart, setCart] = React.useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log("Cart contents:", cart);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  // Calculate total price of all items in the cart
  const calculateCartTotal = () => {
    return cart.reduce(
      (total, product) => total + parseFloat(product.price),
      0
    );
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const [formType, setFormType] = useState("prisoner"); // Default to "prisoner" form

  const handleFormTypeChange = (type) => {
    setFormType(type);
  };
  const MyFormControlLabel = (props) => {};
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Typography>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`,
    };
  }

  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  };

  const fabGreenStyle = {
    color: "common.white",
    bgcolor: green[500],
    "&:hover": {
      bgcolor: green[600],
    },
  };

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: "primary",
      sx: fabStyle,
      icon: <AddIcon />,
      label: "Add",
    },
    {
      color: "secondary",
      sx: fabStyle,
      icon: <EditIcon />,
      label: "Edit",
    },
    {
      color: "inherit",
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <UpIcon />,
      label: "Expand",
    },
  ];

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              POS
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Item>
                <div>
                  <div>
                    <div>
                      <Button
                        variant="contained"
                        style={{
                          marginRight: "10px",
                          width: "320px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      >
                        Breakfast
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          marginRight: "10px",
                          width: "320px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      >
                        Lunch
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          width: "320px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      >
                        Dinner
                      </Button>
                    </div>
                    <br />
                    <div className="items">
                      <Itemcard
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        cart={cart}
                        handleOpenModal={handleOpenModal}
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                </div>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Box sx={{ display: "flex" }}>
                  <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Total: Rs. {calculateCartTotal().toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  style={{
                    width: "500px",
                    height: "50px",
                    borderRadius: "10px",
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Check Out
                </Button>
                <Modal open={modalOpen} onClose={handleCloseModal}>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      width: 500,
                      position: "relative",
                      minHeight: 200,
                    }}
                  >
                    <AppBar position="static" color="default">
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="action tabs example"
                      >
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                      </Tabs>
                    </AppBar>
                    <SwipeableViews
                      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel value={value} index={0} dir={theme.direction}>
                        Item One
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        Item Two
                      </TabPanel>
                      <TabPanel value={value} index={2} dir={theme.direction}>
                        Item Three
                      </TabPanel>
                    </SwipeableViews>
                    {fabs.map((fab, index) => (
                      <Zoom
                        key={fab.color}
                        in={value === index}
                        timeout={transitionDuration}
                        style={{
                          transitionDelay: `${
                            value === index ? transitionDuration.exit : 0
                          }ms`,
                        }}
                        unmountOnExit
                      > 
                        <Fab
                          sx={fab.sx}
                          aria-label={fab.label}
                          color={fab.color}
                        >
                          {fab.icon}
                        </Fab>
                      </Zoom>
                    ))}
                  </Box>
                  {/* <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 1500,
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        marginRight: "10px",
                        width: "200px",
                        height: "50px",
                        borderRadius: "10px",
                      }}
                      onClick={() => handleFormTypeChange("prisoner")}
                    >
                      Prisoners
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        marginRight: "10px",
                        width: "200px",
                        height: "50px",
                        borderRadius: "10px",
                      }}
                      onClick={() => handleFormTypeChange("jailer")}
                    >
                      Jailer
                    </Button>
                    <br />
                    {formType === "prisoner" && (
                      <>
                        {/* Prisoners Form */}
                  {/* <TextField
                          label="Prisoners Name"
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: "50ch" }}
                        />
                        <TextField
                          label="Phone Number"
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: "50ch" }}
                        />
                        <Button
                          variant="contained"
                          style={{
                            marginRight: "10px",
                            width: "200px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                        >
                          Send OTP
                        </Button>
                        <br />
                        <TextField
                          label="Ward Number"
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: "50ch" }}
                        />
                        <TextField
                          label="Prisoner Number"
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: "50ch" }}
                        />
                      </>
                    )}
                    {formType === "jailer" && (
                      <>
                        {/* Jailer Form */}
                  {/* <TextField
                          label="Jailer's Name"
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: "50ch" }}
                        />
                        <TextField
                          label="Jailer's Phone Number"
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: "50ch" }}
                        /><br/>

                        <Button
                          variant="contained"
                          style={{
                            marginRight: "10px",
                            width: "150px",
                            height: "50px",
                            borderRadius: "10px",
                          }}
                        >
                          Send OTP
                        </Button>
                        <br />
                        <TextField
                          label="Staff ID "
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: "50ch" }}
                        />
                        <TextField
                          label="Section"
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: "50ch" }}
                        />
                        <TextField
                          label="Designation"
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: "50ch" }}
                        />
                        <RadioGroup name="use-radio-group" defaultValue="first">
                          <MyFormControlLabel
                            value="Registerd Staff"
                            label="First"
                            control={<Radio />}
                          />
                          <MyFormControlLabel
                            value="Registration "
                            label="Second"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </>
                    )}
                  </Box>  */}
                </Modal>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
