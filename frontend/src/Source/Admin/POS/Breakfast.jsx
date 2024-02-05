// ItemCard.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Modal,
  Box,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import axios from "axios";
import moment from "moment-timezone";

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

export default function ItemCard({ addToCart }) {
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [dateCheckboxes, setDateCheckboxes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backprison.talentfort.live/api/v1/data/itemscategoryvice?category=Breakfast"
        );
        const formattedProductData = response.data.map((product) => ({
          itemid: product.itemid,
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
        }));
        setProductData(formattedProductData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddToCart = () => {
    console.log("product data = ", productData);

    console.log("selected Product = ", selectedProduct);

    console.log("selected Date  = ", selectedDate);

    if (selectedProduct && selectedDate) {
      // Add to cart using the existing addToCart function
      addToCart({ product: selectedProduct, date: selectedDate });

      // Save the selected product ID and date in local storage
      const { itemid, name, price, category } = selectedProduct; // Extract the product details
      const cartItem = {
        productName:name,
        itemid,
        date: moment(selectedDate).format("YYYY/MM/DD"),
        meal:category,
        price,
        role: "Presoner",

      };

      // Save in local storage
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = [...existingCart, cartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      handleCloseModal();
    }
  };

  const handleAddToCartuser = () => {
    console.log("product data = ", productData);

    console.log("selected Product = ", selectedProduct);

    console.log("selected Date  = ", selectedDate);

    if (selectedProduct && selectedDate) {
      // Add to cart using the existing addToCart function
      addToCart({ product: selectedProduct, date: selectedDate });

      // Save the selected product ID and date in local storage
      const { itemid, name, price, category } = selectedProduct; // Extract the product details
      const cartItem = {
        productName:name,
        itemid,
        date: moment(selectedDate).format("YYYY/MM/DD"),
        meal:category,
        price,
        role: "user",

      };

      // Save in local storage
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = [...existingCart, cartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      handleCloseModal();
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const renderDateCheckboxes = () => {
    const currentDate = moment().tz("YourTimeZone"); // Replace "YourTimeZone" with your actual time zone
    const checkboxes = [];

    // If current time is after 12:01 am, start from the next day
    const startDay =
      currentDate.hours() >= 0 && currentDate.minutes() > 1 ? 1 : 0;

    for (let i = startDay; i < startDay + 3; i++) {
      const checkboxDate = moment().tz("YourTimeZone").add(i, "days");
      const formattedDate = checkboxDate.format("D MMM");
      checkboxes.push(
        <FormGroup key={i}>
          <FormControlLabel
            control={<Checkbox />}
            label={`${formattedDate}`}
            onClick={() => handleDateSelection(checkboxDate.toDate())}
          />
        </FormGroup>
      );
    }

    setDateCheckboxes(checkboxes);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  // Render date checkboxes when modal is opened
  useEffect(() => {
    if (modalOpen) {
      renderDateCheckboxes();
    }
  }, [modalOpen]);

  const isOrderAllowed = () => {
    const currentTime = moment();

    // If current time is between 12:01 am and 2:00 pm, staff cannot place an order
    if (currentTime.hours() >= 0 && currentTime.hours() < 14) {
      return false;
    } else {
      // If current time is between 2:01 pm and 11:59 pm, staff can place an order
      return true;
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {productData.map((product) => (
        <Card
          key={product.id}
          sx={{ maxWidth: 500, margin: 2 }}
          onClick={() => handleOpenModal(product)}
        >
          <CardActionArea style={{ width: 200, height: 200 }}>
            <CardMedia
              component="img"
              alt={product.name}
              height="120"
              src={`data:image/jpeg;base64,${product.image}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {product.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            bgcolor: "background.paper",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 400,
            boxShadow: 24,
            p: 4,
            minHeight: 200,
            borderRadius: "10px",
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
              <Tab label="Prisoner" />
              <Tab label="Prisoner Staff " />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis="x"
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir="ltr">
              {dateCheckboxes.map((checkbox, index) => (
                <div key={index}>{checkbox}</div>
              ))}
              <div
                className="che"
                style={{ textAlign: "center", marginTop: "10px" }}
              >
                <Button
                  variant="contained"
                  style={{
                    width: "200px",
                    height: "40px",
                    borderRadius: "10px",
                    marginBottom: "10px", // Add margin to create a gap
                  }}
                  onClick={handleAddToCartuser}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="soft"
                  style={{
                    width: "340px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir="ltr">
              <div
                className="che"
                style={{ textAlign: "center", marginTop: "10px" }}
              >
                {isOrderAllowed() ? (
                  <>
                    <Button
                      variant="contained"
                      style={{
                        width: "340px",
                        height: "40px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>

                    <Button
                      variant="soft"
                      style={{
                        width: "340px",
                        height: "40px",
                        borderRadius: "10px",
                      }}
                      onClick={handleCloseModal}
                    >
                      Close
                    </Button>
                  </>
                ) : (
                  <p>Staff Cannot Place Order Right Now</p>
                )}
              </div>
            </TabPanel>
          </SwipeableViews>
          <br />
        </Box>
      </Modal>
    </div>
  );
}
