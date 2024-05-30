'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";


export default function ModalMessage({ disable, show, message, Aeshor }) {

    return (
        <Modal placement="center" className="" backdrop={"blur"} isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl" className="m-10 text-danger">
                            {
                                message
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex justify-between w-full">
                            <Button size="lg" color="primary" onClick={() => {
                                disable();
                                Aeshor(false);
                            }}>
                                לא
                            </Button>
                            <Button size="lg" color="danger" onClick={() => {
                                disable();
                                Aeshor(true);
                            }}>
                                כן
                            </Button>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}