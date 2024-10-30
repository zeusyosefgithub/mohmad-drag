'use client';
import { collection, limit, onSnapshot, query } from "firebase/firestore";
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

export function GetDocsWithLimit(myCollection, limitCount) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const colle = collection(firestore, myCollection);

    useEffect(() => {
        setLoading(true); // Set loading to true before starting the query

        const q = query(colle, limit(limitCount));
        const unsubscribe = onSnapshot(q, (snap) => {
            setList(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoading(false); // Set loading to false after updating the list
        });

        return () => unsubscribe(); // Cleanup function to unsubscribe from snapshot listener
    }, [myCollection, limitCount]);

    return loading ? [] : list;
}

export function formatNumber(num) {
    if (isNaN(num)) return ''; // Check for invalid input

    const roundedNum = Math.round(num * 10) / 10; // Round to one decimal place
    const [integerPart, decimalPart] = roundedNum.toString().split('.'); // Split the number

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Format the integer part

    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger; // Reassemble the number
}
