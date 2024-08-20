'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";


export default function ModalAdconBret({ disable, show, motsar, categoryMotsar,motsarem }) {

    const [shem, setShem] = useState('');
    const [mherThlte, setMherThlte] = useState('');
    const [zmanAsbka, setZmanAsbka] = useState('');
    const [msbarMdaf,setMsbarMdaf] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setShem(motsar?.shem);
        setMherThlte(motsar?.alotLeheda);
        setZmanAsbka(motsar?.zmanHsbaka);
        setMsbarMdaf(motsar?.msbarMdaf);
    }, [motsar]);


    const checkAemShemMotsarKeam = () => {
        for (let index = 0; index < motsarem?.length; index++) {
            if(motsarem[index].shem === shem && motsarem[index].id !== motsar?.id){
                return true;
            }
        }
        return false;
    }

    const ResetAll = () => {
        setShem(motsar?.shem);
        setMherThlte(motsar?.alotLeheda);
        setZmanAsbka(motsar?.zmanHsbaka);
        setMsbarMdaf(motsar?.msbarMdaf);
        disable();
    }

    const AeshorAdcon = () => {
        if(shem !== motsar?.shem){
            return false;
        }
        if(mherThlte !== motsar?.alotLeheda){
            return false;
        }
        if(zmanAsbka !== motsar?.zmanHsbaka){
            return false;
        }
        if(msbarMdaf !== motsar?.msbarMdaf){
            return false;
        }
        return true;
    }

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="xl" isOpen={show} onClose={ResetAll}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center"></ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl" className="m-1 rounded-xl no-scrollbar overflow-auto sizeingForDivsModals">
                            <Avatar/>
                            <Input type="text" value={shem} onValueChange={(val) => setShem(val)} className="mt-5 max-w-[150px]" label="שם פריט" />
                            <Input type="text" value={msbarMdaf} onValueChange={(val) => setMsbarMdaf(val)} className="mt-5 max-w-[150px]" label="מספר מדף" />
                            <Input type="number" value={mherThlte} onValueChange={(val) => setMherThlte(val)} className="mt-5 max-w-[150px]" label="מחיר תחלתי" />
                            <Input type="number" value={zmanAsbka} onValueChange={(val) => setZmanAsbka(val)} className="mt-5 mb-5 max-w-[150px]" label="זמן הספקה בימים" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={ResetAll}>
                            סגור
                        </Button>
                        <Button isLoading={loading} isDisabled={AeshorAdcon()} size="lg" color="primary" onClick={async () => {
                            if(checkAemShemMotsarKeam()){
                                return;
                            }
                            setLoading(true);
                            await updateDoc(doc(firestore, 'mlae', motsar?.id), {
                                shem: shem,
                                alotLeheda: mherThlte,
                                zmanHsbaka: zmanAsbka,
                                msbarMdaf: msbarMdaf,
                                alot: parseFloat(mherThlte) * parseFloat(motsar?.kmot)
                            });
                            setLoading(false);
                            disable();
                        }}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}