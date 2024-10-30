'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Pagination, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch, Tooltip, DatePicker } from "@nextui-org/react";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
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
import { FaShekelSign } from "react-icons/fa6";
import { PiClockBold } from "react-icons/pi";
import ModalMtsavYetsor from "./ModalMtsavYetsor";
import ModalMessage from "./ModalMessage";
import { MdError } from "react-icons/md";
import { Alert } from "@mui/material";
import { firestore } from "../FireBase/firebase";
import { addDoc, collection, doc, updateDoc, writeBatch } from "firebase/firestore";
import TokhnetContext from "../auth/TokhnetContext";
import { CgFileDocument } from "react-icons/cg";
import { TofsTokhnetYetsor } from "../Page Components/TofsTokhnetYetsor";
import { useReactToPrint } from "react-to-print";


export default function ModalYetsor({ show, disable, Tokhneot, drag, lkohTfaol, yetsorKeam, category, lkhot, aglot, mlae, sogAskaa }) {



    const [loading, setLoading] = useState(false);
    // ---------------------------------------------------------------------------------------- hotsaot 
    const [hotsotAkefot, setHotsaotAkefot] = useState(0);
    const [hotsotSkhar, setHotsaotSkhar] = useState(0);
    const [hkhnsotHomreGlem, setHkhnsotHomreGlem] = useState(0);

    const [showAlert, setShowAlert] = useState(false);
    const [showAlertMessage, setShowAlertMessage] = useState('');
    const [showAlertType, setShowAlertType] = useState('');

    // ---------------------------------------------------------------------------------------- aglot Lkoh

    // ---------------------------------------------------------- aglot Lkoh -- (functions)
    const componentRefTwo = useRef();
    const [aosek, setAosek] = useState('');
    const metadata = GetDocs('metadata');
    const counter = metadata.find((count) => count.id === 'counterTfaol');
    const counterShaotAboda = metadata.find((count) => count.id === 'counterShaotAboda');
    const counterNekoeMaam = metadata.find((count) => count.id === 'counterNekoeMaam');
    const counterHeshvoneot = metadata.find((count) => count.id === 'counterHeshvoneot');

    // ---------------------------------------------------------------------------------------- lkoh
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
    const [shlavNokhhe, setShlavNokhhe] = useState('');
    const [tarekhAsbka, setTarekhAsbka] = useState('');
    const [seomYetsor, setSeomYetsor] = useState(false);
    const [msbarAgla, setMsbarAgla] = useState('');
    const [mherKlale, setMherKlale] = useState(0);
    const [hnha, setHnha] = useState(0);
    const [hskmatLkoh, setHskmatLkoh] = useState(false);
    const [tnaeTshlom, setTnaeTshlom] = useState(['']);
    const [msbarAdefot,setMsbarAdefot] = useState(5);

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
    const [sogAglaBS, setSogAglaBS] = useState('פתוחה');
    const [aorkh, setAorkh] = useState(0);
    const [rohav, setRohav] = useState(0);
    const [retsba, setRetsba] = useState('בחר');
    const [msbarTsrem, setMsbarTsrem] = useState('1');
    const [AemBlamem, setAemBlamem] = useState(false);
    const [brofelTfesa, setBrofelTfesa] = useState('בחר');
    const [tsmgem, setTsmegem] = useState('פנימיים');
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
    const [dalet, setDalet] = useState('רגיל');
    const [msgertRmbaDalet, setMsgertRmbaDalet] = useState('בחר');
    const [msgertRmbaDaletAorkh, setMsgertRmbaDaletAorkh] = useState(0);
    const [hlokatRmbaDalet, setHlokatRmbaDalet] = useState('בחר');
    const [hlokatRmbaDaletBro, setHlokatRmbaDaletBro] = useState(0);
    const [hlokatRmbaDaletTvah, setHlokatRmbaDaletTvah] = useState(0);
    const [tosefetVnel, setToseftVnel] = useState(false);
    const [solam, setSolam] = useState('רק קדמי');
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

    const ResetAll = () => {
        setHotsaotAkefot(0);
        setHotsaotSkhar(0);
        setHkhnsotHomreGlem(0);
        setBrtemLkoh(null);
        setTokhnetNokhhet(null);
        setShemTokhnet('');
        setShlavNokhhe('');
        setTarekhAsbka('');
        setSeomYetsor(false);
        setMsbarAgla('');
        setMherKlale(0);
        setHnha(0);
        setHskmatLkoh(false);
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
        setSogAglaBS('פתוחה');
        setAorkh(0);
        setRohav(0);
        setRetsba('בחר');
        setMsbarTsrem('1');
        setAemBlamem(false);
        setBrofelTfesa('בחר');
        setTsmegem('פנימיים');
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
        setDalet('רגיל');
        setMsgertRmbaDalet('בחר');
        setMsgertRmbaDaletAorkh(0);
        setHlokatRmbaDalet('בחר');
        setHlokatRmbaDaletBro(0);
        setHlokatRmbaDaletTvah(0);
        setToseftVnel(false);
        setSolam('רק קדמי');
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
        setTnaeTshlom([]);
        setMsbarAdefot(5);
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

    const selectedValue = useMemo(
        () => Array.from(tnaeTshlom).join(", ").replaceAll("_", " "),
        [tnaeTshlom]
    );


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
        if (brtemLkoh?.id && shemTokhnet) {
            res = 'A';
        }
        if (brtemLkoh?.id && shemTokhnet && hskmatLkoh && mherKlale && BdekatMotsarem()) {
            res = 'B';
        }
        if (brtemLkoh?.id && shemTokhnet && hskmatLkoh && mherKlale && BdekatMotsarem() && tarekhAsbka) {
            res = 'C';
        }
        if (brtemLkoh?.id && shemTokhnet && hskmatLkoh && mherKlale && BdekatMotsarem() && tarekhAsbka && msbarAgla) {
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
            setShowAlertMessage('חסר פרטיים לשלב הבא.');
            setShowAlertType('warning');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
            return;
        }
        if (getNextLetter(shlavNokhhe) === 'C') {
            console.log(123123123);
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
        setErrorMotsaremRglem(false);
        setShlavNokhhe(GetShlav());
    }

    const [showModalMtsavYetsor, setShowModalMtsavYetsor] = useState(false);
    const [showModalMessage, setShowModalMessage] = useState(false);

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


    const GetShlavemInHebrow = (shlav) => {
        if (shlav === 'A') {
            return 'שלב הצעה';
        }
        else if (shlav === 'B') {
            return 'שלב המתנה';
        }
        else if (shlav === 'C') {
            return 'שלב ייצור';
        }
        else if (shlav === 'D') {
            return 'שלב סיום';
        }
        else if (shlav === 'E') {
            return 'שלב מכר';
        }
    }

    const handelPrintggg = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRefTwo.current,
    });

    console.log();

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

    const saveValues = async () => {
        setLoading(true);
        const Props = {
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
            hskmatLkoh,
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
            hnha,
            tvahAofkeSolam,
            msbarBroAofkeSolam,
            tvahAnkheSolam,
            msbarBroAnkheSolam,
            gobahSolam,
            toseftReshet : toseftReshet || false,
            daletAleon,
            solam,
            tosefetVnel : tosefetVnel || false,
            hlokatRmbaDaletTvah,
            hlokatRmbaDaletBro,
            msgertRmbaDaletAorkh,
            msbarBroSheldaBnemetReshon,
            msbarBroSheldaBnemetShne,
            tvahHlokaThtona,
            msbarBrofHlokaThotona,
            tsmgem : tsmgem || false,
            aorkh: parseFloat(aorkh),
            rohav: parseFloat(rohav),
            msbarTsrem,
            AemBlamem,
            tsmgSber : tsmgSber || false,
            aorkhBroYetsol,
            msbarBroSheldaBnemet,
            tvahSheldaBnemet,
            dalet,
            tosfot,
            motsaremRglem,
            motsaremBrofelem,
            motsaremLhatseg
        }
        if (yetsorKeam?.msbar) {
            console.log(1);
            try {
                updateDoc(doc(firestore, 'tfaol', yetsorKeam?.id), {
                    tarekhAsbka,
                    msbarAdefot,
                    tnaeTshlom,
                    mherKlale: parseFloat(mherKlale),
                    shlavNokhhe,
                    sogAglaBS,
                    msbarAgla,
                    hskmatLkoh,
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
                    hnha,
                    tvahAofkeSolam,
                    msbarBroAofkeSolam,
                    tvahAnkheSolam,
                    msbarBroAnkheSolam,
                    gobahSolam,
                    toseftReshet : toseftReshet || false,
                    daletAleon,
                    solam,
                    tosefetVnel : tosefetVnel || false,
                    hlokatRmbaDaletTvah,
                    hlokatRmbaDaletBro,
                    msgertRmbaDaletAorkh,
                    msbarBroSheldaBnemetReshon,
                    msbarBroSheldaBnemetShne,
                    tvahHlokaThtona,
                    msbarBrofHlokaThotona,
                    tsmgem : tsmgem || false,
                    aorkh: parseFloat(aorkh),
                    rohav: parseFloat(rohav),
                    msbarTsrem,
                    AemBlamem,
                    tsmgSber : tsmgSber || false,
                    aorkhBroYetsol,
                    msbarBroSheldaBnemet,
                    tvahSheldaBnemet,
                    dalet,
                    tosfot,
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
                }
                if (shlavNokhhe === 'C') {
                    handelPrintggg();
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            console.log(2);
            try {
                if (shlavNokhhe === 'C') {
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
        ResetAll();
        disable();
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
            setHotsaotAkefot(yetsorKeam.hotsaotAkefot);
            setHotsaotSkhar(yetsorKeam.hotsaotSkhar);
            setHkhnsotHomreGlem(yetsorKeam.hkhnsotHomreGlem);
            setBrtemLkoh(yetsorKeam.brtemLkoh);
            setTarekhAsbka(yetsorKeam.tarekhAsbka);
            setMsbarAgla(yetsorKeam.msbarAgla);
            setMherKlale(yetsorKeam.mherKlale);
            setHnha(yetsorKeam.hnha);
            setHskmatLkoh(yetsorKeam.hskmatLkoh);
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
            setTMsgeretThtonah(yetsorKeam.tMsgeretThtonah);
            setTHlokaThtonah(yetsorKeam.tHlokaThtonah);
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
            setZmanThelaA(yetsorKeam.zmanThelaA);
            setZmanThelaB(yetsorKeam.zmanThelaB);
            setZmanThelaC(yetsorKeam.zmanThelaC);
            setZmanThelaD(yetsorKeam.zmanThelaD);
            setZmanThelaE(yetsorKeam.zmanThelaE);
            setShlavNokhhe(yetsorKeam.shlavNokhhe);
            setTnaeTshlom(yetsorKeam.tnaeTshlom);
            setMsbarAdefot(yetsorKeam.msbarAdefot);
        }
    }, [yetsorKeam]);

    console.log(msbarAdefot);

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
        else if (shlavNokhhe === 'D') {
            setZmanThelaD({ shaa: format(new Date(), 'HH:mm'), tarekh: format(new Date(), 'dd-MM-yyyy') });
        }
        else if (shlavNokhhe === 'E') {
            setZmanThelaE({ shaa: format(new Date(), 'HH:mm'), tarekh: format(new Date(), 'dd-MM-yyyy') });
        }
    }, [shlavNokhhe]);

    console.log('================================');
    console.log(zmanThelaA);
    console.log(zmanThelaB);
    console.log(zmanThelaC);
    console.log(zmanThelaD);
    console.log(zmanThelaE);

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
                        <ModalYetsorTokhnet reset={(val) => ResetMotsaremLhANDRe(val)} add={(val) => UpdateMotsaremLhANDRe(val)} mlae={mlae} setMotsaremLhatseg={(value) => setMotsaremLhatseg(value)} show={showModalTokhnetYetsor} disable={() => setShowModalTokhnetYetsor(false)} />
                    </TokhnetContext.Provider>
                    <ModalBerotMotsrem GetError={(val) => setErrorMotsaremRglem(val)} shlav={getNextLetter(shlavNokhhe)} category={category} mlae={mlae} setMotsaremRglem={(value) => setMotsaremRglem(value)} setMotsaremBrofelem={(value) => setMotsaremBrofelem(value)} motsaremLhatseg={motsaremLhatseg} motsaremBrofelem={motsaremBrofelem} motsaremRglem={motsaremRglem} show={showModalBerotMotsrem} disable={() => setShowModalBerotMotsrem(false)} />
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
                                        <div className="text-2xl font-bold text-center text-gray-800">{shlavNokhhe ? GetShlavemInHebrow(shlavNokhhe) : <div>&nbsp;</div>}</div>
                                    </div>
                                    <div className="w-full flex-grow p-4 overflow-auto">
                                        <div className="w-full p-10">
                                            {(shlavNokhhe === '') &&
                                                <>
                                                    <div className="w-full flex items-center pb-3 border-b-1">
                                                        <FaUser className="text-xl text-primary" />
                                                        <div className="mr-2 border-r-2 pr-2">
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
                                                            <FaShekelSign className="text-xl text-primary" />
                                                            <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                <Input label="מחיר מחרון" isReadOnly={yetsorKeam?.mherKlale} size="sm" type="number" value={mherKlale || ''} onValueChange={(val) => { setMherKlale(val); }} color="primary" className="max-w-[150px]" />
                                                                <Input label="הנחה" size="sm" type="number" value={hnha || ''} onValueChange={(val) => setHnha(Math.min(val, mherKlale))} color="primary" className="max-w-[150px] mr-3" />
                                                                <Dropdown dir="rtl" className="select-none">
                                                                    <DropdownTrigger>
                                                                        <Button className="mr-3" dir="ltr" color="primary" variant='flat' size="lg">
                                                                            <MdKeyboardArrowDown className="text-xl" />{selectedValue || 'תנאי תשלום'}
                                                                        </Button>
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu
                                                                        aria-label="Multiple selection example"
                                                                        variant="flat"
                                                                        closeOnSelect={false}
                                                                        disallowEmptySelection
                                                                        selectionMode="multiple"
                                                                        selectedKeys={tnaeTshlom}
                                                                        onSelectionChange={setTnaeTshlom}
                                                                    >
                                                                        <DropdownItem key={'מזומן'}>{'מזומן'}</DropdownItem>
                                                                        <DropdownItem key={'העברה בנקאית'}>{'העברה בנקאית'}</DropdownItem>
                                                                        <DropdownItem key={'כרטיס אשראי'}>{'כרטיס אשראי'}</DropdownItem>
                                                                        <DropdownItem key={'תשלום דיגיטלי'}>{'תשלום דיגיטלי'}</DropdownItem>
                                                                        <DropdownItem key={'שיק'}>{'שיק'}</DropdownItem>
                                                                        <DropdownItem key={'אשראי'}>{'אשראי'}</DropdownItem>
                                                                        <DropdownItem key={'החלפה'}>{'החלפה'}</DropdownItem>
                                                                        <DropdownItem key={'אחר'}>{'אחר'}</DropdownItem>
                                                                    </DropdownMenu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-b-1 pt-3 pb-3">
                                                        <div className="w-full flex items-center">
                                                            <PiClockBold className="text-xl text-primary" />
                                                            <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                <Input className="max-w-[150px] " value={tarekhAsbka || format(new Date(), 'dd-MM-yyyy')} onValueChange={(value) => setTarekhAsbka(value)} color="primary" variant="flat" type='date' size="sm" label="תאריך אספקה" />
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
                                                                            onSelectionChange={(val) => setShemTokhnet(val.currentKey)}
                                                                        >
                                                                            <DropdownItem key='תוכנית ידנית' onClick={() => setTokhnetNokhhet('תוכנית ידנית')}>תוכנית ידנית</DropdownItem>
                                                                            {Tokhneot?.map((option) => (
                                                                                <DropdownItem onClick={() => setTokhnetNokhhet(option)} key={option.shem}>{option.shem}</DropdownItem>
                                                                            ))}
                                                                        </DropdownMenu>
                                                                    </Dropdown>
                                                                </div>
                                                                <div className="mt-3">
                                                                    <Button isDisabled={!tokhnetNokhhet} className="ml-2" size='md' variant="flat" onClick={() => setShowModalTokhnetYetsor(true)} color='primary'>תוכנית ייצור</Button>
                                                                    <Button isDisabled={!tokhnetNokhhet} className="mr-2 ml-2" size='md' variant="flat" onClick={() => setShowModalBerotMotsrem(true)} color="primary">פירוט מוצרים</Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }


                                            {(shlavNokhhe === 'A') &&
                                                <>
                                                    <div className="w-full flex items-center pb-3 border-b-1">
                                                        <div className="w-full flex items-center">
                                                            <div>
                                                                <FaUser className="text-xl text-primary ml-2" />
                                                            </div>
                                                            <div className="border-r-2 pr-2">
                                                                <Switch size='md' dir="ltr" isSelected={hskmatLkoh} isReadOnly={yetsorKeam?.thlkhem?.hskmatLkwah || !brtemLkoh} defaultSelected={yetsorKeam?.thlkhem?.hskmatLkwah} value={hskmatLkoh} onValueChange={(val) => setHskmatLkoh(val)}>
                                                                    <div className="mr-2 w-[100px] text-right">הזמנת לקוח</div>
                                                                </Switch>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-b-1 pt-3 pb-3">
                                                        <div className="w-full flex items-center">
                                                            <FaShekelSign className="text-xl text-primary" />
                                                            <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                <Input label="מחיר מחרון" isReadOnly={yetsorKeam?.mherMkhera} size="sm" type="number" value={mherKlale || ''} onValueChange={(val) => { setMherKlale(val); }} color="primary" className="max-w-[150px]" />
                                                                <Input label="הנחה" size="sm" type="number" value={hnha || ''} onValueChange={(val) => setHnha(Math.min(val, mherKlale))} color="primary" className="max-w-[150px] mr-3" />
                                                                <Dropdown dir="rtl" className="select-none">
                                                                    <DropdownTrigger>
                                                                        <Button className="mr-3" dir="ltr" color="primary" variant='flat' size="lg">
                                                                            <MdKeyboardArrowDown className="text-xl" />{selectedValue || 'תנאי תשלום'}
                                                                        </Button>
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu
                                                                        aria-label="Multiple selection example"
                                                                        variant="flat"
                                                                        closeOnSelect={false}
                                                                        disallowEmptySelection
                                                                        selectionMode="multiple"
                                                                        selectedKeys={tnaeTshlom}
                                                                        onSelectionChange={setTnaeTshlom}
                                                                    >
                                                                        <DropdownItem key={'מזומן'}>{'מזומן'}</DropdownItem>
                                                                        <DropdownItem key={'העברה בנקאית'}>{'העברה בנקאית'}</DropdownItem>
                                                                        <DropdownItem key={'כרטיס אשראי'}>{'כרטיס אשראי'}</DropdownItem>
                                                                        <DropdownItem key={'תשלום דיגיטלי'}>{'תשלום דיגיטלי'}</DropdownItem>
                                                                        <DropdownItem key={'שיק'}>{'שיק'}</DropdownItem>
                                                                        <DropdownItem key={'אשראי'}>{'אשראי'}</DropdownItem>
                                                                        <DropdownItem key={'החלפה'}>{'החלפה'}</DropdownItem>
                                                                        <DropdownItem key={'אחר'}>{'אחר'}</DropdownItem>
                                                                    </DropdownMenu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-b-1 pt-3 pb-3">
                                                        <div className="w-full flex items-center">
                                                            <PiClockBold className="text-xl text-primary" />
                                                            <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                <Input className="max-w-[150px] " value={tarekhAsbka || format(new Date(), 'dd-MM-yyyy')} onValueChange={(value) => setTarekhAsbka(value)} color="primary" variant="flat" type='date' size="sm" label="תאריך אספקה" />
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
                                                                            onSelectionChange={(val) => setShemTokhnet(val.currentKey)}
                                                                        >
                                                                            <DropdownItem key='תוכנית ידנית' onClick={() => setTokhnetNokhhet('תוכנית ידנית')}>תוכנית ידנית</DropdownItem>
                                                                            {Tokhneot?.map((option) => (
                                                                                <DropdownItem onClick={() => setTokhnetNokhhet(option)} key={option.shem}>{option.shem}</DropdownItem>
                                                                            ))}
                                                                        </DropdownMenu>
                                                                    </Dropdown>
                                                                </div>
                                                                <div className="mt-3">
                                                                    <Button isDisabled={!tokhnetNokhhet} className="ml-2" size='md' variant="flat" onClick={() => setShowModalTokhnetYetsor(true)} color='primary'>תוכנית ייצור</Button>
                                                                    <Button isDisabled={!tokhnetNokhhet} className="mr-2 ml-2" size='md' variant="flat" onClick={() => setShowModalBerotMotsrem(true)} color="primary">פירוט מוצרים</Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }



                                            {(shlavNokhhe === 'B') &&
                                                <>
                                                    <div className="border-b-1 pb-3">
                                                        <div className="w-full flex items-center">
                                                            <FaShekelSign className="text-xl text-primary" />
                                                            <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                <Input label="מחיר מחרון" isReadOnly={yetsorKeam?.mherMkhera} size="sm" type="number" value={mherKlale || ''} onValueChange={(val) => { setMherKlale(val); }} color="primary" className="max-w-[150px]" />
                                                                <Input label="הנחה" size="sm" type="number" value={hnha || ''} onValueChange={(val) => setHnha(Math.min(val, mherKlale))} color="primary" className="max-w-[150px] mr-3" />
                                                                <Dropdown dir="rtl" className="select-none">
                                                                    <DropdownTrigger>
                                                                        <Button className="mr-3" dir="ltr" color="primary" variant='flat' size="lg">
                                                                            <MdKeyboardArrowDown className="text-xl" />{selectedValue || 'תנאי תשלום'}
                                                                        </Button>
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu
                                                                        aria-label="Multiple selection example"
                                                                        variant="flat"
                                                                        closeOnSelect={false}
                                                                        disallowEmptySelection
                                                                        selectionMode="multiple"
                                                                        selectedKeys={tnaeTshlom}
                                                                        onSelectionChange={setTnaeTshlom}
                                                                    >
                                                                        <DropdownItem key={'מזומן'}>{'מזומן'}</DropdownItem>
                                                                        <DropdownItem key={'העברה בנקאית'}>{'העברה בנקאית'}</DropdownItem>
                                                                        <DropdownItem key={'כרטיס אשראי'}>{'כרטיס אשראי'}</DropdownItem>
                                                                        <DropdownItem key={'תשלום דיגיטלי'}>{'תשלום דיגיטלי'}</DropdownItem>
                                                                        <DropdownItem key={'שיק'}>{'שיק'}</DropdownItem>
                                                                        <DropdownItem key={'אשראי'}>{'אשראי'}</DropdownItem>
                                                                        <DropdownItem key={'החלפה'}>{'החלפה'}</DropdownItem>
                                                                        <DropdownItem key={'אחר'}>{'אחר'}</DropdownItem>
                                                                    </DropdownMenu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-b-1 pt-3 pb-3">
                                                        <div className="w-full flex items-center">
                                                            <PiClockBold className="text-xl text-primary" />
                                                            <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                <Input className="max-w-[150px] " value={tarekhAsbka || format(new Date(), 'dd-MM-yyyy')} onValueChange={(value) => setTarekhAsbka(value)} color="primary" variant="flat" type='date' size="sm" label="תאריך אספקה" />
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
                                                                            onSelectionChange={(val) => setShemTokhnet(val.currentKey)}
                                                                        >
                                                                            <DropdownItem key='תוכנית ידנית' onClick={() => setTokhnetNokhhet('תוכנית ידנית')}>תוכנית ידנית</DropdownItem>
                                                                            {Tokhneot?.map((option) => (
                                                                                <DropdownItem onClick={() => setTokhnetNokhhet(option)} key={option.shem}>{option.shem}</DropdownItem>
                                                                            ))}
                                                                        </DropdownMenu>
                                                                    </Dropdown>
                                                                </div>
                                                                <div className="mt-3 flex items-center">
                                                                    <div>
                                                                        <Button isDisabled={!tokhnetNokhhet} className="ml-2" size='md' variant="flat" onClick={() => setShowModalTokhnetYetsor(true)} color='primary'>תוכנית ייצור</Button>
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
                                                                        <Button isDisabled={!tokhnetNokhhet} className="mr-2 ml-2" size='md' variant="flat" onClick={() => setShowModalBerotMotsrem(true)} color="primary">פירוט מוצרים</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }



                                            {(shlavNokhhe === 'C') &&
                                                <>
                                                    <div className="border-b-1 pb-3">
                                                        <div className="w-full flex items-center">
                                                            <FaShekelSign className="text-xl text-primary" />
                                                            <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                <Input label="מחיר מחרון" isReadOnly={yetsorKeam?.mherMkhera} size="sm" type="number" value={mherKlale || ''} onValueChange={(val) => { setMherKlale(val); }} color="primary" className="max-w-[150px]" />
                                                                <Input label="הנחה" size="sm" type="number" value={hnha || ''} onValueChange={(val) => setHnha(Math.min(val, mherKlale))} color="primary" className="max-w-[150px] mr-3" />
                                                                <Dropdown dir="rtl" className="select-none">
                                                                    <DropdownTrigger>
                                                                        <Button className="mr-3" dir="ltr" color="primary" variant='flat' size="lg">
                                                                            <MdKeyboardArrowDown className="text-xl" />{selectedValue || 'תנאי תשלום'}
                                                                        </Button>
                                                                    </DropdownTrigger>
                                                                    <DropdownMenu
                                                                        aria-label="Multiple selection example"
                                                                        variant="flat"
                                                                        closeOnSelect={false}
                                                                        disallowEmptySelection
                                                                        selectionMode="multiple"
                                                                        selectedKeys={tnaeTshlom}
                                                                        onSelectionChange={setTnaeTshlom}
                                                                    >
                                                                        <DropdownItem key={'מזומן'}>{'מזומן'}</DropdownItem>
                                                                        <DropdownItem key={'העברה בנקאית'}>{'העברה בנקאית'}</DropdownItem>
                                                                        <DropdownItem key={'כרטיס אשראי'}>{'כרטיס אשראי'}</DropdownItem>
                                                                        <DropdownItem key={'תשלום דיגיטלי'}>{'תשלום דיגיטלי'}</DropdownItem>
                                                                        <DropdownItem key={'שיק'}>{'שיק'}</DropdownItem>
                                                                        <DropdownItem key={'אשראי'}>{'אשראי'}</DropdownItem>
                                                                        <DropdownItem key={'החלפה'}>{'החלפה'}</DropdownItem>
                                                                        <DropdownItem key={'אחר'}>{'אחר'}</DropdownItem>
                                                                    </DropdownMenu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-b-1 pt-3 pb-3">
                                                        <div className="w-full flex items-center">
                                                            <PiClockBold className="text-xl text-primary" />
                                                            <div className="w-full flex items-center mr-2 border-r-2 pr-2">
                                                                <Input className="max-w-[150px] " value={tarekhAsbka || format(new Date(), 'dd-MM-yyyy')} onValueChange={(value) => setTarekhAsbka(value)} color="primary" variant="flat" type='date' size="sm" label="תאריך אספקה" />
                                                                <div className="mr-2 ml-3 w-[150px]">
                                                                    מספר עדיפות
                                                                </div>
                                                                <Pagination className="w-full" total={5} initialPage={1} />
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
                                                                            onSelectionChange={(val) => setShemTokhnet(val.currentKey)}
                                                                        >
                                                                            <DropdownItem key='תוכנית ידנית' onClick={() => setTokhnetNokhhet('תוכנית ידנית')}>תוכנית ידנית</DropdownItem>
                                                                            {Tokhneot?.map((option) => (
                                                                                <DropdownItem onClick={() => setTokhnetNokhhet(option)} key={option.shem}>{option.shem}</DropdownItem>
                                                                            ))}
                                                                        </DropdownMenu>
                                                                    </Dropdown>
                                                                </div>
                                                                <div className="mt-3">
                                                                    <Button isDisabled={!tokhnetNokhhet} className="ml-2" size='md' variant="flat" onClick={() => setShowModalTokhnetYetsor(true)} color='primary'>תוכנית ייצור</Button>
                                                                    <Button isDisabled={!tokhnetNokhhet} className="mr-2 ml-2" size='md' variant="flat" onClick={() => setShowModalBerotMotsrem(true)} color="primary">פירוט מוצרים</Button>
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
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }



                                            {
                                                (shlavNokhhe === 'D') &&
                                                <div></div>
                                            }



                                            {
                                                (shlavNokhhe === 'E') &&
                                                <div></div>
                                            }





                                            {/* <div className="border-b-1 pt-3 pb-3">
                                                <div className="w-full flex items-center">
                                                    <div>
                                                        <IoSettings className="text-xl text-primary ml-2" />
                                                    </div>
                                                    <div className="border-r-2 pr-2">
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
                                                    <div className="border-r-2 pr-2">
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
                                            </div> */}




                                        </div>
                                    </div>
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

                <ModalFooter className="border-t-2">
                    <div className="w-full flex justify-end">
                        <Button color='warning' variant='flat' size="sm" className="mr-2" onClick={() => setShowModalMessage(true)}>סגור</Button>
                        {/* {
                            (shlavNokhhe === 'C') &&
                            <Button className='mr-5 ml-5 font-bold' color='primary' variant='flat' onClick={handelPrintggg}>
                                <CgFileDocument className="text-2xl text-primary" />הדפסת תופס עובדים
                            </Button>
                        } */}
                        {shlavNokhhe !== '' && <Button onClick={saveValues} color='primary' variant='flat' size="sm" className="mr-2">שמירה</Button>}
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}






