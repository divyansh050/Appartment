import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export  function CustomizedTables() {
  const [fetching, setFetching] = React.useState(false);

  const [rows, setRows] = React.useState([]);

  const navigate = useNavigate();

  const fetchData = () => {
    setFetching(true);
    axios
      .get("https://apartment-manager-server.herokuapp.com/resident")
      .then((res) => {
        setRows([...res.data]);
        console.log(res.data);
        setFetching(false);
      });
  };

  React.useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSort = (value) => {
    setFetching(true);
    axios
      .get(
        `https://apartment-manager-server.herokuapp.com/resident?sort=${value}`
      )
      .then((res) => {
        setRows([...res.data]);
        setFetching(false);
      });

    // setRows(sorted);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value.toUpperCase();

    if (value === "") {
      fetchData();
      return;
    }

    setFetching(true);
    axios
      .get(
        `https://apartment-manager-server.herokuapp.com/resident/?block=${value}`
      )
      .then((res) => {
        setRows([...res.data]);
        setFetching(false);
      });
  };

  const handleDetailPage = (id) => {
    navigate(`/resident/${id}`);
  };

  const [Type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);

    setFetching(true);
    axios
      .get(
        `https://apartment-manager-server.herokuapp.com/resident/?type=${event.target.value}`
      )
      .then((res) => {
        setRows([...res.data]);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });


  }

  /*
  import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
    }

   */

  return (
    <>
      <div style={{ margin: "10px 0px 10px 0px" }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Type}
              label="Type"
              onChange={handleChange}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"owner"}>Owner</MenuItem>
              <MenuItem value={"tenant"}>Tenant</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          type="text"
          onChange={handleFilterChange}
          placeholder="Search by block"
        />
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          onClick={() => handleSort("asc")}
        >
          Sort By Flat No &#x21D3;
        </Button>
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          onClick={() => handleSort("dsc")}
        >
          Sort By Flat No &#x21D1;
        </Button>
        <Button sx={{ m: 1 }} variant="outlined" onClick={() => fetchData()}>
          Reset
        </Button>
      </div>
      {fetching ? (
        <div>Loading...</div>
      ) : rows[0] ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700, textTransform: "capitalize" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>ID </StyledTableCell>
                <StyledTableCell>NAME </StyledTableCell>
                <StyledTableCell>TYPE</StyledTableCell>
                <StyledTableCell>BLOCK</StyledTableCell>
                <StyledTableCell>RESIDENT</StyledTableCell>
                <StyledTableCell>FLAT NO.</StyledTableCell>
                <StyledTableCell>IMAGE</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <StyledTableRow
                  key={row.id}
                  onClick={() => {
                    handleDetailPage(row._id);
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.type}</StyledTableCell>
                  <StyledTableCell>{row.flat_id.block}</StyledTableCell>
                  <StyledTableCell>
                    {row.flat_id.total_resident}
                  </StyledTableCell>
                  <StyledTableCell>{row.flat_id.flat_no}</StyledTableCell>
                  <StyledTableCell>{"no image"}</StyledTableCell>

                  {/* <StyledTableCell>
                    <Link to={`/add-city/${row.id}`}>{"Edit"}</Link>
                  </StyledTableCell> */}

                  {/* <StyledTableCell onClick={() => handleDelete(row.id)}>
                    <LoadingButton loading={row.id == isLoading}>
                      {"Delete"}
                    </LoadingButton>
                  </StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>No data</div>
      )}
    </>
  );
}
