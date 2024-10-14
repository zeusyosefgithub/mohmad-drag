'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch, Tooltip } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCheckSquare } from "react-icons/fa";

export default function ModalYetsorTokhnet({ show, disable,setMotsaremLhatseg }) {

    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="full" isOpen={show} onClose={disable}>
            <ModalContent>
                <ModalHeader className="flex justify-center border-b-2">
                    תוכנית ייצור
                </ModalHeader>
                <ModalBody className="">
                    <div dir="rtl">
                        
                    </div>
                </ModalBody>
                <ModalFooter className="border-t-2">
                    <div >
                        <Button color="warning" variant="flat" size="sm" onClick={disable}>
                            סגור
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}


