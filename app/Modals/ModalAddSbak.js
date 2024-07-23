'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";


export default function ModalAddSobak({ disable, show }) {


    const [aer, setaer] = useState('');
    const [nead, setnead] = useState('');
    const [shem, setshem] = useState('');
    const [yeshov, setyeshov] = useState('');
    const [sherot, setSherot] = useState('');
    const [teaor, setTeaor] = useState('');
    const [loading, setLoading] = useState(false);
    const counter = GetDocs('metadata');

    const ResetAll = () => {
        setaer('');
        setnead('');
        setshem('');
        setyeshov('');
        setSherot('');
        setTeaor('');
        disable();
    }

    const AddSbak = async () => {
        setLoading(true);
        await addDoc(collection(firestore, "sbkem"), {
            aer: aer,
            msbar: counter[0]?.count,
            nead: nead,
            shem: shem,
            sherot: sherot,
            yeshov: yeshov,
            ytratHeshvon: 0,
        });
        await updateDoc(doc(firestore, 'metadata', counter[0]?.id), { count: counter[0]?.count + 1 });
        ResetAll();
        setLoading(false);
    }

    return (
        <Modal placement="center" className="test-fontt sizeForModals" backdrop={"blur"} size="5xl" isOpen={show} onClose={ResetAll}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">הוספת ספק/שלטון חדש</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl" className="m-1 rounded-xl no-scrollbar overflow-auto sizeingForDivsModals">
                            <Input value={shem} onValueChange={(val) => setshem(val)} className="mt-5 max-w-[200px]" label="שם" type="text" />
                            <Input value={nead} onValueChange={(val) => setnead(val)} className="mt-5 max-w-[200px]" label="נייד" type="text" />
                            <Input value={aer} onValueChange={(val) => setaer(val)} className="mt-5 max-w-[200px]" label="עיר" type="text" />
                            <Input value={yeshov} onValueChange={(val) => setyeshov(val)} className="mt-5 max-w-[200px]" label="ישוב" type="text" />
                            <Input value={teaor} onValueChange={(val) => setTeaor(val)} className="mt-5 max-w-[200px]" label="תאור שירות" type="text" />
                            <div className="flex items-center mt-5 mb-5">
                                <div className="ml-2">סוג שירות :</div>
                                <Dropdown dir="rtl">
                                    <DropdownTrigger>
                                        <Button variant='flat' size="" className='mr-4'>
                                            {sherot || 'סוג שירות'}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Multiple selection example"
                                        variant="flat"
                                        closeOnSelect={true}
                                        disallowEmptySelection
                                        selectionMode="single"
                                        onSelectionChange={(val) => setSherot(val.currentKey)}
                                    > 
                                        <DropdownItem key={'קניות מוצרים'}>{'קניות מוצרים'}</DropdownItem>
                                        <DropdownItem key={'מסים'}>{'מסים'}</DropdownItem>
                                        <DropdownItem key={'הוצאות שוטפות'}>{'הוצאות שוטפות'}</DropdownItem>
                                        <DropdownItem key={'הוצאות אחרות'}>{'הוצאות אחרות'}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={ResetAll}>
                            סגור
                        </Button>
                        <Button isDisabled={!shem || !sherot} isLoading={loading} size="lg" color="primary" onClick={AddSbak}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}