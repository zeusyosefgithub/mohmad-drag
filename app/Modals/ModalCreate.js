'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import GetDocs from "../FireBase/getDocs";
import { fetchDocumentByCondition, useGetDataByCondition } from "../FireBase/getDataByCondition";
import { MdOutlineTimer } from "react-icons/md";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { MathX1, MathX3 } from "../Components/MathParts";
import { FaPlus } from "react-icons/fa";
import { differenceInDays, differenceInHours, differenceInMinutes, format, parseISO } from 'date-fns';
import CountdownComponent from "../Components/TimeCalc";
import { useCallback } from 'react';
import { set } from "lodash";
import { RiErrorWarningFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import ModalMessage from "./ModalMessage";
import ModalAddProductCategory from "./ModalAddProductCategory";
import ModalBrokAgla from "./ModalBrokAgla";

export default function ModalCreate({ show, disable, agla,lkohTfaol }) {

    const [sogAska, setSogAska] = useState('סוג עסקה');
    const lkhot = GetDocs('customers');
    const [lkoh, setLkoh] = useState('');
    const [lkohMsbar, setLkohMsbar] = useState('');
    const aglot = useGetDataByCondition('drags', 'idcustomer', '==', lkohTfaol?.idnum || 0);
    const mlae = GetDocs('mlae');
    const category = GetDocs('category');

    const GetBrtemMotsarCategory = useCallback((remez) => {
        for (let index = 0; index < category.length; index++) {
            let motsrem = category[index].motsarem;
            for (let index1 = 0; index1 < motsrem.length; index1++) {
                if (motsrem[index1].sog === remez) {
                    return motsrem[index1];
                }
            }
        }
        return;
    }, [category]);

    const GetBrtemMotsarMlae = useCallback((remez, shem) => {
        const motsarMlae = mlae.filter(item => item.categoryMotsar === remez);
        const alot = motsarMlae.find(item => item.shem === shem)?.alotLeheda || 0;
        const kmot = motsarMlae.find(item => item.shem === shem)?.kmot || 0;
        return { arrayResualt: motsarMlae, alot, kmot };
    }, [mlae]);

    const [mherKlale, setMherKlale] = useState('');
    const [kveatMher, setKveatMher] = useState(false);
    const [hskmatLkoh, setHskmatLkoh] = useState(false);
    const [shaotAboda, setShaotAboda] = useState('');
    const [aorkh, setAorkh] = useState('');
    const [rohf, setRohf] = useState('');
    const [thelatYetsor, setThelatYetsor] = useState(false);
    const [msbarAgla, setMsbarAgla] = useState('');
    const [seomYetsor, setSeomYetsor] = useState(false);
    const [hshhyatYetsor, setHshhyatYetsor] = useState(false);
    const [seomReshaion, setSeomReshion] = useState(false);
    const [msbarTsrem, setMsbarTsrem] = useState('');
    const [aemBlamem, setAemBlamem] = useState(false);
    const [tsmegSber, setTsmegSber] = useState(false);
    const [aorkhBrofel, setAorkhBrofel] = useState(0);
    const [msbarBrofelemBretA, setMsbarBrofelmBretA] = useState(null);
    const [aemTseba, setAemTseba] = useState(false);
    const [aemBashbashol, setAemBashbashol] = useState(false);
    const [aemKafRetom, setAemKafRetom] = useState(false);
    const [aemMekhalMaym, setAemMekhalMaym] = useState(false);
    const [aemArgazKlem, setAemArgazKlem] = useState(false);
    const [aemGlgalAzer, setAemGlgalAzer] = useState(false);
    const [aemReglHnea, setAemReglHnea] = useState(false);
    const [tvahBrofel, setTvahBrofel] = useState('');
    const [msbarBrofelem, setMsbarBrofelem] = useState('');
    const [helkBetBnmet, setHelkBetBnmet] = useState(false);
    const [aemRmbaAoRgel, setAemRmbaAoRgel] = useState('');
    const [mafenemMotsarem, setMafenemMotsarem] = useState([]);
    const [motsaremBrofelemSofe, setMotsaremBrofelemSofe] = useState([]);
    const [constantDate, setConstantDate] = useState('2024-12-25T00:00:00.000Z');
    const counter = GetDocs('metadata').find((count) => count.id === 'counterTfaol');
    const [modalHosfatLkoh, setModalHosfatLkoh] = useState(false);
    const [sogAskaAgla,setSogAskaAgla] = useState('');
    const [motsaremLhatseg, setMotsaremLhatseg] = useState([]);
    const [hkhnsot, setHkhnsot] = useState(0);
    const [hkhnsotHomreGlem, setHkhnsotHomreGlem] = useState(0);
    const [hotsotSkhar, setHotsaotSkhar] = useState(0);
    const [sogBaola, setSogBaola] = useState('');
    const [hshhyatYetsorZman, setHshhyatYetsorZman] = useState();
    const [motsaremBrofelem, setMotsaremBroflem] = useState([
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5'
        },
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5'
        },
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5'
        },
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5'
        },
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5'
        },
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5'
        }
    ]);
    const ResetAll = () => {
        setSogAskaAgla('');
        setSogAska('סוג עסקה');
        setLkoh('');
        setMherKlale('');
        setKveatMher(false);
        setHskmatLkoh(false);
        setShaotAboda('');
        setAorkh('');
        setRohf('');
        setThelatYetsor(false);
        setMsbarAgla('');
        setSeomYetsor(false);
        setHshhyatYetsor(false);
        setSeomReshion(false);
        setMsbarTsrem('');
        setAemBlamem(false);
        setTsmegSber(false);
        setAorkhBrofel(0);
        setMsbarBrofelmBretA(null);
        setAemTseba(false);
        setAemBashbashol(false);
        setAemKafRetom(false);
        setAemMekhalMaym(false);
        setAemArgazKlem(false);
        setAemGlgalAzer(false);
        setAemReglHnea(false);
        setTvahBrofel('');
        setMsbarBrofelem('');
        setHelkBetBnmet(false);
        setAemRmbaAoRgel('');
        setMotsaremBrofelemSofe([]);
        setConstantDate('2024-12-25T00:00:00.000Z');
        setModalHosfatLkoh(false);
        setMotsaremLhatseg([]);
        setHkhnsot(0);
        setHkhnsotHomreGlem(0);
        setHotsaotSkhar(0);
        setSogBaola('');
        setAeshor(false);
        setHshhyatYetsorZman();
        setMotsaremBroflem([
            {
                kmot: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: 'B5'
            },
            {
                kmot: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: 'B5'
            },
            {
                kmot: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: 'B5'
            },
            {
                kmot: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: 'B5'
            },
            {
                kmot: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: 'B5'
            },
            {
                kmot: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: 'B5'
            }
        ]);
    }

    const Names = [
        GetBrtemMotsarCategory('B7')?.shem,
        GetBrtemMotsarCategory('B1')?.shem,
        GetBrtemMotsarCategory('B2')?.shem,
        GetBrtemMotsarCategory('F4')?.shem,
        GetBrtemMotsarCategory('F5')?.shem,
        GetBrtemMotsarCategory('F6')?.shem,
        GetBrtemMotsarCategory('F7')?.shem,
        GetBrtemMotsarCategory('F3')?.shem,
        GetBrtemMotsarCategory('E1')?.shem,
        GetBrtemMotsarCategory('E2')?.shem,
        GetBrtemMotsarCategory('E3')?.shem,
        GetBrtemMotsarCategory('E4')?.shem,
        GetBrtemMotsarCategory('C1')?.shem,
        GetBrtemMotsarCategory('C2')?.shem,
        GetBrtemMotsarCategory('C3')?.shem,
        GetBrtemMotsarCategory('C4')?.shem,
        GetBrtemMotsarCategory('C5')?.shem,
        GetBrtemMotsarCategory('C6')?.shem,
        GetBrtemMotsarCategory('C7')?.shem,
        GetBrtemMotsarCategory('C8')?.shem,
        GetBrtemMotsarCategory('C10')?.shem,
        GetBrtemMotsarCategory('C11')?.shem,
        GetBrtemMotsarCategory('G1')?.shem,
        GetBrtemMotsarCategory('G2')?.shem,
        GetBrtemMotsarCategory('G3')?.shem,
        GetBrtemMotsarCategory('G4')?.shem,
        GetBrtemMotsarCategory('G5')?.shem,
        GetBrtemMotsarCategory('G6')?.shem,
        GetBrtemMotsarCategory('A1')?.shem,
        GetBrtemMotsarCategory('A10')?.shem,
        GetBrtemMotsarCategory('A3')?.shem,
        GetBrtemMotsarCategory('A2')?.shem,
        GetBrtemMotsarCategory('F2')?.shem,
        GetBrtemMotsarCategory('B5')?.shem,
        GetBrtemMotsarCategory('D1')?.shem,
        GetBrtemMotsarCategory('A4')?.shem,
        GetBrtemMotsarCategory('A5')?.shem,
        GetBrtemMotsarCategory('A6')?.shem,
        GetBrtemMotsarCategory('A7')?.shem,
        GetBrtemMotsarCategory('A8')?.shem,
        GetBrtemMotsarCategory('A9')?.shem,
    ]
    const Remzem = [
        'B7',
        'B1',
        'B2',
        'F4',
        'F5',
        'F6',
        'F7',
        'F3',
        'E1',
        'E2',
        'E3',
        'E4',
        'C1',
        'C2',
        'C3',
        'C4',
        'C5',
        'C6',
        'C7',
        'C8',
        'C10',
        'C11',
        'G1',
        'G2',
        'G3',
        'G4',
        'G5',
        'G6',
        'A1',
        'A10',
        'A3',
        'A2',
        'F2',
        'B5',
        'D1',
        'A4',
        'A5',
        'A6',
        'A7',
        'A8',
        'A9'
    ]
    const getDifferenceBetweenDatetimes = (datetimeLocal1, datetimeLocal2) => {
        const date1 = parseDatetimeLocalToDate(datetimeLocal1);
        const date2 = parseDatetimeLocalToDate(datetimeLocal2);
        const diffInMs = Math.abs(date2 - date1);
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffInSeconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
        return {
            days: diffInDays,
            hours: diffInHours,
            minutes: diffInMinutes,
            seconds: diffInSeconds,
        };
    };

    useEffect(() => {
        if (agla) {
            setAemArgazKlem(agla?.mafenem?.aemArgazKlem);
            setHelkBetBnmet(agla?.mafenem?.aemHelkBet);
            setAemBashbashol(agla?.mafenem?.aemBashbashol);
            setAemBlamem(agla?.mafenem?.aemBlamem);
            setAemGlgalAzer(agla?.mafenem?.aemGlgalAzer);
            setAemKafRetom(agla?.mafenem?.aemKafRetom);
            setAemMekhalMaym(agla?.mafenem?.aemMekhalMaym);
            setAemReglHnea(agla?.mafenem?.aemReglHnea);
            setAemTseba(agla?.mafenem?.aemTseba);
            setTsmegSber(agla?.mafenem?.aemTsmegSber);
            setAorkh(agla?.mafenem?.aorkh);
            setAorkhBrofel(agla?.mafenem?.aorkhBrofel);
            setAemRmbaAoRgel(agla?.mafenem?.deltAemRmbaAoRgel);
            setMsbarBrofelem(agla?.mafenem?.msbarBrofelem);
            setMsbarTsrem(agla?.mafenem?.msbarTsrem);
            setRohf(agla?.mafenem?.rohf);
            setTvahBrofel(agla?.mafenem?.tvahBrofel);
            setMherKlale(agla?.mherMkhera);
            setMotsaremBrofelemSofe(agla?.motsaremBrofelemSofe);
            setLkoh(agla?.msbarLkoh);
            setMafenemMotsarem(agla?.newMafeneMotsarem);
            setSogBaola(agla?.sogBaola);
            setHshhyatYetsor(agla?.thlkhem?.hshheatTahlekhYetsor);
            setHskmatLkoh(agla?.thlkhem?.hskmatLkwah);
            setKveatMher(agla?.thlkhem?.kveatMher);
            setSeomReshion(agla?.thlkhem?.seomThlekhReshion);
            setSeomYetsor(agla?.thlkhem?.seomThlekhYetsor);
            setThelatYetsor(agla?.thlkhem?.thelatYetsor);
            setShaotAboda(agla?.zmnem?.zmanAboda);
            setMsbarAgla(agla?.msbarAgla);
            setSogAskaAgla(agla?.sogAska);
            setMotsaremBroflem(agla?.motsaremBrofelem);
            setConstantDate(agla?.zmnem?.zmanThelatYetsor || '2024-12-25T00:00:00.000Z');
            setHshhyatYetsorZman(getDifferenceBetweenDatetimes(agla?.zmnem?.zmanThelatYetsor || '2024-12-25T00:00:00.000Z', agla?.zmnem?.zmanHasheatYetsor || '2024-12-25T00:00:00.000Z'));
        }
    }, [agla, lkoh]);
    const summedObjects = motsaremBrofelem?.reduce((acc, current) => {
        if (acc[current.shem]) {
            acc[current.shem].kmot += current.kmot;
            acc[current.shem].mher += current.mher;
        } else {
            acc[current.shem] = { ...current };
        }
        return acc;
    }, {});
    const formatDateToDatetimeLocal = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const parseDatetimeLocalToDate = (datetimeLocal) => {
        const [datePart, timePart] = datetimeLocal.split('T');
        const [year, month, day] = datePart.split('-').map(Number);
        const [hours, minutes] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes);
    };

    const checkAemRemezMataem = useCallback((val) => {
        for (let index = 0; index < motsaremLhatseg.length; index++) {
            if (motsaremLhatseg[index] === val) {
                return true;
            }
        }
        return false;
    }, [motsaremLhatseg]);
    const updateMotsaremBrofelem = (index, newValue) => {
        setMotsaremBroflem(prevState => {
            const newState = [...prevState]; // Create a copy of the array
            newState[index] = newValue; // Update the specific index
            return newState; // Return the updated array
        });
    };
    const formatNumber = (number) => {
        const integerPart = Math.floor(number);
        const fractionalPart = (number % 1).toFixed(2).substring(2);
        const formatted = `${integerPart}.${fractionalPart}`;
        return parseFloat(formatted);
    };







    const handleInputChange = useCallback(
        (isElse, index, value, name) => {
            if (isElse) {
                setMotsaremBrofelemSofe(prevMafenemMotsarem => {
                    const newMafenemMotsarem = [...prevMafenemMotsarem];
                    const updatedItem = { ...newMafenemMotsarem[index], [name]: name === 'kmot' || name === 'mher' ? parseInt(value) : value };
                    newMafenemMotsarem[index] = updatedItem;
                    return newMafenemMotsarem;
                });
                setMotsaremBroflem(prevMafenemMotsarem => {
                    const newMafenemMotsarem = [...prevMafenemMotsarem];
                    const updatedItem = { ...newMafenemMotsarem[index], [name]: name === 'kmot' || name === 'mher' ? parseInt(value) : value };
                    newMafenemMotsarem[index] = updatedItem;
                    return newMafenemMotsarem;
                });
            }
            else {
                setMafenemMotsarem(prevMafenemMotsarem => {
                    const newMafenemMotsarem = [...prevMafenemMotsarem];
                    const updatedItem = { ...newMafenemMotsarem[index], [name]: name === 'kmot' || name === 'mher' ? parseInt(value) : value };
                    newMafenemMotsarem[index] = updatedItem;
                    return newMafenemMotsarem;
                });
            }
        },
        [mafenemMotsarem, motsaremBrofelemSofe] // was setMafenemMotsarem
    );
    const renderDropdown = (index, isElse, item) => (
        <Dropdown dir="rtl">
            <DropdownTrigger>
                <Button isDisabled={isElse} size="xs" className='m-2'>
                    {item?.shem || 'בחר פריט'}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Multiple selection example"
                variant="flat"
                closeOnSelect={true}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={item?.shem}
                onSelectionChange={(val) => { handleInputChange(isElse, index, val.currentKey, 'shem'); handleInputChange(isElse, index, GetBrtemMotsarMlae(item?.remez, val.currentKey).kmot, 'kmot'); handleInputChange(isElse, index, GetBrtemMotsarMlae(item?.remez, val.currentKey).kmot * GetBrtemMotsarMlae(item?.remez, val.currentKey).alot, 'mher') }}
            >
                {GetBrtemMotsarMlae(item?.remez).arrayResualt.map((option) => (
                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
    const renderDropdownWithInputs = useCallback((item, shemSog, index, isElse,motsareem) => (
        <div>
            <div className="mt-5 flex justify-around items-center">
                <div className="w-[200px] rounded-xl flex items-center">
                    <Avatar size="sm" className="ml-5" />
                    <div>{shemSog}</div>
                </div>
                <div className="w-[250px]">{renderDropdown(index, isElse, item)}</div>
                <div className="w-[250px] flex items-center">
                    <Input
                        type="number"
                        size="sm"
                        isDisabled={!item?.shem}
                        className="max-w-[100px]"
                        color="primary"
                        onValueChange={(val) => { handleInputChange(isElse, index, Math.min(val, (GetBrtemMotsarMlae(item?.remez, item?.shem).kmot + (motsareem ? (motsareem[index]?.kmot || 0) : 0))), 'kmot'); handleInputChange(isElse, index, Math.min(val, GetBrtemMotsarMlae(item?.remez, item?.shem).kmot) * GetBrtemMotsarMlae(item?.remez, item?.shem).alot, 'mher') }}
                        value={item?.kmot}
                        labelPlacement="outside-left"
                        label="כמות"
                    />
                    {
                        item?.shem &&
                        <div className={`text-[13px] mr-2`}>
                            {
                                motsareem && (motsareem[index]?.shem === item.shem) && (motsareem[index]?.kmot) ?
                                ((GetBrtemMotsarMlae(item?.remez, item?.shem).kmot - (item?.kmot - motsareem[index]?.kmot)) == 0) ?
                                    <div className="text-white bg-warning pt-1 pb-1 pr-2 pl-2 rounded-3xl">כמות אחרונה</div>
                                    :
                                    <div className="text-white bg-success pt-1 pb-1 pr-2 pl-2 rounded-3xl">נשאר במלאי : {(GetBrtemMotsarMlae(item?.remez, item?.shem).kmot - (item?.kmot - motsareem[index]?.kmot))}</div>
                                :
                                (((GetBrtemMotsarMlae(item?.remez, item?.shem).kmot) - item?.kmot) == 0) ?
                                    <div className="text-white bg-warning pt-1 pb-1 pr-2 pl-2 rounded-3xl">כמות אחרונה</div>
                                    :
                                    <div className="text-white bg-success pt-1 pb-1 pr-2 pl-2 rounded-3xl">נשאר במלאי : {(GetBrtemMotsarMlae(item?.remez, item?.shem).kmot) - item?.kmot}</div>
                            }
                        </div>
                    }
                </div>
                <div className="w-[250px]">
                    <Input
                        isReadOnly
                        value={item?.mher || 0}
                        size="sm"
                        className="max-w-[100px]"
                        color="primary"
                        labelPlacement="outside-left"
                        label="מחיר"
                    />
                </div>
            </div>
            <Divider className="mt-5 mb-5" />
        </div>
    ), [GetBrtemMotsarMlae]);


    const GetCategoryAglot = () => {
        for (let index = 0; index < category.length; index++) {
            if(category[index].id === 'S'){
                return category[index];
            }
        }
        return null;
    }

    const BdekatMtsavE = () => {
        if(Aeshor){
            return true;
        }
        return false;
    }
    const BdekatMtsavD = () => {
        if (seomYetsor && msbarAgla && seomReshaion) {
            return true;
        }
        return false;
    }
    const BdekatMtsavC = () => {
        if (thelatYetsor) {
            return true;
        }
        return false;
    }
    const BdekatMtsavB = () => {
        if (kveatMher && hskmatLkoh && shaotAboda) {
            return true;
        }
        return false;
    }
    const BdekatMtsavA = () => {
        if (lkoh) {
            return true;
        }
        return false;
    }
    const BdekatMtsavem = () => {
        if (BdekatMtsavE()) { // אישור
            return 'E';
        }
        else if (BdekatMtsavD()) { // seomYetsor/זמן מינמאלי - msabrAgla - seomReshaion
            return 'D';
        }
        else if (BdekatMtsavA() && BdekatMtsavB() && BdekatMtsavC()) { // thelatYetsor
            return 'C';
        }
        else if (BdekatMtsavA() && BdekatMtsavB()) { // motsaremHovaX - hskmatLkoh - kveatMher/mher - shaotAboda 
            return 'B';
        }
        else if (BdekatMtsavA()) {
            return 'A'; // sogAska - lkoh
        }
        else {
            return false;
        }
    }
    const addValues = async () => {
        const Props = {
            sogAska : "ייצור",
            msbar: counter?.count,
            mherMkhera: parseFloat(mherKlale),
            msbarAgla: msbarAgla,
            msbarLkoh: lkohMsbar,
            sogBaola: BdekatMtsavem(),
            tarekh: format(new Date(), 'dd-MM-yyyy'),
            zmnem: {
                zmanThela: null,
                zmanThelatYetsor: thelatYetsor ? formatDateToDatetimeLocal(new Date) : null,
                zmanSeomYetsor: seomYetsor ? formatDateToDatetimeLocal(new Date) : null,
                zmanHskmatLkoh: hskmatLkoh ? formatDateToDatetimeLocal(new Date) : null,
                zmanHasheatYetsor: hshhyatYetsor ? formatDateToDatetimeLocal(new Date) : null,
                zmanSeomReshion: seomReshaion ? formatDateToDatetimeLocal(new Date) : null,
                zmanKbeatMher: kveatMher ? formatDateToDatetimeLocal(new Date) : null,
                zmanAboda: shaotAboda
            },
            tmher: {
                ahozRevah: 0,
                hkhnsot: 0,
                hotsaotHomreGlem: 0,
                hotsaotSkhar: 0,
                hotsotAkefot: 0,
                maam: 0,
                revahYsher: 0,
                revhNke: 0,
            },
            thlkhem: {
                thelatYetsor: thelatYetsor,
                hskmatLkwah: hskmatLkoh,
                hshheatTahlekhYetsor: hshhyatYetsor,
                kveatMher: kveatMher,
                seomThlekhReshion: seomReshaion,
                seomThlekhYetsor: seomYetsor
            },
            mafenem: {
                aorkh: parseFloat(aorkh),
                rohf: parseFloat(rohf),
                msbarTsrem: parseFloat(msbarTsrem),
                aemBlamem: aemBlamem,
                aemTsmegSber: tsmegSber,
                aorkhBrofel: aorkhBrofel,
                msbarBrofelem: msbarBrofelem,
                tvahBrofel: tvahBrofel,
                aemHelkBet: helkBetBnmet,
                deltAemRmbaAoRgel: aemRmbaAoRgel,
                aemTseba: aemTseba,
                aemBashbashol: aemBashbashol,
                aemKafRetom: aemKafRetom,
                aemMekhalMaym: aemMekhalMaym,
                aemArgazKlem: aemArgazKlem,
                aemGlgalAzer: aemGlgalAzer,
                aemReglHnea: aemReglHnea
            },
            motsaremBrofelemSofe: motsaremBrofelemSofe,
            motsaremBrofelem: motsaremBrofelem,
            newMafeneMotsarem: mafenemMotsarem

        }
        if (agla) {
            try {
                updateDoc(doc(firestore, 'tfaol', agla?.id), {
                    mherMkhera: (agla?.mherMkhera !== mherKlale) && (mherKlale !== '') ? mherKlale : agla?.mherMkhera,
                    sogBaola: BdekatMtsavem(),
                    msbarAgla: msbarAgla,
                    zmnem: {
                        zmanThela: null,
                        zmanThelatYetsor: agla?.thlkhem?.thelatYetsor ? agla?.zmnem?.zmanThelatYetsor : thelatYetsor ? formatDateToDatetimeLocal(new Date) : null,
                        zmanSeomYetsor: agla?.thlkhem?.seomThlekhYetsor ? agla?.zmnem?.zmanSeomYetsor : seomYetsor ? formatDateToDatetimeLocal(new Date) : null,
                        zmanHskmatLkoh: agla?.thlkhem?.hskmatLkwah ? agla?.zmnem?.zmanHskmatLkoh : hskmatLkoh ? formatDateToDatetimeLocal(new Date) : null,
                        zmanHasheatYetsor: hshhyatYetsor && !agla?.zmnem?.zmanHasheatYetsor ? formatDateToDatetimeLocal(new Date) : !hshhyatYetsor ? null : agla?.zmnem?.zmanHasheatYetsor,
                        zmanSeomReshion: agla?.thlkhem?.seomThlekhReshion ? agla?.zmnem?.zmanSeomReshion : seomReshaion ? formatDateToDatetimeLocal(new Date) : null,
                        zmanKbeatMher: agla?.thlkhem?.kveatMher ? agla?.zmnem?.zmanKbeatMher : kveatMher ? formatDateToDatetimeLocal(new Date) : null,
                        zmanAboda: shaotAboda
                    },
                    tmher: {
                        ahozRevah: 0,
                        hkhnsot: 0,
                        hotsaotHomreGlem: 0,
                        hotsaotSkhar: 0,
                        hotsotAkefot: 0,
                        maam: 0,
                        revahYsher: 0,
                        revhNke: 0,
                    },
                    thlkhem: {
                        thelatYetsor: agla?.thlkhem?.thelatYetsor || thelatYetsor,
                        hskmatLkwah: agla?.thlkhem?.hskmatLkwah || hskmatLkoh,
                        hshheatTahlekhYetsor: agla?.thlkhem?.hshheatTahlekhYetsor || hshhyatYetsor,
                        kveatMher: agla?.thlkhem?.kveatMher || kveatMher,
                        seomThlekhReshion: agla?.thlkhem?.seomThlekhReshion || seomReshaion,
                        seomThlekhYetsor: agla?.thlkhem?.seomThlekhYetsor || seomYetsor
                    },
                    mafenem: {
                        aorkh: aorkh,
                        rohf: rohf,
                        msbarTsrem: msbarTsrem,
                        aemBlamem: aemBlamem,
                        aemTsmegSber: tsmegSber,
                        aorkhBrofel: aorkhBrofel,
                        msbarBrofelem: msbarBrofelem,
                        tvahBrofel: tvahBrofel,
                        aemHelkBet: helkBetBnmet,
                        deltAemRmbaAoRgel: aemRmbaAoRgel,
                        aemTseba: aemTseba,
                        aemBashbashol: aemBashbashol,
                        aemKafRetom: aemKafRetom,
                        aemMekhalMaym: aemMekhalMaym,
                        aemArgazKlem: aemArgazKlem,
                        aemGlgalAzer: aemGlgalAzer,
                        aemReglHnea: aemReglHnea
                    },
                    motsaremBrofelemSofe: motsaremBrofelemSofe,
                    motsaremBrofelem: motsaremBrofelem,
                    newMafeneMotsarem: mafenemMotsarem
                });
                if(BdekatMtsavem() === 'C'){
                    await updateInventory(firestore, mlae, mafenemMotsarem, agla?.newMafeneMotsarem);
                    await updateInventory(firestore, mlae, motsaremBrofelem, agla?.motsaremBrofelem);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            try {
                if(BdekatMtsavem() === 'C'){
                    await processItems(mafenemMotsarem, mlae);
                    await processItems(motsaremBrofelemSofe, mlae);
                }
                await addDoc(collection(firestore, "tfaol"), Props);
            }
            catch (e) {
                console.log(Props);
                console.log(e);
            }
        }
        !agla && await updateDoc(doc(firestore, 'metadata', counter?.id), { count: counter?.count + 1 });
        ResetAll();
        disable();
    }
    
    async function updateInventory(firestore, mlae, currentItems, newItems) {
        for (let index = 0; index < currentItems.length; index++) {
            const currentItem = currentItems[index];
            const newItem = newItems ? newItems[index] : null;
    
            if (!newItem || currentItem.shem !== newItem.shem) {
                for (let mlaeItem of mlae) {
                    if (newItem && mlaeItem.categoryMotsar === newItem.remez && mlaeItem.shem === newItem.shem) {
                        await updateDoc(doc(firestore, 'mlae', mlaeItem.id), {
                            kmot: mlaeItem.kmot + newItem.kmot
                        });
                    }
                    if (mlaeItem.categoryMotsar === currentItem.remez && mlaeItem.shem === currentItem.shem) {
                        await updateDoc(doc(firestore, 'mlae', mlaeItem.id), {
                            kmot: mlaeItem.kmot - currentItem.kmot
                        });
                    }
                }
            } else if (currentItem.kmot !== newItem.kmot && currentItem.shem === newItem.shem) {
                for (let mlaeItem of mlae) {
                    if (mlaeItem.categoryMotsar === currentItem.remez && mlaeItem.shem === currentItem.shem) {
                        const kmotDifference = newItem.kmot - currentItem.kmot;
                        await updateDoc(doc(firestore, 'mlae', mlaeItem.id), {
                            kmot: mlaeItem.kmot + kmotDifference
                        });
                    }
                }
            }
        }
    }

    async function processItems(items, mlae) {
        for (let item of items) {
            if (item.shem !== 'בחר פריט' && item.shem !== '' && item.kmot > 0) {
                for (let mlaeItem of mlae) {
                    if (item.shem === mlaeItem.shem && item.remez === mlaeItem.categoryMotsar) {
                        try {
                            await updateDoc(doc(firestore, 'mlae', mlaeItem.id), {
                                kmot: mlaeItem.kmot - item.kmot
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            }
        }
    }

    useEffect(() => {
        motsaremBrofelem && setMotsaremBrofelemSofe(Object.values(summedObjects));
    }, [motsaremBrofelem]);
    useEffect(() => {
        const initialMafenemMotsarem = Remzem.map(remez => ({
            kmot: 0,
            mher: 0,
            shem: '',
            remez: remez
        }));
        setMafenemMotsarem(initialMafenemMotsarem);
    }, []);
    useEffect(() => {
        if (rohf && aorkh) {
            setMotsaremLhatseg((prevItems) => [
                ...prevItems,
                'B7', 'B1', 'B2', 'F4', 'F5', 'F6', 'F7', 'F3',
                'E1', 'E2', 'E3', 'E4', 'C1', 'C2', 'C3', 'C4', 'C5',
                'C6', 'C7', 'C8', 'C10', 'C11', 'G1', 'G2', 'G3', 'G4',
                'G5', 'G6'
            ]);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => ![
                'B7', 'B1', 'B2', 'F4', 'F5', 'F6', 'F7', 'F3',
                'E1', 'E2', 'E3', 'E4', 'C1', 'C2', 'C3', 'C4', 'C5',
                'C6', 'C7', 'C8', 'C10', 'C11', 'G1', 'G2', 'G3', 'G4',
                'G5', 'G6'
            ].includes(item)));
        }
    }, [aorkh, rohf]);
    useEffect(() => {
        if (aemTseba) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'D1']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'D1'));
        }
        if (aemBashbashol) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A4']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A4'));
        }
        if (aemKafRetom) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A5']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A5'));
        }
        if (aemMekhalMaym) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A6']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A6'));
        }
        if (aemArgazKlem) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A7']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A7'));
        }
        if (aemGlgalAzer) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A8']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A8'));
        }
        if (aemReglHnea) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A9']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A9'));
        }
        if (aemBlamem) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'F2']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'F2'));
        }
        if (tsmegSber) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'C1']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'C1'));
        }
    }, [tsmegSber, aemBlamem, aemTseba, aemBashbashol, aemKafRetom, aemMekhalMaym, aemArgazKlem, aemGlgalAzer, aemReglHnea]);
    useEffect(() => {
        if (msbarTsrem === '1') {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A2'));
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A1', 'A10', 'A3']);
        }
        else if (msbarTsrem === '2') {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A1'));
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A2', 'A10', 'A3']);
        }
    }, [msbarTsrem]);
    useEffect(() => {
        const total1 = motsaremBrofelemSofe?.reduce((acc, motsar) => acc + motsar.mher, 0);
        const total2 = mafenemMotsarem?.reduce((acc, motsar) => acc + motsar.mher, 0);
        setHkhnsotHomreGlem(total1 + total2);
    }, [motsaremBrofelemSofe, mafenemMotsarem]);


    const [errorMessage, setErrorMessage] = useState(false);
    const [errorMessageText, setErrorMessageText] = useState('');


    //<Button onClick={() => setIsVisible(handleClick)}>123</Button>
    //{isVisible && <div>This element will disappear after 3 seconds.</div>}

    const checkSeomRishion = () => {
        if (!seomReshaion) {
            if (msbarAgla) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    const checkSeomRishion2 = () => {
        if (!seomReshaion) {
            if (msbarAgla) {
                setErrorMessage(false);
                setErrorMessageText('');
            }
            else {
                setErrorMessage(true);
                setTimeout(() => {
                    setErrorMessage(false);
                }, 2000);
                setErrorMessageText('חייב לשים מספר עגלה להמשיך');
            }
        }
    }

    const HosfatAglaLmlae = async() => {
        try {
            updateDoc(doc(firestore, 'tfaol', agla?.id), {
                mherMkhera: (agla?.mherMkhera !== mherKlale) && (mherKlale !== '') ? mherKlale : agla?.mherMkhera,
                sogBaola: 'G',
                msbarAgla: msbarAgla,
                zmnem: {
                    zmanThela: null,
                    zmanThelatYetsor: agla?.thlkhem?.thelatYetsor ? agla?.zmnem?.zmanThelatYetsor : thelatYetsor ? formatDateToDatetimeLocal(new Date) : null,
                    zmanSeomYetsor: agla?.thlkhem?.seomThlekhYetsor ? agla?.zmnem?.zmanSeomYetsor : seomYetsor ? formatDateToDatetimeLocal(new Date) : null,
                    zmanHskmatLkoh: agla?.thlkhem?.hskmatLkwah ? agla?.zmnem?.zmanHskmatLkoh : hskmatLkoh ? formatDateToDatetimeLocal(new Date) : null,
                    zmanHasheatYetsor: hshhyatYetsor && !agla?.zmnem?.zmanHasheatYetsor ? formatDateToDatetimeLocal(new Date) : !hshhyatYetsor ? null : agla?.zmnem?.zmanHasheatYetsor,
                    zmanSeomReshion: agla?.thlkhem?.seomThlekhReshion ? agla?.zmnem?.zmanSeomReshion : seomReshaion ? formatDateToDatetimeLocal(new Date) : null,
                    zmanKbeatMher: agla?.thlkhem?.kveatMher ? agla?.zmnem?.zmanKbeatMher : kveatMher ? formatDateToDatetimeLocal(new Date) : null,
                    zmanAboda: shaotAboda
                },
                tmher: {
                    ahozRevah: 0,
                    hkhnsot: 0,
                    hotsaotHomreGlem: 0,
                    hotsaotSkhar: 0,
                    hotsotAkefot: 0,
                    maam: 0,
                    revahYsher: 0,
                    revhNke: 0,
                },
                thlkhem: {
                    thelatYetsor: agla?.thlkhem?.thelatYetsor || thelatYetsor,
                    hskmatLkwah: agla?.thlkhem?.hskmatLkwah || hskmatLkoh,
                    hshheatTahlekhYetsor: agla?.thlkhem?.hshheatTahlekhYetsor || hshhyatYetsor,
                    kveatMher: agla?.thlkhem?.kveatMher || kveatMher,
                    seomThlekhReshion: agla?.thlkhem?.seomThlekhReshion || seomReshaion,
                    seomThlekhYetsor: agla?.thlkhem?.seomThlekhYetsor || seomYetsor
                },
                mafenem: {
                    aorkh: aorkh,
                    rohf: rohf,
                    msbarTsrem: msbarTsrem,
                    aemBlamem: aemBlamem,
                    aemTsmegSber: tsmegSber,
                    aorkhBrofel: aorkhBrofel,
                    msbarBrofelem: msbarBrofelem,
                    tvahBrofel: tvahBrofel,
                    aemHelkBet: helkBetBnmet,
                    deltAemRmbaAoRgel: aemRmbaAoRgel,
                    aemTseba: aemTseba,
                    aemBashbashol: aemBashbashol,
                    aemKafRetom: aemKafRetom,
                    aemMekhalMaym: aemMekhalMaym,
                    aemArgazKlem: aemArgazKlem,
                    aemGlgalAzer: aemGlgalAzer,
                    aemReglHnea: aemReglHnea
                },
                motsaremBrofelemSofe: motsaremBrofelemSofe,
                motsaremBrofelem: motsaremBrofelem,
                newMafeneMotsarem: mafenemMotsarem
            });
        }
        catch (e) {
            console.log(e);
        }
        ResetAll();
        disable();
    }

    const berokAgla = async(motsaremmm,Brofelemmm) => {
        const summedObjectsBro = Brofelemmm?.reduce((acc, current) => {
            if (acc[current.shem]) {
                acc[current.shem].kmot += current.kmot;
                acc[current.shem].mher += current.mher;
            } else {
                acc[current.shem] = { ...current };
            }
            return acc;
        }, {});
        try {
            updateDoc(doc(firestore, 'tfaol', agla?.id), {
                mherMkhera: (agla?.mherMkhera !== mherKlale) && (mherKlale !== '') ? mherKlale : agla?.mherMkhera,
                sogBaola: 'F',
                msbarAgla: msbarAgla,
                zmnem: {
                    zmanThela: null,
                    zmanThelatYetsor: agla?.thlkhem?.thelatYetsor ? agla?.zmnem?.zmanThelatYetsor : thelatYetsor ? formatDateToDatetimeLocal(new Date) : null,
                    zmanSeomYetsor: agla?.thlkhem?.seomThlekhYetsor ? agla?.zmnem?.zmanSeomYetsor : seomYetsor ? formatDateToDatetimeLocal(new Date) : null,
                    zmanHskmatLkoh: agla?.thlkhem?.hskmatLkwah ? agla?.zmnem?.zmanHskmatLkoh : hskmatLkoh ? formatDateToDatetimeLocal(new Date) : null,
                    zmanHasheatYetsor: hshhyatYetsor && !agla?.zmnem?.zmanHasheatYetsor ? formatDateToDatetimeLocal(new Date) : !hshhyatYetsor ? null : agla?.zmnem?.zmanHasheatYetsor,
                    zmanSeomReshion: agla?.thlkhem?.seomThlekhReshion ? agla?.zmnem?.zmanSeomReshion : seomReshaion ? formatDateToDatetimeLocal(new Date) : null,
                    zmanKbeatMher: agla?.thlkhem?.kveatMher ? agla?.zmnem?.zmanKbeatMher : kveatMher ? formatDateToDatetimeLocal(new Date) : null,
                    zmanAboda: shaotAboda
                },
                tmher: {
                    ahozRevah: 0,
                    hkhnsot: 0,
                    hotsaotHomreGlem: 0,
                    hotsaotSkhar: 0,
                    hotsotAkefot: 0,
                    maam: 0,
                    revahYsher: 0,
                    revhNke: 0,
                },
                thlkhem: {
                    thelatYetsor: agla?.thlkhem?.thelatYetsor || thelatYetsor,
                    hskmatLkwah: agla?.thlkhem?.hskmatLkwah || hskmatLkoh,
                    hshheatTahlekhYetsor: agla?.thlkhem?.hshheatTahlekhYetsor || hshhyatYetsor,
                    kveatMher: agla?.thlkhem?.kveatMher || kveatMher,
                    seomThlekhReshion: agla?.thlkhem?.seomThlekhReshion || seomReshaion,
                    seomThlekhYetsor: agla?.thlkhem?.seomThlekhYetsor || seomYetsor
                },
                mafenem: {
                    aorkh: aorkh,
                    rohf: rohf,
                    msbarTsrem: msbarTsrem,
                    aemBlamem: aemBlamem,
                    aemTsmegSber: tsmegSber,
                    aorkhBrofel: aorkhBrofel,
                    msbarBrofelem: msbarBrofelem,
                    tvahBrofel: tvahBrofel,
                    aemHelkBet: helkBetBnmet,
                    deltAemRmbaAoRgel: aemRmbaAoRgel,
                    aemTseba: aemTseba,
                    aemBashbashol: aemBashbashol,
                    aemKafRetom: aemKafRetom,
                    aemMekhalMaym: aemMekhalMaym,
                    aemArgazKlem: aemArgazKlem,
                    aemGlgalAzer: aemGlgalAzer,
                    aemReglHnea: aemReglHnea
                },
                motsaremBrofelemSofe: Object.values(summedObjectsBro),
                motsaremBrofelem: Brofelemmm,
                newMafeneMotsarem: motsaremmm
            });
            await updateInventory(firestore, mlae, motsaremmm, mafenemMotsarem);
            await updateInventory(firestore, mlae, Brofelemmm, motsaremBrofelem);
        }
        catch (e) {
            console.log(e);
        }
        ResetAll();
        disable();
    }

    console.log(lkhot)


    const [showModalMessage,setShowModalMessage] = useState(false);
    const [Aeshor,setAeshor] = useState(null);
    const [showModalCategoryAgla,setShowModalCategoryAgla] = useState(false);
    const [showModalBerokAgla,setShowModalBerokAgla] = useState(false);


    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="full" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalBody className="border-b-2">
                        <div className="fixed inset-0 z-50 overflow-auto bg-whitte bg-opacity-50">
                            <div className="flex justify-center items-center h-full">
                                <div className="w-full h-full flex flex-col">
                                    {
                                        errorMessage &&
                                        <div className=" absolute w-[700px] top-1/4 right-1/3 z-50">
                                            <Card className="border-red-600 border-1">
                                                <CardBody>
                                                    <div dir="rtl" className="flex items-center">
                                                        <div>
                                                            <RiErrorWarningFill className="text-red-600 text-2xl" />
                                                        </div>
                                                        <div className="text-base mr-4 text-red-600">
                                                            {errorMessageText}
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    }
                                    {
                                        (sogAska === 'ייצור' || (agla && agla?.sogBaola === 'A' || agla?.sogBaola === 'B' || agla?.sogBaola === 'C')) &&
                                        <div className="w-full h-full flex">
                                            <div className="w-1/3 h-full border-r-4 ">
                                                <div className="flex justify-center items-center h-full">
                                                    <div>
                                                        <div className="flex justify-center">
                                                            <div className="bg-primary w-[200px] text-center text-white text-xl rounded-2xl">
                                                                תמחיר
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center mt-20 mb-3">
                                                            <div className="flex items-center" dir="rtl">
                                                                <div className="ml-5 w-[110px] text-green-500">הכנסות</div>
                                                                <Input isReadOnly size="xs" className="w-[100px]" color="success" value={hkhnsot} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                        <div className="flex justify-center mt-3 mb-3">
                                                            <div className="flex items-center" dir="rtl">
                                                                <div className="ml-5 w-[110px] text-danger-500">הוצאות חו"ג</div>
                                                                <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={hkhnsotHomreGlem} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                        <div className="flex justify-center mt-3 mb-3">
                                                            <div className="flex items-center" dir="rtl">
                                                                <div className="ml-5 w-[110px] text-danger-500">הוצאות שכר</div>
                                                                <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={hotsotSkhar} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                        <div className="flex justify-center mt-3 mb-3">
                                                            <div className="flex items-center" dir="rtl">
                                                                <div className="ml-5 w-[110px] text-green-500">רווח ישיר</div>
                                                                <Input isReadOnly size="xs" className="w-[100px]" color="success" value={hkhnsot - hkhnsotHomreGlem - hotsotSkhar} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                        <div className="flex justify-center mt-3 mb-3">
                                                            <div className="flex items-center" dir="rtl">
                                                                <div className="ml-5 w-[110px] text-danger-500">הוצאות עקיפות</div>
                                                                <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={'23'} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                        <div className="flex justify-center mt-3 mb-3">
                                                            <div className="flex items-center" dir="rtl">
                                                                <div className="ml-5 w-[110px] text-danger-500">השפעת מע"ם</div>
                                                                <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={'23'} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                        <div className="flex justify-center mt-3 mb-3">
                                                            <div className="flex items-center" dir="rtl">
                                                                <div className="ml-5 w-[110px] text-green-500">רווח נקי</div>
                                                                <Input isReadOnly size="xs" className="w-[100px]" color="success" value={'23'} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                        <div className="flex justify-center mt-5">
                                                            <div className="flex items-center" dir="rtl">
                                                                <div className="ml-5 w-[110px] text-green-500">אחוז רווח</div>
                                                                <Input isReadOnly size="xs" className="w-[100px]" color="success" value={'23'} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full h-full flex flex-col">
                                                <div className="w-full h-1/3 min-h-[230px] border-b-4">
                                                    <div dir="rtl" className="h-full flex justify-around items-center">
                                                        <div>
                                                            <div>
                                                                {
                                                                    agla?.msbarLkoh ?
                                                                        <Input color="primary" className="max-w-[200px] mb-5" isReadOnly label="לקןח" value={lkohTfaol?.name} />
                                                                        :
                                                                        <div>
                                                                            <div className="flex justify-center cursor-pointer"><div className="text-primary flex items-center mt-2">הוספה<AiOutlinePlus className="mr-2"/></div></div>
                                                                            <Autocomplete
                                                                                label="בחר לקוח"
                                                                                className="max-w-[200px] mt-2"
                                                                                color="primary"
                                                                                defaultItems={lkhot}
                                                                                onSelectionChange={setLkoh}
                                                                                onInputChange={setLkoh}
                                                                            >
                                                                                {
                                                                                    lkhot.map((lko, index) => (
                                                                                        <AutocompleteItem onClick={() => setLkohMsbar(lko.idnum)} className='text-right' key={lko?.name} value={lko?.name}>
                                                                                            {lko?.name}
                                                                                        </AutocompleteItem>
                                                                                    ))
                                                                                }
                                                                            </Autocomplete>
                                                                        </div>
                                                                }
                                                            </div>
                                                            {
                                                                agla?.msbarAgla ?
                                                                    <Input color="primary" className="max-w-[200px]" isReadOnly label="מספר עגלה" value={agla?.msbarAgla} />
                                                                    :
                                                                    <div>
                                                                        <div className="flex justify-center cursor-pointer"><div className="text-primary flex items-center mt-2">הוספה<AiOutlinePlus className="mr-2"/></div></div>
                                                                        <Autocomplete
                                                                            label="מספר עגלה"
                                                                            className="max-w-[200px] mt-2"
                                                                            color="primary"
                                                                            defaultItems={aglot}
                                                                            onSelectionChange={setMsbarAgla}
                                                                            onInputChange={setMsbarAgla}
                                                                        >
                                                                            {
                                                                                aglot.map((agla, index) => (
                                                                                    <AutocompleteItem className='text-right' key={agla?.dragnum} value={agla?.dragnum}>
                                                                                        {agla?.dragnum}
                                                                                    </AutocompleteItem>
                                                                                ))
                                                                            }

                                                                        </Autocomplete>
                                                                    </div>
                                                            }
                                                        </div>
                                                        <div>
                                                            <div className="mt-2">
                                                                <Switch isReadOnly={agla?.thlkhem?.hskmatLkwah} defaultSelected={agla?.thlkhem?.hskmatLkwah} value={hskmatLkoh} onValueChange={(val) => setHskmatLkoh(val)}>
                                                                    <div className="mr-2">הסכמת לקוח</div>
                                                                </Switch>
                                                            </div>
                                                            <div className="mt-2">
                                                                <Switch isReadOnly={agla?.thlkhem?.thelatYetsor || !BdekatMtsavB() || !BdekatMtsavA()} defaultSelected={agla?.thlkhem?.thelatYetsor} value={thelatYetsor} onValueChange={(val) => setThelatYetsor(val)}>
                                                                    <div className="mr-2">תחילת ייצור</div>
                                                                </Switch>
                                                            </div>
                                                            {
                                                                agla && (agla?.thlkhem?.hskmatLkwah) && (agla?.thlkhem?.thelatYetsor) &&
                                                                <>
                                                                    <div className="mt-2">
                                                                        <Switch defaultSelected={agla?.thlkhem?.hshheatTahlekhYetsor} value={hshhyatYetsor} onValueChange={(val) => setHshhyatYetsor(val)}>
                                                                            <div className="mr-2">השהיית ייצור</div>
                                                                        </Switch>
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <Switch isReadOnly={agla?.thlkhem?.seomThlekhYetsor} defaultSelected={agla?.thlkhem?.seomThlekhYetsor} value={seomYetsor} onValueChange={(val) => setSeomYetsor(val)}>
                                                                            <div className="mr-2">סיום יצור</div>
                                                                        </Switch>
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <Switch onClick={checkSeomRishion2} isReadOnly={agla?.thlkhem?.seomThlekhReshion || !checkSeomRishion()} defaultSelected={agla?.thlkhem?.seomThlekhReshion} value={seomReshaion} onValueChange={(val) => setSeomReshion(val)}>
                                                                            <div className="mr-2">סיום רישיון</div>
                                                                        </Switch>
                                                                    </div>
                                                                </>
                                                            }
                                                        </div>
                                                        {
                                                            agla?.thlkhem?.thelatYetsor && !agla?.thlkhem?.seomThlekhYetsor &&
                                                            <div>
                                                                <div className="">
                                                                    <div className="w-[230px] bg-gray-300 p-3 rounded-t-xl flex justify-center">
                                                                        <div className="items-center flex">
                                                                            <div>זמן יצור</div>
                                                                            <MdOutlineTimer className="mr-2 text-2xl" />
                                                                        </div>
                                                                    </div>
                                                                    <div dir="ltr" className="w-[230px] text-center bg-danger-200 p-3">
                                                                        <div className="flex justify-center">
                                                                            {
                                                                                agla?.thlkhem?.hshheatTahlekhYetsor ?
                                                                                    <><div className="w-[300px] text-left">{hshhyatYetsorZman.days + ":" + hshhyatYetsorZman.hours + ":" + hshhyatYetsorZman.minutes + ":" + hshhyatYetsorZman.seconds}</div><div className="w-[300px] text-right">: זמן עבר</div></>
                                                                                    :
                                                                                    <><div className="w-[300px] text-left"><CountdownComponent constantDate={constantDate} /></div><div className="w-[300px] text-right">: זמן עבר</div></>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div dir="ltr" className="w-[230px] text-center bg-primary-200 p-3 rounded-b-xl">
                                                                        <div className="flex justify-center">
                                                                            <div className="w-[300px] text-left">{parseDatetimeLocalToDate(constantDate).getDate() + "/" + (parseDatetimeLocalToDate(constantDate).getMonth() + 1) + " - " + parseDatetimeLocalToDate(constantDate).getHours() + ":" + parseDatetimeLocalToDate(constantDate).getMinutes()}</div><div className="w-[300px] text-right">: זמן התחלה</div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div>
                                                            <div>
                                                                <div className="flex items-center">
                                                                    <div className="min-w-[100px]">מחיר כללי</div>
                                                                    <Input type="number" value={mherKlale} onValueChange={(val) => setMherKlale(val)} color="primary" className="max-w-[150px]" />
                                                                </div>
                                                                <div className="mt-4 mb-4 flex justify-center">
                                                                    <Switch isReadOnly={agla?.thlkhem?.kveatMher} defaultSelected={agla?.thlkhem?.kveatMher} value={kveatMher} onValueChange={(val) => setKveatMher(val)}>
                                                                        <div className="mr-2">קביעת מחיר</div>
                                                                    </Switch>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <div className="min-w-[100px]">שעות עבודה</div>
                                                                    <Input type="number" value={shaotAboda} onValueChange={(val) => setShaotAboda(val)} color="primary" className="max-w-[150px]" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full h-2/3 flex">
                                                    <div className="w-full h-full max-h-[900px] overflow-auto border-r-4 p-5">
                                                        <div dir="rtl">
                                                            {
                                                                mafenemMotsarem?.map((motsar, index) => {
                                                                    return <div>{checkAemRemezMataem(motsar.remez) && renderDropdownWithInputs(motsar, Names[index], index, false,agla?.newMafeneMotsarem)}</div>
                                                                })
                                                            }
                                                            {
                                                                motsaremBrofelemSofe?.map((brofel, index) => {
                                                                    return brofel?.shem !== 'בחר פריט' && <div>{renderDropdownWithInputs(brofel, Names[33], index, true,agla?.motsaremBrofelem)}</div>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="w-full max-w-[600px] h-full max-h-[900px] overflow-auto p-5">
                                                        <div dir="rtl">
                                                            {
                                                                motsaremBrofelem && <table className="h-full">
                                                                    <thead>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th className="w-[150px]">שטח עגלה</th>
                                                                            <th><Input value={aorkh} onValueChange={(val) => { setAorkh(val); setTvahBrofel(''); setMsbarBrofelem(''); }} color="primary" size="sm" className="w-[100px]" label="אורך" type="number" /></th>
                                                                            <th><Input value={rohf} onValueChange={(val) => { setRohf(val); setTvahBrofel(''); setMsbarBrofelem(''); }} color="primary" size="sm" className="w-[100px]" label="רוחב" type="number" /></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>מספר צירים</th>
                                                                            <th><RadioGroup value={msbarTsrem} onValueChange={(val) => setMsbarTsrem(val)} className="flex"><div className="flex mr-5"><Radio value="1">1</Radio><Radio value="2">2</Radio></div></RadioGroup></th>
                                                                            <th><Switch defaultSelected={agla?.mafenem?.aemBlamem} value={aemBlamem} onValueChange={(val) => setAemBlamem(val)}><div className="mr-3">עם בולמים</div></Switch></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>צמיג</th>
                                                                            <th><Switch defaultSelected={agla?.mafenem?.aemTsmegSber} value={tsmegSber} onValueChange={(val) => setTsmegSber(val)}><div>צמיג ספר</div></Switch></th>
                                                                            <th></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>שלדה חיצונית</th>
                                                                            <th><Dropdown dir="rtl">
                                                                                <DropdownTrigger>
                                                                                    <Button size="xs" className='m-2'>
                                                                                        {motsaremBrofelem[0].shem}
                                                                                    </Button>
                                                                                </DropdownTrigger>
                                                                                <DropdownMenu
                                                                                    aria-label="Multiple selection example"
                                                                                    variant="flat"
                                                                                    closeOnSelect={true}
                                                                                    disallowEmptySelection
                                                                                    selectionMode="single"
                                                                                    selectedKeys={motsaremBrofelem[0].shem}
                                                                                    onSelectionChange={(val) => {
                                                                                        updateMotsaremBrofelem(0,
                                                                                            {
                                                                                                kmot: Math.min(((aorkh * 2) + (rohf * 2)), GetBrtemMotsarMlae('B5', val.currentKey).kmot),
                                                                                                mher: Math.min(((aorkh * 2) + (rohf * 2)), GetBrtemMotsarMlae('B5', val.currentKey).kmot) * GetBrtemMotsarMlae('B5', val.currentKey).alot,
                                                                                                shem: val.currentKey,
                                                                                                remez: 'B5'
                                                                                            });
                                                                                    }
                                                                                    }
                                                                                >
                                                                                    {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                        <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                    ))}
                                                                                </DropdownMenu>
                                                                            </Dropdown></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>שלדה קדמית</th>
                                                                            <th><Input isReadOnly={motsaremBrofelem[0].shem === 'בחר פריט'} type="number" value={aorkhBrofel} onValueChange={(val) => {
                                                                                setAorkhBrofel(parseFloat(val));
                                                                                updateMotsaremBrofelem(1,
                                                                                    {
                                                                                        kmot: Math.min(((parseFloat(val) || 0) * 2), GetBrtemMotsarMlae('B5', motsaremBrofelem[1].shem).kmot),
                                                                                        mher: Math.min(((parseFloat(val) || 0) * 2), GetBrtemMotsarMlae('B5', motsaremBrofelem[1].shem).kmot) * GetBrtemMotsarMlae('B5', motsaremBrofelem[1].shem).alot,
                                                                                        shem: motsaremBrofelem[1].shem,
                                                                                        remez: 'B5'
                                                                                    });

                                                                            }} color="primary" size="sm" className="w-[100px]" label="אורך פרופיל" labelPlacement="outside-left" /></th>
                                                                            <th><Dropdown dir="rtl">
                                                                                <DropdownTrigger>
                                                                                    <Button isDisabled={!aorkhBrofel} size="xs" className='m-2'>
                                                                                        {motsaremBrofelem[1].shem}
                                                                                    </Button>
                                                                                </DropdownTrigger>
                                                                                <DropdownMenu
                                                                                    aria-label="Multiple selection example"
                                                                                    variant="flat"
                                                                                    closeOnSelect={true}
                                                                                    disallowEmptySelection
                                                                                    selectionMode="single"
                                                                                    selectedKeys={motsaremBrofelem[1].shem}
                                                                                    onSelectionChange={(val) => {
                                                                                        updateMotsaremBrofelem(1,
                                                                                            {
                                                                                                kmot: Math.min(((aorkhBrofel || 0) * 2), GetBrtemMotsarMlae('B5', val.currentKey).kmot),
                                                                                                mher: Math.min(((aorkhBrofel || 0) * 2), GetBrtemMotsarMlae('B5', val.currentKey).kmot) * GetBrtemMotsarMlae('B5', val.currentKey).alot,
                                                                                                shem: val.currentKey,
                                                                                                remez: 'B5'
                                                                                            });
                                                                                    }
                                                                                    }
                                                                                >
                                                                                    {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                        <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                    ))}
                                                                                </DropdownMenu>
                                                                            </Dropdown></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>שלדה פנימית</th>
                                                                            <th><Input isReadOnly={!aorkh || !rohf} type="number" value={tvahBrofel} onValueChange={(val) => {
                                                                                setTvahBrofel(val); setMsbarBrofelem(parseInt(Math.round((aorkh / (val / 100)) - 2)));
                                                                                updateMotsaremBrofelem(2,
                                                                                    {
                                                                                        kmot: Math.min(parseInt(Math.round((aorkh / (val / 100)) - 2)), GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot),
                                                                                        mher: Math.min(parseInt(Math.round((aorkh / (val / 100)) - 2)), GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot) * GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).alot,
                                                                                        shem: motsaremBrofelem[2].shem,
                                                                                        remez: 'B5'
                                                                                    });
                                                                            }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
                                                                            <th><Input isReadOnly={!aorkh || !rohf} type="number" value={msbarBrofelem} onValueChange={(val) => {
                                                                                setMsbarBrofelem(parseInt(val)); setTvahBrofel(formatNumber(((aorkh / (parseFloat(val) + 2)) * 100)));
                                                                                updateMotsaremBrofelem(2,
                                                                                    {
                                                                                        kmot: Math.min(parseInt(val), GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot),
                                                                                        mher: Math.min(parseInt(val), GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot) * GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).alot,
                                                                                        shem: motsaremBrofelem[2].shem,
                                                                                        remez: 'B5'
                                                                                    });
                                                                            }} color="primary" size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th>חלק א</th>
                                                                            <th><Dropdown dir="rtl">
                                                                                <DropdownTrigger>
                                                                                    <Button isDisabled={!tvahBrofel || !msbarBrofelem} size="xs" className='m-2'>
                                                                                        {motsaremBrofelem[2].shem}
                                                                                    </Button>
                                                                                </DropdownTrigger>
                                                                                <DropdownMenu
                                                                                    aria-label="Multiple selection example"
                                                                                    variant="flat"
                                                                                    closeOnSelect={true}
                                                                                    disallowEmptySelection
                                                                                    selectionMode="single"
                                                                                    selectedKeys={motsaremBrofelem[2].shem}
                                                                                    onSelectionChange={(val) => {
                                                                                        updateMotsaremBrofelem(2,
                                                                                            {
                                                                                                kmot: Math.min(helkBetBnmet ? msbarBrofelemBretA : (msbarBrofelem || 0), GetBrtemMotsarMlae('B5', val.currentKey).kmot),
                                                                                                mher: Math.min(helkBetBnmet ? msbarBrofelemBretA : (msbarBrofelem || 0), GetBrtemMotsarMlae('B5', val.currentKey).kmot) * GetBrtemMotsarMlae('B5', val.currentKey).alot,
                                                                                                shem: val.currentKey,
                                                                                                remez: 'B5'
                                                                                            });
                                                                                    }
                                                                                    }
                                                                                >
                                                                                    {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                        <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                    ))}
                                                                                </DropdownMenu>
                                                                            </Dropdown></th>
                                                                            <th><Input isReadOnly={helkBetBnmet ? false : true} value={helkBetBnmet ? msbarBrofelemBretA : (msbarBrofelem || 0)} onValueChange={(val) => {
                                                                                setMsbarBrofelmBretA(Math.min(val, msbarBrofelem));
                                                                                updateMotsaremBrofelem(2,
                                                                                    {
                                                                                        kmot: Math.min(val, GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot),
                                                                                        mher: Math.min(val, GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot) * GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).alot,
                                                                                        shem: motsaremBrofelem[2].shem,
                                                                                        remez: 'B5'
                                                                                    });
                                                                                helkBetBnmet && motsaremBrofelem[3].shem !== 'בחר פריט' && updateMotsaremBrofelem(3,
                                                                                    {
                                                                                        kmot: Math.min(msbarBrofelem - val, GetBrtemMotsarMlae('B5', motsaremBrofelem[3].shem).kmot),
                                                                                        mher: Math.min(msbarBrofelem - val, GetBrtemMotsarMlae('B5', motsaremBrofelem[3].shem).kmot) * GetBrtemMotsarMlae('B5', motsaremBrofelem[3].shem).alot,
                                                                                        shem: motsaremBrofelem[3].shem,
                                                                                        remez: 'B5'
                                                                                    });


                                                                            }} color="primary" size="sm" className="w-[100px]" label="מס פרופילים" labelPlacement="outside-left" /></th>
                                                                            <th><Switch defaultSelected={agla?.mafenem?.aemHelkBet} value={helkBetBnmet} onValueChange={(val) => { setHelkBetBnmet(val); updateMotsaremBrofelem(3, { kmot: 0, mher: 0, shem: 'בחר פריט' }) }}><div className="mr-2"><FaPlus /></div></Switch></th>
                                                                        </tr>
                                                                        {
                                                                            helkBetBnmet &&
                                                                            <tr className="row-spacing">
                                                                                <th>חלק ב</th>
                                                                                <th><Dropdown dir="rtl">
                                                                                    <DropdownTrigger>
                                                                                        <Button isDisabled={motsaremBrofelem[2].shem === 'בחר פריט'} size="xs" className='m-2'>
                                                                                            {motsaremBrofelem[3].shem}
                                                                                        </Button>
                                                                                    </DropdownTrigger>
                                                                                    <DropdownMenu
                                                                                        aria-label="Multiple selection example"
                                                                                        variant="flat"
                                                                                        closeOnSelect={true}
                                                                                        disallowEmptySelection
                                                                                        selectionMode="single"
                                                                                        selectedKeys={motsaremBrofelem[3].shem}
                                                                                        onSelectionChange={(val) => {
                                                                                            updateMotsaremBrofelem(3,
                                                                                                {
                                                                                                    kmot: Math.min(msbarBrofelemBretA ? msbarBrofelem - msbarBrofelemBretA : 0, GetBrtemMotsarMlae('B5', val.currentKey).kmot),
                                                                                                    mher: Math.min(msbarBrofelemBretA ? msbarBrofelem - msbarBrofelemBretA : 0, GetBrtemMotsarMlae('B5', val.currentKey).kmot) * GetBrtemMotsarMlae('B5', val.currentKey).alot,
                                                                                                    shem: val.currentKey,
                                                                                                    remez: 'B5'
                                                                                                });
                                                                                        }
                                                                                        }
                                                                                    >
                                                                                        {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                        ))}
                                                                                    </DropdownMenu>
                                                                                </Dropdown></th>
                                                                                <th><Input value={msbarBrofelemBretA ? msbarBrofelem - msbarBrofelemBretA : 0} isReadOnly color="primary" size="sm" className="w-[100px]" label="מס פרופילים" labelPlacement="outside-left" /></th>
                                                                                <th></th>
                                                                            </tr>
                                                                        }
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>דלת</th>
                                                                            <th><RadioGroup value={aemRmbaAoRgel} onValueChange={(val) => setAemRmbaAoRgel(val)} className="flex"><div className="flex mr-5"><Radio value="רגיל">רגיל</Radio><Radio value="רמפה">רמפה</Radio></div></RadioGroup></th>
                                                                            <th></th>
                                                                        </tr>
                                                                        {
                                                                            aemRmbaAoRgel === "רמפה" &&
                                                                            <>
                                                                                <tr className="row-spacing">
                                                                                    <th></th>
                                                                                    <th><Input color="primary" size="sm" className="w-[100px]" label="פריט" /></th>
                                                                                    <th></th>
                                                                                    <th></th>
                                                                                </tr>
                                                                                <tr className="row-spacing">
                                                                                    <th></th>
                                                                                    <th><Input color="primary" size="sm" className="w-[100px]" label="אורך רמפה" /></th>
                                                                                    <th><Input color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
                                                                                    <th><Input color="primary" size="sm" className="w-[100px]" label="מספר פרופילים" /></th>
                                                                                </tr>
                                                                            </>
                                                                        }
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>קופסא</th>
                                                                            <th><Switch><div className="mr-3">עם דלת</div></Switch></th>
                                                                            <th><Switch><div className="mr-3">תוספת רשת</div></Switch></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th></th>
                                                                            <th>מסגרת</th>
                                                                            <th><Input color="primary" size="sm" className="w-[100px]" label="אורך רמפה" /></th>
                                                                            <th><Input color="primary" size="sm" className="w-[100px]" label="פריט" /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th>וניל</th>
                                                                            <th><Input color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
                                                                            <th><Input color="primary" size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                            <th><Input color="primary" size="sm" className="w-[100px]" label="פריט" /></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>צבע</th>
                                                                            <th><Switch defaultSelected={agla?.mafenem?.aemTseba} value={aemTseba} onValueChange={(val) => setAemTseba(val)}><div className=""></div></Switch></th>
                                                                            <th></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>פשפשול</th>
                                                                            <th><Switch defaultSelected={agla?.mafenem?.aemBashbashol} isReadOnly={aemKafRetom} value={aemBashbashol} onValueChange={(val) => { setAemBashbashol(val) }}></Switch></th>
                                                                            <th></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>כף ריתום</th>
                                                                            <th><Switch defaultSelected={agla?.mafenem?.aemKafRetom} isReadOnly={aemBashbashol} value={aemKafRetom} onValueChange={(val) => { setAemKafRetom(val) }}></Switch></th>
                                                                            <th></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>מיכל מים</th>
                                                                            <th><Switch defaultSelected={agla?.mafenem?.aemMekhalMaym} value={aemMekhalMaym} onValueChange={(val) => setAemMekhalMaym(val)}></Switch></th>
                                                                            <th></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>ארגז כלים</th>
                                                                            <th><Switch defaultSelected={agla?.mafenem?.aemArgazKlem} value={aemArgazKlem} onValueChange={(val) => setAemArgazKlem(val)}></Switch></th>
                                                                            <th></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>גלגל עזר</th>
                                                                            <th><Switch defaultSelected={agla?.mafenem?.aemGlgalAzer} value={aemGlgalAzer} onValueChange={(val) => setAemGlgalAzer(val)}></Switch></th>
                                                                            <th></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan={4}><Divider /></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th>רגל חנייה</th>
                                                                            <th><Switch defaultSelected={agla?.mafenem?.aemReglHnea} value={aemReglHnea} onValueChange={(val) => setAemReglHnea(val)}></Switch></th>
                                                                            <th></th>
                                                                        </tr>
                                                                    </thead>
                                                                </table>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        (agla && sogBaola === 'D') &&
                                        <div className="w-full h-full flex p-32 justify-center">
                                            {<ModalMessage show={showModalMessage} disable={() => setShowModalMessage(false)} Aeshor={(val) => setAeshor(val)} message={'האם אתה בטוח למכור העגלה!?'}/>}
                                            {<ModalAddProductCategory msbarTfaol={agla.msbar} Aeshor={(val) => {
                                                if(val){
                                                    HosfatAglaLmlae();
                                                }
                                            }} sckhom={mherKlale} category={GetCategoryAglot()} show={showModalCategoryAgla} disable={() => setShowModalCategoryAgla(false)}/>}
                                            {<ModalBrokAgla Berok={(val,motsaremmm,Brofelemmm) => {
                                                if(val){
                                                    berokAgla(motsaremmm,Brofelemmm);
                                                }
                                            }} motsarem={mafenemMotsarem} Brofelem={motsaremBrofelemSofe} show={showModalBerokAgla} disable={() => setShowModalBerokAgla(false)}/>}
                                            <div className="w-full max-w-[700px]">
                                                <div className="flex justify-center bg-primary-200 p-2 rounded-2xl">
                                                    תמחיר
                                                </div>
                                            </div>
                                            <Divider className="w-[2px] h-full ml-5 mr-5"/>
                                            <div className="w-full max-w-[700px] flex flex-col">
                                                <div className="flex justify-center bg-primary-200 p-2 rounded-2xl">
                                                    עסקת מכירה
                                                </div>
                                                <div dir="rtl" className="mt-10 flex flex-col flex-grow">
                                                    <div>
                                                        <Input color="primary" className="max-w-[200px] mb-5" isReadOnly label="לקןח" value={lkohTfaol?.name} />
                                                    </div>
                                                    <Divider/>
                                                    <div className="mt-5 flex justify-around items-center">
                                                        <Avatar size="sm"/>
                                                        <div>עגלה</div>
                                                        <Input color="primary" className="max-w-[150px] mb-5" isReadOnly label="מספר עגלה" value={agla?.msbarAgla} />
                                                        <Input color="primary" className="max-w-[150px] mb-5" isReadOnly label="סכום" value={agla?.mherMkhera} />
                                                    </div>
                                                    <Divider />
                                                    <div className="mt-5">
                                                        <div className="text-lg text-center">פעולות נוספות</div>
                                                        <div className="mt-5">
                                                            <div onClick={() => setShowModalCategoryAgla(true)} className="text-primary cursor-pointer">שמירה במלאי</div>
                                                            <div onClick={() => setShowModalBerokAgla(true)} className="text-primary cursor-pointer">פירוק עגלה</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-auto flex justify-end">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <ModalFooter className="border-t-2 m-auto w-full items-center">
                                        {
                                            sogBaola &&
                                            <div>{sogBaola}</div>
                                        }
                                        <div className="flex justify-center w-full">
                                            {
                                                !agla &&
                                                <Dropdown dir="rtl">
                                                    <DropdownTrigger>
                                                        <Button
                                                            isDisabled={agla}
                                                            size="lg"
                                                            className='mr-5 ml-5'
                                                        >
                                                            {sogAska}
                                                        </Button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu
                                                        aria-label="Multiple selection example"
                                                        variant="flat"
                                                        closeOnSelect={true}
                                                        disallowEmptySelection
                                                        selectionMode="single"
                                                        selectedKeys={sogAska}
                                                        onSelectionChange={(val) => { setSogAska(val.currentKey) }}
                                                    >
                                                        <DropdownItem key="ייצור">ייצור</DropdownItem>
                                                        <DropdownItem key="תיקון">תיקון</DropdownItem>
                                                        <DropdownItem key="טסט">טסט</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            }
                                            <Button size="lg" className='mr-5 ml-5' color="primary" variant="bordered" onClick={() => { ResetAll(); disable(); }}>
                                                סגור
                                            </Button>
                                            {
                                                (agla && sogBaola === 'D' && !Aeshor) ?
                                                    <Button size="lg" className='mr-5 ml-5' color="primary" onClick={() => setShowModalMessage(true)}>
                                                        אישור
                                                    </Button>
                                                    :
                                                    <Button size="lg" className='mr-5 ml-5' color="primary" onClick={addValues}>
                                                        להתקדם
                                                    </Button>
                                            }

                                        </div>
                                    </ModalFooter>

                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    )
}






const ScrollToDiv = ({ targetRef, label }) => {
    const scrollToDiv = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button onClick={scrollToDiv}>{label}</button>
    );
};