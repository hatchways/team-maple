import React, { useState, useEffect } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import {
  Paper,
  Typography,
  CssBaseline,
  InputLabel,
  TextField,
  Grid,
  withStyles,
  InputAdornment,
  TextareaAutosize,
  GridList,
  GridListTile,
  Button,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { grey } from "@material-ui/core/colors";
import DateFnsUtils from '@date-io/date-fns';
import { getDefaultImages, createContest } from "../actions/contestActions";

const styles = theme => ({
  label: {
    color: theme.secondary,
    fontWeight: "bold",
  },
  container: {
    paddingTop: theme.spacing(8),
  },
  firstRow: {
    marginBottom: theme.spacing(6),
  },
  secondRow: {
    marginBottom: theme.spacing(8),
  },
  textArea: {
    marginTop: theme.spacing(1),
    width: "100%",
    padding: theme.spacing(1),
  },
  thirdRow: {
    marginBottom: theme.spacing(1),
  },
  prizeInput: {
    width: "90%"
  },
  pictureLabel: {
    marginBottom: theme.spacing(1),
  },
  pictureHelperLabel: {
    color: grey[500],
    display: "inline-block",
    marginBottom: theme.spacing(3),
  },
  gridListPaper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  submit: {
    color: "white",
    backgroundColor: theme.secondary,
    padding: theme.spacing(2, 5),
    marginBottom: theme.spacing(5),
  }
})

const CreateContestForm = ({ classes, defaultImages, getDefaultImages, createContest }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prize, setPrize] = useState(0);
  const [deadline, setDeadline] = useState(Date.now());
  const [selectedLinks, setSelectedLinks] = useState([]);
  
  useEffect(() => {
    if (!defaultImages || defaultImages.length === 0) {
      getDefaultImages();
    }
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContest = {
      title,
      description,
      prize,
      deadline,
      images: selectedLinks,
    };
    createContest(newContest);
  }


  const handleImageSelect = (e) => {
    const fullUrlArray = e.target.src.split("/");
    const url = fullUrlArray[fullUrlArray.length - 1];
    const index = selectedLinks.indexOf(url);
    if (index === -1) {
      setSelectedLinks([...selectedLinks, url]);
    } else {
      setSelectedLinks(selectedLinks.filter(link => link !== url));
    }
  }

  const handleDeadlineChange = e => {
    setDeadline(e);
  }
  return (
    <>
      <CssBaseline />
      <Paper>
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12} sm={10} md={8}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container className={classes.firstRow} spacing={0}>
                  <Grid item xs={6}>
                    <InputLabel className={classes.label}>What do you need designed?</InputLabel>
                  </Grid>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Write a descriptive contest title"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                </Grid>
                <Grid container className={classes.secondRow} spacing={0}>
                  <InputLabel className={classes.label}>Description</InputLabel>
                  <TextareaAutosize
                    aria-label="minimum height"
                    rows={10}
                    margin="normal"
                    variant="outlined"
                    placeholder="Details about what type of tattoo you want"
                    className={classes.textArea}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid container className={classes.thirdRow} spacing={0}>
                  <Grid item xs={4}>
                    <InputLabel className={classes.label}>Prize amount</InputLabel>
                  </Grid>
                  <InputLabel className={classes.label}>Deadline</InputLabel>
                </Grid>
                <Grid container className={classes.fourthRow}>
                  <Grid item xs={4}>
                    <TextField
                      type="number"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      placeholder="100.00"
                      className={classes.prizeInput}
                      required
                      value={prize}
                      onChange={e => setPrize(e.target.value)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        inputProps: {
                          min: 1,
                          step: 0.01,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        inputVariant="outlined"
                        format="dd MMM yyyy"
                        disablePast
                        value={deadline}
                        onChange={handleDeadlineChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        />
                      <KeyboardTimePicker
                        margin="normal"
                        inputVariant="outlined"
                        value={deadline}
                        onChange={handleDeadlineChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
                <Typography variant="h6" className={classes.pictureLabel}>
                  Which designs do you like?
                </Typography>
                <Typography variant="body" className={classes.pictureHelperLabel}>
                  Let's start by helping your designers understand which styles you prefer.
                </Typography>
                <Paper className={classes.gridListPaper}>
                  <GridList cellHeight={160} className={classes.gridList} spacing={4} cols={4}>
                    {defaultImages && defaultImages.map(image => (
                      <GridListTile key={image} cols={1} onClick={handleImageSelect}>
                        <img src={`${process.env.REACT_APP_S3_URL}/default/${image}`} alt={"tattoo"} />
                      </GridListTile>
                    ))}
                  </GridList>
                </Paper>
                <Grid container justify="center">
                  <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      className={classes.submit}
                  >
                      Create Contest
                  </Button>`
                </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

const mapStateToProps = ({ defaultImages }) => ({
  defaultImages
});

const mapDispatchToProps = {
  getDefaultImages,
  createContest,
}

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(CreateContestForm);