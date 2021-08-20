import React, {useEffect} from 'react';
// nodejs library that concatenate classes
import classNames from "classnames";
import {GoogleLogout} from "react-google-login";

import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

import styles from "assets/jss/material-kit-react/components/headerStyle.js";

const useStyles = makeStyles(styles);


export default function Header(props) {
    const classes = useStyles();
    const {setEmail, isSignedIn, setIsLoggedIn, firebase} = props;

    const logout = () => {
        setEmail("");
        setIsLoggedIn(false);
    }
    useEffect(() => {
        if(props.changeColorOnScroll){
            window.addEventListener('scroll', () => {
                const { color, changeColorOnScroll } = props;
                const windowsScrollTop = window.pageYOffset;
                if (windowsScrollTop > changeColorOnScroll.height) {
                document.body
                    .getElementsByTagName("header")[0]
                    .classList.remove(classes[color]);
                document.body
                    .getElementsByTagName("header")[0]
                    .classList.add(classes[changeColorOnScroll.color]);
                } else {
                document.body
                    .getElementsByTagName("header")[0]
                    .classList.add(classes[color]);
                document.body
                    .getElementsByTagName("header")[0]
                    .classList.remove(classes[changeColorOnScroll.color]);
                }
            });
        }
    });
    const { color, leftLinks, brand, fixed, absolute } = props;
    const appBarClasses = classNames({
        [classes.appBar]: true,
        [classes[color]]: color,
        [classes.absolute]: absolute,
        [classes.fixed]: fixed
    });
    const brandComponent = <Button className={classes.title}>{brand}</Button>;
    return (
        <AppBar className={appBarClasses}>
        <Toolbar className={classes.container}>
            {leftLinks !== undefined ? brandComponent : null}
            <div className={classes.flex}>
            {leftLinks !== undefined ? (
                <Hidden smDown implementation="css">
                {leftLinks}
                </Hidden>
            ) : (
                brandComponent
            )}
            </div>
            {
                isSignedIn ? (
                    <a style={{cursor: 'pointer'}} onClick={() => firebase.auth().signOut()}>Sign-out</a>
                    ) : null
            }
        </Toolbar>
        </AppBar>
    );
    }

    Header.defaultProp = {
    color: "white"
    };

    Header.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
    ]),
    leftLinks: PropTypes.node,
    brand: PropTypes.string,
    fixed: PropTypes.bool,
    absolute: PropTypes.bool,
    changeColorOnScroll: PropTypes.shape({
        height: PropTypes.number.isRequired,
        color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
        ]).isRequired
    })
}