'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Card, CardBody, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch, Tooltip } from "@nextui-org/react";
import { useGetDataByCondition } from "../FireBase/getDataByCondition";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../FireBase/firebase";
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
import rep80 from '../../images/rep80.png';
import rep81 from '../../images/rep81.png';
import GetDocs from "../FireBase/getDocs";
import ContactContext from "../auth/ContactContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { GetTmonatHelek } from "../page";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";

export default function ModalTokhnetYetsor({ show, disable,mlae,category }) {

    const [loading,setLoading] = useState(false);
    const counter = GetDocs('metadata').find((count) => count.id === 'counterTokhnetYetsorAgla');
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
    const [shemTokhnet, setShemTokhnet] = useState('');
    const [sogAgla, setSogAgla] = useState('פתוחה');
    const [sogGlgalem, setSogGlgalem] = useState('');
    const [msbarTsrem, setMsbarTsrem] = useState('');
    const [hlokaTvah, setHlokaTvah] = useState(0);
    const [aemBlamem, setAemBlamem] = useState(false);
    const [tosftVnel, setTosftVnel] = useState(false);
    const [tsmegSber, setTsmegSber] = useState(false);
    const [tvahHlokatRmba, setTvahHlokatRmba] = useState(0);
    const [aorkhBrofel, setAorkhBrofel] = useState(0);
    const [aemTseba, setAemTseba] = useState(false);
    const [aemBashbashol, setAemBashbashol] = useState(false);
    const [aemKafRetom, setAemKafRetom] = useState(false);
    const [aemMekhalMaym, setAemMekhalMaym] = useState(false);
    const [aemArgazKlem, setAemArgazKlem] = useState(false);
    const [aemReglHnea, setAemReglHnea] = useState(false);
    const [tvahBrofel, setTvahBrofel] = useState('');
    const [solam, setSolam] = useState('');
    const [aemDelet, setAemDelet] = useState(false);
    const [tosefetReshet, setTosefetReshet] = useState(false);
    const [tvahAofkeSolam, setTvahAofkeSolam] = useState(0);
    const [tvahAnkheSolam, setTvahAnkheSolam] = useState(0);
    const [helkBetBnmet, setHelkBetBnmet] = useState(false);
    const [aemRmbaAoRgel, setAemRmbaAoRgel] = useState('');
    const [mafenemMotsarem, setMafenemMotsarem] = useState([]);
    const [motsaremBrofelemSofe, setMotsaremBrofelemSofe] = useState([]);
    const [motsaremLhatseg, setMotsaremLhatseg] = useState([]);
    const [sogBaola, setSogBaola] = useState('');
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
    ]);


    
    const ResetAll = () => {
        const initialMafenemMotsarem = Remzem.map(remez => ({
            kmot: 0,
            mher: 0,
            shem: '',
            remez: remez,
            message: ''
        }));
        setShemTokhnet('');
        setMafenemMotsarem(initialMafenemMotsarem);
        setMsbarTsrem('');
        setHlokaTvah(0);
        setAemBlamem(false);
        setTsmegSber(false);
        setAorkhBrofel(0);
        setAorkhBrofel(0);
        setTosftVnel(false);
        setTvahHlokatRmba(0);
        setAemTseba(false);
        setAemBashbashol(false);
        setAemKafRetom(false);
        setAemMekhalMaym(false);
        setAemArgazKlem(false);
        setAemReglHnea(false);
        setTvahBrofel('');
        setHelkBetBnmet(false);
        setAemRmbaAoRgel('');
        setMotsaremBrofelemSofe([]);
        setMotsaremLhatseg([]);
        setSogBaola('');
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
    const reduceArray = () => {
        1
        const combinedItems = {};
        motsaremBrofelem?.forEach(item => {
            if (item.shem === 'בחר פריט') return;
            if (combinedItems[item.shem] && combinedItems[item.shem].kmotYdnet === 0) {
                combinedItems[item.shem].kmot += item.kmot;
                combinedItems[item.shem].kmotYdnet += item.kmotYdnet;
                combinedItems[item.shem].mher += parseFloat((item?.mher)?.toFixed(1));
            } else {
                combinedItems[item.shem] = { ...item };
            }
        });
        return Object.values(combinedItems);
    }
    const Remzem = useMemo(() => {
        let newArray = [];
        for (let index = 0; index < category.length; index++) {
            for (let index1 = 0; index1 < category[index].motsarem.length; index1++) {
                newArray.push(category[index].motsarem[index1].sog);
            }
        }
        return newArray.sort();
    }, [category]);
    const checkAemRemezMataem = useCallback((val) => {
        for (let index = 0; index < motsaremLhatseg.length; index++) {
            if (motsaremLhatseg[index] === val) {
                return true;
            }
        }
        return false;
    }, [motsaremLhatseg]);
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
                    const newMafenemMotsarem = [...prevMafenemMotsarem];
                    const updatedItem = { ...newMafenemMotsarem[index], [name]: name === 'kmot' || name === 'mher' ? parseInt(value) : value };
                    newMafenemMotsarem[index] = updatedItem;
                    return newMafenemMotsarem;
                });
            }
        },
        [mafenemMotsarem, motsaremBrofelemSofe] // was setMafenemMotsarem
    );
    const MotsaremRefs = useRef(Array(51).fill(null).map(() => React.createRef()));
    const renderDropdownWithInputs = useCallback((item, shemSog, index, isElse) => (
        <div className="w-full">
            <div className="mt-5 w-full">
                <div className="w-full items-center flex justify-center">
                    <div className="w-[200px] rounded-xl flex items-center">
                        <div className="group relative z-20">
                            <Image width={70} alt="none" src={GetTmonatHelek(item?.remez)} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                        </div>
                        <div className="mr-2">{shemSog}</div>
                    </div>
                    <div className="flex items-center">
                        <Input
                            type="number"
                            size="sm"
                            className="max-w-[100px]"
                            color='primary'
                            onValueChange={(val) => handleInputChange(isElse, index, val, 'kmot')}
                            value={item?.kmot || ""}
                            label="כמות"
                        />
                    </div>
                </div>

                <div className="w-full flex justify-between items-center flex-wrap mt-2 pr-4 pl-4">
                    <div className="max-w-[400px] w-full flex items-center">

                    </div>
                </div>

            </div>
        </div>
    ), [GetBrtemMotsarMlae]);
    useEffect(() => {
        motsaremBrofelem && setMotsaremBrofelemSofe(reduceArray(true));
    }, [motsaremBrofelem]);
    useEffect(() => {
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
        if (sogAgla) {
            setMotsaremLhatseg((prevItems) => [
                ...prevItems,
                'F4', 'F5', 'F6', 'F7', 'F3',
                'E1', 'E2', 'E3', 'E4', 'C2', 'C3', 'C4', 'C5',
                'C6', 'C7', 'C8', 'C10', 'G1', 'G2', 'G3', 'G4',
                'G5', 'G6', 'A8'
            ]);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => ![
                'F4', 'F5', 'F6', 'F7', 'F3',
                'E1', 'E2', 'E3', 'E4', 'C2', 'C3', 'C4', 'C5',
                'C6', 'C7', 'C8', 'C10', 'G1', 'G2', 'G3', 'G4',
                'G5', 'G6', 'A8'
            ].includes(item)));
        }
    }, [sogAgla]);



    useEffect(() => {
        if (aemTseba) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'D1']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'D1'));
        }
    }, [aemTseba]);

    useEffect(() => {
        if (aemReglHnea) {
            setMotsaremLhatseg((prevItems) => [...prevItems, 'A9']);
        }
        else {
            setMotsaremLhatseg((prevItems) => prevItems.filter(item => item !== 'A9'));
        }
    }, [aemReglHnea]);


    const shmeratTokhnet = async () => {
        setLoading(true);
        let newArrayMotsarem = [];
        for (let index = 0; index < mafenemMotsarem.length; index++) {
            if (mafenemMotsarem[index].kmot !== 0) {
                newArrayMotsarem.push({
                    kmot: mafenemMotsarem[index].kmot,
                    remez: mafenemMotsarem[index].remez
                })
            }
        }
        await addDoc(collection(firestore, 'TokhnetYetsorAgla'), {
            sogAgla,
            msbar: counter?.count,
            shem: shemTokhnet,
            motsarem: newArrayMotsarem,
            mafenem: {
                tvahAofkeSolam : parseFloat(tvahAofkeSolam),
                tvahAnkheSolam :  parseFloat(tvahAnkheSolam),
                tosefetReshet,
                aemDelet,
                solam,
                tosftVnel,
                tvahHlokatRmba:  parseFloat(tvahHlokatRmba),
                hlokaTvah:  parseFloat(hlokaTvah),
                sogGlgalem: sogGlgalem,
                msbarTsrem: parseFloat(msbarTsrem) || '',
                aemBlamem: aemBlamem,
                tsmegSber: tsmegSber,
                aorkhBrofel: aorkhBrofel,
                tvahBrofel:  parseFloat(tvahBrofel),
                helkBetBnmet: helkBetBnmet,
                aemRmbaAoRgel: aemRmbaAoRgel,
                aemTseba: aemTseba,
                aemBashbashol: aemBashbashol,
                aemKafRetom: aemKafRetom,
                aemMekhalMaym: aemMekhalMaym,
                aemArgazKlem: aemArgazKlem,
                aemReglHnea: aemReglHnea
            },
        });
        await updateDoc(doc(firestore, 'metadata', 'counterTokhnetYetsorAgla'), {
            count: counter?.count + 1
        });
        ResetAll();
        setLoading(false);
    }

    return (
        <Modal placement="center" className="test-fontt w-full max-w-[1500px]" backdrop={"blur"} size="5xl" isOpen={show} onClose={() => {ResetAll(); disable();}}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">הוספת תוכנית ייצור עגלה</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div>
                            <div className="m-5" dir="rtl">
                                <Input value={shemTokhnet} onValueChange={(val) => setShemTokhnet(val)} type="text" color="primary" className="max-w-[200px]" label="שם תוכנית"/>
                            </div>
                            <div dir="rtl" className="flex items-center">
                                <div className="w-full h-[600px] overflow-y-scroll">
                                    <div className="w-full bg-gradient-to-r from-gray-300 to-gray-700 text-center p-4 rounded-full sticky top-0 z-50 tracking-wider text-white font-bold text-xl">
                                        תוכנית יצור
                                    </div>
                                    {
                                        motsaremBrofelem && <table className="h-full">
                                            <thead>
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
                                                {
                                                    sogAgla === 'פתוחה' ?
                                                        <>
                                                            <>
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
                                                                        }
                                                                    }} className="flex"><div className="flex mr-5"><Radio value="1">1</Radio><Radio value="2">2</Radio></div></RadioGroup></th>
                                                                    <th><Switch isSelected={aemBlamem} value={aemBlamem} onValueChange={(val) => {
                                                                        let res = (val === false) && (parseInt(msbarTsrem) === 2) ? true : val;
                                                                        setAemBlamem(res);
                                                                    }}><div className="mr-3">עם בולמים</div></Switch></th>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan={4}><Divider /></th>
                                                                </tr>
                                                            </>
                                                            <>
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
                                                                            setHlokaTvah(0);
                                                                        }
                                                                    }} className="flex"><div className="flex mr-5"><Radio value="פנמיים">פנימיים</Radio><Radio value="חצוניים">חצוניים</Radio></div></RadioGroup></th>
                                                                    <th><Switch value={tsmegSber} onValueChange={(val) => {
                                                                        setTsmegSber(val);
                                                                    }}><div>צמיג ספר</div></Switch></th>
                                                                </tr>
                                                                {
                                                                    sogGlgalem === 'פנמיים' &&
                                                                    <>
                                                                        <tr className="row-spacing">
                                                                            <th>חלוקה תחתונה</th>
                                                                            <th></th>
                                                                            <th><Input type="number" value={hlokaTvah || ''} onValueChange={(val) => { setHlokaTvah(val); }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
                                                                            <th></th>
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

                                                                    }} color="primary" size="sm" className="w-[100px]" label="אורך פרופיל" /></th>
                                                                    <th></th>
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
                                                                    <th><Input type="number" value={tvahBrofel || ''} onValueChange={(val) => {
                                                                        setTvahBrofel(val);
                                                                    }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
                                                                    <th></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th>חלק א</th>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th><Switch value={helkBetBnmet} onValueChange={(val) => {
                                                                        setHelkBetBnmet(val);
                                                                    }}><div className="mr-2"><FaPlus /></div></Switch></th>
                                                                </tr>
                                                                {
                                                                    helkBetBnmet &&
                                                                    <tr className="row-spacing">
                                                                        <th>חלק ב</th>
                                                                        <th></th>
                                                                        <th></th>
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
                                                                            setTvahHlokatRmba(0);
                                                                            setTosftVnel(false);
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
                                                                            <th>חלוקת רמפה</th>
                                                                            <th><Input type="number" value={tvahHlokatRmba || ''} onValueChange={(val) => { setTvahHlokatRmba(val); }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
                                                                            <th></th>
                                                                            <th></th>
                                                                        </tr>
                                                                        <tr className="row-spacing">
                                                                            <th>תוספת וניל</th>
                                                                            <th><div className="flex justify-start">
                                                                                <Switch value={tosftVnel} onValueChange={(val) => {
                                                                                    setTosftVnel(val);
                                                                                }}></Switch></div></th>
                                                                            <th></th>
                                                                            <th></th>
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
                                                                        setAemDelet(false);
                                                                        setTosefetReshet(false);
                                                                        setTvahAnkheSolam(0);
                                                                        setTvahAofkeSolam(0);
                                                                    }} className="flex"><div className="flex mr-5 w-[150px]"><Radio value="רק קדמי">רק קדמי</Radio><Radio value="הכל">הכל</Radio></div></RadioGroup></th>
                                                                    {
                                                                        solam === 'הכל' &&
                                                                        <>
                                                                            <th><Switch isReadOnly={aemRmbaAoRgel === 'רמפה'} value={aemDelet} onValueChange={(val) => {
                                                                                setAemDelet(val);
                                                                            }}><div className="mr-3">עם דלת עליון</div></Switch></th>
                                                                            <th><Switch value={tosefetReshet} onValueChange={(val) => {
                                                                                setTosefetReshet(val);
                                                                            }}><div className="mr-3">תוספת רשת</div></Switch></th>
                                                                        </>
                                                                    }
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th>חלוקת סולם</th>
                                                                    <th><Input type="number" value={tvahAofkeSolam || ''} color="primary" onValueChange={(val) => {
                                                                        setTvahAofkeSolam(val);
                                                                    }} size="sm" className="w-[100px]" label="טווח אופקי" /></th>
                                                                    <th></th>
                                                                    <th></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th></th>
                                                                    <th><Input type="number" value={tvahAnkheSolam || ''} color="primary" onValueChange={(val) => {
                                                                        setTvahAnkheSolam(val);
                                                                    }} size="sm" className="w-[100px]" label="טווח אנכי" /></th>
                                                                    <th></th>
                                                                    <th></th>
                                                                </tr>
                                                            </>
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
                                                                <th><Switch value={aemTseba} onValueChange={(val) => {
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
                                                                <th><Switch isReadOnly={aemKafRetom} value={aemBashbashol} onValueChange={(val) => { setAemBashbashol(val) }}></Switch></th>
                                                                <th></th>
                                                            </tr>
                                                            <tr className="row-spacing">
                                                                <th>
                                                                    <div className="group relative z-30">
                                                                        <Image width={70} alt="none" src={rep37} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                    </div>
                                                                </th>
                                                                <th>כף ריתום</th>
                                                                <th><Switch isReadOnly={aemBashbashol} value={aemKafRetom} onValueChange={(val) => { setAemKafRetom(val) }}></Switch></th>
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
                                                                <th><Switch value={aemMekhalMaym} onValueChange={(val) => setAemMekhalMaym(val)}></Switch></th>
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
                                                                <th><Switch value={aemArgazKlem} onValueChange={(val) => setAemArgazKlem(val)}></Switch></th>
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
                                                                <th><Switch value={aemReglHnea} onValueChange={(val) => setAemReglHnea(val)}></Switch></th>
                                                                <th></th>
                                                            </tr>
                                                        </>
                                                        :
                                                        <>
                                                            <>
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
                                                                        }
                                                                    }} className="flex"><div className="flex mr-5"><Radio value="1">1</Radio><Radio value="2">2</Radio></div></RadioGroup></th>
                                                                    <th><Switch isSelected={aemBlamem} value={aemBlamem} onValueChange={(val) => {
                                                                        let res = (val === false) && (parseInt(msbarTsrem) === 2) ? true : val;
                                                                        setAemBlamem(res);
                                                                    }}><div className="mr-3">עם בולמים</div></Switch></th>
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
                                                                    <th>צמיגים</th>
                                                                    <th><RadioGroup value={sogGlgalem} onValueChange={(val) => {
                                                                        setSogGlgalem(val);
                                                                        if (val === 'חצוניים') {
                                                                            setHlokaTvah(0);
                                                                        }
                                                                    }} className="flex"><div className="flex mr-5"><Radio value="פנמיים">פנימיים</Radio><Radio value="חצוניים">חצוניים</Radio></div></RadioGroup></th>
                                                                    <th><Switch value={tsmegSber} onValueChange={(val) => {
                                                                        setTsmegSber(val);
                                                                    }}><div>צמיג ספר</div></Switch></th>
                                                                </tr>
                                                                {
                                                                    sogGlgalem === 'פנמיים' &&
                                                                    <>
                                                                        <tr className="row-spacing">
                                                                            <th>חלוקה תחתונה</th>
                                                                            <th></th>
                                                                            <th><Input type="number" value={hlokaTvah || ''} onValueChange={(val) => { setHlokaTvah(val); }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
                                                                            <th></th>
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
                                                                    }} color="primary" size="sm" className="w-[100px]" label="אורך פרופיל" /></th>
                                                                    <th></th>
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
                                                                    <th><Input type="number" value={tvahBrofel || ''} onValueChange={(val) => {
                                                                        setTvahBrofel(val);
                                                                    }} color="primary" size="sm" className="w-[100px]" label="טווח" /></th>
                                                                    <th></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th>חלק א</th>
                                                                    <th></th>
                                                                    <th></th>
                                                                    <th><Switch value={helkBetBnmet} onValueChange={(val) => {
                                                                        setHelkBetBnmet(val);
                                                                    }}><div className="mr-2"><FaPlus /></div></Switch></th>
                                                                </tr>
                                                                {
                                                                    helkBetBnmet &&
                                                                    <tr className="row-spacing">
                                                                        <th>חלק ב</th>
                                                                        <th></th>
                                                                        <th></th>
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
                                                                    <th>חלוקת וניל</th>
                                                                    <th><Input type="number" value={tvahAofkeSolam || ''} color="primary" onValueChange={(val) => {
                                                                        setTvahAofkeSolam(val);
                                                                    }} size="sm" className="w-[100px]" label="טווח אופקי" /></th>
                                                                    <th></th>
                                                                    <th></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th></th>
                                                                    <th><Input type="number" value={tvahAnkheSolam || ''} color="primary" onValueChange={(val) => {
                                                                        setTvahAnkheSolam(val);
                                                                    }} size="sm" className="w-[100px]" label="טווח אנכי" /></th>
                                                                    <th></th>
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
                                                                    <th><Switch value={aemTseba} onValueChange={(val) => {
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
                                                                    <th><Switch isReadOnly={aemKafRetom} value={aemBashbashol} onValueChange={(val) => { setAemBashbashol(val) }}></Switch></th>
                                                                    <th></th>
                                                                </tr>
                                                                <tr className="row-spacing">
                                                                    <th>
                                                                        <div className="group relative z-30">
                                                                            <Image width={70} alt="none" src={rep37} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary" />
                                                                        </div>
                                                                    </th>
                                                                    <th>כף ריתום</th>
                                                                    <th><Switch isReadOnly={aemBashbashol} value={aemKafRetom} onValueChange={(val) => { setAemKafRetom(val) }}></Switch></th>
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
                                                                    <th><Switch value={aemMekhalMaym} onValueChange={(val) => setAemMekhalMaym(val)}></Switch></th>
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
                                                                    <th><Switch value={aemArgazKlem} onValueChange={(val) => setAemArgazKlem(val)}></Switch></th>
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
                                                                    <th><Switch value={aemReglHnea} onValueChange={(val) => setAemReglHnea(val)}></Switch></th>
                                                                    <th></th>
                                                                </tr>
                                                                <tr>
                                                                    <th colSpan={4}><Divider className="mt-[500px]" /></th>
                                                                </tr>

                                                            </>
                                                        </>
                                                }
                                            </thead>
                                        </table>
                                    }
                                </div>
                                <Divider className="w-[2px] mr-2 ml-2 h-[600px]" />
                                <div className="w-full h-[600px] overflow-y-scroll">
                                    <div className="w-full bg-gradient-to-r from-gray-300 to-gray-700 text-center p-4 rounded-full sticky top-0 z-50 tracking-wider text-white font-bold text-xl">
                                        פירוט מוצרים
                                    </div>
                                    {
                                        mafenemMotsarem?.map((motsar, index) => {
                                            return <div key={index}>
                                                <div ref={MotsaremRefs.current[index]}>{checkAemRemezMataem(motsar.remez) && renderDropdownWithInputs(motsar, GetBrtemMotsarCategory(motsar?.remez)?.shem, index, false, [], sogBaola)}</div>
                                                {
                                                    checkAemRemezMataem(motsar.remez) && <Divider className="mt-3 mb-3" />
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="primary" onClick={() => {ResetAll(); disable();}}>
                            סגור
                        </Button>
                        <Button isLoading={loading} isDisabled={!shemTokhnet} size="lg" color="primary" onClick={() => {shmeratTokhnet();disable();}}>
                            שמירה
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}