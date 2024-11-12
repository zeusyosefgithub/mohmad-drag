'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import Image from "next/image";
import GetDocs from "../FireBase/getDocs";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import TokhnetContext from "../auth/TokhnetContext";
import ModalYetsorTokhnet from "./ModalYetsorTokhnet";
import ModalBerotMotsrem from "./ModalBerotMotsrem";
import ModalMessage from "./ModalMessage";
import { firestore } from "../FireBase/firebase";

export default function ModalReshematTokhneot({ show, disable, Tokhneot, mlae, category, sogAskaa }) {
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);
    const [selectedTokh, setSelectedTokh] = useState(null);
    const [selectedTokhToSave, setSelectedTokhToSave] = useState(null);
    const [shemTokhnet, setShemTokhnet] = useState('');
    const [showModalTokhnetYetsor, setShowModalTokhnetYetsor] = useState(false);
    const [showModalBerotMotsrem, setShowModalBerotMotsrem] = useState(false);
    const prevRemzemRef = useRef();
    const metadata = GetDocs('metadata');
    const counter = metadata.find((count) => count.id === 'counterTokhnetYetsorAgla');
    const metadataHtsgot = GetDocs('balotX');
    const Htsgot = metadataHtsgot.find((count) => count.id === 'htsgot');

    const [showModalMessage, setShowModalMessage] = useState(false);


    const [motsaremRglem, setMotsaremRglem] = useState([]);
    const [motsaremBrofelem, setMotsaremBrofelem] = useState([]);
    const [motsaremLhatseg, setMotsaremLhatseg] = useState([]);

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

    const updateMotsaremLhatseg = (itemsToAdd = [], itemsToRemove = []) => {
        setMotsaremLhatseg((prevItems) => {
            const filteredItems = prevItems.filter(item => !itemsToRemove.includes(item));
            return [...filteredItems, ...(itemsToAdd || [])];
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

    const UpdateMotsaremLhANDRe = (motsaremToUpdate) => {
        const updatedMotsarem = motsaremRglem.map((motsar) => {
            const matchingItem = motsaremToUpdate?.find(
                (update) => update?.remez === motsar?.remez
            );
            return matchingItem
                ? { ...motsar, kmot: matchingItem.val }
                : motsar;
        });
        console.log(updatedMotsarem[19]);
        setMotsaremRglem(updatedMotsarem);
        const remezValues = motsaremToUpdate?.map((item) => item.remez);
        setMotsaremLhatseg((prevArray) => [...prevArray, ...remezValues]);
    };

    useEffect(() => {
        console.log(motsaremRglem[19]);
    },[motsaremRglem]);

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

    const shmeratTokhnet = async () => {
        setLoading(true);
        await addDoc(collection(firestore, 'TokhnetYetsorAgla'), {
            msbar: counter?.count,
            shem: shemTokhnet,
            motsaremBrofelem,
            motsaremLhatseg,
            motsaremRglem,
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
            tosfot,
        });
        await updateDoc(doc(firestore, 'metadata', 'counterTokhnetYetsorAgla'), {
            count: counter?.count + 1
        });
        setLoading(false);
    }

    useEffect(() => {
        if(selectedTokh?.shem === 'חדשה'){
            updateMotsaremLhatseg(Htsgot?.yetsor || []);
        }
    }, [sogAskaa, Htsgot,selectedTokh]);



    const CheckInputTokhnetYetsorChanges = () => {
        if (sogAglaBS !== '' ||
            aorkh !== 0 ||
            rohav !== 0 ||
            retsba !== 'בחר' ||
            msbarTsrem !== '' ||
            AemBlamem !== false ||
            brofelTfesa !== 'בחר' ||
            tsmgem !== '' ||
            tsmgSber !== false ||
            msgeretThtonah !== 'בחר' ||
            hlokaThtonah !== 'בחר' ||
            tvahHlokaThtona !== 0 ||
            msbarBrofHlokaThotona !== 0 ||
            yetsol !== 'בחר' ||
            aorkhBroYetsol !== 0 ||
            sheldaHetsonet !== 'בחר' ||
            tvahSheldaBnemet !== 0 ||
            msbarBroSheldaBnemet !== 0 ||
            helekReshonSheldaBnemet !== 'בחר' ||
            msbarBroSheldaBnemetReshon !== 0 ||
            helekShneSheldaBnemet !== 'בחר' ||
            msbarBroSheldaBnemetShne !== 0 ||
            dalet !== '' ||
            msgertRmbaDalet !== 'בחר' ||
            msgertRmbaDaletAorkh !== 0 ||
            hlokatRmbaDalet !== 'בחר' ||
            hlokatRmbaDaletBro !== 0 ||
            hlokatRmbaDaletTvah !== 0 ||
            tosefetVnel !== false ||
            toseftVnelBro !== 'בחר' ||
            solam !== 'ללא' ||
            msgertSolam !== 'בחר' ||
            gobahSolam !== 0 ||
            hlokatSolam !== 'בחר' ||
            tvahAofkeSolam !== 0 ||
            msbarBroAofkeSolam !== 0 ||
            tvahAnkheSolam !== 0 ||
            msbarBroAnkheSolam !== 0 ||
            daletAleon !== false ||
            toseftReshet !== false ||
            vnel !== 'בחר' ||
            msgertVnel !== 'בחר' ||
            gobahVnel !== 0 ||
            tvahAofkeVnel !== 0 ||
            msbarBroAofkeVnel !== 0 ||
            tvahAnkheVnel !== 0 ||
            msbarBroAnkheVnel !== 0 ||
            tosfot.length > 0) {
            return true;
        }
        return false;
    }


    const IsChangedToSaveTokhnet = () => {
        let count = 0;
        for (let index = 0; index < motsaremBrofelem.length; index++) {
            if (motsaremBrofelem[index].shem && motsaremBrofelem[index].kmot > 0) {
                count++;
            }
        }
        for (let index = 0; index < motsaremRglem.length; index++) {
            if (motsaremRglem[index].shem && motsaremRglem[index].kmot > 0) {
                count++;
            }
        }
        if (shemTokhnet && count !== 0 && CheckInputTokhnetYetsorChanges()) {
            return true;
        }
        return false;
    }

    const ResetAll = () => {
        setSelectedTokh(null);
        setSelectedTokhToSave(null);
        setShemTokhnet('');
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
    }

    useEffect(() => {
        if (selectedTokh && selectedTokh?.shem !== 'חדשה') {
            setSogAglaBS(selectedTokh?.sogAglaBS);
            setAorkh(selectedTokh?.aorkh);
            setRohav(selectedTokh?.rohav);
            setRetsba(selectedTokh?.retsba);
            setMsbarTsrem(selectedTokh?.msbarTsrem);
            setAemBlamem(selectedTokh?.AemBlamem);
            setBrofelTfesa(selectedTokh?.brofelTfesa);
            setTsmegem(selectedTokh?.tsmgem);
            setTsmegSber(selectedTokh?.tsmgSber);
            setTMsgeretThtonah(selectedTokh?.msgeretThtonah);
            setTHlokaThtonah(selectedTokh?.hlokaThtonah);
            setTvahHlokaThtona(selectedTokh?.tvahHlokaThtona);
            setMsbarBrofHlokaThotona(selectedTokh?.msbarBrofHlokaThotona);
            setYetsol(selectedTokh?.yetsol);
            setAorkhBroYetsol(selectedTokh?.aorkhBroYetsol);
            setSheldaHetsonet(selectedTokh?.sheldaHetsonet);
            setTvahSheldaBnemet(selectedTokh?.tvahSheldaBnemet);
            setMsbarBroSheldaBnemet(selectedTokh?.msbarBroSheldaBnemet);
            setHelekReshonSheldaBnemet(selectedTokh?.helekReshonSheldaBnemet);
            setMsbarBroSheldaBnemetReshon(selectedTokh?.msbarBroSheldaBnemetReshon);
            sethelekShneSheldaBnemet(selectedTokh?.helekShneSheldaBnemet);
            setMsbarBroSheldaBnemetShne(selectedTokh?.msbarBroSheldaBnemetShne);
            setDalet(selectedTokh?.dalet);
            setMsgertRmbaDalet(selectedTokh?.msgertRmbaDalet);
            setMsgertRmbaDaletAorkh(selectedTokh?.msgertRmbaDaletAorkh);
            setHlokatRmbaDalet(selectedTokh?.hlokatRmbaDalet);
            setHlokatRmbaDaletBro(selectedTokh?.hlokatRmbaDaletBro);
            setHlokatRmbaDaletTvah(selectedTokh?.hlokatRmbaDaletTvah);
            setToseftVnel(selectedTokh?.tosefetVnel);
            setToseftVnelBrof(selectedTokh?.toseftVnelBro);
            setSolam(selectedTokh?.solam);
            setMsgertSolam(selectedTokh?.msgertSolam);
            setGobahSolam(selectedTokh?.gobahSolam);
            setHlokatSolam(selectedTokh?.hlokatSolam);
            setTvahAofkeSolam(selectedTokh?.tvahAofkeSolam);
            setMsbarBroAofkeSolam(selectedTokh?.msbarBroAofkeSolam);
            setTvahAnkheSolam(selectedTokh?.tvahAnkheSolam);
            setMsbarBroAnkheSolam(selectedTokh?.msbarBroAnkheSolam);
            setDaletAleon(selectedTokh?.daletAleon);
            setTosefetReshet(selectedTokh?.toseftReshet);
            setVnel(selectedTokh?.vnel);
            setMsgertVnel(selectedTokh?.msgertVnel);
            setGobahVnel(selectedTokh?.gobahVnel);
            setTvahAofkeVnel(selectedTokh?.tvahAofkeVnel);
            setMsbarBroAofkeVnel(selectedTokh?.msbarBroAofkeVnel);
            setTvahAnkheVnel(selectedTokh?.tvahAnkheVnel);
            setMsbarBroAnkheVnel(selectedTokh?.msbarBroAnkheVnel);
            setTosfot(selectedTokh?.tosfot);
            setMotsaremBrofelem(selectedTokh?.motsaremBrofelem);
            setMotsaremRglem(selectedTokh?.motsaremRglem);
            setMotsaremLhatseg(selectedTokh?.motsaremLhatseg);
        }
    }, [selectedTokh]);


    function sortByLetters(arr) {
        return arr?.sort((a, b) => {
            const letterA = a.replace(/\d/g, ''); // Extract letters from a
            const letterB = b.replace(/\d/g, ''); // Extract letters from b
            const numberA = parseInt(a.replace(/\D/g, '')); // Extract numbers from a
            const numberB = parseInt(b.replace(/\D/g, '')); // Extract numbers from b

            // First, compare by letters
            if (letterA === letterB) {
                // If letters are the same, compare by numbers
                return numberA - numberB;
            }
            return letterA.localeCompare(letterB);
        });
    }

    const checkAefshrotAedcot = () => {
        let res = true;
        if (motsaremBrofelem.length !== selectedTokh?.motsaremBrofelem.length ||
            motsaremLhatseg.length !== selectedTokh?.motsaremLhatseg.length ||
            motsaremRglem.length !== selectedTokh?.motsaremRglem.length ||
            tosfot.length !== selectedTokh?.tosfot.length
        ) {
            res = false;
        }
        for (let index = 0; index < motsaremBrofelem.length; index++) {
            if (motsaremBrofelem[index].kmot !== selectedTokh?.motsaremBrofelem[index]?.kmot ||
                motsaremBrofelem[index].shem !== selectedTokh?.motsaremBrofelem[index]?.shem
            ) {
                res = false;
            }
        }
        const newmotsaremLhatseg = sortByLetters(motsaremLhatseg);
        const newselectedTokhmotsaremLhatseg = sortByLetters(selectedTokh?.motsaremLhatseg);
        if(newmotsaremLhatseg && newselectedTokhmotsaremLhatseg && newmotsaremLhatseg.length && newselectedTokhmotsaremLhatseg.length){
            for (let index = 0; index < newmotsaremLhatseg?.length; index++) {
                if (newmotsaremLhatseg[index] !== newselectedTokhmotsaremLhatseg[index]) {
                    res = false;
                }
            }
        }
        for (let index = 0; index < motsaremRglem.length; index++) {
            if (motsaremRglem[index].kmot !== selectedTokh?.motsaremRglem[index]?.kmot ||
                motsaremRglem[index].shem !== selectedTokh?.motsaremRglem[index]?.shem
            ) {
                res = false;
            }
        }
        for (let index = 0; index < tosfot.length; index++) {
            if (tosfot[index].val !== selectedTokh?.tosfot[index]?.val) {
                res = false;
            }
        }
        if (AemBlamem !== selectedTokh?.AemBlamem ||
            aorkh !== selectedTokh?.aorkh ||
            aorkhBroYetsol !== selectedTokh?.aorkhBroYetsol ||
            brofelTfesa !== selectedTokh?.brofelTfesa ||
            dalet !== selectedTokh?.dalet ||
            daletAleon !== selectedTokh?.daletAleon ||
            gobahSolam !== selectedTokh?.gobahSolam ||
            gobahVnel !== selectedTokh?.gobahVnel ||
            helekReshonSheldaBnemet !== selectedTokh?.helekReshonSheldaBnemet ||
            helekShneSheldaBnemet !== selectedTokh?.helekShneSheldaBnemet ||
            hlokaThtonah !== selectedTokh?.hlokaThtonah ||
            hlokatRmbaDalet !== selectedTokh?.hlokatRmbaDalet ||
            hlokatRmbaDaletBro !== selectedTokh?.hlokatRmbaDaletBro ||
            hlokatRmbaDaletTvah !== selectedTokh?.hlokatRmbaDaletTvah ||
            hlokatSolam !== selectedTokh?.hlokatSolam ||
            msbarBroAnkheSolam !== selectedTokh?.msbarBroAnkheSolam ||
            msbarBroAnkheVnel !== selectedTokh?.msbarBroAnkheVnel ||
            msbarBroAofkeSolam !== selectedTokh?.msbarBroAofkeSolam ||
            msbarBroAofkeVnel !== selectedTokh?.msbarBroAofkeVnel ||
            msbarBroSheldaBnemet !== selectedTokh?.msbarBroSheldaBnemet ||
            msbarBroSheldaBnemetReshon !== selectedTokh?.msbarBroSheldaBnemetReshon ||
            msbarBroSheldaBnemetShne !== selectedTokh?.msbarBroSheldaBnemetShne ||
            msbarBrofHlokaThotona !== selectedTokh?.msbarBrofHlokaThotona ||
            msbarTsrem !== selectedTokh?.msbarTsrem ||
            msgeretThtonah !== selectedTokh?.msgeretThtonah ||
            msgertRmbaDalet !== selectedTokh?.msgertRmbaDalet ||
            msgertRmbaDaletAorkh !== selectedTokh?.msgertRmbaDaletAorkh ||
            msgertSolam !== selectedTokh?.msgertSolam ||
            msgertVnel !== selectedTokh?.msgertVnel ||
            retsba !== selectedTokh?.retsba ||
            rohav !== selectedTokh?.rohav ||
            sheldaHetsonet !== selectedTokh?.sheldaHetsonet ||
            sogAglaBS !== selectedTokh?.sogAglaBS ||
            solam !== selectedTokh?.solam ||
            tosefetVnel !== selectedTokh?.tosefetVnel ||
            toseftReshet !== selectedTokh?.toseftReshet ||
            toseftVnelBro !== selectedTokh?.toseftVnelBro ||
            tsmgSber !== selectedTokh?.tsmgSber ||
            tsmgem !== selectedTokh?.tsmgem ||
            tvahAnkheSolam !== selectedTokh?.tvahAnkheSolam ||
            tvahAnkheVnel !== selectedTokh?.tvahAnkheVnel ||
            tvahAofkeSolam !== selectedTokh?.tvahAofkeSolam ||
            tvahAofkeVnel !== selectedTokh?.tvahAofkeVnel ||
            tvahHlokaThtona !== selectedTokh?.tvahHlokaThtona ||
            tvahSheldaBnemet !== selectedTokh?.tvahSheldaBnemet ||
            vnel !== selectedTokh?.vnel ||
            yetsol !== selectedTokh?.yetsol) {
                res = false;
        }
        return res;
    }
    

    return (
        <>
            <Modal placement="center" className="test-fontt select-none" backdrop={"blur"} size="5xl" isOpen={show} onClose={disable}>
                <ModalContent className="max-h-[700px] h-full">
                    <ModalHeader className="flex justify-center border-b-2">
                        רשימת תוכניות ייצור
                    </ModalHeader>
                    <ModalBody className="h-full overflow-auto flex relative">
                        <TokhnetContext.Provider value={contextValue}>
                            <ModalYetsorTokhnet yetsorKeam={selectedTokh} motsaremLhatseg={motsaremLhatseg} resetBro={(val1, val2) => RemoveMotsaremBro(val1, val2)} reset={(val) => ResetMotsaremLhANDRe(val)} addBro={(val) => UpdateMotsaremBroLhANDRe(val)} add={(val) => UpdateMotsaremLhANDRe(val)} mlae={mlae} setMotsaremLhatseg={(value) => setMotsaremLhatseg(value)} show={showModalTokhnetYetsor} disable={() => setShowModalTokhnetYetsor(false)} />
                        </TokhnetContext.Provider>
                        <ModalBerotMotsrem Tokhnet shlav={'A'} category={category} mlae={mlae} setMotsaremRglem={(value) => setMotsaremRglem(value)} setMotsaremBrofelem={(value) => setMotsaremBrofelem(value)} motsaremLhatseg={motsaremLhatseg} motsaremBrofelem={motsaremBrofelem} motsaremRglem={motsaremRglem} show={showModalBerotMotsrem} disable={() => setShowModalBerotMotsrem(false)} />
                        <ModalMessage Aeshor={(val) => {
                            if (val) {
                                toggleDrawer();
                                setSelectedTokh(selectedTokhToSave);
                                if (selectedTokhToSave) {
                                    setTimeout(() => {
                                        setDrawerOpen(true);
                                    }, 300);
                                }
                                ResetAll();
                            }
                        }} yetsor message={'האם אתה בטוח לסגור התוכנית בלי לשמור הנתונים שהכנס !?'} show={showModalMessage} disable={() => setShowModalMessage(false)} />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: drawerOpen ? 0 : "-100%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className={`absolute top-0 left-0 h-full w-1/4 bg-gray-100 shadow-lg z-20 flex flex-col justify-between`}
                        >
                            <div>
                                <div className="flex items-center justify-between p-4 border-b">
                                    <div className="w-full text-center">
                                        <h2 className="text-lg font-semibold">תוכנית {selectedTokh?.shem}</h2>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (selectedTokh?.shem === 'חדשה') {
                                                if (IsChangedToSaveTokhnet()) {
                                                    setSelectedTokhToSave(null);
                                                    setShowModalMessage(true);
                                                }
                                                else {
                                                    toggleDrawer();
                                                    setSelectedTokh(null);
                                                    ResetAll();
                                                }
                                            }
                                            else {
                                                toggleDrawer();
                                                setSelectedTokh(null);
                                            }
                                        }}
                                        className="text-gray-500 hover:text-gray-800"
                                    >
                                        <IoMdClose size={24} />
                                    </button>
                                </div>
                                <div dir="rtl" className="p-4 space-y-4">
                                    {selectedTokh?.newTokhnet && (
                                        <div>
                                            <Input
                                                size="sm"
                                                value={shemTokhnet}
                                                onValueChange={(val) => setShemTokhnet(val)}
                                                type="text"
                                                color="primary"
                                                className="max-w-[200px]"
                                                label="שם תוכנית"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <Button
                                            size="md"
                                            variant="flat"
                                            onClick={() => setShowModalTokhnetYetsor(true)}
                                            color="primary"
                                        >
                                            תוכנית ייצור
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            size="md"
                                            variant="flat"
                                            onClick={() => setShowModalBerotMotsrem(true)}
                                            color="primary"
                                        >
                                            פירוט מוצרים
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {
                                selectedTokh?.newTokhnet ? (
                                    <div className="w-full flex mb-3 pr-[15px] justify-end">
                                        <Button isLoading={loading} isDisabled={!IsChangedToSaveTokhnet()} onClick={() => { shmeratTokhnet(); ResetAll(); }} variant="flat" color="primary" size="sm">
                                            שמירה
                                        </Button>
                                    </div>
                                )
                                    :
                                    (
                                        <div className="w-full flex mb-3 pr-[15px] justify-end">
                                            <Button onClick={async() => {
                                                setLoading(true);
                                                await deleteDoc(doc(firestore,'TokhnetYetsorAgla',selectedTokh?.id));
                                                setLoading(false);
                                            }} variant="flat" color="danger" size="sm">
                                                מחיקה
                                            </Button>
                                            <Button isDisabled={checkAefshrotAedcot()} onClick={async() => {
                                                setLoading(true);
                                                await updateDoc(doc(firestore,'TokhnetYetsorAgla',selectedTokh?.id),{
                                                    AemBlamem,
                                                    aorkh,
                                                    aorkhBroYetsol,
                                                    brofelTfesa,
                                                    dalet,
                                                    daletAleon,
                                                    gobahSolam,
                                                    gobahVnel,
                                                    helekReshonSheldaBnemet,
                                                    helekShneSheldaBnemet,
                                                    hlokaThtonah,
                                                    hlokatRmbaDalet,
                                                    hlokatRmbaDaletBro,
                                                    hlokatRmbaDaletTvah,
                                                    hlokatSolam,
                                                    msbarBroAnkheSolam,
                                                    msbarBroAnkheVnel,
                                                    msbarBroAofkeSolam,
                                                    msbarBroAofkeVnel,
                                                    msbarBroSheldaBnemet,
                                                    msbarBroSheldaBnemetReshon,
                                                    msbarBroSheldaBnemetShne,
                                                    msbarBrofHlokaThotona,
                                                    msbarTsrem,
                                                    msgeretThtonah,
                                                    msgertRmbaDalet,
                                                    msgertRmbaDaletAorkh,
                                                    msgertSolam,
                                                    msgertVnel,
                                                    retsba,
                                                    rohav,
                                                    sheldaHetsonet,
                                                    sogAglaBS,
                                                    solam,
                                                    tosefetVnel,
                                                    toseftReshet,
                                                    toseftVnelBro,
                                                    tsmgSber,
                                                    tsmgem,
                                                    tvahAnkheSolam,
                                                    tvahAnkheVnel,
                                                    tvahAofkeSolam,
                                                    tvahAofkeVnel,
                                                    tvahHlokaThtona,
                                                    tvahSheldaBnemet,
                                                    vnel,
                                                    yetsol,
                                                    motsaremBrofelem,
                                                    motsaremLhatseg,
                                                    motsaremRglem,
                                                    tosfot
                                                });
                                                setLoading(false);
                                            }} className="ml-4" variant="flat" color="primary" size="sm">
                                                עדכון
                                            </Button>
                                        </div>
                                    )
                            }
                        </motion.div>
                        <div className={`flex-1 transition-all duration-300 ease-in-out ${drawerOpen ? "ml-1/4" : "ml-0"}`}>
                            <div className="flex w-full flex-wrap justify-end">
                                <TokhneotCard
                                    openDrawer={() => {
                                        if (selectedTokh?.shem && selectedTokh?.shem === 'חדשה') {
                                            if (IsChangedToSaveTokhnet()) {
                                                setSelectedTokhToSave(null);
                                                setShowModalMessage(true);
                                            }
                                            else {
                                                toggleDrawer();
                                                setSelectedTokh(null);
                                                ResetAll();
                                            }
                                        }
                                        else if (selectedTokh?.shem) {
                                            ResetAll();
                                            toggleDrawer();
                                            setSelectedTokh({
                                                shem: 'חדשה',
                                                newTokhnet: true
                                            });
                                            setTimeout(() => {
                                                setDrawerOpen(true);
                                            }, 300);
                                        }
                                        else {
                                            ResetAll();
                                            toggleDrawer();
                                            setSelectedTokh({
                                                shem: 'חדשה',
                                                newTokhnet: true
                                            });
                                        }
                                    }}
                                    hovered={selectedTokh?.shem === 'חדשה'}
                                    add
                                />
                                {
                                    Tokhneot.map((tokh, index) => (
                                        <TokhneotCard
                                            openDrawer={() => {
                                                if (selectedTokh?.shem && selectedTokh?.shem === tokh.shem) {
                                                    toggleDrawer();
                                                    setSelectedTokh(null);
                                                }
                                                else if (selectedTokh?.shem) {
                                                    if (selectedTokh?.shem == 'חדשה' && IsChangedToSaveTokhnet()) {
                                                        setSelectedTokhToSave(tokh);
                                                        setShowModalMessage(true);
                                                    }
                                                    else {
                                                        toggleDrawer();
                                                        setSelectedTokh(tokh);
                                                        setTimeout(() => {
                                                            setDrawerOpen(true);
                                                        }, 300);
                                                        ResetAll();
                                                    }
                                                }
                                                else {
                                                    toggleDrawer();
                                                    setSelectedTokh(tokh);
                                                }
                                            }}
                                            hovered={tokh.shem === selectedTokh?.shem}
                                            shem={tokh.shem}
                                            sogAgla={tokh.sogAgla}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t-2">
                        <div>
                            <Button color="warning" variant="flat" size="sm" onClick={disable}>
                                סגור
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export function TokhneotCard({ openDrawer, hovered, shem, sogAgla, add }) {
    return (
        <div onClick={() => openDrawer()} className="m-4 rounded-2xl">
            <Card className={`cursor-pointer hover:bg-primary-100 ${hovered ? 'bg-primary-100' : ''}`}>
                <CardHeader dir="rtl" className="pb-0 pt-2 px-4 flex-col items-start">
                    {
                        add ?
                            <>
                                <p className="text-tiny uppercase font-bold">הוספה</p>
                                <small className="text-default-500">&nbsp;</small>
                            </>
                            :
                            <>
                                <p className="text-tiny uppercase font-bold">{shem}</p>
                                <small className="text-default-500">עגלה {sogAgla}</small>
                            </>
                    }

                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <div className="w-full justify-center flex items-center">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={add ? 'https://cdn-icons-png.flaticon.com/512/4604/4604818.png' : "https://cdn-icons-png.flaticon.com/512/1046/1046485.png"}
                            width={80}
                            height={80}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
