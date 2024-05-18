'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import GetDocs from "../FireBase/getDocs";
import { useGetDataByCondition } from "../FireBase/getDataByCondition";
import { MdOutlineTimer } from "react-icons/md";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
import { MathX1, MathX3 } from "../Components/MathParts";
import { FaPlus } from "react-icons/fa";
import { differenceInDays, differenceInHours, differenceInMinutes, parseISO } from 'date-fns';
import CountdownComponent from "../Components/TimeCalc";

export default function ModalCreate({ show, disable }) {

    const [sogAska, setSogAska] = useState('סוג עסקה');
    const lkhot = GetDocs('customers');
    const [lkoh, setLkoh] = useState('');
    const aglot = useGetDataByCondition('drags', 'msbarLkoh', '==', 999);


    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        async function fetchDocuments() {
            try {
                const querySnapshot = await getDocs(collection(firestore, "category"));
                const docsArray = [];
                querySnapshot.forEach((doc) => {
                    docsArray.push({ id: doc.id, ...doc.data() });
                });
                setDocuments(docsArray);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        }
        fetchDocuments();
    }, []);

    const mlae = GetDocs('mlae');
    const category = GetDocs('category');

    function GetBrtemMotsarCategory(remez) {
        for (let index = 0; index < category.length; index++) {
            let motsrem = category[index].motsarem;
            for (let index1 = 0; index1 < motsrem.length; index1++) {
                if (motsrem[index1].sog === remez) {
                    return motsrem[index1];
                }
            }
        }
        return;
    }

    function GetBrtemMotsarMlae(remez, shem) {
        const motsarMlae = mlae.filter(item => item.categoryMotsar === remez);
        const alot = motsarMlae.find(item => item.shem === shem)?.alotLeheda || 0;
        const kmot = motsarMlae.find(item => item.shem === shem)?.kmot || 0;
        return { arrayResualt: motsarMlae, alot, kmot };
    }

    const divRefs = useRef([React.createRef(), React.createRef(), React.createRef()]);

    const scrollTo = (index) => {
        if (divRefs.current[index].current) {
            divRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [aorkh, setAorkh] = useState('');
    const [rohf, setRohf] = useState('');

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
    ]

    //--------------------------------------------------------------------------------B7
    const [dofnShem, setDofnShem] = useState('בחר פריט');
    const [dofn, setDofn] = useState({ kmot: MathX1(aorkh, rohf, 'B7'), mher: 0 });
    //--------------------------------------------------------------------------------B1
    const [bhShem, setBhShem] = useState('בחר פריט');
    const [bh, setBh] = useState({ kmot: MathX1(aorkh, rohf, 'B1'), mher: 0 });
    //--------------------------------------------------------------------------------B2
    const [bhHlvshaShem, setBhHlvshsaShem] = useState('בחר פריט');
    const [bhHlvsha, setBhHlvshsa] = useState({ kmot: MathX1(aorkh, rohf, 'B2'), mher: 0 });
    //--------------------------------------------------------------------------------F4
    const [bnsAhoreShem, setBnsAhoreShem] = useState('בחר פריט');//פנס אחורי
    const [bnsAhore, setBnasAhore] = useState({ kmot: MathX1(aorkh, rohf, 'F4'), mher: 0 });
    //--------------------------------------------------------------------------------F5
    const [bnasKdmeShem, setBnasKdmeShem] = useState('בחר פריט');//פנס קדמי
    const [bnasKdme, setBnasKdme] = useState({ kmot: MathX1(aorkh, rohf, 'F5'), mher: 0 });
    //--------------------------------------------------------------------------------F6
    const [mhzerAorMshlomShem, setMhzerAorMshlomShem] = useState('בחר פריט');//מחזיר אור משלום
    const [mhzerAorMshlom, setMhzerAorMshlom] = useState({ kmot: MathX1(aorkh, rohf, 'F6'), mher: 0 });
    //--------------------------------------------------------------------------------F7
    const [MhzerAorMlbneShem, setMhzerAorMlbneShem] = useState('בחר פריט');//מחזיר אור מלבני
    const [MhzerAorMlbne, setMhzerAorMlbne] = useState({ kmot: MathX1(aorkh, rohf, 'F7'), mher: 0 });
    //--------------------------------------------------------------------------------F3
    const [kabelTaorhShem, setKabelTaorhShem] = useState('בחר פריט');//כבל תאורה
    const [KabelTaorh, setKabelTaorh] = useState({ kmot: MathX1(aorkh, rohf, 'F3'), mher: 0 });
    //--------------------------------------------------------------------------------E1
    const [MgenBotsShem, setMgenBotsShem] = useState('בחר פריט');//מגן בוץ
    const [mgenBots, setMgenBots] = useState({ kmot: MathX1(aorkh, rohf, 'E1'), mher: 0 });
    //--------------------------------------------------------------------------------E2
    const [mdbekotNegrarShem, setMdbekotNegrarShem] = useState('בחר פריט');//מדביקות נגרר
    const [mdbekotNegrar, setMdbekotNegrar] = useState({ kmot: MathX1(aorkh, rohf, 'E2'), mher: 0 });
    //--------------------------------------------------------------------------------E3
    const [lohotSemonMhzerAorShem, setLohotSemonMhzerAorShem] = useState('בחר פריט');//לוחות סימון מחזיר אור
    const [lohotSemonMhzerAor, setLohotSemonMhzerAor] = useState({ kmot: MathX1(aorkh, rohf, 'E3'), mher: 0 });
    //--------------------------------------------------------------------------------E4
    const [mdbekotHhevraShem, setMdbekotHhevraShem] = useState('בחר פריט');//מדביקות החברה
    const [mdbekotHhevra, setMdbekotHhevra] = useState({ kmot: MathX1(aorkh, rohf, 'E4'), mher: 0 });
    //--------------------------------------------------------------------------------C1
    const [mhzektTsmegShem, setMhzektTsmegShem] = useState('בחר פריט');//מחזיקת צמיג
    const [mhzektTsmeg, setMhzektTsmeg] = useState({ kmot: MathX1(aorkh, rohf, 'C1'), mher: 0 });
    //--------------------------------------------------------------------------------C2
    const [aomemShem, setAomemShem] = useState('בחר פריט');//אומים
    const [aomem, setAomem] = useState({ kmot: MathX1(aorkh, rohf, 'C2'), mher: 0 });
    //--------------------------------------------------------------------------------C3
    const [brgemShem, setBrgemShem] = useState('בחר פריט');//ברגים
    const [brgem, setBrgem] = useState({ kmot: MathX1(aorkh, rohf, 'C3'), mher: 0 });
    //--------------------------------------------------------------------------------C4
    const [serKnafShem, setSerKnafShem] = useState('בחר פריט');//סיר כנף
    const [serKnaf, setSerKnaf] = useState({ kmot: MathX1(aorkh, rohf, 'C4'), mher: 0 });
    //--------------------------------------------------------------------------------C5
    const [vavKsheraShem, setVavKsheraShem] = useState('בחר פריט');//וו קשירה
    const [vavKshera, setVavKshera] = useState({ kmot: MathX1(aorkh, rohf, 'C5'), mher: 0 });
    //--------------------------------------------------------------------------------C6
    const [tbatKsheraShem, setTbatKsheraShem] = useState('בחר פריט');//טבעת קשירה
    const [tbatKshera, setTbatKshera] = useState({ kmot: MathX1(aorkh, rohf, 'C6'), mher: 0 });
    //--------------------------------------------------------------------------------C7
    const [ydetSegerShem, setYdetSegerShem] = useState('בחר פריט');//ידית סגר
    const [ydetSeger, setYdetSeger] = useState({ kmot: MathX1(aorkh, rohf, 'C7'), mher: 0 });
    //--------------------------------------------------------------------------------C8
    const [ydetAhezaShem, setYdetAhezaShem] = useState('בחר פריט');//ידית אחיזה
    const [ydetAheza, setYdetAheza] = useState({ kmot: MathX1(aorkh, rohf, 'C8'), mher: 0 });
    //--------------------------------------------------------------------------------C10
    const [segrAhronShem, setSegrAhronShem] = useState('בחר פריט');//סגר אהרון
    const [segrAhron, setSegrAhron] = useState({ kmot: MathX1(aorkh, rohf, 'C10'), mher: 0 });
    //--------------------------------------------------------------------------------C11
    const [shrshertShem, setShrshertShem] = useState('בחר פריט');//שרשרת
    const [shrshert, setShrshert] = useState({ kmot: MathX1(aorkh, rohf, 'C11'), mher: 0 });
    //--------------------------------------------------------------------------------G1
    const [KtsevBoleartenShem, setktsevBoleartenShem] = useState('בחר פריט');//קצף פוליאוריטן
    const [KtsevBolearten, setktsevBolearten] = useState({ kmot: MathX1(aorkh, rohf, 'G1'), mher: 0 });
    //--------------------------------------------------------------------------------G2
    const [slekonShem, setSlekonShem] = useState('בחר פריט');//סיליקון
    const [slekon, setSlekon] = useState({ kmot: MathX1(aorkh, rohf, 'G2'), mher: 0 });
    //--------------------------------------------------------------------------------G3
    const [gazShem, setGazShem] = useState('בחר פריט');//גז
    const [gaz, setGaz] = useState({ kmot: MathX1(aorkh, rohf, 'G3'), mher: 0 });
    //--------------------------------------------------------------------------------G4
    const [hotRetokhShem, setHotRetokhShem] = useState('בחר פריט');//חוט ריתוך
    const [hotRetokh, setHotRetokh] = useState({ kmot: MathX1(aorkh, rohf, 'G4'), mher: 0 });
    //--------------------------------------------------------------------------------G5
    const [deskHetokhShem, setDeskHetokhShem] = useState('בחר פריט');//דיסק חיתוך
    const [deskHetokh, setDeskHetokh] = useState({ kmot: MathX1(aorkh, rohf, 'G5'), mher: 0 });
    //--------------------------------------------------------------------------------G6
    const [tnerShem, setTnerShem] = useState('בחר פריט');//טנר
    const [tner, setTner] = useState({ kmot: MathX1(aorkh, rohf, 'G6'), mher: 0 });




    const [msbarTsrem, setMsbarTsrem] = useState('');
    const [aemBlamem, setAemBlamem] = useState(false);
    const [tsmegSber, setTsmegSber] = useState(false);
    //--------------------------------------------------------------------------------A2
    const [ktefSgneTsremShem, setKtefSgneTsremShem] = useState('בחר פריט');//כתף שני צרים
    const [ktefSgneTsrem, setKtefSgneTsrem] = useState({ kmot: MathX3(msbarTsrem, 'A2'), mher: 0 });
    //--------------------------------------------------------------------------------A1
    const [ktefTserAhadShem, setktefTserAhadShem] = useState('בחר פריט');//כתף ציר אחד
    const [ktefTserAhad, setktefTserAhad] = useState({ kmot: MathX3(msbarTsrem, 'A1'), mher: 0 });
    //--------------------------------------------------------------------------------A10
    const [tserShem, setTserShem] = useState('בחר פריט');//ציר
    const [tser, setTser] = useState({ kmot: MathX3(msbarTsrem, 'A10'), mher: 0 });
    //--------------------------------------------------------------------------------A3
    const [tsmegShem, setTsmegShem] = useState('בחר פריט');//צמיג
    const [tsmeg, setTsmeg] = useState({ kmot: MathX3(msbarTsrem, 'A3'), mher: 0 });
    //--------------------------------------------------------------------------------F2
    const [kabelBlamemShem, setKabelBlamemShem] = useState('בחר פריט');//צמיג
    const [kabelBlamem, setKabelBlamem] = useState({ kmot: MathX3(msbarTsrem, 'F2'), mher: 0 });
    //--------------------------------------------------------------------------------F2
    const [tsmegSberShem, setTsmegSberShem] = useState('בחר פריט');//צמיג ספר
    const [tsmegSberr, setTsmegSberr] = useState({ kmot: 0, mher: 0 });


    const NamesX3 = [
        GetBrtemMotsarCategory('A1')?.shem,
        GetBrtemMotsarCategory('A10')?.shem,
        GetBrtemMotsarCategory('A3')?.shem,
        GetBrtemMotsarCategory('A2')?.shem,
        GetBrtemMotsarCategory('F2')?.shem,
        GetBrtemMotsarCategory('C1')?.shem,

    ]


    //--------------------------------------------------------------------------------F2
    const [sheldaHetsonetBret, setSheldaHetsonetBret] = useState('בחר פריט');
    const [sheldaHetsonet, setSheldaHetsonet] = useState({ kmot: 0, mher: 0 });

    const [sheldaKdmetBret, setSheldaKdmetBret] = useState('בחר פריט');
    const [sheldaKdmet, setSheldaKdmet] = useState({ kmot: 0, mher: 0 });
    const [aorkhBrofel, setAorkhBrofel] = useState(0);

    const [sheldaBnmetBretA, setSheldaBnmetBretA] = useState('בחר פריט');
    const [msbarBrofelemBretA, setMsbarBrofelmBretA] = useState(null);
    const [sheldaBnmetA, setSheldaBnmetA] = useState({ kmot: 0, mher: 0 });
    const [sheldaBnmetBretB, setSheldaBnmetBretB] = useState('בחר פריט');
    const [sheldaBnmetB, setSheldaBnmetB] = useState({ kmot: 0, mher: 0 });

    const NamesX5 = [
        GetBrtemMotsarCategory('B5')?.shem,
        GetBrtemMotsarCategory('D1')?.shem,
        GetBrtemMotsarCategory('A4')?.shem,
        GetBrtemMotsarCategory('A5')?.shem,
        GetBrtemMotsarCategory('A6')?.shem,
        GetBrtemMotsarCategory('A7')?.shem,
        GetBrtemMotsarCategory('A8')?.shem,
        GetBrtemMotsarCategory('A9')?.shem,
    ]

    const [aemTseba, setAemTseba] = useState(false);
    const [tsebaBret, setTsebaBret] = useState('בחר פריט');
    const [tseba, setTseba] = useState({ kmot: 0, mher: 0 });


    const [aemBashbashol, setAemBashbashol] = useState(false);
    const [aemKafRetom, setAemKafRetom] = useState(false);
    const [aemMekhalMaym, setAemMekhalMaym] = useState(false);
    const [aemArgazKlem, setAemArgazKlem] = useState(false);
    const [aemGlgalAzer, setAemGlgalAzer] = useState(false);
    const [aemReglHnea, setAemReglHnea] = useState(false);

    //--------------------------------------------------------------------------------A4
    const [bashbsholShem, setBashbsholShem] = useState('בחר פריט');//צמיג ספר
    const [bashbshol, setBashbshol] = useState({ kmot: 0, mher: 0 });
    //--------------------------------------------------------------------------------A5
    const [kafRetomShem, setKafRetomShem] = useState('בחר פריט');//צמיג ספר
    const [kafRetom, setKafRetom] = useState({ kmot: 0, mher: 0 });
    //--------------------------------------------------------------------------------A7
    const [mekhalMaymShem, setMekhalMaymShem] = useState('בחר פריט');//צמיג ספר
    const [mekhalMaym, setMekhalMaym] = useState({ kmot: 0, mher: 0 });
    //--------------------------------------------------------------------------------A6
    const [argazKlemShem, setArgazKlemShem] = useState('בחר פריט');//צמיג ספר
    const [argazKlem, setArgazKlem] = useState({ kmot: 0, mher: 0 });
    //--------------------------------------------------------------------------------A8
    const [glgalAzerShem, setGlgalAzerShem] = useState('בחר פריט');//צמיג ספר
    const [glgalAzer, setGlgalAzer] = useState({ kmot: 0, mher: 0 });
    //--------------------------------------------------------------------------------A9
    const [reglHneaShem, setReglHneaShem] = useState('בחר פריט');//צמיג ספר
    const [reglHnea, setReglHnea] = useState({ kmot: 0, mher: 0 });



    const [tvahBrofel, setTvahBrofel] = useState('');
    const [msbarBrofelem, setMsbarBrofelem] = useState('');
    const [helkBetBnmet, setHelkBetBnmet] = useState(false);

    const [aemRmbaAoRgel, setAemRmbaAoRgel] = useState('');



    useEffect(() => {
        setDofn({
            kmot: Math.min(MathX1(aorkh, rohf, 'B7'), GetBrtemMotsarMlae('B7', dofnShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'B7'), GetBrtemMotsarMlae('B7', dofnShem).kmot) * GetBrtemMotsarMlae('B7', dofnShem).alot)
        });
    }, [aorkh, rohf, dofnShem]);
    useEffect(() => {
        setBh({
            kmot: Math.min(MathX1(aorkh, rohf, 'B1'), GetBrtemMotsarMlae('B1', bhShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'B1'), GetBrtemMotsarMlae('B1', bhShem).kmot) * GetBrtemMotsarMlae('B1', bhShem).alot)
        });
    }, [aorkh, rohf, bhShem]);
    useEffect(() => {
        setBhHlvshsa({
            kmot: Math.min(MathX1(aorkh, rohf, 'B2'), GetBrtemMotsarMlae('B2', bhHlvshaShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'B2'), GetBrtemMotsarMlae('B2', bhHlvshaShem).kmot) * GetBrtemMotsarMlae('B2', bhHlvshaShem).alot)
        })
    }, [aorkh, rohf, bhHlvshaShem]);
    useEffect(() => {
        setBnasAhore({
            kmot: Math.min(MathX1(aorkh, rohf, 'F4'), GetBrtemMotsarMlae('F4', bnsAhoreShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'F4'), GetBrtemMotsarMlae('F4', bnsAhoreShem).kmot) * GetBrtemMotsarMlae('F4', bnsAhoreShem).alot)
        })
    }, [aorkh, rohf, bnsAhoreShem]);
    useEffect(() => {
        setBnasKdme({
            kmot: Math.min(MathX1(aorkh, rohf, 'F5'), GetBrtemMotsarMlae('F5', bnasKdmeShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'F5'), GetBrtemMotsarMlae('F5', bnasKdmeShem).kmot) * GetBrtemMotsarMlae('F5', bnasKdmeShem).alot)
        })
    }, [aorkh, rohf, bnasKdmeShem]);
    useEffect(() => {
        setMhzerAorMshlom({
            kmot: Math.min(MathX1(aorkh, rohf, 'F6'), GetBrtemMotsarMlae('F6', mhzerAorMshlomShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'F6'), GetBrtemMotsarMlae('F6', mhzerAorMshlomShem).kmot) * GetBrtemMotsarMlae('F6', mhzerAorMshlomShem).alot)
        })
    }, [aorkh, rohf, mhzerAorMshlomShem]);
    useEffect(() => {
        setMhzerAorMlbne({
            kmot: Math.min(MathX1(aorkh, rohf, 'F7'), GetBrtemMotsarMlae('F7', MhzerAorMlbneShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'F7'), GetBrtemMotsarMlae('F7', MhzerAorMlbneShem).kmot) * GetBrtemMotsarMlae('F7', MhzerAorMlbneShem).alot)
        })
    }, [aorkh, rohf, mhzerAorMshlomShem]);
    useEffect(() => {
        setKabelTaorh({
            kmot: Math.min(MathX1(aorkh, rohf, 'F3'), GetBrtemMotsarMlae('F3', kabelTaorhShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'F3'), GetBrtemMotsarMlae('F3', kabelTaorhShem).kmot) * GetBrtemMotsarMlae('F3', kabelTaorhShem).alot)
        })
    }, [aorkh, rohf, kabelTaorhShem]);
    useEffect(() => {
        setMgenBots({
            kmot: Math.min(MathX1(aorkh, rohf, 'E1'), GetBrtemMotsarMlae('E1', MgenBotsShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'E1'), GetBrtemMotsarMlae('E1', MgenBotsShem).kmot) * GetBrtemMotsarMlae('E1', MgenBotsShem).alot)
        })
    }, [aorkh, rohf, MgenBotsShem]);
    useEffect(() => {
        setMdbekotNegrar({
            kmot: Math.min(MathX1(aorkh, rohf, 'E2'), GetBrtemMotsarMlae('E2', mdbekotNegrarShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'E2'), GetBrtemMotsarMlae('E2', mdbekotNegrarShem).kmot) * GetBrtemMotsarMlae('E2', mdbekotNegrarShem).alot)
        })
    }, [aorkh, rohf, mdbekotNegrarShem]);
    useEffect(() => {
        setLohotSemonMhzerAor({
            kmot: Math.min(MathX1(aorkh, rohf, 'E3'), GetBrtemMotsarMlae('E3', lohotSemonMhzerAorShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'E3'), GetBrtemMotsarMlae('E3', lohotSemonMhzerAorShem).kmot) * GetBrtemMotsarMlae('E3', lohotSemonMhzerAorShem).alot)
        })
    }, [aorkh, rohf, lohotSemonMhzerAorShem]);
    useEffect(() => {
        setMdbekotHhevra({
            kmot: Math.min(MathX1(aorkh, rohf, 'E4'), GetBrtemMotsarMlae('E4', mdbekotHhevraShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'E4'), GetBrtemMotsarMlae('E4', mdbekotHhevraShem).kmot) * GetBrtemMotsarMlae('E4', mdbekotHhevraShem).alot)
        })
    }, [aorkh, rohf, mdbekotHhevraShem]);
    useEffect(() => {
        setMhzektTsmeg({
            kmot: Math.min(MathX1(aorkh, rohf, 'C1'), GetBrtemMotsarMlae('C1', mhzektTsmegShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'C1'), GetBrtemMotsarMlae('C1', mhzektTsmegShem).kmot) * GetBrtemMotsarMlae('C1', mhzektTsmegShem).alot)
        })
    }, [aorkh, rohf, mhzektTsmegShem]);
    useEffect(() => {
        setAomem({
            kmot: Math.min(MathX1(aorkh, rohf, 'C2'), GetBrtemMotsarMlae('C2', aomemShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'C2'), GetBrtemMotsarMlae('C2', aomemShem).kmot) * GetBrtemMotsarMlae('C2', aomemShem).alot)
        })
    }, [aorkh, rohf, aomemShem]);
    useEffect(() => {
        setBrgem({
            kmot: Math.min(MathX1(aorkh, rohf, 'C3'), GetBrtemMotsarMlae('C3', brgemShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'C3'), GetBrtemMotsarMlae('C3', brgemShem).kmot) * GetBrtemMotsarMlae('C3', brgemShem).alot)
        })
    }, [aorkh, rohf, brgemShem]);
    useEffect(() => {
        setSerKnaf({
            kmot: Math.min(MathX1(aorkh, rohf, 'C4'), GetBrtemMotsarMlae('C4', serKnafShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'C4'), GetBrtemMotsarMlae('C4', serKnafShem).kmot) * GetBrtemMotsarMlae('C4', serKnafShem).alot)
        })
    }, [aorkh, rohf, serKnafShem]);
    useEffect(() => {
        setVavKshera({
            kmot: Math.min(MathX1(aorkh, rohf, 'C5'), GetBrtemMotsarMlae('C5', vavKsheraShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'C5'), GetBrtemMotsarMlae('C5', vavKsheraShem).kmot) * GetBrtemMotsarMlae('C5', vavKsheraShem).alot)
        })
    }, [aorkh, rohf, vavKsheraShem]);
    useEffect(() => {
        setTbatKshera({
            kmot: Math.min(MathX1(aorkh, rohf, 'C6'), GetBrtemMotsarMlae('C6', tbatKsheraShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'C6'), GetBrtemMotsarMlae('C6', tbatKsheraShem).kmot) * GetBrtemMotsarMlae('C6', tbatKsheraShem).alot)
        })
    }, [aorkh, rohf, tbatKsheraShem]);
    useEffect(() => {
        setYdetSeger({
            kmot: Math.min(MathX1(aorkh, rohf, 'C7'), GetBrtemMotsarMlae('C7', ydetSegerShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'C7'), GetBrtemMotsarMlae('C7', ydetSegerShem).kmot) * GetBrtemMotsarMlae('C7', ydetSegerShem).alot)
        })
    }, [aorkh, rohf, ydetSegerShem]);
    useEffect(() => {
        setYdetAheza({
            kmot: Math.min(MathX1(aorkh, rohf, 'C8'), GetBrtemMotsarMlae('C8', ydetAhezaShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'C8'), GetBrtemMotsarMlae('C8', ydetAhezaShem).kmot) * GetBrtemMotsarMlae('C8', ydetAhezaShem).alot)
        })
    }, [aorkh, rohf, ydetAhezaShem]);
    useEffect(() => {
        setSegrAhron({
            kmot: Math.min(MathX1(aorkh, rohf, 'C10'), GetBrtemMotsarMlae('C10', segrAhronShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'C10'), GetBrtemMotsarMlae('C10', segrAhronShem).kmot) * GetBrtemMotsarMlae('C10', segrAhronShem).alot)
        })
    }, [aorkh, rohf, segrAhronShem]);
    useEffect(() => {
        setShrshert({
            kmot: Math.min(MathX1(aorkh, rohf, 'C11'), GetBrtemMotsarMlae('C11', shrshertShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'C11'), GetBrtemMotsarMlae('C11', shrshertShem).kmot) * GetBrtemMotsarMlae('C11', shrshertShem).alot)
        })
    }, [aorkh, rohf, shrshertShem]);
    useEffect(() => {
        setktsevBolearten({
            kmot: Math.min(MathX1(aorkh, rohf, 'G1'), GetBrtemMotsarMlae('G1', KtsevBoleartenShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'G1'), GetBrtemMotsarMlae('G1', KtsevBoleartenShem).kmot) * GetBrtemMotsarMlae('G1', KtsevBoleartenShem).alot)
        })
    }, [aorkh, rohf, KtsevBoleartenShem]);
    useEffect(() => {
        setSlekon({
            kmot: Math.min(MathX1(aorkh, rohf, 'G2'), GetBrtemMotsarMlae('G2', slekonShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'G2'), GetBrtemMotsarMlae('G2', slekonShem).kmot) * GetBrtemMotsarMlae('G2', slekonShem).alot)
        })
    }, [aorkh, rohf, slekonShem]);
    useEffect(() => {
        setGaz({
            kmot: Math.min(MathX1(aorkh, rohf, 'G3'), GetBrtemMotsarMlae('G3', gazShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'G3'), GetBrtemMotsarMlae('G3', gazShem).kmot) * GetBrtemMotsarMlae('G3', gazShem).alot)
        })
    }, [aorkh, rohf, gazShem]);
    useEffect(() => {
        setHotRetokh({
            kmot: Math.min(MathX1(aorkh, rohf, 'G4'), GetBrtemMotsarMlae('G4', hotRetokhShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'G4'), GetBrtemMotsarMlae('G4', hotRetokhShem).kmot) * GetBrtemMotsarMlae('G4', hotRetokhShem).alot)
        })
    }, [aorkh, rohf, hotRetokhShem]);
    useEffect(() => {
        setDeskHetokh({
            kmot: Math.min(MathX1(aorkh, rohf, 'G5'), GetBrtemMotsarMlae('G5', deskHetokhShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'G5'), GetBrtemMotsarMlae('G5', deskHetokhShem).kmot) * GetBrtemMotsarMlae('G5', deskHetokhShem).alot)
        })
    }, [aorkh, rohf, deskHetokhShem]);
    useEffect(() => {
        setTner({
            kmot: Math.min(MathX1(aorkh, rohf, 'G6'), GetBrtemMotsarMlae('G6', tnerShem).kmot),
            mher: (Math.min(MathX1(aorkh, rohf, 'G6'), GetBrtemMotsarMlae('G6', tnerShem).kmot) * GetBrtemMotsarMlae('G6', tnerShem).alot)
        })
    }, [aorkh, rohf, tnerShem]);
    useEffect(() => {
        setktefTserAhad({
            kmot: Math.min(MathX3(msbarTsrem, 'A1'), GetBrtemMotsarMlae('A1', ktefTserAhadShem).kmot),
            mher: (Math.min(MathX3(msbarTsrem, 'A1'), GetBrtemMotsarMlae('A1', ktefTserAhadShem).kmot) * GetBrtemMotsarMlae('A1', ktefTserAhadShem).alot)
        })
    }, [msbarTsrem, ktefTserAhadShem]);
    useEffect(() => {
        setTser({
            kmot: Math.min(MathX3(msbarTsrem, 'A10'), GetBrtemMotsarMlae('A10', tserShem).kmot),
            mher: (Math.min(MathX3(msbarTsrem, 'A10'), GetBrtemMotsarMlae('A10', tserShem).kmot) * GetBrtemMotsarMlae('A10', tserShem).alot)
        })
    }, [msbarTsrem, tserShem]);
    useEffect(() => {
        setTsmeg({
            kmot: Math.min(MathX3(msbarTsrem, 'A3'), GetBrtemMotsarMlae('A3', tsmegShem).kmot),
            mher: (Math.min(MathX3(msbarTsrem, 'A3'), GetBrtemMotsarMlae('A3', tsmegShem).kmot) * GetBrtemMotsarMlae('A3', tsmegShem).alot)
        })
    }, [msbarTsrem, tsmegShem]);
    useEffect(() => {
        setKtefSgneTsrem({
            kmot: Math.min(MathX3(msbarTsrem, 'A2'), GetBrtemMotsarMlae('A2', ktefSgneTsremShem).kmot),
            mher: (Math.min(MathX3(msbarTsrem, 'A2'), GetBrtemMotsarMlae('A2', ktefSgneTsremShem).kmot) * GetBrtemMotsarMlae('A2', ktefSgneTsremShem).alot)
        })
    }, [msbarTsrem, ktefSgneTsremShem]);
    useEffect(() => {
        setKabelBlamem({
            kmot: Math.min(MathX3(msbarTsrem, 'F2'), GetBrtemMotsarMlae('F2', kabelBlamemShem).kmot),
            mher: (Math.min(MathX3(msbarTsrem, 'F2'), GetBrtemMotsarMlae('F2', kabelBlamemShem).kmot) * GetBrtemMotsarMlae('F2', kabelBlamemShem).alot)
        })
    }, [msbarTsrem, kabelBlamemShem]);
    useEffect(() => {
        setTsmegSberr({
            kmot: Math.min(MathX3(msbarTsrem, 'C1'), GetBrtemMotsarMlae('C1', tsmegSberShem).kmot),
            mher: (Math.min(MathX3(msbarTsrem, 'C1'), GetBrtemMotsarMlae('C1', tsmegSberShem).kmot) * GetBrtemMotsarMlae('C1', tsmegSberShem).alot)
        })
    }, [msbarTsrem, tsmegSberShem]);
    useEffect(() => {
        setTseba({
            kmot: tseba.kmot,
            mher: (tseba.kmot * GetBrtemMotsarMlae('D1', tsebaBret).alot)
        })
    }, [tsebaBret]);
    useEffect(() => {
        setKafRetom({
            kmot: kafRetom.kmot,
            mher: (kafRetom.kmot * GetBrtemMotsarMlae('A5', kafRetomShem).alot)
        })
    }, [kafRetomShem]);
    useEffect(() => {
        setBashbshol({
            kmot: kafRetom.kmot,
            mher: (kafRetom.kmot * GetBrtemMotsarMlae('A4', bashbsholShem).alot)
        })
    }, [bashbsholShem]);
    useEffect(() => {
        setMekhalMaym({
            kmot: mekhalMaym.kmot,
            mher: (mekhalMaym.kmot * GetBrtemMotsarMlae('A6', mekhalMaymShem).alot)
        })
    }, [mekhalMaymShem]);
    useEffect(() => {
        setArgazKlem({
            kmot: argazKlem.kmot,
            mher: (argazKlem.kmot * GetBrtemMotsarMlae('A7', argazKlemShem).alot)
        })
    }, [argazKlemShem]);
    useEffect(() => {
        setGlgalAzer({
            kmot: glgalAzer.kmot,
            mher: (glgalAzer.kmot * GetBrtemMotsarMlae('A8', glgalAzerShem).alot)
        })
    }, [glgalAzerShem]);
    useEffect(() => {
        setReglHnea({
            kmot: reglHnea.kmot,
            mher: (reglHnea.kmot * GetBrtemMotsarMlae('A9', reglHneaShem).alot)
        })
    }, [reglHneaShem]);






    useEffect(() => {
        setSheldaBnmetA({
            kmot: (msbarBrofelem || 0),
            mher: (sheldaBnmetA.kmot * GetBrtemMotsarMlae('B5', sheldaBnmetBretA).alot)
        })
        setSheldaBnmetB({
            kmot: (msbarBrofelem || 0) - (msbarBrofelemBretA || 0),
            mher: (sheldaBnmetB.kmot * GetBrtemMotsarMlae('B5', sheldaBnmetBretB).alot)
        })
        setSheldaHetsonet({
            kmot: Math.min(((aorkh * 2) + (rohf * 2)), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot),
            mher: (Math.min(((aorkh * 2) + (rohf * 2)), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaHetsonetBret).alot)
        })
        setSheldaKdmet({
            kmot: Math.min(((aorkhBrofel || 0) * 2), GetBrtemMotsarMlae('B5', sheldaKdmetBret).kmot),
            mher: (Math.min(((aorkhBrofel || 0) * 2), GetBrtemMotsarMlae('B5', sheldaKdmetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaKdmetBret).alot)
        })
        if (sheldaHetsonetBret === sheldaKdmetBret && sheldaKdmetBret === sheldaBnmetBretA && sheldaBnmetBretA === sheldaBnmetBretB) {
            setSheldaHetsonet({
                kmot: Math.min(((((aorkh * 2) + (rohf * 2)) + ((aorkhBrofel || 0) * 2)) + (msbarBrofelem || 0)), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot),
                mher: (Math.min(((((aorkh * 2) + (rohf * 2)) + ((aorkhBrofel || 0) * 2) + (msbarBrofelem || 0))), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaKdmetBret).alot)
            })
        }
        if (sheldaHetsonetBret === sheldaKdmetBret && sheldaKdmetBret === sheldaBnmetBretA) {
            setSheldaHetsonet({
                kmot: Math.min(((((aorkh * 2) + (rohf * 2)) + ((aorkhBrofel || 0) * 2)) + (msbarBrofelemBretA || 0)), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot),
                mher: (Math.min(((((aorkh * 2) + (rohf * 2)) + ((aorkhBrofel || 0) * 2)) + (msbarBrofelemBretA || 0)), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaKdmetBret).alot)
            })
        }
        if (sheldaHetsonetBret === sheldaKdmetBret && sheldaKdmetBret === sheldaBnmetBretB) {
            setSheldaHetsonet({
                kmot: Math.min(((((aorkh * 2) + (rohf * 2)) + ((aorkhBrofel || 0) * 2)) + ((msbarBrofelem || 0) - (msbarBrofelemBretA || 0))), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot),
                mher: (Math.min(((((aorkh * 2) + (rohf * 2)) + ((aorkhBrofel || 0) * 2)) + ((msbarBrofelem || 0) - (msbarBrofelemBretA || 0))), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaKdmetBret).alot)
            })
        }
        if (sheldaHetsonetBret === sheldaBnmetBretA && sheldaBnmetBretA === sheldaBnmetBretB) {
            setSheldaHetsonet({
                kmot: Math.min((((aorkh * 2) + (rohf * 2)) + (msbarBrofelem || 0)), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot),
                mher: (Math.min((((aorkh * 2) + (rohf * 2)) + (msbarBrofelem || 0)), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaKdmetBret).alot)
            })
        }
        if (sheldaKdmetBret === sheldaBnmetBretA && sheldaBnmetBretA === sheldaBnmetBretB) {
            setSheldaKdmet({
                kmot: Math.min((((aorkhBrofel || 0) * 2) + (msbarBrofelem || 0)), GetBrtemMotsarMlae('B5', sheldaKdmetBret).kmot),
                mher: (Math.min((((aorkhBrofel || 0) * 2) + (msbarBrofelem || 0)), GetBrtemMotsarMlae('B5', sheldaKdmetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaKdmetBret).alot)
            })
        }
        if (sheldaHetsonetBret === sheldaKdmetBret) {
            setSheldaHetsonet({
                kmot: Math.min(((aorkh * 2) + (rohf * 2)) + ((aorkhBrofel || 0) * 2), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot),
                mher: (Math.min(((aorkh * 2) + (rohf * 2)) + ((aorkhBrofel || 0) * 2), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaKdmetBret).alot)
            })
        }
        if (sheldaHetsonetBret === sheldaBnmetBretA) {
            setSheldaHetsonet({
                kmot: Math.min((((aorkh * 2) + (rohf * 2)) + (msbarBrofelemBretA || 0)), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot),
                mher: (Math.min((((aorkh * 2) + (rohf * 2)) + (msbarBrofelemBretA || 0)), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaKdmetBret).alot)
            })
        }
        if (sheldaHetsonetBret === sheldaBnmetBretB) {
            setSheldaHetsonet({
                kmot: Math.min((((aorkh * 2) + (rohf * 2)) + ((msbarBrofelem || 0) - (msbarBrofelemBretA || 0))), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot),
                mher: (Math.min((((aorkh * 2) + (rohf * 2)) + ((msbarBrofelem || 0) - (msbarBrofelemBretA || 0))), GetBrtemMotsarMlae('B5', sheldaHetsonetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaKdmetBret).alot)
            })
        }
        if (sheldaKdmetBret === sheldaBnmetBretA) {
            setSheldaKdmet({
                kmot: Math.min((((aorkhBrofel || 0) * 2) + (msbarBrofelem || 0)), GetBrtemMotsarMlae('B5', sheldaKdmetBret).kmot),
                mher: (Math.min((((aorkhBrofel || 0) * 2) + (msbarBrofelem || 0)), GetBrtemMotsarMlae('B5', sheldaKdmetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaKdmetBret).alot)
            })
        }
        if (sheldaKdmetBret === sheldaBnmetBretB) {
            console.log(123)
            setSheldaKdmet({
                kmot: Math.min((((aorkhBrofel || 0) * 2) + ((msbarBrofelem || 0) - (msbarBrofelemBretA || 0))), GetBrtemMotsarMlae('B5', sheldaKdmetBret).kmot),
                mher: (Math.min((((aorkhBrofel || 0) * 2) + ((msbarBrofelem || 0) - (msbarBrofelemBretA || 0))), GetBrtemMotsarMlae('B5', sheldaKdmetBret).kmot) * GetBrtemMotsarMlae('B5', sheldaKdmetBret).alot)
            })
        }
        // else if (sheldaBnmetBretA === sheldaBnmetBretB) {
        //     return "sheldaBnmetBretA and sheldaBnmetBretB are equal";
        // } 
        // else {
        //     return "No values are equal";
        // }
        if (!helkBetBnmet) {
            setMsbarBrofelmBretA(msbarBrofelem || 0);
        }
        if (!helkBetBnmet && sheldaBnmetBretB) {
            setSheldaBnmetBretB('בחר פריט');
        }
        // console.log(sheldaKdmet.kmot);
        // if(helkBetBnmet && msbarBrofelem !== msbarBrofelemBretA){
        //     setSheldaKdmet({kmot : sheldaHetsonet.kmot + ((msbarBrofelem || 0) - (msbarBrofelemBretA || 0))})
        // }





    }, [msbarBrofelem, msbarBrofelemBretA, sheldaBnmetBretA, sheldaBnmetBretB, aorkh, rohf, sheldaHetsonetBret, aorkhBrofel, sheldaKdmetBret])
    //i have 4 useState values all one of the have input

    // דלת - B8
    // רמפה - B5

    // קופסא - B5
    // עם דלת - 

    const formatNumber = (number) => {
        const integerPart = Math.floor(number); // Get the integer part of the number
        const fractionalPart = (number % 1).toFixed(2).substring(2); // Get the first two digits after the decimal point
        const formatted = `${integerPart}.${fractionalPart}`; // Concatenate integer and fractional parts
        return parseFloat(formatted);
    };

    const handleInputChange = (setFunc, remez, shem, wich, kmot, maxNumber) => (val) => {
        const newValue = Math.min(val, maxNumber);
        if (wich === 'mher') {
            setFunc({ kmot: kmot, mher: val });
        }
        else {
            const newKmot = newValue;
            const newMher = newValue * parseInt(GetBrtemMotsarMlae(remez, shem).alot);
            setFunc({ kmot: newKmot, mher: newMher });
        }
    };

    const renderDropdown = (shem, options, setShem, isElse) => (
        <Dropdown dir="rtl">
            <DropdownTrigger>
                <Button isDisabled={isElse} size="xs" className='m-2'>
                    {shem}
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
                {options.map((option) => (
                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );

    const renderDropdownWithInputs = (remez, shem, state, setState, options, setShem, shemSog, isElse) => (
        <div>
            <div className="w-fit rounded-xl flex items-center">
                <Avatar size="sm" className="ml-5" />
                <div>{shemSog}</div>
            </div>
            <div className="mt-5 flex justify-around items-center">
                <div className="w-[250px]">{renderDropdown(shem, options, setShem, isElse)}</div>
                <div className="w-[250px] flex items-center">
                    <Input
                        size="sm"
                        isDisabled={shem === 'בחר פריט'}
                        className="max-w-[100px]"
                        color="primary"
                        onValueChange={handleInputChange(setState, remez, shem, 'kmot', null, GetBrtemMotsarMlae(remez, shem).kmot)}
                        value={state.kmot}
                        labelPlacement="outside-left"
                        label="כמות"
                    />
                    {
                        shem !== 'בחר פריט' &&
                        <div className={`text-[13px] mr-2`}>

                            {
                                (((GetBrtemMotsarMlae(remez, shem).kmot) - state.kmot) == 0) ?
                                    <div className="text-white bg-warning pt-1 pb-1 pr-2 pl-2 rounded-3xl">כמות אחרונה</div>
                                    :
                                    (((GetBrtemMotsarMlae(remez, shem).kmot) - state.kmot) < 0) ?
                                        <div className="text-white bg-danger pt-1 pb-1 pr-2 pl-2 rounded-3xl">חסר לא במלאי : {(GetBrtemMotsarMlae(remez, shem).kmot) - state.kmot}</div>
                                        :
                                        <div className="text-white bg-success pt-1 pb-1 pr-2 pl-2 rounded-3xl">נשאר במלאי : {(GetBrtemMotsarMlae(remez, shem).kmot) - state.kmot}</div>
                            }
                        </div>
                    }
                </div>
                <div className="w-[250px]">
                    <Input
                        isReadOnly
                        onValueChange={handleInputChange(setState, remez, shem, 'mher', state.kmot, null)}
                        value={state.mher || 0}
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
    );

    const formatDateToDatetimeLocal = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [constantDate, setConstantDate] = useState('2024-12-25T00:00:00.000Z'); // Default date
    console.log(formatDateToDatetimeLocal(new Date()));

    const addValues = () => {
        // const Props = {
        //     msbar: 0,
        //     mherMkhera: 0,
        //     msbarAgla: 0,
        //     msbarLkoh: 0,
        //     mtsavHmotsarHhdash: 'A',
        //     skhom: 0,
        //     sogBaola: 'A',
        //     zmanThela: '123',
        //     zmanThelatYetsor: '123',
        //     tmher: {
        //         ahozRevah: 0,
        //         hkhnsot: 0,
        //         hotsaotHomreGlem: 0,
        //         hotsaotSkhar: 0,
        //         hotsotAkefot: 0,
        //         maam: 0,
        //         revahYsher: 0,
        //         revhNke: 0,
        //     },
        //     thlkhem: {
        //         hshheatThlekhYetsor: false,
        //         hskmatLkwah: false,
        //         kveatMher: false,
        //         seomThlekhReshion: false,
        //         seomThlekhYetsor: false
        //     },
        //     motsarem: [
        //         {...dofn,dofnShem},
        //         {...bh,}
        //         {...bhHlvsha,}
        //         {...bnsAhore,}
        //         {...bnasKdme,}
        //         {...mhzerAorMshlom,}
        //         {...MhzerAorMlbne,}
        //         {...KabelTaorh,}
        //         {...mgenBots,}
        //         {...mdbekotNegrar,}
        //         {...lohotSemonMhzerAor,}
        //         {...mdbekotHhevra,}
        //         {...mhzektTsmeg,}
        //         {...aomem,}
        //         {...brgem,}
        //         {...serKnaf,}
        //         {...vavKshera,}
        //         {...tbatKshera,}
        //         {...ydetSeger,}
        //         {...ydetAheza,}
        //         {...segrAhron,}
        //         {...shrshert,}
        //         {...KtsevBolearten,}
        //         {...slekon,}
        //         {...gaz,}
        //         {...hotRetokh,}
        //         {...deskHetokh,}
        //         {...tner,}
        //         {...ktefSgneTsrem,}
        //         {...ktefTserAhad,}
        //         {...tser,}
        //         {...tsmeg,}
        //         {...kabelBlamem,}
        //         {...tsmegSberr,}
        //         {...sheldaHetsonet,}
        //         {...sheldaKdmet,}
        //         {...sheldaBnmetA,}
        //         {...sheldaBnmetB,}
        //         {...tseba,}
        //         {...bashbshol,}
        //         {...kafRetom,}
        //         {...mekhalMaym,}
        //         {...argazKlem,}
        //         {...glgalAzer,}
        //         {...reglHnea}
        //     ]
        // }
    }

    return (
        <Modal placement="center" className="test-fontt" backdrop={"blur"} size="full" isOpen={show} onClose={disable}>
            <ModalContent>
                <>
                    <ModalBody className="border-b-2">
                        <div className="fixed inset-0 z-50 overflow-auto bg-whitte bg-opacity-50">
                            <div className="flex justify-center items-center h-full">
                                <div className="w-full h-full flex flex-col">
                                    <ModalHeader className="border-b-2 flex justify-center">ייצור מוצר חדש</ModalHeader>
                                    <div className="w-full h-full flex">
                                        <div className="w-1/3 h-full border-r-4 flex justify-center items-center">
                                            <div className="">
                                                <div>
                                                    <CountdownComponent constantDate={constantDate} />
                                                </div>
                                                <div className="flex justify-center">

                                                    <div className="bg-primary w-[200px] text-center text-white text-xl rounded-2xl">
                                                        תמחיר
                                                    </div>
                                                </div>
                                                <div className="flex justify-center mt-20 mb-3">
                                                    <div className="flex items-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-green-500">הכנסות</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={'23'} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-danger-500">הוצאות חו"ג</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={'23'} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-danger-500">הוצאות שכר</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="danger" value={'23'} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center"><Divider className="w-[200px]" /></div>
                                                <div className="flex justify-center mt-3 mb-3">
                                                    <div className="flex items-center" dir="rtl">
                                                        <div className="ml-5 w-[110px] text-green-500">רווח ישיר</div>
                                                        <Input isReadOnly size="xs" className="w-[100px]" color="success" value={'23'} />
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
                                        <div className="w-full h-full flex flex-col">
                                            <div className="w-full h-1/3 min-h-[230px] border-b-4">
                                                <div dir="rtl" className="h-full flex justify-around items-center">
                                                    <div>
                                                        <div>
                                                            <Dropdown dir="rtl">
                                                                <DropdownTrigger>
                                                                    <Button
                                                                        size="lg"
                                                                        className='mb-4 mt-4'
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
                                                                    onSelectionChange={(val) => { setSogAska(val) }}
                                                                >
                                                                    <DropdownItem key="ייצור">ייצור</DropdownItem>
                                                                    <DropdownItem key="תיקון">תיקון</DropdownItem>
                                                                    <DropdownItem key="טסט">טסט</DropdownItem>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </div>
                                                        <div>
                                                            <Autocomplete
                                                                bordered
                                                                fullWidth
                                                                label="בחר לקוח"
                                                                className="max-w-[200px]"
                                                                color="primary"
                                                                defaultItems={lkhot}
                                                                allowsCustomValue={true}
                                                                onSelectionChange={setLkoh}
                                                                onInputChange={setLkoh}
                                                            >
                                                                <AutocompleteItem className='text-right' onClick={() => setShowModalAddSbak(true)}>הוספה</AutocompleteItem>
                                                                {
                                                                    lkhot.map((lko, index) => (
                                                                        <AutocompleteItem className='text-right' key={lko?.name} value={lko?.name}>
                                                                            {lko?.name}
                                                                        </AutocompleteItem>
                                                                    ))
                                                                }
                                                            </Autocomplete>
                                                        </div>
                                                        <div>
                                                            <Autocomplete
                                                                bordered
                                                                fullWidth
                                                                label="מספר עגלה"
                                                                className="max-w-[200px] mt-4"
                                                                color="primary"
                                                                defaultItems={aglot}
                                                                allowsCustomValue={true}
                                                                onSelectionChange={setLkoh}
                                                                onInputChange={setLkoh}
                                                            >
                                                                <AutocompleteItem className='text-right' onClick={() => setShowModalAddSbak(true)}>הוספה</AutocompleteItem>
                                                                {
                                                                    aglot.map((agla, index) => (
                                                                        <AutocompleteItem className='text-right' key={agla?.name} value={agla?.name}>
                                                                            {agla?.name}
                                                                        </AutocompleteItem>
                                                                    ))
                                                                }
                                                            </Autocomplete>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="mt-2">
                                                            <Switch>
                                                                <div className="mr-2">הסכמת לקוח</div>
                                                            </Switch>
                                                        </div>
                                                        <div className="mt-2">
                                                            <Switch>
                                                                <div className="mr-2">תחילת ייצור</div>
                                                            </Switch>
                                                        </div>
                                                        <div className="mt-2">
                                                            <Switch>
                                                                <div className="mr-2">השהיית ייצור</div>
                                                            </Switch>
                                                        </div>
                                                        <div className="mt-2">
                                                            <Switch>
                                                                <div className="mr-2">סיום יצור</div>
                                                            </Switch>
                                                        </div>
                                                        <div className="mt-2">
                                                            <Switch>
                                                                <div className="mr-2">סיום רישיון</div>
                                                            </Switch>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="">
                                                            <div className="w-[170px] bg-gray-300 p-3 rounded-t-xl flex justify-center">
                                                                <div className="items-center flex">
                                                                    <div>זמן יצור</div>
                                                                    <MdOutlineTimer className="mr-2 text-2xl" />
                                                                </div>
                                                            </div>
                                                            <div className="w-[170px] text-center bg-danger-200 p-3">
                                                                זמן מינמאלי 08:00
                                                            </div>
                                                            <div className="w-[170px] text-center bg-primary-200 p-3 rounded-b-xl">
                                                                זמן ייצור 00:00
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <div className="flex items-center">
                                                                <div className="min-w-[100px]">מחיר כללי</div>
                                                                <Input color="primary" className="max-w-[150px]" />
                                                            </div>
                                                            <div className="mt-4 mb-4 flex justify-center">
                                                                <Switch>
                                                                    <div className="mr-2">קביעת מחיר</div>
                                                                </Switch>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <div className="min-w-[100px]">שעות עבודה</div>
                                                                <Input color="primary" className="max-w-[150px]" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full h-2/3 flex">
                                                <div className="w-full h-full max-h-[900px] overflow-auto border-r-4 p-5">
                                                    <div dir="rtl">
                                                        {
                                                            aorkh && rohf &&
                                                            <>
                                                                {renderDropdownWithInputs('B7', dofnShem, dofn, setDofn, GetBrtemMotsarMlae('B7').arrayResualt, setDofnShem, Names[0], false)}
                                                                {renderDropdownWithInputs('B1', bhShem, bh, setBh, GetBrtemMotsarMlae('B1').arrayResualt, setBhShem, Names[1], false)}
                                                                {renderDropdownWithInputs('B2', bhHlvshaShem, bhHlvsha, setBhHlvshsa, GetBrtemMotsarMlae('B2').arrayResualt, setBhHlvshsaShem, Names[2], false)}
                                                                {renderDropdownWithInputs('F4', bnsAhoreShem, bnsAhore, setBnasAhore, GetBrtemMotsarMlae('F4').arrayResualt, setBnsAhoreShem, Names[3], false)}
                                                                {renderDropdownWithInputs('F5', bnasKdmeShem, bnasKdme, setBnasKdme, GetBrtemMotsarMlae('F5').arrayResualt, setBnasKdmeShem, Names[4], false)}
                                                                {renderDropdownWithInputs('F6', mhzerAorMshlomShem, mhzerAorMshlom, setMhzerAorMshlom, GetBrtemMotsarMlae('F6').arrayResualt, setMhzerAorMshlomShem, Names[5], false)}
                                                                {renderDropdownWithInputs('F7', MhzerAorMlbneShem, MhzerAorMlbne, setMhzerAorMlbne, GetBrtemMotsarMlae('F7').arrayResualt, setMhzerAorMlbneShem, Names[6], false)}
                                                                {renderDropdownWithInputs('F3', kabelTaorhShem, KabelTaorh, setKabelTaorh, GetBrtemMotsarMlae('F3').arrayResualt, setKabelTaorhShem, Names[7], false)}
                                                                {renderDropdownWithInputs('E1', MgenBotsShem, mgenBots, setMgenBots, GetBrtemMotsarMlae('E1').arrayResualt, setMgenBotsShem, Names[8], false)}
                                                                {renderDropdownWithInputs('E2', mdbekotNegrarShem, mdbekotNegrar, setMdbekotNegrar, GetBrtemMotsarMlae('E2').arrayResualt, setMdbekotNegrarShem, Names[9], false)}
                                                                {renderDropdownWithInputs('E3', lohotSemonMhzerAorShem, lohotSemonMhzerAor, setLohotSemonMhzerAor, GetBrtemMotsarMlae('E3').arrayResualt, setLohotSemonMhzerAorShem, Names[10], false)}
                                                                {renderDropdownWithInputs('E4', mdbekotHhevraShem, mdbekotHhevra, setMdbekotHhevra, GetBrtemMotsarMlae('E4').arrayResualt, setMdbekotHhevraShem, Names[11], false)}
                                                                {renderDropdownWithInputs('C1', mhzektTsmegShem, mhzektTsmeg, setMhzektTsmeg, GetBrtemMotsarMlae('C1').arrayResualt, setMhzektTsmegShem, Names[12], false)}
                                                                {renderDropdownWithInputs('C2', aomemShem, aomem, setAomem, GetBrtemMotsarMlae('C2').arrayResualt, setAomemShem, Names[13], false)}
                                                                {renderDropdownWithInputs('C3', brgemShem, brgem, setBrgem, GetBrtemMotsarMlae('C3').arrayResualt, setBrgemShem, Names[14], false)}
                                                                {renderDropdownWithInputs('C4', serKnafShem, serKnaf, setSerKnaf, GetBrtemMotsarMlae('C4').arrayResualt, setSerKnafShem, Names[15], false)}
                                                                {renderDropdownWithInputs('C5', vavKsheraShem, vavKshera, setVavKshera, GetBrtemMotsarMlae('C5').arrayResualt, setVavKsheraShem, Names[16], false)}
                                                                {renderDropdownWithInputs('C6', tbatKsheraShem, tbatKshera, setTbatKshera, GetBrtemMotsarMlae('C6').arrayResualt, setTbatKsheraShem, Names[17], false)}
                                                                {renderDropdownWithInputs('C7', ydetSegerShem, ydetSeger, setYdetSeger, GetBrtemMotsarMlae('C7').arrayResualt, setYdetSegerShem, Names[18], false)}
                                                                {renderDropdownWithInputs('C8', ydetAhezaShem, ydetAheza, setYdetAheza, GetBrtemMotsarMlae('C8').arrayResualt, setYdetAhezaShem, Names[19], false)}
                                                                {renderDropdownWithInputs('C10', segrAhronShem, segrAhron, setSegrAhron, GetBrtemMotsarMlae('C10').arrayResualt, setSegrAhronShem, Names[20], divRefs.current[2], false)}
                                                                {renderDropdownWithInputs('C11', shrshertShem, shrshert, setShrshert, GetBrtemMotsarMlae('C11').arrayResualt, setShrshertShem, Names[21], false)}
                                                                {renderDropdownWithInputs('G1', KtsevBoleartenShem, KtsevBolearten, setktsevBolearten, GetBrtemMotsarMlae('G1').arrayResualt, setktsevBoleartenShem, Names[22], false)}
                                                                {renderDropdownWithInputs('G2', slekonShem, slekon, setSlekon, GetBrtemMotsarMlae('G2').arrayResualt, setSlekonShem, Names[23], false)}
                                                                {renderDropdownWithInputs('G3', gazShem, gaz, setGaz, GetBrtemMotsarMlae('G3').arrayResualt, setGazShem, Names[24], false)}
                                                                {renderDropdownWithInputs('G4', hotRetokhShem, hotRetokh, setHotRetokh, GetBrtemMotsarMlae('G4').arrayResualt, setHotRetokhShem, Names[25], false)}
                                                                {renderDropdownWithInputs('G5', deskHetokhShem, deskHetokh, setDeskHetokh, GetBrtemMotsarMlae('G5').arrayResualt, setDeskHetokhShem, Names[26], false)}
                                                                {renderDropdownWithInputs('G6', tnerShem, tner, setTner, GetBrtemMotsarMlae('G6').arrayResualt, setTnerShem, Names[27], false)}
                                                            </>
                                                        }
                                                        {
                                                            msbarTsrem === '1' &&
                                                            <>
                                                                {renderDropdownWithInputs('A1', ktefTserAhadShem, ktefTserAhad, setktefTserAhad, GetBrtemMotsarMlae('A1').arrayResualt, setktefTserAhadShem, NamesX3[0], false)}
                                                                {renderDropdownWithInputs('A10', tserShem, tser, setTser, GetBrtemMotsarMlae('A10').arrayResualt, setTserShem, NamesX3[1], false)}
                                                                {renderDropdownWithInputs('A3', tsmegShem, tsmeg, setTsmeg, GetBrtemMotsarMlae('A3').arrayResualt, setTsmegShem, NamesX3[2], false)}
                                                            </>
                                                        }
                                                        {
                                                            msbarTsrem === '2' &&
                                                            <>
                                                                {renderDropdownWithInputs('A2', ktefSgneTsremShem, ktefSgneTsrem, setKtefSgneTsrem, GetBrtemMotsarMlae('A2').arrayResualt, setKtefSgneTsremShem, NamesX3[3], false)}
                                                                {renderDropdownWithInputs('A10', tserShem, tser, setTser, GetBrtemMotsarMlae('A10').arrayResualt, setTserShem, NamesX3[1], false)}
                                                                {renderDropdownWithInputs('A3', tsmegShem, tsmeg, setTsmeg, GetBrtemMotsarMlae('A3').arrayResualt, setTsmegShem, NamesX3[2], false)}
                                                            </>
                                                        }
                                                        {
                                                            msbarTsrem && aemBlamem &&
                                                            renderDropdownWithInputs('F2', kabelBlamemShem, kabelBlamem, setKabelBlamem, GetBrtemMotsarMlae('F2').arrayResualt, setKabelBlamemShem, NamesX3[4], false)
                                                        }
                                                        {
                                                            msbarTsrem && tsmegSber &&
                                                            renderDropdownWithInputs('C1', tsmegSberShem, tsmegSberr, setTsmegSberr, GetBrtemMotsarMlae('C1').arrayResualt, setTsmegSberShem, NamesX3[5], false)
                                                        }
                                                        {
                                                            aorkh && rohf && (sheldaHetsonetBret !== 'בחר פריט') &&
                                                            renderDropdownWithInputs('B5', sheldaHetsonetBret, sheldaHetsonet, setSheldaHetsonet, GetBrtemMotsarMlae('B5').arrayResualt, null, NamesX5[0], true)
                                                        }
                                                        {
                                                            aorkh && rohf && (sheldaHetsonetBret !== sheldaKdmetBret && sheldaKdmetBret !== 'בחר פריט') &&
                                                            renderDropdownWithInputs('B5', sheldaKdmetBret, sheldaKdmet, setSheldaKdmet, GetBrtemMotsarMlae('B5').arrayResualt, null, NamesX5[0], true)
                                                        }
                                                        {
                                                            (sheldaBnmetBretA !== 'בחר פריט') && (sheldaBnmetBretA !== sheldaHetsonetBret) && (sheldaBnmetBretA !== sheldaKdmetBret) &&
                                                            renderDropdownWithInputs('B5', sheldaBnmetBretA, sheldaBnmetA, setSheldaBnmetA, GetBrtemMotsarMlae('B5').arrayResualt, null, NamesX5[0], true)
                                                        }
                                                        {
                                                            (sheldaBnmetBretB !== 'בחר פריט') && (sheldaBnmetBretB !== sheldaKdmetBret) && (sheldaBnmetBretB !== sheldaHetsonetBret) && (sheldaBnmetBretB !== sheldaBnmetBretA) &&
                                                            renderDropdownWithInputs('B5', sheldaBnmetBretB, sheldaBnmetB, setSheldaBnmetB, GetBrtemMotsarMlae('B5').arrayResualt, null, NamesX5[0], true)
                                                        }
                                                        {
                                                            aemTseba &&
                                                            renderDropdownWithInputs('D1', tsebaBret, tseba, setTseba, GetBrtemMotsarMlae('D1').arrayResualt, null, NamesX5[1], true)
                                                        }
                                                        {
                                                            aemKafRetom &&
                                                            renderDropdownWithInputs('A4', kafRetomShem, kafRetom, setKafRetom, GetBrtemMotsarMlae('A4').arrayResualt, setKafRetomShem, NamesX5[2], false)
                                                        }
                                                        {
                                                            aemBashbashol &&
                                                            renderDropdownWithInputs('A5', bashbsholShem, bashbshol, setBashbshol, GetBrtemMotsarMlae('A5').arrayResualt, setBashbsholShem, NamesX5[3], false)
                                                        }
                                                        {
                                                            aemMekhalMaym &&
                                                            renderDropdownWithInputs('A6', mekhalMaymShem, mekhalMaym, setMekhalMaym, GetBrtemMotsarMlae('A6').arrayResualt, setMekhalMaymShem, NamesX5[4], false)
                                                        }
                                                        {
                                                            aemArgazKlem &&
                                                            renderDropdownWithInputs('A7', argazKlemShem, argazKlem, setArgazKlem, GetBrtemMotsarMlae('A7').arrayResualt, setArgazKlemShem, NamesX5[5], false)
                                                        }
                                                        {
                                                            aemGlgalAzer &&
                                                            renderDropdownWithInputs('A8', glgalAzerShem, glgalAzer, setGlgalAzer, GetBrtemMotsarMlae('A8').arrayResualt, setGlgalAzerShem, NamesX5[6], false)
                                                        }
                                                        {
                                                            aemReglHnea &&
                                                            renderDropdownWithInputs('A9', reglHneaShem, reglHnea, setReglHnea, GetBrtemMotsarMlae('A9').arrayResualt, setReglHneaShem, NamesX5[7], false)
                                                        }
                                                    </div>
                                                </div>
                                                <div className="w-full max-w-[600px] h-full max-h-[900px] overflow-auto p-5">
                                                    <div dir="rtl">
                                                        <table className="h-full">
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
                                                                    <th><Switch value={aemBlamem} onValueChange={(val) => setAemBlamem(val)}><div className="mr-3">עם בולמים</div></Switch></th>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan={4}><Divider /></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th><Avatar /></th>
                                                                    <th>צמיג</th>
                                                                    <th><Switch value={tsmegSber} onValueChange={(val) => setTsmegSber(val)}><div>צמיג ספר</div></Switch></th>
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
                                                                                {sheldaHetsonetBret}
                                                                            </Button>
                                                                        </DropdownTrigger>
                                                                        <DropdownMenu
                                                                            aria-label="Multiple selection example"
                                                                            variant="flat"
                                                                            closeOnSelect={true}
                                                                            disallowEmptySelection
                                                                            selectionMode="single"
                                                                            selectedKeys={sheldaHetsonetBret}
                                                                            onSelectionChange={(val) => setSheldaHetsonetBret(val.currentKey)}
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
                                                                    <th><Input isReadOnly={sheldaHetsonetBret === 'בחר פריט'} type="number" value={aorkhBrofel} onValueChange={(val) => { setAorkhBrofel(parseFloat(val)); }} color="primary" size="sm" className="w-[100px]" label="אורך פרופיל" /></th>
                                                                    <th><Dropdown dir="rtl">
                                                                        <DropdownTrigger>
                                                                            <Button isDisabled={!aorkhBrofel} size="xs" className='m-2'>
                                                                                {sheldaKdmetBret}
                                                                            </Button>
                                                                        </DropdownTrigger>
                                                                        <DropdownMenu
                                                                            aria-label="Multiple selection example"
                                                                            variant="flat"
                                                                            closeOnSelect={true}
                                                                            disallowEmptySelection
                                                                            selectionMode="single"
                                                                            selectedKeys={sheldaKdmetBret}
                                                                            onSelectionChange={(val) => setSheldaKdmetBret(val.currentKey)}
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
                                                                    <th><Input isReadOnly={!aorkh || !rohf} type="number" value={tvahBrofel} onValueChange={(val) => { setTvahBrofel(val); setMsbarBrofelem(parseInt(Math.round((aorkh / (val / 100)) - 2))) }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
                                                                    <th><Input isReadOnly={!aorkh || !rohf} type="number" value={msbarBrofelem} onValueChange={(val) => { setMsbarBrofelem(parseInt(val)); setTvahBrofel(formatNumber(((aorkh / (parseFloat(val) + 2)) * 100))); }} color="primary" size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th>חלק א</th>
                                                                    <th><Dropdown dir="rtl">
                                                                        <DropdownTrigger>
                                                                            <Button isDisabled={!tvahBrofel || !msbarBrofelem} size="xs" className='m-2'>
                                                                                {sheldaBnmetBretA}
                                                                            </Button>
                                                                        </DropdownTrigger>
                                                                        <DropdownMenu
                                                                            aria-label="Multiple selection example"
                                                                            variant="flat"
                                                                            closeOnSelect={true}
                                                                            disallowEmptySelection
                                                                            selectionMode="single"
                                                                            selectedKeys={sheldaBnmetBretA}
                                                                            onSelectionChange={(val) => setSheldaBnmetBretA(val.currentKey)}
                                                                        >
                                                                            {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                            ))}
                                                                        </DropdownMenu>
                                                                    </Dropdown></th>
                                                                    <th><Input isReadOnly={helkBetBnmet ? false : true} value={helkBetBnmet ? msbarBrofelemBretA : (msbarBrofelem || 0)} onValueChange={(val) => setMsbarBrofelmBretA(Math.min(val, msbarBrofelem))} color="primary" size="sm" className="w-[100px]" label="מס פרופילים" /></th>
                                                                    <th><Switch value={helkBetBnmet} onValueChange={(val) => setHelkBetBnmet(val)}><div className="mr-2"><FaPlus /></div></Switch></th>
                                                                </tr>
                                                                {
                                                                    helkBetBnmet &&
                                                                    <tr className="row-spacing">
                                                                        <th>חלק ב</th>
                                                                        <th><Dropdown dir="rtl">
                                                                            <DropdownTrigger>
                                                                                <Button isDisabled={sheldaBnmetBretA === 'בחר פריט' || !msbarBrofelemBretA} size="xs" className='m-2'>
                                                                                    {sheldaBnmetBretB}
                                                                                </Button>
                                                                            </DropdownTrigger>
                                                                            <DropdownMenu
                                                                                aria-label="Multiple selection example"
                                                                                variant="flat"
                                                                                closeOnSelect={true}
                                                                                disallowEmptySelection
                                                                                selectionMode="single"
                                                                                selectedKeys={sheldaBnmetBretB}
                                                                                onSelectionChange={(val) => setSheldaBnmetBretB(val.currentKey)}
                                                                            >
                                                                                {GetBrtemMotsarMlae('B5').arrayResualt.map((option) => (
                                                                                    <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                                                                ))}
                                                                            </DropdownMenu>
                                                                        </Dropdown></th>
                                                                        <th><Input value={msbarBrofelem - msbarBrofelemBretA} isReadOnly color="primary" size="sm" className="w-[100px]" label="מס פרופילים" /></th>
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
                                                                    <th><Switch value={aemTseba} onValueChange={(val) => setAemTseba(val)}><div className="mr-3"></div></Switch></th>
                                                                    <th><Dropdown dir="rtl">
                                                                        <DropdownTrigger>
                                                                            <Button isDisabled={!aemTseba} size="xs" className='m-2'>
                                                                                {tsebaBret}
                                                                            </Button>
                                                                        </DropdownTrigger>
                                                                        <DropdownMenu
                                                                            aria-label="Multiple selection example"
                                                                            variant="flat"
                                                                            closeOnSelect={true}
                                                                            disallowEmptySelection
                                                                            selectionMode="single"
                                                                            selectedKeys={tsebaBret}
                                                                            onSelectionChange={(val) => setTsebaBret(val.currentKey)}
                                                                        >
                                                                            {GetBrtemMotsarMlae('D1').arrayResualt.map((option) => (
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
                                                                    <th>פשפשול</th>
                                                                    <th><Switch isReadOnly={aemKafRetom} value={aemBashbashol} onValueChange={(val) => { setAemBashbashol(val) }}></Switch></th>
                                                                    <th></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th><Avatar /></th>
                                                                    <th>כף ריתום</th>
                                                                    <th><Switch isReadOnly={aemBashbashol} value={aemKafRetom} onValueChange={(val) => { setAemKafRetom(val) }}></Switch></th>
                                                                    <th></th>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan={4}><Divider /></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th><Avatar /></th>
                                                                    <th>מיכל מים</th>
                                                                    <th><Switch value={aemMekhalMaym} onValueChange={(val) => setAemMekhalMaym(val)}></Switch></th>
                                                                    <th></th>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan={4}><Divider /></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th><Avatar /></th>
                                                                    <th>ארגז כלים</th>
                                                                    <th><Switch value={aemArgazKlem} onValueChange={(val) => setAemArgazKlem(val)}></Switch></th>
                                                                    <th></th>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan={4}><Divider /></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th><Avatar /></th>
                                                                    <th>גלגל עזר</th>
                                                                    <th><Switch value={aemGlgalAzer} onValueChange={(val) => setAemGlgalAzer(val)}></Switch></th>
                                                                    <th></th>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan={4}><Divider /></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th><Avatar /></th>
                                                                    <th>רגל חנייה</th>
                                                                    <th><Switch value={aemReglHnea} onValueChange={(val) => setAemReglHnea(val)}></Switch></th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                    </div>




                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ModalFooter className="border-t-2">
                                        <Button size="lg" color="primary" variant="bordered" onClick={disable}>
                                            סגור
                                        </Button>
                                        <Button size="lg" color="primary" onClick={addValues}>
                                            להתקדם
                                        </Button>
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