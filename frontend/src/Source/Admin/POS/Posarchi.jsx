import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
import ShoppingCart from "./ShoppingCart";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Registerd from "./Registerd";
import Prisoner from "./Prisoner";
import Lunch from "./Lunch";
import Breakfast from "./Breakfast";
import Dinner from "./Dinner";
import Jailer from "./Jailer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Make sure to adjust the path if needed
function Item(props) {
  useEffect(() => {
    // Check if props.children is null and remove local storage
    if (props.children === null) {
      clearLocalStorage();
    }
  }, [props.children]);

  const clearLocalStorage = () => {
    // Clear local storage
    localStorage.removeItem("cart");
    console.log("Clear cookies");
  };

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
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [discountModalOpen, setDiscountModalOpen] = useState(false);
  const [vatModalOpen, setvatModalOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  const calculateCartTotal = () => {
    const itemTotal = cart.reduce(
      (total, item) => total + parseFloat(item.product.price),
      0
    );

    const vat = itemTotal * 0.18; // 18% VAT
    const serviceCharge = itemTotal * 0.1; // 10% service charge

    const netTotal = itemTotal + vat + serviceCharge;

    return {
      itemTotal: itemTotal.toFixed(2),
      vat: vat.toFixed(2),
      serviceCharge: serviceCharge.toFixed(2),
      netTotal: netTotal.toFixed(2),
    };
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenDiscountModal = () => {
    setDiscountModalOpen(true);
  };

  const handleCloseDiscountModal = () => {
    setDiscountModalOpen(false);
  };

  const handleOpenvatModal = () => {
    setvatModalOpen(true);
  };

  const handleClosevatModal = () => {
    setvatModalOpen(false);
  };
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

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleOpenLunch = () => {
    setSelectedMeal("lunch");
  };

  const handleOpenDinner = () => {
    setSelectedMeal("dinner");
  };

  const handleOpenBreakfast = () => {
    setSelectedMeal("Breakfast");
  };

  const handleCloseMeal = () => {
    setSelectedMeal(null);
  };
  // const handleClearLocalStorage = () => {
  //   localStorage.removeItem("cart");
  //   window.location.reload(localStorage.removeItem("cart"););
  // };
  const sendDataToEndpoint = async () => {
    try {
      // Retrieve data from local storage
      const storedCartData = localStorage.getItem("cart");
      const storedCart = storedCartData ? JSON.parse(storedCartData) : [];

      // Extract customer details from local storage
      const customerDetails = JSON.parse(localStorage.getItem("inputData"));

      // Create the final payload structure
      const payload = {
        customerName: customerDetails.customerName,
        customerdetails: [
          {
            PresonserId: customerDetails.PresonserId,
            WardNo: customerDetails.WardNo,
          },
        ],
        products: storedCart
          .filter((item) => item.productName) // Filter out items without productName
          .map((item) => ({
            productName: item.productName,
            itemid: item.itemid,
            date: item.date,
            meal: item.meal,
            price: item.price,
          })),
        totalPrice: 0, // Calculate the total price based on your logic
        productStatus: "", // Set tclshis based on your logic
        mobileno: customerDetails.phoneNumber,
        role: customerDetails.role,
      };

      console.log("Sending data to the server:", payload);

      // Make the HTTP POST request to the specified endpoint
      const response = await fetch(
        "https://backprison.talentfort.live/api/v1/addsale",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // You can handle the response here if needed
      const responseData = await response.json();
      console.log("Response from the server:", responseData);

      // Optionally, you can clear the local storage after successful submission
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error sending data to the endpoint:", error.message);
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
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
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                marginLeft: "900px", // Adjust the desired left margin
              }}
            >
              CART
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
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Item>
                <Box
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    height: "600px",
                  }}
                >
                  <div>
                    <div>
                      <div>
                        <Button
                          variant="contained"
                          style={{
                            marginRight: "10px",
                            width: "200px",
                            height: "50px",
                            borderRadius: "10px",
                          }}
                          onClick={handleOpenBreakfast}
                        >
                          Breakfast
                        </Button>
                        <Button
                          variant="contained"
                          style={{
                            marginRight: "10px",
                            width: "200px",
                            height: "50px",
                            borderRadius: "10px",
                          }}
                          onClick={handleOpenLunch}
                        >
                          Lunch
                        </Button>
                        <Button
                          variant="contained"
                          style={{
                            width: "200px",
                            height: "50px",
                            borderRadius: "10px",
                          }}
                          onClick={handleOpenDinner}
                        >
                          Dinner
                        </Button>
                      </div>
                      <br />
                      <Box
                        sx={{
                          flexDirection: "column",
                          alignItems: "flex-end",
                          height: "450px",
                        }}
                      >
                        <div
                          className="meals"
                          style={{ textAlign: "center", marginTop: "10px" }}
                        >
                          {selectedMeal === "Breakfast" && (
                            <Breakfast
                              onClose={handleCloseMeal}
                              addToCart={addToCart}
                            />
                          )}
                          {selectedMeal === "lunch" && (
                            <Lunch
                              onClose={handleCloseMeal}
                              addToCart={addToCart}
                            />
                          )}
                          {selectedMeal === "dinner" && (
                            <Dinner
                              onClose={handleCloseMeal}
                              addToCart={addToCart}
                            />
                          )}
                        </div>{" "}
                      </Box>
                      <Button
                        variant="contained"
                        onClick={handleOpenvatModal}
                        style={{
                          marginRight: "10px",
                          width: "200px",
                          height: "50px",
                          borderRadius: "10px",
                        }}
                      >
                        Add VAT
                      </Button>

                      <Modal open={vatModalOpen} onClose={handleClosevatModal}>
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 300,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            borderRadius: "10px",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            style={{
                              marginTop: "10px",
                              alignItems: "start",
                            }}
                          >
                            Add VAT{" "}
                          </Typography>
                          <TextField
                            hiddenLabel
                            id="Discount"
                            defaultValue="%"
                            variant="filled"
                            size="small"
                            style={{
                              marginTop: "10px",
                            }}
                          />
                          <Button
                            variant="contained"
                            // onClick={handleOpenDiscountModal}
                            style={{
                              marginTop: "50px",
                              width: "200px",
                              height: "40px",
                              borderRadius: "10px",
                            }}
                          >
                            Add Vat
                          </Button>
                          <Button
                            onClick={handleClosevatModal}
                            style={{
                              width: "200px",
                              height: "40px",
                              borderRadius: "10px",
                            }}
                          >
                            Close
                          </Button>
                        </Box>
                      </Modal>

                      <Button
                        variant="contained"
                        onClick={handleOpenDiscountModal}
                        style={{
                          marginRight: "10px",
                          width: "200px",
                          height: "50px",
                          borderRadius: "10px",
                        }}
                      >
                        Add discount
                      </Button>

                      <Modal
                        open={discountModalOpen}
                        onClose={handleCloseDiscountModal}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 300,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            borderRadius: "10px",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            style={{
                              marginTop: "10px",
                              alignItems: "start",
                            }}
                          >
                            Add Disscount{" "}
                          </Typography>
                          <TextField
                            hiddenLabel
                            id="Discount"
                            defaultValue="%"
                            variant="filled"
                            size="small"
                            style={{
                              marginTop: "10px",
                            }}
                          />
                          <Button
                            variant="contained"
                            // onClick={handleOpenDiscountModal}
                            style={{
                              marginTop: "50px",
                              width: "200px",
                              height: "40px",
                              borderRadius: "10px",
                            }}
                          >
                            Add discount
                          </Button>
                          <Button
                            onClick={handleCloseDiscountModal}
                            style={{
                              width: "200px",
                              height: "40px",
                              borderRadius: "10px",
                            }}
                          >
                            Close
                          </Button>
                        </Box>
                      </Modal>

                      {/* <Button
                        variant="contained"
                        style={{
                          marginTop: "10px",
                          width: "200px",
                          height: "50px",
                          borderRadius: "10px",
                        }}
                        onClick={handleClearLocalStorage}
                      >
                        Clear Local Storage
                      </Button> */}
                    </div>
                  </div>
                </Box>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Box
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-end",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-end",
                      height: "450px",
                      padding: "10px",
                      overflowY: "auto",
                    }}
                  >
                    <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
                  </Box>
                  <div>
                    <Box
                      sx={{
                        width: "100%",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        backgroundColor: "#0288d1",
                        height: "160px",
                        padding: "10px",
                        overflowY: "auto",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          backgroundColor: "#0288d1",
                          height: "100px",
                        }}
                      >
                        <TableContainer component={Paper}>
                          <Table
                            sx={{
                              width: "100%",
                              backgroundColor: "#0288d1",
                              height: "10px",
                            }}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  align="right"
                                  style={{
                                    color: "white",
                                    fontSize: "14px",
                                    textAlign: "left",
                                  }}
                                >
                                  Item Total:
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{ color: "white", fontSize: "14px" }}
                                >
                                  {calculateCartTotal().itemTotal}{" "}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  align="right"
                                  style={{
                                    color: "white",
                                    fontSize: "14px",
                                    textAlign: "left",
                                  }}
                                >
                                  VAT (18%):
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{ color: "white", fontSize: "14px" }}
                                >
                                  {calculateCartTotal().vat}{" "}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  align="right"
                                  style={{
                                    color: "white",
                                    fontSize: "14px",
                                    textAlign: "left",
                                  }}
                                >
                                  Service Charge (10%):
                                </TableCell>
                                <TableCell
                                  align="right"
                                  style={{ color: "white", fontSize: "14px" }}
                                >
                                  {calculateCartTotal().serviceCharge}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                      <Button
                        variant="contained"
                        style={{
                          width: "100%",
                          height: "45px",
                          borderRadius: "10px",
                          backgroundColor: "green",
                        }}
                        onClick={
                          parseFloat(calculateCartTotal().netTotal) > 0
                            ? handleOpenModal
                            : null
                        }
                        disabled={
                          parseFloat(calculateCartTotal().netTotal) <= 0
                        }
                      >
                        Check Out Rs.{calculateCartTotal().netTotal}
                      </Button>
                    </Box>
                  </div>

                  <Modal open={modalOpen} onClose={handleCloseModal}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        bgcolor: "background.paper",
                        transform: "translate(-50%, -50%)",
                        width: 1200,
                        height: 700,
                        boxShadow: 24,
                        p: 4,
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
                          <Tab label="Prisoners" {...a11yProps(0)} />
                          <Tab label="Jailer Registration" {...a11yProps(1)} />
                          <Tab label="Registered Jailer" {...a11yProps(2)} />
                        </Tabs>
                      </AppBar>
                      <SwipeableViews
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                      >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <Prisoner />
                          <Button
                            variant="contained"
                            style={{
                              position: "fixed",
                              bottom: "10px",
                              right: "10px",
                              width: "500px",
                              height: "50px",
                              borderRadius: "10px",
                              marginTop: "25px",
                            }}
                            onClick={() => {
                              sendDataToEndpoint();
                              handleCloseModal(); // Assuming you also want to close the modal
                            }}
                          >
                            Print & Complete Order
                          </Button>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                          <Jailer />
                          <Button
                            variant="contained"
                            style={{
                              position: "fixed",
                              bottom: "10px",
                              right: "10px",
                              width: "500px",
                              height: "50px",
                              borderRadius: "10px",
                            }}
                            onClick={() => {
                              sendDataToEndpoint();
                              handleCloseModal(); // Assuming you also want to close the modal
                            }}
                          >
                            Print & Complete Order
                          </Button>
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                          <Registerd />
                        </TabPanel>
                      </SwipeableViews>
                    </Box>
                  </Modal>
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
