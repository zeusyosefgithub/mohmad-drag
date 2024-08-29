'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, Radio, RadioGroup, Switch } from "@nextui-org/react";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import GetDocs from "../FireBase/getDocs";
import { useGetDataByCondition, useGetDataByConditionWithoutUseEffect } from "../FireBase/getDataByCondition";
import { MdCancel } from "react-icons/md";
import { addDoc, collection, count, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { FaPlus, FaTrash } from "react-icons/fa";
import { format } from 'date-fns';
import { useCallback } from 'react';
import { RiErrorWarningFill } from "react-icons/ri";
import ModalMessage from "./ModalMessage";
import ModalAddProductCategory from "./ModalAddProductCategory";
import ModalBrokAgla from "./ModalBrokAgla";
import { FiPlus, FiPlusCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
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
import rep37 from '../../images/rep37.jpg';
import rep48 from '../../images/rep48.jpg';
import rep58 from '../../images/rep58.png';
import rep68 from '../../images/rep68.png';
import rep77 from '../../images/rep77.jpg';
import rep17 from '../../images/rep17.jpg';
import rep73 from '../../images/rep73.png';
import rep45 from '../../images/rep45.png';
import rep80 from '../../images/rep80.png';
import rep81 from '../../images/rep81.png';
import { Comment, Hourglass, Puff, RotatingLines, ThreeCircles } from "react-loader-spinner";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { TofsTokhnetYetsor } from "../Page Components/TofsTokhnetYetsor";
import { CiCirclePlus } from "react-icons/ci";
import { CgClose, CgCloseO, CgFileDocument } from "react-icons/cg";
import { BsFillBookmarkCheckFill, BsListCheck } from "react-icons/bs";
import { RxCheckCircled } from "react-icons/rx";
import { Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popper, TextField, Toolbar, Typography, useTheme } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { FaHandHoldingDollar } from "react-icons/fa6";


export default function ModalCreate({ show, disable, agla, lkohTfaol, drag, sogAskaa, mlae, category, Tokhneot }) {
    const [loading, setLoading] = useState(false);
    const lkhot = GetDocs('customers');
    const [lkoh, setLkoh] = useState('');
    const [lkohMsbar, setLkohMsbar] = useState('');
    const [aglot, setAglot] = useState([]);
    const router = useRouter();
    const [sogAgla, setSogAgla] = useState('פתוחה');
    const [mherKlale, setMherKlale] = useState(0);
    const [kveatMher, setKveatMher] = useState(false);
    const [hskmatLkoh, setHskmatLkoh] = useState(false);
    const [shaotAboda, setShaotAboda] = useState('');
    const [aorkh, setAorkh] = useState(0);
    const [aorkhSM, setAorkhSM] = useState(0);
    const [rohf, setRohf] = useState(0);
    const [rohfSM, setRohfSM] = useState(0);
    const [sogGlgalem, setSogGlgalem] = useState('');
    const [thelatYetsor, setThelatYetsor] = useState(false);
    const [msbarAgla, setMsbarAgla] = useState('');
    const [seomYetsor, setSeomYetsor] = useState(false);
    const [hshhyatYetsor, setHshhyatYetsor] = useState(false);
    const [seomReshaion, setSeomReshion] = useState(false);
    const [msbarTsrem, setMsbarTsrem] = useState('');
    const [hlokaTvah, setHlokaTvah] = useState(0);
    const [hlokaMsbarBrofelem, setHlokaMsbarBrofelem] = useState(0);
    const [aemBlamem, setAemBlamem] = useState(false);
    const [hnha, setHnha] = useState(0);
    const [tosftVnel, setTosftVnel] = useState(false);
    const [tsmegSber, setTsmegSber] = useState(false);
    const [tvahHlokatRmba, setTvahHlokatRmba] = useState(0);
    const [msbarBrofelemHlokatRmba, setMsbarBrofelemHlokatRmba] = useState(0);
    const [aorkhBrofel, setAorkhBrofel] = useState(0);
    const [aorkhBrofelSM, setAorkhBrofelSM] = useState(0);
    const [aorkhRmbaMsgertRmba, setAorkhRmbaMsgertRmba] = useState(0);
    const [aorkhRmbaMsgertRmbaSM, setAorkhRmbaMsgertRmbaSM] = useState(0);
    const [msbarBrofelemBretA, setMsbarBrofelmBretA] = useState(null);
    const [aemTseba, setAemTseba] = useState(false);
    const [aemBashbashol, setAemBashbashol] = useState(false);
    const [aemKafRetom, setAemKafRetom] = useState(false);
    const [aemMekhalMaym, setAemMekhalMaym] = useState(false);
    const [aemArgazKlem, setAemArgazKlem] = useState(false);
    const [aemReglHnea, setAemReglHnea] = useState(false);
    const [tvahBrofel, setTvahBrofel] = useState('');
    const [msbarBrofelem, setMsbarBrofelem] = useState('');
    const [solam, setSolam] = useState('');
    const [aemDelet, setAemDelet] = useState(false);
    const [tosefetReshet, setTosefetReshet] = useState(false);
    const [gobahSolam, setGobahSolam] = useState(0);
    const [gobahSolamSM, setGobahSolamSM] = useState(0);
    const [tvahAofkeSolam, setTvahAofkeSolam] = useState(0);
    const [tvahAnkheSolam, setTvahAnkheSolam] = useState(0);
    const [msbarBrofelemAofkeSolam, setMsbarBrofelemAofkeSolam] = useState(0);
    const [msbarBrofelemAnkhe, setMsbarBrofelemAnkhe] = useState(0);
    const [helkBetBnmet, setHelkBetBnmet] = useState(false);
    const [aemRmbaAoRgel, setAemRmbaAoRgel] = useState('');
    const [mafenemMotsarem, setMafenemMotsarem] = useState([]);
    const [motsaremBrofelemSofe, setMotsaremBrofelemSofe] = useState([]);
    const [constantDate, setConstantDate] = useState('2024-12-25T00:00:00.000Z');
    const metadata = GetDocs('metadata');
    const counter = metadata.find((count) => count.id === 'counterTfaol');
    const counterShaotAboda = metadata.find((count) => count.id === 'counterShaotAboda');
    const counterNekoeMaam = metadata.find((count) => count.id === 'counterNekoeMaam');
    const counterHeshvoneot = metadata.find((count) => count.id === 'counterHeshvoneot');
    const prevRemzemRef = useRef();
    const [modalHosfatLkoh, setModalHosfatLkoh] = useState(false);
    const [sogAskaAgla, setSogAskaAgla] = useState('');
    const [aosek, setAosek] = useState('');
    const [motsaremLhatseg, setMotsaremLhatseg] = useState([]);
    const [hkhnsot, setHkhnsot] = useState(0);
    const [hkhnsotHomreGlem, setHkhnsotHomreGlem] = useState(0);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorMessageText, setErrorMessageText] = useState('');
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [Aeshor, setAeshor] = useState(null);
    const [showModalCategoryAgla, setShowModalCategoryAgla] = useState(false);
    const [showModalBerokAgla, setShowModalBerokAgla] = useState(false);
    const [entries, setEntries] = useState([{ category: '', sogMotsar: '', shemMotsar: '', remez: '', message: '' }]);
    const [hotsotSkhar, setHotsaotSkhar] = useState(0);
    const [hotsotAkefot, setHotsaotAkefot] = useState(0);
    const MotsaremRefs = useRef(Array(51).fill(null).map(() => React.createRef()));
    const BrofelemRefs = useRef(Array(20).fill(null).map(() => React.createRef()));
    const componentRefOne = useRef();
    const [tokhnetNokhhet, setTokhnetNokhhet] = useState(null);
    const [shemTokhnet, setShemTokhnet] = useState('');
    const componentRefTwo = useRef();
    const refggg = useRef(null);
    const [showModalAddMotsarAher, setShowModalAddMotsarAher] = useState(false);

    const [sogBaola, setSogBaola] = useState('');
    const [hshhyatYetsorZman, setHshhyatYetsorZman] = useState();
    const initializeItems = (count) => {
        const itemTemplate = {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        };
        return Array.from({ length: count }, () => ({ ...itemTemplate }));
    };
    const [motsaremBrofelem, setMotsaremBroflem] = useState(initializeItems(14));
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
        const motsarMlae = mlae?.filter(item => item.categoryMotsar === remez);
        const alot = motsarMlae?.find(item => item.shem === shem)?.alotLeheda || 0;
        const kmot = motsarMlae?.find(item => item.shem === shem)?.kmot || 0;
        const msbar = motsarMlae?.find(item => item.shem === shem)?.msbar || '';
        return { arrayResualt: motsarMlae, alot, kmot, msbar };
    }, [mlae]);
    const BdekatMtsavE = () => {
        if (Aeshor) {
            return true;
        }
        return false;
    }
    const BdekatMtsavD = () => {
        if ((sogAskaa || sogAskaAgla) === 'ייצור') {
            if (seomYetsor && seomReshaion) {
                return true;
            }
            return false;
        }
        else if ((sogAskaa || sogAskaAgla) === 'הרכבת וו') {
            if (seomYetsor) {
                return true;
            }
        }
        else if ((sogAskaa || sogAskaAgla) === 'תיקון') {
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
        if (kveatMher) {
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
    const ResetAll = () => {
        const initialMafenemMotsarem = Remzem.map(remez => ({
            kmot: 0,
            mher: 0,
            shem: '',
            remez: remez,
            message: ''
        }));
        setMafenemMotsarem(GetSortedMafeneMotsarem(initialMafenemMotsarem));
        setSogAskaAgla('');
        setLkoh('');
        setMherKlale(0);
        setKveatMher(false);
        setHskmatLkoh(false);
        setAorkhSM(0);
        setRohfSM(0);
        setShaotAboda('');
        setAorkh(0);
        setRohf(0);
        setThelatYetsor(false);
        setMsbarAgla('');
        setSogAgla('פתוחה');
        setSeomYetsor(false);
        setHshhyatYetsor(false);
        setSeomReshion(false);
        setHlokaTvah(0);
        setHlokaMsbarBrofelem(0);
        setMsbarTsrem('');
        setAemBlamem(false);
        setTsmegSber(false);
        setAorkhBrofel(0);
        setAorkhBrofel(0);
        setGobahSolamSM(0);
        setAorkhBrofelSM(0);
        setAorkhRmbaMsgertRmba(0);
        setAorkhRmbaMsgertRmbaSM(0);
        setTosftVnel(false);
        setTvahHlokatRmba(0);
        setMsbarBrofelemHlokatRmba(0);
        setMsbarBrofelmBretA(null);
        setAemTseba(false);
        setAemBashbashol(false);
        setAemKafRetom(false);
        setAemMekhalMaym(false);
        setAemArgazKlem(false);
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
        setHotsaotAkefot(0);
        setSogBaola('');
        setShemTokhnet('');
        setTokhnetNokhhet(null);
        setHnha(0);
        setAeshor(false);
        setHshhyatYetsorZman();
        setMotsaremBroflem(initializeItems(14));
        setEntries([{ category: '', sogMotsar: '', shemMotsar: '', remez: '', message: '' }]);
    }
    function handleChangeBrofelem(index, key, value) {
        setMotsaremBrofelemSofe(prevState => {
            const newState = [...prevState];
            if (index < 0 || index >= newState.length) {
                console.error("Invalid index");
                return newState;
            }
            newState[index] = { ...newState[index], [key]: value };
            return newState;
        });
    }
    function handleInputChangeBrofelem(index, value) {
        setMotsaremBrofelemSofe(prevState => {
            const newState = [...prevState];
            if (index < 0 || index >= newState.length) {
                console.error("Invalid index");
                return newState;
            }
            const item = newState[index];
            const sum = item.kmot + item.kmotYdnet;
            item.kmotYdnet = value - item.kmot;
            return newState;
        });
    }
    const reduceArray = (val) => {
        const combinedItems = {};
        const processItem = (item, additionalLogic = false, isAgla = false) => {
            if (item.shem === 'בחר פריט') return;
            if (combinedItems[item.shem]) {
                if (!additionalLogic) {
                    combinedItems[item.shem].kmot += item.kmot;
                    combinedItems[item.shem].mher += parseFloat((item.mher).toFixed(1));
                    combinedItems[item.shem].mher = parseFloat(combinedItems[item.shem].mher.toFixed(1));
                }
                if (additionalLogic) {
                    combinedItems[item.shem].kmotYdnet += item.kmotYdnet;
                    if (!agla?.motsaremBrofelemSofe?.length) {
                        combinedItems[item.shem].mher += parseFloat(((item.kmotYdnet) * GetBrtemMotsarMlae(item.remez, item.shem).alot).toFixed(1));
                        combinedItems[item.shem].mher = parseFloat(combinedItems[item.shem].mher.toFixed(1));
                    }
                    else {
                        combinedItems[item.shem].mher += parseFloat(((item.kmotYdnet + item.kmot) * GetBrtemMotsarMlae(item.remez, item.shem).alot).toFixed(1));
                        combinedItems[item.shem].mher = parseFloat(combinedItems[item.shem].mher.toFixed(1));
                    }
                }
            } else {
                combinedItems[item.shem] = { ...item };
            }
        };
        if (val) {
            motsaremBrofelem?.forEach(item => processItem(item, false, true));
            motsaremBrofelemSofe?.forEach(item => processItem(item, true));
        }
        else {
            motsaremBrofelem?.forEach(item => processItem(item));
            motsaremBrofelemSofe?.forEach(item => processItem(item, true));
        }
        return Object.values(combinedItems);
    };
    const Remzem = useMemo(() => {
        let newArray = [];
        for (let index = 0; index < category?.length; index++) {
            for (let index1 = 0; index1 < category[index].motsarem.length; index1++) {
                newArray.push(category[index].motsarem[index1].sog);
            }
        }
        return newArray.sort();
    }, [category]);
    const MathXx1 = (remez) => {
        if (remez === 'B7') {
            return aorkh * 2;
        }
        else if (remez === 'B2') {
            return rohf;
        }
        else if (remez === 'B9') {
            return rohf;
        }
        else {
            return null;
        }
    }
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
                if (name === 'kmot') {
                    handleInputChangeBrofelem(index, value);
                }
                else {
                    handleChangeBrofelem(index, name, value);
                }
            }
            else {
                setMafenemMotsarem(prevMafenemMotsarem => {
                    if (!Array.isArray(prevMafenemMotsarem)) {
                        return prevMafenemMotsarem;
                    }
                    const newMafenemMotsarem = [...prevMafenemMotsarem];
                    const updatedItem = {
                        ...newMafenemMotsarem[index],
                        [name]: name === 'kmot' || name === 'mher' ? parseInt(value) : value
                    };
                    newMafenemMotsarem[index] = updatedItem;
                    return GetSortedMafeneMotsarem(newMafenemMotsarem);
                });
            }
        },
        [mafenemMotsarem, motsaremBrofelemSofe] // was setMafenemMotsarem
    );
    const GetCategoryAglot = () => {
        for (let index = 0; index < category.length; index++) {
            if (category[index].id === 'S') {
                return category[index];
            }
        }
        return null;
    }
    const TekonKmoeotMotsaremBrofelem = () => {
        let newArray = [];
        for (let index = 0; index < motsaremBrofelem.length; index++) {
            newArray.push({
                kmot: motsaremBrofelem[index].kmot,
                kmotYdnet: 0,
                mher: 0,
                shem: motsaremBrofelem[index].shem,
                remez: motsaremBrofelem[index].remez,
                message: motsaremBrofelem[index].message,
                sogShem: motsaremBrofelem[index].sogShem
            });
        }
        return newArray;
    }
    const RemoveMotsarToNull = (remez) => {
        let newArray = [];
        for (let index = 0; index < mafenemMotsarem?.length; index++) {
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
        setMafenemMotsarem(GetSortedMafeneMotsarem(newArray));
    }

    const addValues = async () => {
        setLoading(true);
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
            yredatMlae: (BdekatMtsavem() === 'C' || BdekatMtsavem() === 'D') ? true : false,
            sogAgla: sogAgla,
            sogAska: sogAskaa,
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
                ahozRevah: getDigitsAfterDot((((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) / mherKlale) || 0),
                hkhnsot: 0,
                hotsaotHomreGlem: hkhnsotHomreGlem,
                hotsaotSkhar: hotsotSkhar,
                hotsotAkefot: hotsotAkefot,
                maam: formatNumberWithCommas(parseInt(mherKlale * 0.17) || 0),
                revahYsher: formatNumberWithCommas((mherKlale - hkhnsotHomreGlem - hotsotSkhar) || 0),
                revhNke: formatNumberWithCommas(((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) || 0),
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
                hnha,
                tvahAofkeSolam: tvahAofkeSolam || '',
                msbarBrofelemAofkeSolam,
                tvahAnkheSolam: tvahAnkheSolam || '',
                msbarBrofelemAnkhe,
                gobahSolam,
                tosefetReshet: tosefetReshet || '',
                aemDelet: aemDelet || false,
                solam,
                tosftVnel,
                tvahHlokatRmba,
                msbarBrofelemHlokatRmba,
                aorkhRmbaMsgertRmba: aorkhRmbaMsgertRmba,
                msbarBrofelemBretA: ((helkBetBnmet ? (msbarBrofelemBretA || motsaremBrofelem[2].kmot) : (msbarBrofelem || 0)) || ''),
                hlokaTvah: hlokaTvah,
                hlokaMsbarBrofelem: hlokaMsbarBrofelem,
                sogGlgalem: sogGlgalem,
                aorkh: parseFloat(aorkh),
                rohf: parseFloat(rohf),
                msbarTsrem: parseFloat(msbarTsrem) || '',
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
                aemReglHnea: aemReglHnea
            },
            motsaremBrofelemSofe: motsaremBrofelemSofe,
            motsaremBrofelem: TekonKmoeotMotsaremBrofelem(),
            newMafeneMotsarem: mafenemMotsarem,
            entries: entries

        }
        if (agla?.msbar) {
            try {
                updateDoc(doc(firestore, 'tfaol', agla?.id), {
                    mherMkhera: (agla?.mherMkhera !== mherKlale) && (mherKlale !== '') ? mherKlale : agla?.mherMkhera,
                    sogBaola: BdekatMtsavem(),
                    sogAgla: sogAgla,
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
                        ahozRevah: getDigitsAfterDot((((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) / mherKlale) || 0),
                        hkhnsot: 0,
                        hotsaotHomreGlem: hkhnsotHomreGlem,
                        hotsaotSkhar: hotsotSkhar,
                        hotsotAkefot: hotsotAkefot,
                        maam: formatNumberWithCommas(parseInt(mherKlale * 0.17) || 0),
                        revahYsher: formatNumberWithCommas((mherKlale - hkhnsotHomreGlem - hotsotSkhar) || 0),
                        revhNke: formatNumberWithCommas(((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) || 0),
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
                        hnha,
                        tvahAofkeSolam: tvahAofkeSolam || '',
                        msbarBrofelemAofkeSolam,
                        tvahAnkheSolam: tvahAnkheSolam || '',
                        msbarBrofelemAnkhe,
                        gobahSolam,
                        tosefetReshet: tosefetReshet || '',
                        aemDelet: aemDelet || false,
                        solam,
                        tosftVnel,
                        tvahHlokatRmba,
                        msbarBrofelemHlokatRmba,
                        aorkhRmbaMsgertRmba: aorkhRmbaMsgertRmba,
                        msbarBrofelemBretA: ((helkBetBnmet ? (msbarBrofelemBretA || motsaremBrofelem[2].kmot) : (msbarBrofelem || 0)) || ''),
                        hlokaTvah: hlokaTvah,
                        hlokaMsbarBrofelem: hlokaMsbarBrofelem,
                        sogGlgalem: sogGlgalem,
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
                        aemReglHnea: aemReglHnea
                    },
                    motsaremBrofelemSofe: motsaremBrofelemSofe,
                    motsaremBrofelem: motsaremBrofelem,
                    newMafeneMotsarem: mafenemMotsarem,
                    entries: entries,
                    msbarHeshvonet: BdekatMtsavem() === 'E' ? counterHeshvoneot?.count : '',
                    aemSholam: false
                });

                if (BdekatMtsavem() === 'C' || BdekatMtsavem() === 'D' || BdekatMtsavem() === 'E' && !agla?.yredatMlae) {
                    if (sogBaola !== 'C') {
                        await processItems(mafenemMotsarem, mlae);
                        await processItems(motsaremBrofelemSofe, mlae);
                    }
                    await updateInventory(firestore, mlae, mafenemMotsarem, agla?.newMafeneMotsarem, false);
                    await updateInventory(firestore, mlae, motsaremBrofelemSofe, agla?.motsaremBrofelemSofe, true);
                    await updateDoc(doc(firestore, 'tfaol', agla?.id), {
                        yredatMlae: true
                    });
                }
                if (BdekatMtsavem() === 'E') {
                    if (aosek === 'נגררי עירון') {
                        await updateDoc(doc(firestore, 'metadata', 'counterHeshvoneot'), {
                            count: counterHeshvoneot?.count + 1
                        });
                    }
                    else if (aosek === 'מ.כ בטיחות בע"מ') {
                        await updateDoc(doc(firestore, 'metadata', 'counterHeshvoneot'), {
                            count2: counterHeshvoneot?.count2 + 1
                        });
                    }
                    await updateDoc(doc(firestore, 'customers', lkohTfaol?.id), {
                        yetera: parseFloat(lkohTfaol?.yetera) + parseFloat(mherKlale)
                    });
                    await updateDoc(doc(firestore, 'metadata', 'counterTfaol'), {
                        //countESumAglotSumMunths: counter.countESumAglotForMunth !== format(new Date(), 'MM-yyyy') ? (parseFloat(counter.countESumAglotSumMunths) + 1) : (counter.countESumAglotSumMunths),
                        countE: counter.countE + 1,
                        countEAglot: counter.countEAglot + 1,
                        countESumAglot: parseFloat(counter.countESumAglot) + parseFloat(mherKlale),
                        countEHnhotAglot: counter.countEHnhotAglot + hnha,
                        countESumHGAglot: counter.countESumHGAglot + hkhnsotHomreGlem,
                        countESumAglotMunth: counter.countESumAglotForMunth === format(new Date(), 'MM-yyyy') ? (parseFloat(counter.countESumAglotMunth) + parseFloat(mherKlale)) : (parseFloat(mherKlale)),
                        countESumHnhotAglotMunth: counter.countESumAglotForMunth === format(new Date(), 'MM-yyyy') ? (counter.countESumHnhotAglotMunth + hnha) : (hnha),
                        countESumHGAglotMunth: counter.countESumAglotForMunth === format(new Date(), 'MM-yyyy') ? (counter.countESumHGAglotMunth + hkhnsotHomreGlem) : (hkhnsotHomreGlem),
                        countESumAglotForMunth: format(new Date(), 'MM-yyyy'),

                    });
                    await updateDoc(doc(firestore, 'metadata', 'counterNekoeMaam'), {
                        countHotsaotMaam: counterNekoeMaam.munth === format(new Date(), 'dd-MM-yyyy') ? (counterNekoeMaam.countHotsaotMaam + (mherKlale * 0.17)) : (mherKlale * 0.17),
                        munth: format(new Date(), 'dd-MM-yyyy')
                    });
                    await updateDoc(doc(firestore, 'drags', drag?.id), {
                        active: true
                    });
                    if (BdekatMtsavem() === 'C') {
                        handelPrintggg();
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            try {
                if (BdekatMtsavem() === 'C') {
                    handelPrintggg();
                }
                if (BdekatMtsavem() === 'C' || BdekatMtsavem() === 'D') {
                    await processItems(mafenemMotsarem, mlae);
                    await processItems(motsaremBrofelemSofe, mlae);
                }
                // if (BdekatMtsavem() === 'C' || BdekatMtsavem() === 'D') {
                //     console.log('yoseffffffff234');
                //     await processItems(mafenemMotsarem, mlae);
                //     await processItems(motsaremBrofelemSofe, mlae);
                //     await updateInventory(firestore, mlae, mafenemMotsarem, agla?.newMafeneMotsarem, false);
                //     await updateInventory(firestore, mlae, motsaremBrofelemSofe, agla?.motsaremBrofelemSofe, true);
                // }
                await addDoc(collection(firestore, "tfaol"), Props);
            }
            catch (e) {
                console.log(e);
            }
        }
        (!agla?.msbar) && await updateDoc(doc(firestore, 'metadata', 'counterTfaol'), { count: counter?.count + 1 });
        setLoading(false);
        ResetAll();
        disable();
        if (BdekatMtsavem() === 'D') {
            router.push('/sales');
        }
    }
    async function updateInventory(firestore, mlae, currentItems, newItems, isElse) {
        for (let index = 0; index < currentItems.length; index++) {
            const currentItem = currentItems[index];
            const newItem = newItems ? newItems[index] : null;
            if (currentItem.shem === "\"פרופיל U\"") { console.log(currentItem); console.log(newItem); }
            const skhomKolcurrentItems = isElse ? (currentItem.kmot + currentItem.kmotYdnet) : currentItem.kmot;
            const skhomKolnewItems = isElse ? (newItem.kmot + newItem.kmotYdnet) : newItem.kmot;
            if (!newItem || currentItem.shem !== newItem.shem) {
                if (currentItem.shem === "\"פרופיל U\"") { console.log(1); }
                for (let mlaeItem of mlae) {
                    if (newItem && mlaeItem.categoryMotsar === newItem.remez && mlaeItem.shem === newItem.shem) {
                        console.log(1);
                        console.log("mlaeItem.kmot --" + mlaeItem.kmot);
                        console.log("mlaeItem.kmot --" + skhomKolnewItems);
                        console.log("mlaeItem.kmot + newItem.kmot --" + (mlaeItem.kmot + skhomKolnewItems));
                        await updateDoc(doc(firestore, 'mlae', mlaeItem.id), {
                            kmot: mlaeItem.kmot + skhomKolnewItems
                        });
                    }
                    if (mlaeItem.categoryMotsar === currentItem.remez && mlaeItem.shem === currentItem.shem) {
                        console.log(2);
                        console.log("mlaeItem.kmot --" + mlaeItem.kmot);
                        console.log("currentItem.kmot --" + skhomKolcurrentItems);
                        console.log("mlaeItem.kmot - currentItem.kmot --" + (mlaeItem.kmot - skhomKolcurrentItems));
                        await updateDoc(doc(firestore, 'mlae', mlaeItem.id), {
                            kmot: mlaeItem.kmot - skhomKolcurrentItems
                        });
                    }
                }
            } else if (skhomKolcurrentItems !== skhomKolnewItems && currentItem.shem === newItem.shem) {
                if (currentItem.shem === "\"פרופיל U\"") { console.log(2); }
                for (let mlaeItem of mlae) {
                    if (mlaeItem.categoryMotsar === currentItem.remez && mlaeItem.shem === currentItem.shem) {
                        console.log(3);
                        console.log("mlaeItem.kmot --" + mlaeItem.kmot);
                        const kmotDifference = skhomKolnewItems - skhomKolcurrentItems;
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
    function GetIndexMotsar(remez1, wich) {
        for (let index = 0; index < mafenemMotsarem?.length; index++) {
            if (mafenemMotsarem[index]?.remez === remez1) {
                return index;
            }
        }
        return null;
    }
    const HosfatAglaLmlae = async () => {
        setLoading(true);
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
        setLoading(false);
    }
    const berokAgla = async (motsaremmm, Brofelemmm) => {
        setLoading(true);
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
                    aemReglHnea: aemReglHnea
                },
                motsaremBrofelemSofe: reduceArray(),
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
        setLoading(false);
    }
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
    };
    const BdekatTekonKmeotMotsarem = () => {
        for (let index = 0; index < mafenemMotsarem.length; index++) {
            if (mafenemMotsarem[index].kmot > 0) {
                return false;
            }
        }
        for (let index = 0; index < motsaremBrofelemSofe.length; index++) {
            if ((motsaremBrofelemSofe[index].kmot + motsaremBrofelemSofe[index].kmotYdnet) > 0) {
                return false;
            }
        }
        return true;
    }
    function removeItem(index) {
        const newItems = entries.filter((item, idx) => idx !== index);
        setEntries(newItems);
    }
    const BdekatKolKmoeotHmotsarem = () => {
        let errors = 0;
        for (let index = 0; index < mafenemMotsarem?.length; index++) {
            if (mafenemMotsarem[index].kmot > GetBrtemMotsarMlae(mafenemMotsarem[index].remez, mafenemMotsarem[index].shem).kmot) {
                handleInputChange(false, index,
                    'כמות חורגת',
                    'message');
                errors++;
                console.log(mafenemMotsarem[index]);
            }
        }
        for (let index = 0; index < motsaremBrofelemSofe.length; index++) {
            if ((motsaremBrofelemSofe[index].kmot + motsaremBrofelemSofe[index].kmotYdnet) > GetBrtemMotsarMlae(motsaremBrofelemSofe[index].remez, motsaremBrofelemSofe[index].shem).kmot) {
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
        for (let index = 0; index < mafenemMotsarem?.length; index++) {
            if (mafenemMotsarem[index].kmot > GetBrtemMotsarMlae(mafenemMotsarem[index].remez, mafenemMotsarem[index].shem).kmot) {
                errors++;
            }
        }
        for (let index = 0; index < motsaremBrofelemSofe.length; index++) {
            if ((motsaremBrofelemSofe[index].kmot + motsaremBrofelemSofe[index].kmotYdnet) > GetBrtemMotsarMlae(motsaremBrofelemSofe[index].remez, motsaremBrofelemSofe[index].shem).kmot) {
                errors++;
            }
        }
        return errors > 0 ? true : false;
    }
    const handelPrintHeshvonit = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRefOne.current,
    });
    const handelPrintggg = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRefTwo.current,
    });
    const BdekatHeshtnotKmotmotsarem = () => {
        for (let index = 0; index < agla?.newMafeneMotsarem?.length; index++) {
            if (agla?.newMafeneMotsarem[index]?.kmot !== mafenemMotsarem[index]?.kmot ||
                agla?.newMafeneMotsarem[index]?.shem !== mafenemMotsarem[index]?.shem
            ) {
                return true;
            }
        }
        if (agla?.motsaremBrofelemSofe?.length !== motsaremBrofelemSofe?.length) {
            return true;
        }
        for (let index = 0; index < agla?.motsaremBrofelemSofe?.length; index++) {
            if ((agla?.motsaremBrofelemSofe[index]?.kmot + agla?.motsaremBrofelemSofe[index]?.kmotYdnet) !== (motsaremBrofelemSofe[index]?.kmot + motsaremBrofelemSofe[index]?.kmotYdnet) ||
                agla?.motsaremBrofelemSofe[index]?.shem !== motsaremBrofelemSofe[index]?.shem
            ) {
                return true;
            }
        }
        return false;
    }
    const formatNumberWithCommas = (num) => {
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    function getDigitsAfterDot(number) {
        const numberStr = number.toString();
        const dotIndex = numberStr.indexOf('.');
        if (dotIndex === -1) {
            return '';
        }
        const digitsAfterDot = numberStr.substring(dotIndex + 1);
        return digitsAfterDot;
    }
    function GetShemMotsarCategoryBret(shem) {
        for (let index = 0; index < mlae.length; index++) {
            if (mlae[index].shem === shem) {
                return mlae[index].categoryMotsar;
            }
        }
        return null;
    }
    const GetZmanAbodaMotsar = (val) => {
        for (let index = 0; index < category.length; index++) {
            for (let index1 = 0; index1 < category[index].motsarem.length; index1++) {
                if (category[index].motsarem[index1].sog === val) {
                    return category[index].motsarem[index1].zmanAboda;
                }
            }
        }
    }
    const scrollToElement = (val) => {
        if (refggg.current) {
            refggg.current.scrollTo({
                top: val.offsetTop - 500,
                behavior: 'smooth'
            });
            val.classList?.add('opacity-50');
            setTimeout(() => {
                val.classList?.remove('opacity-50');
            }, 900);
        }
    };
    const bdekatShmeratTfaol = () => {
        if (sogAskaAgla) {
            if ((BdekatMtsavem() !== sogBaola) || BdekatHeshtnotKmotmotsarem()) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if (BdekatMtsavem()) {
                return false;
            }
            else {
                return true;
            }
        }
    }





    const GetHodaaMatemaLmlae = (MaxMlae, NtonemMekorem, index, kmotNokhhet, shemNokhhe, sogBaolaa) => {
        if (sogBaolaa === 'C') {
            if ((MaxMlae + NtonemMekorem[index]?.kmot) > kmotNokhhet) {
                return <div className="text-white bg-success pt-1 pb-1 pr-2 pl-2 rounded-3xl">נשאר במלאי : {(MaxMlae + NtonemMekorem[index]?.kmot) - kmotNokhhet}</div>
            }
            else {
                return <div className="text-white bg-warning pt-1 pb-1 pr-2 pl-2 rounded-3xl">כמות אחרונה</div>
            }
        }
        else {
            if (MaxMlae > kmotNokhhet) {
                return <div className="text-white bg-success pt-1 pb-1 pr-2 pl-2 rounded-3xl">נשאר במלאי : {MaxMlae - kmotNokhhet}</div>
            }
            else if (MaxMlae < kmotNokhhet) {
                return <div className="text-white bg-danger pt-1 pb-1 pr-2 pl-2 rounded-3xl">חורג מהמלאי : {kmotNokhhet - MaxMlae}-</div>
            }
            else {
                return <div className="text-white bg-warning pt-1 pb-1 pr-2 pl-2 rounded-3xl">כמות אחרונה</div>
            }
        }
    }
    const GetHodaaMatemaLmlaeBrofelem = (MaxMlae, NtonemMekorem, index, kmotNokhhet, sogBaolaa, ydne) => {
        let isKmotYdne = ((ydne || 0) + kmotNokhhet);
        if (sogBaolaa === 'C') {
            if ((MaxMlae + NtonemMekorem[index]?.kmot) > isKmotYdne) {
                return <div className="text-white bg-success pt-1 pb-1 pr-2 pl-2 rounded-3xl">נשאר במלאי : {(MaxMlae + NtonemMekorem[index]?.kmot) - isKmotYdne}</div>
            }
            else {
                return <div className="text-white bg-warning pt-1 pb-1 pr-2 pl-2 rounded-3xl">כמות אחרונה</div>
            }
        }
        else {
            if (MaxMlae > isKmotYdne) {
                return <div className="text-white bg-success pt-1 pb-1 pr-2 pl-2 rounded-3xl">נשאר במלאי : {MaxMlae - isKmotYdne}</div>
            }
            else if (MaxMlae < isKmotYdne) {
                return <div className="text-white bg-danger pt-1 pb-1 pr-2 pl-2 rounded-3xl">חורג מהמלאי : {isKmotYdne - MaxMlae}-</div>
            }
            else {
                return <div className="text-white bg-warning pt-1 pb-1 pr-2 pl-2 rounded-3xl">כמות אחרונה</div>
            }
        }
    }
    const GetSakhHkolBrfelemTokhn = (Tokhn) => {
        let sum = 0;
        for (let index = 0; index < Tokhn.length; index++) {
            sum += Tokhn[index].kmot;
        }
        return sum;
    }
    const GetMotsarBrofelTokhn = (shem) => {
        let newArray = [];
        for (let index = 0; index < motsaremBrofelem.length; index++) {
            if (motsaremBrofelem[index].shem === shem) {
                newArray.push({ ...motsaremBrofelem[index], index });
            }
        }
        return newArray;
    }
    const renderDropdown = (index, isElse, item) => (
        <Dropdown dir="rtl">
            <DropdownTrigger>
                <Button color={item?.shem ? 'primary' : 'default'} variant='flat' isDisabled={isElse} size="xs" className='m-2'>
                    {item?.shem || 'בחר פריט'}<MdKeyboardArrowDown className="text-[20px]" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Multiple selection example"
                variant="flat"
                closeOnSelect={true}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={item?.shem}
                onSelectionChange={(val) => {
                    handleInputChange(isElse, index, val.currentKey, 'shem');
                    handleInputChange(isElse, index, item?.kmot, 'kmot');
                    handleInputChange(isElse, index, item?.kmot * GetBrtemMotsarMlae(item?.remez, val.currentKey).alot, 'mher')
                }
                }
            >
                {GetBrtemMotsarMlae(item?.remez).arrayResualt.map((option) => (
                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
    const shehzorMotsarBrofel = (val, motsBrofs) => {
        for (let index = 0; index < motsBrofs.length; index++) {
            if (motsBrofs[index].shem === val) {
                updateMotsaremBrofelem(index,
                    {
                        kmot: 0,
                        kmotYdnet: 0,
                        mher: 0,
                        shem: "בחר פריט",
                        remez: '',
                        message: '',
                        sogShem: ''
                    });
            }
        }
        let newArray = [];
        for (let index = 0; index < motsaremBrofelemSofe.length; index++) {
            if (motsaremBrofelemSofe[index].shem !== val) {
                newArray.push(motsaremBrofelemSofe[index]);
            }
        }
        setMotsaremBrofelemSofe(newArray);
    }
    const renderDropdownWithInputs = useCallback((item, shemSog, index, isElse, motsareem, sogBaolaa, Tokhn, ydneeee, motsBrofs) => (
        <div className="w-full">
            <div className="mt-5 w-full">
                <div className="w-full items-center flex justify-center">
                    {isElse && <MdCancel className="ml-20 text-xl text-danger cursor-pointer" onClick={() => shehzorMotsarBrofel(item?.shem, motsBrofs)} />}
                    {!isElse && item?.Ydne ?
                        <MdCancel className="ml-20 text-xl text-danger cursor-pointer" onClick={() => handleRemoveIndex(index)} />
                        : !isElse ? <FiPlusCircle className="ml-20 text-xl text-success cursor-pointer" onClick={() => {
                            setMafenemMotsarem(prev => {
                                const newMafenemMotsarem = [
                                    ...prev,
                                    {
                                        kmot: 0,
                                        kmotYdnet: 0,
                                        mher: 0,
                                        shem: "בחר פריט",
                                        remez: item?.remez,
                                        message: '',
                                        sogShem: shemSog,
                                        Ydne: true
                                    }
                                ];
                                return GetSortedMafeneMotsarem(newMafenemMotsarem);
                            });
                        }} /> : null}
                    <div className="w-[200px] rounded-xl flex items-center">
                        <div className="group relative z-20">
                            <Image width={70} alt="none" src={GetTmonatHelek(item?.remez, GetBrtemMotsarMlae(item?.remez, item?.shem).msbar)} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                        </div>
                        <div className="mr-2">{shemSog}</div>
                    </div>
                    <div className="w-[150px] mr-5 ml-5">{renderDropdown(index, isElse, item)}</div>
                </div>

                <div className="w-full flex justify-between items-center flex-wrap mt-2 pr-4 pl-4">
                    <div className="max-w-[400px] w-full flex items-center">
                        <div className="w-[50px]">
                            {
                                isElse &&
                                <div className="relative flex items-center z-40">
                                    <div className="group relative">
                                        <HiMiniQuestionMarkCircle className="text-2xl text-warning" />
                                        <div className="absolute bottom-0 flex-col items-center hidden mb-10 group-hover:flex shadow-2xl">
                                            <span className="relative w-[200px] border-1 border-primary z-10 p-2 text-xs leading-none whitespace-no-wrap bg-white rounded-md">
                                                {
                                                    item?.kmotYdnet !== 0 ?
                                                        <div className="text-danger font-bold text-center m-1 mb-2 text-[13px] tracking-widest">כמות ידנית</div>
                                                        :
                                                        <div className="text-success font-bold text-center m-1 mb-2 text-[13px] tracking-widest">כמות מחושבת</div>
                                                }
                                                {
                                                    Tokhn?.map((brofel, index) => {
                                                        return <div key={index}>
                                                            {
                                                                index !== 0 && <Divider className="mt-1 mb-1" />
                                                            }
                                                            <div className="w-full flex justify-between p-1 items-center">
                                                                <div className="">{brofel?.sogShem}</div>
                                                                {
                                                                    item?.kmotYdnet !== 0 ?
                                                                        <div className="flex items-center text-danger"><div className="w-[20px] text-left">{brofel?.kmot}</div></div>
                                                                        :
                                                                        <div className="text-success">{brofel?.kmot}</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                                {
                                                    item?.kmotYdnet !== 0 &&
                                                    <div>
                                                        <Divider className="mt-1 mb-1" />
                                                        <div className="w-full flex justify-between p-1 items-center">
                                                            <div className="">ידני</div>
                                                            <div className="flex items-center text-danger"><div dir="ltr" className="w-[20px] text-left">{(item?.kmot + item?.kmotYdnet) - GetSakhHkolBrfelemTokhn(Tokhn)}</div></div>
                                                        </div>
                                                        <div className="w-full flex justify-center">
                                                            <MdKeyboardArrowDown className="text-[20px]" />
                                                        </div>
                                                    </div>
                                                }

                                            </span>

                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="w-full flex items-center mt-3">
                            {
                                isElse ?
                                    <Input
                                        type="number"
                                        size="sm"
                                        className="max-w-[100px]"
                                        color={
                                            item?.kmot <= GetBrtemMotsarMlae(item?.remez, item?.shem).kmot && item?.message
                                                ?
                                                'primary'
                                                :
                                                item?.message && (sogBaolaa !== 'C') ? "danger" : item?.kmot > 0 ? "primary" : 'default'
                                        }
                                        onValueChange={(val) => {
                                            handleInputChange(isElse, index, '', 'message');
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
                                        value={(item?.kmot + item.kmotYdnet) || ""}
                                        label="כמות"
                                    />
                                    :
                                    <Input
                                        type="number"
                                        size="sm"
                                        className="max-w-[100px]"
                                        color={
                                            item?.kmot <= GetBrtemMotsarMlae(item?.remez, item?.shem).kmot && item?.message
                                                ?
                                                'primary'
                                                :
                                                item?.message && (sogBaolaa !== 'C') ? "danger" : item?.kmot > 0 ? "primary" : 'default'
                                        }
                                        onValueChange={(val) => {
                                            handleInputChange(isElse, index, '', 'message');
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
                                        value={item?.kmot || ""}
                                        label="כמות"
                                    />

                            }
                            {
                                item?.shem &&
                                <div className={`text-[13px] mr-2`}>
                                    {
                                        isElse ?
                                            GetHodaaMatemaLmlaeBrofelem(GetBrtemMotsarMlae(item?.remez, item?.shem)?.kmot, motsareem, index, item?.kmot, sogBaolaa, ydneeee)
                                            :
                                            GetHodaaMatemaLmlae(GetBrtemMotsarMlae(item?.remez, item?.shem)?.kmot, motsareem, index, item?.kmot, item?.shem, sogBaolaa)
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className="max-w-[100px] ml-5 mr-11 mt-3">
                        <Input
                            isReadOnly
                            value={item?.mher ? `₪${item?.mher}` : ''}
                            size="sm"
                            className="max-w-[100px]"
                            color={
                                item?.kmot <= GetBrtemMotsarMlae(item?.remez, item?.shem).kmot && item?.message
                                    ?
                                    'primary'
                                    :
                                    item?.message && (sogBaolaa !== 'C') ? "danger" : item?.kmot > 0 ? "primary" : 'default'
                            }
                            label="מחיר"
                        />
                    </div>
                </div>

            </div>
        </div>
    ), [GetBrtemMotsarMlae]);

    const handleRemoveIndex = (indexToRemove) => {
        setMafenemMotsarem(prevMafenemMotsarem => {
            if (!Array.isArray(prevMafenemMotsarem)) {
                return prevMafenemMotsarem;
            }

            // Filter out the item by index
            const updatedMotsarem = prevMafenemMotsarem.filter((_, index) => index !== indexToRemove);

            // Sort the remaining items
            return GetSortedMafeneMotsarem(updatedMotsarem);
        });
    };








    useEffect(() => {
        let remzemd = sogAgla === 'פתוחה' ? ['B7', 'B2', 'B9', 'B8'] : [];
        if (rohf && aorkh) {
            setMotsaremLhatseg((prevItems) => [...prevItems, ...remzemd]);
            let newArray = [];
            for (let index = 0; index < mafenemMotsarem?.length; index++) {
                if (MathXx1(mafenemMotsarem[index]?.remez)) {
                    newArray.push({
                        kmot: parseFloat(MathXx1(mafenemMotsarem[index]?.remez)),
                        mher: parseFloat(MathXx1(mafenemMotsarem[index]?.remez)) * GetBrtemMotsarMlae(mafenemMotsarem[index]?.remez, mafenemMotsarem[index]?.shem).alot,
                        shem: mafenemMotsarem[index]?.shem,
                        remez: mafenemMotsarem[index]?.remez,
                        message: mafenemMotsarem[index]?.message
                    })
                }
                else {
                    newArray.push(mafenemMotsarem[index]);
                }
            }
            setMafenemMotsarem(GetSortedMafeneMotsarem(newArray));
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => !remzemd.includes(item)));
            setShemTokhnet('');
            setTokhnetNokhhet(null);
        }
    }, [aorkh, rohf]);
    useEffect(() => {
        if (agla?.msbar) {
            setSogAgla(agla?.sogAgla);
            setAorkh(agla?.mafenem?.aorkh);
            setRohf(agla?.mafenem?.rohf);
            setMsbarTsrem(agla?.mafenem?.msbarTsrem);
            setAemBlamem(agla?.mafenem?.aemBlamem);
            setSogGlgalem(agla?.mafenem?.sogGlgalem);
            setTsmegSber(agla?.mafenem?.aemTsmegSber);
            setHlokaTvah(agla?.mafenem?.hlokaTvah);
            setHlokaMsbarBrofelem(agla?.mafenem?.hlokaMsbarBrofelem);
            setAorkhBrofel(agla?.mafenem?.aorkhBrofel);
            setTvahBrofel(agla?.mafenem?.tvahBrofel);
            setAorkhSM(agla?.mafenem?.aorkh * 100);
            setRohfSM(agla?.mafenem?.rohf * 100);
            setAorkhBrofelSM(agla?.mafenem?.aorkhBrofel * 100);
            setAorkhRmbaMsgertRmbaSM(agla?.mafenem?.aorkhRmbaMsgertRmba * 100);
            setGobahSolamSM(agla?.mafenem?.gobahSolam * 100);
            setMsbarBrofelem(agla?.mafenem?.msbarBrofelem);
            setHelkBetBnmet(agla?.mafenem?.aemHelkBet);
            setMsbarBrofelmBretA(agla?.mafenem?.msbarBrofelmBretA);
            setAemRmbaAoRgel(agla?.mafenem?.deltAemRmbaAoRgel);
            setAorkhRmbaMsgertRmba(agla?.mafenem?.aorkhRmbaMsgertRmba);
            setTvahHlokatRmba(agla?.mafenem?.tvahHlokatRmba);
            setMsbarBrofelemHlokatRmba(agla?.mafenem?.msbarBrofelemHlokatRmba);
            setTosftVnel(agla?.mafenem?.tosftVnel);
            setSolam(agla?.mafenem?.solam);
            setAemDelet(agla?.mafenem?.aemDelet);
            setGobahSolam(agla?.mafenem?.gobahSolam);
            setTosefetReshet(agla?.mafenem?.tosefetReshet);
            setTvahAofkeSolam(agla?.mafenem?.tvahAofkeSolam);
            setMsbarBrofelemAofkeSolam(agla?.mafenem?.msbarBrofelemAofkeSolam);
            setTvahAnkheSolam(agla?.mafenem?.tvahAnkheSolam);
            setMsbarBrofelemAnkhe(agla?.mafenem?.msbarBrofelemAnkhe);
            setAemArgazKlem(agla?.mafenem?.aemArgazKlem);
            setAemBashbashol(agla?.mafenem?.aemBashbashol);
            setAemKafRetom(agla?.mafenem?.aemKafRetom);
            setAemMekhalMaym(agla?.mafenem?.aemMekhalMaym);
            setAemReglHnea(agla?.mafenem?.aemReglHnea);
            setAemTseba(agla?.mafenem?.aemTseba);
            setMherKlale(agla?.mherMkhera);
            setLkoh(agla?.msbarLkoh);
            setHkhnsotHomreGlem(agla?.tmher?.hotsaotHomreGlem);
            setHotsaotSkhar(agla?.tmher?.hotsaotSkhar);
            setHotsaotAkefot(agla?.tmher?.hotsotAkefot);
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
            setHnha(agla?.mafenem?.hnha);
            setHshhyatYetsorZman(getDifferenceBetweenDatetimes(agla?.zmnem?.zmanThelatYetsor || '2024-12-25T00:00:00.000Z', agla?.zmnem?.zmanHasheatYetsor || '2024-12-25T00:00:00.000Z'));
            setConstantDate(agla?.zmnem?.zmanThelatYetsor || '2024-12-25T00:00:00.000Z');

            setMotsaremBrofelemSofe(agla?.motsaremBrofelemSofe);
            setMafenemMotsarem(agla?.newMafeneMotsarem);
            setEntries(agla?.entries || [{ category: '', sogMotsar: '', shemMotsar: '', remez: '', message: '' }]);
            setMotsaremBroflem(agla?.motsaremBrofelem);
        }
    }, [agla]);
    useEffect(() => {
        const prevRemzem = prevRemzemRef.current;
        prevRemzemRef.current = Remzem;
        if (prevRemzem && JSON.stringify(prevRemzem) === JSON.stringify(Remzem)) {
            return;
        }
        if (Remzem.length) {
            const initialMafenemMotsarem = Remzem.map(remez => ({
                kmot: 0,
                mher: 0,
                shem: '',
                remez: remez,
                message: ''
            }));
            setMafenemMotsarem(GetSortedMafeneMotsarem(initialMafenemMotsarem));
        }
    }, [Remzem]);
    useEffect(() => {
        const updateMotsaremLhatseg = (itemsToAdd, itemsToRemove) => {
            setMotsaremLhatseg((prevItems) => {
                const filteredItems = prevItems.filter(item => !itemsToRemove.includes(item));
                return [...filteredItems, ...itemsToAdd];
            });
        };
        if (agla?.sogAska === 'ייצור' || sogAskaa === 'ייצור') {
            const itemsToAdd = ['F4', 'F5', 'F6', 'F7', 'F3', 'E1', 'E2', 'E3', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'A8'];
            const itemsToRemove = [...itemsToAdd];
            console.log(1232222222222);
            console.log(sogAgla);
            if (sogAgla) {
                updateMotsaremLhatseg(itemsToAdd, []);
            } else {
                updateMotsaremLhatseg([], itemsToRemove);
            }
        } else if (agla?.sogAska === 'הרכבת וו' || sogAskaa === 'הרכבת וו') {
            const itemsToAdd = ['J1'];
            const itemsToRemove = ['J1'];
            updateMotsaremLhatseg(itemsToAdd, []);
        }
        else if (agla?.sogAska === 'תיקון' || sogAskaa === 'תיקון') {
            const itemsToAdd = [];
            const itemsToRemove = [];
            updateMotsaremLhatseg(itemsToAdd, []);
        }
    }, [show, sogAgla]);
    useEffect(() => {
        if (aemTseba) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'D1']);
            scrollToElement(MotsaremRefs.current[GetIndexMotsar('D1')].current);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'D1'));
        }
    }, [aemTseba]);
    useEffect(() => {
        if (aemBashbashol) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A4', 'C11']);
            scrollToElement(MotsaremRefs.current[GetIndexMotsar('A4')].current);
            handleInputChange(false, GetIndexMotsar('A4'), 1, 'kmot');
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => ![
                'A4', 'C11'
            ].includes(item)));
            handleInputChange(false, GetIndexMotsar('A4'), 0, 'kmot');
        }
    }, [aemBashbashol]);
    useEffect(() => {
        if (aemKafRetom) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A5']);
            scrollToElement(MotsaremRefs.current[GetIndexMotsar('A5')].current);
            handleInputChange(false, GetIndexMotsar('A5'), 1, 'kmot');
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A5'));
            handleInputChange(false, GetIndexMotsar('A5'), 0, 'kmot');
        }
    }, [aemKafRetom]);
    useEffect(() => {
        if (aemMekhalMaym) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A6']);
            scrollToElement(MotsaremRefs.current[GetIndexMotsar('A6')].current);
            handleInputChange(false, GetIndexMotsar('A6'), 1, 'kmot');
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A6'));
            handleInputChange(false, GetIndexMotsar('A6'), 0, 'kmot');
        }
    }, [aemMekhalMaym]);
    useEffect(() => {
        if (aemArgazKlem) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A7']);
            scrollToElement(MotsaremRefs.current[GetIndexMotsar('A7')].current);
            handleInputChange(false, GetIndexMotsar('A7'), 1, 'kmot');
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A7'));
            handleInputChange(false, GetIndexMotsar('A7'), 0, 'kmot');
        }
    }, [aemArgazKlem]);
    useEffect(() => {
        if (aemReglHnea) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A9']);
            scrollToElement(MotsaremRefs.current[GetIndexMotsar('A9')].current);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A9'));
        }
    }, [aemReglHnea]);
    useEffect(() => {
        if (aemBlamem) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'F2']);
            scrollToElement(MotsaremRefs.current[GetIndexMotsar('F2')].current);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'F2'));
        }
    }, [aemBlamem]);
    useEffect(() => {
        if (tsmegSber) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'C1']);
            scrollToElement(MotsaremRefs.current[GetIndexMotsar('C1')].current);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'C1'));
        }
    }, [tsmegSber]);
    useEffect(() => {
        if (tosefetReshet) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'B3']);
            scrollToElement(MotsaremRefs.current[GetIndexMotsar('B3')].current);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'B3'));
        }
    }, [tosefetReshet]);
    useEffect(() => {
        if (parseInt(msbarTsrem) === 1) {
            scrollToElement(MotsaremRefs.current[GetIndexMotsar('A1')].current);
            RemoveMotsarToNull('A2');
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A2'));
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A1', 'A10', 'A3']);
        }
        else if (parseInt(msbarTsrem) === 2) {
            scrollToElement(MotsaremRefs.current[GetIndexMotsar('A2')].current);
            RemoveMotsarToNull('A1');
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A1'));
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A2', 'A10', 'A3']);
        }
    }, [msbarTsrem]);
    useEffect(() => {
        if (parseInt(msbarTsrem) === 1) {
            handleInputChange(false, GetIndexMotsar('A1'), 2, 'kmot'); // ktef 1;
            handleInputChange(false, GetIndexMotsar('A10'), 1, 'kmot'); // tser;
            handleInputChange(false, GetIndexMotsar('A3'), 2, 'kmot'); // tsmeg
        }
        else if (parseInt(msbarTsrem) === 2) {
            handleInputChange(false, GetIndexMotsar('A2'), 2, 'kmot'); // ktef 2;
            handleInputChange(false, GetIndexMotsar('A10'), 2, 'kmot'); // tser
            handleInputChange(false, GetIndexMotsar('A3'), 4, 'kmot'); // tsmeg
        }
    }, [msbarTsrem]);
    useEffect(() => {
        if (sogAskaAgla === 'תיקון') {
            for (let index = 0; index < mafenemMotsarem?.length; index++) {
                if (mafenemMotsarem[index].shem) {
                    setMotsaremLhatseg((prevItems) => [...prevItems, mafenemMotsarem[index].remez]);
                }
            }
        }
    }, [sogAskaAgla, agla, lkoh]);
    useEffect(() => {
        let arrayRmezemEnteris = [];
        let resAeshor = false;
        for (let index = 0; index < entries?.length; index++) {
            if (entries[index].remez == '') {
                resAeshor = true;
            }
        }
        if (!resAeshor) {
            if (sogAskaa === 'ייצור' || agla?.sogAska === 'ייצור') {
                for (let index = 0; index < entries?.length; index++) {
                    if (!motsaremLhatseg.includes(entries[index].remez)) {
                        arrayRmezemEnteris.push(entries[index].remez);
                    }
                }
                let newArrayRmezemEnteris = removeDuplicates(arrayRmezemEnteris);
                setMotsaremLhatseg((prevItems) => {
                    return [...prevItems, ...newArrayRmezemEnteris];
                });
            }
            else {
                for (let index = 0; index < entries?.length; index++) {
                    arrayRmezemEnteris.push(entries[index].remez);
                }
                let newArrayRmezemEnteris = removeDuplicates(arrayRmezemEnteris);
                setMotsaremLhatseg((prevItems) => {
                    let filteredItems = prevItems.filter(item => newArrayRmezemEnteris.includes(item));
                    return [...filteredItems, ...newArrayRmezemEnteris];
                });
            }
        }

    }, [entries]);
    useEffect(() => {
        if (tokhnetNokhhet?.sogAgla) {
            if (tokhnetNokhhet?.motsarem?.length) {
                let newArray = [];
                let arrayMotsaremTokhnet = tokhnetNokhhet.motsarem.map(motsar => motsar.remez);
                for (let index = 0; index < mafenemMotsarem.length; index++) {
                    if (!arrayMotsaremTokhnet.includes(mafenemMotsarem[index].remez)) {
                        newArray.push(mafenemMotsarem[index]);
                    }
                }
                for (let index = 0; index < tokhnetNokhhet?.motsarem.length; index++) {
                    if (tokhnetNokhhet?.motsarem[index].Ydne) {
                        newArray.push({
                            ...tokhnetNokhhet?.motsarem[index],
                            kmotYdnet: 0,
                            mher: parseFloat(tokhnetNokhhet?.motsarem[index].kmot) * parseFloat(GetBrtemMotsarMlae(tokhnetNokhhet?.motsarem[index].remez, tokhnetNokhhet?.motsarem[index].shem).alot),
                            message: '',
                        });
                    }
                    else {
                        newArray.push({
                            ...tokhnetNokhhet?.motsarem[index],
                            kmotYdnet: 0,
                            mher: parseFloat(tokhnetNokhhet?.motsarem[index].kmot) * parseFloat(GetBrtemMotsarMlae(tokhnetNokhhet?.motsarem[index].remez, tokhnetNokhhet?.motsarem[index].shem).alot),
                            message: '',
                        });
                    }
                }

                setMafenemMotsarem(GetSortedMafeneMotsarem(newArray));
            }
            setSogAgla(tokhnetNokhhet?.sogAgla);
            setHlokaTvah(tokhnetNokhhet?.mafenem?.hlokaTvah);
            setHlokaMsbarBrofelem(parseInt(Math.floor((aorkh / ((tokhnetNokhhet?.mafenem?.hlokaTvah) / 100)) - 1)));
            setTvahBrofel(tokhnetNokhhet?.mafenem?.tvahBrofel);
            setMsbarBrofelem(parseInt(Math.floor((aorkh / ((tokhnetNokhhet?.mafenem?.tvahBrofel) / 100)) - 1)));
            setTvahHlokatRmba(tokhnetNokhhet?.mafenem?.tvahHlokatRmba);
            setMsbarBrofelemHlokatRmba(parseInt(Math.floor((aorkhRmbaMsgertRmba / ((tokhnetNokhhet?.mafenem?.tvahHlokatRmba) / 100)) - 1)));
            setTvahAofkeSolam(tokhnetNokhhet?.mafenem?.tvahAofkeSolam);
            setMsbarBrofelemAofkeSolam(parseInt(Math.floor(((parseFloat(gobahSolam) - 0.4) / parseFloat(tokhnetNokhhet?.mafenem?.tvahAofkeSolam)) - 1)));
            setTvahAnkheSolam(tokhnetNokhhet?.mafenem?.tvahAnkheSolam);
            if ((tokhnetNokhhet?.mafenem?.solam) === 'רק קדמי') {
                setMsbarBrofelemAnkhe(parseInt(Math.floor(((parseFloat(rohf)) / (parseFloat(tokhnetNokhhet?.mafenem?.tvahAnkheSolam) / 100)) - 3)));
            }
            else if ((tokhnetNokhhet?.mafenem?.solam) === 'הכל' && (tokhnetNokhhet?.mafenem?.aemDelet)) {
                setMsbarBrofelemAnkhe(parseInt((Math.floor((parseFloat(rohf) / (parseFloat(tokhnetNokhhet?.mafenem?.tvahAnkheSolam) / 100)) - 1) * 2) + (Math.floor((((parseFloat(aorkh) / (parseFloat(tokhnetNokhhet?.mafenem?.tvahAnkheSolam) / 100)) - 1))) * 2)));
            }
            else {
                setMsbarBrofelemAnkhe(parseInt(Math.floor((parseFloat(rohf) / (parseFloat(tokhnetNokhhet?.mafenem?.tvahAnkheSolam) / 100)) - 1) + (Math.floor((((parseFloat(aorkh) / (parseFloat(tokhnetNokhhet?.mafenem?.tvahAnkheSolam) / 100)) - 1))) * 2)));
            }
            setAemArgazKlem(tokhnetNokhhet?.mafenem?.aemArgazKlem);
            setAemBashbashol(tokhnetNokhhet?.mafenem?.aemBashbashol);
            setAemBlamem(tokhnetNokhhet?.mafenem?.aemBlamem);
            setAemDelet(tokhnetNokhhet?.mafenem?.aemDelet);
            setAemKafRetom(tokhnetNokhhet?.mafenem?.aemKafRetom);
            setAemMekhalMaym(tokhnetNokhhet?.mafenem?.aemMekhalMaym);
            setAemReglHnea(tokhnetNokhhet?.mafenem?.aemReglHnea);
            setAemRmbaAoRgel(tokhnetNokhhet?.mafenem?.aemRmbaAoRgel);
            setAemTseba(tokhnetNokhhet?.mafenem?.aemTseba);
            setAorkhBrofel(tokhnetNokhhet?.mafenem?.aorkhBrofel);
            setHelkBetBnmet(tokhnetNokhhet?.mafenem?.helkBetBnmet);
            setMsbarTsrem(tokhnetNokhhet?.mafenem?.msbarTsrem);
            setSogGlgalem(tokhnetNokhhet?.mafenem?.sogGlgalem);
            setSolam(tokhnetNokhhet?.mafenem?.solam);
            setTosefetReshet(tokhnetNokhhet?.mafenem?.tosefetReshet);
            setTosftVnel(tokhnetNokhhet?.mafenem?.tosftVnel);
            setTsmegSber(tokhnetNokhhet?.mafenem?.tsmegSber);
        }
    }, [tokhnetNokhhet]);
    useEffect(() => {
        if (lkohMsbar || (agla && agla?.msbarLkoh)) {
            if (agla?.msbarLkoh) {
                console.log('123132222222222');
                console.log(agla?.msbarLkoh);
                console.log('123132222222222');
                const unsubscribe = useGetDataByConditionWithoutUseEffect(
                    'drags',
                    'idcustomer',
                    '==',
                    agla?.msbarLkoh,
                    result => {
                        console.log(result);
                        result.length && setAglot(result);
                    }
                );
                return () => {
                    if (unsubscribe) {
                        unsubscribe();
                    }
                };
            }
            else {
                const unsubscribe = useGetDataByConditionWithoutUseEffect(
                    'drags',
                    'idcustomer',
                    '==',
                    lkohMsbar,
                    result => {
                        result.length && setAglot(result);
                    }
                );
                return () => {
                    if (unsubscribe) {
                        unsubscribe();
                    }
                };
            }
        }
    }, [lkohMsbar, agla?.msbarLkoh]);

    console.log(aglot);
    useEffect(() => {
        console.log(123124);
        let sum = 0;
        let sumZmanAboda = 0;
        for (let index = 0; index < mafenemMotsarem?.length; index++) {
            if (mafenemMotsarem[index].kmot > 0) {
                sum += ((parseFloat(GetZmanAbodaMotsar(mafenemMotsarem[index].remez)) * parseFloat(mafenemMotsarem[index].kmot)) || 0);
            }
        }
        for (let index = 0; index < motsaremBrofelemSofe?.length; index++) {
            if (motsaremBrofelemSofe[index].kmot > 0) {
                sum += ((parseFloat(GetZmanAbodaMotsar(motsaremBrofelemSofe[index].remez)) * parseFloat(motsaremBrofelemSofe[index].kmot)) || 0);
            }
        }
        const hotsaotSkharYetsor = parseFloat(counterShaotAboda?.hotsaotSkharYetsor) || 0;
        const shaotKodmetYestsor = parseFloat(counterShaotAboda?.shaotKodmetYestsor) || 0;
        const hotsaotSkhar = parseFloat(counterShaotAboda?.hotsaotSkhar) || 0;
        const shaotKodmet = parseFloat(counterShaotAboda?.shaotKodmet) || 0;
        const skharRatio = hotsaotSkharYetsor / shaotKodmetYestsor;
        const hotsaotSkharValue = parseFloat((sum * (isNaN(skharRatio) ? 0 : skharRatio) / 60).toFixed(2));
        setHotsaotSkhar(hotsaotSkharValue);
        const akefotRatio = (hotsaotSkhar - hotsaotSkharYetsor) / (shaotKodmet - shaotKodmetYestsor);
        const hotsaotAkefotValue = parseFloat((sum * (isNaN(akefotRatio) ? 0 : akefotRatio) / 60).toFixed(2));
        setHotsaotAkefot(hotsaotAkefotValue);

        const total1 = motsaremBrofelemSofe?.reduce((acc, motsar) => {
            const parsed = parseFloat(motsar.mher);
            return !isNaN(parsed) ? acc + parsed : acc;
        }, 0);

        const total2 = mafenemMotsarem?.reduce((acc, motsar) => {
            const parsed = parseFloat(motsar.mher);
            return !isNaN(parsed) ? acc + parsed : acc;
        }, 0);
        setHkhnsotHomreGlem(total1 + total2);
    }, [mafenemMotsarem, motsaremBrofelemSofe]);
    useEffect(() => {
        if (agla) {
            setMotsaremBrofelemSofe(reduceArray(true));
        }
        else {
            setMotsaremBrofelemSofe(reduceArray());
        }
    }, [motsaremBrofelem]);



    function removeDuplicates(array) {
        return [...new Set(array)];
    }

    const GetCategoryMotsaremAhrem = () => {
        for (let index = 0; index < category.length; index++) {
            if (category[index].shem === 'מוצרים אחרים') {
                return category[index];
            }
        }
    }
    //motsarAher





    const GetSortedMafeneMotsarem = (array) => {
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
        if (aorkhSM) {
            setAorkh(aorkhSM / 100);
        }
    }, [aorkhSM]);

    useEffect(() => {
        if (rohfSM) {
            setRohf(rohfSM / 100);
        }
    }, [rohfSM]);

    useEffect(() => {
        if (aorkhBrofelSM) {
            setAorkhBrofel(aorkhBrofelSM / 100);
        }
    }, [aorkhBrofelSM]);

    useEffect(() => {
        if (aorkhRmbaMsgertRmbaSM) {
            setAorkhRmbaMsgertRmba(aorkhRmbaMsgertRmbaSM / 100);
        }
    }, [aorkhRmbaMsgertRmbaSM]);

    useEffect(() => {
        if (gobahSolamSM) {
            setGobahSolam(gobahSolamSM / 100);
        }
    }, [gobahSolamSM]);



    const drawerWidth = 400;

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
        ...(openTop && {
            marginTop: `${350}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,

    }));


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openTop, setOpenTop] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDrawerOpenTop = () => {
        setOpenTop(true);
    };

    const handleDrawerCloseTop = () => {
        setOpenTop(false);
    };

    

    return (!sogBaola && !sogAskaa) ? null : (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size={(sogBaola !== 'E') ? 'full' : "2xl"} isOpen={show} onClose={() => {
            ResetAll();
            disable();
        }}>
            <ModalContent>
                <>
                    <ModalBody className="border-b-2">

                        <div className={`w-full ${(sogBaola !== 'E') ? 'h-screen' : "2xl"}`}>
                            {
                                errorMessage &&
                                <div className="flex justify-center">
                                    <div className="absolute w-full bg-black bg-opacity-20 backdrop-blur-[2px] h-full z-50">
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
                                </div>
                            }
                            <ModalAddProductCategory category={GetCategoryMotsaremAhrem()} mlae={mlae} motsarAher show={showModalAddMotsarAher} disable={() => setShowModalAddMotsarAher(false)} />
                            {
                                motsaremBrofelem?.length > 0 && ((sogBaola === 'A' || sogBaola === 'B' || sogBaola === 'C') || (sogAskaa && sogAskaa !== '')) &&
                                <div className="h-full w-full flex">






                                    <Box sx={{ position: 'absolute', height: '30px' }}>
                                        <CssBaseline />

                                        <AppBar className="mr-" sx={{ backgroundColor: '#ffffff', color: 'black' }} open={open}>
                                            <Toolbar>
                                                <div className="flex justify-between items-center w-full">
                                                    <div className="flex justify-around items-center w-full ml-10">
                                                        <Button color="primary" variant='flat' isDisabled={open} onClick={handleDrawerOpen}>
                                                            <div className="flex items-center font-bold text-lg"><FaHandHoldingDollar className="mr-3 text-xl" />תמחיר</div>
                                                        </Button>


                                                        <Button color="primary" variant='flat' isDisabled={openTop} onClick={handleDrawerOpenTop}>
                                                            <div className="flex items-center font-bold text-lg"><BsListCheck className="mr-3 text-2xl font-bold" />שלבי עבודה</div>
                                                        </Button>
                                                    </div>


                                                </div>


                                            </Toolbar>
                                        </AppBar>

                                        <Drawer
                                            color='default'
                                            sx={{
                                                width: '100%',
                                                height: '350px',
                                                flexShrink: 0,
                                                '& .MuiDrawer-paper': {
                                                    backgroundColor: '#ffffff',
                                                    width: '100%',
                                                    height: '350px',
                                                    boxSizing: 'border-box',
                                                },
                                            }}
                                            variant="persistent"
                                            anchor="top"
                                            open={openTop}
                                        >
                                            <DrawerHeader>
                                                <div className="flex justify-end items-center w-full">
                                                    <Button onClick={handleDrawerCloseTop} color="danger" variant='flat' className="mr-5"><CgClose className="text-gray text-xl" />סגירה</Button>
                                                </div>
                                            </DrawerHeader>
                                            <List>
                                                <ListItem>
                                                    <div dir="rtl" className={`flex w-full h-full justify-around items-center ${open && 'ml-[400px]'}`}>
                                                        {
                                                            BdekatMtsavem() === 'A' ?
                                                                <div className="rounded-xl min-w-[90px]">
                                                                    <Divider className="bg-primary h-[1px]" />
                                                                    <div className="tracking-widest w-full text-black font-extrabold text-2xl p-1 mb-3 text-center transform transition-transform hover:scale-105 flex items-center">
                                                                        <div className="w-full">
                                                                            <div className="text-center w-full text-primary mb-3">הצעה</div>
                                                                            <div className="flex justify-center w-full">
                                                                                <Comment
                                                                                    visible={true}
                                                                                    height="80"
                                                                                    width="80"
                                                                                    ariaLabel="comment-loading"
                                                                                    wrapperStyle={{}}
                                                                                    wrapperClass="comment-wrapper"
                                                                                    color="white"
                                                                                    backgroundColor="#3b82f6"
                                                                                />
                                                                            </div>
                                                                            <div className="text-center w-full text-primary mt-3">שלב : 1</div>
                                                                        </div>
                                                                    </div>
                                                                    <Divider className="bg-primary h-[1px]" />
                                                                </div>
                                                                :
                                                                BdekatMtsavem() === 'B' ?
                                                                    <div className="rounded-xl min-w-[90px]">
                                                                        <Divider className="bg-primary h-[1px]" />
                                                                        <div className="h-full w-full flex items-center tracking-widest text-black font-extrabold text-2xl p-1 mb-3 text-center transform transition-transform hover:scale-105">
                                                                            <div className="w-full">
                                                                                <div className="text-center w-full text-primary mb-3">המתנה</div>
                                                                                <div className="flex justify-center w-full">
                                                                                    <Hourglass
                                                                                        visible={true}
                                                                                        height="80"
                                                                                        width="80"
                                                                                        ariaLabel="hourglass-loading"
                                                                                        wrapperStyle={{}}
                                                                                        wrapperClass=""
                                                                                        color='#3b82f6'
                                                                                        backgroundColor="#3b82f6"
                                                                                    />
                                                                                </div>
                                                                                <div className="text-center w-full text-primary mt-3">שלב : 2</div>
                                                                            </div>
                                                                        </div>
                                                                        <Divider className="bg-primary h-[1px]" />
                                                                    </div>
                                                                    :
                                                                    BdekatMtsavem() === 'C' ?
                                                                        <div className="rounded-xl min-w-[90px]">
                                                                            <Divider className="bg-primary h-[1px]" />
                                                                            <div className="h-full w-full tracking-widest text-black font-extrabold text-2xl p-1 mb-3 text-center transform transition-transform hover:scale-105 flex items-center">
                                                                                <div className="w-full">
                                                                                    <div className="text-center w-full text-primary mb-3">ייצור</div>
                                                                                    <div className="flex justify-center w-full">
                                                                                        <ThreeCircles
                                                                                            visible={true}
                                                                                            height="80"
                                                                                            width="80"
                                                                                            color="#3b82f6"
                                                                                            ariaLabel="three-circles-loading"
                                                                                            wrapperStyle={{}}
                                                                                            wrapperClass=""
                                                                                        />
                                                                                    </div>
                                                                                    <div className="text-center w-full text-primary mt-3">שלב : 3</div>
                                                                                </div>
                                                                            </div>
                                                                            <Divider className="bg-primary h-[1px]" />
                                                                        </div>
                                                                        :
                                                                        BdekatMtsavem() === 'D' ?
                                                                            <div className="rounded-xl min-w-[90px]">
                                                                                <Divider className="bg-primary h-[1px]" />
                                                                                <div className="h-full w-full tracking-widest text-black font-extrabold text-2xl p-1 mb-3 text-center transform transition-transform hover:scale-105 flex items-center">
                                                                                    <div className="w-full">
                                                                                        <div className="text-center w-full text-primary mb-3">סיום</div>
                                                                                        <div className="flex justify-center w-full">
                                                                                            <Puff
                                                                                                visible={true}
                                                                                                height="80"
                                                                                                width="80"
                                                                                                color="#3b82f6"
                                                                                                ariaLabel="three-circles-loading"
                                                                                                wrapperStyle={{}}
                                                                                                wrapperClass=""
                                                                                            />
                                                                                        </div>
                                                                                        <div className="text-center w-full text-primary mt-3">שלב : 4</div>
                                                                                    </div>
                                                                                </div>
                                                                                <Divider className="bg-primary h-[1px]" />
                                                                            </div>
                                                                            :
                                                                            <div className="rounded-xl min-w-[90px]">
                                                                                <Divider className="bg-primary h-[1px]" />
                                                                                <div className="h-full w-full tracking-widest text-black font-extrabold text-2xl p-1 mb-3 text-center transform transition-transform hover:scale-105 flex items-center">
                                                                                    <div className="w-full">
                                                                                        <div className="text-center w-full text-primary mb-3"></div>
                                                                                        <div className="flex justify-center w-full">
                                                                                            <RotatingLines
                                                                                                visible={true}
                                                                                                height="80"
                                                                                                width="80"
                                                                                                strokeColor="#3b82f6"
                                                                                                strokeWidth="5"
                                                                                                animationDuration="0.75"
                                                                                                ariaLabel="rotating-lines-loading"
                                                                                                wrapperStyle={{}}
                                                                                                wrapperClass=""
                                                                                            />
                                                                                        </div>
                                                                                        <div className="text-center w-full text-primary mt-3">שלב : 0</div>
                                                                                    </div>
                                                                                </div>
                                                                                <Divider className="bg-primary h-[1px]" />
                                                                            </div>
                                                        }
                                                        <Divider className="w-[1px] h-[200px]" />
                                                        <div className="w-full max-w-[250px]">
                                                            <div className="flex justify-around">
                                                                <div>לקוח</div>
                                                                {
                                                                    lkoh && hskmatLkoh ?
                                                                        <FaCheckDouble className="text-3xl text-success" />
                                                                        :
                                                                        lkoh || hskmatLkoh ?
                                                                            <FaCheck className="text-3xl text-warning" />
                                                                            :
                                                                            <MdOutlineCheckBoxOutlineBlank className="text-3xl text-gray-500" />

                                                                }
                                                            </div>
                                                            <div className="h-[200px]">
                                                                <Divider className="mt-2 mb-2" />
                                                                <div className="flex justify-center">
                                                                    {
                                                                        agla?.msbarLkoh ?
                                                                                <Input size="sm" color="primary" className="max-w-[200px]" isReadOnly label="לקןח" value={lkohTfaol?.name} />
                                                                                :
                                                                                <div className="flex items-center">
                                                                                    <Autocomplete
                                                                                        label="בחר לקוח"
                                                                                        className="max-w-[200px]"
                                                                                        color="primary"
                                                                                        size="sm"
                                                                                        defaultItems={lkhot}
                                                                                        onSelectionChange={setLkoh}
                                                                                        onInputChange={setLkoh}
                                                                                    >
                                                                                        {
                                                                                            lkhot.map((lko, index) => (
                                                                                                <AutocompleteItem onClick={() => { setLkohMsbar(lko.idnum); setHskmatLkoh(false); }} className='text-right' key={lko?.name} value={lko?.name}>
                                                                                                    {lko?.name}
                                                                                                </AutocompleteItem>
                                                                                            ))
                                                                                        }
                                                                                    </Autocomplete>


                                                                                    <Button size="sm" className="mr-2" onClick={() => { router.push('/activion'); }}>הוספה</Button>
                                                                                </div>
                                                                        }

                                                                    </div>
                                                                    <Divider className="mt-2 mb-2" />
                                                                    <div className="flex justify-center">
                                                                    <Switch isSelected={hskmatLkoh} isReadOnly={agla?.thlkhem?.hskmatLkwah || !lkoh} defaultSelected={agla?.thlkhem?.hskmatLkwah} value={hskmatLkoh} onValueChange={(val) => setHskmatLkoh(val)}>
                                                                        <div className="mr-2">הסכמת לקוח</div>
                                                                    </Switch>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <Divider className="w-[1px] h-[200px]" />
                                                        <div className="w-full max-w-[250px]">
                                                            <div className="flex justify-around">
                                                                <div>מחיר</div>
                                                                {
                                                                    mherKlale && kveatMher ?
                                                                        <FaCheckDouble className="text-3xl text-success" />
                                                                        :
                                                                        mherKlale || kveatMher ?
                                                                            <FaCheck className="text-3xl text-warning" />
                                                                            :
                                                                            <MdOutlineCheckBoxOutlineBlank className="text-3xl text-gray-500" />

                                                                }
                                                            </div>
                                                            <div className="h-[200px]">
                                                                <Divider className="mt-2 mb-2" />
                                                                <div className="flex justify-center">
                                                                    <div className="flex items-center">
                                                                        <div className="min-w-[100px]">מחיר השוק</div>
                                                                        <Input isReadOnly={agla?.mherMkhera} size="xs" type="number" value={mherKlale || ''} onValueChange={(val) => {
                                                                            setMherKlale(val);
                                                                            if (!val) {
                                                                                setKveatMher(false);
                                                                            }
                                                                        }} color="primary" className="max-w-[150px]" />
                                                                    </div>
                                                                </div>
                                                                <Divider className="mt-2 mb-2" />
                                                                <div className="flex justify-center">
                                                                    <div className="flex items-center">
                                                                        <div className="min-w-[100px]">הנחה</div>
                                                                        <Input size="xs" type="number" value={hnha || ''} onValueChange={(val) => setHnha(Math.min(val, mherKlale))} color="primary" className="max-w-[150px]" />
                                                                    </div>
                                                                </div>
                                                                <Divider className="mt-2 mb-2" />
                                                                <div className="flex justify-center">
                                                                    <Switch isSelected={kveatMher} isReadOnly={agla?.thlkhem?.kveatMher || !mherKlale || (sogAskaa || sogAskaAgla) === 'ייצור' ? (!mherKlale || !hskmatLkoh || !msbarTsrem || !sogGlgalem || !aorkhBrofel || !msbarBrofelem || !aemRmbaAoRgel)
                                                                        : (sogAskaa || sogAskaAgla) === 'הרכבת וו' ? (mafenemMotsarem[GetIndexMotsar('J1')].kmot === 0)
                                                                            : (sogAskaa || sogAskaAgla) === 'תיקון' ? (BdekatTekonKmeotMotsarem()) : (true)
                                                                    } defaultSelected={agla?.thlkhem?.kveatMher} value={kveatMher} onValueChange={(val) => setKveatMher(val)}>
                                                                        <div className="mr-2">קביעת מחיר</div>
                                                                    </Switch>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Divider className="w-[1px] h-[200px]" />
                                                        <div className="w-full max-w-[250px]">
                                                            <div className="flex justify-around">
                                                                <div>ייצור</div>
                                                                {
                                                                    thelatYetsor && seomYetsor ?
                                                                        <FaCheckDouble className="text-3xl text-success" />
                                                                        :
                                                                        thelatYetsor || seomYetsor ?
                                                                            <FaCheck className="text-3xl text-warning" />
                                                                            :
                                                                            <MdOutlineCheckBoxOutlineBlank className="text-3xl text-gray-500" />

                                                                }
                                                            </div>
                                                            <div className="h-[200px]">
                                                                <Divider className="mt-2 mb-2" />
                                                                <div className="flex justify-center">
                                                                    <Switch isSelected={thelatYetsor} onClick={BdekatKolKmoeotHmotsarem} isReadOnly={agla?.thlkhem?.thelatYetsor || BdekatKolKmoeotHmotsaremfff() || !kveatMher} defaultSelected={agla?.thlkhem?.thelatYetsor} value={thelatYetsor} onValueChange={(val) => {
                                                                        setThelatYetsor(val);
                                                                        if (!val) {
                                                                            setSeomYetsor(false);
                                                                        }
                                                                    }}>
                                                                        <div className="mr-2">תחילת ייצור</div>
                                                                    </Switch>
                                                                </div>
                                                                <Divider className="mt-2 mb-2" />
                                                                <div className="flex justify-center">
                                                                    <Switch isSelected={seomYetsor} isReadOnly={!hskmatLkoh || !thelatYetsor} defaultSelected={agla?.thlkhem?.seomThlekhYetsor} value={seomYetsor} onValueChange={(val) => setSeomYetsor(val)}>
                                                                        <div className="mr-2">סיום יצור</div>
                                                                    </Switch>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            (sogAskaAgla === 'ייצור' || sogAskaa === 'ייצור') &&
                                                            <>
                                                                <Divider className="w-[1px] h-[200px]" />
                                                                <div className="w-full max-w-[250px]">
                                                                    <div className="flex justify-around">
                                                                        <div>רישיון</div>
                                                                        {
                                                                            msbarAgla && seomReshaion ?
                                                                                <FaCheckDouble className="text-3xl text-success" />
                                                                                :
                                                                                msbarAgla || seomReshaion ?
                                                                                    <FaCheck className="text-3xl text-warning" />
                                                                                    :
                                                                                    <MdOutlineCheckBoxOutlineBlank className="text-3xl text-gray-500" />

                                                                        }
                                                                    </div>
                                                                    <div className="h-[200px]">
                                                                        <Divider className="mt-2 mb-2" />
                                                                        {
                                                                            agla?.msbarAgla ?
                                                                                <>
                                                                                    <Input size="sm" color="primary" className="max-w-[200px]" isReadOnly label="מספר עגלה" value={drag?.licenseid} />
                                                                                </>

                                                                                :
                                                                                <div className="flex justify-center items-center">
                                                                                    {/* <Autocomplete
                                                                                        isDisabled={!hskmatLkoh}
                                                                                        label="מספר עגלה"
                                                                                        className="max-w-[200px]"
                                                                                        size="sm"
                                                                                        color="primary"
                                                                                        onSelectionChange={setMsbarAgla}
                                                                                        onInputChange={(val) => { setMsbarAgla(val); setSeomReshion(false); }}
                                                                                    >
                                                                                        {
                                                                                            aglot?.map((aglaaaaa, index) => (
                                                                                                (!aglaaaaa?.active) && <AutocompleteItem onClick={() => setSeomReshion(false)} className='text-right' key={aglaaaaa?.licenseid} value={aglaaaaa?.licenseid}>
                                                                                                    {aglaaaaa?.licenseid}
                                                                                                </AutocompleteItem>
                                                                                            ))
                                                                                        }

                                                                                    </Autocomplete> */}
                                                                                    <Button isDisabled={!hskmatLkoh} size="sm" className="mr-2" onClick={() => { router.push('/activion'); }}>הוספה</Button>
                                                                                </div>
                                                                        }
                                                                        <Divider className="mt-2 mb-2" />
                                                                        <div className="flex justify-center">
                                                                            <Switch isSelected={seomReshaion} isReadOnly={agla?.thlkhem?.seomThlekhReshion || !msbarAgla} defaultSelected={agla?.thlkhem?.seomThlekhReshion} value={seomReshaion} onValueChange={(val) => setSeomReshion(val)}>
                                                                                <div className="mr-2">סיום רישיון</div>
                                                                            </Switch>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }
                                                    </div>
                                                </ListItem>
                                            </List>
                                        </Drawer>
                                        <Drawer
                                            sx={{
                                                width: drawerWidth,
                                                flexShrink: 0,
                                                '& .MuiDrawer-paper': {
                                                    backgroundColor: '#ffffff',
                                                    width: drawerWidth,
                                                    boxSizing: 'border-box',
                                                },
                                            }}
                                            variant="persistent"
                                            anchor="left"
                                            open={open}
                                        >
                                            <DrawerHeader>
                                                <div className="flex justify-end items-center w-full">
                                                    <Button onClick={handleDrawerClose} color="danger" variant='flat' className="mr-5"><CgClose className="text-gray text-xl" />סגירה</Button>
                                                </div>
                                            </DrawerHeader>
                                            <Divider />
                                            <List>
                                                <ListItem>
                                                    <div className="font-bold text-center text-2xl w-full">
                                                        תמחיר
                                                    </div>
                                                </ListItem>
                                                <ListItem>
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-right text-green-500">מחיר שוק</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${formatNumberWithCommas(mherKlale || "")}`} />
                                                    </div>
                                                </ListItem>
                                                <ListItem>
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-right text-green-500">מחיר שוק</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${formatNumberWithCommas(mherKlale || "")}`} />
                                                    </div>
                                                </ListItem>

                                                <ListItem>
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-right text-danger-500">הנחה</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${(hnha || "")}`} />
                                                    </div>
                                                </ListItem>
                                                <ListItem>
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-right text-success-500">מחיר מכירה</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${formatNumberWithCommas((mherKlale - hnha) || "")}`} />
                                                    </div>
                                                </ListItem>
                                                <ListItem>
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-right text-danger-500">הוצאות חו"ג</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${hkhnsotHomreGlem || ""}`} />
                                                    </div>
                                                </ListItem>
                                                <ListItem>
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-right text-danger-500">הוצאות שכר</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${hotsotSkhar || ""}`} />
                                                    </div>
                                                </ListItem>
                                                <ListItem>
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-right text-green-500">רווח ישיר</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${formatNumberWithCommas((mherKlale - hkhnsotHomreGlem - hotsotSkhar) || "")}`} />
                                                    </div>
                                                </ListItem>
                                                <ListItem>
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-right text-danger-500">הוצאות עקיפות</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${formatNumberWithCommas(hotsotAkefot) || ''}`} />
                                                    </div>
                                                </ListItem>
                                                <ListItem>
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-right text-danger-500">הוצאות מסים</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${formatNumberWithCommas(parseInt(mherKlale * 0.17) || "")}`} />
                                                    </div>
                                                </ListItem>
                                                <ListItem>
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-right text-green-500">רווח נקי</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${formatNumberWithCommas(((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) || "")}`} />
                                                    </div>
                                                </ListItem>
                                                <ListItem>
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-right text-green-500">אחוז רווח</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`%${((((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) * 100 / (mherKlale - hnha)).toFixed(0) || '')}`} />
                                                    </div>
                                                </ListItem>

                                            </List>
                                        </Drawer>
                                    </Box>
                                    <div className={`w-full ${open && 'ml-96'} ${openTop ? 'mt-[350px] h-[55vh]' : 'h-[82vh]'}`}>
                                        <div className="w-full h-full">
                                            <div className="w-full h-full flex mt-[67px]">
                                                <div className="w-full h-full border-r-2 border-black">
                                                    <div dir="rtl" className="w-full  h-full overflow-y-auto overflow-x-hidden">
                                                        <div className="ml-2 mr-2 w-full bg-gradient-to-r from-gray-300 to-gray-700 text-center p-2 rounded-full sticky top-0 z-40 tracking-wider text-white font-bold text-xl">
                                                            פירוט מוצרים
                                                        </div>
                                                        {
                                                            mafenemMotsarem?.map((motsar, index) => {
                                                                return <div key={index}>
                                                                    <div ref={MotsaremRefs.current[index]}>{checkAemRemezMataem(motsar.remez) && renderDropdownWithInputs(motsar, GetBrtemMotsarCategory(motsar?.remez)?.shem, index, false, agla?.newMafeneMotsarem, sogBaola, null, null, null)}</div>
                                                                    {
                                                                        checkAemRemezMataem(motsar.remez) && <Divider className="mt-3 mb-3" />
                                                                    }
                                                                </div>
                                                            })
                                                        }
                                                        {
                                                            motsaremBrofelemSofe?.map((brofel, index) => {
                                                                return <div key={index}>
                                                                    <div ref={BrofelemRefs.current[index]}>{renderDropdownWithInputs(brofel, GetBrtemMotsarCategory(brofel?.remez)?.shem, index, true, agla?.motsaremBrofelemSofe, sogBaola, GetMotsarBrofelTokhn(brofel?.shem), brofel?.kmotYdnet, motsaremBrofelem)}</div>
                                                                    <Divider className="mt-3 mb-3" />
                                                                </div>
                                                            })
                                                        }
                                                        <div className="mt-[200px]"/>
                                                    </div>
                                                </div>

                                                <div className="w-full h-full">
                                                    <div className="w-full h-full overflow-auto">
                                                        <div className="sticky top-0 z-40" >
                                                            <div className="items-center w-full flex justify-around ">
                                                                {
                                                                    !agla?.msbar &&
                                                                    <div className="ml-2 mr-2">
                                                                        <Dropdown dir="rtl">
                                                                            <DropdownTrigger>
                                                                                <Button color="primary">
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
                                                                                {Tokhneot?.map((option) => (
                                                                                    <DropdownItem onClick={() => setTokhnetNokhhet(option)} key={option.shem}>{option.shem}</DropdownItem>
                                                                                ))}
                                                                            </DropdownMenu>
                                                                        </Dropdown>

                                                                    </div>
                                                                }
                                                                <div className="w-full ml-2 mr-2 bg-gradient-to-r from-gray-300 to-gray-700 text-center p-2 rounded-full tracking-wider text-white font-bold text-xl">תוכנית יצור</div>
                                                            </div>
                                                        </div>

                                                        <div dir="rtl" className="w-full flex justify-center">
                                                            {
                                                                motsaremBrofelem && (sogAskaAgla === 'ייצור' || sogAskaa === 'ייצור') && <table className="h-full">
                                                                    <thead>
                                                                        {
                                                                            !agla?.msbar &&
                                                                            <tr className="row-spacing">
                                                                                <th>
                                                                                    <div className="group relative z-30">
                                                                                        {
                                                                                            sogAgla === 'פתוחה' ?
                                                                                                <Image width={70} alt="none" src={rep6} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                                                :
                                                                                                <Image width={70} alt="none" src={rep80} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                                        }
                                                                                    </div>
                                                                                </th>
                                                                                <th className="w-[150px]">סוג עגלה</th>
                                                                                <th><RadioGroup value={sogAgla} onValueChange={(val) => { ResetAll(); setSogAgla(val); }} className="flex"><div className="flex mr-5"><Radio value="סגורה">סגורה</Radio><Radio value="פתוחה">פתוחה</Radio></div></RadioGroup></th>
                                                                                <th></th>
                                                                            </tr>
                                                                        }
                                                                        {
                                                                            sogAgla &&
                                                                            <>
                                                                                <tr>
                                                                                    <th colSpan={4}><Divider /></th>
                                                                                </tr>
                                                                                <tr className="row-spacing">
                                                                                    <th>
                                                                                        <div className="group relative z-30">
                                                                                            <Image width={70} alt="none" src={rep77} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                                        </div>
                                                                                    </th>
                                                                                    <th className="w-[150px]">שטח עגלה</th>
                                                                                    <th><Input value={aorkhSM || ""} onValueChange={(val) => {
                                                                                        setAorkhSM(val); setTvahBrofel(''); setMsbarBrofelem('');
                                                                                        if (rohf && aorkh) {
                                                                                            for (let index = 0; index < motsaremBrofelem.length; index++) {
                                                                                                updateMotsaremBrofelem(index,
                                                                                                    {
                                                                                                        kmot: 0,
                                                                                                        kmotYdnet: 0,
                                                                                                        mher: 0,
                                                                                                        shem: 'בחר פריט',
                                                                                                        remez: '',
                                                                                                        message: '',
                                                                                                        sogShem: ''
                                                                                                    });
                                                                                            }
                                                                                            setMsbarTsrem('');
                                                                                            setAemBlamem(false);
                                                                                            setSogGlgalem('');
                                                                                            setTsmegSber(false);
                                                                                        }
                                                                                    }} color="primary" size="sm" className="w-[100px]" label={`אורך בס"מ`} type="number" /></th>
                                                                                    <th><Input value={rohfSM || ""} onValueChange={(val) => { setRohfSM(val); setTvahBrofel(''); setMsbarBrofelem(''); }} color="primary" size="sm" className="w-[100px]" label={`רוחב בס"מ`} type="number" /></th>
                                                                                </tr>
                                                                                {
                                                                                    (aorkh !== 0 && aorkh !== '' && rohf !== 0 && rohf !== '') &&
                                                                                    <>
                                                                                        <tr className="row-spacing">
                                                                                            <th>
                                                                                            </th>
                                                                                            <th className="w-[150px]">רצפה</th>
                                                                                            <th><Dropdown dir="rtl">
                                                                                                <DropdownTrigger>
                                                                                                    <Button size="xs" className='m-2'>
                                                                                                        {motsaremBrofelem[11]?.shem}
                                                                                                    </Button>
                                                                                                </DropdownTrigger>
                                                                                                <DropdownMenu
                                                                                                    aria-label="Multiple selection example"
                                                                                                    variant="flat"
                                                                                                    closeOnSelect={true}
                                                                                                    disallowEmptySelection
                                                                                                    selectionMode="single"
                                                                                                    selectedKeys={motsaremBrofelem[11]?.shem}
                                                                                                    onSelectionChange={(val) => {
                                                                                                        updateMotsaremBrofelem(11,
                                                                                                            {
                                                                                                                kmot: parseFloat((aorkh * rohf).toFixed(1)),
                                                                                                                kmotYdnet: 0,
                                                                                                                mher: parseFloat(((aorkh * rohf) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                shem: val.currentKey,
                                                                                                                remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                message: '',
                                                                                                                sogShem: 'פרופיל תפיסה'
                                                                                                            });

                                                                                                        //val.currentKey && scrollToElement(BrofelemRefs?.current[GetBrofelMtaemLscroll(val.currentKey)]?.current);
                                                                                                    }
                                                                                                    }
                                                                                                >
                                                                                                    {GetBrtemMotsarMlae('B1').arrayResualt.map((option) => (
                                                                                                        <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                    ))}
                                                                                                </DropdownMenu>
                                                                                            </Dropdown></th>
                                                                                            <th></th>
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
                                                                                            <th><RadioGroup value={`${msbarTsrem}`} onValueChange={(val) => {
                                                                                                setMsbarTsrem(val);
                                                                                                if (parseInt(val) === 2) {
                                                                                                    setAemBlamem(true);
                                                                                                    handleInputChange(false, GetIndexMotsar('F2'), 1, 'kmot');
                                                                                                }
                                                                                                updateMotsaremBrofelem(4,
                                                                                                    {
                                                                                                        kmot: 0,
                                                                                                        kmotYdnet: 0,
                                                                                                        mher: 0,
                                                                                                        shem: 'בחר פריט',
                                                                                                        remez: '',
                                                                                                        message: '',
                                                                                                        sogShem: ''
                                                                                                    });
                                                                                            }} className="flex"><div className="flex mr-5"><Radio value="1">1</Radio><Radio value="2">2</Radio></div></RadioGroup></th>
                                                                                            <th><Switch isSelected={aemBlamem} defaultSelected={agla?.mafenem?.aemBlamem} value={aemBlamem} onValueChange={(val) => {
                                                                                                let res = (val === false) && (parseInt(msbarTsrem) === 2) ? true : val;
                                                                                                setAemBlamem(res);
                                                                                                if (res) {
                                                                                                    handleInputChange(false, GetIndexMotsar('F2'), 1, 'kmot');
                                                                                                }
                                                                                                else {
                                                                                                    handleInputChange(false, GetIndexMotsar('F2'), 0, 'kmot');
                                                                                                }
                                                                                            }}><div className="mr-3">עם בולמים</div></Switch></th>
                                                                                        </tr>
                                                                                        {
                                                                                            (parseInt(msbarTsrem) === 1 || parseInt(msbarTsrem) === 2) &&
                                                                                            <tr className="row-spacing">
                                                                                                <th></th>
                                                                                                <th>פרופיל תפיסה</th>
                                                                                                <th><Dropdown dir="rtl">
                                                                                                    <DropdownTrigger>
                                                                                                        <Button size="xs" className='m-2'>
                                                                                                            {motsaremBrofelem[4]?.shem}
                                                                                                        </Button>
                                                                                                    </DropdownTrigger>
                                                                                                    <DropdownMenu
                                                                                                        aria-label="Multiple selection example"
                                                                                                        variant="flat"
                                                                                                        closeOnSelect={true}
                                                                                                        disallowEmptySelection
                                                                                                        selectionMode="single"
                                                                                                        selectedKeys={motsaremBrofelem[4]?.shem}
                                                                                                        onSelectionChange={(val) => {
                                                                                                            updateMotsaremBrofelem(4,
                                                                                                                {
                                                                                                                    kmot: parseInt(msbarTsrem) === 1 ? (0.6) : parseInt(msbarTsrem) === 2 ? (1.2) : 0,
                                                                                                                    kmotYdnet: 0,
                                                                                                                    mher: parseFloat((((parseInt(msbarTsrem) === 1 ? (0.6 * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot) : parseInt(msbarTsrem) === 2 ? (1.2 * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot) : 0))).toFixed(1)),
                                                                                                                    shem: val.currentKey,
                                                                                                                    remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                    message: '',
                                                                                                                    sogShem: 'פרופיל תפיסה'
                                                                                                                });

                                                                                                            //val.currentKey && scrollToElement(BrofelemRefs?.current[GetBrofelMtaemLscroll(val.currentKey)]?.current);
                                                                                                        }
                                                                                                        }
                                                                                                    >
                                                                                                        {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                        ))}
                                                                                                        {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                        ))}
                                                                                                        {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                        ))}
                                                                                                    </DropdownMenu>
                                                                                                </Dropdown></th>
                                                                                                <th></th>
                                                                                            </tr>
                                                                                        }
                                                                                        <tr>
                                                                                            <th colSpan={4}><Divider /></th>
                                                                                        </tr>
                                                                                        <tr className="row-spacing">
                                                                                            <th>
                                                                                                <div className="group relative z-30">
                                                                                                    <Image width={70} alt="none" src={rep20} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                                                </div>
                                                                                            </th>
                                                                                            <th>צמיגים</th>
                                                                                            <th><RadioGroup value={sogGlgalem} onValueChange={(val) => {
                                                                                                setSogGlgalem(val);
                                                                                                if (val === 'חצוניים') {
                                                                                                    updateMotsaremBrofelem(6,
                                                                                                        {
                                                                                                            kmot: 0,
                                                                                                            kmotYdnet: 0,
                                                                                                            mher: 0,
                                                                                                            shem: 'בחר פריט',
                                                                                                            remez: '',
                                                                                                            message: '',
                                                                                                            sogShem: ''
                                                                                                        });
                                                                                                    updateMotsaremBrofelem(5,
                                                                                                        {
                                                                                                            kmot: 0,
                                                                                                            kmotYdnet: 0,
                                                                                                            mher: 0,
                                                                                                            shem: 'בחר פריט',
                                                                                                            remez: '',
                                                                                                            message: '',
                                                                                                            sogShem: ''
                                                                                                        });
                                                                                                    setHlokaMsbarBrofelem(0);
                                                                                                    setHlokaTvah(0);
                                                                                                    setAorkhBrofel(0);
                                                                                                    setTvahBrofel(0);
                                                                                                    setMsbarBrofelem(0);
                                                                                                    setHelkBetBnmet(false);
                                                                                                    setAemRmbaAoRgel('');
                                                                                                    setSolam('');
                                                                                                    setGobahSolam(0);
                                                                                                    setTvahAofkeSolam(0);
                                                                                                    setMsbarBrofelemAofkeSolam(0);
                                                                                                    setTvahAnkheSolam(0);
                                                                                                    setMsbarBrofelemAnkhe(0);
                                                                                                    setMsbarBrofelmBretA(0);
                                                                                                }
                                                                                            }} className="flex"><div className="flex mr-5"><Radio value="פנמיים">פנימיים</Radio><Radio value="חצוניים">חצוניים</Radio></div></RadioGroup></th>
                                                                                            <th><Switch isSelected={tsmegSber} defaultSelected={agla?.mafenem?.aemTsmegSber} value={tsmegSber} onValueChange={(val) => {
                                                                                                setTsmegSber(val);
                                                                                                if (val) {
                                                                                                    handleInputChange(false, GetIndexMotsar('A3'), mafenemMotsarem[GetIndexMotsar('A3')].kmot + 1, 'kmot');
                                                                                                    handleInputChange(false, GetIndexMotsar('C1'), mafenemMotsarem[GetIndexMotsar('C1')].kmot + 1, 'kmot');

                                                                                                }
                                                                                                else {
                                                                                                    handleInputChange(false, GetIndexMotsar('A3'), mafenemMotsarem[GetIndexMotsar('A3')].kmot - 1, 'kmot');
                                                                                                    handleInputChange(false, GetIndexMotsar('C1'), mafenemMotsarem[GetIndexMotsar('C1')].kmot - 1, 'kmot');
                                                                                                }
                                                                                            }}><div>צמיג ספר</div></Switch></th>
                                                                                        </tr>
                                                                                        {
                                                                                            sogGlgalem === 'פנמיים' &&
                                                                                            <>
                                                                                                <tr className="row-spacing">
                                                                                                    <th></th>
                                                                                                    <th>מסגרת תחתונה</th>
                                                                                                    <th><Dropdown dir="rtl">
                                                                                                        <DropdownTrigger>
                                                                                                            <Button size="xs" className='m-2'>
                                                                                                                {motsaremBrofelem[5]?.shem}
                                                                                                            </Button>
                                                                                                        </DropdownTrigger>
                                                                                                        <DropdownMenu
                                                                                                            aria-label="Multiple selection example"
                                                                                                            variant="flat"
                                                                                                            closeOnSelect={true}
                                                                                                            disallowEmptySelection
                                                                                                            selectionMode="single"
                                                                                                            selectedKeys={motsaremBrofelem[5]?.shem}
                                                                                                            onSelectionChange={(val) => {
                                                                                                                updateMotsaremBrofelem(5,
                                                                                                                    {
                                                                                                                        kmot: parseFloat((aorkh * 2) + (rohf * 2)),
                                                                                                                        kmotYdnet: 0,
                                                                                                                        mher: parseFloat((((aorkh * 2) + (rohf * 2)) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                        shem: val.currentKey,
                                                                                                                        remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                        message: '',
                                                                                                                        sogShem: 'מסגרת תחתונה'
                                                                                                                    });
                                                                                                            }
                                                                                                            }
                                                                                                        >
                                                                                                            {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                                <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                            ))}
                                                                                                            {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                                <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                            ))}
                                                                                                            {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
                                                                                                                <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                            ))}
                                                                                                        </DropdownMenu>
                                                                                                    </Dropdown></th>
                                                                                                    <th></th>
                                                                                                </tr>
                                                                                                <tr className="row-spacing">
                                                                                                    <th>חלוקה תחתונה</th>
                                                                                                    <th><Input type="number" value={hlokaTvah || ''} onValueChange={(val) => { setHlokaTvah(val); setHlokaMsbarBrofelem(parseInt(Math.floor((aorkh / (val / 100)) - 1))); }} color="primary" size="sm" className="w-[100px]" label={`טווח בס"מ`} /></th>
                                                                                                    <th><Input type="number" value={hlokaMsbarBrofelem || ''} onValueChange={(val) => { setHlokaMsbarBrofelem(val); setHlokaTvah(formatNumber(((aorkh / (parseFloat(val) + 1)) * 100))); }} color="primary" size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                                                    <th><Dropdown dir="rtl">
                                                                                                        <DropdownTrigger>
                                                                                                            <Button size="xs" className='m-2'>
                                                                                                                {motsaremBrofelem[6]?.shem}
                                                                                                            </Button>
                                                                                                        </DropdownTrigger>
                                                                                                        <DropdownMenu
                                                                                                            aria-label="Multiple selection example"
                                                                                                            variant="flat"
                                                                                                            closeOnSelect={true}
                                                                                                            disallowEmptySelection
                                                                                                            selectionMode="single"
                                                                                                            selectedKeys={motsaremBrofelem[6]?.shem}
                                                                                                            onSelectionChange={(val) => {
                                                                                                                updateMotsaremBrofelem(6,
                                                                                                                    {
                                                                                                                        kmot: parseFloat(hlokaMsbarBrofelem * rohf),
                                                                                                                        kmotYdnet: 0,
                                                                                                                        mher: parseFloat(((hlokaMsbarBrofelem * rohf) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                        shem: val.currentKey,
                                                                                                                        remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                        message: '',
                                                                                                                        sogShem: 'חלוקה תחתונה'
                                                                                                                    });
                                                                                                            }
                                                                                                            }
                                                                                                        >
                                                                                                            {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                                <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                            ))}
                                                                                                            {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                                <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                            ))}
                                                                                                            {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
                                                                                                                <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                            ))}
                                                                                                        </DropdownMenu>
                                                                                                    </Dropdown></th>
                                                                                                </tr>
                                                                                            </>
                                                                                        }
                                                                                        <tr>
                                                                                            <th colSpan={4}><Divider /></th>
                                                                                        </tr>
                                                                                        <tr className="row-spacing">
                                                                                            <th>
                                                                                                <div className="group relative z-30">
                                                                                                    <Image width={70} alt="none" src={rep15} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                                                </div>
                                                                                            </th>
                                                                                            <th>יצול</th>
                                                                                            <th><Input type="number" value={aorkhBrofelSM || ''} onValueChange={(val) => {
                                                                                                setAorkhBrofelSM(parseFloat(val));
                                                                                                updateMotsaremBrofelem(1,
                                                                                                    {
                                                                                                        kmot: parseFloat((val || 0) * 2),
                                                                                                        kmotYdnet: 0,
                                                                                                        mher: parseFloat((((val || 0) * 2) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(motsaremBrofelem[1].shem), motsaremBrofelem[1].shem).alot).toFixed(1)),
                                                                                                        shem: motsaremBrofelem[1].shem,
                                                                                                        remez: GetShemMotsarCategoryBret(motsaremBrofelem[1].shem),
                                                                                                        message: '',
                                                                                                        sogShem: 'יצול'
                                                                                                    });

                                                                                            }} color="primary" size="sm" className="w-[130px]" label={`אורך פרופיל בס"מ`} /></th>
                                                                                            <th><Dropdown dir="rtl">
                                                                                                <DropdownTrigger>
                                                                                                    <Button isDisabled={!aorkhBrofel} size="xs" className='m-2'>
                                                                                                        {motsaremBrofelem[1]?.shem}
                                                                                                    </Button>
                                                                                                </DropdownTrigger>
                                                                                                <DropdownMenu
                                                                                                    aria-label="Multiple selection example"
                                                                                                    variant="flat"
                                                                                                    closeOnSelect={true}
                                                                                                    disallowEmptySelection
                                                                                                    selectionMode="single"
                                                                                                    selectedKeys={motsaremBrofelem[1]?.shem}
                                                                                                    onSelectionChange={(val) => {
                                                                                                        updateMotsaremBrofelem(1,
                                                                                                            {
                                                                                                                kmot: parseFloat((aorkhBrofel || 0) * 2),
                                                                                                                kmotYdnet: 0,
                                                                                                                mher: parseFloat((((aorkhBrofel || 0) * 2) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                shem: val.currentKey,
                                                                                                                remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                message: '',
                                                                                                                sogShem: 'יצול'
                                                                                                            });
                                                                                                    }
                                                                                                    }
                                                                                                >
                                                                                                    {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                        <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                    ))}
                                                                                                    {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                        <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                    ))}
                                                                                                    {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
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
                                                                                                    <Image width={70} alt="none" src={rep9} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                                                </div>
                                                                                            </th>
                                                                                            <th>שלדה חיצונית</th>
                                                                                            <th><Dropdown dir="rtl">
                                                                                                <DropdownTrigger>
                                                                                                    <Button size="xs" className='m-2'>
                                                                                                        {motsaremBrofelem[0]?.shem}
                                                                                                    </Button>
                                                                                                </DropdownTrigger>
                                                                                                <DropdownMenu
                                                                                                    aria-label="Multiple selection example"
                                                                                                    variant="flat"
                                                                                                    closeOnSelect={true}
                                                                                                    disallowEmptySelection
                                                                                                    selectionMode="single"
                                                                                                    selectedKeys={motsaremBrofelem[0]?.shem}
                                                                                                    onSelectionChange={(val) => {
                                                                                                        updateMotsaremBrofelem(0,
                                                                                                            {
                                                                                                                kmot: parseFloat((aorkh * 2) + (rohf * 2)),
                                                                                                                kmotYdnet: 0,
                                                                                                                mher: parseFloat((((aorkh * 2) + (rohf * 2)) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                shem: val.currentKey,
                                                                                                                remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                message: '',
                                                                                                                sogShem: 'שלדה חיצונית'
                                                                                                            });
                                                                                                    }
                                                                                                    }
                                                                                                >
                                                                                                    {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                        <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                    ))}
                                                                                                    {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                        <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                    ))}
                                                                                                    {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
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
                                                                                            <th><Input isReadOnly={!aorkh || !rohf} type="number" value={tvahBrofel || ''} onValueChange={(val) => {
                                                                                                setTvahBrofel(val); setMsbarBrofelem(parseInt(Math.floor((aorkh / (val / 100)) - 1)));
                                                                                                updateMotsaremBrofelem(2,
                                                                                                    {
                                                                                                        kmot: parseInt(Math.floor((aorkh / (val / 100)) - 1)),
                                                                                                        kmotYdnet: 0,
                                                                                                        mher: parseFloat(((Math.floor((aorkh / (val / 100)) - 1)) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(motsaremBrofelem[2].shem), motsaremBrofelem[2].shem).alot).toFixed(1)),
                                                                                                        shem: motsaremBrofelem[2].shem,
                                                                                                        remez: GetShemMotsarCategoryBret(motsaremBrofelem[2].shem),
                                                                                                        message: '',
                                                                                                        sogShem: 'שלדה פנימית חלק א'
                                                                                                    });
                                                                                                if (helkBetBnmet) {
                                                                                                    updateMotsaremBrofelem(3,
                                                                                                        {
                                                                                                            kmot: ((parseInt(Math.floor((aorkh / (val / 100)) - 1))) - parseInt(motsaremBrofelem[2].kmot)),
                                                                                                            kmotYdnet: 0,
                                                                                                            mher: parseFloat((((Math.floor((aorkh / (val / 100)) - 1)) - parseInt(motsaremBrofelem[2].kmot)) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(motsaremBrofelem[3].shem), motsaremBrofelem[3].shem).alot).toFixed(1)),
                                                                                                            shem: motsaremBrofelem[3].shem,
                                                                                                            remez: GetShemMotsarCategoryBret(motsaremBrofelem[3].shem),
                                                                                                            message: '',
                                                                                                            sogShem: 'שלדה פנימית חלק ב'
                                                                                                        });
                                                                                                }


                                                                                            }} color="primary" size="sm" className="w-[100px]" label={`טווח בס"מ`} /></th>
                                                                                            <th><Input isReadOnly={!aorkh || !rohf} type="number" value={msbarBrofelem || ''} onValueChange={(val) => {
                                                                                                setMsbarBrofelem(parseInt(val)); setTvahBrofel(formatNumber(((aorkh / (parseFloat(val) + 1)) * 100)));
                                                                                                updateMotsaremBrofelem(2,
                                                                                                    {
                                                                                                        kmot: (parseInt(val) - ((parseInt(val) - parseInt(motsaremBrofelem[2].kmot)))),
                                                                                                        kmotYdnet: 0,
                                                                                                        mher: parseFloat(((parseInt(val) - ((parseInt(val) - parseInt(motsaremBrofelem[2].kmot)))) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(motsaremBrofelem[2].shem), motsaremBrofelem[2].shem).alot).toFixed(1)),
                                                                                                        shem: motsaremBrofelem[2].shem,
                                                                                                        remez: GetShemMotsarCategoryBret(motsaremBrofelem[2].shem),
                                                                                                        message: '',
                                                                                                        sogShem: 'שלדה פנימית חלק א'
                                                                                                    });
                                                                                                if (helkBetBnmet) {
                                                                                                    updateMotsaremBrofelem(3,
                                                                                                        {
                                                                                                            kmot: ((parseInt(val) - parseInt(motsaremBrofelem[2].kmot))),
                                                                                                            kmotYdnet: 0,
                                                                                                            mher: parseFloat((((parseInt(val) - parseInt(motsaremBrofelem[2].kmot))) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(motsaremBrofelem[2].shem), motsaremBrofelem[2].shem).alot).toFixed(1)),
                                                                                                            shem: motsaremBrofelem[3].shem,
                                                                                                            remez: GetShemMotsarCategoryBret(motsaremBrofelem[3].shem),
                                                                                                            message: '',
                                                                                                            sogShem: 'שלדה פנימית חלק ב'
                                                                                                        });
                                                                                                }

                                                                                            }} color="primary" size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                                        </tr>
                                                                                        <tr className="row-spacing">
                                                                                            <th>חלק א</th>
                                                                                            <th><Dropdown dir="rtl">
                                                                                                <DropdownTrigger>
                                                                                                    <Button isDisabled={!tvahBrofel || !msbarBrofelem} size="xs" className='m-2'>
                                                                                                        {motsaremBrofelem[2]?.shem}
                                                                                                    </Button>
                                                                                                </DropdownTrigger>
                                                                                                <DropdownMenu
                                                                                                    aria-label="Multiple selection example"
                                                                                                    variant="flat"
                                                                                                    closeOnSelect={true}
                                                                                                    disallowEmptySelection
                                                                                                    selectionMode="single"
                                                                                                    selectedKeys={motsaremBrofelem[2]?.shem}
                                                                                                    onSelectionChange={(val) => {
                                                                                                        updateMotsaremBrofelem(2,
                                                                                                            {
                                                                                                                kmot: helkBetBnmet ? msbarBrofelemBretA : (msbarBrofelem || 0),
                                                                                                                kmotYdnet: 0,
                                                                                                                mher: parseFloat(((helkBetBnmet ? msbarBrofelemBretA : (msbarBrofelem || 0)) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                shem: val.currentKey,
                                                                                                                remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                message: '',
                                                                                                                sogShem: 'שלדה פנימית חלק א'
                                                                                                            });
                                                                                                    }
                                                                                                    }
                                                                                                >
                                                                                                    {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                        <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                    ))}
                                                                                                    {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                        <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                    ))}
                                                                                                    {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
                                                                                                        <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                    ))}
                                                                                                </DropdownMenu>
                                                                                            </Dropdown></th>
                                                                                            <th><Input type="number" isReadOnly={helkBetBnmet ? false : true} value={((helkBetBnmet ? (msbarBrofelemBretA || motsaremBrofelem[2].kmot) : (msbarBrofelem || 0)) || '')} onValueChange={(val) => {
                                                                                                setMsbarBrofelmBretA(Math.min(val, msbarBrofelem));
                                                                                                updateMotsaremBrofelem(2,
                                                                                                    {
                                                                                                        kmot: parseFloat(val),
                                                                                                        kmotYdnet: 0,
                                                                                                        mher: parseFloat((parseFloat(val) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(motsaremBrofelem[2].shem), motsaremBrofelem[2].shem).alot).toFixed(1)),
                                                                                                        shem: motsaremBrofelem[2].shem,
                                                                                                        message: '',
                                                                                                        remez: GetShemMotsarCategoryBret(motsaremBrofelem[2].shem),
                                                                                                        sogShem: 'שלדה פנימית חלק א'
                                                                                                    });
                                                                                                if (helkBetBnmet && motsaremBrofelem[3].shem !== 'בחר פריט') {
                                                                                                    updateMotsaremBrofelem(3,
                                                                                                        {
                                                                                                            kmot: msbarBrofelem - val,
                                                                                                            kmotYdnet: 0,
                                                                                                            mher: parseFloat(((msbarBrofelem - val) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(motsaremBrofelem[3].shem), motsaremBrofelem[3].shem).alot).toFixed(1)),
                                                                                                            shem: motsaremBrofelem[3].shem,
                                                                                                            message: '',
                                                                                                            remez: GetShemMotsarCategoryBret(motsaremBrofelem[3].shem),
                                                                                                            sogShem: 'שלדה פנימית חלק ב'
                                                                                                        });
                                                                                                }


                                                                                            }} color="primary" size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                                            <th><Switch isSelected={helkBetBnmet} defaultSelected={agla?.mafenem?.aemHelkBet} value={helkBetBnmet} onValueChange={(val) => {
                                                                                                setHelkBetBnmet(val);
                                                                                                if (!val) {
                                                                                                    updateMotsaremBrofelem(3,
                                                                                                        {
                                                                                                            kmot: 0,
                                                                                                            kmotYdnet: 0,
                                                                                                            mher: 0,
                                                                                                            shem: 'בחר פריט',
                                                                                                            remez: '',
                                                                                                            message: '',
                                                                                                            sogShem: ''
                                                                                                        });
                                                                                                    updateMotsaremBrofelem(2,
                                                                                                        {
                                                                                                            kmot: msbarBrofelem,
                                                                                                            kmotYdnet: 0,
                                                                                                            mher: parseFloat((msbarBrofelem * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(motsaremBrofelem[2].shem), motsaremBrofelem[2].shem).alot).toFixed(1)),
                                                                                                            shem: motsaremBrofelem[2].shem,
                                                                                                            remez: GetShemMotsarCategoryBret(motsaremBrofelem[2].shem),
                                                                                                            message: '',
                                                                                                            sogShem: 'שלדה פנימית חלק א'
                                                                                                        });
                                                                                                }
                                                                                            }}><div className="mr-2"><FaPlus /></div></Switch></th>
                                                                                        </tr>
                                                                                        {
                                                                                            helkBetBnmet &&
                                                                                            <tr className="row-spacing">
                                                                                                <th>חלק ב</th>
                                                                                                <th><Dropdown dir="rtl">
                                                                                                    <DropdownTrigger>
                                                                                                        <Button isDisabled={motsaremBrofelem[2].shem === 'בחר פריט'} size="xs" className='m-2'>
                                                                                                            {motsaremBrofelem[3]?.shem}
                                                                                                        </Button>
                                                                                                    </DropdownTrigger>
                                                                                                    <DropdownMenu
                                                                                                        aria-label="Multiple selection example"
                                                                                                        variant="flat"
                                                                                                        closeOnSelect={true}
                                                                                                        disallowEmptySelection
                                                                                                        selectionMode="single"
                                                                                                        selectedKeys={motsaremBrofelem[3]?.shem}
                                                                                                        onSelectionChange={(val) => {
                                                                                                            updateMotsaremBrofelem(3,
                                                                                                                {
                                                                                                                    kmot: msbarBrofelemBretA ? msbarBrofelem - msbarBrofelemBretA : 0,
                                                                                                                    kmotYdnet: 0,
                                                                                                                    mher: parseFloat(((msbarBrofelemBretA ? msbarBrofelem - msbarBrofelemBretA : 0) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                    shem: val.currentKey,
                                                                                                                    remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                    message: '',
                                                                                                                    sogShem: 'שלדה פנימית חלק ב'
                                                                                                                });
                                                                                                        }
                                                                                                        }
                                                                                                    >
                                                                                                        {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                        ))}
                                                                                                        {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                        ))}
                                                                                                        {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                        ))}
                                                                                                    </DropdownMenu>
                                                                                                </Dropdown></th>
                                                                                                <th><Input value={((msbarBrofelemBretA ? msbarBrofelem - msbarBrofelemBretA : 0) || '')} isReadOnly color="primary" size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                                                <th></th>
                                                                                            </tr>
                                                                                        }
                                                                                        <tr>
                                                                                            <th colSpan={4}><Divider /></th>
                                                                                        </tr>

                                                                                        {
                                                                                            sogAgla === 'פתוחה' ?
                                                                                                <>
                                                                                                    <tr className="row-spacing">
                                                                                                        <th>
                                                                                                            <div className="group relative z-30">
                                                                                                                <Image width={70} alt="none" src={rep11} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                                                            </div>
                                                                                                        </th>
                                                                                                        <th>דלת</th>
                                                                                                        <th><RadioGroup value={aemRmbaAoRgel} onValueChange={(val) => {
                                                                                                            setAemRmbaAoRgel(val);
                                                                                                            if (val === 'רגיל') {
                                                                                                                updateMotsaremBrofelem(7,
                                                                                                                    {
                                                                                                                        kmot: 0,
                                                                                                                        kmotYdnet: 0,
                                                                                                                        mher: 0,
                                                                                                                        shem: 'בחר פריט',
                                                                                                                        remez: '',
                                                                                                                        message: '',
                                                                                                                        sogShem: ''
                                                                                                                    });
                                                                                                                updateMotsaremBrofelem(8,
                                                                                                                    {
                                                                                                                        kmot: 0,
                                                                                                                        kmotYdnet: 0,
                                                                                                                        mher: 0,
                                                                                                                        shem: 'בחר פריט',
                                                                                                                        remez: '',
                                                                                                                        message: '',
                                                                                                                        sogShem: ''
                                                                                                                    });
                                                                                                                setTvahHlokatRmba(0);
                                                                                                                setMsbarBrofelemHlokatRmba(0);
                                                                                                                setAorkhRmbaMsgertRmba(0);
                                                                                                                setTosftVnel(false);
                                                                                                                //handleInputChange(true, GetIndexMotsar('B1'), (mafenemMotsarem[GetIndexMotsar('B1')].kmot - (aorkhRmbaMsgertRmba * rohf)), 'kmot');
                                                                                                                setMotsaremLhatseg((prevItems) => [...prevItems, 'B8']);
                                                                                                                scrollToElement(MotsaremRefs.current[GetIndexMotsar('B8')].current);
                                                                                                                handleInputChange(false, GetIndexMotsar('B8'), rohf, 'kmot');
                                                                                                            }
                                                                                                            else {
                                                                                                                setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'B8'));

                                                                                                            }
                                                                                                        }} className="flex"><div className="flex mr-5"><Radio value="רגיל">רגיל</Radio><Radio value="רמפה">רמפה</Radio></div></RadioGroup></th>
                                                                                                        <th></th>
                                                                                                    </tr>
                                                                                                    {
                                                                                                        aemRmbaAoRgel === "רמפה" &&
                                                                                                        <>
                                                                                                            <tr className="row-spacing">
                                                                                                                <th>מסגרת רמפה</th>
                                                                                                                <th><Input type="number" value={aorkhRmbaMsgertRmbaSM || ''} onValueChange={(val) => setAorkhRmbaMsgertRmbaSM(parseFloat(val))} color="primary" size="sm" className="w-[130px]" label={`אורך רמפה בס"מ`} /></th>
                                                                                                                <th></th>
                                                                                                                <th><Dropdown dir="rtl">
                                                                                                                    <DropdownTrigger>
                                                                                                                        <Button size="xs" className='m-2'>
                                                                                                                            {motsaremBrofelem[7]?.shem}
                                                                                                                        </Button>
                                                                                                                    </DropdownTrigger>
                                                                                                                    <DropdownMenu
                                                                                                                        aria-label="Multiple selection example"
                                                                                                                        variant="flat"
                                                                                                                        closeOnSelect={true}
                                                                                                                        disallowEmptySelection
                                                                                                                        selectionMode="single"
                                                                                                                        selectedKeys={motsaremBrofelem[7]?.shem}
                                                                                                                        onSelectionChange={(val) => {

                                                                                                                            updateMotsaremBrofelem(7,
                                                                                                                                {
                                                                                                                                    kmot: (aorkhRmbaMsgertRmba * 2 + rohf * 2),
                                                                                                                                    kmotYdnet: 0,
                                                                                                                                    mher: parseFloat((((aorkhRmbaMsgertRmba * 2 + rohf * 2)) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                                    shem: val.currentKey,
                                                                                                                                    remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                                    message: '',
                                                                                                                                    sogShem: 'מסגרת רמפה'
                                                                                                                                });
                                                                                                                        }
                                                                                                                        }
                                                                                                                    >
                                                                                                                        {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                        ))}
                                                                                                                        {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                        ))}
                                                                                                                        {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
                                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                        ))}
                                                                                                                    </DropdownMenu>
                                                                                                                </Dropdown></th>
                                                                                                            </tr>
                                                                                                            <tr className="row-spacing">
                                                                                                                <th>חלוקת רמפה</th>
                                                                                                                <th><Input type="number" value={tvahHlokatRmba || ''} onValueChange={(val) => { setTvahHlokatRmba(val); setMsbarBrofelemHlokatRmba(parseInt(Math.floor((aorkhRmbaMsgertRmba / (val / 100)) - 1))); }} color="primary" size="sm" className="w-[100px]" label={`טווח בס"מ`} /></th>
                                                                                                                <th><Input type="number" value={msbarBrofelemHlokatRmba || ''} onValueChange={(val) => { setMsbarBrofelemHlokatRmba(val); setTvahHlokatRmba(formatNumber(((aorkhRmbaMsgertRmba / (parseFloat(val) + 1)) * 100))); }} color="primary" size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                                                                <th><Dropdown dir="rtl">
                                                                                                                    <DropdownTrigger>
                                                                                                                        <Button size="xs" className='m-2'>
                                                                                                                            {motsaremBrofelem[8]?.shem}
                                                                                                                        </Button>
                                                                                                                    </DropdownTrigger>
                                                                                                                    <DropdownMenu
                                                                                                                        aria-label="Multiple selection example"
                                                                                                                        variant="flat"
                                                                                                                        closeOnSelect={true}
                                                                                                                        disallowEmptySelection
                                                                                                                        selectionMode="single"
                                                                                                                        selectedKeys={motsaremBrofelem[8]?.shem}
                                                                                                                        onSelectionChange={(val) => {
                                                                                                                            updateMotsaremBrofelem(8,
                                                                                                                                {
                                                                                                                                    kmot: parseFloat(msbarBrofelemHlokatRmba * rohf),
                                                                                                                                    kmotYdnet: 0,
                                                                                                                                    mher: parseFloat(((msbarBrofelemHlokatRmba * rohf) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                                    shem: val.currentKey,
                                                                                                                                    remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                                    message: '',
                                                                                                                                    sogShem: 'חלוקת רמפה'
                                                                                                                                });
                                                                                                                        }
                                                                                                                        }
                                                                                                                    >
                                                                                                                        {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                        ))}
                                                                                                                        {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                        ))}
                                                                                                                        {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
                                                                                                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                        ))}
                                                                                                                    </DropdownMenu>
                                                                                                                </Dropdown></th>
                                                                                                            </tr>
                                                                                                            <tr className="row-spacing">
                                                                                                                <th>תוספת וניל</th>
                                                                                                                <th><div className="flex justify-start">
                                                                                                                    <Switch isSelected={tosftVnel} value={tosftVnel} defaultSelected={agla?.mafenem?.tosftVnel} onValueChange={(val) => {
                                                                                                                        // if (val) {
                                                                                                                        //     handleInputChange(false, GetIndexMotsar('B1'), (mafenemMotsarem[GetIndexMotsar('B1')].kmot + (aorkhRmbaMsgertRmba * rohf)), 'kmot');
                                                                                                                        //     scrollToElement(MotsaremRefs.current[GetIndexMotsar('B1')].current);
                                                                                                                        // }
                                                                                                                        // else {
                                                                                                                        //     handleInputChange(false, GetIndexMotsar('B1'), (mafenemMotsarem[GetIndexMotsar('B1')].kmot - (aorkhRmbaMsgertRmba * rohf)), 'kmot');
                                                                                                                        // }
                                                                                                                        setTosftVnel(val);
                                                                                                                    }}></Switch></div></th>
                                                                                                                <th></th>
                                                                                                                <th>{tosftVnel &&
                                                                                                                    <Dropdown dir="rtl">
                                                                                                                        <DropdownTrigger>
                                                                                                                            <Button size="xs" className='m-2'>
                                                                                                                                {motsaremBrofelem[12]?.shem}
                                                                                                                            </Button>
                                                                                                                        </DropdownTrigger>
                                                                                                                        <DropdownMenu
                                                                                                                            aria-label="Multiple selection example"
                                                                                                                            variant="flat"
                                                                                                                            closeOnSelect={true}
                                                                                                                            disallowEmptySelection
                                                                                                                            selectionMode="single"
                                                                                                                            selectedKeys={motsaremBrofelem[12]?.shem}
                                                                                                                            onSelectionChange={(val) => {
                                                                                                                                updateMotsaremBrofelem(12,
                                                                                                                                    {
                                                                                                                                        kmot: parseFloat(aorkhRmbaMsgertRmba * rohf),
                                                                                                                                        kmotYdnet: 0,
                                                                                                                                        mher: parseFloat(((aorkhRmbaMsgertRmba * rohf) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                                        shem: val.currentKey,
                                                                                                                                        remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                                        message: '',
                                                                                                                                        sogShem: 'חלוקת רמפה'
                                                                                                                                    });
                                                                                                                            }
                                                                                                                            }
                                                                                                                        >
                                                                                                                            {GetBrtemMotsarMlae('B1').arrayResualt.map((option) => (
                                                                                                                                <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                            ))}
                                                                                                                        </DropdownMenu>
                                                                                                                    </Dropdown>}</th>
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
                                                                                                        <th>סולם <RadioGroup value={solam} onValueChange={(val) => {
                                                                                                            setSolam(val);
                                                                                                            updateMotsaremBrofelem(9,
                                                                                                                {
                                                                                                                    kmot: 0,
                                                                                                                    kmotYdnet: 0,
                                                                                                                    mher: 0,
                                                                                                                    shem: 'בחר פריט',
                                                                                                                    remez: '',
                                                                                                                    message: '',
                                                                                                                    sogShem: ''
                                                                                                                });
                                                                                                            updateMotsaremBrofelem(10,
                                                                                                                {
                                                                                                                    kmot: 0,
                                                                                                                    kmotYdnet: 0,
                                                                                                                    mher: 0,
                                                                                                                    shem: 'בחר פריט',
                                                                                                                    remez: '',
                                                                                                                    message: '',
                                                                                                                    sogShem: ''
                                                                                                                });
                                                                                                            setGobahSolam(0);
                                                                                                            setMsbarBrofelemAofkeSolam(0);
                                                                                                            setMsbarBrofelemAnkhe(0);
                                                                                                            setAemDelet(false);
                                                                                                            setTosefetReshet(false);
                                                                                                            setTvahAnkheSolam(0);
                                                                                                            setTvahAofkeSolam(0);
                                                                                                        }} className="flex"><div className="flex mr-5 w-[150px]"><Radio value="רק קדמי">רק קדמי</Radio><Radio value="הכל">הכל</Radio></div></RadioGroup></th>
                                                                                                        {
                                                                                                            solam === 'הכל' &&
                                                                                                            <>
                                                                                                                <th><Switch isSelected={aemDelet} isReadOnly={aemRmbaAoRgel === 'רמפה'} value={aemDelet} onValueChange={(val) => {
                                                                                                                    setAemDelet(val);
                                                                                                                }}><div className="mr-3">עם דלת עליון</div></Switch></th>
                                                                                                                <th><Switch isSelected={tosefetReshet} value={tosefetReshet} onValueChange={(val) => {
                                                                                                                    setTosefetReshet(val);
                                                                                                                    if (val) {
                                                                                                                        handleInputChange(false, GetIndexMotsar('B3'), parseFloat(gobahSolam) * ((2 * parseFloat(aorkh)) + parseFloat(rohf)), 'kmot');
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        handleInputChange(false, GetIndexMotsar('B3'), mafenemMotsarem[GetIndexMotsar('B3')]?.kmot - (gobahSolam * ((2 * aorkh) + rohf)), 'kmot');
                                                                                                                    }
                                                                                                                }}><div className="mr-3">תוספת רשת</div></Switch></th>
                                                                                                            </>
                                                                                                        }
                                                                                                    </tr>
                                                                                                    <tr className="row-spacing">
                                                                                                        <th></th>
                                                                                                        <th>מסגרת סולם</th>
                                                                                                        <th><Input type="number" value={gobahSolamSM || ''} onValueChange={(val) => setGobahSolamSM(parseFloat(val))} color="primary" size="sm" className="w-[130px]" label={`גובה סולם בס"מ`} /></th>
                                                                                                        <th><Dropdown dir="rtl">
                                                                                                            <DropdownTrigger>
                                                                                                                <Button size="xs" className='m-2'>
                                                                                                                    {motsaremBrofelem[9]?.shem}
                                                                                                                </Button>
                                                                                                            </DropdownTrigger>
                                                                                                            <DropdownMenu
                                                                                                                aria-label="Multiple selection example"
                                                                                                                variant="flat"
                                                                                                                closeOnSelect={true}
                                                                                                                disallowEmptySelection
                                                                                                                selectionMode="single"
                                                                                                                selectedKeys={motsaremBrofelem[9]?.shem}
                                                                                                                onSelectionChange={(val) => {
                                                                                                                    if (solam === 'רק קדמי') {
                                                                                                                        updateMotsaremBrofelem(9,
                                                                                                                            {
                                                                                                                                kmot: parseFloat((gobahSolam * 2) + (rohf * 2)),
                                                                                                                                kmotYdnet: 0,
                                                                                                                                mher: parseFloat(((((gobahSolam * 2) + (rohf * 2))) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                                shem: val.currentKey,
                                                                                                                                remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                                message: '',
                                                                                                                                sogShem: 'מסגרת סולם'
                                                                                                                            });
                                                                                                                    } else if (solam === 'הכל' && !aemDelet) {
                                                                                                                        updateMotsaremBrofelem(9,
                                                                                                                            {
                                                                                                                                kmot: parseFloat(((gobahSolam * 4) + (rohf * 2)) + (aorkh * 4)),
                                                                                                                                kmotYdnet: 0,
                                                                                                                                mher: parseFloat((((((gobahSolam * 4) + (rohf * 2)) + (aorkh * 4))) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                                shem: val.currentKey,
                                                                                                                                remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                                message: '',
                                                                                                                                sogShem: 'מסגרת סולם'
                                                                                                                            });
                                                                                                                    }
                                                                                                                    else if (solam === 'הכל' && aemDelet) {
                                                                                                                        updateMotsaremBrofelem(9,
                                                                                                                            {
                                                                                                                                kmot: parseFloat(((((gobahSolam * 6) - 0.8) + (rohf * 4)) + (aorkh * 4)).toFixed(1)),
                                                                                                                                kmotYdnet: 0,
                                                                                                                                mher: parseFloat(((((((gobahSolam * 6) - 0.8) + (rohf * 4)) + (aorkh * 4))) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                                shem: val.currentKey,
                                                                                                                                remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                                message: '',
                                                                                                                                sogShem: 'מסגרת סולם'
                                                                                                                            });
                                                                                                                    }


                                                                                                                }
                                                                                                                }
                                                                                                            >
                                                                                                                {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                ))}
                                                                                                                {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                ))}
                                                                                                                {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
                                                                                                                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                ))}
                                                                                                            </DropdownMenu>
                                                                                                        </Dropdown></th>
                                                                                                    </tr>
                                                                                                    <tr className="row-spacing">
                                                                                                        <th>חלוקת סולם</th>
                                                                                                        <th><Input type="number" value={tvahAofkeSolam || ''} color="primary" onValueChange={(val) => {
                                                                                                            setTvahAofkeSolam(val);
                                                                                                            const reverseCalculatedValue = parseInt(Math.floor(((parseFloat(gobahSolam) - 0.4) / parseFloat(val)) - 1));
                                                                                                            setMsbarBrofelemAofkeSolam(reverseCalculatedValue);
                                                                                                        }} size="sm" className="w-[130px]" label={`טווח אופקי בס"מ`} /></th>
                                                                                                        <th><Input type="number" value={msbarBrofelemAofkeSolam || ''} color="primary" onValueChange={(val) => {
                                                                                                            setMsbarBrofelemAofkeSolam(val);
                                                                                                            const calculatedValue = parseFloat(((parseFloat(gobahSolam) - 0.4) / (parseFloat(val) + 1)).toFixed(2));
                                                                                                            setTvahAofkeSolam(calculatedValue);
                                                                                                        }
                                                                                                        } size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                                                        <th><Dropdown dir="rtl">
                                                                                                            <DropdownTrigger>
                                                                                                                <Button size="xs" className='m-2'>
                                                                                                                    {motsaremBrofelem[10]?.shem}
                                                                                                                </Button>
                                                                                                            </DropdownTrigger>
                                                                                                            <DropdownMenu
                                                                                                                aria-label="Multiple selection example"
                                                                                                                variant="flat"
                                                                                                                closeOnSelect={true}
                                                                                                                disallowEmptySelection
                                                                                                                selectionMode="single"
                                                                                                                selectedKeys={motsaremBrofelem[10]?.shem}
                                                                                                                onSelectionChange={(val) => {
                                                                                                                    if (solam === 'רק קדמי') {
                                                                                                                        updateMotsaremBrofelem(10,
                                                                                                                            {
                                                                                                                                kmot: parseFloat((msbarBrofelemAofkeSolam * rohf) + (msbarBrofelemAnkhe * (gobahSolam - 0.4)).toFixed(1)),
                                                                                                                                kmotYdnet: 0,
                                                                                                                                mher: parseFloat(((((msbarBrofelemAofkeSolam * rohf) + (msbarBrofelemAnkhe * (gobahSolam - 0.4)))) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                                shem: val.currentKey,
                                                                                                                                remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                                message: '',
                                                                                                                                sogShem: 'חלוקת סולם'
                                                                                                                            });
                                                                                                                    }
                                                                                                                    else if (solam === 'הכל') {
                                                                                                                        updateMotsaremBrofelem(10,
                                                                                                                            {
                                                                                                                                kmot: parseFloat((msbarBrofelemAofkeSolam * (parseFloat(rohf * (aemDelet ? 2 : 0)) + (aorkh * 2))) + (msbarBrofelemAnkhe * (gobahSolam - 0.4)).toFixed(1)),
                                                                                                                                kmotYdnet: 0,
                                                                                                                                mher: parseFloat(((((msbarBrofelemAofkeSolam * (parseFloat(rohf * (aemDelet ? 2 : 0)) + (aorkh * 2))) + (msbarBrofelemAnkhe * (gobahSolam - 0.4)))) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                                shem: val.currentKey,
                                                                                                                                remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                                message: '',
                                                                                                                                sogShem: 'חלוקת סולם'
                                                                                                                            });
                                                                                                                    }

                                                                                                                }
                                                                                                                }
                                                                                                            >
                                                                                                                {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                ))}
                                                                                                                {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                ))}
                                                                                                                {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
                                                                                                                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                ))}
                                                                                                            </DropdownMenu>
                                                                                                        </Dropdown></th>
                                                                                                    </tr>
                                                                                                    <tr className="row-spacing">
                                                                                                        <th></th>
                                                                                                        <th><Input type="number" value={tvahAnkheSolam || ''} color="primary" onValueChange={(val) => {
                                                                                                            setTvahAnkheSolam(val);
                                                                                                            if (solam === 'רק קדמי') {
                                                                                                                setMsbarBrofelemAnkhe(parseInt(Math.floor(((parseFloat(rohf)) / (parseFloat(val) / 100)) - 3)));
                                                                                                            }
                                                                                                            else if (solam === 'הכל' && aemDelet) {
                                                                                                                setMsbarBrofelemAnkhe(parseInt((Math.floor((parseFloat(rohf) / (parseFloat(val) / 100)) - 1) * 2) + (Math.floor((((parseFloat(aorkh) / (parseFloat(val) / 100)) - 1))) * 2)));
                                                                                                            }
                                                                                                            else {
                                                                                                                setMsbarBrofelemAnkhe(parseInt(Math.floor((parseFloat(rohf) / (parseFloat(val) / 100)) - 1) + (Math.floor((((parseFloat(aorkh) / (parseFloat(val) / 100)) - 1))) * 2)));
                                                                                                            }
                                                                                                        }} size="sm" className="w-[130px]" label={`טווח אנכי בס"מ`} /></th>
                                                                                                        <th><Input type="number" value={msbarBrofelemAnkhe || ''} color="primary" onValueChange={(val) => { setMsbarBrofelemAnkhe(val); setTvahAnkheSolam(0); }} size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                                                        <th></th>
                                                                                                    </tr>
                                                                                                </>
                                                                                                :
                                                                                                <>
                                                                                                    <tr className="row-spacing">
                                                                                                        <th>
                                                                                                            <div className="group relative z-30">
                                                                                                                <Image width={70} alt="none" src={rep81} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                                                            </div>
                                                                                                        </th>
                                                                                                        <th>וניל</th>
                                                                                                    </tr>
                                                                                                    <tr className="row-spacing">
                                                                                                        <th>סוג וניל</th>
                                                                                                        <th></th>
                                                                                                        <th></th>
                                                                                                        <th><Dropdown dir="rtl">
                                                                                                            <DropdownTrigger>
                                                                                                                <Button size="xs" className='m-2'>
                                                                                                                    {motsaremBrofelem[10]?.shem}
                                                                                                                </Button>
                                                                                                            </DropdownTrigger>
                                                                                                            <DropdownMenu
                                                                                                                aria-label="Multiple selection example"
                                                                                                                variant="flat"
                                                                                                                closeOnSelect={true}
                                                                                                                disallowEmptySelection
                                                                                                                selectionMode="single"
                                                                                                                selectedKeys={motsaremBrofelem[10]?.shem}
                                                                                                                onSelectionChange={(val) => {
                                                                                                                    updateMotsaremBrofelem(10,
                                                                                                                        {
                                                                                                                            kmot: parseFloat((gobahSolam * ((3 * aorkh) + (2 * rohf)) * 2)),
                                                                                                                            kmotYdnet: 0,
                                                                                                                            mher: parseFloat((((gobahSolam * ((3 * aorkh) + (2 * rohf)) * 2)) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                            shem: val.currentKey,
                                                                                                                            remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                            message: '',
                                                                                                                            sogShem: 'מסגרת סולם'
                                                                                                                        });


                                                                                                                }
                                                                                                                }
                                                                                                            >
                                                                                                                {GetBrtemMotsarMlae('B1').arrayResualt.map((option) => (
                                                                                                                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                ))}
                                                                                                            </DropdownMenu>
                                                                                                        </Dropdown></th>
                                                                                                    </tr>
                                                                                                    <tr className="row-spacing">
                                                                                                        <th>מסגרת וניל</th>
                                                                                                        <th><Input type="number" value={gobahSolamSM || ''} onValueChange={(val) => setGobahSolamSMgobahSolamSM(parseFloat(val))} color="primary" size="sm" className="w-[130px]" label={`גובה וניל בס"מ`} /></th>
                                                                                                        <th></th>
                                                                                                        <th><Dropdown dir="rtl">
                                                                                                            <DropdownTrigger>
                                                                                                                <Button size="xs" className='m-2'>
                                                                                                                    {motsaremBrofelem[9]?.shem}
                                                                                                                </Button>
                                                                                                            </DropdownTrigger>
                                                                                                            <DropdownMenu
                                                                                                                aria-label="Multiple selection example"
                                                                                                                variant="flat"
                                                                                                                closeOnSelect={true}
                                                                                                                disallowEmptySelection
                                                                                                                selectionMode="single"
                                                                                                                selectedKeys={motsaremBrofelem[9]?.shem}
                                                                                                                onSelectionChange={(val) => {
                                                                                                                    updateMotsaremBrofelem(9,
                                                                                                                        {
                                                                                                                            kmot: parseFloat((((2 * aorkh) + (4 * rohf) + (6 * gobahSolam)) + (msbarBrofelemAofkeSolam * 2 * (parseFloat(aorkh) + parseFloat(rohf))) + (msbarBrofelemAnkhe * gobahSolam)).toFixed(1)),
                                                                                                                            kmotYdnet: 0,
                                                                                                                            mher: parseFloat(((((2 * aorkh) + (4 * rohf) + (6 * gobahSolam)) + (msbarBrofelemAofkeSolam * 2 * (parseFloat(aorkh) + parseFloat(rohf))) + (msbarBrofelemAnkhe * gobahSolam)) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                            shem: val.currentKey,
                                                                                                                            remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                            message: '',
                                                                                                                            sogShem: 'מסגרת סולם'
                                                                                                                        });


                                                                                                                }
                                                                                                                }
                                                                                                            >
                                                                                                                {GetBrtemMotsarMlae('B4').arrayResualt.map((option) => (
                                                                                                                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                ))}
                                                                                                                {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                                                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                ))}
                                                                                                                {GetBrtemMotsarMlae('B6').arrayResualt.map((option) => (
                                                                                                                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                                                ))}
                                                                                                            </DropdownMenu>
                                                                                                        </Dropdown></th>
                                                                                                    </tr>
                                                                                                    <tr className="row-spacing">
                                                                                                        <th>חלוקת וניל</th>
                                                                                                        <th><Input type="number" value={tvahAofkeSolam || ''} color="primary" onValueChange={(val) => {
                                                                                                            setTvahAofkeSolam(val);
                                                                                                            const reverseCalculatedValue = parseInt(Math.floor(((parseFloat(gobahSolam)) / parseFloat(val)) - 1));
                                                                                                            setMsbarBrofelemAofkeSolam(reverseCalculatedValue);
                                                                                                        }} size="sm" className="w-[130px]" label={`טווח אופקי בס"מ`} /></th>
                                                                                                        <th><Input type="number" value={msbarBrofelemAofkeSolam || ''} color="primary" onValueChange={(val) => {
                                                                                                            setMsbarBrofelemAofkeSolam(val);
                                                                                                            const calculatedValue = parseFloat(((parseFloat(gobahSolam)) / (parseFloat(val) + 1)).toFixed(2));
                                                                                                            setTvahAofkeSolam(calculatedValue);
                                                                                                        }
                                                                                                        } size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                                                        <th></th>
                                                                                                    </tr>
                                                                                                    <tr className="row-spacing">
                                                                                                        <th></th>
                                                                                                        <th><Input type="number" value={tvahAnkheSolam || ''} color="primary" onValueChange={(val) => {
                                                                                                            setTvahAnkheSolam(val);
                                                                                                            setMsbarBrofelemAnkhe(parseInt((Math.floor((parseFloat(rohf) / (parseFloat(val) / 100)) - 1) * 2) + (Math.floor((((parseFloat(aorkh) / (parseFloat(val) / 100)) - 1))) * 2)));
                                                                                                        }} size="sm" className="w-[130px]" label={`טווח אנכי בס"מ`} /></th>
                                                                                                        <th><Input type="number" value={msbarBrofelemAnkhe || ''} color="primary" onValueChange={(val) => { setMsbarBrofelemAnkhe(val); setTvahAnkheSolam(0); }} size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                                                        <th></th>
                                                                                                    </tr>
                                                                                                </>
                                                                                        }
                                                                                    </>
                                                                                }
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
                                                                                    <th><Switch isSelected={aemTseba} defaultSelected={agla?.mafenem?.aemTseba} value={aemTseba} onValueChange={(val) => {
                                                                                        setAemTseba(val);
                                                                                    }}><div className=""></div></Switch></th>
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
                                                                                    <th><Switch isSelected={aemBashbashol} defaultSelected={agla?.mafenem?.aemBashbashol} isReadOnly={aemKafRetom} value={aemBashbashol} onValueChange={(val) => { setAemBashbashol(val) }}></Switch></th>
                                                                                    <th></th>
                                                                                </tr>
                                                                                <tr className="row-spacing">
                                                                                    <th>
                                                                                        <div className="group relative z-30">
                                                                                            <Image width={70} alt="none" src={rep37} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                                        </div>
                                                                                    </th>
                                                                                    <th>כף ריתום</th>
                                                                                    <th><Switch isSelected={aemKafRetom} defaultSelected={agla?.mafenem?.aemKafRetom} isReadOnly={aemBashbashol} value={aemKafRetom} onValueChange={(val) => { setAemKafRetom(val) }}></Switch></th>
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
                                                                                    <th><Switch isSelected={aemMekhalMaym} defaultSelected={agla?.mafenem?.aemMekhalMaym} value={aemMekhalMaym} onValueChange={(val) => setAemMekhalMaym(val)}></Switch></th>
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
                                                                                    <th><Switch isSelected={aemArgazKlem} defaultSelected={agla?.mafenem?.aemArgazKlem} value={aemArgazKlem} onValueChange={(val) => setAemArgazKlem(val)}></Switch></th>
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
                                                                                    <th><Switch isSelected={aemReglHnea} defaultSelected={agla?.mafenem?.aemReglHnea} value={aemReglHnea} onValueChange={(val) => setAemReglHnea(val)}></Switch></th>
                                                                                    <th></th>
                                                                                </tr>

                                                                                <tr>
                                                                                    <th colSpan={4}><Divider /></th>
                                                                                </tr>

                                                                                <tr className="row-spacing">
                                                                                    <th colSpan={3}>תוספת ידנית</th>
                                                                                    <th><Button onClick={() => setShowModalAddMotsarAher(true)} size="sm" color="primary" className="rounded-full"><FiPlus className="text-xl" /></Button></th>
                                                                                </tr>

                                                                                {
                                                                                    entries?.map((entry, index) => (
                                                                                        <>
                                                                                            {
                                                                                                (index !== 0) && <tr>
                                                                                                    <th colSpan={4}><Divider /></th>
                                                                                                </tr>
                                                                                            }
                                                                                            <tr className="row-spacing">
                                                                                                <th>{index + 1}</th>
                                                                                                <th><Dropdown dir="rtl">
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
                                                                                                        <DropdownItem key="מוצרים אחרים">מוצרים אחרים</DropdownItem>
                                                                                                    </DropdownMenu>
                                                                                                </Dropdown></th>
                                                                                                <th><Dropdown dir="rtl">
                                                                                                    <DropdownTrigger>
                                                                                                        <Button
                                                                                                            size="lg"
                                                                                                            className='m-2 max-w-[150px] w-full'
                                                                                                            isDisabled={!entries[index]?.category}
                                                                                                        >
                                                                                                            {entry.sogMotsar || 'בחר מוצר'}
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
                                                                                                                return <DropdownItem onClick={() => {
                                                                                                                    // setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== entry.remez));
                                                                                                                    // let res = ((entry.remez === 'B4') || (entry.remez === 'B5') || (entry.remez === 'B6') || (entry.remez === 'B1')) ? true : false;
                                                                                                                    // handleInputChange(res, GetIndexMotsar(entry.remez), 0, 'kmot');
                                                                                                                    // handleInputChange(res, GetIndexMotsar(entry.remez), 0, 'mher');
                                                                                                                    // handleInputChange(res, GetIndexMotsar(entry.remez), '', 'shem');
                                                                                                                    // handleInputChange(res, GetIndexMotsar(entry.remez), '', 'remez');
                                                                                                                    // handleInputChange(res, GetIndexMotsar(entry.remez), '', 'message');
                                                                                                                    handleEntriesChange(index, 'remez', cat.sog);
                                                                                                                }} key={cat?.shem}>{cat?.shem}</DropdownItem>
                                                                                                            })
                                                                                                        }
                                                                                                    </DropdownMenu>
                                                                                                </Dropdown></th>
                                                                                                <th><div onClick={() => {
                                                                                                    removeItem(index); setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== entry.remez));
                                                                                                    let res = ((entry.remez === 'B4') || (entry.remez === 'B5') || (entry.remez === 'B6') || (entry.remez === 'B1')) ? true : false;
                                                                                                    handleInputChange(res, GetIndexMotsar(entry.remez), 0, 'kmot');
                                                                                                    handleInputChange(res, GetIndexMotsar(entry.remez), 0, 'mher');
                                                                                                    handleInputChange(res, GetIndexMotsar(entry.remez), '', 'shem');
                                                                                                    handleInputChange(res, GetIndexMotsar(entry.remez), '', 'message');
                                                                                                }} className='ml-5 text-danger-500 hover:cursor-pointer w-full max-w-[150px]' >
                                                                                                    <div className="flex justify-center">
                                                                                                        <FaTrash className='text-2xl' />
                                                                                                    </div>
                                                                                                </div></th>

                                                                                            </tr>
                                                                                        </>
                                                                                    ))
                                                                                }

                                                                                <tr>
                                                                                    <th colSpan={4}><Button onClick={handleAddEntries} className='m-5'>
                                                                                        <FiPlus />
                                                                                    </Button></th>
                                                                                </tr>
                                                                            </>
                                                                        }
                                                                         <tr>
                                                                            <th colSpan={4}><Divider className="mt-[200px]" /></th>
                                                                        </tr>
                                                                    </thead>
                                                                </table>
                                                            }
                                                            {
                                                                (sogAskaAgla === 'הרכבת וו' || sogAskaa === 'הרכבת וו') &&
                                                                <table className="h-full">
                                                                    <thead>
                                                                        <tr className="row-spacing">
                                                                            <th><Avatar /></th>
                                                                            <th className="w-[150px]">וו גרירה</th>
                                                                            <th></th>
                                                                            <th></th>
                                                                        </tr>
                                                                    </thead>
                                                                </table>
                                                            }
                                                            {
                                                                (sogAskaAgla === 'תיקון' || sogAskaa === 'תיקון') &&
                                                                <div dir="ltr" className="overflow-auto h-[600px] w-full">
                                                                    <div />
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
                                                                                        <DropdownItem key="מוצרים אחרים">מוצרים אחרים</DropdownItem>
                                                                                    </DropdownMenu>
                                                                                </Dropdown>
                                                                                <Dropdown dir="rtl">
                                                                                    <DropdownTrigger>
                                                                                        <Button
                                                                                            size="lg"
                                                                                            className='m-2 max-w-[150px] w-full'
                                                                                            isDisabled={!entries[index]?.category}
                                                                                        >
                                                                                            {entry.sogMotsar || 'בחר מוצר'}
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
                                                                                                return <DropdownItem onClick={() => {
                                                                                                    // setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== entry.remez));
                                                                                                    // let res = ((entry.remez === 'B4') || (entry.remez === 'B5') || (entry.remez === 'B6') || (entry.remez === 'B1')) ? true : false;
                                                                                                    // handleInputChange(res, GetIndexMotsar(entry.remez), 0, 'kmot');
                                                                                                    // handleInputChange(res, GetIndexMotsar(entry.remez), 0, 'mher');
                                                                                                    // handleInputChange(res, GetIndexMotsar(entry.remez), '', 'shem');
                                                                                                    // handleInputChange(res, GetIndexMotsar(entry.remez), '', 'remez');
                                                                                                    // handleInputChange(res, GetIndexMotsar(entry.remez), '', 'message');
                                                                                                    handleEntriesChange(index, 'remez', cat.sog);
                                                                                                }} key={cat?.shem}>{cat?.shem}</DropdownItem>
                                                                                            })
                                                                                        }
                                                                                    </DropdownMenu>
                                                                                </Dropdown>
                                                                                <div onClick={() => {
                                                                                    removeItem(index); setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== entry.remez));
                                                                                    let res = ((entry.remez === 'B4') || (entry.remez === 'B5') || (entry.remez === 'B6') || (entry.remez === 'B1')) ? true : false;
                                                                                    handleInputChange(res, GetIndexMotsar(entry.remez), 0, 'kmot');
                                                                                    handleInputChange(res, GetIndexMotsar(entry.remez), 0, 'mher');
                                                                                    handleInputChange(res, GetIndexMotsar(entry.remez), '', 'shem');
                                                                                    handleInputChange(res, GetIndexMotsar(entry.remez), '', 'message');
                                                                                }} className='ml-5 text-danger-500 hover:cursor-pointer w-full max-w-[150px]' >
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
                                                                    </div>
                                                                </div>
                                                            }


                                                            <div className="w-[1200px] hidden absolute left-0 bottom-0 bg-white z-50 border-4 border-black">
                                                                <TofsTokhnetYetsor brtem={{
                                                                    shemLkoh: lkoh,
                                                                    msbar: agla?.msbar,
                                                                    sogAgla: sogAgla,
                                                                    tokhnetYetsor: {
                                                                        gobahSolamSM,
                                                                        aorkhRmbaMsgertRmbaSM,
                                                                        aorkhSM,
                                                                        rohfSM,
                                                                        msbarTsrem,
                                                                        aemBlamem,
                                                                        sogGlgalem,
                                                                        tsmegSber,
                                                                        hlokaTvah,
                                                                        hlokaMsbarBrofelem,
                                                                        aorkhBrofelSM,
                                                                        tvahBrofel,
                                                                        msbarBrofelem,
                                                                        msbarBrofelemBretA,
                                                                        helkBetBnmet,
                                                                        msbarBroflemBretB: ((msbarBrofelemBretA ? msbarBrofelem - msbarBrofelemBretA : 0) || ''),
                                                                        aemRmbaAoRgel,
                                                                        aorkhRmbaMsgertRmba,
                                                                        tvahHlokatRmba,
                                                                        msbarBrofelemHlokatRmba,
                                                                        tosftVnel,
                                                                        solam,
                                                                        gobahSolam,
                                                                        tvahAofkeSolam,
                                                                        msbarBrofelemAofkeSolam,
                                                                        tvahAnkheSolam,
                                                                        msbarBrofelemAnkhe,
                                                                        aemDelet,
                                                                        tosefetReshet,
                                                                        aemTseba,
                                                                        aemKafRetom,
                                                                        aemMekhalMaym,
                                                                        aemReglHnea
                                                                    }
                                                                    ,
                                                                    Brofelem: {
                                                                        hlokatSolam : motsaremBrofelem[10]?.shem,
                                                                        msgertSolam : motsaremBrofelem[9]?.shem,
                                                                        tserAehad : {sog : mafenemMotsarem[GetIndexMotsar('A1')]?.shem,kmot : mafenemMotsarem[GetIndexMotsar('A1')]?.kmot},
                                                                        tserShtem : {sog : mafenemMotsarem[GetIndexMotsar('A2')]?.shem,kmot : mafenemMotsarem[GetIndexMotsar('A2')]?.kmot},
                                                                        sogTsmeg: mafenemMotsarem[GetIndexMotsar('A3')]?.shem,
                                                                        sogTser: mafenemMotsarem[GetIndexMotsar('A10')]?.shem,
                                                                        brofelTfesa: motsaremBrofelem[4]?.shem,
                                                                        hlokaThtona: motsaremBrofelem[6]?.shem,
                                                                        msgeretThtona: motsaremBrofelem[5]?.shem,
                                                                        retsba1: motsaremBrofelem[11]?.shem,
                                                                        sboeler: mafenemMotsarem[GetIndexMotsar('B2')]?.shem,
                                                                        sheldaHetsonet: motsaremBrofelem[0]?.shem,
                                                                        hlokatSheldaA: ((helkBetBnmet ? (msbarBrofelemBretA || motsaremBrofelem[2].kmot) : (msbarBrofelem || 0)) || ''),
                                                                        hlokatSheldaAShem: motsaremBrofelem[2].shem,
                                                                        hlokatSheldaB: ((msbarBrofelemBretA ? msbarBrofelem - msbarBrofelemBretA : 0) || ''),
                                                                        hlokatSheldaBShem: motsaremBrofelem[3].shem,
                                                                        yetsolShem: motsaremBrofelem[1]?.shem,
                                                                        hzet: mafenemMotsarem[GetIndexMotsar('B9')]?.shem,
                                                                        dofn: mafenemMotsarem[GetIndexMotsar('B7')]?.shem,
                                                                        delet: mafenemMotsarem[GetIndexMotsar('B8')]?.shem,
                                                                        msgeretRmba: motsaremBrofelem[7]?.shem,
                                                                        hlokatRmba: motsaremBrofelem[8]?.shem,
                                                                        tosefetVnel: motsaremBrofelem[12]?.shem
                                                                    }



                                                                }} ref={componentRefTwo} />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                (agla?.msbar && sogAskaAgla === 'ייצור' && sogBaola === 'D') &&
                                <div className="w-full h-full flex pr-32 pl-32 pt-10 justify-center">
                                    {<ModalMessage show={showModalMessage} disable={() => setShowModalMessage(false)} Aeshor={(val) => setAeshor(val)} yetsor message={'האם אתה בטוח למכור העגלה!?'} />}
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
                                        <Heshvonet aosek={aosek} ref={componentRefOne} motsar={agla} msbarHeshvonet={counterHeshvoneot?.count} lkoh={lkohTfaol} />
                                    </div>
                                    <Divider className="w-[2px] h-full ml-5 mr-5" />
                                    <div className="w-full max-w-[700px] flex flex-col">
                                        <div className="flex justify-center bg-primary-200 p-2 rounded-2xl">
                                            עסקת מכירה
                                        </div>
                                        <div dir="rtl" className="mt-10 flex flex-col flex-grow">
                                            <RadioGroup className="mb-4" value={aosek} onValueChange={(e) => setAosek(e)}>
                                                <Radio value={'נגררי עירון'}>נגררי עירון</Radio>
                                                <Radio value={'מ.כ בטיחות בע"מ'}>מ.כ בטיחות בע"מ</Radio>
                                                <Radio value={'בלי חשבונית'}>בלי חשבונית</Radio>
                                            </RadioGroup>
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
                                (agla?.msbar && sogAskaAgla === 'הרכבת וו' && sogBaola === 'D') &&
                                <div className="w-full h-full flex pr-32 pl-32 pt-10 justify-center">
                                    {<ModalMessage show={showModalMessage} disable={() => setShowModalMessage(false)} Aeshor={(val) => setAeshor(val)} yetsor message={'האם אתה בטוח למכור הוו!?'} />}
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
                                        <Heshvonet aosek={aosek} ref={componentRefOne} msbarHeshvonet={counterHeshvoneot?.count} motsar={agla} lkoh={lkohTfaol} />
                                    </div>
                                    <Divider className="w-[2px] h-full ml-5 mr-5" />
                                    <div className="w-full max-w-[700px] flex flex-col">
                                        <div className="flex justify-center bg-primary-200 p-2 rounded-2xl">
                                            עסקת מכירה
                                        </div>
                                        <div dir="rtl" className="mt-10 flex flex-col flex-grow">
                                            <RadioGroup className="mb-4" value={aosek} onValueChange={(e) => setAosek(e)}>
                                                <Radio value={'נגררי עירון'}>נגררי עירון</Radio>
                                                <Radio value={'מ.כ בטיחות בע"מ'}>מ.כ בטיחות בע"מ</Radio>
                                                <Radio value={'בלי חשבונית'}>בלי חשבונית</Radio>
                                            </RadioGroup>
                                            <div>
                                                <Input color="primary" className="max-w-[200px] mb-5" isReadOnly label="לקןח" value={lkohTfaol?.name} />
                                            </div>
                                            <Divider />
                                            <div className="mt-5 flex justify-around items-center">
                                                <Avatar size="sm" />
                                                <div>הרכבת וו</div>
                                                <Input color="primary" className="max-w-[150px] mb-5" isReadOnly label="סכום" value={agla?.mherMkhera} />
                                            </div>
                                            <div className="mt-auto flex justify-end">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                (agla?.msbar && sogAskaAgla === 'תיקון' && sogBaola === 'D') &&
                                <div className="w-full h-full flex pr-32 pl-32 pt-10 justify-center">
                                    {<ModalMessage yetsor show={showModalMessage} disable={() => setShowModalMessage(false)} Aeshor={(val) => setAeshor(val)} message={'האם אתה בטוח למכור חלקים התיקון!?'} />}
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
                                        <Heshvonet aosek={aosek} msbarHeshvonet={counterHeshvoneot?.count} ref={componentRefOne} motsar={agla} lkoh={lkohTfaol} />
                                    </div>
                                    <Divider className="w-[2px] h-full ml-5 mr-5" />
                                    <div className="w-full max-w-[700px] flex flex-col">
                                        <div className="flex justify-center bg-primary-200 p-2 rounded-2xl">
                                            עסקת מכירה
                                        </div>
                                        <div dir="rtl" className="mt-10 flex flex-col flex-grow">
                                            <RadioGroup className="mb-4" value={aosek} onValueChange={(e) => setAosek(e)}>
                                                <Radio value={'נגררי עירון'}>נגררי עירון</Radio>
                                                <Radio value={'מ.כ בטיחות בע"מ'}>מ.כ בטיחות בע"מ</Radio>
                                                <Radio value={'בלי חשבונית'}>בלי חשבונית</Radio>
                                            </RadioGroup>
                                            <div>
                                                <Input color="primary" className="max-w-[200px] mb-5" isReadOnly label="לקןח" value={lkohTfaol?.name} />
                                            </div>
                                            <Divider />
                                            <div className="mt-5 flex justify-around items-center">
                                                <Avatar size="sm" />
                                                <div>תיקון</div>
                                                <Input color="primary" className="max-w-[150px] mb-5" isReadOnly label="סכום" value={agla?.mherMkhera} />
                                            </div>
                                            <div className="mt-auto flex justify-end">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                (agla?.msbar && sogAskaAgla === 'ייצור' && sogBaola === 'E') &&
                                <div dir="rtl" className="p-10">
                                    <div className="text-center mb-5 text-xl text-primary font-bold">
                                        ייצור עגלה
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">שם לקוח</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={lkohTfaol?.name + lkohTfaol?.lastname} />
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">מספר עגלה</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={agla?.msbarAgla} />
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">מחיר מכירה</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={formatNumberWithCommas(agla?.mherMkhera)} />
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">תאריך מכירה</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={agla?.tarekh} />
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">סוג עגלה</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={agla?.sogAgla} />
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">רווח נקי</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={123} />
                                    </div>
                                </div>
                            }

                            {
                                (agla?.msbar && sogAskaAgla === 'הרכבת וו' && sogBaola === 'E') &&
                                <div dir="rtl" className="p-10">
                                    <div className="text-center mb-5 text-xl text-primary font-bold">
                                        הרכבת וו
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">שם לקוח</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={lkohTfaol?.name + lkohTfaol?.lastname} />
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">מחיר מכירה</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={formatNumberWithCommas(agla?.mherMkhera)} />
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">תאריך מכירה</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={agla?.tarekh} />
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">רווח נקי</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={123} />
                                    </div>
                                </div>
                            }

                            {
                                (agla?.msbar && sogAskaAgla === 'תיקון' && sogBaola === 'E') &&
                                <div dir="rtl" className="p-10">
                                    <div className="text-center mb-5 text-xl text-primary font-bold">
                                        תיקון
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">שם לקוח</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={lkohTfaol?.name + lkohTfaol?.lastname} />
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">מחיר מכירה</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={formatNumberWithCommas(agla?.mherMkhera)} />
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">תאריך מכירה</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={agla?.tarekh} />
                                    </div>
                                    <div className="flex items-center mr-3 mb-3">
                                        <div className="w-[200px] text-primary">רווח נקי</div>
                                        <Input color="primary" variant='underlined' isReadOnly value={123} />
                                    </div>
                                </div>
                            }

                        </div>

                    </ModalBody>
                    <ModalFooter className="border-t-2 bg-white m-auto w-full items-center sticky bottom-0  z-40">
                        <div className="flex w-full">
                            <div>
                                {
                                    (agla?.msbar && (sogBaola !== 'E')) &&
                                    <Button onClick={async () => {
                                        await deleteDoc(doc(firestore, 'tfaol', agla?.id));
                                        ResetAll();
                                        disable();
                                    }} className='mr-5 ml-5 font-bold' color='danger' variant='flat'><FaTrash className="text-xl text-danger" />מחיקה</Button>
                                }
                            </div>

                            <div>
                                {
                                    (BdekatMtsavem() === 'C') &&
                                    <Button className='mr-5 ml-5 font-bold' color='primary' variant='flat' onClick={handelPrintggg}>
                                        <CgFileDocument className="text-2xl text-primary" />הדפסת תופס עובדים
                                    </Button>
                                }
                            </div>

                            <div className="flex justify-end w-full">
                                <Button className='mr-5 ml-5 font-bold' color='warning' variant='flat' onClick={() => { ResetAll(); disable(); }}>
                                    <CgClose className="text-2xl text-warning" />סגור
                                </Button>
                                {
                                    (agla?.msbar && sogBaola === 'D' && !Aeshor) ?
                                        <Button isDisabled={!aosek} className='mr-5 ml-5 font-bold' color='success' variant='flat' onClick={() => setShowModalMessage(true)}>
                                            <RxCheckCircled className="text-2xl text-success" />אישור
                                        </Button>
                                        :
                                        ((sogBaola) && (sogBaola === 'E')) ? null :
                                            <Button isDisabled={bdekatShmeratTfaol()} color='success' variant='flat' isLoading={loading} className='mr-5 ml-5 font-bold' onClick={() => { addValues(); handelPrintHeshvonit(); }}>
                                                <BsFillBookmarkCheckFill className="text-2xl text-success" />שמירה
                                            </Button>
                                }
                            </div>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}



