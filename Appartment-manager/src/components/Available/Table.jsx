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
// import { valueToPercent } from "@mui/base";

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

export function CustomizedTables() {
  const [fetching, setFetching] = React.useState(false);

  const [rows, setRows] = React.useState([]);

  const navigate = useNavigate();

  const fetchData = () => {
    setFetching(true);
    axios
      .get("https://apartment-manager-server.herokuapp.com/flat")
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
    console.log(value);
    setFetching(true);
    axios
      .get(`https://apartment-manager-server.herokuapp.com/flat/?sort=${value}`)
      .then((res) => {
        setRows([...res.data]);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });
    

    // setRows(sorted);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      fetchData();
      return;
    }

    setFetching(true);
    axios
      .get(
        `https://apartment-manager-server.herokuapp.com/flat/?block=${value.toUpperCase()}`
      )
      .then((res) => {
        setRows([...res.data]);
        setFetching(false);
      });

  };

  const handleAllot = (id,status) => {

    if(status) return;
      
    setIsLoading(id);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/flat/${id}`);
    } , 1000);
   
  }

 

  return (
    <>
      <div style={{ margin: "10px 0px 10px 0px" }}>
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
                <StyledTableCell>BLOCK</StyledTableCell>
                <StyledTableCell>FLAT NO.</StyledTableCell>
                <StyledTableCell>Resident</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell>{row.block}</StyledTableCell>
                  <StyledTableCell>{row.flat_no}</StyledTableCell>
                  <StyledTableCell>{row.total_resident}</StyledTableCell>
                  <StyledTableCell>
                    {!row.status ? "Available" : "Not Available"}
                  </StyledTableCell>
                  {/* <StyledTableCell>
                    
                    {!row.status ? "Click to Allot" : "Not Available"}
                  </StyledTableCell> */}

                  {/* <StyledTableCell>
                    <Link to={`/add-city/${row.id}`}>{"Edit"}</Link>
                  </StyledTableCell> */}

                  <StyledTableCell
                    onClick={() => handleAllot(row._id, row.status)}
                  >
                    <LoadingButton
                      disabled={row.status}
                      loading={row._id == isLoading}
                      variant="outlined"
                      color="secondary"
                      // sx={{color:"black"}}
                    >
                      {"Click to Allot"}
                    </LoadingButton>
                  </StyledTableCell>
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
