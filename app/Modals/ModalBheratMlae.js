'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";


export default function ModalBheratMlae({ disable, show }) {

    const [loading, setLoading] = useState(false);


    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">בחירת מלאי שיח</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl">

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" color="warning" variant="flat" onClick={disable}>
                            סגור
                        </Button>
                        <Button isLoading={loading} size="sm" variant="flat" color="primary" onClick={disable}>
                            הוספה
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}