import React, {useEffect} from "react";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Tilt from 'react-tilt';
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/views/landingPage.js"

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(styles);

export default function Allocated(props) {
    const { firebase } = props;
    const [room, setRoom] = React.useState(0);
    const [hostel, setHostel] = React.useState(0);

    const getCollection = async (collection) => {
        const snapshot = await firebase.firestore().collection(collection).get();
        snapshot.forEach(doc => {
            // print the data id and value
            console.log(`${doc.id} => ${doc.data().isAllocated}`);
            if(doc.data().uuid == firebase.auth().currentUser.uid) {
                console.log("Hello")
                setHostel(doc.data().hostelno);
                setRoom(doc.data().roomno);
            }
        });
    }

    useEffect(() => {
        getCollection('hostel-alloc')
    }, []);


    const classes = useStyles();
    return (
            <GridContainer justify="center">
                <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{ textAlign: "center" }}
                >
                <h1
                    className={classes.title}
                    style={{ color: "#222", marginTop: "20px" }}
                >
                    {"Welcome " + firebase.auth().currentUser.displayName}
                </h1>
                </GridItem>
                <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{ textAlign: "left" }}
                >
                <h4
                    className={classes.title}
                    style={{ color: "#222", marginTop: "50px" }}
                >
                    {"You have already booked a room"}
                </h4>
                </GridItem>
                <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{ textAlign: "left" }}
                >
                <h4
                    className={classes.title}
                    style={{ color: "#222", marginTop: "50px" }}
                >
                    {"Your Room Details are as follows:"}
                </h4>
                </GridItem>
                <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{ textAlign: "left" }}
                >
                <h4
                    className={classes.title}
                    style={{ color: "#222", marginTop: "50px" }}
                >
                    {"Hostel No : "}
                </h4>
                <h4
                    className={classes.title}
                    style={{ color: "#FF0000", marginLeft: "10px" }}
                >
                    {hostel}
                </h4>
                </GridItem>
                <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{ textAlign: "left" }}
                >
                <h4
                    className={classes.title}
                    style={{ color: "#222", marginTop: "50px" }}
                >
                    {"Room No : "}
                </h4>
                <h4
                    className={classes.title}
                    style={{ color: "#FF0000", marginLeft: "10px" }}
                >
                    {room}
                </h4>
                </GridItem>

            </GridContainer>
    )
}