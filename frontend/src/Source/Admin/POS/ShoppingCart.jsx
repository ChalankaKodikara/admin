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
      {cart.map((product) => (
        <div key={product.id}>
          <Card
            sx={{
              display: "flex",
              maxWidth: 500,
            }}
          >
            <CardMedia
              component="img"
              alt={product.name}
              height="100"
              src={`data:image/jpeg;base64,${product.image}`}
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
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {product.price}
                </Typography>
              </div>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeFromCart(product.id)}
              >
                Remove from Cart
              </Button>
            </CardContent>
          </Card>
          <hr />
        </div>
      ))}
    </div>
  );
}
