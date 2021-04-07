import React, { Component } from "react";
import PropTypes from "prop-types";
import { isNullOrUndefined } from "util";
import shajs from "../node_modules/sha.js";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { withStyles } from "@material-ui/core/styles";
//import {  GoogleMap, Marker, Polygon } from 'react-google-maps'
//import { compose, withProps } from "recompose"
import Draggable from "react-draggable";
import moment from "moment";

//This is written based on guidelines from:
//https://github.com/transitive-bullshit/create-react-library#readme

export class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  render() {
    const { email, password, utcOffset } = this.props;

    function login(user) {
      return user.email;
    }

    var user = {
      email: email
    };

    return "hello";
  }
}

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// const Map = compose(
//   withProps({
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyBkgzbpJ2eOKjkJEMi1gUhEl3Pfub6t8Q0&libraries=places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap
//     defaultZoom={10}
//     center={{ lat: 0, lng: 0 }}
//     defaultOptions={{ controlSize: 25 }}
//   >
//     <Marker position={{ lat: 0, lng: 0 }} />
//     <Polygon path={props.geozone} />
//   </GoogleMap>
// ));

export class FundingSourceDialog extends Component {
  formatTime = input => {
    let hours = parseInt(input.substr(11, 2)),
      minutes = parseInt(input.substr(14, 2)),
      output,
      hoursFormatted,
      minutesFormatted,
      endingFormatted;

    hoursFormatted = hours.toString();
    if (hours < 12) {
      endingFormatted = "AM";
      if (hours == 0) hoursFormatted = "12";
    } else {
      endingFormatted = "PM";
      if (hours !== 12) hoursFormatted = (hours - 12).toString();
    }
    if (minutes != 0) {
      if (minutes < 10) minutesFormatted = ":0" + minutes;
      else minutesFormatted = ":" + minutes;
    } else minutesFormatted = "";
    return `${hoursFormatted}${minutesFormatted} ${endingFormatted}`;
  };
  render() {
    const styles = {
      title: {
        padding: "20px 20px 0px 30px",
        cursor: "move"
      },
      content: {
        padding: "20px 30px"
      },
      text: {
        color: "black",
        marginBottom: 5
      },
      exitButton: {
        margin: 5,
        padding: 5
      },
      table: {
        borderBottom: "none"
      },
      tableBold: {
        borderBottom: "none",
        fontWeight: "bold"
      },
      mapContainer: {
        height: "300px",
        width: "300px",
        marginTop: 10
      }
    };
    const { fundingSource, boldDay, closeForm } = this.props;
    const { programName, pickUpLOS, dropOffLOS, geozones } = fundingSource;
    const copay =
      fundingSource.fixedFee.clientCoPay !== null
        ? (fundingSource.fixedFee.clientCoPay * 1).toFixed(2)
        : (fundingSource.perMileFee.clientCoPay * 1).toFixed(2) + "/mile";
    const boldRow = boldDay ? boldDay : moment().format("dddd");
    let rows = [
      { day: "Sunday" },
      { day: "Monday" },
      { day: "Tuesday" },
      { day: "Wednesday" },
      { day: "Thursday" },
      { day: "Friday" },
      { day: "Saturday" }
    ];
    for (const [day, info] of Object.entries(
      JSON.parse(fundingSource.programCalendarRules)
    )) {
      let times = "";
      if (!info.Active) times = "No Service";
      else {
        const startTime = this.formatTime(info.StartJSON),
          endTime = this.formatTime(info.EndJSON);
        if (startTime === "12 AM" && endTime === "11:59 PM") times = "24 Hour";
        else times = `${startTime} to ${endTime}`;
      }
      rows[rows.findIndex(row => row.day === day)].times = times;
    }
    if (rows.every(row => row.times === "No Service"))
      rows.forEach((v, i) => (rows[i].times = "24 Hour"));
    return (
      <Dialog
        style={{ bottom: "auto", top: "32px" }}
        hideBackdrop={true}
        open={true}
        onClose={closeForm}
        PaperComponent={props => (
          <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
          >
            <Paper {...props} />
          </Draggable>
        )}
        aria-labelledby="draggable-dialog-title"
      >
        <Grid
          container
          justify="flex-end"
          style={{ position: "absolute", height: 0 }}
        >
          <IconButton onClick={closeForm} style={styles.exitButton}>
            <ClearIcon />
          </IconButton>
        </Grid>
        <DialogTitle style={styles.title} id="draggable-dialog-title">
          {programName}
        </DialogTitle>
        <DialogContent style={styles.content}>
          <Typography style={styles.text}>Cost (Copay$$$): ${copay}</Typography>
          <Typography style={styles.text}>
            Pick up level of service: {pickUpLOS}
          </Typography>
          <Typography style={styles.text}>
            Drop off level of service: {dropOffLOS}
          </Typography>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Day of week</TableCell>
                  <TableCell>Service Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.day}>
                    <TableCell
                      style={
                        boldRow === row.day ? styles.tableBold : styles.table
                      }
                      component="th"
                      scope="row"
                    >
                      {row.day}:
                    </TableCell>
                    <TableCell
                      style={
                        boldRow === row.day ? styles.tableBold : styles.table
                      }
                    >
                      {row.times}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <Map
            containerElement={<div style={styles.mapContainer} />}
            geozone={[
              { lat: 0.1, lng: 0.1 },
              { lat: -0.1, lng: 0.1 },
              { lat: -0.1, lng: -0.1 },
              { lat: 0.1, lng: -0.1 }
            ]}
          /> */}
        </DialogContent>
      </Dialog>
    );
  }
}

// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function config(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      config: {},
      entity: {}
    };
    let url =
      request.restUrl +
      "UserService/Config?Token=" +
      request.key +
      "&Device=" +
      request.device;

    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;
        rv.config = json.entity;
        rv.entity = json.entity;
        resolve(rv);
      })
      .catch(error => {
        rv.success = false;
        console.log(error);
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

export function approveRequest(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      request: {},
      stops: []
    };
    let url =
      request.restUrl +
      "TripService/ApproveTripRequest?Token=" +
      request.key +
      "&Device=" +
      request.device;

    console.log(url);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(request.tripRequest),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;
        rv.request = json.request;
        rv.stops = json.stops;
        resolve(rv);
      })
      .catch(error => {
        rv.success = false;
        console.log(error);
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}
// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function scheduleTrip(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      trip: {},
      entity: {}
    };
    let url =
      request.restUrl +
      "TripService/ScheduleTrip?Token=" +
      request.key +
      "&Device=" +
      request.device +
      "&FleetManagerId=" +
      request.fleetManagerId;

    console.log(url);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(request.trip),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;
        rv.trip = json.entity;
        rv.entity = json.entity;
        resolve(rv);
      })
      .catch(error => {
        rv.success = false;
        console.log(error);
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function rejectRequest(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      request: {},
      entity: {}
    };
    let url =
      request.restUrl +
      "TripService/RejectTripRequest?Token=" +
      request.key +
      "&Device=" +
      request.device +
      "&Reason=" +
      encodeURIComponent(request.rejectReason) +
      "&NotifyRider=true";

    console.log(url);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(request.tripRequest),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;
        rv.request = json.entity;
        rv.entity = json.entity;
        resolve(rv);
      })
      .catch(error => {
        rv.success = false;
        console.log(error);
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function unscheduleTrip(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      trip: {},
      entity: {}
    };
    let url =
      request.restUrl +
      "TripService/UnscheduleTrip?Token=" +
      request.key +
      "&Device=" +
      request.device;

    console.log(url);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(request.trip),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;
        rv.trip = json.entity;
        resolve(rv);
      })
      .catch(error => {
        rv.success = false;
        console.log(error);
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [ ] Update documentation
export function addTrip(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      request: {},
      entity: {}
    };
    let url =
      request.restUrl +
      "TripService/AddTrip?Token=" +
      request.key +
      "&Device=" +
      request.device;

    console.log(url);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(request.trip),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;
        rv.entity = json.trip;
        resolve(rv);
      })
      .catch(error => {
        rv.success = false;
        console.log(error);
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Standerize return object
// - [x] Update documentation
// - [x] Remove proper return type after August 1
export function routes(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    let url =
      request.restUrl +
      "TripService/FleetmanagersInWrapper?Token=" +
      request.key +
      "&Device=" +
      request.device +
      "&Date=" +
      request.tripDate;

    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;

        if (json.list.length === 0) {
          resolve(rv);
          return;
        }

        rv.list = json.list;
        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

export function routesByRange(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    let url =
      request.restUrl +
      "TripService/FleetmanagersInWrapper?Token=" +
      request.key +
      "&Device=" +
      request.device +
      "&startRange=" +
      request.startRange +
      "&endRange=" +
      request.endRange;

    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;

        if (json.list.length === 0) {
          resolve(rv);
          return;
        }

        rv.list = json.list;
        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

export function allVehicles(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    let url =
      request.restUrl +
      "RouteService/Vehicles?Token=" +
      request.key +
      "&Device=" +
      request.device;

    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;

        if (json.list.length === 0) {
          resolve(rv);
          return;
        }
        rv.list = json.list;
        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

export function allRoutes(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    let url =
      request.restUrl +
      "RouteService/AllRoutes?Token=" +
      request.key +
      "&Device=" +
      request.device;

    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;

        if (json.list.length === 0) {
          resolve(rv);
          return;
        }
        rv.list = json.list;
        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

export function allDrivers(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    let url =
      request.restUrl +
      "RouteService/Drivers?Token=" +
      request.key +
      "&Device=" +
      request.device;

    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;

        if (json.list.length === 0) {
          resolve(rv);
          return;
        }
        rv.list = json.list;
        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function tripRequests(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      requests: [],
      list: []
    };

    var url =
      request.restUrl +
      "TripService/RequestedTrips?Token=" +
      request.key +
      "&Device=" +
      request.device +
      "&TripSource=any&TripStatus=all" +
      "&DateRangeStart=" +
      request.startDateTime +
      "&DateRangeEnd=" +
      request.endDateTime;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        console.log(json);

        rv.success = true;
        rv.requests = json.list;
        rv.list = json.list;

        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Standerize return object
// - [x] Update documentation
// - [ ] Remove proper return type after August 1
export function trips(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      trips: [],
      list: []
    };

    //request
    // .restUrl
    // .key
    // .device
    // .startTime
    // .endTime

    var url =
      request.restUrl +
      "TripService/TripsForDispatchers?Token=" +
      request.key +
      "&Device=" +
      request.device +
      "&StartTime=" +
      request.startTime +
      "&EndTime=" +
      request.endTime;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }
        rv.success = true;
        rv.trips = json.list;
        rv.list = json.list;

        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

export function login(user) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      restUrl: "",
      key: ""
    };
    if (isNullOrUndefined(user.email) || user.email === "") {
      rv.errorMessage = "Please populate .email";
      reject(rv);
      return;
    }
    if (isNullOrUndefined(user.password) || user.password === "") {
      rv.errorMessage = "Please populate .password";
      reject(rv);
      return;
    }
    if (isNullOrUndefined(user.device) || user.device === "") {
      rv.errorMessage = "Please populate .device";
      reject(rv);
      return;
    }
    if (isNullOrUndefined(user.version) || user.version === "") {
      rv.errorMessage = "Please populate .version";
      reject(rv);
      return;
    }
    if (isNullOrUndefined(user.utcOffset) || user.utcOffset === "") {
      rv.errorMessage = "Please populate .utcOffset";
      reject(rv);
      return;
    }

    var url =
      "https://aws.engraph.com/ParaPlanREST/UserService/Login?UserName=" +
      encodeURIComponent(user.email) +
      "&Password=" +
      shajs("sha512")
        .update(user.password)
        .digest("hex")
        .toUpperCase() +
      "&Device=" +
      user.device +
      "&Version" +
      user.version +
      "&UTCOffset=" +
      user.utcOffset;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          console.log("success === false");
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        if (json.PPPAccess !== 1) {
          console.log("portal not available");
          rv.success = false;
          rv.errorMessage = "Portal access is not available";
          reject(rv);
          return;
        }

        resolve(json);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Need to document
export function clientSearch(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    var url =
      request.restUrl +
      "ClientService/Search/?Token=" +
      request.key +
      "&Device=" +
      request.device +
      "&Value=" +
      request.search;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        console.log(json);

        rv.success = true;
        rv.list = json.list;

        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Need to document
export function programs(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    var url =
      request.restUrl +
      "ProgramService/Programs/?Token=" +
      request.key +
      "&Device=" +
      request.device;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        console.log(json);

        rv.success = true;
        rv.list = json.list;

        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Need to document
export function placeSearch(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    var url =
      request.restUrl +
      "PlaceService/Search/?Token=" +
      request.key +
      "&Device=" +
      request.device +
      "&Value=" +
      request.search;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        console.log(json);

        rv.success = true;
        rv.list = json.list;

        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Need to document
export function placesOnDemand(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    var url =
      request.restUrl +
      "PlaceService/OnDemand?Token=" +
      request.key +
      "&Device=" +
      request.device;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        console.log(json);

        rv.success = true;
        rv.list = json.list;

        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Need to document
export function purposes(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    var url =
      request.restUrl +
      "TripPurposeService/Purposes/?Token=" +
      request.key +
      "&Device=" +
      request.device;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        console.log(json);

        rv.success = true;
        rv.list = json.list;

        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Need to document
export function statusTypes(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    var url =
      request.restUrl +
      "ClientService/StatusTypes/?Token=" +
      request.key +
      "&Device=" +
      request.device;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        console.log(json);

        rv.success = true;
        rv.list = json.list;

        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

// - [x] Need to document
export function wheelchairTypes(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: "",
      list: []
    };
    var url =
      request.restUrl +
      "WheelchairTypeService/WheelchairTypes/?Token=" +
      request.key +
      "&Device=" +
      request.device;
    console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        console.log(json);

        rv.success = true;
        rv.list = json.list;

        resolve(rv);
      })
      .catch(() => {
        rv.success = false;
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

export function changePassword(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: ""
    };
    let url =
      request.restUrl +
      "UserService/ChangePassword?Token=" +
      request.key +
      "&Device=" +
      request.device;

    console.log(url);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(request.changePassword),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.success = true;
        resolve(rv);
      })
      .catch(error => {
        rv.success = false;
        console.log(error);
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

export function saveFleetmanager(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: ""
    };
    let url =
      request.restUrl +
      "RouteService/SaveFleetmanager?Token=" +
      request.key +
      "&Device=" +
      request.device;

    console.log(url);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(request.fleetmanager),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        rv.fleetmanagerId = json.fleetmanagerId;
        rv.success = true;
        resolve(rv);
      })
      .catch(error => {
        rv.success = false;
        console.log(error);
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}

export function savePlace(request) {
  var promise = new Promise((resolve, reject) => {
    var rv = {
      success: false,
      errorMessage: ""
    };
    let url =
      request.restUrl +
      "PlaceService/Save?Token=" +
      request.key +
      "&Device=" +
      request.device;

    console.log(url);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(request.place),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success === false) {
          rv.success = false;
          rv.errorMessage = json.errorMessage;
          reject(rv);
          return;
        }

        resolve(json);
      })
      .catch(error => {
        rv.success = false;
        console.log(error);
        rv.errorMessage = "Unknown error";
        reject(rv);
      });
  });

  return promise;
}
