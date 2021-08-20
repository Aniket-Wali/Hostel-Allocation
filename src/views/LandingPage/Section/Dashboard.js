import React, {useState, useEffect} from 'react';

import Allocated from './Allocated';
import HostelAllocation from './HostelAllocation';

export default function Dashboard(props) {
    const { firebase } = props;
    const [isAllocated, setIsAllocated] = useState(false);

    const getCollection = async (collection) => {
        const snapshot = await firebase.firestore().collection(collection).get();
        let flag = 0
        snapshot.forEach(doc => {
            // print the data id and value
            console.log(`${doc.id} => ${doc.data().isAllocated}`);
            if(doc.id == firebase.auth().currentUser.uid) {
                if(doc.data().isAllocated == true) {
                    flag = 1;
                    console.log("Hello")
                    setIsAllocated(true);
                }
            }
        });
        if(flag == 0) {
            const temp = firebase.firestore().collection(collection).doc(firebase.auth().currentUser.uid);
            temp.set({isAllocated: false});
        }
    }

    // get firestore data only once
    useEffect(() => {
        getCollection('hostel-info')
    }, []);

    return (
        <div>
            {
                isAllocated ? (
                    <Allocated 
                        firebase={firebase}
                        isAllocated={isAllocated}
                        setIsAllocated={setIsAllocated}
                        />
                ): (
                    <HostelAllocation 
                        firebase={firebase}
                        isAllocated={isAllocated}
                        setIsAllocated={setIsAllocated}
                        />
                )
            }
        </div>
    )
}