import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

export default function GirlsHostel(props) {
    const classes = useStyles();
    const { firebase, floor, setFloor,isAllocated, setIsAllocated } = props;
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [hostel, setHostel] = React.useState('');
    const [room, setRoom] = React.useState(0);

    const handleClickOpen = (param) => {
        setRoom(param);
        setOpen(true);
    };

    const getCollection = async (collection) => {
        const snapshot = await firebase.firestore().collection(collection).get();
        return snapshot;
    }

    const handleHostel = (param) => {
        console.log(param);
        setHostel(param);
    }

    useEffect(() => {
        getCollection('boys').then(response => {
            if (response.empty) {
                console.log("no data found");
            } else {
                const snapshot = response;
            }
        })
    }, []);



    const handleClose = () => {
        setOpen(false);
        setIsAllocated(true);
        // update hostel-alloc collection in firestore
        console.log(firebase.auth().currentUser.uid);
        let data1 = {
            hostelno: hostel,
            roomno: room,
            type: 1,
            uuid: firebase.auth().currentUser.uid,
        }
        firebase.firestore().collection('hostel-alloc').add(data1)
                    .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function(error) {
                    console.error("Error adding document: ", error);
                    });
        let data2 = {
            isAllocated: true
        }
        const temp = firebase.firestore().collection('hostel-info').doc(firebase.auth().currentUser.uid)
        temp.update(data2)

    };
    return (
        <div className={classes.root}>
            {
                floor ? (
                <div className={classes.root}>
                    <ButtonGroup  color="primary" aria-label="outlined primary button group">
                    <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                        size="large" onClick = {() => handleClickOpen(1)} >1</Button>
                    <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                        size="large" onClick = {() => handleClickOpen(2)} >2</Button>
                    <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                        size="large" onClick = {() => handleClickOpen(3)} >3</Button>
                    <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                        size="large" onClick = {() => handleClickOpen(4)} >4</Button>
                </ButtonGroup>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <ButtonGroup  color="primary" aria-label="outlined primary button group">
                    <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                        size="large" onClick = {() => handleClickOpen(10)} >10</Button>
                    <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                        size="large" onClick = {() => handleClickOpen(5)} >5</Button>
                </ButtonGroup>
                </div>
                <ButtonGroup  color="primary" aria-label="outlined primary button group">
                    <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                        size="large" onClick = {() => handleClickOpen(9)}>9</Button>
                    <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                        size="large" onClick = {() => handleClickOpen(8)} >8</Button>
                    <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                        size="large" onClick = {() => handleClickOpen(7)} >7</Button>
                    <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                        size="large" onClick = {() => handleClickOpen(6)} >6</Button>
                </ButtonGroup>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Success"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                       Your Room has been booked
                       Successfully.
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                       Your room details are as follows : 
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                       Hostel No : {hostel}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                       Room No. : {room} 
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
                </div>
                ) : (
                    <div className={classes.root}>
                        <ButtonGroup  color="primary" aria-label="outlined primary button group">
                            <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                                size="large" onClick={()=> {setFloor(true)
                                                            handleHostel('G1')}}>G1</Button>
                            <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                                size="large" onClick={()=> {setFloor(true)
                                                            handleHostel('G2')}} >G2</Button>
                            <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                                size="large" onClick={()=> {setFloor(true)
                                                            handleHostel('G3')}} >G3</Button>
                        </ButtonGroup>
                        <ButtonGroup  color="primary" aria-label="outlined primary button group">
                        <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                            size="large" onClick={()=> {setFloor(true)
                                                            handleHostel('G4')}} >G4</Button>
                        <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                            size="large" onClick={()=> {setFloor(true)
                                                            handleHostel('G5')}} >G5</Button>
                        <Button style={{marginLeft: "10px", marginRight: '10px', border:"1px solid"}}
                            size="large" onClick={()=> {setFloor(true)
                                                            handleHostel('G6')}} >G6</Button>
                    </ButtonGroup>
                    </div>
                )
            }
        </div>      
    )
}