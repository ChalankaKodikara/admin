import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ShoppingCart({ cart, removeFromCart }) {
  const handleRemove = (index) => {
    // Remove from cart state
    removeFromCart(index);

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  return (
    <div>
    {cart.map((item, index) => (
      <div key={item.product.id}>
        <Card
          sx={{
            display: "flex",
            width: 300,
            height: 100,
          }}
        >
          <div
           
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemove(index)}
              sx={{
                width: "100px",
                height: "30px",
                alignSelf: "flex-end", 
              }}
            >
              Remove
            </Button>
          </div>
  
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography gutterBottom variant="h6" component="div">
                {item.product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {item.product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {item.date ? item.date.toDateString() : "N/A"}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <hr />
      </div>
    ))}
  </div>
  
  );
}
