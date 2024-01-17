import * as React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Button, TextField, Grid, Typography, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const categorys = [
  {
    value: "Breakfast",
    label: "Breakfast",
  },
  {
    value: "Lunch",
    label: "Lunch",
  },
  {
    value: "Dinner",
    label: "Dinner",
  },
];

const useStyles = makeStyles(() => ({
  container: {
    padding: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  imageContainer: {
    border: "1px solid grey",
    borderRadius: "4px",
    padding: "5px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    maxWidth: "200px",
  },
}));

export default function FormAddProduct() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState("");
  const [hasErrors, setHasErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    description: "",
    image: image,
    category: "", // Add the category field back
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result.split(",")[1];
      setImage(base64Image);
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: base64Image,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();

    const hasEmptyFields = Object.values(formData).some(
      (value) => !value.trim()
    );

    if (hasEmptyFields) {
      setHasErrors(true);
      setIsLoading(false);
      return;
    }

    fetch("https://backprison.talentfort.live/api/v1/additem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        navigate("/products");
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {hasErrors && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Please fill out all fields.
        </Alert>
      )}
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1">
            Add Item
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Product Name"
            variant="outlined"
            value={formData.name}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            variant="outlined"
            value={formData.price}
            onChange={handleFormChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-select-category"
            select
            label="Select category"
            name="category"
            value={formData.category}
            onChange={handleFormChange}
            variant="outlined"
            fullWidth
          >
            {categorys.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
            }}
          >
            <div>
              <label htmlFor="image-upload">Product Image</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {formData.image && <span>{formData.image.name}</span>}
            </div>
          </Box>
          <div className={classes.imageContainer}>
            {image && (
              <div>
                <img
                  src={`data:image/jpeg;base64,${image}`}
                  alt="product image"
                  style={{ maxWidth: 200, maxHeight: 200 }}
                  loading="lazy"
                />
              </div>
            )}
            {!image && (
              <div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/2048px-Antu_insert-image.svg.png"
                  alt="product image"
                  style={{ maxWidth: 200, maxHeight: 200 }}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
