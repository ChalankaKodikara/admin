import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

export default function Users() {
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: "userId", headerName: "ID", width: 70 },
    { field: "createDate", headerName: "Create Date", width: 200 },
    {
      field: "fname",
      headerName: <div style={{ textAlign: "left" }}>Fist Name</div>,
      width: 130,
    },
    {
      field: "lname",
      headerName: <div style={{ textAlign: "left" }}>Last Name</div>,
      width: 130,
    },
    {
      field: "mobileno",
      headerName: <div style={{ textAlign: "left" }}>Mobile NO</div>,
      width: 200,
    },
    {
      field: "employeeid",
      headerName: <div style={{ textAlign: "left" }}>Employee ID</div>,
      width: 200,
    },
    {
      field: "designation",
      headerName: <div style={{ textAlign: "left" }}>Designation</div>,
      width: 150,
    },
    {
      field: "section",
      headerName: <div style={{ textAlign: "left" }}>Section</div>,
      width: 150,
    },
  ];

  React.useEffect(() => {
    fetch("https://backprison.talentfort.live/api/v1/users")
      .then((response) => response.json())
      .then((data) => {
        const rows = data.map((row) => ({ ...row, id: row.userId }));
        setRows(rows);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log("User data", rows);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <StripedDataGrid
        rows={rows}
        columns={columns}
        editRowsModel={editRowsModel}
        onEditRowsModelChange={(newModel) => setEditRowsModel(newModel)}
      />
    </div>
  );
}
