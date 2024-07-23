'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from "@nextui-org/react";
import { useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";


export default function ModalBrtemNosfemAobed({ disable, show,aobed }) {

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">פרטיים נוספיים של {aobed?.shem
                        }</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl">
                            <div className="w-full flex justify-around mt-5 mb-5">
                                <div className="w-[110px]">
                                    בנסיה
                                </div>
                                <div>
                                    {aobed?.bensea}
                                </div>
                            </div>
                            <Divider/>
                            <div className="w-full flex justify-around mt-5 mb-5">
                                <div className="w-[110px]">
                                    פיצויים
                                </div>
                                <div>
                                    {aobed?.betsoeem}
                                </div>
                            </div>
                            <Divider/>
                            <div className="w-full flex justify-around mt-5 mb-5">
                                <div className="w-[110px]">
                                    שכר
                                </div>
                                <div>
                                    {aobed?.skharBroto}
                                </div>
                            </div>
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
