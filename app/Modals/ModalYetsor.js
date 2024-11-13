'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Pagination, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch, Tooltip, DatePicker, Accordion, AccordionItem, Popover, PopoverTrigger, PopoverContent, Textarea, Progress } from "@nextui-org/react";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaBars, FaBeer, FaPlus, FaRegCheckSquare, FaUser } from "react-icons/fa";
import GetDocs from "../FireBase/getDocs";
import { MdKeyboardArrowDown, MdMoreHoriz } from "react-icons/md";
import ModalYetsorTokhnet from "./ModalYetsorTokhnet";
import ModalBerotMotsrem from "./ModalBerotMotsrem";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { addDays, format, isFriday, parse } from "date-fns";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { GrCertificate } from "react-icons/gr";
import { FaShekelSign } from "react-icons/fa6";
import { PiClockBold } from "react-icons/pi";
import ModalMtsavYetsor from "./ModalMtsavYetsor";
import ModalMessage from "./ModalMessage";
import { MdError } from "react-icons/md";
import { Alert, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { firestore } from "../FireBase/firebase";
import { addDoc, collection, deleteDoc, doc, updateDoc, writeBatch } from "firebase/firestore";
import TokhnetContext from "../auth/TokhnetContext";
import { CgFileDocument } from "react-icons/cg";
import { TofsTokhnetYetsor } from "../Page Components/TofsTokhnetYetsor";
import { useReactToPrint } from "react-to-print";
import { AnimatePresence, motion } from "framer-motion";
import ModalAddCustomer from "./ModalAddCustomer";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LiaCommentSolid } from "react-icons/lia";
import { Comment, Hourglass, Puff, ThreeCircles } from "react-loader-spinner";
import { MtsavemPage } from "../Page Components/MtsavemPage";
import { RiFileList3Fill } from "react-icons/ri";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

export default function ModalYetsor({ show, disable, Tokhneot, locationYetsor, drag, yetsorKeam, category, lkhot, aglot, mlae, sogAskaa }) {



    const [loading, setLoading] = useState(false);
    const PrintRef = useRef();
    // ---------------------------------------------------------------------------------------- hotsaot 
    const [hotsotAkefot, setHotsaotAkefot] = useState(0);
    const [hotsotSkhar, setHotsaotSkhar] = useState(0);
    const [hkhnsotHomreGlem, setHkhnsotHomreGlem] = useState(0);

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertMessage, setShowAlertMessage] = useState('');
    const [showAlertType, setShowAlertType] = useState('');

    // ---------------------------------------------------------------------------------------- aglot Lkoh

    // ---------------------------------------------------------- aglot Lkoh -- (functions)
    const [locationYetsorAgla,setLocationYetsorAgla] = useState('');
    const componentRefTwo = useRef();
    const [aosek, setAosek] = useState('');
    const metadata = GetDocs('metadata');
    const counter = metadata.find((count) => count.id === 'counterTfaol');
    const counterShaotAboda = metadata.find((count) => count.id === 'counterShaotAboda');
    const counterNekoeMaam = metadata.find((count) => count.id === 'counterNekoeMaam');
    const counterHeshvoneot = metadata.find((count) => count.id === 'counterHeshvoneot');
    const counterLkhot = metadata.find((count) => count.id === 'counterLkhot');

    // ---------------------------------------------------------------------------------------- lkoh
    const [brtemLkoh, setBrtemLkoh] = useState(null);
    const [lkohHdash, setLkohHdash] = useState(false);
    const [lkohForAdd, setLkohForAdd] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerCity, setCustomerCity] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [msbarMezahehm, setMsbarMezahehm] = useState('');
    // ---------------------------------------------------------- lkoh -- (functions)

    // ---------------------------------------------------------------------------------------- tokhnet
    const [shemTokhnet, setShemTokhnet] = useState('');
    const [tokhnet, setTokhnet] = useState(null);
    // ---------------------------------------------------------- tokhnet -- (functions)

    // ---------------------------------------------------------------------------------------- modals
    const [showModalTokhnetYetsor, setShowModalTokhnetYetsor] = useState(false);
    const [showModalBerotMotsrem, setShowModalBerotMotsrem] = useState(false);
    // ---------------------------------------------------------- modals -- (functions)

    // ---------------------------------------------------------------------------------------- thlekhem
    const [shlavNokhhe, setShlavNokhhe] = useState('A');
    const [tarekhAsbka, setTarekhAsbka] = useState('');
    const [seomYetsor, setSeomYetsor] = useState(false);
    const [msbarAgla, setMsbarAgla] = useState('');
    const [mherKlale, setMherKlale] = useState(0);
    const [mherKlaleAhre, setMherKlaleAhre] = useState(0);
    const [tnaeTshlom, setTnaeTshlom] = useState('');
    const [msbarAdefot, setMsbarAdefot] = useState(5);
    const [msbarTshlomem, setMsbarTshlomem] = useState(0);
    const [mkdema, setMkdema] = useState(0);
    const [haraKlalet, setHaraKlalet] = useState('');
    const [haraBnmet, setHaraBnmet] = useState('');
    const [thslomAher,setTshlomAher] = useState('');
    const [ymeAskem,setYmeAskem] = useState(0);

    // ---------------------------------------------------------- thlekhem -- (functions)

    // ---------------------------------------------------------------------------------------- motsarem
    const [motsaremRglem, setMotsaremRglem] = useState([]);
    const [motsaremBrofelem, setMotsaremBrofelem] = useState([]);
    const [motsaremLhatseg, setMotsaremLhatseg] = useState([]);
    const [errorMotsaremRglem, setErrorMotsaremRglem] = useState(false);
    const prevRemzemRef = useRef();
    const Htsgot = GetDocs('balotX').find((count) => count.id === 'htsgot');

    // ---------------------------------------------------------- motsarem -- (functions)


    const [zmanThelaA, setZmanThelaA] = useState({ shaa: '', tarekh: '' });
    const [zmanThelaB, setZmanThelaB] = useState({ shaa: '', tarekh: '' });
    const [zmanThelaC, setZmanThelaC] = useState({ shaa: '', tarekh: '' });
    const [zmanThelaD, setZmanThelaD] = useState({ shaa: '', tarekh: '' });
    const [zmanThelaE, setZmanThelaE] = useState({ shaa: '', tarekh: '' });





    // ---------------------------------------------------------------------------------------------- Tokhnet
    const [sogAglaBS, setSogAglaBS] = useState('');
    const [aorkh, setAorkh] = useState(0);
    const [rohav, setRohav] = useState(0);
    const [retsba, setRetsba] = useState('בחר');
    const [msbarTsrem, setMsbarTsrem] = useState('');
    const [AemBlamem, setAemBlamem] = useState(false);
    const [brofelTfesa, setBrofelTfesa] = useState('בחר');
    const [tsmgem, setTsmegem] = useState('');
    const [tsmgSber, setTsmegSber] = useState(false);
    const [msgeretThtonah, setTMsgeretThtonah] = useState('בחר');
    const [hlokaThtonah, setTHlokaThtonah] = useState('בחר');
    const [tvahHlokaThtona, setTvahHlokaThtona] = useState(0);
    const [msbarBrofHlokaThotona, setMsbarBrofHlokaThotona] = useState(0);
    const [yetsol, setYetsol] = useState('בחר');
    const [aorkhBroYetsol, setAorkhBroYetsol] = useState(0);
    const [sheldaHetsonet, setSheldaHetsonet] = useState('בחר');
    const [tvahSheldaBnemet, setTvahSheldaBnemet] = useState(0);
    const [msbarBroSheldaBnemet, setMsbarBroSheldaBnemet] = useState(0);
    const [helekReshonSheldaBnemet, setHelekReshonSheldaBnemet] = useState('בחר');
    const [msbarBroSheldaBnemetReshon, setMsbarBroSheldaBnemetReshon] = useState(0);
    const [helekShneSheldaBnemet, sethelekShneSheldaBnemet] = useState('בחר');
    const [msbarBroSheldaBnemetShne, setMsbarBroSheldaBnemetShne] = useState(0);
    const [dalet, setDalet] = useState('');
    const [msgertRmbaDalet, setMsgertRmbaDalet] = useState('בחר');
    const [msgertRmbaDaletAorkh, setMsgertRmbaDaletAorkh] = useState(0);
    const [hlokatRmbaDalet, setHlokatRmbaDalet] = useState('בחר');
    const [hlokatRmbaDaletBro, setHlokatRmbaDaletBro] = useState(0);
    const [hlokatRmbaDaletTvah, setHlokatRmbaDaletTvah] = useState(0);
    const [tosefetVnel, setToseftVnel] = useState(false);
    const [toseftVnelBro, setToseftVnelBrof] = useState('בחר');
    const [solam, setSolam] = useState('ללא');
    const [msgertSolam, setMsgertSolam] = useState('בחר');
    const [gobahSolam, setGobahSolam] = useState(0);
    const [hlokatSolam, setHlokatSolam] = useState('בחר');
    const [tvahAofkeSolam, setTvahAofkeSolam] = useState(0);
    const [msbarBroAofkeSolam, setMsbarBroAofkeSolam] = useState(0);
    const [tvahAnkheSolam, setTvahAnkheSolam] = useState(0);
    const [msbarBroAnkheSolam, setMsbarBroAnkheSolam] = useState(0);
    const [daletAleon, setDaletAleon] = useState(false);
    const [toseftReshet, setTosefetReshet] = useState(false);
    const [vnel, setVnel] = useState('בחר');
    const [msgertVnel, setMsgertVnel] = useState('בחר');
    const [gobahVnel, setGobahVnel] = useState(0);
    const [tvahAofkeVnel, setTvahAofkeVnel] = useState(0);
    const [msbarBroAofkeVnel, setMsbarBroAofkeVnel] = useState(0);
    const [tvahAnkheVnel, setTvahAnkheVnel] = useState(0);
    const [msbarBroAnkheVnel, setMsbarBroAnkheVnel] = useState(0);
    const [tosfot, setTosfot] = useState([]);

    const ResetCustomer = () => {
        setCustomerName('');
        setCustomerCity('');
        setCustomerPhone('');
        setMsbarMezahehm('');
    }

    const ResetAll = () => {
        setLkohHdash(false);
        setMherKlaleAhre(0);
        setHaraKlalet('');
        setHaraBnmet('');
        setMsbarTshlomem(0);
        setMkdema(0);
        setHotsaotAkefot(0);
        setHotsaotSkhar(0);
        setHkhnsotHomreGlem(0);
        setBrtemLkoh(null);
        setShemTokhnet('');
        setShlavNokhhe('A');
        setTarekhAsbka('');
        setSeomYetsor(false);
        setMsbarAgla('');
        setMherKlale(0);
        const initialMafenemMotsarem = Remzem.map((remez, index) => ({
            yredatMlae: 0,
            kmot: 0,
            mher: 0,
            shem: '',
            remez: remez.sog,
            message: '',
            id: index
        }));
        setMotsaremRglem(GetSortedMotsaremRglem(initialMafenemMotsarem));
        setMotsaremBrofelem([]);
        setMotsaremLhatseg([]);
        setErrorMotsaremRglem(false);
        setZmanThelaA({ shaa: '', tarekh: '' });
        setZmanThelaB({ shaa: '', tarekh: '' });
        setZmanThelaC({ shaa: '', tarekh: '' });
        setZmanThelaD({ shaa: '', tarekh: '' });
        setZmanThelaE({ shaa: '', tarekh: '' });
        setSogAglaBS('');
        setAorkh(0);
        setRohav(0);
        setRetsba('בחר');
        setMsbarTsrem('');
        setAemBlamem(false);
        setBrofelTfesa('בחר');
        setTsmegem('');
        setTsmegSber(false);
        setTMsgeretThtonah('בחר');
        setTHlokaThtonah('בחר');
        setTvahHlokaThtona(0);
        setMsbarBrofHlokaThotona(0);
        setYetsol('בחר');
        setAorkhBroYetsol(0);
        setSheldaHetsonet('בחר');
        setTvahSheldaBnemet(0);
        setMsbarBroSheldaBnemet(0);
        setHelekReshonSheldaBnemet('בחר');
        setMsbarBroSheldaBnemetReshon(0);
        sethelekShneSheldaBnemet('בחר');
        setMsbarBroSheldaBnemetShne(0);
        setDalet('');
        setMsgertRmbaDalet('בחר');
        setMsgertRmbaDaletAorkh(0);
        setHlokatRmbaDalet('בחר');
        setHlokatRmbaDaletBro(0);
        setHlokatRmbaDaletTvah(0);
        setToseftVnel(false);
        setSolam('ללא');
        setMsgertSolam('בחר');
        setGobahSolam(0);
        setHlokatSolam('בחר');
        setTvahAofkeSolam(0);
        setMsbarBroAofkeSolam(0);
        setTvahAnkheSolam(0);
        setMsbarBroAnkheSolam(0);
        setDaletAleon(false);
        setTosefetReshet(false);
        setVnel('בחר');
        setMsgertVnel('בחר');
        setGobahVnel(0);
        setTvahAofkeVnel(0);
        setMsbarBroAofkeVnel(0);
        setTvahAnkheVnel(0);
        setMsbarBroAnkheVnel(0);
        setTosfot([]);
        setTnaeTshlom('');
        setMsbarAdefot(5);
        setCustomerName('');
        setCustomerCity('');
        setCustomerPhone('');
        setMsbarMezahehm('');
        setValueProgress(0);
        setValueProgressdd(false);
        setValueMtsavD(false);
        setTokhnet(null);
        setTshlomAher('');
        setLocationYetsorAgla('');
        setYmeAskem(0);
    }

    const contextValue = {
        sogAglaBS, setSogAglaBS,
        aorkh, setAorkh,
        rohav, setRohav,
        retsba, setRetsba,
        msbarTsrem, setMsbarTsrem,
        AemBlamem, setAemBlamem,
        brofelTfesa, setBrofelTfesa,
        tsmgem, setTsmegem,
        tsmgSber, setTsmegSber,
        msgeretThtonah, setTMsgeretThtonah,
        hlokaThtonah, setTHlokaThtonah,
        tvahHlokaThtona, setTvahHlokaThtona,
        msbarBrofHlokaThotona, setMsbarBrofHlokaThotona,
        yetsol, setYetsol,
        aorkhBroYetsol, setAorkhBroYetsol,
        sheldaHetsonet, setSheldaHetsonet,
        tvahSheldaBnemet, setTvahSheldaBnemet,
        msbarBroSheldaBnemet, setMsbarBroSheldaBnemet,
        helekReshonSheldaBnemet, setHelekReshonSheldaBnemet,
        msbarBroSheldaBnemetReshon, setMsbarBroSheldaBnemetReshon,
        helekShneSheldaBnemet, sethelekShneSheldaBnemet,
        msbarBroSheldaBnemetShne, setMsbarBroSheldaBnemetShne,
        dalet, setDalet,
        msgertRmbaDalet, setMsgertRmbaDalet,
        msgertRmbaDaletAorkh, setMsgertRmbaDaletAorkh,
        hlokatRmbaDalet, setHlokatRmbaDalet,
        hlokatRmbaDaletBro, setHlokatRmbaDaletBro,
        hlokatRmbaDaletTvah, setHlokatRmbaDaletTvah,
        tosefetVnel, setToseftVnel,
        toseftVnelBro, setToseftVnelBrof,
        solam, setSolam,
        msgertSolam, setMsgertSolam,
        gobahSolam, setGobahSolam,
        hlokatSolam, setHlokatSolam,
        tvahAofkeSolam, setTvahAofkeSolam,
        msbarBroAofkeSolam, setMsbarBroAofkeSolam,
        tvahAnkheSolam, setTvahAnkheSolam,
        msbarBroAnkheSolam, setMsbarBroAnkheSolam,
        daletAleon, setDaletAleon,
        toseftReshet, setTosefetReshet,
        vnel, setVnel,
        msgertVnel, setMsgertVnel,
        gobahVnel, setGobahVnel,
        tvahAofkeVnel, setTvahAofkeVnel,
        msbarBroAofkeVnel, setMsbarBroAofkeVnel,
        tvahAnkheVnel, setTvahAnkheVnel,
        msbarBroAnkheVnel, setMsbarBroAnkheVnel,
        tosfot, setTosfot,
    };

    const hdbsatMtsavem = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 20px;
        }
       @media print {
            /* Add extra space to the table header to simulate a top margin on new pages */
            thead {
                display: table-header-group; /* Ensure thead repeats on each page */
                margin-top: 20px;
                padding-top: 20px; /* Add padding to create extra space on new pages */
            }
            tbody tr {
                page-break-inside: avoid; /* Prevent rows from breaking across pages */
            }
        }`,
        content: () => PrintRef.current,
    });

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
        return newArray.sort((a, b) => a.someProperty - b.someProperty);
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
            const initialMafenemMotsarem = Remzem.map((remez, index) => ({
                yredatMlae: 0,
                kmot: 0,
                mher: 0,
                shem: '',
                remez: remez.sog,
                message: '',
                id: index
            }));
            setMotsaremRglem(GetSortedMotsaremRglem(initialMafenemMotsarem));
        }
    }, [Remzem]);


    const BdekatMotsarem = () => {
        return true;
    }


    const GetBrtemMotsarMlae = useCallback((remez, shem) => {
        const motsarMlae = mlae?.filter(item => item.categoryMotsar === remez);
        const alot = motsarMlae?.find(item => item.shem === shem)?.alotLeheda || 0;
        const kmot = motsarMlae?.find(item => item.shem === shem)?.kmot || 0;
        const msbar = motsarMlae?.find(item => item.shem === shem)?.msbar || '';
        const id = motsarMlae?.find(item => item.shem === shem)?.id || '';
        return { arrayResualt: motsarMlae, alot, kmot, msbar, id };
    }, [mlae]);


    const shlav = () => {
        let res = '';
        if ((brtemLkoh?.id || customerName) && shemTokhnet) {
            res = 'A';
        }
        if ((brtemLkoh?.id || customerName) && tnaeTshlom && shemTokhnet && mherKlale && mherKlaleAhre && mkdema && msbarTshlomem && BdekatMotsarem()) {
            res = 'B';
        }
        if ((brtemLkoh?.id || customerName) && tnaeTshlom && shemTokhnet && mherKlale && mherKlaleAhre && mkdema && msbarTshlomem && BdekatMotsarem() && tarekhAsbka) {
            res = 'C';
        }
        if ((brtemLkoh?.id || customerName) && tnaeTshlom && shemTokhnet && mherKlale && mherKlaleAhre && mkdema && msbarTshlomem && BdekatMotsarem() && tarekhAsbka && msbarAgla && yetsorKeam?.shlavYetsor) {
            res = 'D';
        }
        if (false) {
            res = 'E';
        }
        return res;
    }

    const GetShlav = () => {
        const steps = ['A', 'B', 'C', 'D', 'E'];
        const currentShlav = shlav();
        const currentIndex = steps.indexOf(shlavNokhhe);
        const nextIndex = steps.indexOf(currentShlav);
        if (nextIndex > currentIndex) {
            return steps[currentIndex + 1];
        }
        return shlavNokhhe;
    }

    const getNextLetter = (letter) => {
        const nextCharCode = letter.charCodeAt(0) + 1;
        return String.fromCharCode(nextCharCode);
    };

    const CheckMotsarem = () => {
        const invalidItems = motsaremRglem.filter(({ msbar, remez, shem, kmot }) => {
            return kmot > GetBrtemMotsarMlae(remez, shem).kmot;
        });
        if (invalidItems.length > 0) {
            console.warn("Some products exceed available inventory:", invalidItems);
            return false;
        }
        console.log("All product amounts are valid.");
        return true;
    }
    const GetErrorMessages = () => {
        const updatedMotsarem = motsaremRglem.map(({ msbar, remez, shem, kmot }, index) => {
            const message = kmot > GetBrtemMotsarMlae(remez, shem).kmot ? "קמות חורגת" : "";
            return { ...motsaremRglem[index], message };
        });
        setMotsaremRglem(updatedMotsarem);
    };



    const UpdateInventory = async () => {
        try {
            const batch = writeBatch(firestore);
            for (const { remez, msbar, shem, kmot } of motsaremRglem) {
                if (!GetBrtemMotsarMlae(remez, shem).id) {
                    continue;
                }
                const newKmot = Math.max(GetBrtemMotsarMlae(remez, shem).kmot - kmot, 0);
                const docRef = doc(firestore, "mlae", GetBrtemMotsarMlae(remez, shem).id);
                batch.update(docRef, { kmot: newKmot });
            }
            await batch.commit();
            console.log("Inventory successfully updated!");
        } catch (error) {
            console.error("Error updating inventory:", error);
        }
    };

    const updateMotsaremRglemYredatMlae = () => {
        setMotsaremRglem((prevMotsaremRglem) =>
            prevMotsaremRglem.map((item) => ({
                ...item,
                yredatMlae: item.kmot, // Set yredatMlae to kmot value
            }))
        );
    };

    const Next = async () => {
        if (shlavNokhhe === shlav()) {
            if (getNextLetter(shlavNokhhe) === 'D' && !yetsorKeam?.shlavYetsor) {
                setShowAlertMessage('חייב להשלים שלבי ייצור מצד העובדים!!');
                setShowAlertType('warning');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 1500);
                return;
            }
            setShowAlertMessage('חסר פרטיים לשלב הבא.');
            setShowAlertType('warning');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
            return;
        }
        if (getNextLetter(shlavNokhhe) === 'C') {
            if (!CheckMotsarem()) {
                GetErrorMessages();
                setErrorMotsaremRglem(true);
                setShowAlertMessage('כמויות מוצרים לא חוקית.');
                setShowAlertType('error');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 1500);
                return;
            }
            else {
                await UpdateInventory();
                updateMotsaremRglemYredatMlae();
            }
        }
        if (getNextLetter(shlavNokhhe) === 'B' && (!brtemLkoh?.id && !customerName) || !tnaeTshlom || !shemTokhnet || !mherKlale || !mherKlaleAhre || !mkdema || !msbarTshlomem || !BdekatMotsarem()) {
            setShowAlertMessage('חסר פרטיים לשלב הבא.');
            setShowAlertType('warning');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
            return;
        }
        if(getNextLetter(shlavNokhhe) === 'D' && yetsorKeam?.shlavYetsor){
            setValueMtsavD(true);
            setZmanThelaD({ shaa: format(new Date(), 'HH:mm'), tarekh: format(new Date(), 'dd-MM-yyyy') });
        }
        setErrorMotsaremRglem(false);
        setShlavNokhhe(GetShlav());
    }

    const [showModalMtsavYetsor, setShowModalMtsavYetsor] = useState(false);
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [showModalAddCustomer, setShowModalAddCustomer] = useState(false);

    const updateMotsaremLhatseg = (itemsToAdd = [], itemsToRemove = []) => {
        setMotsaremLhatseg((prevItems) => {
            const filteredItems = prevItems.filter(item => !itemsToRemove.includes(item));
            return [...filteredItems, ...(itemsToAdd || [])];
        });
    };

    useEffect(() => {
        if (sogAskaa === 'ייצור') {
            updateMotsaremLhatseg(Htsgot?.yetsor || [], []);
        }
        else if (sogAskaa === 'הרכבת וו') {

        }
        else if (sogAskaa === 'תיקון') {

        }
    }, [sogAskaa, Htsgot]);

    const GetShlavemInHebrow = (shlav,val) => {
        if (shlav === 'A') {
            return val ? 'הצעת מחיר' : 'שלב הצעה';
        }
        else if (shlav === 'B') {
            return val ? 'הזמנה' : 'שלב הזמנה';
        }
        else if (shlav === 'C') {
            return val ? 'ייצור' : 'שלב ייצור';
        }
        else if (shlav === 'D') {
            return val ? 'סיום' : 'שלב סיום';
        }
        else if (shlav === 'E') {
            return 'שלב מכר';
        }
    };

    const handelPrintggg = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 5px;
        }`,
        content: () => componentRefTwo.current,
    });

    const UpdateMotsaremLhANDRe = (motsaremToUpdate) => {
        const updatedMotsarem = motsaremRglem.map((motsar) => {
            const matchingItem = motsaremToUpdate?.find(
                (update) => update.remez === motsar.remez
            );
            return matchingItem
                ? { ...motsar, kmot: matchingItem.val }
                : motsar;
        });
        setMotsaremRglem(updatedMotsarem);
        const remezValues = motsaremToUpdate?.map((item) => item.remez);
        setMotsaremLhatseg((prevArray) => [...prevArray, ...remezValues]);
    };

    const UpdateMotsaremBroLhANDRe = (motsaremToUpdate) => {
        setMotsaremBrofelem((prevArray) => {
            const existingIndex = prevArray.findIndex(
                (item) => item.shem === motsaremToUpdate.shem
            );
            if (existingIndex !== -1) {
                return prevArray.map((item, index) =>
                    index === existingIndex
                        ? { ...item, kmot: item.kmot + motsaremToUpdate.kmot }
                        : item
                );
            } else {
                return [
                    ...prevArray,
                    {
                        ...motsaremToUpdate,
                        id: prevArray.length,
                        mher: 0,
                        yredatMlae: 0,
                        message: '',
                    }
                ];
            }
        });
    };

    const RemoveMotsaremBro = (shem, amountToRemove) => {
        setMotsaremBrofelem((prevArray) =>
            prevArray.reduce((acc, item) => {
                if (item.shem === shem) {
                    const newKmot = item.kmot - amountToRemove;
                    if (newKmot > 0) {
                        acc.push({ ...item, kmot: newKmot });
                    }
                } else {
                    acc.push(item);
                }
                return acc;
            }, [])
        );
    }

    const ResetMotsaremLhANDRe = (motsaremToReset) => {
        const updatedMotsaremRglem = motsaremRglem.map((item) => {
            if (motsaremToReset.includes(item.remez)) {
                return {
                    kmot: 0,
                    mher: 0,
                    shem: '',
                    new: item.new || false,
                    id: item.id,
                    remez: item.remez,
                    message: '',
                };
            }
            return item;
        });
        setMotsaremRglem(updatedMotsaremRglem);
        setMotsaremLhatseg((prevArray) =>
            prevArray.filter((remez) => !motsaremToReset.includes(remez))
        );
    };

    function getDigitsAfterDot(number) {
        const numberStr = number.toString();
        const dotIndex = numberStr.indexOf('.');
        if (dotIndex === -1) {
            return '';
        }
        const digitsAfterDot = numberStr.substring(dotIndex + 1);
        return digitsAfterDot;
    };

    const formatNumberWithCommas = (num) => {
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const saveValues = async (res) => {
        setLoading(true);
        const Props = {
            ymeAskem,
            thslomAher,
            shlavYetsor : false,
            htsaaNdbas : true,
            locationYetsor,
            mherKlaleAhre,
            lkohHdash: lkohHdash || false,
            newCustomer: { customerName: customerName || '', customerCity: customerCity || '', customerPhone: customerPhone || '', msbarMezahehm: msbarMezahehm || '' },
            haraBnmet,
            haraKlalet,
            mkdema,
            msbarTshlomem,
            shemTokhnet,
            msbarAdefot,
            tnaeTshlom,
            tarekhAsbka,
            sogAglaBS,
            sogAskaa,
            msbar: counter?.count,
            mherKlale: parseFloat(mherKlale),
            msbarAgla,
            brtemLkoh,
            shlavNokhhe,
            tarekh: format(new Date(), 'dd-MM-yyyy'),
            seomYetsor,
            mtsavYetsor: [
                {
                    res: false,
                    tarekh: '',
                    shaa: '',
                    maoshar: ''
                },
                {
                    res: false,
                    tarekh: '',
                    shaa: '',
                    maoshar: ''
                },
                {
                    res: false,
                    tarekh: '',
                    shaa: '',
                    maoshar: ''
                },
                {
                    res: false,
                    tarekh: '',
                    shaa: '',
                    maoshar: ''
                }
                ,
                {
                    res: false,
                    tarekh: '',
                    shaa: '',
                    maoshar: ''
                },
                {
                    res: false,
                    tarekh: '',
                    shaa: '',
                    maoshar: ''
                }
            ],
            zmanThelaA,
            zmanThelaB,
            zmanThelaC,
            zmanThelaD,
            zmanThelaE,
            zmanAboda: 0,
            ahozRevah: getDigitsAfterDot((((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) / mherKlale) || 0),
            hkhnsot: 0,
            hotsaotHomreGlem: hkhnsotHomreGlem,
            hotsaotSkhar: hotsotSkhar,
            hotsotAkefot: hotsotAkefot,
            maam: formatNumberWithCommas(parseInt(mherKlale * 0.17) || 0),
            revahYsher: formatNumberWithCommas((mherKlale - hkhnsotHomreGlem - hotsotSkhar) || 0),
            revhNke: formatNumberWithCommas(((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) || 0),
            tvahAofkeSolam,
            msbarBroAofkeSolam,
            tvahAnkheSolam,
            msbarBroAnkheSolam,
            gobahSolam,
            toseftReshet: toseftReshet || false,
            daletAleon,
            solam,
            tosefetVnel: tosefetVnel || false,
            hlokatRmbaDaletTvah,
            hlokatRmbaDaletBro,
            msgertRmbaDaletAorkh,
            msbarBroSheldaBnemetReshon,
            msbarBroSheldaBnemetShne,
            tvahHlokaThtona,
            msbarBrofHlokaThotona,
            tsmgem: tsmgem || false,
            aorkh: parseFloat(aorkh),
            rohav: parseFloat(rohav),
            msbarTsrem,
            AemBlamem,
            tsmgSber: tsmgSber || false,
            aorkhBroYetsol,
            msbarBroSheldaBnemet,
            tvahSheldaBnemet,
            dalet,
            tosfot,
            retsba,
            brofelTfesa,
            msgeretThtonah,
            hlokaThtonah,
            yetsol,
            sheldaHetsonet,
            helekReshonSheldaBnemet,
            helekShneSheldaBnemet,
            msgertRmbaDalet,
            hlokatRmbaDalet,
            toseftVnelBro,
            msgertSolam,
            hlokatSolam,
            vnel,
            msgertVnel,
            gobahVnel,
            tvahAofkeVnel,
            msbarBroAofkeVnel,
            tvahAnkheVnel,
            msbarBroAnkheVnel,
            motsaremRglem,
            motsaremBrofelem,
            motsaremLhatseg
        }
        if (yetsorKeam?.msbar) {
            try {
                updateDoc(doc(firestore, 'tfaol', yetsorKeam?.id), {
                    ymeAskem,
                    thslomAher,
                    locationYetsor,
                    mherKlaleAhre,
                    msbarAdefot,
                    lkohHdash: lkohHdash || false,
                    newCustomer: { customerName: customerName || '', customerCity: customerCity || '', customerPhone: customerPhone || '', msbarMezahehm: msbarMezahehm || '' },
                    haraBnmet,
                    haraKlalet,
                    msbarTshlomem,
                    mkdema,
                    shemTokhnet,
                    tarekhAsbka,
                    tnaeTshlom,
                    mherKlale: parseFloat(mherKlale),
                    shlavNokhhe,
                    sogAglaBS,
                    msbarAgla,
                    seomYetsor,
                    zmanThelaA,
                    zmanThelaB,
                    zmanThelaC,
                    zmanThelaD,
                    zmanThelaE,
                    zmanAboda: 0,
                    ahozRevah: getDigitsAfterDot((((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) / mherKlale) || 0),
                    hkhnsot: 0,
                    hotsaotHomreGlem: hkhnsotHomreGlem,
                    hotsaotSkhar: hotsotSkhar,
                    hotsotAkefot: hotsotAkefot,
                    maam: formatNumberWithCommas(parseInt(mherKlale * 0.17) || 0),
                    revahYsher: formatNumberWithCommas((mherKlale - hkhnsotHomreGlem - hotsotSkhar) || 0),
                    revhNke: formatNumberWithCommas(((mherKlale - hkhnsotHomreGlem - hotsotSkhar) - parseInt(mherKlale * 0.17)) || 0),
                    tvahAofkeSolam,
                    msbarBroAofkeSolam,
                    tvahAnkheSolam,
                    msbarBroAnkheSolam,
                    gobahSolam,
                    toseftReshet: toseftReshet || false,
                    daletAleon,
                    solam,
                    tosefetVnel: tosefetVnel || false,
                    hlokatRmbaDaletTvah,
                    hlokatRmbaDaletBro,
                    msgertRmbaDaletAorkh,
                    msbarBroSheldaBnemetReshon,
                    msbarBroSheldaBnemetShne,
                    tvahHlokaThtona,
                    msbarBrofHlokaThotona,
                    tsmgem: tsmgem || false,
                    aorkh: parseFloat(aorkh),
                    rohav: parseFloat(rohav),
                    msbarTsrem,
                    AemBlamem,
                    tsmgSber: tsmgSber || false,
                    aorkhBroYetsol,
                    msbarBroSheldaBnemet,
                    tvahSheldaBnemet,
                    dalet,
                    tosfot,
                    retsba,
                    brofelTfesa,
                    msgeretThtonah,
                    hlokaThtonah,
                    yetsol,
                    sheldaHetsonet,
                    helekReshonSheldaBnemet,
                    helekShneSheldaBnemet,
                    msgertRmbaDalet,
                    hlokatRmbaDalet,
                    toseftVnelBro,
                    msgertSolam,
                    hlokatSolam,
                    vnel,
                    msgertVnel,
                    gobahVnel,
                    tvahAofkeVnel,
                    msbarBroAofkeVnel,
                    tvahAnkheVnel,
                    msbarBroAnkheVnel,
                    motsaremRglem,
                    motsaremBrofelem,
                    motsaremLhatseg,
                    msbarHeshvonet: shlavNokhhe === 'E' ? counterHeshvoneot?.count : '',
                    aemSholam: false
                });
                if (shlavNokhhe === 'E') {
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
                    await updateDoc(doc(firestore, 'customers', brtemLkoh?.id), {
                        yetera: parseFloat(brtemLkoh?.yetera) + parseFloat(mherKlale)
                    });
                    await updateDoc(doc(firestore, 'metadata', 'counterTfaol'), {
                        countE: counter.countE + 1,
                        countEAglot: counter.countEAglot + 1,
                        countESumAglot: parseFloat(counter.countESumAglot) + parseFloat(mherKlale),
                        countESumHGAglot: counter.countESumHGAglot + hkhnsotHomreGlem,
                        countESumAglotMunth: counter.countESumAglotForMunth === format(new Date(), 'MM-yyyy') ? (parseFloat(counter.countESumAglotMunth) + parseFloat(mherKlale)) : (parseFloat(mherKlale)),
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
                }
                if (shlavNokhhe === 'C' && !res) {
                    handelPrintggg();
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            try {
                if (shlavNokhhe === 'C' && !res) {
                    handelPrintggg();
                }
                await addDoc(collection(firestore, "tfaol"), Props);
            }
            catch (e) {
                console.log(e);
            }
        }
        (!yetsorKeam?.msbar) && await updateDoc(doc(firestore, 'metadata', 'counterTfaol'), { count: counter?.count + 1 });
        setLoading(false);
        !res && ResetAll();
        !res && disable();
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

    useEffect(() => {
        let sum = 0;
        let sumZmanAboda = 0;
        for (let index = 0; index < motsaremRglem?.length; index++) {
            if (motsaremRglem[index].kmot > 0) {
                sum += ((parseFloat(GetZmanAbodaMotsar(motsaremRglem[index].remez)) * parseFloat(motsaremRglem[index].kmot)) || 0);
            }
        }
        for (let index = 0; index < motsaremBrofelem?.length; index++) {
            if (motsaremBrofelem[index].kmot > 0) {
                sum += ((parseFloat(GetZmanAbodaMotsar(motsaremBrofelem[index].remez)) * parseFloat(motsaremBrofelem[index].kmot)) || 0);
            }
        }
        const hotsaotSkharYetsor = parseFloat(counterShaotAboda?.hotsaotSkharYetsor) || 0;
        const shaotKodmetYestsor = parseFloat(counterShaotAboda?.shaotKodmetYestsor) || 0;
        const hotsaotSkhar = parseFloat(counterShaotAboda?.hotsaotSkhar) || 0;
        const shaotKodmet = parseFloat(counterShaotAboda?.shaotKodmet) || 0;
        const skharRatio = hotsaotSkharYetsor / shaotKodmetYestsor;
        const hotsaotSkharValue = parseFloat((sum * (isNaN(skharRatio) ? 0 : skharRatio) / 60).toFixed(2));
        const akefotRatio = (hotsaotSkhar - hotsaotSkharYetsor) / (shaotKodmet - shaotKodmetYestsor);
        const hotsaotAkefotValue = parseFloat((sum * (isNaN(akefotRatio) ? 0 : akefotRatio) / 60).toFixed(2));
        const total1 = motsaremBrofelem?.reduce((acc, motsar) => {
            const parsed = parseFloat(motsar.mher);
            return !isNaN(parsed) ? acc + parsed : acc;
        }, 0);
        const total2 = motsaremRglem?.reduce((acc, motsar) => {
            const parsed = parseFloat(motsar.mher);
            return !isNaN(parsed) ? acc + parsed : acc;
        }, 0);
        setHotsaotAkefot(hotsaotAkefotValue);
        setHotsaotSkhar(hotsaotSkharValue);
        setHkhnsotHomreGlem(total1 + total2);
    }, [motsaremRglem, motsaremBrofelem]);


    useEffect(() => {
        if (yetsorKeam?.msbar) {
            setHaraKlalet(yetsorKeam.haraKlalet);
            setHaraBnmet(yetsorKeam.haraBnmet);
            setMsbarTshlomem(yetsorKeam.msbarTshlomem);
            setMkdema(yetsorKeam.mkdema);
            setHotsaotAkefot(yetsorKeam.hotsaotAkefot);
            setHotsaotSkhar(yetsorKeam.hotsaotSkhar);
            setHkhnsotHomreGlem(yetsorKeam.hkhnsotHomreGlem);
            setBrtemLkoh(yetsorKeam.brtemLkoh);
            setTarekhAsbka(yetsorKeam.tarekhAsbka);
            setMsbarAgla(yetsorKeam.msbarAgla);
            setMherKlale(yetsorKeam.mherKlale);
            setMotsaremRglem(yetsorKeam.motsaremRglem);
            setMotsaremBrofelem(yetsorKeam.motsaremBrofelem);
            setMotsaremLhatseg(yetsorKeam.motsaremLhatseg);
            setSogAglaBS(yetsorKeam.sogAglaBS);
            setAorkh(yetsorKeam.aorkh);
            setRohav(yetsorKeam.rohav);
            setRetsba(yetsorKeam.retsba);
            setMsbarTsrem(yetsorKeam.msbarTsrem);
            setAemBlamem(yetsorKeam.AemBlamem);
            setBrofelTfesa(yetsorKeam.brofelTfesa);
            setTsmegem(yetsorKeam.tsmegem);
            setTsmegSber(yetsorKeam.tsmegSber);
            setTMsgeretThtonah(yetsorKeam.msgeretThtonah);
            setTHlokaThtonah(yetsorKeam.hlokaThtonah);
            setTvahHlokaThtona(yetsorKeam.tvahHlokaThtona);
            setMsbarBrofHlokaThotona(yetsorKeam.msbarBrofHlokaThotona);
            setYetsol(yetsorKeam.yetsol);
            setAorkhBroYetsol(yetsorKeam.aorkhBroYetsol);
            setSheldaHetsonet(yetsorKeam.sheldaHetsonet);
            setTvahSheldaBnemet(yetsorKeam.tvahSheldaBnemet);
            setMsbarBroSheldaBnemet(yetsorKeam.msbarBroSheldaBnemet);
            setHelekReshonSheldaBnemet(yetsorKeam.helekReshonSheldaBnemet);
            setMsbarBroSheldaBnemetReshon(yetsorKeam.msbarBroSheldaBnemetReshon);
            sethelekShneSheldaBnemet(yetsorKeam.helekShneSheldaBnemet);
            setMsbarBroSheldaBnemetShne(yetsorKeam.msbarBroSheldaBnemetShne);
            setDalet(yetsorKeam.dalet);
            setMsgertRmbaDalet(yetsorKeam.msgertRmbaDalet);
            setMsgertRmbaDaletAorkh(yetsorKeam.msgertRmbaDaletAorkh);
            setHlokatRmbaDalet(yetsorKeam.hlokatRmbaDalet);
            setHlokatRmbaDaletBro(yetsorKeam.hlokatRmbaDaletBro);
            setHlokatRmbaDaletTvah(yetsorKeam.hlokatRmbaDaletTvah);
            setToseftVnel(yetsorKeam.toseftVnel);
            setSolam(yetsorKeam.solam);
            setMsgertSolam(yetsorKeam.msgertSolam);
            setGobahSolam(yetsorKeam.gobahSolam);
            setHlokatSolam(yetsorKeam.hlokatSolam);
            setTvahAofkeSolam(yetsorKeam.tvahAofkeSolam);
            setMsbarBroAofkeSolam(yetsorKeam.msbarBroAofkeSolam);
            setTvahAnkheSolam(yetsorKeam.tvahAnkheSolam);
            setMsbarBroAnkheSolam(yetsorKeam.msbarBroAnkheSolam);
            setDaletAleon(yetsorKeam.daletAleon);
            setTosefetReshet(yetsorKeam.tosefetReshet);
            setVnel(yetsorKeam.vnel);
            setMsgertVnel(yetsorKeam.msgertVnel);
            setGobahVnel(yetsorKeam.gobahVnel);
            setTvahAofkeVnel(yetsorKeam.tvahAofkeVnel);
            setMsbarBroAofkeVnel(yetsorKeam.msbarBroAofkeVnel);
            setTvahAnkheVnel(yetsorKeam.tvahAnkheVnel);
            setMsbarBroAnkheVnel(yetsorKeam.msbarBroAnkheVnel);
            setTosfot(yetsorKeam.tosfot);
            setToseftVnelBrof(yetsorKeam.toseftVnelBro);
            setZmanThelaA(yetsorKeam.zmanThelaA);
            setZmanThelaB(yetsorKeam.zmanThelaB);
            setZmanThelaC(yetsorKeam.zmanThelaC);
            setZmanThelaD(yetsorKeam.zmanThelaD);
            setZmanThelaE(yetsorKeam.zmanThelaE);
            setShlavNokhhe(yetsorKeam.shlavNokhhe);
            setTnaeTshlom(yetsorKeam.tnaeTshlom);
            setMsbarAdefot(yetsorKeam.msbarAdefot);
            setShemTokhnet(yetsorKeam.shemTokhnet);
            setCustomerCity(yetsorKeam?.newCustomer?.customerCity);
            setCustomerName(yetsorKeam?.newCustomer?.customerName);
            setCustomerPhone(yetsorKeam?.newCustomer?.customerPhone);
            setMsbarMezahehm(yetsorKeam?.newCustomer?.msbarMezahehm);
            setLkohHdash(yetsorKeam.lkohHdash);
            setMherKlaleAhre(yetsorKeam.mherKlaleAhre);
            setLocationYetsorAgla(yetsorKeam?.locationYetsor);
            setTshlomAher(yetsorKeam?.thslomAher);
            setYmeAskem(yetsorKeam?.ymeAskem);
        }
    }, [yetsorKeam]);

    useEffect(() => {
        setLocationYetsorAgla(locationYetsor);
    },[locationYetsor])

    useEffect(() => {
        if (tokhnet) {
            setSogAglaBS(tokhnet.sogAglaBS);
            setAorkh(tokhnet.aorkh);
            setRohav(tokhnet.rohav);
            setRetsba(tokhnet.retsba);
            setMsbarTsrem(tokhnet.msbarTsrem);
            setAemBlamem(tokhnet.AemBlamem);
            setBrofelTfesa(tokhnet.brofelTfesa);
            setTsmegem(tokhnet.tsmgem);
            setTsmegSber(tokhnet.tsmgSber);
            setTMsgeretThtonah(tokhnet.msgeretThtonah);
            setTHlokaThtonah(tokhnet.hlokaThtonah);
            setTvahHlokaThtona(tokhnet.tvahHlokaThtona);
            setMsbarBrofHlokaThotona(tokhnet.msbarBrofHlokaThotona);
            setYetsol(tokhnet.yetsol);
            setAorkhBroYetsol(tokhnet.aorkhBroYetsol);
            setSheldaHetsonet(tokhnet.sheldaHetsonet);
            setTvahSheldaBnemet(tokhnet.tvahSheldaBnemet);
            setMsbarBroSheldaBnemet(tokhnet.msbarBroSheldaBnemet);
            setHelekReshonSheldaBnemet(tokhnet.helekReshonSheldaBnemet);
            setMsbarBroSheldaBnemetReshon(tokhnet.msbarBroSheldaBnemetReshon);
            sethelekShneSheldaBnemet(tokhnet.helekShneSheldaBnemet);
            setMsbarBroSheldaBnemetShne(tokhnet.msbarBroSheldaBnemetShne);
            setDalet(tokhnet.dalet);
            setMsgertRmbaDalet(tokhnet.msgertRmbaDalet);
            setMsgertRmbaDaletAorkh(tokhnet.msgertRmbaDaletAorkh);
            setHlokatRmbaDalet(tokhnet.hlokatRmbaDalet);
            setHlokatRmbaDaletBro(tokhnet.hlokatRmbaDaletBro);
            setHlokatRmbaDaletTvah(tokhnet.hlokatRmbaDaletTvah);
            setToseftVnel(tokhnet.tosefetVnel);
            setToseftVnelBrof(tokhnet.toseftVnelBro);
            setSolam(tokhnet.solam);
            setMsgertSolam(tokhnet.msgertSolam);
            setGobahSolam(tokhnet.gobahSolam);
            setHlokatSolam(tokhnet.hlokatSolam);
            setTvahAofkeSolam(tokhnet.tvahAofkeSolam);
            setMsbarBroAofkeSolam(tokhnet.msbarBroAofkeSolam);
            setTvahAnkheSolam(tokhnet.tvahAnkheSolam);
            setMsbarBroAnkheSolam(tokhnet.msbarBroAnkheSolam);
            setDaletAleon(tokhnet.daletAleon);
            setTosefetReshet(tokhnet.toseftReshet);
            setVnel(tokhnet.vnel);
            setMsgertVnel(tokhnet.msgertVnel);
            setGobahVnel(tokhnet.gobahVnel);
            setTvahAofkeVnel(tokhnet.tvahAofkeVnel);
            setMsbarBroAofkeVnel(tokhnet.msbarBroAofkeVnel);
            setTvahAnkheVnel(tokhnet.tvahAnkheVnel);
            setMsbarBroAnkheVnel(tokhnet.msbarBroAnkheVnel);
            setTosfot(tokhnet.tosfot);
            setMotsaremBrofelem(tokhnet.motsaremBrofelem);
            setMotsaremRglem(tokhnet.motsaremRglem);
            setMotsaremLhatseg(tokhnet.motsaremLhatseg);
        }
    }, [tokhnet]);

    useEffect(() => {
        if (shlavNokhhe === 'A') {
            setZmanThelaA({ shaa: format(new Date(), 'HH:mm'), tarekh: format(new Date(), 'dd-MM-yyyy') });
        }
        else if (shlavNokhhe === 'B') {
            setZmanThelaB({ shaa: format(new Date(), 'HH:mm'), tarekh: format(new Date(), 'dd-MM-yyyy') });
        }
        else if (shlavNokhhe === 'C') {
            setZmanThelaC({ shaa: format(new Date(), 'HH:mm'), tarekh: format(new Date(), 'dd-MM-yyyy') });
        }
    }, [shlavNokhhe, show]);


    useEffect(() => {
        if (lkohForAdd) {
            for (let index = 0; index < lkhot.length; index++) {
                if (lkhot[index].name === lkohForAdd) {
                    setBrtemLkoh(lkhot[index]);
                }
            }
        }
    }, [lkohHdash]);


    const GetMotionTitels = (titel) => {
        return (
            <div className="w-full">
                <AnimatePresence mode="wait">
                <motion.div
                    key="shlavNokhhe"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-center">
                        {
                            titel === 'שלב הצעה' &&
                            <Comment
                                visible={true}
                                height="50"
                                width="50"
                                ariaLabel="comment-loading"
                                wrapperStyle={{}}
                                wrapperClass="comment-wrapper"
                                color="white"
                                backgroundColor="#3b82f6"
                            />
                        }
                        {
                            titel === 'שלב הזמנה' &&
                            <Hourglass
                                visible={true}
                                height="50"
                                width="50"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                color='#3b82f6'
                                backgroundColor="#3b82f6"
                            />
                        }
                        {
                            titel === 'שלב ייצור' &&
                            <ThreeCircles
                                visible={true}
                                height="50"
                                width="50"
                                color="#3b82f6"
                                ariaLabel="three-circles-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        }
                        {
                            titel === 'שלב סיום' &&
                            <Puff
                                visible={true}
                                height="50"
                                width="50"
                                color="#3b82f6"
                                ariaLabel="puff-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        }
                        <div className="mr-5 text-2xl font-bold text-center text-gray-800">{titel}</div>
                    </div>
                </motion.div>
            </AnimatePresence>
            </div>
        )
    }


    const [valueProgress, setValueProgress] = useState(0);
    const [valueProgressdd, setValueProgressdd] = useState(false);
    const [valueMtsavD, setValueMtsavD] = useState(false);

    useEffect(() => {
        if (valueProgressdd) {
            const timer = setTimeout(() => {
                setValueProgress((v) => {
                    if (v >= 100) {
                        disable();
                        ResetAll();
                        setValueProgress(0);
                        return 0;
                    } else {
                        return v + 10;
                    }
                });
            }, 600);
    
            return () => clearTimeout(timer);
        }
    }, [valueProgressdd, valueProgress]);

    useEffect(() => {
        if (valueMtsavD) {
            setValueProgressdd(true);
            saveValues(true);
        }
    }, [valueMtsavD]);

    const resetAllTokhnetYdnet = () => {
        const resetMotsaremRglem = motsaremRglem.map((item) => ({
            kmot: 0,
            mher: 0,
            shem: '',
            new: item.new || false,
            id: item.id,
            remez: item.remez,
            message: '',
        }));
        setMotsaremRglem(resetMotsaremRglem);
        setSogAglaBS('');
        setAorkh(0);
        setRohav(0);
        setRetsba('בחר');
        setMsbarTsrem('');
        setAemBlamem(false);
        setBrofelTfesa('בחר');
        setTsmegem('');
        setTsmegSber(false);
        setTMsgeretThtonah('בחר');
        setTHlokaThtonah('בחר');
        setTvahHlokaThtona(0);
        setMsbarBrofHlokaThotona(0);
        setYetsol('בחר');
        setAorkhBroYetsol(0);
        setSheldaHetsonet('בחר');
        setTvahSheldaBnemet(0);
        setMsbarBroSheldaBnemet(0);
        setHelekReshonSheldaBnemet('בחר');
        setMsbarBroSheldaBnemetReshon(0);
        sethelekShneSheldaBnemet('בחר');
        setMsbarBroSheldaBnemetShne(0);
        setDalet('');
        setMsgertRmbaDalet('בחר');
        setMsgertRmbaDaletAorkh(0);
        setHlokatRmbaDalet('בחר');
        setHlokatRmbaDaletBro(0);
        setHlokatRmbaDaletTvah(0);
        setToseftVnel(false);
        setSolam('ללא');
        setMsgertSolam('בחר');
        setGobahSolam(0);
        setHlokatSolam('בחר');
        setTvahAofkeSolam(0);
        setMsbarBroAofkeSolam(0);
        setTvahAnkheSolam(0);
        setMsbarBroAnkheSolam(0);
        setDaletAleon(false);
        setTosefetReshet(false);
        setVnel('בחר');
        setMsgertVnel('בחר');
        setGobahVnel(0);
        setTvahAofkeVnel(0);
        setMsbarBroAofkeVnel(0);
        setTvahAnkheVnel(0);
        setMsbarBroAnkheVnel(0);
        setTosfot([]);
    };

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    

    const DrawerList = (
        <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon className="flex justify-center w-full border-b-1">
                            מחיר שוק
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon className="w-full">
                            <div className="w-full flex items-center justify-between">
                                <div>מחיר שוק</div>
                                <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪ ${mherKlale}`} />
                            </div>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton className="w-full justify-between items-center">
                        <ListItemIcon>
                            מחיר מכירה
                        </ListItemIcon>
                        <ListItemText primary={<Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪ ${mherKlaleAhre}`} />} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>הוצאות חו"ג</ListItemIcon>
                        <ListItemText primary={<Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪ ${hkhnsotHomreGlem}`} />} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            הוצאות שכר
                        </ListItemIcon>
                        <ListItemText primary={<Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪ ${hotsotSkhar}`} />} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            רווח ישיר
                        </ListItemIcon>
                        <ListItemText primary={<Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪`} />} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            הוצאות עקיפות
                        </ListItemIcon>
                        <ListItemText primary={<Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪ ${hotsotAkefot}`} />} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            הוצאות מסים
                        </ListItemIcon>
                        <ListItemText primary={<Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪`} />} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            רווח נקי
                        </ListItemIcon>
                        <ListItemText primary={<Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪`} />} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            אחוז רווח
                        </ListItemIcon>
                        <ListItemText primary={<Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪`} />} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );


    const addBusinessDaysSkippingFridays = (startDate, days) => {
        let currentDate = startDate;
        let businessDaysAdded = 0;
        while (businessDaysAdded < days) {
          currentDate = addDays(currentDate, 1);
          if (!isFriday(currentDate)) {
            businessDaysAdded++;
          }
        }
    
        return currentDate;
      };
    
      const calculateBusinessDaysExcludingFridays = (startDate, endDate) => {
        let currentDate = startDate;
        let businessDaysCount = 0;
        while (currentDate < endDate) {
          currentDate = addDays(currentDate, 1);
          if (!isFriday(currentDate)) {
            businessDaysCount++;
          }
        }
        return businessDaysCount;
      };

    // Handle change in ymeAskem input
    const handleYmeAskemChange = (value) => {
        setYmeAskem(value);
        if (value) {
            const newDate = addBusinessDaysSkippingFridays(new Date(), parseInt(value, 10));
            setTarekhAsbka(format(newDate, 'yyyy-MM-dd'));
        }
        else{
            setTarekhAsbka('');
        }
    };

    // Handle change in tarekhAsbka input
    const handleTarekhAsbkaChange = (value) => {
        setTarekhAsbka(value);
        if (value) {
            const targetDate = parse(value, 'yyyy-MM-dd', new Date());
            const businessDays = calculateBusinessDaysExcludingFridays(new Date(), targetDate);
            setYmeAskem(businessDays.toString());
        }
        else {
            setYmeAskem(0);
        }
    };



    return (
        <Modal placement="center" className="test-fontt select-none" backdrop={"blur"} size="full" isOpen={show} onClose={() => { setShowModalMessage(true); }}>
            <ModalContent className="w-full h-screen bg-white flex flex-col">
                <ModalHeader className="bg-white w-full border-b-2">
                    <div className="text-2xl font-bold text-center text-gray-800 w-full bg-white">ייצור עגלה</div>
                </ModalHeader>
                <ModalBody className="flex-grow p-4 overflow-auto">
                    <div className=" absolute left-0 top-28 right-0 z-50">
                        <div className={`transition-all duration-500 ease-in-out flex justify-center ${showAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                            <Alert className="max-w-[600px] w-full" dir="rtl" severity={showAlertType}>
                                <div className="mr-2">{showAlertMessage}</div>
                            </Alert>
                        </div>
                    </div>
                    <ModalMessage yetsor Aeshor={(value) => {
                        if (value) {
                            ResetAll();
                            disable();
                        }
                    }} message={'האם אתה בטוח שאתה רוצה לסגור את הדף, הפרטיים שהזנו לא ישמרו'} show={showModalMessage} disable={() => setShowModalMessage(false)} />
                    <TokhnetContext.Provider value={contextValue}>
                        <ModalYetsorTokhnet yetsorKeam={yetsorKeam} resetBro={(val1, val2) => RemoveMotsaremBro(val1, val2)} reset={(val) => ResetMotsaremLhANDRe(val)} addBro={(val) => UpdateMotsaremBroLhANDRe(val)} add={(val) => UpdateMotsaremLhANDRe(val)} mlae={mlae} setMotsaremLhatseg={(value) => setMotsaremLhatseg(value)} show={showModalTokhnetYetsor} disable={() => setShowModalTokhnetYetsor(false)} />
                    </TokhnetContext.Provider>
                    <ModalBerotMotsrem GetError={(val) => setErrorMotsaremRglem(val)} shlav={getNextLetter(shlavNokhhe)} category={category} mlae={mlae} setMotsaremRglem={(value) => setMotsaremRglem(value)} setMotsaremBrofelem={(value) => setMotsaremBrofelem(value)} motsaremLhatseg={motsaremLhatseg} motsaremBrofelem={motsaremBrofelem} motsaremRglem={motsaremRglem} show={showModalBerotMotsrem} disable={() => setShowModalBerotMotsrem(false)} />
                    <ModalAddCustomer LkohHdash={(val1, val2) => {
                        if (val1) {
                            setLkohHdash(false);
                            setLkohForAdd(val2);
                            ResetCustomer();
                        }
                    }} brtem={{
                        customerName,
                        customerCity,
                        customerPhone,
                        msbarMezahehm
                    }} lkhot={lkhot} counter={counterLkhot} show={showModalAddCustomer} disable={() => setShowModalAddCustomer(false)} />
                    <div className="w-[1200px] absolute h-[900px] hidden overflow-auto bg-white z-50 border-2 border-black">
                        <MtsavemPage tokhnet={{
                        sogAglaBS,
                        aorkh,
                        rohav,
                        retsba,
                        msbarTsrem,
                        AemBlamem,
                        brofelTfesa,
                        tsmgem,
                        tsmgSber,
                        msgeretThtonah,
                        hlokaThtonah,
                        tvahHlokaThtona,
                        msbarBrofHlokaThotona,
                        yetsol,
                        aorkhBroYetsol,
                        sheldaHetsonet,
                        tvahSheldaBnemet,
                        msbarBroSheldaBnemet,
                        helekReshonSheldaBnemet,
                        msbarBroSheldaBnemetReshon,
                        helekShneSheldaBnemet,
                        msbarBroSheldaBnemetShne,
                        dalet,
                        msgertRmbaDalet,
                        msgertRmbaDaletAorkh,
                        hlokatRmbaDalet,
                        hlokatRmbaDaletBro,
                        hlokatRmbaDaletTvah,
                        tosefetVnel,
                        toseftVnelBro,
                        solam,
                        msgertSolam,
                        gobahSolam,
                        hlokatSolam,
                        tvahAofkeSolam,
                        msbarBroAofkeSolam,
                        tvahAnkheSolam,
                        msbarBroAnkheSolam,
                        daletAleon,
                        toseftReshet,
                        vnel,
                        msgertVnel,
                        gobahVnel,
                        tvahAofkeVnel,
                        msbarBroAofkeVnel,
                        tvahAnkheVnel,
                        msbarBroAnkheVnel,
                        tosfot
                    }} brtemKlalem={{
                        snef: yetsorKeam?.locationYetsor || locationYetsor,
                        msbarAglaHzmna: yetsorKeam?.msbar || counter?.count,
                        shemlkoh: brtemLkoh?.name || customerName,
                        tarekhAsbka,
                        mherKlale,
                        mherKlaleAhre,
                        mkdema,
                        msbarTshlomem,
                        tnaeTshlom,
                        haraKlalet,
                        ymeAskem,
                        thslomAher,
                        yetera : parseFloat(mherKlaleAhre - mkdema).toFixed(2),

                        }} mlae={mlae} motsarem={{ motsaremRglem, motsaremBrofelem, motsaremLhatseg }} mtsav={GetShlavemInHebrow(shlavNokhhe,true)} ref={PrintRef} /></div>
                    {
                        yetsorKeam?.msbar && <ModalMtsavYetsor res={{
                            a: yetsorKeam?.mtsavYetsor[0] || null,
                            b: yetsorKeam?.mtsavYetsor[1] || null,
                            c: yetsorKeam?.mtsavYetsor[2] || null,
                            d: yetsorKeam?.mtsavYetsor[3] || null,
                            e: yetsorKeam?.mtsavYetsor[4] || null,
                            f: yetsorKeam?.mtsavYetsor[5] || null,
                        }} show={showModalMtsavYetsor} disable={() => setShowModalMtsavYetsor(false)} />
                    }
                    
                    <div className="w-full h-full flex flex-col md:flex-row">
                        <div className="w-full md:w-1/4 h-full pr-3 pl-3 hidden md:block">
                            <Card className="w-full h-full">
                                <CardBody>
                                    <div className="bg-gray-200 rounded-lg p-1">
                                        <div className="text-2xl font-bold text-center h-[50px] items-center flex justify-center text-gray-800">תמחיר</div>
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-green-500">מחיר שוק</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪ ${mherKlale}`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-success-500">מחיר מכירה</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪ ${mherKlaleAhre}`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-danger-500">הוצאות חו"ג</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪ ${hkhnsotHomreGlem}`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-danger-500">הוצאות שכר</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪ ${hotsotSkhar}`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-green-500">רווח ישיר</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={`₪`} />
                                    </div>
                                    <div className="h-full flex items-center flex-wrap w-full justify-center" dir="rtl">
                                        <div className="ml-5 w-[110px] text-right text-danger-500">הוצאות עקיפות</div>
                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={`₪ ${hotsotAkefot}`} />
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
                        <div className="w-full md:w-3/4 h-full pl-3 pr-3">
                            <Card dir="rtl" className="w-full h-full">
                                <CardBody className="h-full">
                                    <div className="bg-gray-200 rounded-lg p-1">
                                        <div className="flex">
                                            {GetShlavemInHebrow(shlavNokhhe) === 'שלב הזמנה' && GetMotionTitels('שלב הזמנה')}
                                            {GetShlavemInHebrow(shlavNokhhe) === 'שלב הצעה' && GetMotionTitels('שלב הצעה')}
                                            {GetShlavemInHebrow(shlavNokhhe) === 'שלב ייצור' && GetMotionTitels('שלב ייצור')}
                                            {GetShlavemInHebrow(shlavNokhhe) === 'שלב סיום' && GetMotionTitels('שלב סיום')}
                                            <div className="md:hidden m-auto flex items-center z-50">
                                                <Button variant="light" color="primary" onClick={toggleDrawer(true)}><FaBars className="text-xl" /></Button>
                                                <Drawer dir="rtl" open={open} onClose={toggleDrawer(false)}>
                                                    {DrawerList}
                                                </Drawer>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full h-full flex-grow p-4 overflow-auto">
                                        <div className="w-full h-full">






                                            {(shlavNokhhe === 'A') &&
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key="A"
                                                        initial={{ opacity: 0, x: 100 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -100 }}
                                                        transition={{ duration: 0.5 }}
                                                    >

                                                        <div className="w-full flex items-center pb-3 border-b-1">
                                                            <RiFileList3Fill className="text-xl text-primary" />
                                                            <div className="mr-2 border-r-2 pr-2 flex items-center font-black text-black">
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        סניף :
                                                                    </div>
                                                                    <div className="mr-1">
                                                                        {locationYetsorAgla || locationYetsor}
                                                                    </div>
                                                                </div>
                                                                <div className="mr-2 ml-2">|</div>
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        מס עגלה :
                                                                    </div>
                                                                    <div className="mr-1">
                                                                        {yetsorKeam?.msbar || counter?.count}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full flex items-center pb-3 pt-3 border-b-1">
                                                            <FaLocationDot className="text-xl text-primary" />
                                                            <div className="mr-2 border-r-2 pr-2">
                                                                <Dropdown dir="rtl" className="select-none">
                                                                    <DropdownTrigger>
                                                                        <Button className="" dir="ltr" color="primary" variant='flat' size="lg">
                                                                            <MdKeyboardArrowDown className="text-xl" />{locationYetsorAgla || 'סניף ייצור'}
                                                                        </Button>
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu
                                                                        aria-label="Multiple selection example"
                                                                        variant="flat"
                                                                        closeOnSelect={true}
                                                                        disallowEmptySelection
                                                                        selectionMode='single'
                                                                        selectedKeys={locationYetsorAgla}
                                                                        onSelectionChange={(val) => setLocationYetsorAgla(val.currentKey)}
                                                                    >
                                                                        <DropdownItem key={'עארה'}>{'עארה'}</DropdownItem>
                                                                        <DropdownItem key={'מעלה אפריים'}>{'מעלה אפריים'}</DropdownItem>
                                                                    </DropdownMenu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                        <div className="w-full flex items-center pb-3 pt-3 border-b-1">
                                                            <FaUser className="text-xl text-primary" />
                                                            {
                                                                lkohHdash &&
                                                                (
                                                                    <>
                                                                        <div className="mr-2 border-r-2 pr-2">
                                                                            <Button onClick={() => { setLkohHdash(false); ResetCustomer(); }} size="sm" color="primary" variant="flat" className="text-base rounded-full">
                                                                                <IoIosArrowForward className="text-xl" />
                                                                            </Button>
                                                                        </div>
                                                                        <AnimatePresence mode="wait">
                                                                            <motion.div
                                                                                key="A"
                                                                                initial={{ opacity: 0, x: 100 }}
                                                                                animate={{ opacity: 1, x: 0 }}
                                                                                exit={{ opacity: 0, x: -100 }}
                                                                                transition={{ duration: 0.5 }}
                                                                            >
                                                                                <div className="mr-2 flex items-center">
                                                                                    <Input value={customerName} onValueChange={(val) => setCustomerName(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="שם לקוח" />
                                                                                    <Input value={msbarMezahehm} onValueChange={(val) => setMsbarMezahehm(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="מספר מזהה" />
                                                                                    <Input value={customerPhone} onValueChange={(val) => setCustomerPhone(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="מס טלפון" />
                                                                                    <Input value={customerCity} onValueChange={(val) => setCustomerCity(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="ישוב" />
                                                                                    <Button onClick={() => { setShowModalAddCustomer(true); }} size="sm" color="primary" variant="flat" className="text-base rounded-full">
                                                                                        <MdMoreHoriz className="text-3xl" />
                                                                                    </Button>
                                                                                </div>
                                                                            </motion.div>
                                                                        </AnimatePresence>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                !lkohHdash &&
                                                                (
                                                                    <>
                                                                        {
                                                                            yetsorKeam?.brtemLkoh?.id ?
                                                                                <AnimatePresence mode="wait">
                                                                                    <motion.div
                                                                                        key="A"
                                                                                        initial={{ opacity: 0, x: 100 }}
                                                                                        animate={{ opacity: 1, x: 0 }}
                                                                                        exit={{ opacity: 0, x: -100 }}
                                                                                        transition={{ duration: 0.5 }}
                                                                                    >
                                                                                        <div className="mr-2 border-r-2 pr-2">
                                                                                            <Input isReadOnly value={yetsorKeam?.brtemLkoh?.name} color="primary" size="sm" className="max-w-[200px]" />
                                                                                        </div>
                                                                                    </motion.div>
                                                                                </AnimatePresence>
                                                                                :
                                                                                <AnimatePresence mode="wait">
                                                                                    <motion.div
                                                                                        key="A"
                                                                                        initial={{ opacity: 0, x: 100 }}
                                                                                        animate={{ opacity: 1, x: 0 }}
                                                                                        exit={{ opacity: 0, x: -100 }}
                                                                                        transition={{ duration: 0.5 }}
                                                                                    >
                                                                                        <div className="mr-2 border-r-2 pr-2">
                                                                                            <Autocomplete
                                                                                                isDisabled={yetsorKeam?.brtemLkoh?.id}
                                                                                                label="בחר לקוח"
                                                                                                className="max-w-[200px]"
                                                                                                color="primary"
                                                                                                size="sm"
                                                                                                selectedKey={brtemLkoh?.id}
                                                                                                defaultItems={lkhot}
                                                                                            >
                                                                                                {
                                                                                                    lkhot.map((lko, index) => (
                                                                                                        <AutocompleteItem onClick={() => { setBrtemLkoh(lko); }} className='text-right' key={lko?.id} value={lko?.name}>
                                                                                                            {lko?.name}
                                                                                                        </AutocompleteItem>
                                                                                                    ))
                                                                                                }
                                                                                            </Autocomplete>
                                                                                        </div>
                                                                                    </motion.div>
                                                                                </AnimatePresence>
                                                                        }
                                                                        {
                                                                            !yetsorKeam?.brtemLkoh?.id &&
                                                                            <div className="mr-2">
                                                                                <Button onClick={() => {setLkohHdash(true);setBrtemLkoh(null);}} size="sm" color="primary" variant="flat" className="text-base rounded-full">
                                                                                    חדש <IoIosArrowBack className="text-xl" />
                                                                                </Button>
                                                                            </div>
                                                                        }

                                                                    </>
                                                                )
                                                            }
                                                        </div>

                                                        <div className="border-b-1 pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <FaShekelSign className="text-xl text-primary" />
                                                                <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                    <Input label={`סכום (לפני מע"מ)`} isReadOnly={yetsorKeam?.mherMkhera} size="sm" type="number" value={mherKlale || ''} onValueChange={(val) => { setMherKlale(val); setMherKlaleAhre(parseFloat(parseFloat(val * 1.17).toFixed(2))) }} color="primary" className="max-w-[150px]" />
                                                                    <Input label={`סכום (כולל מע"מ)`} isReadOnly={yetsorKeam?.mherMkheraAhre} size="sm" type="number" value={mherKlaleAhre || ''} onValueChange={(val) => { setMherKlaleAhre(val); setMherKlale(parseFloat(parseFloat(val / 1.17).toFixed(2))); }} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Input label={`מקדימה`} isReadOnly={yetsorKeam?.mkdema} size="sm" type="number" value={mkdema || ''} onValueChange={(val) => setMkdema(val)} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Input label={`יתרה לתשלום`} isReadOnly size="sm" value={parseFloat(mherKlaleAhre - mkdema).toFixed(2) || ''} onValueChange={(val) => setMkdema(val)} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Input label={`מספר תשלומים`} isReadOnly={yetsorKeam?.msbarTshlomem} size="sm" type="number" value={msbarTshlomem || ''} onValueChange={(val) => setMsbarTshlomem(val)} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Dropdown dir="rtl" className="select-none">
                                                                        <DropdownTrigger>
                                                                            <Button className="mr-3 max-w-[150px]" dir="ltr" color="primary"  variant='flat' size="lg">
                                                                                <MdKeyboardArrowDown className="text-xl" />{tnaeTshlom || 'אמצעי תשלום'}
                                                                            </Button>
                                                                        </DropdownTrigger>
                                                                        <DropdownMenu
                                                                            aria-label="Multiple selection example"
                                                                            variant="flat"
                                                                            closeOnSelect={true}
                                                                            disallowEmptySelection
                                                                            selectionMode='single'
                                                                            selectedKeys={tnaeTshlom}
                                                                            onSelectionChange={(val) => setTnaeTshlom(val.currentKey)}
                                                                        >
                                                                            <DropdownItem key={'העברה'}>{'העברה'}</DropdownItem>
                                                                            <DropdownItem key={'מזומן'}>{'מזומן'}</DropdownItem>
                                                                            <DropdownItem key={'כרטיס אשראי'}>{'כרטיס אשראי'}</DropdownItem>
                                                                            <DropdownItem key={'שיק'}>{'שיק'}</DropdownItem>
                                                                            <DropdownItem key={'אחר'}>{'אחר'}</DropdownItem>
                                                                        </DropdownMenu>
                                                                    </Dropdown>
                                                                    {tnaeTshlom === 'אחר' && <Input label={`תשלום אחר`} size="sm" type="text" value={thslomAher || ''} onValueChange={(val) => setTshlomAher(val)} color="primary" className="mr-3 max-w-[150px]" />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="border-b-1 pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <PiClockBold className="text-xl text-primary" />
                                                                <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                    <Input className="max-w-[150px]" value={ymeAskem || ''} onValueChange={(value) => {handleYmeAskemChange(value);}} color="primary" variant="flat" type='number' size="sm" label="ימי עסקים" />
                                                                    <Input className="max-w-[150px] mr-3" value={tarekhAsbka || format(new Date(), 'dd-MM-yyyy')} onValueChange={(value) => {handleTarekhAsbkaChange(value);}} color="primary" variant="flat" type='date' size="sm" label="תאריך אספקה" />
                                                                    <div className="mr-3 ml-3 w-[150px]">
                                                                        מספר עדיפות
                                                                    </div>
                                                                    <Pagination page={msbarAdefot} onChange={setMsbarAdefot} className="w-full" total={5} initialPage={1} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="border-b-1 pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <div>
                                                                    <AiOutlineFundProjectionScreen className="text-xl text-primary ml-2" />
                                                                </div>
                                                                <div className="border-r-2 pr-2">
                                                                    <div className="flex justify-start">
                                                                        <Dropdown dir="rtl">
                                                                            <DropdownTrigger>
                                                                                <Button dir="ltr" color="primary" variant='flat' size="lg">
                                                                                    <MdKeyboardArrowDown className="text-xl" />{shemTokhnet ? `${shemTokhnet}` : 'בחירת תוכנית'}
                                                                                </Button>
                                                                            </DropdownTrigger>
                                                                            <DropdownMenu
                                                                                aria-label="Multiple selection example"
                                                                                variant="flat"
                                                                                closeOnSelect={true}
                                                                                disallowEmptySelection
                                                                                selectionMode="single"
                                                                                onSelectionChange={(val) => {setShemTokhnet(val.currentKey);setTokhnet(null);resetAllTokhnetYdnet();}}
                                                                            >
                                                                                <DropdownItem key='תוכנית ידנית'>תוכנית ידנית</DropdownItem>
                                                                                {Tokhneot?.map((option) => (
                                                                                    <DropdownItem onClick={() => setTokhnet(option)} key={option.shem}>{option.shem}</DropdownItem>
                                                                                ))}
                                                                            </DropdownMenu>
                                                                        </Dropdown>
                                                                    </div>
                                                                    <div className="mt-3">
                                                                        <Button isDisabled={!shemTokhnet} className="ml-2" size='md' variant="flat" onClick={() => setShowModalTokhnetYetsor(true)} color='primary'>תוכנית ייצור</Button>
                                                                        <Button isDisabled={!shemTokhnet} className="mr-2 ml-2" size='md' variant="flat" onClick={() => setShowModalBerotMotsrem(true)} color="primary">פירוט מוצרים</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <LiaCommentSolid className="text-xl text-primary" />
                                                                <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                    <Textarea
                                                                        maxRows={3}
                                                                        label="הערה כללית..."
                                                                        className="max-w-[300px] w-full ml-2"
                                                                        value={haraKlalet}
                                                                        onValueChange={(val) => setHaraKlalet(val)}
                                                                        color="primary"
                                                                        variant="flat"
                                                                    />

                                                                    <Textarea
                                                                        maxRows={3}
                                                                        label="הערה פנמית..."
                                                                        value={haraBnmet}
                                                                        onValueChange={(val) => setHaraBnmet(val)}
                                                                        className="max-w-[300px] w-full mr-2 ml-2"
                                                                        color="primary"
                                                                        variant="flat"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </AnimatePresence>
                                            }



                                            {(shlavNokhhe === 'B') &&
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key="B"
                                                        initial={{ opacity: 0, x: 100 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -100 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                         <div className="w-full flex items-center pb-3 border-b-1">
                                                            <RiFileList3Fill className="text-xl text-primary" />
                                                            <div className="mr-2 border-r-2 pr-2 flex items-center font-black text-black">
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        סניף :
                                                                    </div>
                                                                    <div className="mr-1">
                                                                        {locationYetsorAgla || locationYetsor}
                                                                    </div>
                                                                </div>
                                                                <div className="mr-2 ml-2">|</div>
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        מס עגלה :
                                                                    </div>
                                                                    <div className="mr-1">
                                                                        {yetsorKeam?.msbar || counter?.count}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full flex items-center pb-3 pt-3 border-b-1">
                                                            <FaLocationDot className="text-xl text-primary" />
                                                            <div className="mr-2 border-r-2 pr-2">
                                                                <Dropdown dir="rtl" className="select-none">
                                                                    <DropdownTrigger>
                                                                        <Button className="" dir="ltr" color="primary" variant='flat' size="lg">
                                                                            <MdKeyboardArrowDown className="text-xl" />{locationYetsorAgla || 'אמצעי תשלום'}
                                                                        </Button>
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu
                                                                        aria-label="Multiple selection example"
                                                                        variant="flat"
                                                                        closeOnSelect={true}
                                                                        disallowEmptySelection
                                                                        selectionMode='single'
                                                                        selectedKeys={locationYetsorAgla}
                                                                        onSelectionChange={(val) => setLocationYetsorAgla(val.currentKey)}
                                                                    >
                                                                        <DropdownItem key={'עארה'}>{'עארה'}</DropdownItem>
                                                                        <DropdownItem key={'מעלה אפריים'}>{'מעלה אפריים'}</DropdownItem>
                                                                    </DropdownMenu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                        <div className="w-full flex items-center pb-3 pt-3 border-b-1">
                                                            <FaUser className="text-xl text-primary" />
                                                            {
                                                                lkohHdash &&
                                                                (
                                                                    <>
                                                                        <div className="mr-2 border-r-2 pr-2">
                                                                            <Button onClick={() => { setLkohHdash(false); ResetCustomer(); }} size="sm" color="primary" variant="flat" className="text-base rounded-full">
                                                                                <IoIosArrowForward className="text-xl" />
                                                                            </Button>
                                                                        </div>
                                                                        <AnimatePresence mode="wait">
                                                                            <motion.div
                                                                                key="A"
                                                                                initial={{ opacity: 0, x: 100 }}
                                                                                animate={{ opacity: 1, x: 0 }}
                                                                                exit={{ opacity: 0, x: -100 }}
                                                                                transition={{ duration: 0.5 }}
                                                                            >
                                                                                <div className="mr-2 flex items-center">
                                                                                    <Input value={customerName} onValueChange={(val) => setCustomerName(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="שם לקוח" />
                                                                                    <Input value={msbarMezahehm} onValueChange={(val) => setMsbarMezahehm(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="מספר מזהה" />
                                                                                    <Input value={customerPhone} onValueChange={(val) => setCustomerPhone(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="מס טלפון" />
                                                                                    <Input value={customerCity} onValueChange={(val) => setCustomerCity(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="ישוב" />
                                                                                    <Button onClick={() => { setShowModalAddCustomer(true); }} size="sm" color="primary" variant="flat" className="text-base rounded-full">
                                                                                        <MdMoreHoriz className="text-3xl" />
                                                                                    </Button>
                                                                                </div>
                                                                            </motion.div>
                                                                        </AnimatePresence>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                !lkohHdash &&
                                                                (
                                                                    <>
                                                                        {
                                                                            yetsorKeam?.brtemLkoh?.id ?
                                                                                <AnimatePresence mode="wait">
                                                                                    <motion.div
                                                                                        key="A"
                                                                                        initial={{ opacity: 0, x: 100 }}
                                                                                        animate={{ opacity: 1, x: 0 }}
                                                                                        exit={{ opacity: 0, x: -100 }}
                                                                                        transition={{ duration: 0.5 }}
                                                                                    >
                                                                                        <div className="mr-2 border-r-2 pr-2">
                                                                                            <Input isReadOnly value={yetsorKeam?.brtemLkoh?.name} color="primary" size="sm" className="max-w-[200px]" />
                                                                                        </div>
                                                                                    </motion.div>
                                                                                </AnimatePresence>
                                                                                :
                                                                                <AnimatePresence mode="wait">
                                                                                    <motion.div
                                                                                        key="A"
                                                                                        initial={{ opacity: 0, x: 100 }}
                                                                                        animate={{ opacity: 1, x: 0 }}
                                                                                        exit={{ opacity: 0, x: -100 }}
                                                                                        transition={{ duration: 0.5 }}
                                                                                    >
                                                                                        <div className="mr-2 border-r-2 pr-2">
                                                                                            <Autocomplete
                                                                                                isDisabled={yetsorKeam?.brtemLkoh?.id}
                                                                                                label="בחר לקוח"
                                                                                                className="max-w-[200px]"
                                                                                                color="primary"
                                                                                                size="sm"
                                                                                                selectedKey={brtemLkoh?.id}
                                                                                                defaultItems={lkhot}
                                                                                            >
                                                                                                {
                                                                                                    lkhot.map((lko, index) => (
                                                                                                        <AutocompleteItem onClick={() => { setBrtemLkoh(lko); }} className='text-right' key={lko?.id} value={lko?.name}>
                                                                                                            {lko?.name}
                                                                                                        </AutocompleteItem>
                                                                                                    ))
                                                                                                }
                                                                                            </Autocomplete>
                                                                                        </div>
                                                                                    </motion.div>
                                                                                </AnimatePresence>
                                                                        }
                                                                        {
                                                                            !yetsorKeam?.brtemLkoh?.id &&
                                                                            <div className="mr-2">
                                                                                <Button onClick={() => {setLkohHdash(true);setBrtemLkoh(null);}} size="sm" color="primary" variant="flat" className="text-base rounded-full">
                                                                                    חדש <IoIosArrowBack className="text-xl" />
                                                                                </Button>
                                                                            </div>
                                                                        }

                                                                    </>
                                                                )
                                                            }

                                                        </div>
                                                        <div className="border-b-1 pb-3 pt-3">
                                                            <div className="w-full flex items-center">
                                                                <FaShekelSign className="text-xl text-primary" />
                                                                <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                    <Input label={`סכום (לפני מע"מ)`} isReadOnly={yetsorKeam?.mherMkhera} size="sm" type="number" value={mherKlale || ''} onValueChange={(val) => { setMherKlale(val); setMherKlaleAhre(parseFloat(parseFloat(val * 1.17).toFixed(2))) }} color="primary" className="max-w-[150px]" />
                                                                    <Input label={`סכום (כולל מע"מ)`} isReadOnly={yetsorKeam?.mherMkhera} size="sm" type="number" value={mherKlaleAhre || ''} onValueChange={(val) => { setMherKlaleAhre(val); setMherKlale(parseFloat(parseFloat(val / 1.17).toFixed(2))); }} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Input label={`מקדימה`} isReadOnly={yetsorKeam?.mkdema} size="sm" type="number" value={mkdema || ''} onValueChange={(val) => setMkdema(val)} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Input label={`יתרה לתשלום`} isReadOnly size="sm" value={parseFloat(mherKlaleAhre - mkdema).toFixed(2) || ''} onValueChange={(val) => setMkdema(val)} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Input label={`מספר תשלומים`} isReadOnly={yetsorKeam?.msbarTshlomem} size="sm" type="number" value={msbarTshlomem || ''} onValueChange={(val) => setMsbarTshlomem(val)} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Dropdown dir="rtl" className="select-none">
                                                                        <DropdownTrigger>
                                                                            <Button className="mr-3 max-w-[150px]" dir="ltr" color="primary" variant='flat' size="lg">
                                                                                <MdKeyboardArrowDown className="text-xl" />{tnaeTshlom || 'אמצעי תשלום'}
                                                                            </Button>
                                                                        </DropdownTrigger>
                                                                        <DropdownMenu
                                                                            aria-label="Multiple selection example"
                                                                            variant="flat"
                                                                            closeOnSelect={true}
                                                                            disallowEmptySelection
                                                                            selectionMode='single'
                                                                            selectedKeys={tnaeTshlom}
                                                                            onSelectionChange={(val) => setTnaeTshlom(val.currentKey)}
                                                                        >
                                                                            <DropdownItem key={'העברה'}>{'העברה'}</DropdownItem>
                                                                            <DropdownItem key={'מזומן'}>{'מזומן'}</DropdownItem>
                                                                            <DropdownItem key={'כרטיס אשראי'}>{'כרטיס אשראי'}</DropdownItem>
                                                                            <DropdownItem key={'שיק'}>{'שיק'}</DropdownItem>
                                                                            <DropdownItem key={'אחר'}>{'אחר'}</DropdownItem>
                                                                        </DropdownMenu>
                                                                    </Dropdown>
                                                                    {tnaeTshlom === 'אחר' && <Input label={`תשלום אחר`} size="sm" type="text" value={thslomAher || ''} onValueChange={(val) => setTshlomAher(val)} color="primary" className="mr-3 max-w-[150px]" />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="border-b-1 pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <PiClockBold className="text-xl text-primary" />
                                                                <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                <Input className="max-w-[150px]" value={ymeAskem || ''} onValueChange={(value) => {handleYmeAskemChange(value);}} color="primary" variant="flat" type='number' size="sm" label="ימי עסקים" />
                                                                <Input className="max-w-[150px] mr-3" value={tarekhAsbka || format(new Date(), 'dd-MM-yyyy')} onValueChange={(value) => {handleTarekhAsbkaChange(value);}} color="primary" variant="flat" type='date' size="sm" label="תאריך אספקה" />
                                                                    <div className="mr-2 ml-3 w-[150px]">
                                                                        מספר עדיפות
                                                                    </div>
                                                                    <Pagination page={msbarAdefot} onChange={setMsbarAdefot} className="w-full" total={5} initialPage={1} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="border-b-1 pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <div>
                                                                    <AiOutlineFundProjectionScreen className="text-xl text-primary ml-2" />
                                                                </div>
                                                                <div className="border-r-2 pr-2">
                                                                    <div className="flex justify-start">
                                                                        <Dropdown dir="rtl">
                                                                            <DropdownTrigger>
                                                                                <Button dir="ltr" color="primary" variant='flat' size="lg">
                                                                                    <MdKeyboardArrowDown className="text-xl" />{shemTokhnet ? `${shemTokhnet}` : 'בחירת תוכנית'}
                                                                                </Button>
                                                                            </DropdownTrigger>
                                                                            <DropdownMenu
                                                                                aria-label="Multiple selection example"
                                                                                variant="flat"
                                                                                closeOnSelect={true}
                                                                                disallowEmptySelection
                                                                                selectionMode="single"
                                                                                onSelectionChange={(val) => {setShemTokhnet(val.currentKey);setTokhnet(null);resetAllTokhnetYdnet();}}
                                                                            >
                                                                                <DropdownItem key='תוכנית ידנית'>תוכנית ידנית</DropdownItem>
                                                                                {Tokhneot?.map((option) => (
                                                                                    <DropdownItem onClick={() => setTokhnet(option)} key={option.shem}>{option.shem}</DropdownItem>
                                                                                ))}
                                                                            </DropdownMenu>
                                                                        </Dropdown>
                                                                    </div>
                                                                    <div className="mt-3 flex items-center">
                                                                        <div>
                                                                            <Button isDisabled={!shemTokhnet} className="ml-2" size='md' variant="flat" onClick={() => setShowModalTokhnetYetsor(true)} color='primary'>תוכנית ייצור</Button>
                                                                        </div>
                                                                        <div className="relative">
                                                                            {
                                                                                errorMotsaremRglem && <Tooltip
                                                                                    content={<div className='text-danger text-xs'>כמות מוצרים חורגת</div>}
                                                                                    placement="top"
                                                                                    trigger="hover"
                                                                                    className="z-50 border-1 border-danger"
                                                                                    showArrow={true}
                                                                                >
                                                                                    <div className=" absolute top-[-10px] left-0 z-50"><MdError className="text-2xl text-danger" /></div>
                                                                                </Tooltip>
                                                                            }
                                                                            <Button isDisabled={!shemTokhnet} className="mr-2 ml-2" size='md' variant="flat" onClick={() => setShowModalBerotMotsrem(true)} color="primary">פירוט מוצרים</Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <LiaCommentSolid className="text-xl text-primary" />
                                                                <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                    <Textarea
                                                                        maxRows={3}
                                                                        label="הערה כללית..."
                                                                        className="max-w-[300px] w-full ml-2"
                                                                        value={haraKlalet}
                                                                        onValueChange={(val) => setHaraKlalet(val)}
                                                                        color="primary"
                                                                        variant="flat"
                                                                    />

                                                                    <Textarea
                                                                        maxRows={3}
                                                                        label="הערה פנמית..."
                                                                        value={haraBnmet}
                                                                        onValueChange={(val) => setHaraBnmet(val)}
                                                                        className="max-w-[300px] w-full mr-2 ml-2"
                                                                        color="primary"
                                                                        variant="flat"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </AnimatePresence>
                                            }



                                            {(shlavNokhhe === 'C') &&
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key="C"
                                                        initial={{ opacity: 0, x: 100 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -100 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                         <div className="w-full flex items-center pb-3 border-b-1">
                                                            <RiFileList3Fill className="text-xl text-primary" />
                                                            <div className="mr-2 border-r-2 pr-2 flex items-center font-black text-black">
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        סניף :
                                                                    </div>
                                                                    <div className="mr-1">
                                                                        {locationYetsorAgla || locationYetsor}
                                                                    </div>
                                                                </div>
                                                                <div className="mr-2 ml-2">|</div>
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        מס עגלה :
                                                                    </div>
                                                                    <div className="mr-1">
                                                                        {yetsorKeam?.msbar || counter?.count}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full flex items-center pb-3 pt-3 border-b-1">
                                                            <FaUser className="text-xl text-primary" />
                                                            {
                                                                lkohHdash &&
                                                                (
                                                                    <>
                                                                        <div className="mr-2 border-r-2 pr-2">
                                                                            <Button onClick={() => { setLkohHdash(false); ResetCustomer(); }} size="sm" color="primary" variant="flat" className="text-base rounded-full">
                                                                                <IoIosArrowForward className="text-xl" />
                                                                            </Button>
                                                                        </div>
                                                                        <AnimatePresence mode="wait">
                                                                            <motion.div
                                                                                key="A"
                                                                                initial={{ opacity: 0, x: 100 }}
                                                                                animate={{ opacity: 1, x: 0 }}
                                                                                exit={{ opacity: 0, x: -100 }}
                                                                                transition={{ duration: 0.5 }}
                                                                            >
                                                                                <div className="mr-2 flex items-center">
                                                                                    <Input value={customerName} onValueChange={(val) => setCustomerName(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="שם לקוח" />
                                                                                    <Input value={msbarMezahehm} onValueChange={(val) => setMsbarMezahehm(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="מספר מזהה" />
                                                                                    <Input value={customerPhone} onValueChange={(val) => setCustomerPhone(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="מס טלפון" />
                                                                                    <Input value={customerCity} onValueChange={(val) => setCustomerCity(val)} size="sm" className="max-w-[150px] mr-2 ml-2" color="primary" variant="flat" label="ישוב" />
                                                                                    <Button onClick={() => { setShowModalAddCustomer(true); }} size="sm" color="primary" variant="flat" className="text-base rounded-full">
                                                                                        <MdMoreHoriz className="text-3xl" />
                                                                                    </Button>
                                                                                </div>
                                                                            </motion.div>
                                                                        </AnimatePresence>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                !lkohHdash &&
                                                                (
                                                                    <>
                                                                        {
                                                                            yetsorKeam?.brtemLkoh?.id ?
                                                                                <AnimatePresence mode="wait">
                                                                                    <motion.div
                                                                                        key="A"
                                                                                        initial={{ opacity: 0, x: 100 }}
                                                                                        animate={{ opacity: 1, x: 0 }}
                                                                                        exit={{ opacity: 0, x: -100 }}
                                                                                        transition={{ duration: 0.5 }}
                                                                                    >
                                                                                        <div className="mr-2 border-r-2 pr-2">
                                                                                            <Input isReadOnly value={yetsorKeam?.brtemLkoh?.name} color="primary" size="sm" className="max-w-[200px]" />
                                                                                        </div>
                                                                                    </motion.div>
                                                                                </AnimatePresence>
                                                                                :
                                                                                <AnimatePresence mode="wait">
                                                                                    <motion.div
                                                                                        key="A"
                                                                                        initial={{ opacity: 0, x: 100 }}
                                                                                        animate={{ opacity: 1, x: 0 }}
                                                                                        exit={{ opacity: 0, x: -100 }}
                                                                                        transition={{ duration: 0.5 }}
                                                                                    >
                                                                                        <div className="mr-2 border-r-2 pr-2">
                                                                                            <Autocomplete
                                                                                                isDisabled={yetsorKeam?.brtemLkoh?.id}
                                                                                                label="בחר לקוח"
                                                                                                className="max-w-[200px]"
                                                                                                color="primary"
                                                                                                size="sm"
                                                                                                selectedKey={brtemLkoh?.id}
                                                                                                defaultItems={lkhot}
                                                                                            >
                                                                                                {
                                                                                                    lkhot.map((lko, index) => (
                                                                                                        <AutocompleteItem onClick={() => { setBrtemLkoh(lko); }} className='text-right' key={lko?.id} value={lko?.name}>
                                                                                                            {lko?.name}
                                                                                                        </AutocompleteItem>
                                                                                                    ))
                                                                                                }
                                                                                            </Autocomplete>
                                                                                        </div>
                                                                                    </motion.div>
                                                                                </AnimatePresence>
                                                                        }
                                                                        {
                                                                            !yetsorKeam?.brtemLkoh?.id &&
                                                                            <div className="mr-2">
                                                                                <Button onClick={() => {setLkohHdash(true);setBrtemLkoh(null);}} size="sm" color="primary" variant="flat" className="text-base rounded-full">
                                                                                    חדש <IoIosArrowBack className="text-xl" />
                                                                                </Button>
                                                                            </div>
                                                                        }

                                                                    </>
                                                                )
                                                            }

                                                        </div>
                                                        <div className="border-b-1 pb-3 pt-3">
                                                            <div className="w-full flex items-center">
                                                                <FaShekelSign className="text-xl text-primary" />
                                                                <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                    <Input label={`סכום (לפני מע"מ)`} isReadOnly={yetsorKeam?.mherMkhera} size="sm" type="number" value={mherKlale || ''} onValueChange={(val) => { setMherKlale(val); setMherKlaleAhre(parseFloat(parseFloat(val * 1.17).toFixed(2))) }} color="primary" className="max-w-[150px]" />
                                                                    <Input label={`סכום (כולל מע"מ)`} isReadOnly={yetsorKeam?.mherMkhera} size="sm" type="number" value={mherKlaleAhre || ''} onValueChange={(val) => { setMherKlaleAhre(val); setMherKlale(parseFloat(parseFloat(val / 1.17).toFixed(2))); }} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Input label={`מקדימה`} isReadOnly={yetsorKeam?.mkdema} size="sm" type="number" value={mkdema || ''} onValueChange={(val) => setMkdema(val)} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Input label={`יתרה לתשלום`} isReadOnly size="sm" value={parseFloat(mherKlaleAhre - mkdema).toFixed(2) || ''} onValueChange={(val) => setMkdema(val)} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Input label={`מספר תשלומים`} isReadOnly={yetsorKeam?.msbarTshlomem} size="sm" type="number" value={msbarTshlomem || ''} onValueChange={(val) => setMsbarTshlomem(val)} color="primary" className="mr-3 max-w-[150px]" />
                                                                    <Dropdown dir="rtl" className="select-none">
                                                                        <DropdownTrigger>
                                                                            <Button className="mr-3 max-w-[150px]" dir="ltr" color="primary" variant='flat' size="lg">
                                                                                <MdKeyboardArrowDown className="text-xl" />{tnaeTshlom || 'אמצעי תשלום'}
                                                                            </Button>
                                                                        </DropdownTrigger>
                                                                        <DropdownMenu
                                                                            aria-label="Multiple selection example"
                                                                            variant="flat"
                                                                            closeOnSelect={true}
                                                                            disallowEmptySelection
                                                                            selectionMode='single'
                                                                            selectedKeys={tnaeTshlom}
                                                                            onSelectionChange={(val) => setTnaeTshlom(val.currentKey)}
                                                                        >
                                                                            <DropdownItem key={'העברה'}>{'העברה'}</DropdownItem>
                                                                            <DropdownItem key={'מזומן'}>{'מזומן'}</DropdownItem>
                                                                            <DropdownItem key={'כרטיס אשראי'}>{'כרטיס אשראי'}</DropdownItem>
                                                                            <DropdownItem key={'שיק'}>{'שיק'}</DropdownItem>
                                                                            <DropdownItem key={'אחר'}>{'אחר'}</DropdownItem>
                                                                        </DropdownMenu>
                                                                    </Dropdown>
                                                                    {tnaeTshlom === 'אחר' && <Input label={`תשלום אחר`} size="sm" type="text" value={thslomAher || ''} onValueChange={(val) => setTshlomAher(val)} color="primary" className="mr-3 max-w-[150px]" />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="border-b-1 pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <PiClockBold className="text-xl text-primary" />
                                                                <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                <Input className="max-w-[150px]" value={ymeAskem || ''} onValueChange={(value) => {handleYmeAskemChange(value);}} color="primary" variant="flat" type='number' size="sm" label="ימי עסקים" />
                                                                <Input className="max-w-[150px] mr-3" value={tarekhAsbka || format(new Date(), 'dd-MM-yyyy')} onValueChange={(value) => {handleTarekhAsbkaChange(value);}} color="primary" variant="flat" type='date' size="sm" label="תאריך אספקה" />
                                                                    <div className="mr-2 ml-3 w-[150px]">
                                                                        מספר עדיפות
                                                                    </div>
                                                                    <Pagination page={msbarAdefot} onChange={setMsbarAdefot} className="w-full" total={5} initialPage={1} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="border-b-1 pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <div>
                                                                    <AiOutlineFundProjectionScreen className="text-xl text-primary ml-2" />
                                                                </div>
                                                                <div className="border-r-2 pr-2">
                                                                    <div className="flex justify-start">
                                                                        <Dropdown dir="rtl">
                                                                            <DropdownTrigger>
                                                                                <Button dir="ltr" color="primary" variant='flat' size="lg">
                                                                                    <MdKeyboardArrowDown className="text-xl" />{shemTokhnet ? `${shemTokhnet}` : 'בחירת תוכנית'}
                                                                                </Button>
                                                                            </DropdownTrigger>
                                                                            <DropdownMenu
                                                                                aria-label="Multiple selection example"
                                                                                variant="flat"
                                                                                closeOnSelect={true}
                                                                                disallowEmptySelection
                                                                                selectionMode="single"
                                                                                onSelectionChange={(val) => {setShemTokhnet(val.currentKey);setTokhnet(null);resetAllTokhnetYdnet();}}
                                                                            >
                                                                                <DropdownItem key='תוכנית ידנית'>תוכנית ידנית</DropdownItem>
                                                                                {Tokhneot?.map((option) => (
                                                                                    <DropdownItem onClick={() => setTokhnet(option)} key={option.shem}>{option.shem}</DropdownItem>
                                                                                ))}
                                                                            </DropdownMenu>
                                                                        </Dropdown>
                                                                    </div>
                                                                    <div className="mt-3">
                                                                        <Button isDisabled={!shemTokhnet} className="ml-2" size='md' variant="flat" onClick={() => setShowModalTokhnetYetsor(true)} color='primary'>תוכנית ייצור</Button>
                                                                        <Button isDisabled={!shemTokhnet} className="mr-2 ml-2" size='md' variant="flat" onClick={() => setShowModalBerotMotsrem(true)} color="primary">פירוט מוצרים</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="border-b-1 pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <IoSettings className="text-xl text-primary" />
                                                                <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                    <Button size="md" variant="flat" color="primary" onClick={() => setShowModalMtsavYetsor(true)}>שלבי ייצור</Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <div>
                                                                    <GrCertificate className="text-xl text-primary ml-2" />
                                                                </div>
                                                                <div className="border-r-2 pr-2">
                                                                    <div className="w-full flex">
                                                                        {
                                                                            yetsorKeam?.msbarAgla ?
                                                                            <Input isReadOnly value={yetsorKeam?.msbarAgla} color="primary" size="sm" className="max-w-[200px]" />
                                                                            :
                                                                                <Autocomplete
                                                                                    label="מספר עגלה"
                                                                                    className="max-w-[200px]"
                                                                                    size="sm"
                                                                                    color="primary"
                                                                                    onSelectionChange={setMsbarAgla}
                                                                                    onInputChange={(val) => { setMsbarAgla(val); }}
                                                                                >
                                                                                    {
                                                                                        aglot?.map((aglaaaaa, index) => (
                                                                                            (!aglaaaaa?.active) && <AutocompleteItem className='text-right' key={aglaaaaa?.licenseid} value={aglaaaaa?.licenseid}>
                                                                                                {aglaaaaa?.licenseid}
                                                                                            </AutocompleteItem>
                                                                                        ))
                                                                                    }

                                                                                </Autocomplete>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-3 pb-3">
                                                            <div className="w-full flex items-center">
                                                                <LiaCommentSolid className="text-xl text-primary" />
                                                                <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                    <Textarea
                                                                        maxRows={3}
                                                                        label="הערה כללית..."
                                                                        className="max-w-[300px] w-full ml-2"
                                                                        value={haraKlalet}
                                                                        onValueChange={(val) => setHaraKlalet(val)}
                                                                        color="primary"
                                                                        variant="flat"
                                                                    />

                                                                    <Textarea
                                                                        maxRows={3}
                                                                        label="הערה פנמית..."
                                                                        value={haraBnmet}
                                                                        onValueChange={(val) => setHaraBnmet(val)}
                                                                        className="max-w-[300px] w-full mr-2 ml-2"
                                                                        color="primary"
                                                                        variant="flat"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </AnimatePresence>
                                            }



                                            {
                                                (shlavNokhhe === 'D') &&
                                                <div className="h-full flex justify-center items-center">
                                                    <AnimatePresence mode="wait">
                                                        <motion.div
                                                            key="D"
                                                            initial={{ opacity: 0, x: 100 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -100 }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <div className="">
                                                                <div className="flex justify-center w-full items-center">
                                                                    <Image
                                                                        src={'https://cdn-icons-png.flaticon.com/512/5610/5610944.png'}
                                                                        className="w-[120px] h-[120px]"
                                                                        width={120}
                                                                        height={120}
                                                                    />
                                                                </div>
                                                                <div className="w-full text-center mt-8 mb-8 font-bold text-success text-xl">
                                                                    תהליך ייצור עגלה הסתיים בהצלחה!!!
                                                                </div>
                                                                <Progress
                                                                    aria-label="Downloading..."
                                                                    size="md"
                                                                    value={valueProgress}
                                                                    color="success"
                                                                    showValueLabel={true}
                                                                    className="max-w-md m-auto"
                                                                />
                                                            </div>
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </div>
                                            }




                                        </div>
                                    </div>
                                    {
                                        shlavNokhhe !== 'D' &&
                                        <div className=" w-full flex justify-center pt-3 border-t-1">
                                            <Tooltip closeDelay={200} content={
                                                <div dir="rtl" className="w-full flex items-center">
                                                    <div className="text-primary font-black">
                                                        השלב הבא :
                                                    </div>
                                                    <div className="mr-1">
                                                        {shlavNokhhe ? GetShlavemInHebrow(getNextLetter(shlavNokhhe)) : GetShlavemInHebrow('A')}
                                                    </div>
                                                </div>
                                            }>
                                                <Button onClick={Next} className="h-[40px] " color='secondary' variant="flat" size='md'>
                                                    <div className="inline-block animate-move-arrows">
                                                        <div className="flex justify-start items-center">
                                                            <div className="ml-2 text-right text-base font-bold">הבא</div>
                                                            <TbPlayerTrackNextFilled className="text-4xl text-secondary transform scale-x-[-1]" />
                                                        </div>
                                                    </div>
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    }
                                    {/* <div className="w-[1200px] hidden absolute left-0 bottom-0 bg-white z-50 border-4 border-black">
                                        <TofsTokhnetYetsor brtem={{
                                            shemLkoh: brtemLkoh.shem,
                                            msbar: msbarAgla,
                                            sogAgla: sogAglaBS,
                                            tokhnetYetsor: {
                                                gobahSolam,
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
                                                hlokatSolam: motsaremBrofelem[10]?.shem,
                                                msgertSolam: motsaremBrofelem[9]?.shem,
                                                tserAehad: { sog: mafenemMotsarem[GetIndexMotsar('A1')]?.shem, kmot: mafenemMotsarem[GetIndexMotsar('A1')]?.kmot },
                                                tserShtem: { sog: mafenemMotsarem[GetIndexMotsar('A2')]?.shem, kmot: mafenemMotsarem[GetIndexMotsar('A2')]?.kmot },
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
                                    </div> */}
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </ModalBody>

                {
                    shlavNokhhe !== 'D' &&
                    <ModalFooter className="border-t-2">
                        <div className="flex items-center">
                            {
                                yetsorKeam?.id && ((shlavNokhhe === 'A') || (shlavNokhhe === 'B')) &&
                                <Button size="sm" color="danger" className="mr-2" isLoading={loading} variant="flat" onClick={async () => {
                                    setLoading(true);
                                    await deleteDoc(doc(firestore, 'tfaol', yetsorKeam?.id));
                                    setLoading(false);
                                    ResetAll();
                                    disable();
                                }}>
                                    מחיקה
                                </Button>
                            }
                            <Button onClick={hdbsatMtsavem} variant='flat' size="sm" color='primary'>
                                הדפסת דף {GetShlavemInHebrow(shlavNokhhe,true)}
                            </Button>
                        </div>
                        <div className="w-full flex justify-end">
                            <Button color='warning' variant='flat' size="sm" className="mr-2" onClick={() => setShowModalMessage(true)}>סגור</Button>
                            {/* {
                            (shlavNokhhe === 'C') &&
                            <Button className='mr-5 ml-5 font-bold' color='primary' variant='flat' onClick={handelPrintggg}>
                                <CgFileDocument className="text-2xl text-primary" />הדפסת תופס עובדים
                            </Button>
                        } */}

                            <Button isLoading={loading} isDisabled={!(brtemLkoh?.id || customerName) || (!tokhnet && !shemTokhnet)} onClick={() => saveValues(false)} color='primary' variant='flat' size="sm" className="mr-2">שמירה</Button>
                        </div>
                    </ModalFooter>
                }
            </ModalContent>
        </Modal>
    )
}






