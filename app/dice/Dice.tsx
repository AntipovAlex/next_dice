"use client";

import { useState } from "react";
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
import {
  AlertEnum,
  ColorEnum,
  GameData,
  RadioEnum,
} from "../interface/gameData.interface";
import { MARKS, MAX_RESULTS } from "../constants/Dice.constant";
import {
  alertStyle,
  buttonStyle,
  containerStyle,
  formControlStyle,
  sliderStyle,
  tableStyle,
} from "./Dice.style";

const Dice = () => {
  const [valueSlider, setValueSlider] = useState(20);
  const [valueRadio, setValueRadio] = useState<RadioEnum>(RadioEnum.Under);
  const [showAlert, setShowAlert] = useState("");
  const [dataResult, setDataResult] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    setValueSlider(newValue as number);
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value as RadioEnum);
  };

  const getRandom = () => {
    setLoading(true);

    const gameDate = new Date();
    const obj = {
      time: `${gameDate.getHours()}:${gameDate.getMinutes()}:${gameDate.getSeconds()}`,
      guess: valueRadio + " " + valueSlider,
      result: Math.floor(Math.random() * 101),
      color: "",
    };

    if (
      (valueRadio === RadioEnum.Under && obj.result < valueSlider) ||
      (valueRadio === RadioEnum.Over && obj.result > valueSlider)
    ) {
      setShowAlert(AlertEnum.Win);
      obj.color = ColorEnum.Green;
    }

    if (
      (valueRadio === RadioEnum.Under && obj.result > valueSlider) ||
      (valueRadio === RadioEnum.Over && obj.result < valueSlider)
    ) {
      setShowAlert(AlertEnum.Lose);
      obj.color = ColorEnum.Red;
    }

    setDataResult((prev) => {
      if (prev.length < MAX_RESULTS) return [obj, ...prev];
      const newObj = [obj, ...prev.slice(0, 9)];

      return newObj;
    });
    setLoading(false);
  };

  return (
    <Container sx={containerStyle}>
      {showAlert === AlertEnum.Win && (
        <Alert severity="success" variant="filled" sx={alertStyle}>
          <AlertTitle>You win</AlertTitle>
          Number was right.
        </Alert>
      )}
      {showAlert === AlertEnum.Lose && (
        <Alert severity="error" variant="filled" sx={alertStyle}>
          <AlertTitle>You lost</AlertTitle>
          Number was hight.
        </Alert>
      )}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={10}
      >
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
          {dataResult[0]?.result}
        </Box>
      </Box>
      <FormControl sx={formControlStyle}>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={valueRadio}
          onChange={handleChangeRadio}
        >
          <FormControlLabel
            value={RadioEnum.Under}
            control={<Radio color="secondary" />}
            label="Under"
          />
          <FormControlLabel
            value={RadioEnum.Over}
            control={<Radio color="secondary" />}
            label="Over"
          />
        </RadioGroup>
      </FormControl>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Slider
          sx={sliderStyle}
          size="small"
          color="secondary"
          orientation="horizontal"
          value={valueSlider}
          onChange={handleChangeSlider}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={100}
          marks={MARKS}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={buttonStyle}
          onClick={getRandom}
          disabled={loading}
        >
          Play
        </Button>
      </Box>

      <TableContainer>
        <Table sx={tableStyle} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="right">Guess</TableCell>
              <TableCell align="right">Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataResult.map((row, index) => (
              <TableRow key={index}>
                <TableCell scope="row">
                  {index} {row.time}
                </TableCell>
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
