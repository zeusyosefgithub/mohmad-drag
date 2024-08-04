'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState } from "react";


export default function ModalHosfatKnesaYdnet({ disable, show,aobdem }) {
    const [tarekhYom,setTarekhYom] = useState('');

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">הוספת כניסה ידנית</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl" className="p-5">
                            <div className="flex justify-start items-center">
                                <div className="ml-2">תאריך</div>
                                <Input className="max-w-[200px]" color="primary" type="date" value={tarekhYom} onValueChange={(val) => setTarekhYom(val)}/>
                            </div>
                            <div className="h-[350px] overflow-auto mt-5">
                                {
                                    tarekhYom && aobdem?.map((aobed,index) => {
                                        return <div>12</div>
                                    })
                                }
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


