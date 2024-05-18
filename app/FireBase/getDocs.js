'use client';
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { useEffect, useState } from "react";

export default function GetDocs(myCollection) {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const colle = collection(firestore, myCollection);

    useEffect(() => {
        const unsubscribe = onSnapshot(colle, (snap) => {
            setList(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoading(false); // Set loading to false after updating the list
        });

        return () => unsubscribe(); // Cleanup function to unsubscribe from snapshot listener
    }, [myCollection]);

    return loading ? [] : list;
}