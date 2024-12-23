'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import Image from "next/image";
import { GetTmonatHelek } from "../page";
import { TbArrowBigLeftFilled } from "react-icons/tb";
import { TbArrowBigRightFilled } from "react-icons/tb";


export default function ModalAdconBret({ disable, show, motsar, categoryMotsar, motsarem, mlae, mlae2,snefMlae }) {

    const [shem, setShem] = useState('');
    const [mherThlte, setMherThlte] = useState(0);
    const [mherMkhera, setMherMkhera] = useState(0);
    const [msbarMdaf, setMsbarMdaf] = useState(0);
    const [kmot1, setKmot1] = useState(0);
    const [kmot2, setKmot2] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setShem(motsar?.shem);
        setMherThlte(motsar?.alotLeheda);
        setMsbarMdaf(motsar?.msbarMdaf);
        setMherMkhera(motsar?.mherMkhera);
    }, [motsar]);

    const GetKmotMotsar = (array) => {
        if (!array || !motsar?.shem) return 0;
        const match = array.find(item => item.shem === motsar.shem);
        return match?.kmot || 0;
    };

    const CheckIfMotsarKeamInShteeMlaeem = () => {
        if (!motsar?.shem) return false;
        const isInMlae1 = mlae.some(item => item.shem === motsar.shem);
        const isInMlae2 = mlae2.some(item => item.shem === motsar.shem);
        return isInMlae1 && isInMlae2;
    };

    useEffect(() => {
        if(CheckIfMotsarKeamInShteeMlaeem()){
            setKmot1(GetKmotMotsar(mlae));
            setKmot2(GetKmotMotsar(mlae2));
        }
    }, [mlae, mlae2, motsar]);

    const checkAemShemMotsarKeam = () => {
        if (!motsarem || !shem || !motsar?.id) return false;
        return motsarem.some(item => item.shem === shem && item.id !== motsar.id);
    };

    const ResetAll = () => {
        setShem(motsar?.shem);
        setMherThlte(motsar?.alotLeheda);
        setMsbarMdaf(motsar?.msbarMdaf);
        setMherMkhera(motsar?.mherMkhera);
        disable();
    }

    const AeshorAdcon = () => {
        if (shem !== motsar?.shem) {
            return false;
        }
        if (mherThlte !== motsar?.alotLeheda) {
            return false;
        }
        if (msbarMdaf !== motsar?.msbarMdaf) {
            return false;
        }
        if (mherMkhera !== motsar?.mherMkhera) {
            return false;
        }
        if(kmot1 !== GetKmotMotsar(mlae) || kmot2 !== GetKmotMotsar(mlae2)){
            return false;
        }
        return true;
    }

    const GetAdconMotsarem = (val, array, snefMlaeCur) => {
        return array.map(item => {
            if (item.shem === motsar.shem) {
                return {
                    ...item,
                    shem: snefMlaeCur ? shem : item.shem,
                    alotLeheda: snefMlaeCur ? mherThlte : item.alotLeheda,
                    kmot: val,
                    mherMkhera: snefMlaeCur ? mherMkhera : item.mherMkhera,
                    msbarMdaf: snefMlaeCur ? msbarMdaf : item.msbarMdaf,
                };
            }
            return item;
        });
    };

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="xl" isOpen={show} onClose={ResetAll}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center bg-white border-b-1">עדכון פריט {shem}</ModalHeader>
                    <ModalBody className="shadow-2xl bg-white">
                        <div dir="rtl" className="m-1 rounded-xl no-scrollbar overflow-auto sizeingForDivsModals">
                            <Image src={GetTmonatHelek(motsar?.categoryMotsar)} className="rounded-full h-[100px] w-[100px]" />
                            <Input type="text" value={shem} onValueChange={(val) => setShem(val)} className="mt-5 max-w-[150px]" color={shem ? 'primary' : 'default'} label="שם פריט" />
                            <Input type="number" value={msbarMdaf || ''} onValueChange={(val) => setMsbarMdaf(val)} className="mt-5 max-w-[150px]" color={msbarMdaf ? 'primary' : 'default'} label="מספר מדף" />
                            <Input type="number" value={mherThlte || ''} onValueChange={(val) => setMherThlte(val)} className="mt-5 mb-5 max-w-[150px]" color={mherThlte ? 'primary' : 'default'} label="מחיר רקנייה" />
                            <Input type="number" value={mherMkhera || ''} onValueChange={(val) => setMherMkhera(val)} className="mt-5 mb-5 max-w-[150px]" color={mherMkhera ? 'primary' : 'default'} label="מחיר מכירה" />
                            {
                                CheckIfMotsarKeamInShteeMlaeem() && <div className="mt-5">
                                <div>
                                    העברת כמות
                                </div>
                                <div className="mt-3 mb-3 flex items-center justify-around flex-wrap">
                                    <Card>
                                        <CardHeader dir="rtl" className="pb-0 pt-2 px-4 flex justify-center">
                                            <div className="text-lg text-center uppercase font-bold w-[110px]">עארה</div>
                                        </CardHeader>
                                        <CardBody className="overflow-visible py-2">
                                            <div className="w-full justify-center flex items-center">
                                                <Image
                                                    alt="Card background"
                                                    className="object-cover rounded-xl"
                                                    src={"https://cdn-icons-png.flaticon.com/512/1046/1046485.png"}
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <div className="flex flex-col items-center">
                                        {
                                            (kmot1 - GetKmotMotsar(mlae)) > 0 ?
                                                <div className="text-success">+{kmot1 - GetKmotMotsar(mlae)}</div>
                                                :
                                                (kmot1 - GetKmotMotsar(mlae)) !== 0 ?
                                                <div className="text-danger">{kmot1 - GetKmotMotsar(mlae)}</div>
                                                :
                                                <div>&nbsp;</div>
                                        }
                                        <div>{kmot1}</div>
                                        <Button size="sm" color="primary" variant="flat" onClick={() => { if (kmot2 > 0) { setKmot1(kmot1 + 1); setKmot2(kmot2 - 1); } }}><TbArrowBigRightFilled className="text-2xl" /></Button>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        {
                                            (kmot2 - GetKmotMotsar(mlae2)) > 0 ?
                                                <div className="text-success">+{kmot2 - GetKmotMotsar(mlae2)}</div>
                                                :
                                                (kmot2 - GetKmotMotsar(mlae2)) !== 0 ?
                                                <div className="text-danger">{kmot2 - GetKmotMotsar(mlae2)}</div>
                                                :
                                                <div>&nbsp;</div>
                                        }
                                        <div>{kmot2}</div>
                                        <Button size="sm" color="primary" variant="flat" onClick={() => { if (kmot1 > 0) { setKmot1(kmot1 - 1); setKmot2(kmot2 + 1); } }}><TbArrowBigLeftFilled className="text-2xl" /></Button>
                                    </div>
                                    <Card>
                                        <CardHeader dir="rtl" className="pb-0 pt-2 px-4 flex justify-center">
                                            <div className="text-lg text-center uppercase font-bold w-[110px]">מעלה אפריים</div>
                                        </CardHeader>
                                        <CardBody className="overflow-visible py-2">
                                            <div className="w-full justify-center flex items-center">
                                                <Image
                                                    alt="Card background"
                                                    className="object-cover rounded-xl"
                                                    src={"https://cdn-icons-png.flaticon.com/512/1046/1046485.png"}
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter className="bg-white border-t-2">
                        <Button size="sm" variant="flat" color="warning" onClick={ResetAll}>
                            סגור
                        </Button>
                        <Button isLoading={loading} isDisabled={AeshorAdcon()} size="sm" variant="flat" color="primary" onClick={async () => {
                            if (checkAemShemMotsarKeam()) {
                                return;
                            }
                            setLoading(true);
                            await updateDoc(doc(firestore,'mlae','Ara'),{motsarem : GetAdconMotsarem(kmot1,mlae,snefMlae === 'עארה')});
                            await updateDoc(doc(firestore,'mlae','MaleAfraem'),{motsarem : GetAdconMotsarem(kmot2,mlae2,snefMlae === 'מעלה אפריים')});
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