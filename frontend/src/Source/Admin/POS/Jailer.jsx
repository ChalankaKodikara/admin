import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const steps = ["Receiver Details", "Bill Print", "Order Complete!"];

const HorizontalLinearStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [receiverDetails, setReceiverDetails] = React.useState({
    Designation: "",
    fname: "",
    lname: "",
    phoneNumber: "",
    section: "",
    employeeid: "",
    otp: "",
  });
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [cart, setCart] = React.useState([]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    // Save input fields in local storage when moving to the next step
    if (activeStep === 0) {
      const {
        Designation,
        customerName,
        phoneNumber,
        section,
        prisonerNumber,
      } = receiverDetails;
      const inputData = {
        designation: Designation,
        customerName: customerName,
        mobileno: phoneNumber,
        section: section,
        employeeid: prisonerNumber,
        role: "user",
      };
      localStorage.setItem("inputData", JSON.stringify(inputData));
    }

    // Check if phone number is successfully verified
    if (activeStep === 0 && loginSuccess) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep !== 0) {
      // If it's not the first step, move to the next step directly
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    // Update skipped steps
    if (activeStep === 0 && !loginSuccess) {
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setReceiverDetails({
      Designation: "",
      customerName: "",
      phoneNumber: "",
      section: "",
      employeeid: "",
      otp: "",
    });
  };

  const handleCloseModal = () => {
    // Define the logic to close the modal here
    console.log("Modal closed");
    // You can add your specific logic to close the modal
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
        productStatus: "", // Set tclshis based on your logic
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
  const sendOTP = async () => {
    console.log("receiverDetails before sending OTP:", receiverDetails);
    const {
      Designation,
      customerName,
      customerLastName,
      phoneNumber,
      section,
      employeeid,
    } = receiverDetails;

    // Prepare the data to be sent
    const data = {
      designation: Designation,
      fname: customerName,
      lname: customerLastName,
      mobileno: phoneNumber,
      employeeid: employeeid,
      section: section,
      password: phoneNumber,
    };

    try {
      // Make the HTTP POST request to your actual API endpoint for OTP
      const response = await fetch(
        "https://backprison.talentfort.live/api/v1/membersignup/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // You can handle the response here if needed
      const responseData = await response.json();
      console.log("Response from the server:", responseData);
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }
  };

  const login = async () => {
    // Extract data from the form fields
    const { phoneNumber, otp } = receiverDetails;

    // Prepare the data to be sent for login
    const loginData = {
      mobileno: phoneNumber,
      otp: otp, // Assuming OTP is used as a password for simplicity
    };

    try {
      // Make the HTTP POST request to the login endpoint
      const response = await fetch(
        "https://backprison.talentfort.live/api/v1/membersignup/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // You can handle the response here if needed
      const responseData = await response.json();
      console.log("Mobile Number Verified:", responseData);

      // Set loginSuccess to true upon successful login
      setLoginSuccess(true);

      // Move to the next step or perform additional actions if login is successful
      // handleNext();
    } catch (error) {
      console.error("Error logging in:", error.message);

      // Check for a specific error message from the server
      if (error.message.includes("Incorrect password")) {
        setErrorMessage("Incorrect OTP. Please try again.");
      } else {
        setErrorMessage("Error logging in. Please try again.");
      }
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const calculateCartTotal = (cart) => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              label="Designation"
              id="Designation"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.Designation}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  Designation: e.target.value,
                }))
              }
            />
            <TextField
              label="First Name"
              id="customerName"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.customerName}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  customerName: e.target.value,
                }))
              }
            />
            <TextField
              label="Last Name"
              id="customerLastName"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.customerLastName}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  customerLastName: e.target.value,
                }))
              }
            />
            <TextField
              label="Phone Number"
              id="mobileno"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.phoneNumber}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
            />

            <TextField
              label="Section "
              id="wardno"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.section}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  section: e.target.value,
                }))
              }
            />
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
              onClick={sendOTP}
            >
              Send OTP
            </Button>
            <br />
            <br />

            <TextField
              label="OTP "
              id="otp"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.otp}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  otp: e.target.value,
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
              onClick={login}
            >
              Verify Number
            </Button>
            {loginSuccess && (
              <Alert
                icon={<CheckCircleIcon fontSize="inherit" />}
                severity="success"
                sx={{ alignItems: "flex-start", marginTop: 2 }}
                action={
                  <IconButton
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setLoginSuccess(false);
                    }}
                  >
                    <CloseRoundedIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <div>
                  <Typography level="body-sm" color="success">
                    Mobile number verified successfully
                  </Typography>
                </div>
              </Alert>
            )}
            {errorMessage && (
              <Alert
                severity="error"
                sx={{ marginTop: 2 }}
                action={
                  <IconButton
                    color="inherit"
                    size="small"
                    onClick={() => setErrorMessage("")}
                  >
                    <CloseRoundedIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <Typography>{errorMessage}</Typography>
              </Alert>
            )}
          </div>
        );

      case 1:
        // Retrieve data from local storage
        const storedData = localStorage.getItem("cart");
        const cartData = storedData ? JSON.parse(storedData) : [];
        const total = calculateCartTotal(cartData); // Calculate the total

        return (
          <div>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  width: "100%",
                  height: "10px",
                }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartData.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{item.name}</StyledTableCell>
                      <StyledTableCell>{item.price}</StyledTableCell>
                      <StyledTableCell>{item.category}</StyledTableCell>
                      <StyledTableCell>
                        {item.date ? new Date(item.date).toDateString() : "N/A"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Total: ${total} {/* Display the total */}
            </Typography>
          </div>
        );

      case 2:
        // Retrieve data from local storage
        const storedCartData = localStorage.getItem("cart");
        const storedCart = storedCartData ? JSON.parse(storedCartData) : [];

        return (
          <div>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
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
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
          </div>
        );

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
          if (isStepSkipped(index)) {
            stepProps.completed = false;
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
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}
          <Button
            onClick={
              activeStep === steps.length - 1 ? sendDataToEndpoint : handleNext
            }
          >
            {activeStep === steps.length - 1 ? "Order Complete" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default HorizontalLinearStepper;
