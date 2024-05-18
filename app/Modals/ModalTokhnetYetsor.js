'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useGetDataByCondition } from "../FireBase/getDataByCondition";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";

export default function ModalTokhnetYetsor({ show, disable }) {

    const [motsaremShekhem, setMotsaremShekhem] = useState(null);

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const querySnapshot = await getDocs(collection(firestore, "category"));
                const docsArray = [];
                querySnapshot.forEach((doc) => {
                    docsArray.push({ id: doc.id, ...doc.data() });
                });
                setDocuments(docsArray);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        }
        fetchDocuments();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const docSnap = await getDoc(doc(firestore, 'balotX', 'X1'));
                if (docSnap.exists()) {
                    console.log(docSnap)
                    setMotsaremShekhem(docSnap.data().motsaremShekhem);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        }
        fetchData();
    }, []);

    function GetMotsarBrtem(remez){
        for (let index = 0; index < documents.length; index++) {
            let motsarem = documents[index].motsarem;
            for (let index1 = 0; index1 < motsarem.length; index1++) {
                if(motsarem[index1].sog === remez){
                    return motsarem[index1];
                }
            }
        }
        return;
    }

    return (
        <Modal placement="center" className="test-fontt max-w-[1000px]" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">הוספת תוכנית ייצור עגלה</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl">
                            {
                                motsaremShekhem?.map((motsar,index) => {
                                    return <div key={index}>{GetMotsarBrtem(motsar)?.shem}</div>
                                })
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={disable}>
                            סגור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}