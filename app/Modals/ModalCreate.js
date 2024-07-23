'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, Radio, RadioGroup, Switch } from "@nextui-org/react";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import GetDocs from "../FireBase/getDocs";
import { useGetDataByCondition, useGetDataByConditionWithoutUseEffect } from "../FireBase/getDataByCondition";
import { MdCancel } from "react-icons/md";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { FaPlus, FaTrash } from "react-icons/fa";
import { format } from 'date-fns';
import { useCallback } from 'react';
import { RiErrorWarningFill } from "react-icons/ri";
import ModalMessage from "./ModalMessage";
import ModalAddProductCategory from "./ModalAddProductCategory";
import ModalBrokAgla from "./ModalBrokAgla";
import { FiPlus } from "react-icons/fi";
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


export default function ModalCreate({ show, disable, agla, lkohTfaol, sogAskaa, mlae, category, Tokhneot }) {
    const [loading, setLoading] = useState(false);
    const lkhot = GetDocs('customers');
    const [lkoh, setLkoh] = useState('');
    const [lkohMsbar, setLkohMsbar] = useState('');
    const aglot2 = useGetDataByCondition('drags', 'idcustomer', '==', lkohTfaol?.idnum || 0);
    const [aglot,setAglot] = useState([]);
    const router = useRouter();
    const [sogAgla, setSogAgla] = useState('פתוחה');
    const [mherKlale, setMherKlale] = useState(0);
    const [kveatMher, setKveatMher] = useState(false);
    const [hskmatLkoh, setHskmatLkoh] = useState(false);
    const [shaotAboda, setShaotAboda] = useState('');
    const [aorkh, setAorkh] = useState(0);
    const [rohf, setRohf] = useState(0);
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
    const [aorkhRmbaMsgertRmba, setAorkhRmbaMsgertRmba] = useState(0);
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


    const [modalHosfatLkoh, setModalHosfatLkoh] = useState(false);
    const [sogAskaAgla, setSogAskaAgla] = useState('');
    const [motsaremLhatseg, setMotsaremLhatseg] = useState([]);
    const [hkhnsot, setHkhnsot] = useState(0);
    const [hkhnsotHomreGlem, setHkhnsotHomreGlem] = useState(0);
    const [hotsotSkhar, setHotsaotSkhar] = useState(0);
    const [sogBaola, setSogBaola] = useState('');
    const [hshhyatYetsorZman, setHshhyatYetsorZman] = useState();
    const [motsaremBrofelem, setMotsaremBroflem] = useState([
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        },
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        },
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        },
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        },
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        },
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        },
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        }
        ,
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        }
        ,
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        },
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        },
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        }
        ,
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        }
        ,
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        }
        ,
        {
            kmot: 0,
            kmotYdnet: 0,
            mher: 0,
            shem: 'בחר פריט',
            remez: '',
            message: '',
            sogShem: ''
        }
    ]);
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
        return { arrayResualt: motsarMlae, alot, kmot };
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
        setMafenemMotsarem(initialMafenemMotsarem);
        setSogAskaAgla('');
        setLkoh('');
        setMherKlale(0);
        setKveatMher(false);
        setHskmatLkoh(false);
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
        setAorkhRmbaMsgertRmba(0);
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
        setSogBaola('');
        setShemTokhnet('');
        setTokhnetNokhhet(null);
        setAeshor(false);
        setHshhyatYetsorZman();
        setMotsaremBroflem([
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            },
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            },
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            },
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            },
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            },
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            },
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            }
            ,
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            }
            ,
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            },
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            },
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            }
            ,
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            }
            ,
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            }
            ,
            {
                kmot: 0,
                kmotYdnet: 0,
                mher: 0,
                shem: 'בחר פריט',
                remez: '',
                message: '',
                sogShem: ''
            }
        ]);
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
    useEffect(() => {
        if (agla) {
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
    }, [agla, lkoh]);
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
                    return newMafenemMotsarem;
                });
            }
        },
        [mafenemMotsarem, motsaremBrofelemSofe] // was setMafenemMotsarem
    );


    const MotsaremRefs = useRef(Array(51).fill(null).map(() => React.createRef()));
    const BrofelemRefs = useRef(Array(20).fill(null).map(() => React.createRef()));

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
                <Button isDisabled={isElse} size="xs" className='m-2'>
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

    const shehzorMotsarBrofel = (val) => {
        for (let index = 0; index < motsaremBrofelem.length; index++) {
            if (motsaremBrofelem[index].shem === val) {
                updateMotsaremBrofelem(index,
                    {
                        kmot: 0,
                        kmotYdnet: 0,
                        mher: 0,
                        shem: '',
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
                    {isElse && <MdCancel className="ml-20 text-3xl text-danger cursor-pointer" onClick={() => shehzorMotsarBrofel(item?.shem)} />}
                    <div className="w-[200px] rounded-xl flex items-center">
                        <div className="group relative z-20">
                            <Image width={70} alt="none" src={GetTmonatHelek(item?.remez)} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
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
                                                item?.message && (sogBaolaa !== 'C') ? "danger" : "primary"
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
                                                item?.message && (sogBaolaa !== 'C') ? "danger" : "primary"
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
                            color="primary"
                            label="מחיר"
                        />
                    </div>
                </div>

            </div>
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
        if (agla) {
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
                    aemSholam: false
                });

                if(agla){
                    if (BdekatMtsavem() === 'C') {
                        if (sogBaola !== 'C') {
                            await processItems(mafenemMotsarem, mlae);
                            await processItems(motsaremBrofelemSofe, mlae);
                        }
                        await updateInventory(firestore, mlae, mafenemMotsarem, agla?.newMafeneMotsarem, false);
                        await updateInventory(firestore, mlae, motsaremBrofelemSofe, agla?.motsaremBrofelemSofe, true);
                    }
                }
                else{
                    if (BdekatMtsavem() === 'C' || BdekatMtsavem() === 'D') {
                        if (sogBaola !== 'C' || sogBaola !== 'D') {
                            await processItems(mafenemMotsarem, mlae);
                            await processItems(motsaremBrofelemSofe, mlae);
                        }
                        await updateInventory(firestore, mlae, mafenemMotsarem, agla?.newMafeneMotsarem, false);
                        await updateInventory(firestore, mlae, motsaremBrofelemSofe, agla?.motsaremBrofelemSofe, true);
                    }
                }
                if (BdekatMtsavem() === 'E') {
                    await updateDoc(doc(firestore, 'customers', lkohTfaol?.id), {
                        yetera: lkohTfaol?.yetera + mherKlale
                    });
                    await updateDoc(doc(firestore, 'metadata', 'counterTfaol'), {
                        countESumAglotSumMunths : counter.countESumAglotForMunth !== format(new Date(), 'MM-yyyy') ? (counter.countESumAglotSumMunths + 1) : (1),
                        countE: counter.countE + 1,
                        countEAglot: counter.countEAglot + 1,
                        countESumAglot: counter.countESumAglot + mherKlale,
                        countEHnhotAglot: counter.countEHnhotAglot + hnha,
                        countESumHGAglot: counter.countESumHGAglot + hkhnsotHomreGlem,
                        countESumAglotMunth: counter.countESumAglotForMunth === format(new Date(), 'MM-yyyy') ? (counter.countESumAglotMunth + mherKlale) : (mherKlale),
                        countESumHnhotAglotMunth: counter.countESumAglotForMunth === format(new Date(), 'MM-yyyy') ? (counter.countESumHnhotAglotMunth + hnha) : (hnha),
                        countESumHGAglotMunth: counter.countESumAglotForMunth === format(new Date(), 'MM-yyyy') ? (counter.countESumHGAglotMunth + hkhnsotHomreGlem) : (hkhnsotHomreGlem),
                        countESumAglotForMunth: format(new Date(), 'MM-yyyy'),

                    });
                    await updateDoc(doc(firestore, 'metadata','counterNekoeMaam'), {
                        countHotsaotMaam: counterNekoeMaam.munth === format(new Date(),'dd-MM-yyyy') ? (counterNekoeMaam.countHotsaotMaam + (mherKlale * 0.17)) : (mherKlale * 0.17),
                        munth : format(new Date(),'dd-MM-yyyy')
                    });
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
                console.log(e);
            }
        }
        !agla && await updateDoc(doc(firestore, 'metadata', counter?.id), { count: counter?.count + 1 });
        ResetAll();
        disable();
        setLoading(false);
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

    useEffect(() => {
        if (agla) {
            setMotsaremBrofelemSofe(reduceArray(true));
        }
        else {
            setMotsaremBrofelemSofe(reduceArray());
        }
    }, [motsaremBrofelem]);


    const prevRemzemRef = useRef();
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
            setMafenemMotsarem(initialMafenemMotsarem);
        }
    }, [Remzem]);

    useEffect(() => {
        console.log(motsaremLhatseg);
        const updateMotsaremLhatseg = (itemsToAdd, itemsToRemove) => {
            setMotsaremLhatseg((prevItems) => {
                const filteredItems = prevItems.filter(item => !itemsToRemove.includes(item));
                return [...filteredItems, ...itemsToAdd];
            });
        };
        if (sogAskaAgla === 'ייצור' || sogAskaa === 'ייצור') {
            const itemsToAdd = ['F4', 'F5', 'F6', 'F7', 'F3', 'E1', 'E2', 'E3', 'E4', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C10', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'A8'];
            const itemsToRemove = [...itemsToAdd];
            if (sogAgla) {
                updateMotsaremLhatseg(itemsToAdd, []);
            } else {
                updateMotsaremLhatseg([], itemsToRemove);
            }
        } else if (sogAskaAgla === 'הרכבת וו' || sogAskaa === 'הרכבת וו') {
            const itemsToAdd = ['J1'];
            const itemsToRemove = ['J1'];
            updateMotsaremLhatseg(itemsToAdd, []);
        }
        else if(sogAskaAgla === 'תיקון' || sogAskaa === 'תיקון'){
            const itemsToAdd = [];
            const itemsToRemove = [];
            updateMotsaremLhatseg(itemsToAdd, []);
        }
    }, [show]);


    useEffect(() => {
        if (aorkh && rohf) {
            let newArray = [];
            for (let index = 0; index < mafenemMotsarem.length; index++) {
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
            setMafenemMotsarem(newArray);
        }
    }, [aorkh, rohf])
    useEffect(() => {
        let remzemd = sogAgla === 'פתוחה' ? ['B7', 'B2', 'B9'] : [];
        if (rohf && aorkh) {
            setMotsaremLhatseg((prevItems) => [...prevItems, ...remzemd]);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => !remzemd.includes(item)));
            setShemTokhnet('');
            setTokhnetNokhhet(null);
        }
    }, [aorkh, rohf]);
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
    function GetIndexMotsar(remez1) {
        for (let index = 0; index < mafenemMotsarem?.length; index++) {
            if (mafenemMotsarem[index]?.remez === remez1) {
                return index;
            }
        }
        return null;
    }
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
    }, [sogAskaAgla, agla, lkoh]);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorMessageText, setErrorMessageText] = useState('');
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
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [Aeshor, setAeshor] = useState(null);
    const [showModalCategoryAgla, setShowModalCategoryAgla] = useState(false);
    const [showModalBerokAgla, setShowModalBerokAgla] = useState(false);
    const [entries, setEntries] = useState([{ category: '', sogMotsar: '', shemMotsar: '', remez: '', message: '' }]);
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
        for (let index = 0; index < mafenemMotsarem.length; index++) {
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
    const componentRefOne = useRef();
    const handelPrintHeshvonit = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRefOne.current,
    });
    const componentRefTwo = useRef();
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

    const [tokhnetNokhhet, setTokhnetNokhhet] = useState(null);
    const [shemTokhnet, setShemTokhnet] = useState('');

    useEffect(() => {
        if (tokhnetNokhhet) {
            if (tokhnetNokhhet?.motsarem?.length) {
                for (let index = 0; index < tokhnetNokhhet?.motsarem.length; index++) {
                    handleInputChange(false, GetIndexMotsar(tokhnetNokhhet?.motsarem[index].remez), tokhnetNokhhet?.motsarem[index].kmot, 'kmot');
                }
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

    const GetZmanAbodaMotsar = (val) => {
        for (let index = 0; index < category.length; index++) {
            for (let index1 = 0; index1 < category[index].motsarem.length; index1++) {
                if (category[index].motsarem[index1].sog === val) {
                    return category[index].motsarem[index1].zmanAboda;
                }
            }
        }
    }

    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < mafenemMotsarem?.length; index++) {
            if (mafenemMotsarem[index].kmot > 0) {
                sum += GetZmanAbodaMotsar(mafenemMotsarem[index].remez) * mafenemMotsarem[index].kmot;
            }
        }
        for (let index = 0; index < motsaremBrofelemSofe?.length; index++) {
            if (motsaremBrofelemSofe[index].kmot > 0) {
                sum += GetZmanAbodaMotsar(motsaremBrofelemSofe[index].remez) * motsaremBrofelemSofe[index].kmot;
            }
        }
        setHotsaotSkhar(parseFloat((sum * (counterShaotAboda?.hotsaotSkharYetsor / counterShaotAboda?.shaotKodmetYestsor)).toFixed(0)));
    }, [mafenemMotsarem, motsaremBrofelemSofe]);

    const refggg = useRef(null);
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

    useEffect(() => {
        if(lkohMsbar || agla?.msbarLkoh){
            const unsubscribe = useGetDataByConditionWithoutUseEffect(
                'drags',
                'idcustomer',
                '==',
                (lkohMsbar || agla?.msbarLkoh),
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
    },[lkohMsbar,agla?.msbarLkoh]);

    const bdekatShmeratTfaol = () => {
        if(sogAskaAgla){
            if((BdekatMtsavem() !== sogBaola) || BdekatHeshtnotKmotmotsarem()){
                console.log(123);
                return false;
            }
            else{
                return true;
            }
        }
        else{
            if(BdekatMtsavem()){
                return false;
            }
            else{
                return true;
            }
        }
    }


    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="full" isOpen={show} onClose={() => {
            ResetAll();
            disable();
        }}>
            <ModalContent>
                <>
                    <ModalBody className="border-b-2">

                        <div className="w-full h-screen">
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
                                ((!agla && sogAskaa !== '') || (agla && sogAskaAgla !== 'סוג עסקה' && sogAskaAgla !== '' && (sogBaola === 'A' || sogBaola === 'B' || sogBaola === 'C'))) &&
                                <div className="h-full w-full flex">
                                    <div className="w-1/5 h-full border-r-2 border-black">
                                        <div className="flex justify-center items-center h-full">
                                            <div className="w-full">
                                                <div className="flex justify-center">
                                                    <div className="mr-9 w-full bg-gradient-to-r from-gray-300 to-gray-700 text-center p-4 rounded-full sticky top-0 z-50 tracking-wider text-white font-bold text-xl">
                                                        תמחיר
                                                    </div>
                                                </div>
                                                <div className="flex justify-center mt-10 mb-3">
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-green-500">מחיר שוק</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${formatNumberWithCommas(mherKlale || "")}`} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-danger-500">הנחה</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${(hnha || "")}`} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-success-500">מחיר מכירה</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${formatNumberWithCommas((mherKlale - hnha) || "")}`} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-danger-500">הוצאות חו"ג</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${hkhnsotHomreGlem || ""}`} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-danger-500">הוצאות שכר</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${hotsotSkhar || ""}`} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-green-500">רווח ישיר</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${formatNumberWithCommas((mherKlale - hkhnsotHomreGlem - hotsotSkhar) || "")}`} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-danger-500">הוצאות עקיפות</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${'0'}`} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-success-500">רווח לפני מס</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${'0'}`} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-danger-500">השפעת מע"ם</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪${formatNumberWithCommas(parseInt(mherKlale * 0.17) || "")}`} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-green-500">רווח נקי</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪${formatNumberWithCommas(((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) || "")}`} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-5">
                                                    <div className="flex items-center flex-wrap w-full justify-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-green-500">אחוז רווח</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`%${getDigitsAfterDot((((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) / mherKlale) || "")}`} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full h-full">
                                        <div className="w-full h-[300px]">
                                            <div dir="rtl" className="w-full h-full">
                                                <div className="w-full bg-gradient-to-r from-gray-300 to-gray-700 text-center p-4 rounded-full sticky top-0 z-50 tracking-wider text-white font-bold text-xl">
                                                    <div className="w-full flex justify-center items-center">
                                                        <div className="ml-3 mr-3">שלבי עבודה</div>
                                                    </div>
                                                </div>
                                                <div className="flex w-full h-full border-b-2 border-black justify-around items-center">
                                                    {
                                                        BdekatMtsavem() === 'A' ?
                                                            <div className="rounded-xl min-w-[90px]">
                                                                <Divider className="bg-primary h-[1px]" />
                                                                <div className="tracking-widest w-full text-black font-extrabold text-2xl p-1 mb-3 text-center transform transition-transform hover:scale-105 flex items-center h-[300px]">
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
                                                                                        <AutocompleteItem onClick={() => {setLkohMsbar(lko.idnum);setHskmatLkoh(false);}} className='text-right' key={lko?.name} value={lko?.name}>
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
                                                                    <Input size="xs" type="number" value={mherKlale || ''} onValueChange={(val) => {setMherKlale(val);
                                                                        if(!val){
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
                                                                <Switch isSelected={kveatMher} isReadOnly={agla?.thlkhem?.kveatMher || (sogAskaa || sogAskaAgla) === 'ייצור' ? (!mherKlale || !hskmatLkoh || !msbarTsrem || !sogGlgalem || !aorkhBrofel || !msbarBrofelem || !aemRmbaAoRgel)
                                                                    : (sogAskaa || sogAskaAgla) === 'הרכבת וו' ? (mafenemMotsarem[GetIndexMotsar('J1')].kmot === 0) 
                                                                    : (true)
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
                                                                <Switch isSelected={thelatYetsor} onClick={BdekatKolKmoeotHmotsarem} isReadOnly={agla?.thlkhem?.thelatYetsor || BdekatKolKmoeotHmotsaremfff() || !kveatMher} defaultSelected={agla?.thlkhem?.thelatYetsor} value={thelatYetsor} onValueChange={(val) => {setThelatYetsor(val);
                                                                    if(!val){
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
                                                                                <Input size="sm" color="primary" className="max-w-[200px]" isReadOnly label="מספר עגלה" value={agla?.msbarAgla} />
                                                                            </>

                                                                            :
                                                                            <div className="flex justify-center items-center">
                                                                                <Autocomplete
                                                                                    isDisabled={!hskmatLkoh}
                                                                                    label="מספר עגלה"
                                                                                    className="max-w-[200px]"
                                                                                    size="sm"
                                                                                    color="primary"
                                                                                    defaultItems={aglot}
                                                                                    onSelectionChange={setMsbarAgla}
                                                                                    onInputChange={(val) => { setMsbarAgla(val); setSeomReshion(false); }}
                                                                                >
                                                                                    {
                                                                                        aglot?.map((agla, index) => (
                                                                                            <AutocompleteItem onClick={() => setSeomReshion(false)} className='text-right' key={agla?.licenseid} value={agla?.licenseid}>
                                                                                                {agla?.licenseid}
                                                                                            </AutocompleteItem>
                                                                                        ))
                                                                                    }

                                                                                </Autocomplete>
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
                                            </div>
                                        </div>
                                        <div className="w-full h-full">
                                            <div className="w-full h-full flex pt-[67px]">
                                                <div className="w-full h-full border-r-2 border-black">
                                                    <div dir="rtl" className="w-full h-full overflow-y-auto overflow-x-hidden">
                                                        <div className="w-full bg-gradient-to-r from-gray-300 to-gray-700 text-center p-4 rounded-full sticky top-0 z-50 tracking-wider text-white font-bold text-xl">
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
                                                        <div className="mt-[500px]"></div>
                                                    </div>
                                                </div>
                                                <div className="w-full h-full">
                                                    <div className="w-full h-full overflow-auto">
                                                        <div className="w-full bg-gradient-to-r from-gray-300 to-gray-700 text-center p-4 rounded-full sticky top-0 z-50 tracking-wider text-white font-bold text-xl">
                                                            <div className="items-center w-full flex justify-around">
                                                                <div>
                                                                    <Dropdown dir="rtl">
                                                                        <DropdownTrigger>
                                                                            <Button isDisabled={!aorkh || !rohf} color="primary">
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
                                                                            {Tokhneot.map((option) => (
                                                                                <DropdownItem onClick={() => setTokhnetNokhhet(option)} key={option.shem}>{option.shem}</DropdownItem>
                                                                            ))}
                                                                        </DropdownMenu>
                                                                    </Dropdown>

                                                                </div>
                                                                <div>תוכנית יצור</div>
                                                            </div>
                                                        </div>

                                                        <div dir="rtl" className="w-full flex justify-center">
                                                            {
                                                                motsaremBrofelem && (sogAskaAgla === 'ייצור' || sogAskaa === 'ייצור') && <table className="h-full">
                                                                    <thead>
                                                                        {
                                                                            !agla &&
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
                                                                            sogAgla === 'פתוחה' ?
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
                                                                                        <th><Input value={aorkh || ""} onValueChange={(val) => {
                                                                                            setAorkh(val); setTvahBrofel(''); setMsbarBrofelem('');
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
                                                                                        }} color="primary" size="sm" className="w-[100px]" label="אורך" type="number" /></th>
                                                                                        <th><Input value={rohf || ""} onValueChange={(val) => { setRohf(val); setTvahBrofel(''); setMsbarBrofelem(''); }} color="primary" size="sm" className="w-[100px]" label="רוחב" type="number" /></th>
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
                                                                                                        <th><Input type="number" value={hlokaTvah || ''} onValueChange={(val) => { setHlokaTvah(val); setHlokaMsbarBrofelem(parseInt(Math.floor((aorkh / (val / 100)) - 1))); }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
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
                                                                                                <th><Input type="number" value={aorkhBrofel || ''} onValueChange={(val) => {
                                                                                                    setAorkhBrofel(parseFloat(val));
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

                                                                                                }} color="primary" size="sm" className="w-[100px]" label="אורך פרופיל" /></th>
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


                                                                                                }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
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
                                                                                                        <th><Input type="number" value={aorkhRmbaMsgertRmba || ''} onValueChange={(val) => setAorkhRmbaMsgertRmba(parseFloat(val))} color="primary" size="sm" className="w-[100px]" label="אורך רמפה" /></th>
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
                                                                                                        <th><Input type="number" value={tvahHlokatRmba || ''} onValueChange={(val) => { setTvahHlokatRmba(val); setMsbarBrofelemHlokatRmba(parseInt(Math.floor((aorkhRmbaMsgertRmba / (val / 100)) - 1))); }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
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
                                                                                                <th><Input type="number" value={gobahSolam || ''} onValueChange={(val) => setGobahSolam(parseFloat(val))} color="primary" size="sm" className="w-[100px]" label="גובה סולם" /></th>
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
                                                                                                }} size="sm" className="w-[100px]" label="טווח אופקי" /></th>
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
                                                                                                }} size="sm" className="w-[100px]" label="טווח אנכי" /></th>
                                                                                                <th><Input type="number" value={msbarBrofelemAnkhe || ''} color="primary" onValueChange={(val) => { setMsbarBrofelemAnkhe(val); setTvahAnkheSolam(0); }} size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                                                <th></th>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <th colSpan={4}><Divider /></th>
                                                                                            </tr>
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
                                                                                        <th colSpan={4}><Divider className="mt-[500px]" /></th>
                                                                                    </tr>
                                                                                </>
                                                                                :
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
                                                                                        <th><Input value={aorkh || ""} onValueChange={(val) => {
                                                                                            setAorkh(val); setTvahBrofel(''); setMsbarBrofelem('');
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
                                                                                        }} color="primary" size="sm" className="w-[100px]" label="אורך" type="number" /></th>
                                                                                        <th><Input value={rohf || ""} onValueChange={(val) => { setRohf(val); setTvahBrofel(''); setMsbarBrofelem(''); }} color="primary" size="sm" className="w-[100px]" label="רוחב" type="number" /></th>
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
                                                                                                                    kmot: parseFloat((aorkh * rohf).toFixed(1)),
                                                                                                                    kmotYdnet: 0,
                                                                                                                    mher: parseFloat(((aorkh * rohf) * GetBrtemMotsarMlae(GetShemMotsarCategoryBret(val.currentKey), val.currentKey).alot).toFixed(1)),
                                                                                                                    shem: val.currentKey,
                                                                                                                    remez: GetShemMotsarCategoryBret(val.currentKey),
                                                                                                                    message: '',
                                                                                                                    sogShem: 'פרופיל תפיסה'
                                                                                                                });                                                                                                            //val.currentKey && scrollToElement(BrofelemRefs?.current[GetBrofelMtaemLscroll(val.currentKey)]?.current);
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
                                                                                                                    });                                                                                                                //val.currentKey && scrollToElement(BrofelemRefs?.current[GetBrofelMtaemLscroll(val.currentKey)]?.current);
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
                                                                                                        <th><Input type="number" value={hlokaTvah || ''} onValueChange={(val) => { setHlokaTvah(val); setHlokaMsbarBrofelem(parseInt(Math.floor((aorkh / (val / 100)) - 1))); }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
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
                                                                                                <th><Input type="number" value={aorkhBrofel || ''} onValueChange={(val) => {
                                                                                                    setAorkhBrofel(parseFloat(val));
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

                                                                                                }} color="primary" size="sm" className="w-[100px]" label="אורך פרופיל" /></th>
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


                                                                                                }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
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
                                                                                                <th><Input type="number" value={gobahSolam || ''} onValueChange={(val) => setGobahSolam(parseFloat(val))} color="primary" size="sm" className="w-[100px]" label="גובה וניל" /></th>
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
                                                                                                }} size="sm" className="w-[100px]" label="טווח אופקי" /></th>
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
                                                                                                }} size="sm" className="w-[100px]" label="טווח אנכי" /></th>
                                                                                                <th><Input type="number" value={msbarBrofelemAnkhe || ''} color="primary" onValueChange={(val) => { setMsbarBrofelemAnkhe(val); setTvahAnkheSolam(0); }} size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                                                <th></th>
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
                                                                                                <th colSpan={4}><Divider className="mt-[500px]" /></th>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <th colSpan={4}><Divider className="mt-[500px]" /></th>
                                                                                            </tr>

                                                                                        </>
                                                                                    }
                                                                                </>
                                                                        }
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
                                                                <div dir="ltr" className="overflow-auto h-[600px]">
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
                                                                                                return <DropdownItem onClick={() => { handleEntriesChange(index, 'remez', cat.sog); }} key={cat?.shem}>{cat?.shem}</DropdownItem>
                                                                                            })
                                                                                        }
                                                                                    </DropdownMenu>
                                                                                </Dropdown>
                                                                                <div onClick={() => { removeItem(index); setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== entry.remez)); }} className='ml-5 text-danger-500 hover:cursor-pointer w-full max-w-[150px]' >
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


                                                            <div className="w-[900px] hidden">
                                                                <TofsTokhnetYetsor brtem={{
                                                                    shemLkoh: lkohTfaol?.name,
                                                                    msbar: agla?.msbar,
                                                                    sogAgla: sogAgla,
                                                                    tokhnetYetsor: {
                                                                        aorkh,
                                                                        rohf,
                                                                        msbarTsrem,
                                                                        aemBlamem,
                                                                        sogGlgalem,
                                                                        tsmegSber,
                                                                        hlokaTvah,
                                                                        hlokaMsbarBrofelem,
                                                                        aorkhBrofel,
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
                                (agla && sogAskaAgla === 'ייצור' && sogBaola === 'D') &&
                                <div className="w-full h-full flex p-32 justify-center">
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
                                (agla && sogAskaAgla === 'הרכבת וו' && sogBaola === 'D') &&
                                <div className="w-full h-full flex p-32 justify-center">
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
                                (agla && sogAskaAgla === 'תיקון' && sogBaola === 'D') &&
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
                                                <div>תיקון</div>
                                                <Input color="primary" className="max-w-[150px] mb-5" isReadOnly label="סכום" value={agla?.mherMkhera} />
                                            </div>
                                            <div className="mt-auto flex justify-end">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                    </ModalBody>
                    <ModalFooter className="border-t-2 m-auto w-full items-center sticky bottom-0 bg-white z-40">
                        <div className="flex w-full">
                            {
                                agla &&
                                <Button onClick={async () => {
                                    await deleteDoc(doc(firestore, 'tfaol', agla?.id));
                                    ResetAll();
                                    disable();
                                }} color="danger" className='mr-5 ml-5' size="lg"><FaTrash />מחיקה</Button>
                            }
                            <div className="flex justify-end w-full">
                                <Button size="lg" className='mr-5 ml-5' color="primary" variant="bordered" onClick={() => { ResetAll(); disable(); }}>
                                    סגור
                                </Button>
                                {
                                    (agla && sogBaola === 'D' && !Aeshor) ?
                                        <Button size="lg" className='mr-5 ml-5' color="primary" onClick={() => setShowModalMessage(true)}>
                                            אישור
                                        </Button>
                                        :
                                        <Button isDisabled={bdekatShmeratTfaol()} isLoading={loading} size="lg" className='mr-5 ml-5' color="primary" onClick={() => { addValues(); handelPrintHeshvonit(); }}>
                                            שמירה
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



