'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

export default function ModalCreate({ show, disable }) {
    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="full" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalBody className="border-b-2">
                        <div>
                            23</div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    )
}
