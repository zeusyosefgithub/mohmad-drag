import { useEffect, useState } from "react";
import { collection, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { firestore } from "./firebase";

export const useGetDataByCondition = (myCollection, value1, value2, value3) => {
    const [list, setList] = useState([]);
    const colle = collection(firestore, myCollection);
    const condition = where(value1, value2, value3);

    useEffect(() => {
        const q = query(colle, condition);
        const unsubscribe = onSnapshot(q, (snap) => {
            setList(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return () => unsubscribe();
    }, [myCollection, value1, value2, value3]);

    return list;
};

export const useGetDataByConditionWithoutUseEffect = async(myCollection, value1, value2, value3) => {
    const q = query(collection(firestore, myCollection), where(value1,value2,value3));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id : doc.id,
        ...doc.data()
    }));
};


export const useGetDataByConditionWithoutUseEffectWithTwo = async(myCollection, value1, value2, value3,value4,value5,value6) => {
    const q = query(collection(firestore, myCollection), where(value1,value2,value3),where(value4,value5,value6));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id : doc.id,
        ...doc.data()
    }));
};

export const useGetDataByLimit = async (myCollection, limt) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const q = query(collection(firestore, myCollection), orderBy("msbar",'asc'), limit(limt));
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });
        setData(items);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return data;
}



export const fetchDocumentByCondition = async (collectionName, conditionField, conditionValue) => {
    try {
        const q = query(
            collection(firestore, collectionName),
            where(conditionField, '==', conditionValue),
            limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null; // No matching document found
        }

        const doc = querySnapshot.docs[0];
        const data = doc.data();
        data.id = doc.id;

        return data;
    } catch (error) {
        console.error("Error fetching document:", error);
        throw new Error("Error fetching document");
    }
};


