'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";


export default function ModalBheratTokhnet({ disable, show,tokhnetNbhera }) {

    const Tokhneot = GetDocs('TokhnetYetsorAgla');

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">תוכניות יצרו עגלה</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div className="overflow-x-auto h-[500px]">
                            {
                                Tokhneot.map((tokhnet,index) => {
                                    return <Button onClick={() => {tokhnetNbhera(tokhnet);disable();}}>{tokhnet.shem}</Button>
                                })
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={disable}>
                            סגור
                        </Button>
                        <Button size="lg" color="primary" onClick={disable}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}