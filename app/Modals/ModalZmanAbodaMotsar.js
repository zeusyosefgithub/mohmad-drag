'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import Image from "next/image";
import { GetTmonatHelek } from "../page";

export default function ModalZmanAbodaMotsar({ disable, show, category }) {


    const [NewCategory,setNewCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setNewCategory(category.map(cat => ({
            ...cat,
            motsarem: cat.motsarem.map(motsar => ({ ...motsar }))
        })));
    }, [category]);

    const handleInputChange = (catIndex, motsarIndex, value) => {
        const updatedCategory = [...NewCategory];
        updatedCategory[catIndex].motsarem[motsarIndex].zmanAboda = value ? Number(value) : '';
        setNewCategory(updatedCategory);
    };

    const checkForChanges = () => {
        for (let index = 0; index < category?.length; index++) {
            for (let index1 = 0; index1 < category[index]?.motsarem?.length; index1++) {
                if (category[index]?.motsarem[index1]?.zmanAboda !== NewCategory[index]?.motsarem[index1]?.zmanAboda && NewCategory[index]?.motsarem[index1]?.zmanAboda !== '') {
                    return true;
                }
                if(NewCategory[index]?.motsarem[index1]?.zmanAboda === ''){
                    return false;
                }
                
            }
        }
        return false;
    };

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={() => {
            setNewCategory(category.map(cat => ({
                ...cat,
                motsarem: cat.motsarem.map(motsar => ({ ...motsar }))
            })));
            disable();
        }}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">זמני עבודה מוצרים</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl" className="overflow-y-scroll h-[500px] w-full">
                            {
                                category.map((cat, index) => {
                                    return <div className="w-full mt-10">
                                        <div className="text-satrt mr-5 p-5 text-primary font-extrabold tracking-widest">
                                            {cat.shem}
                                        </div>
                                        <Divider className="mb-5"/>
                                        <div className="mt-2 mb-2">
                                            {
                                                cat.motsarem.map((motsar, index1) => {
                                                    return <>
                                                        <div className="mt-3 mb-3 flex items-center">
                                                            <div className="group relative z-10">
                                                                <Image src={GetTmonatHelek(motsar.sog)} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg hover:z-50 bg-white group-hover:translate-x-[-220%]" />
                                                            </div>
                                                            <div className="w-[150px] mr-10">{motsar.shem}</div>
                                                            <Input type="number" onValueChange={(val) => handleInputChange(index, index1, val)} value={NewCategory[index]?.motsarem[index1]?.zmanAboda || ""} className="max-w-[150px]" label="דקות"/>
                                                        </div>
                                                    </>
                                                })
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={() => {
                            setNewCategory(category.map(cat => ({
                                ...cat,
                                motsarem: cat.motsarem.map(motsar => ({ ...motsar }))
                            })));
                            disable();
                        }}>
                            סגור
                        </Button>
                        <Button isLoading={loading} isDisabled={!checkForChanges()} size="lg" color="primary" onClick={async () => {
                            setLoading(true);
                            let res = false;
                            for (let index = 0; index < category?.length; index++) {
                                for (let index1 = 0; index1 < category[index]?.motsarem?.length; index1++) {
                                    if (category[index]?.motsarem[index1]?.zmanAboda !== NewCategory[index]?.motsarem[index1]?.zmanAboda && NewCategory[index]?.motsarem[index1]?.zmanAboda !== '') {
                                        res = true;
                                    }
                                }
                                if (res) {
                                    await updateDoc(doc(firestore, 'category', category[index].id), {
                                        motsarem: NewCategory[index]?.motsarem
                                    })
                                }
                                res = false;
                            };
                            // setNewCategory(category.map(cat => ({
                            //     ...cat,
                            //     motsarem: cat.motsarem.map(motsar => ({ ...motsar }))
                            // })));
                            disable();
                            setLoading(false);
                        }
                        }>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}


