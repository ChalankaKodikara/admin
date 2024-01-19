// ShoppingCart.jsx
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ShoppingCart({
  cart,
  removeFromCart,
}) {
  return (
    <div>
      {cart.map((item) => (
        <div key={item.product.id}>
          <Card
            sx={{
              display: "flex",
              maxWidth: 500,
            }}
          >
            <CardMedia
              component="img"
              alt={item.product.name}
              height="100"
              src={`data:image/jpeg;base64,${item.product.image}`}
              sx={{
                width: 100,
                flexShrink: 0,
              }}
            />
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
                  Date: {item.date.toDateString()} {/* Adjust this line to display the date in the desired format */}
                </Typography>
              </div>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeFromCart(item.product.id)}
              >
                Remove 
              </Button>
            </CardContent>
          </Card>
          <hr />
        </div>
      ))}
    </div>
  );
}
