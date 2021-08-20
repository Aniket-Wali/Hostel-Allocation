import React, {useState, useEffect} from 'react';

import Allocated from './Allocated';
import HostelAllocation from './HostelAllocation';

export default function Dashboard(props) {
    const { firebase } = props;
    const [isAllocated, setIsAllocated] = useState(false);

    const getCollection = async (collection) => {
        const snapshot = await firebase.firestore().collection(collection).get();
        snapshot.forEach(doc => {
            if(doc.id == firebase.auth().currentUser.uid) {
                return {state : true,
                        snapshot : snapshot};
            }
        });
        return {state: false,
                snapshot : snapshot};
    }

    // get firestore data only once
    useEffect(() => {
        getCollection('hostel-info').then(response => {
            if (!response.state) {
                console.log("cjncj");
                let data = {
                    isAllocated: false
                }
                firebase.firestore().collection('hostel-info').doc(firebase.auth().currentUser.uid).set(data)
                    .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function(error) {
                    console.error("Error adding document: ", error);
                    });
            } else {
                const {snapshot} = response;
                // print the data of snapshot
                snapshot.forEach(doc => {
                    if(doc.id == firebase.auth().currentUser.uid) 
                        if(doc.isAllocated === true)
                            setIsAllocated(true);
                });
            }
        })
    }, []);

    return (
        <div>
            {
                isAllocated ? (
                    <Allocated 
                        firebase={firebase}
                        />
                ): (
                    <HostelAllocation 
                        firebase={firebase}
                        />
                )
            }
        </div>
    )
}