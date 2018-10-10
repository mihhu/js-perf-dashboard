import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 15,
    marginRight: 15,
  },
});

const DatePicker = ({
  classes, label, defaultValue,
}) => (
  <form className={classes.container} noValidate>
    <TextField
      id="date"
      label={label}
      type="date"
      defaultValue={defaultValue}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </form>
);

DatePicker.propTypes = {
  classes: PropTypes.shape().isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default withStyles(styles)(DatePicker);
