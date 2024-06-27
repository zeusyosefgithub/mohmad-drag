'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch } from "@nextui-org/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import GetDocs from "../FireBase/getDocs";
import { fetchDocumentByCondition, useGetDataByCondition } from "../FireBase/getDataByCondition";
import { MdOutlineTimer } from "react-icons/md";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { MathX1, MathX3 } from "../Components/MathParts";
import { FaArrowUp, FaPlus, FaTrash } from "react-icons/fa";
import { differenceInDays, differenceInHours, differenceInMinutes, format, parseISO } from 'date-fns';
import CountdownComponent from "../Components/TimeCalc";
import { useCallback } from 'react';
import { set } from "lodash";
import { RiErrorWarningFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import ModalMessage from "./ModalMessage";
import ModalAddProductCategory from "./ModalAddProductCategory";
import ModalBrokAgla from "./ModalBrokAgla";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import ContactContext from "../auth/ContactContext";
import { Heshvonet } from "../Page Components/Heshvonet";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import { GetTmonatHelek } from "../page";
import rep6 from '../../images/rep6.png';
import rep9 from '../../images/rep9.jpg';
import rep10 from '../../images/rep10.jpg';
import rep11 from '../../images/rep11.jpg';
import rep13 from '../../images/rep13.jpg';
import rep15 from '../../images/rep15.jpg';
import rep20 from '../../images/rep20.png';
import rep23 from '../../images/rep23.png';
import rep37 from '../../images/rep37.jpg';
import rep48 from '../../images/rep48.jpg';
import rep58 from '../../images/rep58.png';
import rep68 from '../../images/rep68.png';
import rep77 from '../../images/rep77.jpg';
import rep17 from '../../images/rep17.jpg';
import rep73 from '../../images/rep73.png';
import rep19 from '../../images/rep19.png';
import rep45 from '../../images/rep45.png';
import rep78 from '../../images/rep78.png';

export default function ModalCreate({ show, disable, agla, lkohTfaol }) {
    const [sogAska, setSogAska] = useState('סוג עסקה');
    const lkhot = GetDocs('customers');
    const [lkoh, setLkoh] = useState('');
    const { contactName, setContactName, customerSet, setCustomerSet } = useContext(ContactContext);
    const [lkohMsbar, setLkohMsbar] = useState('');
    const aglot = useGetDataByCondition('drags', 'idcustomer', '==', lkohTfaol?.idnum || 0);
    const mlae = GetDocs('mlae');
    const category = GetDocs('category');
    const router = useRouter();
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
    const [sogAskaAgla, setSogAskaAgla] = useState('');
    const [motsaremLhatseg, setMotsaremLhatseg] = useState([]);
    const [hkhnsot, setHkhnsot] = useState(0);
    const [hkhnsotHomreGlem, setHkhnsotHomreGlem] = useState(0);
    const [hotsotSkhar, setHotsaotSkhar] = useState(0);
    const [sogBaola, setSogBaola] = useState('');
    const [hshhyatYetsorZman, setHshhyatYetsorZman] = useState();
    const [vavGrera, setVavGrera] = useState(false);
    const [motsaremBrofelem, setMotsaremBroflem] = useState([
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5',
            message: ''
        },
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5',
            message: ''
        },
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5',
            message: ''
        },
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5',
            message: ''
        },
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5',
            message: ''
        },
        {
            kmot: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: 'B5',
            message: ''
        }
    ]);
    const ResetAll = () => {
        const initialMafenemMotsarem = Remzem.map(remez => ({
            kmot: 0,
            mher: 0,
            shem: '',
            remez: remez,
            message: ''
        }));
        setMafenemMotsarem(initialMafenemMotsarem);
        setSogAskaAgla('');
        setSogAska('סוג עסקה');
        setDisableSummedObjects(false);
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
                remez: 'B5',
                message: ''
            },
            {
                kmot: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: 'B5',
                message: ''
            },
            {
                kmot: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: 'B5',
                message: ''
            },
            {
                kmot: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: 'B5',
                message: ''
            },
            {
                kmot: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: 'B5',
                message: ''
            },
            {
                kmot: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: 'B5',
                message: ''
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
        GetBrtemMotsarCategory('J1')?.shem,
        GetBrtemMotsarCategory('F1')?.shem,
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
        'A9',
        'J1',
        'F1'
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
            setVavGrera(agla?.vavGrera);
            setEntries(agla?.entries || [{ category: '', sogMotsar: '', shemMotsar: '', remez: '', message: '' }]);
            setMotsaremBroflem(agla?.motsaremBrofelem);
            setConstantDate(agla?.zmnem?.zmanThelatYetsor || '2024-12-25T00:00:00.000Z');
            setHshhyatYetsorZman(getDifferenceBetweenDatetimes(agla?.zmnem?.zmanThelatYetsor || '2024-12-25T00:00:00.000Z', agla?.zmnem?.zmanHasheatYetsor || '2024-12-25T00:00:00.000Z'));
        }
    }, [agla, lkoh]);
    const [disableSummedObjects,setDisableSummedObjects] = useState(false);
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
    const GetHodaaMatemaLmlae = (MaxMlae, NtonemMekorem, index, kmotNokhhet, shemNokhhe,sogBaolaa) => {

        if(sogBaolaa === 'C'){
            if((MaxMlae + NtonemMekorem[index]?.kmot) > kmotNokhhet){
                return <div className="text-white bg-success pt-1 pb-1 pr-2 pl-2 rounded-3xl">נשאר במלאי : {(MaxMlae + NtonemMekorem[index]?.kmot) - kmotNokhhet}</div>
            }
            else{
                return <div className="text-white bg-warning pt-1 pb-1 pr-2 pl-2 rounded-3xl">כמות אחרונה</div>
            }
        }
        else{
            if(MaxMlae > kmotNokhhet){
                return <div className="text-white bg-success pt-1 pb-1 pr-2 pl-2 rounded-3xl">נשאר במלאי : {MaxMlae - kmotNokhhet}</div>
            }
            else if(MaxMlae < kmotNokhhet){
                return <div className="text-white bg-danger pt-1 pb-1 pr-2 pl-2 rounded-3xl">חורג מהמלאי : {kmotNokhhet - MaxMlae}-</div>
            }
            else{
                return <div className="text-white bg-warning pt-1 pb-1 pr-2 pl-2 rounded-3xl">כמות אחרונה</div>
            }
        }
    }
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
    const renderDropdownWithInputs = useCallback((item, shemSog, index, isElse, motsareem,sogBaolaa) => (
        <div className="w-full">
            <div className="mt-5 flex justify-around items-center w-full">
                <div className="w-[200px]  rounded-xl flex items-center">
                    <div className="group relative z-20">
                        <Image width={70} alt="none" src={GetTmonatHelek(item?.remez)} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                    </div>
                    <div className="mr-2">{shemSog}</div>
                </div>
                <div className="w-[150px]">{renderDropdown(index, isElse, item)}</div>
                <div className="w-[250px] flex items-center">
                    <Input
                        type="number"
                        size="sm"
                        isDisabled={!item?.shem}
                        className="max-w-[100px]"
                        color={
                            item?.kmot <= GetBrtemMotsarMlae(item?.remez, item?.shem).kmot && item?.message 
                                ?
                                'primary'
                                :
                                item?.message && (sogBaolaa !== 'C') ? "danger" : "primary"
                        }
                        onValueChange={(val) => {
                            if(isElse){
                                setDisableSummedObjects(true);
                            }
                            if (sogBaolaa === 'A' || sogBaolaa === 'B' || sogBaolaa === '') {
                                if (val > GetBrtemMotsarMlae(item?.remez, item?.shem).kmot) {
                                    setThelatYetsor(false);
                                }
                                
                                handleInputChange(isElse, index, Math.min(val, 999), 'kmot');
                                handleInputChange(isElse, index, Math.min(val, 999) * GetBrtemMotsarMlae(item?.remez, item?.shem).alot, 'mher');
                            }
                            else {
                                handleInputChange(isElse, index, Math.min(val, (GetBrtemMotsarMlae(item?.remez, item?.shem).kmot + motsareem[index]?.kmot)), 'kmot');
                                handleInputChange(isElse, index, Math.min(val, (GetBrtemMotsarMlae(item?.remez, item?.shem).kmot + motsareem[index]?.kmot)) * GetBrtemMotsarMlae(item?.remez, item?.shem).alot, 'mher');
                            }
                        }}
                        value={item?.kmot}
                        labelPlacement="outside-left"
                        label="כמות"
                    />
                    {
                        item?.shem &&
                        <div className={`text-[13px] mr-2`}>
                            {
                                GetHodaaMatemaLmlae(GetBrtemMotsarMlae(item?.remez, item?.shem)?.kmot, motsareem, index, item?.kmot, item?.shem,sogBaolaa)
                            }
                        </div>
                    }
                </div>
                <div className="w-[100px]">
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
            <Divider className="mt-5 mb-5 mr-4" />
        </div>
    ), [GetBrtemMotsarMlae]);
    const GetCategoryAglot = () => {
        for (let index = 0; index < category.length; index++) {
            if (category[index].id === 'S') {
                return category[index];
            }
        }
        return null;
    }
    const BdekatMtsavE = () => {
        if (Aeshor) {
            return true;
        }
        return false;
    }
    const BdekatMtsavD = () => {
        if (sogAskaAgla === 'ייצור') {
            if (seomYetsor && msbarAgla && seomReshaion) {
                return true;
            }
            return false;
        }
        else if (sogAskaAgla === 'הרכבת וו') {
            if (seomYetsor) {
                return true;
            }
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
    const RemoveMotsarToNull = (remez) => {
        let newArray = [];
        for (let index = 0; index < mafenemMotsarem.length; index++) {
            if (mafenemMotsarem[index].remez === remez) {
                newArray.push({
                    kmot: 0,
                    mher: 0,
                    shem: '',
                    remez: remez,
                    message: ''
                });
            }
            else {
                newArray.push(mafenemMotsarem[index]);
            }
        }
        setMafenemMotsarem(newArray);
    }
    const addValues = async () => {
        setErrorMessageText('');
        if (!BdekatMtsavem()) {
            setErrorMessageText('משהו לא נכון, חייב להשלים המצב!!');
            setErrorMessage(true);
            setTimeout(() => {
                setErrorMessage(false);
            }, 1500);
            return;
        }
        const Props = {
            sogAska: sogAska,
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
            disableSummedObjects : disableSummedObjects,
            motsaremBrofelemSofe: motsaremBrofelemSofe,
            motsaremBrofelem: motsaremBrofelem,
            newMafeneMotsarem: mafenemMotsarem,
            entries: entries

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
                    disableSummedObjects : disableSummedObjects,
                    motsaremBrofelemSofe: motsaremBrofelemSofe,
                    motsaremBrofelem: motsaremBrofelem,
                    newMafeneMotsarem: mafenemMotsarem,
                    entries: entries,
                    aemSholam: false
                });
                if (BdekatMtsavem() === 'C') {
                    if(sogBaola !== 'C'){
                        await processItems(mafenemMotsarem, mlae);
                        await processItems(motsaremBrofelemSofe, mlae);
                    }
                    await updateInventory(firestore, mlae, mafenemMotsarem, agla?.newMafeneMotsarem);
                    await updateInventory(firestore, mlae, motsaremBrofelem, agla?.motsaremBrofelem);
                }
                if (BdekatMtsavem() === 'E') {
                    await updateDoc(doc(firestore, 'customers', lkohTfaol?.id), {
                        yetera: lkohTfaol?.yetera + mherKlale
                    })
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            try {
                if (BdekatMtsavem() === 'C') {
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
        if (BdekatMtsavem() === 'D') {
            router.push('/sales');
        }
    }
    async function updateInventory(firestore, mlae, currentItems, newItems) {
        for (let index = 0; index < currentItems.length; index++) {
            const currentItem = currentItems[index];
            const newItem = newItems ? newItems[index] : null;
            if (!newItem || currentItem.shem !== newItem.shem) {
                for (let mlaeItem of mlae) {
                    if (newItem && mlaeItem.categoryMotsar === newItem.remez && mlaeItem.shem === newItem.shem) {
                        console.log(1);
                        console.log("mlaeItem.kmot --" + mlaeItem.kmot);
                        console.log("mlaeItem.kmot --" + newItem.kmot);
                        console.log("mlaeItem.kmot + newItem.kmot --" + (mlaeItem.kmot + newItem.kmot));
                        await updateDoc(doc(firestore, 'mlae', mlaeItem.id), {
                            kmot: mlaeItem.kmot + newItem.kmot
                        });
                    }
                    if (mlaeItem.categoryMotsar === currentItem.remez && mlaeItem.shem === currentItem.shem) {
                        console.log(2);
                        console.log("mlaeItem.kmot --" + mlaeItem.kmot);
                        console.log("currentItem.kmot --" + currentItem.kmot);
                        console.log("mlaeItem.kmot - currentItem.kmot --" + (mlaeItem.kmot - currentItem.kmot));
                        await updateDoc(doc(firestore, 'mlae', mlaeItem.id), {
                            kmot: mlaeItem.kmot - currentItem.kmot
                        });
                    }
                }
            } else if (currentItem.kmot !== newItem.kmot && currentItem.shem === newItem.shem) {
                for (let mlaeItem of mlae) {
                    if (mlaeItem.categoryMotsar === currentItem.remez && mlaeItem.shem === currentItem.shem) {
                        console.log(3);
                        console.log("mlaeItem.kmot --" + mlaeItem.kmot);
                        const kmotDifference = newItem.kmot - currentItem.kmot;
                        console.log("kmotDifference --" + kmotDifference);
                        console.log("mlaeItem.kmot + kmotDifference --" + (mlaeItem.kmot + kmotDifference));
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
                        console.log(4);
                        console.log("mlaeItem.kmot --" + mlaeItem.kmot);
                        console.log("item.kmot --" + item.kmot);
                        console.log("mlaeItem.kmot - item.kmot --" + (mlaeItem.kmot - item.kmot));
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
        motsaremBrofelem && !disableSummedObjects && !agla?.disableSummedObjects && setMotsaremBrofelemSofe(Object.values(summedObjects));
    }, [motsaremBrofelem]);
    useEffect(() => {
        const initialMafenemMotsarem = Remzem.map(remez => ({
            kmot: 0,
            mher: 0,
            shem: '',
            remez: remez,
            message: ''
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
        if (parseInt(msbarTsrem) === 1) {
            RemoveMotsarToNull('A2');
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A2'));
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A1', 'A10', 'A3']);
        }
        else if (parseInt(msbarTsrem) === 2) {
            RemoveMotsarToNull('A1');
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A1'));
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A2', 'A10', 'A3']);
        }
    }, [msbarTsrem]);
    useEffect(() => {
        const total1 = motsaremBrofelemSofe?.reduce((acc, motsar) => acc + motsar.mher, 0);
        const total2 = mafenemMotsarem?.reduce((acc, motsar) => acc + motsar.mher, 0);
        setHkhnsotHomreGlem(total1 + total2);
    }, [motsaremBrofelemSofe, mafenemMotsarem]);
    useEffect(() => {
        if (sogAskaAgla === 'תיקון') {
            for (let index = 0; index < mafenemMotsarem.length; index++) {
                if (mafenemMotsarem[index].shem) {
                    setMotsaremLhatseg((prevItems) => [...prevItems, mafenemMotsarem[index].remez]);
                }
            }
        }
        // if (sogAskaAgla === 'הרכבת וו') {
        //     if (BdekatMotsaremLehtsga('J1')) {
        //         setMotsaremLhatseg((prevItems) => [...prevItems, 'J1']);
        //     }
        // }
        // else {
        //     setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'J1'));
        // }
    }, [sogAskaAgla, agla, lkoh]);
    useEffect(() => {
        if (vavGrera) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'J1']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'J1'));
        }
    }, [vavGrera])
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
    const HosfatAglaLmlae = async () => {
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
    const berokAgla = async (motsaremmm, Brofelemmm) => {
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
    function updateMotsaremBrofelemmm() {
        // Create a map of final quantities
        const finalQuantities = motsaremBrofelemSofe?.reduce((acc, item) => {
            acc[item.shem] = item.kmot;
            return acc;
        }, {});
    
        // Update the original array
        for (let i = 0; i < motsaremBrofelem?.length; i++) {
            if (finalQuantities[motsaremBrofelem[i].shem] !== undefined) {
                const remainingKmot = finalQuantities[motsaremBrofelem[i].shem];
                const currentKmot = motsaremBrofelem[i].kmot;
    
                if (currentKmot > remainingKmot) {
                    motsaremBrofelem[i].kmot = remainingKmot;
                }
    
                finalQuantities[motsaremBrofelem[i].shem] -= motsaremBrofelem[i].kmot;
            }
        }
    
        return motsaremBrofelem;
    }

    console.log(updateMotsaremBrofelemmm())

    const [showModalMessage, setShowModalMessage] = useState(false);
    const [Aeshor, setAeshor] = useState(null);
    const [showModalCategoryAgla, setShowModalCategoryAgla] = useState(false);
    const [showModalBerokAgla, setShowModalBerokAgla] = useState(false);
    const [entries, setEntries] = useState([{ category: '', sogMotsar: '', shemMotsar: '', remez: '', message: '' }]);
    const scrollToBottomRef = () => {
        const scrollableContainer = containerRef.current;
        const targetElement = endOfFormRef.current;
        if (scrollableContainer && targetElement) {
            const topPos = targetElement.offsetTop;
            scrollableContainer.scrollTo({
                top: topPos,
                behavior: "smooth"
            });
        }
    };
    const scrollToRef = () => {
        const scrollableContainer = containerRef.current;
        const topElement = topOfFormRef.current;

        if (scrollableContainer && topElement) {
            scrollableContainer.scrollTo({
                top: topElement.offsetTop,
                behavior: "smooth"
            });
        }
    };
    const containerRef = useRef(null);
    const endOfFormRef = useRef(null);
    const topOfFormRef = useRef(null);
    const GetCategoryRemez = (shem) => {
        for (let index = 0; index < category.length; index++) {
            if (shem === category[index].shem) {
                return category[index].motsarem;
            }
        }
        return null;
    }
    const handleEntriesChange = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    const handleAddEntries = () => {
        setEntries([...entries, { category: '', sogMotsar: '', shemMotsar: '', remez: '' }]);
        setTimeout(() => {
            scrollToBottomRef();
        }, 100);
    };
    function removeItem(index) {
        const newItems = entries.filter((item, idx) => idx !== index);
        setEntries(newItems);
    }
    function BdekatMotsaremLehtsga(val) {
        for (let index = 0; index < motsaremLhatseg.length; index++) {
            if (motsaremLhatseg[index] === val) {
                return false;
            }
        }
        return true;
    }
    useEffect(() => {
        for (let index = 0; index < entries?.length; index++) {
            if (entries[index].remez != '' && BdekatMotsaremLehtsga(entries[index].remez)) {
                setMotsaremLhatseg((prevItems) => [...prevItems, entries[index].remez]);
            }
        }
    }, [entries]);
    const BdekatKolKmoeotHmotsarem = () => {
        let errors = 0;
        for (let index = 0; index < mafenemMotsarem.length; index++) {
            if (mafenemMotsarem[index].kmot > GetBrtemMotsarMlae(mafenemMotsarem[index].remez, mafenemMotsarem[index].shem).kmot) {
                handleInputChange(false, index,
                    'כמות חורגת',
                    'message');
                errors++;
            }
        }
        for (let index = 0; index < motsaremBrofelemSofe.length; index++) {
            if (motsaremBrofelemSofe[index].kmot > GetBrtemMotsarMlae(motsaremBrofelemSofe[index].remez, motsaremBrofelemSofe[index].shem).kmot) {
                handleInputChange(true, index,
                    'כמות חורגת',
                    'message');
                errors++;
            }
        }
        if (errors > 0) {
            setErrorMessageText('משהו לא תקין, חייב לשים כמויות מתאימות לפי המלאי!!');
            setErrorMessage(true);
            setTimeout(() => {
                setErrorMessage(false);
            }, 1500);
            return true;
        }
        return false;
    }
    const BdekatKolKmoeotHmotsaremfff = () => {
        let errors = 0;
        for (let index = 0; index < mafenemMotsarem.length; index++) {
            if (mafenemMotsarem[index].kmot > GetBrtemMotsarMlae(mafenemMotsarem[index].remez, mafenemMotsarem[index].shem).kmot) {
                errors++;
            }
        }
        for (let index = 0; index < motsaremBrofelemSofe.length; index++) {
            if (motsaremBrofelemSofe[index].kmot > GetBrtemMotsarMlae(motsaremBrofelemSofe[index].remez, motsaremBrofelemSofe[index].shem).kmot) {
                errors++;
            }
        }
        return errors > 0 ? true : false;
    }

    const componentRefOne = useRef();
    const handelPrintHeshvonit = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRefOne.current,
    });

    const BdekatHeshtnotKmotmotsarem = () => {
        for (let index = 0; index < agla?.newMafeneMotsarem?.length; index++) {
            if (agla?.newMafeneMotsarem[index]?.kmot !== mafenemMotsarem[index].kmot ||
                agla?.newMafeneMotsarem[index]?.shem !== mafenemMotsarem[index].shem
            ) {
                return true;
            }
        }
        for (let index = 0; index < agla?.motsaremBrofelem.length; index++) {
            if (agla?.motsaremBrofelem[index]?.kmot !== motsaremBrofelem[index].kmot ||
                agla?.motsaremBrofelem[index]?.shem !== motsaremBrofelem[index].shem
            ) {
                return true;
            }
        }
        return false;
    }

    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="full" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalBody className="border-b-2">
                        <div className="min-h-screen flex flex-col items-center justify-center">
                            {
                                errorMessage &&
                                <div className=" absolute w-full bg-black bg-opacity-20 backdrop-blur-[2px] h-full z-50">
                                    <div className="flex justify-center items-center bottom-0 top-0 right-0 left-0 absolute">
                                        <Card className="border-red-600 border-1 w-full max-w-[1000px]">
                                            <CardBody>
                                                <div dir="rtl" className="flex items-center">
                                                    <div>
                                                        <RiErrorWarningFill className="text-red-600 text-4xl" />
                                                    </div>
                                                    <div className="text-2xl mr-4 text-red-600">
                                                        {errorMessageText}
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                            }
                            {
                                ((!agla && sogAska !== 'סוג עסקה' && sogAska !== '') || (agla && sogAskaAgla !== 'סוג עסקה' && sogAskaAgla !== '' && (sogBaola === 'A' || sogBaola === 'B' || sogBaola === 'C'))) &&
                                <div className="w-full h-screen grid grid-rows-3 grid-cols-3 gap-4 p-4">
                                    <div className="row-span-3 col-span-1 border-r-2 flex justify-center items-center overflow-hidden">
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
                                    <div className="row-span-1 col-span-2 border-b-2 flex items-center overflow-hidden">
                                        <div dir="rtl" className="w-full h-full flex justify-around items-center">
                                            <div>
                                                <div>
                                                    {
                                                        agla?.msbarLkoh ?
                                                            <Input color="primary" className="max-w-[200px] mb-5" isReadOnly label="לקןח" value={lkohTfaol?.name} />
                                                            :
                                                            <div>
                                                                <div>
                                                                    <Button onClick={() => { router.push('/activion'); }}>הוספה<AiOutlinePlus className="mr-2" /></Button>
                                                                </div>
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
                                                <div>
                                                    {
                                                        (sogAskaAgla === 'ייצור' || sogAska === 'ייצור') &&
                                                        (
                                                            agla?.msbarAgla ?
                                                                <>
                                                                    <Divider className="mt-4 mb-4" />
                                                                    <Input color="primary" className="max-w-[200px]" isReadOnly label="מספר עגלה" value={agla?.msbarAgla} />
                                                                </>

                                                                :
                                                                <div>
                                                                    <Divider className="mt-4 mb-4" />
                                                                    <div>
                                                                        <Button onClick={() => { router.push('/activion'); }}>הוספה<AiOutlinePlus className="mr-2" /></Button>
                                                                    </div>
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
                                                                                <AutocompleteItem className='text-right' key={agla?.licenseid} value={agla?.licenseid}>
                                                                                    {agla?.licenseid}
                                                                                </AutocompleteItem>
                                                                            ))
                                                                        }

                                                                    </Autocomplete>
                                                                </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <div className="">
                                                    <Switch isReadOnly={agla?.thlkhem?.hskmatLkwah} defaultSelected={agla?.thlkhem?.hskmatLkwah} value={hskmatLkoh} onValueChange={(val) => setHskmatLkoh(val)}>
                                                        <div className="mr-2">הסכמת לקוח</div>
                                                    </Switch>
                                                </div>
                                                <Divider className="mt-2 mb-2" />
                                                <div className="">
                                                    <Switch isSelected={thelatYetsor} onClick={BdekatKolKmoeotHmotsarem} isReadOnly={agla?.thlkhem?.thelatYetsor || !BdekatMtsavB() || !BdekatMtsavA() || BdekatKolKmoeotHmotsaremfff()} defaultSelected={agla?.thlkhem?.thelatYetsor} value={thelatYetsor} onValueChange={(val) => setThelatYetsor(val)}>
                                                        <div className="mr-2">תחילת ייצור</div>
                                                    </Switch>
                                                </div>
                                                {
                                                    agla && (agla?.thlkhem?.hskmatLkwah) && (agla?.thlkhem?.thelatYetsor) &&
                                                    <>
                                                        <Divider className="mt-2 mb-2" />
                                                        <div>
                                                            <Switch defaultSelected={agla?.thlkhem?.hshheatTahlekhYetsor} value={hshhyatYetsor} onValueChange={(val) => setHshhyatYetsor(val)}>
                                                                <div className="mr-2">השהיית ייצור</div>
                                                            </Switch>
                                                        </div>
                                                        <Divider className="mt-2 mb-2" />
                                                        <div>
                                                            <Switch isReadOnly={agla?.thlkhem?.seomThlekhYetsor} defaultSelected={agla?.thlkhem?.seomThlekhYetsor} value={seomYetsor} onValueChange={(val) => setSeomYetsor(val)}>
                                                                <div className="mr-2">סיום יצור</div>
                                                            </Switch>
                                                        </div>
                                                        {
                                                            (sogAskaAgla === 'ייצור' || sogAska === 'ייצור') &&
                                                            <>
                                                                <Divider className="mt-2 mb-2" />
                                                                <div>
                                                                    <Switch onClick={checkSeomRishion2} isReadOnly={agla?.thlkhem?.seomThlekhReshion || !checkSeomRishion()} defaultSelected={agla?.thlkhem?.seomThlekhReshion} value={seomReshaion} onValueChange={(val) => setSeomReshion(val)}>
                                                                        <div className="mr-2">סיום רישיון</div>
                                                                    </Switch>
                                                                </div>
                                                            </>
                                                        }
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
                                                    <Divider className="mt-2 mb-2" />
                                                    <div className="flex justify-center">
                                                        <Switch isReadOnly={agla?.thlkhem?.kveatMher} defaultSelected={agla?.thlkhem?.kveatMher} value={kveatMher} onValueChange={(val) => setKveatMher(val)}>
                                                            <div className="mr-2">קביעת מחיר</div>
                                                        </Switch>
                                                    </div>
                                                    <Divider className="mt-2 mb-2" />
                                                    <div className="flex items-center">
                                                        <div className="min-w-[100px]">שעות עבודה</div>
                                                        <Input type="number" value={shaotAboda} onValueChange={(val) => setShaotAboda(val)} color="primary" className="max-w-[150px]" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-span-2 col-span-1 border-r-2 flex justify-center overflow-hidden overflow-y-auto">
                                        <div dir="rtl" className="w-full">
                                            {
                                                mafenemMotsarem?.map((motsar, index) => {
                                                    return <div>{checkAemRemezMataem(motsar.remez) && renderDropdownWithInputs(motsar, Names[index], index, false, agla?.newMafeneMotsarem,sogBaola)}</div>
                                                })
                                            }
                                            {
                                                motsaremBrofelemSofe?.map((brofel, index) => {
                                                    return brofel?.shem !== 'בחר פריט' && <div>{renderDropdownWithInputs(brofel, Names[33], index, true, agla?.motsaremBrofelemSofe,sogBaola)}</div>
                                                })
                                            }
                                            <div className="mt-28">&nbsp;</div>
                                        </div>
                                    </div>
                                    <div className="row-span-2 col-span-1 overflow-hidden overflow-y-auto">
                                        <div dir="rtl" className="w-full">
                                            {
                                                motsaremBrofelem && (sogAskaAgla === 'ייצור' || sogAska === 'ייצור') && <table className="h-full mr-20">
                                                    <thead>
                                                        <tr className="row-spacing">
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep77} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th className="w-[150px]">שטח עגלה</th>
                                                            <th><Input value={aorkh} onValueChange={(val) => { setAorkh(val); setTvahBrofel(''); setMsbarBrofelem(''); }} color="primary" size="sm" className="w-[100px]" label="אורך" type="number" /></th>
                                                            <th><Input value={rohf} onValueChange={(val) => { setRohf(val); setTvahBrofel(''); setMsbarBrofelem(''); }} color="primary" size="sm" className="w-[100px]" label="רוחב" type="number" /></th>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan={4}><Divider /></th>
                                                        </tr>
                                                        <tr className="row-spacing">
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep68} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th>מספר צירים</th>
                                                            <th><RadioGroup value={`${msbarTsrem}`} onValueChange={(val) => setMsbarTsrem(val)} className="flex"><div className="flex mr-5"><Radio value="1">1</Radio><Radio value="2">2</Radio></div></RadioGroup></th>
                                                            <th><Switch defaultSelected={agla?.mafenem?.aemBlamem} value={aemBlamem} onValueChange={(val) => setAemBlamem(val)}><div className="mr-3">עם בולמים</div></Switch></th>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan={4}><Divider /></th>
                                                        </tr>
                                                        <tr className="row-spacing">
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep20} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th>צמיג</th>
                                                            <th><Switch defaultSelected={agla?.mafenem?.aemTsmegSber} value={tsmegSber} onValueChange={(val) => setTsmegSber(val)}><div>צמיג ספר</div></Switch></th>
                                                            <th></th>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan={4}><Divider /></th>
                                                        </tr>
                                                        <tr className="row-spacing">
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep9} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
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
                                                                        setDisableSummedObjects(false);
                                                                        updateMotsaremBrofelem(0,
                                                                            {
                                                                                kmot: Math.min(((aorkh * 2) + (rohf * 2)), GetBrtemMotsarMlae('B5', val.currentKey).kmot),
                                                                                mher: Math.min(((aorkh * 2) + (rohf * 2)), GetBrtemMotsarMlae('B5', val.currentKey).kmot) * GetBrtemMotsarMlae('B5', val.currentKey).alot,
                                                                                shem: val.currentKey,
                                                                                remez: 'B5',
                                                                                message: ''
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
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep15} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th>שלדה קדמית</th>
                                                            <th><Input isReadOnly={motsaremBrofelem[0].shem === 'בחר פריט'} type="number" value={aorkhBrofel} onValueChange={(val) => {
                                                                setAorkhBrofel(parseFloat(val));
                                                                setDisableSummedObjects(false);
                                                                updateMotsaremBrofelem(1,
                                                                    {
                                                                        kmot: Math.min(((parseFloat(val) || 0) * 2), GetBrtemMotsarMlae('B5', motsaremBrofelem[1].shem).kmot),
                                                                        mher: Math.min(((parseFloat(val) || 0) * 2), GetBrtemMotsarMlae('B5', motsaremBrofelem[1].shem).kmot) * GetBrtemMotsarMlae('B5', motsaremBrofelem[1].shem).alot,
                                                                        shem: motsaremBrofelem[1].shem,
                                                                        remez: 'B5',
                                                                        message: ''
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
                                                                        setDisableSummedObjects(false);
                                                                        updateMotsaremBrofelem(1,
                                                                            {
                                                                                kmot: Math.min(((aorkhBrofel || 0) * 2), GetBrtemMotsarMlae('B5', val.currentKey).kmot),
                                                                                mher: Math.min(((aorkhBrofel || 0) * 2), GetBrtemMotsarMlae('B5', val.currentKey).kmot) * GetBrtemMotsarMlae('B5', val.currentKey).alot,
                                                                                shem: val.currentKey,
                                                                                remez: 'B5',
                                                                                message: ''
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
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep10} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th>שלדה פנימית</th>
                                                            <th><Input isReadOnly={!aorkh || !rohf} type="number" value={tvahBrofel} onValueChange={(val) => {
                                                                setTvahBrofel(val); setMsbarBrofelem(parseInt(Math.round((aorkh / (val / 100)) - 2)));
                                                                setDisableSummedObjects(false);
                                                                updateMotsaremBrofelem(2,
                                                                    {
                                                                        kmot: Math.min(parseInt(Math.round((aorkh / (val / 100)) - 2)), GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot),
                                                                        mher: Math.min(parseInt(Math.round((aorkh / (val / 100)) - 2)), GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot) * GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).alot,
                                                                        shem: motsaremBrofelem[2].shem,
                                                                        remez: 'B5',
                                                                        message: ''
                                                                    });
                                                            }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
                                                            <th><Input isReadOnly={!aorkh || !rohf} type="number" value={msbarBrofelem} onValueChange={(val) => {
                                                                setMsbarBrofelem(parseInt(val)); setTvahBrofel(formatNumber(((aorkh / (parseFloat(val) + 2)) * 100)));
                                                                setDisableSummedObjects(false);
                                                                updateMotsaremBrofelem(2,
                                                                    {
                                                                        kmot: Math.min(parseInt(val), GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot),
                                                                        mher: Math.min(parseInt(val), GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot) * GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).alot,
                                                                        shem: motsaremBrofelem[2].shem,
                                                                        remez: 'B5',
                                                                        message: ''
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
                                                                        setDisableSummedObjects(false);
                                                                        updateMotsaremBrofelem(2,
                                                                            {
                                                                                kmot: Math.min(helkBetBnmet ? msbarBrofelemBretA : (msbarBrofelem || 0), GetBrtemMotsarMlae('B5', val.currentKey).kmot),
                                                                                mher: Math.min(helkBetBnmet ? msbarBrofelemBretA : (msbarBrofelem || 0), GetBrtemMotsarMlae('B5', val.currentKey).kmot) * GetBrtemMotsarMlae('B5', val.currentKey).alot,
                                                                                shem: val.currentKey,
                                                                                remez: 'B5',
                                                                                message: ''
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
                                                                setDisableSummedObjects(false);
                                                                updateMotsaremBrofelem(2,
                                                                    {
                                                                        kmot: Math.min(val, GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot),
                                                                        mher: Math.min(val, GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).kmot) * GetBrtemMotsarMlae('B5', motsaremBrofelem[2].shem).alot,
                                                                        shem: motsaremBrofelem[2].shem,
                                                                        remez: 'B5',
                                                                        message: ''
                                                                    });
                                                                helkBetBnmet && motsaremBrofelem[3].shem !== 'בחר פריט' && updateMotsaremBrofelem(3,
                                                                    {
                                                                        kmot: Math.min(msbarBrofelem - val, GetBrtemMotsarMlae('B5', motsaremBrofelem[3].shem).kmot),
                                                                        mher: Math.min(msbarBrofelem - val, GetBrtemMotsarMlae('B5', motsaremBrofelem[3].shem).kmot) * GetBrtemMotsarMlae('B5', motsaremBrofelem[3].shem).alot,
                                                                        shem: motsaremBrofelem[3].shem,
                                                                        remez: 'B5',
                                                                        message: ''
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
                                                                            setDisableSummedObjects(false);
                                                                            updateMotsaremBrofelem(3,
                                                                                {
                                                                                    kmot: Math.min(msbarBrofelemBretA ? msbarBrofelem - msbarBrofelemBretA : 0, GetBrtemMotsarMlae('B5', val.currentKey).kmot),
                                                                                    mher: Math.min(msbarBrofelemBretA ? msbarBrofelem - msbarBrofelemBretA : 0, GetBrtemMotsarMlae('B5', val.currentKey).kmot) * GetBrtemMotsarMlae('B5', val.currentKey).alot,
                                                                                    shem: val.currentKey,
                                                                                    remez: 'B5',
                                                                                    message: ''
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
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep11} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
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
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep13} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
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
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep58} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th>צבע</th>
                                                            <th><Switch defaultSelected={agla?.mafenem?.aemTseba} value={aemTseba} onValueChange={(val) => setAemTseba(val)}><div className=""></div></Switch></th>
                                                            <th></th>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan={4}><Divider /></th>
                                                        </tr>
                                                        <tr className="row-spacing">
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep48} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th>פשפשול</th>
                                                            <th><Switch defaultSelected={agla?.mafenem?.aemBashbashol} isReadOnly={aemKafRetom} value={aemBashbashol} onValueChange={(val) => { setAemBashbashol(val) }}></Switch></th>
                                                            <th></th>
                                                        </tr>
                                                        <tr className="row-spacing">
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep37} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th>כף ריתום</th>
                                                            <th><Switch defaultSelected={agla?.mafenem?.aemKafRetom} isReadOnly={aemBashbashol} value={aemKafRetom} onValueChange={(val) => { setAemKafRetom(val) }}></Switch></th>
                                                            <th></th>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan={4}><Divider /></th>
                                                        </tr>
                                                        <tr className="row-spacing">
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep45} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th>מיכל מים</th>
                                                            <th><Switch defaultSelected={agla?.mafenem?.aemMekhalMaym} value={aemMekhalMaym} onValueChange={(val) => setAemMekhalMaym(val)}></Switch></th>
                                                            <th></th>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan={4}><Divider /></th>
                                                        </tr>
                                                        <tr className="row-spacing">
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep17} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th>ארגז כלים</th>
                                                            <th><Switch defaultSelected={agla?.mafenem?.aemArgazKlem} value={aemArgazKlem} onValueChange={(val) => setAemArgazKlem(val)}></Switch></th>
                                                            <th></th>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan={4}><Divider /></th>
                                                        </tr>
                                                        <tr className="row-spacing">
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep19} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th>גלגל עזר</th>
                                                            <th><Switch defaultSelected={agla?.mafenem?.aemGlgalAzer} value={aemGlgalAzer} onValueChange={(val) => setAemGlgalAzer(val)}></Switch></th>
                                                            <th></th>
                                                        </tr>
                                                        <tr>
                                                            <th colSpan={4}><Divider /></th>
                                                        </tr>
                                                        <tr className="row-spacing">
                                                            <th>
                                                                <div className="group relative z-30">
                                                                    <Image width={70} alt="none" src={rep73} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                </div>
                                                            </th>
                                                            <th>רגל חנייה</th>
                                                            <th><Switch defaultSelected={agla?.mafenem?.aemReglHnea} value={aemReglHnea} onValueChange={(val) => setAemReglHnea(val)}></Switch></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            }
                                            {
                                                (sogAskaAgla === 'הרכבת וו' || sogAska === 'הרכבת וו') &&
                                                <table className="h-full">
                                                    <thead>
                                                        <tr className="row-spacing">
                                                            <th><Avatar /></th>
                                                            <th className="w-[150px]">וו גרירה</th>
                                                            <th><Switch defaultSelected={agla?.vavGrera} value={vavGrera} onValueChange={(val) => setVavGrera(val)}></Switch></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            }
                                            {
                                                (sogAskaAgla === 'תיקון' || sogAska === 'תיקון') &&
                                                <div dir="ltr" ref={containerRef} className="overflow-auto h-[600px]">
                                                    <div ref={topOfFormRef} />
                                                    {entries?.map((entry, index) => (
                                                        <>
                                                            <div dir='rtl' key={index} className="w-full flex items-center mt-3 mb-3 justify-around">
                                                                <div className='mr-2'>{index + 1}</div>
                                                                <Dropdown dir="rtl">
                                                                    <DropdownTrigger>
                                                                        <Button
                                                                            size="lg"
                                                                            className='m-2 max-w-[150px] w-full'
                                                                        >
                                                                            {entry.category ? entry?.category : 'קטיגוריה'}
                                                                        </Button>
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu
                                                                        aria-label="Multiple selection example"
                                                                        variant="flat"
                                                                        closeOnSelect={true}
                                                                        disallowEmptySelection
                                                                        selectionMode="single"
                                                                        selectedKeys={entry.category}
                                                                        onSelectionChange={(val) => { handleEntriesChange(index, 'category', val.currentKey); }}
                                                                    >
                                                                        <DropdownItem key="מתכות">מתכות</DropdownItem>
                                                                        <DropdownItem key="צבעים">צבעים</DropdownItem>
                                                                        <DropdownItem key="חלקים גדולים">חלקים גדולים</DropdownItem>
                                                                        <DropdownItem key="חלקים קטנים">חלקים קטנים</DropdownItem>
                                                                        <DropdownItem key="מדביקות">מדביקות</DropdownItem>
                                                                        <DropdownItem key="אורות וחשמל">אורות וחשמל</DropdownItem>
                                                                        <DropdownItem key="חומרי עזר">חומרי עזר</DropdownItem>
                                                                        <DropdownItem key="ווי גרירה">ווי גרירה</DropdownItem>
                                                                        <DropdownItem key="עגלות">עגלות</DropdownItem>
                                                                        <DropdownItem key="פסולת">פסולת</DropdownItem>
                                                                    </DropdownMenu>
                                                                </Dropdown>
                                                                <Dropdown dir="rtl">
                                                                    <DropdownTrigger>
                                                                        <Button
                                                                            size="lg"
                                                                            className='m-2 max-w-[150px] w-full'
                                                                            isDisabled={!entries[index]?.category}
                                                                        >
                                                                            {entry.sogMotsar ? entry?.sogMotsar : 'בחר מוצר'}
                                                                        </Button>
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu
                                                                        aria-label="Multiple selection example"
                                                                        variant="flat"
                                                                        closeOnSelect={true}
                                                                        disallowEmptySelection
                                                                        selectionMode="single"
                                                                        selectedKeys={entry.id}
                                                                        onSelectionChange={(val) => { handleEntriesChange(index, 'sogMotsar', val.currentKey); }}
                                                                    >
                                                                        {
                                                                            GetCategoryRemez(entry?.category)?.length && GetCategoryRemez(entry?.category)?.map((cat) => {
                                                                                return <DropdownItem onClick={() => { handleEntriesChange(index, 'remez', cat.sog); console.log(cat.sog); }} key={cat?.shem}>{cat?.shem}</DropdownItem>
                                                                            })
                                                                        }
                                                                    </DropdownMenu>
                                                                </Dropdown>
                                                                <div onClick={() => { removeItem(index); setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== entry.remez)); console.log(entries[index].remez); }} className='ml-5 text-danger-500 hover:cursor-pointer w-full max-w-[150px]' >
                                                                    <div className="flex justify-center">
                                                                        <FaTrash className='text-2xl' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Divider />
                                                        </>
                                                    ))}
                                                    <div className="flex justify-around">
                                                        <Button onClick={handleAddEntries} className='m-5'>
                                                            <FiPlus />
                                                        </Button>
                                                        {
                                                            entries.length > 0 &&
                                                            <Button color="primary" type="submit" className='m-5'>
                                                                אישור
                                                            </Button>
                                                        }
                                                        {
                                                            entries?.length > 1 &&
                                                            <Button onClick={scrollToRef} className='m-5'>
                                                                <FaArrowUp />
                                                            </Button>
                                                        }
                                                    </div>
                                                    <div ref={endOfFormRef} />
                                                </div>
                                            }
                                            <div className="mt-28">&nbsp;</div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                (agla && sogAskaAgla === 'ייצור' && sogBaola === 'D') &&
                                <div className="w-full h-full flex p-32 justify-center">
                                    {<ModalMessage show={showModalMessage} disable={() => setShowModalMessage(false)} Aeshor={(val) => setAeshor(val)} message={'האם אתה בטוח למכור העגלה!?'} />}
                                    {<ModalAddProductCategory msbarTfaol={agla?.msbar} Aeshor={(val) => {
                                        if (val) {
                                            HosfatAglaLmlae();
                                        }
                                    }} sckhom={mherKlale} category={GetCategoryAglot()} show={showModalCategoryAgla} disable={() => setShowModalCategoryAgla(false)} />}
                                    {<ModalBrokAgla Berok={(val, motsaremmm, Brofelemmm) => {
                                        if (val) {
                                            berokAgla(motsaremmm, Brofelemmm);
                                        }
                                    }} motsarem={mafenemMotsarem} Brofelem={motsaremBrofelemSofe} show={showModalBerokAgla} disable={() => setShowModalBerokAgla(false)} />}
                                    <div className="w-full max-w-[700px]">
                                        <div className="flex justify-center bg-primary-200 p-2 rounded-2xl">
                                            תמחיר
                                        </div>
                                        <Heshvonet ref={componentRefOne} motsar={agla} lkoh={lkohTfaol} />
                                    </div>
                                    <Divider className="w-[2px] h-full ml-5 mr-5" />
                                    <div className="w-full max-w-[700px] flex flex-col">
                                        <div className="flex justify-center bg-primary-200 p-2 rounded-2xl">
                                            עסקת מכירה
                                        </div>
                                        <div dir="rtl" className="mt-10 flex flex-col flex-grow">
                                            <div>
                                                <Input color="primary" className="max-w-[200px] mb-5" isReadOnly label="לקןח" value={lkohTfaol?.name} />
                                            </div>
                                            <Divider />
                                            <div className="mt-5 flex justify-around items-center">
                                                <Avatar size="sm" />
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
                            {
                                (agla && sogAskaAgla === 'הרכבת וו' && sogBaola === 'D') && <div className="bg-black">
                                    <div>
                                        1221322222222222222222222222222222222222222222222222222222222222
                                    </div>
                                    <div>
                                        1221322222222222222222222222222222222222222222222222222222222222
                                    </div>
                                    <div>
                                        1221322222222222222222222222222222222222222222222222222222222222
                                    </div>
                                    <div>
                                        1221322222222222222222222222222222222222222222222222222222222222
                                    </div>
                                    <div>
                                        1221322222222222222222222222222222222222222222222222222222222222
                                    </div>
                                    <div>
                                        1221322222222222222222222222222222222222222222222222222222222222
                                    </div>
                                    <div>
                                        1221322222222222222222222222222222222222222222222222222222222222
                                    </div>
                                    <div>
                                        1221322222222222222222222222222222222222222222222222222222222222
                                    </div>
                                    <div>
                                        1221322222222222222222222222222222222222222222222222222222222222
                                    </div>
                                    <div>
                                        1221322222222222222222222222222222222222222222222222222222222222
                                    </div>
                                </div>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t-2 m-auto w-full items-center absolute bg-white bottom-0 z-40">
                        {
                            sogBaola &&
                            <div>{sogBaola}</div>
                        }
                        <div className="flex w-full">
                            {
                                agla &&
                                <Button onClick={async () => {
                                    await deleteDoc(doc(firestore, 'tfaol', agla?.id));
                                    disable();
                                }} color="danger" className='mr-5 ml-5' size="lg"><FaTrash />מחיקה</Button>
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
                                            onSelectionChange={(val) => { setSogAska(val.currentKey); setMotsaremLhatseg([]) }}
                                        >
                                            <DropdownItem key="ייצור"><div className="flex justify-around items-center hover:text-primary"><div className="text-lg font-bold min-w-[100px]">ייצור</div><Image src={rep6} className="h-[50px] w-[80px] " /></div></DropdownItem>
                                            <DropdownItem key='הרכבת וו'><div className="flex justify-around items-center hover:text-primary"><div className="text-lg font-bold min-w-[100px]">הרכבת וו</div><Image src={rep23} className="h-[50px] w-[80px] " /></div></DropdownItem>
                                            <DropdownItem key='תיקון'><div className="flex justify-around items-center hover:text-primary"><div className="text-lg font-bold min-w-[100px]">תיקון</div><Image src={rep78} className="h-[50px] w-[80px] " /></div></DropdownItem>
                                            {/* <DropdownItem key="טסט">טסט</DropdownItem> */}
                                        </DropdownMenu>
                                    </Dropdown>
                                }
                                <Button size="lg" className='mr-5 ml-5' color="primary" variant="bordered" onClick={() => { ResetAll(); disable(); }}>
                                    סגור
                                </Button>
                                {/* <Button onClick={async() => {
                                    for (let index = 0; index < mlae.length; index++) {
                                        await updateDoc(doc(firestore,'mlae',mlae[index].id),{
                                            alotLeheda : 0,
                                            alot : 0,
                                            kmot : 0
                                        })

                                    }
                                }}>
                                    123
                                </Button> */}
                                {
                                    (agla && sogBaola === 'D' && !Aeshor) ?
                                        <Button size="lg" className='mr-5 ml-5' color="primary" onClick={() => setShowModalMessage(true)}>
                                            אישור
                                        </Button>
                                        : (BdekatMtsavem() != agla?.sogBaola) || BdekatHeshtnotKmotmotsarem() ?
                                            <Button size="lg" className='mr-5 ml-5' color="primary" onClick={() => { addValues(); handelPrintHeshvonit(); }}>
                                                להתקדם
                                            </Button>
                                            :
                                            null
                                }
                            </div>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}



