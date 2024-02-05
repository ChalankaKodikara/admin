import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const steps = ["Receiver Details", "Edit Details", "Bill print", "Order Complete!"];

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
  const [errorMessage, setErrorMessage] = React.useState("");
  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const checkEmployeeDetails = async () => {
    try {
      const response = await fetch(
        `https://backprison.talentfort.live/api/v1/users/details?employeeId=${receiverDetails.employeeid}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const { fname, lname, mobileno, section } = responseData;

      setReceiverDetails((prev) => ({
        ...prev,
        fname,
        lname,
        phoneNumber: mobileno,
        section,
      }));

    } catch (error) {
      console.error("Error checking employee details:", error.message);
      setErrorMessage("Error checking employee details. Please try again.");
    }
  };

  const handleUpdate = async () => {
    // Perform the update logic here

    // Assume a successful update and move to the next step
    handleNext();
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
              onClick={checkEmployeeDetails}
            >
              Check
            </Button>
            <br />
            <TextField
              disabled
              id="fname"
              label="First Name"
              variant="filled"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.fname}
            />
            <TextField
              disabled
              id="lname"
              label="Last Name"
              variant="filled"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.lname}
            />
            <TextField
              disabled
              id="phoneNumber"
              label="Phone Number"
              variant="filled"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.phoneNumber}
            />
            <TextField
              disabled
              id="section"
              label="Section"
              variant="filled"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.section}
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
              onClick={handleUpdate}
            >
              Update
            </Button>
          </div>
          
        );
      case 1:
        return (
          <div>
            <TextField
              id="edit-fname"
              label="Edit First Name"
              variant="filled"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.fname}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  fname: e.target.value,
                }))
              }
            />
            <TextField
              id="edit-lname"
              label="Edit Last Name"
              variant="filled"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.lname}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  lname: e.target.value,
                }))
              }
            />
            <TextField
              id="edit-phoneNumber"
              label="Edit Phone Number"
              variant="filled"
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
              id="edit-section"
              label="Edit Section"
              variant="filled"
              sx={{ m: 1, width: "50ch" }}
              value={receiverDetails.section}
              onChange={(e) =>
                setReceiverDetails((prev) => ({
                  ...prev,
                  section: e.target.value,
                }))
              }
            />
          </div>
        );
      case 2:
        return <Typography variant="h5">Bill print</Typography>;
      case 3:
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
          {activeStep === 1 && (
            <Button onClick={handleUpdate}>Update</Button>
          )}
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
