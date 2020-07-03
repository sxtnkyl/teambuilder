import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Collapse,
  Typography,
} from "../../../theme/themIndex";

import moveJSON from "../../../utility/abilityAndMoves.json";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    background: "transparent",
  },
  table: {
    background: "transparent",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

//will receive arr of objects(single moves), made by makeMoves in moves component
//headers = [name,type,category,power,acc,prio,pp,descrip]
//obj { name, type, category, power, acc, prio, pp, effect_chance, descrip }

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, levelup } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: "name",
      numeric: false,
      label: "Name",
    },
    { id: "type", numeric: false, label: "Type" },
    { id: "category", numeric: false, label: "Category" },
    { id: "power", numeric: true, label: "Power" },
    { id: "acc", numeric: true, label: "Accuracy" },
    { id: "prio", numeric: true, label: "Priority" },
    { id: "pp", numeric: true, label: "PP" },
    { id: "effectchance", numeric: true, label: "Effect Chance" },
    { id: "descrip", numeric: false, label: "Description" },
  ];

  const withLevelup = [...headCells];
  withLevelup.splice(1, 0, {
    id: "lvl",
    numeric: true,
    label: "Learn at",
  });

  return (
    <TableHead>
      <TableRow>
        {(levelup ? withLevelup : headCells).map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableRow(props) {
  const [open, setOpen] = useState(false);
  const { index, levelup } = props;
  const {
    name,
    type,
    category,
    power,
    acc,
    prio,
    pp,
    effect_chance,
    descrip,
  } = props.row;
  return (
    <>
      <TableRow hover={true} tabIndex={-1} key={index}>
        <TableCell
          component="th"
          id={index}
          scope="row"
          padding="none"
          style={{ paddingLeft: "8px" }}
        >
          {name.toUpperCase()}
        </TableCell>
        {levelup && <TableCell align="right">{props.row.lvl}</TableCell>}
        <TableCell align="right">{type}</TableCell>
        <TableCell align="right">{category}</TableCell>
        <TableCell align="right">{power === null ? "-" : power}</TableCell>
        <TableCell align="right">{acc === null ? "-" : acc}</TableCell>
        <TableCell align="right">{prio}</TableCell>
        <TableCell align="right">{pp}</TableCell>
        <TableCell align="right">
          {effect_chance === null ? "-" : effect_chance}
        </TableCell>
        <TableCell
          align="right"
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        >
          ...
        </TableCell>
      </TableRow>

      <TableRow key={name}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography
              variant="body2"
              gutterBottom
              component="div"
              style={{
                fontWeight: "600",
                paddingTop: "8px",
                paddingBottom: "8px",
              }}
            >
              {descrip}
            </Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
const EnhancedTable = (props) => {
  const classes = useStyles();
  const { moveset, levelup } = props;
  //ascend or descend
  const [order, setOrder] = useState("asc");
  //by which column
  const [orderBy, setOrderBy] = useState(levelup ? "lvl" : "type");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  let rows = [];
  moveset.forEach((move) => {
    let moveData = moveJSON.moves.list[move.id].data;
    if (levelup === true) moveData.lvl = move.level_learned_at;
    rows.push(moveData);
  });

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            levelup={levelup}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (row, index) => {
                return (
                  <EnhancedTableRow
                    key={index}
                    row={row}
                    index={index}
                    levelup={levelup}
                  />
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default EnhancedTable;
