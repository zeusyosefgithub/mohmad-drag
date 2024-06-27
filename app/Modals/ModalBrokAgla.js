'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";


export default function ModalBrokAgla({ disable, show,motsarem,Brofelem,Berok }) {



    const counter = GetDocs('metadata');
    const [Kolmotsarem,setKolMotsarem] = useState([]);
    const [KolMotsaremBdeka,setKolMotsaremBdeka] = useState([]);
    const [KolmotsaremBrofelem,setKolMotsaremBrofelem] = useState([]);
    const [KolmotsaremBrofelemBdeka,setKolMotsaremBrofelemBdeka] = useState([]);

    const handleInputChange = useCallback(
        (isElse, index, value, name) => {
            if (isElse) {
                setKolMotsaremBrofelem(prevMafenemMotsarem => {
                    const newMafenemMotsarem = [...prevMafenemMotsarem];
                    const updatedItem = { ...newMafenemMotsarem[index], [name]: name === 'kmot' || name === 'mher' ? parseInt(value) : value };
                    newMafenemMotsarem[index] = updatedItem;
                    return newMafenemMotsarem;
                });
            }
            else {
                setKolMotsarem(prevMafenemMotsarem => {
                    const newMafenemMotsarem = [...prevMafenemMotsarem];
                    const updatedItem = { ...newMafenemMotsarem[index], [name]: name === 'kmot' || name === 'mher' ? parseInt(value) : value };
                    newMafenemMotsarem[index] = updatedItem;
                    return newMafenemMotsarem;
                });
            }
        },
        [Kolmotsarem, KolmotsaremBrofelem]
    );

    // const Berok = async () => {
    //     for (let index = 0; index < Kolmotsarem.length; index++) {
    //         if(Kolmotsarem[index].shem !== '' && Kolmotsarem[index].shem != 'בחר פריט' && Kolmotsarem[index].kmot != KolMotsaremBdeka[index].kmot)
    //             await updateDoc(doc(firestore,'mlae'))
    //         }
    //     }
    // }

    useEffect(() => {
        setKolMotsarem(motsarem);
        setKolMotsaremBdeka(motsarem);
    }, [motsarem]);

    useEffect(() => {
        setKolMotsaremBrofelem(Brofelem);
        setKolMotsaremBrofelemBdeka(Brofelem);
    }, [Brofelem]);

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={() => {disable();
            Berok(false,null,null);
        }}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">פירוק עגלה</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div className="overflow-x-auto h-[600px]">
                            {
                                Kolmotsarem?.map((motsar, index) => {
                                    return (motsar.shem != '') && (motsar.shem != 'בחר פריט') &&
                                        <>
                                            <div className="flex p-5">
                                                <div className="w-full">
                                                    <div dir="rtl" className="flex justify-center items-center">
                                                        <Input onValueChange={(val) => handleInputChange(false, index, Math.min(val, KolMotsaremBdeka[index].kmot), 'kmot')} className="max-w-[250px]" color="primary" value={motsar.kmot} label="כמות" />
                                                        <div className="w-[50px] text-center">{KolMotsaremBdeka[index].kmot - motsar.kmot > 0 && <div className="w-[180px] text-center text-success">להחזיר למלאי : {KolMotsaremBdeka[index].kmot - motsar.kmot}+</div>}</div>
                                                    </div>
                                                </div>
                                                <div className="w-full text-center">
                                                    <div dir="rtl" className="flex justify-center">
                                                        <Input className="max-w-[300px]" isReadOnly color="primary" value={motsar.shem} label="שם" />
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider/>
                                        </>
                                })
                            }
                            {
                                KolmotsaremBrofelem?.map((motsar, index) => {
                                    return (motsar.shem != '') && (motsar.shem != 'בחר פריט') &&
                                        <>
                                            <div className="flex p-5">
                                                <div className="w-full">
                                                    <div dir="rtl" className="flex justify-center items-center">
                                                        <Input onValueChange={(val) => handleInputChange(true, index, Math.min(val, KolmotsaremBrofelemBdeka[index].kmot), 'kmot')} className="max-w-[250px]" color="primary" value={motsar.kmot} label="כמות" />
                                                        <div className="w-[50px] text-center">{KolmotsaremBrofelemBdeka[index].kmot - motsar.kmot > 0 && <div className="w-[180px] text-center text-success">להחזיר למלאי : {KolmotsaremBrofelemBdeka[index].kmot - motsar.kmot}+</div>}</div>
                                                    </div>
                                                </div>
                                                <div className="w-full text-center">
                                                    <div dir="rtl" className="flex justify-center">
                                                        <Input className="max-w-[300px]" isReadOnly color="primary" value={motsar.shem} label="שם" />
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider/>
                                        </>
                                })
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={() => {disable();
                            Berok(false,null,null);
                        }}>
                            סגור
                        </Button>
                        <Button size="lg" color="primary" onClick={() => {disable();
                            Berok(true,Kolmotsarem,KolmotsaremBrofelem);
                        }}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}