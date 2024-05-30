'use client';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { firestore } from "../FireBase/firebase";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import { useState } from "react";
import { useGetDataByCondition } from "../FireBase/getDataByCondition";

export default function ModalAddProductCategory({ show, disable, category,Aeshor,sckhom,msbarTfaol }) {

    //const counter = useGetDataByCondition('category', 'msbar', '==', category?.msbar || 'default-msbar-value');
    const [shem, setShem] = useState('');
    const [sog, setSog] = useState('');
    const [zmanAsbka, setZmanAsbka] = useState('');

    const AddSbak = async () => {
        let count = category?.dlbak + 1;
        await addDoc(collection(firestore, "mlae"), {
            category: category?.id,
            categoryMotsar : GetCategory(shem)?.sog,
            msbar: `${GetCategory(shem)?.sog}0${category?.dlbak}`,
            shem: sog,
            alot: sckhom || 0,
            alotLeheda: sckhom || 0,
            kmot: sckhom ? 1 : 0,
            zmanHsbaka: zmanAsbka,
            mededa: GetCategory(shem)?.mededa,
            msbarTfaol : msbarTfaol || 0
        });
        await updateDoc(doc(firestore, 'category', category?.id), { dlbak: count });
        setShem('');
        setZmanAsbka('');
        setSog('');
        if(Aeshor){
            Aeshor(true);
        }
        disable();
    }

    const motsarem = category?.motsarem;

    function GetCategory (val){
        for (let index = 0; index < motsarem?.length; index++) {
            if(val === motsarem[index].shem){
                return motsarem[index];
            }
        }
        return;
    }

    return (
        <Modal placement="center" className="test-fontt max-w-[900px]" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">מוצר חדש {category?.shem}</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl">
                            <Dropdown dir="rtl">
                                <DropdownTrigger>
                                    <Button
                                        size="lg"
                                        className='m-2'
                                    >
                                        {shem ? shem : "שם מוצר"}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Multiple selection example"
                                    variant="flat"
                                    closeOnSelect={true}
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={shem}
                                    onSelectionChange={(val) => setShem(val.currentKey)}
                                >
                                    {
                                        motsarem?.map((motsar,index) => {
                                            return <DropdownItem key={motsar.shem}>{motsar.shem}</DropdownItem>
                                        })
                                    }
                                </DropdownMenu>
                            </Dropdown>

                            <Input value={sog} onValueChange={(val) => setSog(val)} className="mt-5" label="שם פריט"/>
                            <Input value={zmanAsbka} onValueChange={(val) => setZmanAsbka(val)} className="mt-5" label="זמן הספקה" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={() => {
                            if(Aeshor){
                                Aeshor(false);
                            }
                            disable();
                        }}>
                            סגור
                        </Button>
                        <Button size="lg" color="primary" onClick={AddSbak}>
                            אישור
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}
