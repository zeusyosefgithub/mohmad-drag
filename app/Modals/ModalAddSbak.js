'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";


export default function ModalAddSobak({ disable, show }) {


    const [aer, setaer] = useState('');
    const [nead, setnead] = useState('');
    const [shem, setshem] = useState('');
    const [yeshov, setyeshov] = useState('');

    const counter = GetDocs('metadata');

    const AddSbak = async () => {
        initializeCounter();
        await addDoc(collection(firestore, "sbkem"), {
            aer: aer,
            msbar: counter[0]?.count,
            nead: nead,
            shem: shem,
            sherot  : 'A',
            yeshov : yeshov,
            ytratHeshvon : 0,
        });
        await updateDoc(doc(firestore,'metadata',counter[0]?.id),{count : counter[0]?.count + 1});
    }

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">הוספת ספק חדש</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl" className="m-1 rounded-xl no-scrollbar overflow-auto sizeingForDivsModals">
                            <Input value={shem} onValueChange={(val) => setshem(val)} className="mt-2" label="שם" />
                            <Input value={nead} onValueChange={(val) => setnead(val)} className="mt-2" label="נייד" />
                            <Input value={aer} onValueChange={(val) => setaer(val)} className="mt-2" label="עיר" />
                            <Input value={yeshov} onValueChange={(val) => setyeshov(val)} className="mt-2" label="ישוב" />
                            <div className="flex items-center mt-4">
                                <div className="ml-2">שירות :</div>
                                <Button isDisabled>מכירת חומרים</Button>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={disable}>
                            סגור
                        </Button>
                        <Button size="lg" color="primary" onClick={AddSbak}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}
async function initializeCounter() {
    const counterRef = doc(firestore, 'metadata', 'counterSbkem');
  
    const counterSnap = await getDoc(counterRef);
    if (!counterSnap.exists()) {
      await setDoc(counterRef, { count: 0 });
    }
}

