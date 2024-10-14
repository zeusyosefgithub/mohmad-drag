'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch, Tooltip, DatePicker } from "@nextui-org/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaBeer, FaRegCheckSquare, FaUser } from "react-icons/fa";
import GetDocs from "../FireBase/getDocs";
import { MdKeyboardArrowDown } from "react-icons/md";
import ModalYetsorTokhnet from "./ModalYetsorTokhnet";
import ModalBerotMotsrem from "./ModalBerotMotsrem";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { format } from "date-fns";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { GrCertificate } from "react-icons/gr";


export default function ModalYetsor({ show, disable, Tokhneot, agla,category }) {

    // ---------------------------------------------------------------------------------------- aglot Lkoh
    const [aglot, setAglot] = useState([]);
    // ---------------------------------------------------------- aglot Lkoh -- (functions)

    // ---------------------------------------------------------------------------------------- lkoh
    const lkhot = GetDocs('customers');
    const [brtemLkoh, setBrtemLkoh] = useState(null);
    // ---------------------------------------------------------- lkoh -- (functions)

    // ---------------------------------------------------------------------------------------- tokhnet
    const [tokhnetNokhhet, setTokhnetNokhhet] = useState(null);
    const [shemTokhnet, setShemTokhnet] = useState('');
    // ---------------------------------------------------------- tokhnet -- (functions)

    // ---------------------------------------------------------------------------------------- modals
    const [showModalTokhnetYetsor, setShowModalTokhnetYetsor] = useState(false);
    const [showModalBerotMotsrem, setShowModalBerotMotsrem] = useState(false);
    // ---------------------------------------------------------- modals -- (functions)

    // ---------------------------------------------------------------------------------------- thlekhem
    const [seomYetsor, setSeomYetsor] = useState(false);
    const [msbarAgla, setMsbarAgla] = useState('');
    const [mherKlale, setMherKlale] = useState(0);
    const [hnha, setHnha] = useState(0);
    const [hskmatLkoh, setHskmatLkoh] = useState(false);
    // ---------------------------------------------------------- thlekhem -- (functions)

    // ---------------------------------------------------------------------------------------- motsarem
    const [motsaremRglem,setMotsaremRglem] = useState([]);
    const [motsaremBrofelem,setMotsaremBrofelem] = useState([]);
    const [motsaremLhatseg, setMotsaremLhatseg] = useState([]);
    const prevRemzemRef = useRef();

    // ---------------------------------------------------------- motsarem -- (functions)
    const Remzem = useMemo(() => {
        let newArray = [];
        if (category) {
            for (let categoryIndex = 0; categoryIndex < category.length; categoryIndex++) {
                const { motsarem } = category[categoryIndex];
                for (let motsaremIndex = 0; motsaremIndex < motsarem.length; motsaremIndex++) {
                    newArray.push(motsarem[motsaremIndex]);
                }
            }
        }
        return newArray.sort((a, b) => a.someProperty - b.someProperty); // Customize this sorting logic if needed
    }, [category]);

    const GetSortedMotsaremRglem = (array) => {
        const sortedArray = array.slice().sort((a, b) => {
            const remezA = a.remez;
            const remezB = b.remez;
            const alphaA = remezA.match(/[A-Z]+/)[0];
            const numA = parseInt(remezA.match(/\d+/)[0], 10);
            const alphaB = remezB.match(/[A-Z]+/)[0];
            const numB = parseInt(remezB.match(/\d+/)[0], 10);
            const alphabeticalComparison = alphaA.localeCompare(alphaB);
            if (alphabeticalComparison !== 0) {
                return alphabeticalComparison;
            }
            return numA - numB;
        });
        return sortedArray;
    }

    useEffect(() => {
        const prevRemzem = prevRemzemRef.current;
        prevRemzemRef.current = Remzem;
        if (prevRemzem && JSON.stringify(prevRemzem) === JSON.stringify(Remzem)) {
            return;
        }
        if (Remzem?.length) {
            const initialMafenemMotsarem = Remzem.map(remez => ({
                kmot: 0,
                mher: 0,
                shem: '',
                remez: remez.sog,
                message: ''
            }));
            setMotsaremRglem(GetSortedMotsaremRglem(initialMafenemMotsarem));
        }
    }, [Remzem]);

    console.log(motsaremRglem);



    const shlav = () => {
        let res = false;
        if (brtemLkoh?.shem) {
            res = 'A';
        }
        // if (lkoh){
        //     res = 'B';
        // }
        // if (lkoh){
        //     res = 'C';
        // }
        // if (lkoh){
        //     res = 'D';
        // }
        // if (lkoh){
        //     res = 'E';
        // }
        return res;
    }






    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="full" isOpen={show} onClose={disable}>
            <ModalContent className="w-full h-screen bg-white flex flex-col">

                <ModalHeader className="bg-white w-full border-b-2">
                    <div className="text-2xl font-bold text-center text-gray-800 w-full bg-white">ייצור עגלה</div>
                </ModalHeader>

                <ModalBody className="flex-grow p-4 overflow-auto">
                    <ModalYetsorTokhnet setMotsaremLhatseg={(value) => setMotsaremLhatseg(value)} show={showModalTokhnetYetsor} disable={() => setShowModalTokhnetYetsor(false)} />
                    <ModalBerotMotsrem setMotsaremRglem={(value) => setMotsaremRglem(value)} setMotsaremBrofelem={(value) => setMotsaremBrofelem(value)} motsaremBrofelem={motsaremBrofelem} motsaremRglem={motsaremRglem}  show={showModalBerotMotsrem} disable={() => setShowModalBerotMotsrem(false)} />
                    <div className="w-full h-full flex">
                        <div className="w-1/3 h-full pr-3 pl-3">
                            <Card className="w-full h-full">
                                <CardBody>
                                    <div className="bg-gray-200 rounded-lg p-1">
                                        <div className="text-2xl font-bold text-center text-gray-800">תמחיר</div>
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-green-500">מחיר שוק</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-danger-500">הנחה</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-success-500">מחיר מכירה</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-danger-500">הוצאות חו"ג</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-danger-500">הוצאות שכר</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-green-500">רווח ישיר</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-danger-500">הוצאות עקיפות</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-danger-500">הוצאות מסים</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-green-500">רווח נקי</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-green-500">אחוז רווח</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`%`} />
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="w-full h-full pl-3 pr-3">
                            <Card dir="rtl" className="w-full h-full">
                                <CardBody>
                                    <div className="bg-gray-200 rounded-lg p-1">
                                        <div className="text-2xl font-bold text-center text-gray-800">שלב 0</div>
                                    </div>
                                    <div className="w-full flex-grow p-4 overflow-auto">
                                        <div className="w-full p-10">
                                            <div className="w-full flex items-center pb-3 border-b-1">
                                                {/* <iframe src="https://giphy.com/embed/nVE8OaIGkUhf7rkieR" width="480" height="312" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/play-media-arrows-nVE8OaIGkUhf7rkieR">via GIPHY</a></p> */}
                                                <FaUser className="text-xl text-primary" />
                                                <div className="mr-2">
                                                    <Autocomplete
                                                        label="בחר לקוח"
                                                        className="max-w-[200px]"
                                                        color="primary"
                                                        size="sm"
                                                        defaultItems={lkhot}
                                                    >
                                                        {
                                                            lkhot.map((lko, index) => (
                                                                <AutocompleteItem onClick={() => { setBrtemLkoh(lko); setHskmatLkoh(false); }} className='text-right' key={lko?.name} value={lko?.name}>
                                                                    {lko?.name}
                                                                </AutocompleteItem>
                                                            ))
                                                        }
                                                    </Autocomplete>
                                                </div>
                                            </div>
                                            <div className="border-b-1 pt-3 pb-3">
                                                <div className="w-full flex items-center">
                                                    <div>
                                                        <AiOutlineFundProjectionScreen className="text-xl text-primary ml-2" />
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-start">
                                                            <Dropdown dir="rtl">
                                                                <DropdownTrigger>
                                                                    <Button dir="ltr" color="primary" variant='flat' size="sm">
                                                                        <MdKeyboardArrowDown className="text-xl" />{shemTokhnet ? `${shemTokhnet} : תוכנית` : 'בחירת תוכנית'}
                                                                    </Button>
                                                                </DropdownTrigger>
                                                                <DropdownMenu
                                                                    aria-label="Multiple selection example"
                                                                    variant="flat"
                                                                    closeOnSelect={true}
                                                                    disallowEmptySelection
                                                                    selectionMode="single"
                                                                    onSelectionChange={(val) => setShemTokhnet(val.currentKey)}
                                                                >
                                                                    <DropdownItem>תוכנית ידנית</DropdownItem>
                                                                    {Tokhneot?.map((option) => (
                                                                        <DropdownItem onClick={() => setTokhnetNokhhet(option)} key={option.shem}>{option.shem}</DropdownItem>
                                                                    ))}
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </div>
                                                        <div className="mt-3">
                                                            <Button className="ml-2" size="sm" variant="flat" onClick={() => setShowModalTokhnetYetsor(true)} color='primary'>תוכנית ייצור</Button>
                                                            <Button className="mr-2 ml-2" size="sm" variant="flat" onClick={() => setShowModalBerotMotsrem(true)} color="primary">פירוט מוצרים</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-b-1 pt-3 pb-3">
                                                <div className="w-full flex items-center">
                                                    <div>
                                                        <IoSettings className="text-xl text-primary ml-2" />
                                                    </div>
                                                    <div>
                                                        <Input className="max-w-[150px] " value={format(new Date(), 'dd-MM-yyyy')} color="primary" variant="flat" type='date' size="sm" label="תאריך אספקה" />
                                                        <Input label="מחיר מחרון" isReadOnly={agla?.mherMkhera} size="sm" type="number" value={mherKlale || ''} onValueChange={(val) => { setMherKlale(val); }} color="primary" className="max-w-[150px] mt-3" />
                                                        <Input label="הנחה" size="sm" type="number" value={hnha || ''} onValueChange={(val) => setHnha(Math.min(val, mherKlale))} color="primary" className="max-w-[150px] mt-3" />
                                                        <div className="w-full flex mt-3">
                                                            <Switch size='md' dir="ltr" isSelected={hskmatLkoh} isReadOnly={agla?.thlkhem?.hskmatLkwah || !brtemLkoh} defaultSelected={agla?.thlkhem?.hskmatLkwah} value={hskmatLkoh} onValueChange={(val) => setHskmatLkoh(val)}>
                                                                <div className="mr-2 w-[100px] text-right">הזמנת לקוח</div>
                                                            </Switch>
                                                        </div>
                                                        <div className="w-full flex mt-3">
                                                            <Switch size='md' dir="ltr" className="flex mt-3" isSelected={seomYetsor} isReadOnly={!hskmatLkoh || !thelatYetsor} defaultSelected={agla?.thlkhem?.seomThlekhYetsor} value={seomYetsor} onValueChange={(val) => setSeomYetsor(val)}>
                                                                <div className="mr-2 w-[100px] text-right">סיום יצור</div>
                                                            </Switch>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-3 pb-3">
                                                <div className="w-full flex items-center">
                                                    <div>
                                                        <GrCertificate className="text-xl text-primary ml-2" />
                                                    </div>
                                                    <div>
                                                        <div className="w-full flex">
                                                            <Autocomplete
                                                                isDisabled={!hskmatLkoh}
                                                                label="מספר עגלה"
                                                                className="max-w-[200px]"
                                                                size="sm"
                                                                color="primary"
                                                                onSelectionChange={setMsbarAgla}
                                                                onInputChange={(val) => { setMsbarAgla(val); }}
                                                            >
                                                                {
                                                                    aglot?.map((aglaaaaa, index) => (
                                                                        (!aglaaaaa?.active) && <AutocompleteItem onClick={() => setSeomReshion(false)} className='text-right' key={aglaaaaa?.licenseid} value={aglaaaaa?.licenseid}>
                                                                            {aglaaaaa?.licenseid}
                                                                        </AutocompleteItem>
                                                                    ))
                                                                }

                                                            </Autocomplete>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" w-full flex justify-center pt-3 border-t-1">
                                        <Tooltip closeDelay={200} content={
                                            <div dir="rtl" className="w-full flex items-center">
                                                <div className="text-primary font-black">
                                                    השלב הבא :
                                                </div>
                                                <div className="mr-1">
                                                    123
                                                </div>
                                            </div>
                                        }>
                                            <Button className="h-[35px]" color="primary" variant="flat" size="sm">
                                                <div className="flex items-center">
                                                    <div className="ml-2 text-right">המשך</div>
                                                    <div className="inline-block animate-move-arrows">
                                                        <TbPlayerTrackNextFilled className="text-4xl text-blue-500 transform scale-x-[-1]" />
                                                    </div>
                                                </div>
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter className="border-t-2">
                    <div className="w-full flex justify-end">
                        <Button color='warning' variant='flat' size="sm" className="mr-2" onClick={disable}>סגור</Button>
                        {agla?.msbar && <Button isDisabled color='primary' variant='flat' size="sm" className="mr-2">שמירה</Button>}

                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}










