import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const steps = ["Receiver Details", "Bill print", "Order Complete!"];

const HorizontalLinearStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [receiverDetails, setReceiverDetails] = React.useState({
    Designation: "",
    fname: "",
    lname: "",
    phoneNumber: "",
    section: "",
    employeeid: "",
    otp: "",
  });
  const [editMode, setEditMode] = React.useState(false);
  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
            employeeid: customerDetails.employeeid,
            Designation: customerDetails.Designation,
            section: customerDetails.section,
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
        productStatus: "", // Set this based on your logic
        mobileno: customerDetails.mobileno,
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
      localStorage.removeItem("inputData");
    } catch (error) {
      console.error("Error sending data to the endpoint:", error.message);
    }
  };

  const handleCheck = async () => {
    try {
      // Make a network request to fetch employee details
      const response = await fetch(
        `https://backprison.talentfort.live/api/v1/users/details?employeeId=${receiverDetails.employeeid}`
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch employee details");
      }

      // Parse the response data as JSON
      const responseData = await response.json();

      // Update receiver details with the fetched data
      setReceiverDetails((prev) => ({
        ...prev,
        fname: responseData.fname,
        lname: responseData.lname,
        phoneNumber: responseData.mobileno,
        section: responseData.section,
      }));
    } catch (error) {
      console.error("Error checking employee details:", error.message);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              label="Employee Number"
              id="prisonerid"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.employeeid}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  employeeid: e.target.value,
                }))
              }
            />

            <Button
              variant="contained"
              style={{
                marginRight: "10px",
                width: "200px",
                height: "50px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
              onClick={handleCheck} // Call handleCheck when the button is clicked
            >
              Check
            </Button>
            <br />
            <TextField
              id="fname"
              label="First Name"
              variant="filled"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.fname}
              disabled={!editMode}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  fname: e.target.value,
                }))
              }
            />
            <TextField
              id="lname"
              label="Last Name"
              variant="filled"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.lname}
              disabled={!editMode}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  lname: e.target.value,
                }))
              }
            />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              variant="filled"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.phoneNumber}
              disabled={!editMode}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
            />
            <TextField
              id="section"
              label="Section"
              variant="filled"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.section}
              disabled={!editMode}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  section: e.target.value,
                }))
              }
            />
            <Button
              variant="contained"
              style={{
                marginRight: "10px",
                width: "200px",
                height: "50px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
              onClick={() => setEditMode((prevEditMode) => !prevEditMode)}
              disabled={!receiverDetails.employeeid}
            >
              {editMode ? "Update" : "Edit"}
            </Button>
          </div>
        );

      case 1:
        const storedCartData = localStorage.getItem("cart");
        const storedCart = storedCartData ? JSON.parse(storedCartData) : [];

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 100, width: "50%" }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Items</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {storedCart.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );

      case 2:
        return <Typography variant="h5">Order Complete</Typography>;

      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
        {getStepContent(activeStep)}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep !== steps.length - 1 && (
            <Button color="inherit" onClick={handleNext} variant="contained">
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button onClick={sendDataToEndpoint} variant="contained">
              Order Complete
            </Button>
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default HorizontalLinearStepper;
