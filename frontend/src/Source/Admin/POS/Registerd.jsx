import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const steps = [
  "Receiver Details",
  "Edit Details",
  "Bill print",
  "Order Complete!",
];

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
  const [editMode, setEditMode] = React.useState(false); // New state for edit mode

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCheck = async () => {
    try {
      // Simulating API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulated response data
      const responseData = {
        fname: "John",
        lname: "Doe",
        mobileno: "1234567890",
        section: "A",
      };

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
              onClick={handleCheck}
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
              onClick={() => setEditMode(true)}
              disabled={!receiverDetails.employeeid}
            >
              Edit
            </Button>
          </div>
        );

      case 1:
        return <Typography variant="h5">Bill print</Typography>;

      case 2:
        return <Typography variant="h5">Order Complete </Typography>;

      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
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
            <Button onClick={handleNext}>
              {activeStep === steps.length - 2 ? "Order Complete" : "Next"}
            </Button>
          )}
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default HorizontalLinearStepper;
