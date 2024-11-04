'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch, Tooltip } from "@nextui-org/react";
import { useGetDataByCondition } from "../FireBase/getDataByCondition";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import GetDocs from "../FireBase/getDocs";

export default function ModalTokhnetYetsor({ show, disable,mlae,category }) {

    const [loading,setLoading] = useState(false);
    const counter = GetDocs('metadata').find((count) => count.id === 'counterTokhnetYetsorAgla');
    const [shemTokhnet, setShemTokhnet] = useState('');

    const shmeratTokhnet = async () => {
        setLoading(true);
        await addDoc(collection(firestore, 'TokhnetYetsorAgla'), {
            msbar: counter?.count,
            shem: shemTokhnet,
        });
        await updateDoc(doc(firestore, 'metadata', 'counterTokhnetYetsorAgla'), {
            count: counter?.count + 1
        });
        ResetAll();
        setLoading(false);
    }

    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="3xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center border-b-2 bg-white">הוספת תוכנית ייצור עגלה</ModalHeader>
                    <ModalBody className="shadow-2xl bg-white">
                        <div className="m-5" dir="rtl">
                            <Input size="sm" value={shemTokhnet} onValueChange={(val) => setShemTokhnet(val)} type="text" color="primary" className="max-w-[200px]" label="שם תוכנית" />
                            <div className="mt-3">
                                <Button size='md' variant="flat" onClick={() => setShowModalTokhnetYetsor(true)} color='primary'>תוכנית ייצור</Button>
                            </div>
                            <div className="mt-3">
                                <Button size='md' variant="flat" onClick={() => setShowModalBerotMotsrem(true)} color="primary">פירוט מוצרים</Button>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="bg-white border-t-2">
                        <Button color="warning" variant="flat" size="sm" onClick={disable}>
                            סגור
                        </Button>
                        <Button isLoading={loading} size="sm" variant="flat" color="primary" onClick={disable}>
                            שמירה
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}