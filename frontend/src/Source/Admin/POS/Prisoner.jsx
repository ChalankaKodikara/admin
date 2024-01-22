import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const steps = ["Receiver Details", "Bill Print", "Order Complete!"];

const HorizontalLinearStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [receiverDetails, setReceiverDetails] = React.useState({
    prisonersName: "",
    phoneNumber: "",
    wardNumber: "",
    prisonerNumber: "",
  });
  const [selectedProductDetails, setSelectedProductDetails] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);

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

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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
      prisonersName: "",
      phoneNumber: "",
      wardNumber: "",
      prisonerNumber: "",
    });
    setSelectedProductDetails(null);
    setSelectedDate(null);
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              label="Prisoner's Name"
              id="outlined-start-adornment"
              value={receiverDetails.prisonersName}
              onChange={(e) => setReceiverDetails((prev) => ({ ...prev, prisonersName: e.target.value }))}
              sx={{ m: 1, width: "50ch" }}
            />
            <TextField
              label="Phone Number"
              id="outlined-start-adornment"
              value={receiverDetails.phoneNumber}
              onChange={(e) => setReceiverDetails((prev) => ({ ...prev, phoneNumber: e.target.value }))}
              sx={{ m: 1, width: "50ch" }}
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
              onClick={handleNext}
            >
              Send OTP
            </Button>
          </div>
        );
      case 1:
        // Retrieve data from local storage
        const storedData = localStorage.getItem("cart");
        const cartData = storedData ? JSON.parse(storedData) : [];

        return (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                    <StyledTableCell>{item.date ? new Date(item.date).toDateString() : "N/A"}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
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
            <Button
              color="inherit"
              onClick={handleSkip}
              sx={{ mr: 1 }}
            >
              Skip
            </Button>
          )}
          <Button
            onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
          >
            {activeStep === steps.length - 1 ? "Order Complete" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default HorizontalLinearStepper;
