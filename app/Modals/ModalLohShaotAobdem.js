'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, AutocompleteItem, Autocomplete } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc, query, where } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import moment from 'moment';
import { HiOutlineCheck } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import { format } from "date-fns";
import { useGetDataByConditionWithoutUseEffect, useGetDataByLimit } from "../FireBase/getDataByCondition";


export default function ModalLohShaotAobdem({ disable, show }) {


    

    // Output:       

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">לוח שעות עובדים</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={() => {
                        }}>
                            סגור
                        </Button>
                        {
                            
                        }
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

