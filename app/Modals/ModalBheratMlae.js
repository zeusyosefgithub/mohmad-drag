'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import Image from "next/image";


export default function ModalBheratMlae({ disable, show, Bhera }) {

    const [loading, setLoading] = useState(false);


    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center border-b-2">בחר סניף ייצור</ModalHeader>
                    <ModalBody className="shadow-2xl bg-white">
                        <div dir="rtl" className="flex items-center justify-around flex-wrap">
                            <div onClick={() => { disable(); Bhera('עארה'); }} className="m-4 rounded-2xl">
                                <Card className={`cursor-pointer hover:bg-primary-100`}>
                                    <CardHeader dir="rtl" className="pb-0 pt-2 px-4 flex justify-center">
                                        <div className="text-lg text-center uppercase font-bold w-[150px]">עארה</div>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2">
                                        <div className="w-full justify-center flex items-center">
                                            <Image
                                                alt="Card background"
                                                className="object-cover rounded-xl"
                                                src={"https://cdn-icons-png.flaticon.com/512/1046/1046485.png"}
                                                width={80}
                                                height={80}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                            <div onClick={() => { disable(); Bhera('מעלה אפריים'); }} className="m-4 rounded-2xl">
                                <Card className={`cursor-pointer hover:bg-primary-100`}>
                                    <CardHeader dir="rtl" className="pb-0 pt-2 px-4 flex justify-center">
                                        <div className="text-lg text-center uppercase font-bold w-[150px]">מעלה אפריים</div>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2">
                                        <div className="w-full justify-center flex items-center">
                                            <Image
                                                alt="Card background"
                                                className="object-cover rounded-xl"
                                                src={"https://cdn-icons-png.flaticon.com/512/1046/1046485.png"}
                                                width={80}
                                                height={80}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    )
}