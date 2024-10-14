'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch, Tooltip } from "@nextui-org/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaRegCheckSquare } from "react-icons/fa";

export default function ModalBerotMotsrem({ show, disable,motsaremLhatseg, motsaremRglem, motsaremBrofelem, setMotsaremRglem, setMotsaremBrofelem }) {

    const checkAemRemezMataem = useCallback((val) => {
        for (let index = 0; index < motsaremLhatseg.length; index++) {
            if (motsaremLhatseg[index] === val) {
                return true;
            }
        }
        return false;
    }, [motsaremLhatseg]);
    

    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="full" isOpen={show} onClose={disable}>
            <ModalContent>
                <ModalHeader className="flex justify-center border-b-2">
                    פירוט מוצרים
                </ModalHeader>
                <ModalBody className="">
                    <div dir="rtl">
                        {
                            motsaremRglem?.map((motsar, index) => {
                                return <div key={index}>
                                    <div ref={MotsaremRefs.current[index]}>{checkAemRemezMataem(motsar.remez) && renderDropdownWithInputs(motsar, GetBrtemMotsarCategory(motsar?.remez)?.shem, index, false, agla?.newMafeneMotsarem, sogBaola, null, null, null)}</div>
                                    {
                                        checkAemRemezMataem(motsar.remez) && <Divider className="mt-3 mb-3" />
                                    }
                                </div>
                            })
                        }
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


