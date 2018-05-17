/**
 * This React class is intended to query an endpoint that will return an alphanumeric string, after clicking a button.
 * This component is passed a prop "apiQueryDelay", which delays the endpoint request by N milliseconds. There is a
 * second button to disable this functionality and have the endpoint request run immediately after button click.
 * This data is then to be displayed inside a simple container.
 * The "queryAPI" XHR handler will return the endpoint response in the form of a Promise (such as axios, fetch).
 * The response object will look like the following: {data: "A0B3HCJ"}
 * The containing element ref isn't used, but should remain within the class.
 * Please identify, correct and comment on any errors or bad practices you see in the React component class below.
 * Additionally, please feel free to change the code style as you see fit.
 * Please note - React version for this exercise is 15.5.4
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import queryAPI from 'queryAPI';
/**
 * Mock implementation of queryAPI
 */
function queryAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: `A0B3HCJ-${Math.random()}` });
    }, 1000);
  });
}

class ShowResultsFromAPI extends Component {
  displayName = 'ShowResultsFromAPI';

  constructor(props) {
    super(props);
    const { apiQueryDelay = 0 } = props;
    this.state = {
      data: undefined,
      error: false,
      apiQueryDelay,
    };
  }

  onDisableDelay() {
    this.setState({
      apiQueryDelay: 0,
    });
  }

  click() {
    const { apiQueryDelay = 0 } = this.state;
    if (apiQueryDelay) {
      return setTimeout(() => {
        this.fetchData();
      }, apiQueryDelay);
    }
    this.fetchData();
  }

  async fetchData() {
    let response;
    try {
      response = await queryAPI();
    } catch (e) {
      /**
       * I should display maybe more info to the user about what happened here,
       *  but from now is ok to log it on the console. Even though a service like
       *  rollbar.com will log it for us just like that.
       */
      console.error(e);
    }
    // We display an error if there was exception on queryAPI or they just not resolve anything
    if (response.data) {
      this.setState({
        data: response.data,
        error: false,
      });
    } else {
      this.setState({
        data: undefined,
        error: true,
      });
    }
  }

  render() {
    const { error, data, apiQueryDelay } = this.state;
    return (
      <div className="content-container" ref={divElement => (this.container = divElement)}>
        {error ? (
          <p>Sorry - there was an error with your request.</p>
        ) : (
          <p>{data || 'No data yet'}</p>
        )}
        <button onClick={() => this.onDisableDelay()} disabled={!apiQueryDelay}>
          Disable request delay
        </button>
        <button onClick={() => this.click()}>Request data from endpoint</button>
      </div>
    );
  }
}

export default ShowResultsFromAPI;

/**
 * Type Validations
 */
ShowResultsFromAPI.propTypes = {
  apiQueryDelay: PropTypes.number,
};

ShowResultsFromAPI.defaultProps = {
  apiQueryDelay: 0,
};
