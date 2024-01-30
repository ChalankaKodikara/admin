import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

export default function ShoppingCart({ cart, removeFromCart, setCart }) {
  const handleRemove = (index) => {
    // Remove from cart state
    removeFromCart(index);

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="cart table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#0288d1" }}>
            <TableCell style={{ color: "white" }}>Product Name</TableCell>
            <TableCell style={{ color: "white" }}>Price</TableCell>
            <TableCell style={{ color: "white" }}>Date</TableCell>
            <TableCell style={{ color: "white" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((item, index) => (
            <TableRow key={item.product.id} style={{ height: "10px" }}>
              <TableCell>
                <Typography variant="subtitle2">{item.product.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {item.product.price}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">
                  {item.date ? item.date.toDateString() : "N/A"}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleRemove(index)}>
                  <DeleteIcon style={{ fontSize: "15px" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
