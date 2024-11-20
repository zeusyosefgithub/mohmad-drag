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
    const [tarefLeshaa,setTarefLeshaa] = useState(0);
    const [yeshov,setYeshov] = useState('');
    const [aer,setAer] = useState('');
    const [snef,setSnef] = useState('');

    const [loading,setLoading] = useState(false);
    

    const counter = GetDocs('metadata').find((count) => count.id === 'counterAobdem');
    const hosfatAobed = async() => {
        setLoading(true);
        await addDoc(collection(firestore,'aobdem'),{
            snef,
            msbar: counter?.count,
            bensea: 0,
            betsoeem: 0,
            taodatZhot: taodatZhot,
            nead: nead,
            shem: shem,
            tarefLshaa: tarefLeshaa,
            tfked: tfked === "ייצור" ? 'A' : tfked === "הנהלה" ? 'B' : null,
            yeshov: yeshov,
            aer: aer,
            skharBroto: 0,
            active : true
        });
        await updateDoc(doc(firestore, 'metadata', counter?.id), { count: counter?.count + 1 });
        setLoading(false);
        ResetAll();
    }

    const ResetAll = () => {
        setTfked('');
        setShem('');
        setTaodatZhot('');
        setNead('');
        setTarefLeshaa(0);
        setYeshov('');
        setAer('');
        setSnef('');
        disable();
    }

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={ResetAll}>
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
                            color={shem ? "primary" : 'default'}
                            />
                            <Input 
                            label="תעודת זהות"
                            className="w-full max-w-[250px] mt-5"
                            size="sm"
                            type="text"
                            value={taodatZhot}
                            onValueChange={(val) => setTaodatZhot(val)}
                            color={taodatZhot ? "primary" : 'default'}
                            />
                            <Input 
                            label="נייד"
                            className="w-full max-w-[250px] mt-5"
                            size="sm"
                            type="text"
                            value={nead}
                            onValueChange={(val) => setNead(val)}
                            color={nead ? "primary" : 'default'}
                            />
                            <Input 
                            label="תעריף לשעה"
                            className="w-full max-w-[250px] mt-5"
                            size="sm"
                            type="number"
                            value={tarefLeshaa || ""}
                            onValueChange={(val) => setTarefLeshaa(val)}
                            color={tarefLeshaa ? "primary" : 'default'}
                            />
                            <Input 
                            label="ישוב"
                                className="w-full max-w-[250px] mt-5"
                                size="sm"
                                type="text"
                                value={yeshov}
                                onValueChange={(val) => setYeshov(val)}
                                color={yeshov ? "primary" : 'default'}
                            />
                            <Input
                                label="עיר"
                                className="w-full max-w-[250px] mt-5 mb-5"
                                size="sm"
                                type="text"
                                value={aer}
                                onValueChange={(val) => setAer(val)}
                                color={aer ? "primary" : 'default'}
                            />
                            <div>
                                <Dropdown dir="rtl">
                                    <DropdownTrigger>
                                        <Button
                                            color={tfked ? "primary" : 'default'}
                                            variant="flat"
                                            className="mb-5"
                                            size="sm"
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
                            <div>
                                <Dropdown dir="rtl">
                                    <DropdownTrigger>
                                        <Button
                                            color={snef ? "primary" : 'default'}
                                            variant="flat"
                                            className="mb-5"
                                            size="sm"
                                        >
                                            {snef || 'סניף'}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Multiple selection example"
                                        variant="flat"
                                        closeOnSelect={true}
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={snef}
                                        onSelectionChange={(val) => setSnef(val.currentKey)}
                                    >
                                        <DropdownItem key="עארה">עארה</DropdownItem>
                                        <DropdownItem key="מעלה אפריים">מעלה אפריים</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="flat" size="sm" color='warning' onClick={ResetAll}>
                            סגור
                        </Button>
                        <Button variant="flat" size="sm" isLoading={loading} isDisabled={!shem || !tarefLeshaa || !tfked} color="primary" onClick={hosfatAobed}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

