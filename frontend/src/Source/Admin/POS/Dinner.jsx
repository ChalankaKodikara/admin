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
} from "@mui/material";
import axios from "axios";
import SwipeableViews from 'react-swipeable-views';

export default function Itemcard({ addToCart }) {
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backfood.tfdatamaster.com/api/v1/data/items"
        );
        console.log("API Response:", response.data);
        const formattedProductData = response.data.map((product) => ({
          id: product._id,
          name: product.name,
          price: product.price,
          description: product.description,
          promotionStatus: product.promotionStatus,
          image: product.image,
        }));
        console.log("Product Data:", formattedProductData);
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
    if (selectedProduct) {
      addToCart(selectedProduct);
      handleCloseModal();
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {productData
        .filter((product) => product.promotionStatus !== "promoted")
        .map((product) => (
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
            width: 1200,
            height: 600,
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
              <Tab label="Staff" />
              <Tab label="Prison" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <div>
              <h1>Staff</h1>
            </div>
            <div>
              <h1>Prison</h1>
            </div>
          </SwipeableViews>
          <Button onClick={handleCloseModal}>Close</Button>
          <br />
          <Button
            variant="contained"
            style={{
              marginRight: "10px",
              width: "200px",
              height: "40px",
              borderRadius: "10px",
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
