import React from "react";
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


export default function HostelAllocation(props) {
    const { firebase } = props;
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
                    {"Choose your Hostel"}
                </h1>
                </GridItem>
                <GridItem
                xs={12}
                sm={12}
                md={12}
                style={{ textAlign: "center" }}
                >
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <div className="Tilt-inner"style={{ display: "flex", flexDirection:"row",justifyContent:"center", alignItems:"center"}}>
                        <div style={{ marginLeft: "50px", marginRight: "50px", cursor:"pointer" }}>
                            <Card
                            className={classes.root}
                            style={{
                            textAlign: "center",
                            margin: "15vh 0",
                            minWidth: 'auto',
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
                                    Girls Hostel
                                </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div style={{ marginLeft: "50px", marginRight: "50px", cursor:"pointer"}}>
                            <Card
                            className={classes.root}
                            style={{
                            textAlign: "center",
                            margin: "15vh 0",
                            minWidth: 'auto',
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
                                Boys Hostel
                            </Typography>
                            </CardContent>
                        </Card>
                        </div>
                    </div>
                </GridItem>
            </GridContainer>
    )
}