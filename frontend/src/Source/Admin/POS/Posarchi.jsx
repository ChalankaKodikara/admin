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
                <TextField
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
                <TextField
                  label="Jailer's Name"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "50ch" }}
                />
                <TextField
                  label="Jailer's Phone Number"
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
                  label="Jailer's Badge Number"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "50ch" }}
                />
                <TextField
                  label="Jailer's ID"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: "50ch" }}
                />
              </>
            )}
          </Box>
        </Modal>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
