"use client";

import { useCallback, useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { AlertEnum, GameData } from "../interface/gameData.interface";

let dataResult: GameData[] = [];

const Dice = () => {
  const [valueSlider, setValueSlider] = useState<number>(20);
  const [valueRadio, setValueRadio] = useState("Under");
  const [showAlert, setShowAlert] = useState<string>("");

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setValueSlider(newValue as number);
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value);
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "",
    },
    {
      value: 20,
      label: "",
    },
    {
      value: 30,
      label: "",
    },
    {
      value: 40,
      label: "",
    },
    {
      value: 50,
      label: "",
    },
    {
      value: 60,
      label: "",
    },
    {
      value: 70,
      label: "",
    },
    {
      value: 80,
      label: "",
    },
    {
      value: 90,
      label: "",
    },
    {
      value: 100,
      label: "100",
    },
  ];

  const getRandom = useCallback(() => {
    let obj = {
      time: Date.now().toString(),
      guess: valueRadio + " " + valueSlider,
      result: Math.floor(Math.random() * 101),
      color: "",
    };

    // console.log("value1", valueRadio);
    // console.log("obj.result", obj.result);
    // console.log("value", valueSlider);
    if (
      (valueRadio === "Under" && obj.result < valueSlider) ||
      (valueRadio === "Over" && obj.result > valueSlider)
    ) {
      setShowAlert(AlertEnum.Win);
      obj.color = "green";
    }

    if (
      (valueRadio === "Under" && obj.result > valueSlider) ||
      (valueRadio === "Over" && obj.result < valueSlider)
    ) {
      setShowAlert(AlertEnum.Lose);
      obj.color = "red";
    }

    console.log("obj", obj);

    dataResult.push(obj);
  }, [valueRadio, valueSlider]);

  return (
    <Container
      sx={{
        p: 1,
        width: 600,
        margin: "auto",
        display: "block",
        alignContent: "center",
      }}
    >
      {showAlert === AlertEnum.Win && (
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: 600, height: 76, margin: "auto" }}
        >
          <AlertTitle>You win</AlertTitle>
          Number was right.
        </Alert>
      )}
      {showAlert === AlertEnum.Lose && (
        <Alert
          severity="error"
          variant="filled"
          sx={{
            width: 600,
            height: 76,
            margin: "auto",
          }}
        >
          <AlertTitle>You lost</AlertTitle>
          Number was hight.
        </Alert>
      )}
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box
          height={200}
          width={320}
          my={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="#DCDCDC"
          fontSize={100}
          p={2}
        >
          {dataResult.reverse()[0]?.result}
        </Box>
      </Box>
      <FormControl
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={valueRadio}
          onChange={handleChangeRadio}
        >
          <FormControlLabel
            value="Under"
            control={<Radio color="secondary" />}
            label="Under"
          />
          <FormControlLabel
            value="Over"
            control={<Radio color="secondary" />}
            label="Over"
          />
        </RadioGroup>
      </FormControl>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Slider
          sx={{ width: 320 }}
          size="small"
          color="secondary"
          orientation="horizontal"
          value={valueSlider}
          onChange={handleChangeSlider}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={100}
          marks={marks}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            width: 320,
            height: 42,
          }}
          onClick={getRandom}
        >
          Play
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="right">Guess</TableCell>
              <TableCell align="right">Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataResult.map((row) => (
              <TableRow key={row.time}>
                <TableCell scope="row">{row.time}</TableCell>
                <TableCell align="right">{row.guess}</TableCell>
                <TableCell sx={{ color: row.color }} align="right">
                  {row.result}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dice;
