'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from "@nextui-org/react";
import { useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";


export default function ModalBrtemNosfemAobed({ disable, show, aobed }) {

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="2xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">פרטיים נוספיים של {aobed?.shem
                    }</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl">
                            <div className="w-full flex justify-around mt-5 mb-5">
                                <div className="w-[110px] text-center font-extrabold text-xl text-primary">
                                    פירוט
                                </div>
                                <div className="font-extrabold text-xl text-primary w-[110px] text-center">
                                    סכום
                                </div>
                            </div>
                            <Divider />
                            <div className="w-full flex justify-around mt-5 mb-5">
                                <div className="w-[110px] text-center">
                                    שכר
                                </div>
                                <div dir="ltr" className={`w-[110px] text-center ${aobed?.skharBroto < 0 && 'text-danger'}`}>
                                    {aobed?.skharBroto}
                                </div>
                            </div>
                            <Divider />
                            <div className="w-full flex justify-around mt-5 mb-5">
                                <div className="w-[110px] text-center">
                                    בנסיה
                                </div>
                                <div dir="ltr" className={`w-[110px] text-center ${aobed?.bensea < 0 && 'text-danger'}`}>
                                    {aobed?.bensea}
                                </div>
                            </div>
                            <Divider />
                            <div className="w-full flex justify-around mt-5 mb-5">
                                <div className="w-[110px] text-center">
                                    פיצויים
                                </div>
                                <div dir="ltr" className={`w-[110px] text-center ${aobed?.betsoeem < 0 && 'text-danger'}`}>
                                    {aobed?.betsoeem}
                                </div>
                            </div>
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
