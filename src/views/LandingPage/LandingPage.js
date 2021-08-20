import React, {useState, useEffect} from "react";

// node library for contatenating different classes
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import firebaseConfig from '../../firebase-config'
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";


import {GoogleLogin} from "react-google-login";
import Tilt from 'react-tilt';

import Dashboard from './Section/Dashboard';

import styles from "assets/jss/material-kit-react/views/landingPage.js"

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const dashboardRoutes = [];

const useStyles = makeStyles(styles);
firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};






export default function LandingPage(props) {
  
  const classes = useStyles();
  const { ...rest } = props;
  const [loading, setLoading] = useState(false);
  
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.



  const phone = useMediaQuery("(max-width: 700px)");

  //  insert the data into forestore collection
  const insertData = (data) => {
    firebase.firestore().collection('hostel-info').add(data)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <div>
      <Header
        routes={dashboardRoutes}
        brand="Newton School"
        fixed
        changeColorOnScroll={
          phone
            ? {
                height: 50,
                color: "success"
              }
            : {
                height: 400,
                color: "white"
              }
        }
        {...rest}
        isSignedIn={isSignedIn}
        setIsSignedIn={setIsSignedIn}
        firebase={firebase}
      />
      <div style={{marginTop: "150px"}}></div>
      <div className={classNames(classes.main, classes.mainRaised)} style={{marginBottom: "50px",marginTop: "50px"}}>
        <div className={classes.container} id="section1">
          {isSignedIn ? (
            // if user is Logged in then show the main contents
            <Dashboard
              firebase = {firebase}
              />
          ) : (
            <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ textAlign: "center" }}
                >
                  <h1
                    className={classes.title}
                    style={{ color: "#222", marginTop: "100px" }}
                  >
                    {"Welcome to Hostel Allocation"}
                  </h1>
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ textAlign: "center" }}
                >
                  <h4
                    className={classes.title}
                    style={{ color: "#222", marginTop: "100px" }}
                  >
                    {"Please Sign in"}
                  </h4>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Tilt
                    className="Tilt"
                    options={{ max: 25 }}
                    // style={{ height: 250, width: 250 }}
                    glare={true}
                  >
                    <div className="Tilt-inner">
                      <Card
                        className={classes.root}
                        style={{
                          textAlign: "center",
                          margin: "15vh 0",
                          minWidth: "200px",
                          boxShadow: "0 6px 20px rgba(200, 230, 201, 0.5)",
                          border: "2px #4CAF50 solid",
                          borderRadius: "10px"
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="h2"
                            style={{ color: "#388E3C" }}
                          >
                            Login to continue
                          </Typography>
                          <div style={{ marginTop: "25px", marginBottom: "10px" }}>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </Tilt>
                </GridItem>
              </GridContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
