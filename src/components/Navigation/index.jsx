import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Pickers from '../Pickers';
import Slider from '../Slider';
import DatePicker from '../DatePicker';
import { generateLastDaysLabel } from '../../utils/timeRangeUtils';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  pickers: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Navigation extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    benchmark: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    timeRange: PropTypes.number.isRequired,
  };

  handlePathChange = (event) => {
    const { name, value } = event.target;
    const {
      // eslint-disable-next-line react/prop-types
      history, platform, benchmark, timeRange,
    } = this.props;

    let newPlatform = platform;
    let newBenchmark = benchmark;
    if (name === 'platform') {
      newPlatform = value;
      newBenchmark = 'overview';
    } else {
      newBenchmark = value;
    }
    history.push(`/${newPlatform}/${newBenchmark}?numDays=${timeRange}`);
  };

  handleSearchParamChange = (searchParam, value) => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    history.push(`?${searchParam}=${value}`);
  };

  render() {
    const {
      classes, platform, benchmark, timeRange,
    } = this.props;
    const fortnightBack = new Date(Date.now() - 12096e5);
    const defaultStartTime = fortnightBack.toISOString().slice(0, 10);

    return (
      <div className={classes.root}>
        <div className={classes.pickers}>
          <Pickers
            onChange={this.handlePathChange}
            platform={platform}
            benchmark={benchmark}
          />
          <DatePicker
            label="Start date"
            defaultValue={defaultStartTime}
          />
        </div>
        <Slider
          identifier="timeRange"
          label="Time range"
          searchParam="numDays"
          selectedValue={timeRange}
          options={{ min: 1, max: 365, step: 1 }}
          onChangeUpdateTooltipFunc={generateLastDaysLabel}
          handleSliderChange={this.handleSearchParamChange}
        />
      </div>
    );
  }
}

// withRouter() allow us to use this.props.history to push a new address
export default withRouter((withStyles(styles))(Navigation));
