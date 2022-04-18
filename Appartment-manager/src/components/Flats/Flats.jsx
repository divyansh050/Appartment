import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import { loginReq } from "../../Redux/action";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";

export function Flats() {
  const [fetching, setFetching] = React.useState(false);

  const {id} = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    name: "",
    gender:"",
    flat_id: id,
    total_residents:"",
    age: "",
    type: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...values,
  //     showPassword: !values.showPassword,
  //   });
  // };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = () => {
    // console.log(values)
    setFetching(true);
    axios
      .post("https://apartment-manager-server.herokuapp.com/resident", {
        ...values,
      })
      .then((res) => {
        // console.log(res.data)
        setFetching(false);

        navigate("/available_flat_details");
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
            <Input
              id="standard-adornment-password"
              type="text"
              value={values.name}
              onChange={handleChange("name")}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Age</InputLabel>
            <Input
              id="standard-adornment-password"
              type="number"
              value={values.age}
              onChange={handleChange("age")}
            />
          </FormControl>

        </div>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Type</InputLabel>
            
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.type}
              label="Type"
              onChange={handleChange("type")}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"owner"}>Owner</MenuItem>
              <MenuItem value={"tenant"}>Tenant</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Gender
            </InputLabel>
           
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.gender}
              label="Type"
              onChange={handleChange("gender")}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>

         
        </div>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <div>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Total Resident
            </InputLabel>
           
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.total_resident}
              label="Type"
              onChange={handleChange("total_resident")}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
            </Select>
          </FormControl>
          

         
        </div>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <LoadingButton
          disabled={
            values.name == "" ||
            values.age == "" ||
            values.gender === "" ||
            values.total_resident === "" ||
            values.type === ""
          }
          loading={fetching}
          variant="outlined"
          onClick={() => handleSubmit()}
        >
          Confirm Submit
        </LoadingButton>
      </Box>
    </>
  );
}

