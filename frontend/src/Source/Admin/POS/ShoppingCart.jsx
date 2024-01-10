import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ShoppingCart({ cart, handleOpenModal }) {
  return (
    <div style={{ marginTop: "20px" }}>
      {cart.map((product) => (
        <div key={product.id}>
          <Card
            sx={{
              display: "flex",
              maxWidth: 500,
              margin: 5,
            }}
            onClick={() => handleOpenModal(product)}
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
            <CardContent sx={{
              flex: 1,
            }}>
              <Typography gutterBottom variant="h8" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {product.price}
              </Typography>
            </CardContent>
          </Card>
          <hr />
        </div>
      ))}
    </div>
  );
}
