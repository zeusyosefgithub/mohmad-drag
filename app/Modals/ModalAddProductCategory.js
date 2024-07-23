'use client';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { firestore } from "../FireBase/firebase";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import { useState } from "react";
import { useGetDataByCondition } from "../FireBase/getDataByCondition";

export default function ModalAddProductCategory({ show, disable, category, Aeshor, sckhom, msbarTfaol,mlae }) {

    //const counter = useGetDataByCondition('category', 'msbar', '==', category?.msbar || 'default-msbar-value');
    const [shem, setShem] = useState('');
    const [sog, setSog] = useState('');
    const [mherThlte, setMherThlte] = useState('');
    const [zmanAsbka, setZmanAsbka] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');
    const motsarem = category?.motsarem;
    function GetCategory(val) {
        for (let index = 0; index < motsarem?.length; index++) {
            if (val === motsarem[index].shem) {
                return motsarem[index];
            }
        }
        return;
    }

    function GetNewArrayMotsarem(val) {
        let newarray = [];
        for (let index = 0; index < motsarem?.length; index++) {
            if (motsarem[index].shem === shem) {
                newarray.push({
                    dlbak: val + 1,
                    mededa: motsarem[index].mededa,
                    shem: motsarem[index].shem,
                    sog: motsarem[index].sog
                })
            }
            else {
                newarray.push(motsarem[index]);
            }
        }
        return newarray;
    }


    const restAll = () => {
        setShem('');
        setZmanAsbka('');
        setSog('');
        setMherThlte('');
        disable();
    }

    const checkAemShemMotsarKeam = () => {
        for (let index = 0; index < mlae.length; index++) {
            if(mlae[index].shem === sog){
                setErrorMessage('שם המוצר כבר קיים !!');
                return true;
            }
        }
        return false;
    }

    const AddSbak = async () => {
        setErrorMessage('');
        if(checkAemShemMotsarKeam()){
            return;
        }
        setLoading(true);
        setIsClicked(true);
        let count = category?.dlbak + 1;
        let counter = GetCategory(shem)?.dlbak;
        await addDoc(collection(firestore, "mlae"), {
            category: category?.id,
            categoryMotsar: GetCategory(shem)?.sog,
            msbar: `${GetCategory(shem)?.sog}0${counter}`,
            shem: sog,
            alot: sckhom || 0,
            alotLeheda: alotLeheda(sckhom) || parseFloat(mherThlte),
            kmot: sckhom ? 1 : 0,
            zmanHsbaka: zmanAsbka,
            mededa: GetCategory(shem)?.mededa,
            msbarTfaol: msbarTfaol || 0,
            adconAhron: '',
            kmotNefl: 0,
            sakhHkolKneot: 0,
            active: true
        });
        await updateDoc(doc(firestore, 'category', category?.id), {
            dlbak: count,
            motsarem: GetNewArrayMotsarem(counter)
        });
        restAll();
        if (Aeshor) {
            Aeshor(true);
        }
        setLoading(false);
        setTimeout(() => {
            setIsClicked(false);
        }, 5000); // Adjust the time as per your requirement
    }
    //       צמיג 1


    return (
        <Modal placement="center" className="test-fontt max-w-[900px]" backdrop={"blur"} size="5xl" isOpen={show} onClose={restAll}>
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
                                        motsarem?.map((motsar, index) => {
                                            return <DropdownItem key={motsar.shem}>{motsar.shem}</DropdownItem>
                                        })
                                    }
                                </DropdownMenu>
                            </Dropdown>

                            <Input errorMessage={errorMessage} type="text" value={sog} onValueChange={(val) => setSog(val)} className="mt-5 max-w-[150px]" label="שם פריט" />
                            <Input type="number" value={mherThlte} onValueChange={(val) => setMherThlte(val)} className="mt-5 max-w-[150px]" label="מחיר תחלתי" />
                            <Input type="number" value={zmanAsbka} onValueChange={(val) => setZmanAsbka(val)} className="mt-5 mb-5 max-w-[150px]" label="זמן הספקה בימים" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={() => {
                            if (Aeshor) {
                                Aeshor(false);
                            }
                            restAll();
                        }}>
                            סגור
                        </Button>
                        <Button isDisabled={!shem || !sog || !mherThlte || !zmanAsbka} isLoading={loading} size="lg" color="primary" onClick={AddSbak}>
                                אישור
                            </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}
