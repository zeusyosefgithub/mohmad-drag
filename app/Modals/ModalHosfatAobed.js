'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, AutocompleteItem, Autocomplete } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";

export default function ModalHosfatAobed({ disable, show }) {     

    const [tfked,setTfked] = useState('');

    const [shem,setShem] = useState('');
    const [taodatZhot,setTaodatZhot] = useState('');
    const [nead,setNead] = useState('');
    const [tarefLeshaa,setTarefLeshaa] = useState('');
    const [yeshov,setYeshov] = useState('');
    const [aer,setAer] = useState('');

    const counter = GetDocs('metadata').find((count) => count.id === 'counterAobdem');
    const hosfatAobed = async() => {
        await addDoc(collection(firestore,'aobdem'),{
            msbar: counter?.count,
            bensea: 0,
            betsoeem: 0,
            betwahLome: 0,
            hofeshMahla: 0,
            hofsha : 0,
            kerenHeshtlmot: 0,
            masHakhnsa: 0,
            taodatZhot: taodatZhot,
            nead: nead,
            shem: shem,
            tarefLshaa: tarefLeshaa,
            tfked: tfked === "ייצור" ? 'A' : tfked === "הנהלה" ? 'B' : null,
            yeshov: yeshov,
            aer: aer
        });
        await updateDoc(doc(firestore, 'metadata', counter?.id), { count: counter?.count + 1 });
        setTfked('');
        setShem('');
        setTaodatZhot('');
        setNead('');
        setTarefLeshaa('');
        setYeshov('');
        setAer('');
        disable();
    }

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">הוספת עובד</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl">
                            <Input 
                            label="שם"
                            className="w-full max-w-[250px] mt-5"
                            size="sm"
                            type="text"
                            value={shem}
                            onValueChange={(val) => setShem(val)}
                            />
                            <Input 
                            label="תעודת זהות"
                            className="w-full max-w-[250px] mt-5"
                            size="sm"
                            type="text"
                            value={taodatZhot}
                            onValueChange={(val) => setTaodatZhot(val)}
                            />
                            <Input 
                            label="נייד"
                            className="w-full max-w-[250px] mt-5"
                            size="sm"
                            type="text"
                            value={nead}
                            onValueChange={(val) => setNead(val)}
                            />
                            <Input 
                            label="תעריף לשעה"
                            className="w-full max-w-[250px] mt-5"
                            size="sm"
                            type="number"
                            value={tarefLeshaa}
                            onValueChange={(val) => setTarefLeshaa(val)}
                            />
                            <Input 
                            label="ישוב"
                            className="w-full max-w-[250px] mt-5"
                            size="sm"
                            type="text"
                            value={yeshov}
                            onValueChange={(val) => setYeshov(val)}
                            />
                            <Input 
                            label="עיר"
                            className="w-full max-w-[250px] mt-5 mb-5"
                            size="sm"
                            type="text"
                            value={aer}
                            onValueChange={(val) => setAer(val)}
                            />
                            <Dropdown dir="rtl">
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                            className="mb-5"
                                            size="lg"
                                        >
                                            {tfked || 'תפקיד'}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Multiple selection example"
                                        variant="flat"
                                        closeOnSelect={true}
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={tfked}
                                        onSelectionChange={(val) => setTfked(val.currentKey)}
                                    >
                                        <DropdownItem key="ייצור">ייצור</DropdownItem>
                                        <DropdownItem key="הנהלה">הנהלה</DropdownItem>
                                    </DropdownMenu>
                            </Dropdown>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={() => {
                            setTfked('');
                            setShem('');
                            setTaodatZhot('');
                            setNead('');
                            setTarefLeshaa('');
                            setYeshov('');
                            setAer('');
                            disable();
                        }}>
                            סגור
                        </Button>
                        <Button size="lg" color="primary" onClick={hosfatAobed}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

