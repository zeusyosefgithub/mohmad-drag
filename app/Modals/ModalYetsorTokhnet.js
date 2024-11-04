'use client';
import { Autocomplete, AutocompleteItem, Avatar, Button, Card, CardBody, Checkbox, CheckboxGroup, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Switch, Tooltip } from "@nextui-org/react";
import React, { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { FaRegCheckSquare } from "react-icons/fa";
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
import rep50 from '../../images/rep50.png';
import rep57 from '../../images/rep57.png';
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import ModalMessage from "./ModalMessage";
import { useAppTokhnetContext } from "./ModalYetsor";
import TokhnetContext from "../auth/TokhnetContext";


export default function ModalYetsorTokhnet({ show, disable, setMotsaremLhatseg, mlae, add, reset,addBro,resetBro }) {


    const {
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
        toseftVnelBro,setToseftVnelBrof,
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
    } = useContext(TokhnetContext);

    const GetBrtemMotsarMlae = useCallback((remez, shem) => {
        const motsarMlae = mlae?.filter(item => item.categoryMotsar === remez);
        const foundItem = motsarMlae?.find(item => item.shem === shem) || {};
        const { alot = 0, kmot = 0, msbar = '' } = foundItem;
        return { arrayResualt: motsarMlae, alot, kmot, msbar };
    }, [mlae]);

    const GetRow = (val1, val2, val3, val4, val5, val6) => {
        let newArray = [];
        let newArray1 = [val3, val4, val5, val6];
        newArray1.map((item, index) => (
            newArray.push(
                <div className="w-full" key={index}>
                    {GetTypeElement(item, val2)}
                </div>
            )
        ));
        return val2 === null ? <div className="w-full flex pr-10 pl-10 pt-8 pb-8">
            <div className="w-[30px] flex items-center text-[12px]">
                {val1}
            </div>
            <div className="w-full flex items-center text-xs">
                {newArray}
            </div>
        </div>
            :
            <div className="w-full flex">
                <div className="w-[30px] flex flex-col">
                    <div className="flex items-start w-full h-full justify-center text-sm">
                        {val1}
                    </div>
                    <div className="border-t-1"></div>
                    <div className="flex items-end w-full h-full justify-center">
                        <div className="flex items-end w-[20px]">
                            {val2 && <FaCheck className="text-[19px] text-primary" />}
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center">
                    {newArray}
                </div>
            </div>
    };

    const GetTypeElement = (value, insider) => {
        if (value?.val === 'Input') {
            return <Input type="number" size={insider === null ? 'sm' : 'md'} variant='underlined' className={`pr-2 pl-2 ${value.getVal && 'text-primary'}`} color={value.getVal ? 'primary' : 'default'} value={value.getVal || ''} onValueChange={(newValue) => value.setVal(Math.max(0,newValue))} label={value.chooises} />
        }
        else if (value?.val === 'Radio') {
            return <RadioGroup
                orientation="horizontal"
                value={value.getVal}
                onValueChange={(newValue) => value.setVal(newValue)}
            >
                {
                    value?.chooises?.map((cho,index) => {
                        return <Radio key={index} value={cho}><div className="text-xs">{cho}</div></Radio>
                    })
                }
            </RadioGroup>
        }
        else if (value?.val === 'DropDown') {
            return <Dropdown dir="rtl">
                <DropdownTrigger>
                    <Button isDisabled={value.disable} variant='flat' color={value.disable ? 'default' : value.getVal !== 'בחר' ? 'primary' : 'warning'} size={insider === null ? 'sm' : 'md'} className='pr-2 pl-2'>
                        {value.getVal}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant="flat"
                    closeOnSelect={true}
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={value.getVal}
                    onSelectionChange={(val) => {value.setVal(val.currentKey);}}
                >
                    {
                        value.chooises.map((res) => (
                            GetBrtemMotsarMlae(res).arrayResualt.map((option) => (
                                <DropdownItem onClick={() => {
                                    if(value.getVal !== 'בחר'){
                                        resetBro(value.getVal,value.calc);
                                        addBro({shem : option.shem,remez : option.categoryMotsar,kmot : value.calc});
                                    }
                                    else{
                                        addBro({shem : option.shem,remez : option.categoryMotsar,kmot : value.calc});
                                    }
                                }} key={option.shem}>{option.shem}</DropdownItem>
                            ))
                        ))
                    }
                    {
                        value.getVal !== 'בחר' && <DropdownItem color='warning' className="text-warning" onClick={() => {value.setVal('בחר');resetBro(value.getVal,value.calc);}}>הסרה</DropdownItem>
                    }
                </DropdownMenu>
            </Dropdown>
        }
        else if (value?.val === 'Toggle') {
            return <Switch size={insider === null ? 'sm' : 'md'} isSelected={value.getVal} value={value.getVal} onValueChange={(val) => { value.setVal(val) }}><div className="mr-1 text-xs">{value.chooises}</div></Switch>
        }
        else if (value?.val === 'Image') {
            return <div className="group relative z-30 w-fit"><Image width={70} alt="none" src={value?.chooises} className={`border-1 rounded-full border-gray-400 ${insider === null ? ' h-[40px] w-[40px] ' : ' h-[60px] w-[60px] '} object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg group-hover:bg-white group-hover:translate-x-[-200%] group-hover:border-1 group-hover:rounded-full group-hover:border-primary`} /></div>
        }
        else {
            return <div className="text-right">{value || value?.val}</div>;
        }
    }




    const [showResetAllMessage,setShowResetAllMessage] = useState(false);


    const GetTosfotValues = () => {
        let newArray = [];
        for (let index = 0; index < tosfot.length; index++) {
            newArray.push(tosfot[index].val);
        }
        return newArray;
    }

    const handleCardClick = (value, remez) => {
        setTosfot((prev) => {
            let updatedTosfot;
            if (prev.some((v) => v.val === value)) {
                updatedTosfot = prev.filter((v) => v.val !== value);
            } else {
                updatedTosfot = [...prev, { val: value, rem: remez }];
            }
            if (value === 'beshbol') {
                updatedTosfot = updatedTosfot.filter((v) => v.val !== 'kafRetom');
            } else if (value === 'kafRetom') {
                updatedTosfot = updatedTosfot.filter((v) => v.val !== 'beshbol');
            }
            return updatedTosfot;
        });
    };

    const formatNumber = (number) => {
        const integerPart = Math.floor(number);
        const fractionalPart = (number % 1).toFixed(2).substring(2);
        const formatted = `${integerPart}.${fractionalPart}`;
        return parseFloat(formatted);
    };


    const GetTosfotRows = (val1, val2, val3, val4) => {
        return <div className="w-full cursor-pointer mt-2" onClick={() => handleCardClick(val1, val4)}>
            <Card className={`w-full border ${tosfot.some((v) => v.val === val1) ? 'border-primary' : ''}`}>
                <CardBody className="w-full">
                    <div className="flex items-center">
                        <Checkbox checked={tosfot.some((v) => v.val === val1)} readOnly value={val1}></Checkbox>
                        <Image width={70} alt="none" src={val3} className={`mr-2 border-1 rounded-full border-gray-400 h-[50px] w-[50px] object-cover transition-transform duration-300 ease-in-out`} />
                        <div className="mr-2 font-bold">{val2}</div>
                    </div>
                </CardBody>
            </Card>
        </div>
    }


    const MathXx1 = (remez) => {
        if (remez === 'B7') {
            return (aorkh / 100) * 2;
        }
        else if (remez === 'B2') {
            return (rohav / 100);
        }
        else if (remez === 'B9') {
            return (rohav / 100);
        }
        else {
            return null;
        }
    }

    useEffect(() => {
        if (aorkh && rohav && sogAglaBS === 'פתוחה') {
            const newMotsarem = ['B7', 'B2', 'B9', 'B8'];
            let newArray = [];
            newMotsarem.forEach((motsar) => (
                newArray.push({
                    remez: motsar,
                    val: parseFloat(MathXx1(motsar)) || 0
                })
            ));
            add(newArray);
        }
        else {
            const newMotsarem = ['B7', 'B2', 'B9', 'B8'];
            reset(newMotsarem);
        }
    }, [aorkh, rohav]);

    useEffect(() => {
        const motsarem = ['D1', 'A4', 'C11', 'A5', 'A6', 'A7', 'A9'];
        reset(motsarem);
        let newArray = [];
        tosfot.forEach((tose, index) => (
            tose.rem.forEach((tose2, index2) => (
                newArray.push({
                    remez: tose2,
                    val: 0
                })
            ))
        ));
        add(newArray);
    }, [tosfot]);

    useEffect(() => {
        if (AemBlamem) {
            add([{ remez: 'F2', val: 1 }]);
        }
        else {
            reset(['F2']);
        }
    }, [AemBlamem]);

    useEffect(() => {
        if (tsmgSber) {
            add([{ remez: 'C1', val: 0 }]);
        }
        else {
            reset(['C1']);
        }
    }, [tsmgSber]);

    useEffect(() => {
        if (toseftReshet) {
            add([{ remez: 'B3', val: 0 }]);
        }
        else {
            reset(['B3']);
        }
    }, [toseftReshet]);

    useEffect(() => {
        if (parseInt(msbarTsrem) === 1) {
            reset(['A2']);
            add([{ remez: 'A1', val: 2 }, { remez: 'A10', val: 1 }, { remez: 'A3', val: 2 }]);
        }
        else if (parseInt(msbarTsrem) === 2) {
            reset(['A1']);
            add([{ remez: 'A2', val: 2 }, { remez: 'A10', val: 2 }, { remez: 'A3', val: 4 }]);
        }
    }, [msbarTsrem]);

    const resetAll = () => {
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
    }


    useEffect(() => {
        const reshon = Math.ceil(msbarBroSheldaBnemet / 2);
        const shne = msbarBroSheldaBnemet - reshon;
        setMsbarBroSheldaBnemetReshon(reshon);
        setMsbarBroSheldaBnemetShne(shne);
    },[msbarBroSheldaBnemet]);




    return (
        <Modal placement="center" className="test-fontt select-none" backdrop={"blur"} size="full" isOpen={show} onClose={disable}>
            <ModalContent className="h-screen"> {/* Set modal content to full viewport height */}
                <ModalHeader className="flex justify-center border-b-2">
                    תוכנית ייצור
                </ModalHeader>
                <ModalBody className="h-full overflow-auto"> {/* Allow body to scroll */}
                    <ModalMessage Aeshor={(value) => {
                        if (value) {
                            resetAll();
                        }
                    }} yetsor message={'האם אתה בטוח לשחזור כל הנתונים !?'} show={showResetAllMessage} disable={() => setShowResetAllMessage(false)} />

                    <div dir="rtl" className="w-full flex justify-center">
                        <div className="w-full max-w-[700px]"> {/* Inner content */}
                            <div className="w-full mt-4"></div>
                            {
                                GetRow(
                                    '1',
                                    sogAglaBS,
                                    {
                                        val: 'Image',
                                        chooises: sogAglaBS === 'פתוחה' ? rep6 : rep80,
                                    },
                                    'סוג עגלה',
                                    {
                                        val: 'Radio',
                                        chooises: ['פתוחה', 'סגורה'],
                                        getVal: sogAglaBS,
                                        setVal: (val) => setSogAglaBS(val)
                                    },
                                )
                            }
                            <div className={`w-full border-t-1 mt-4 mb-4 ${sogAglaBS && 'border-primary-200'}`}></div>
                            {
                                GetRow(
                                    '2',
                                    aorkh && rohav ? true : false,
                                    {
                                        val: 'Image',
                                        chooises: rep77,
                                    },
                                    'שטח עגלה',
                                    {
                                        val: 'Input',
                                        chooises: 'אורך בס"מ',
                                        getVal: aorkh,
                                        setVal: (val) => setAorkh(val)
                                    },
                                    {
                                        val: 'Input',
                                        chooises: 'רוחב בס"מ',
                                        getVal: rohav,
                                        setVal: (val) => setRohav(val)
                                    },
                                )
                            }
                            <div className={`w-full border-t-1 mt-4 mb-4 ${aorkh && rohav && 'border-primary-200'}`}></div>
                            {
                                GetRow(
                                    '3',
                                    retsba !== 'בחר',
                                    {
                                        val: 'Image',
                                        chooises: rep50,
                                    },
                                    'רצפה',
                                    {
                                        val: 'DropDown',
                                        chooises: ['B1'],
                                        calc: parseFloat(((aorkh / 100) * (rohav / 100)).toFixed(1)),
                                        getVal: retsba,
                                        setVal: (val) => setRetsba(val)
                                    },
                                )
                            }
                            <div className={`w-full border-t-1 mt-4 mb-4 ${retsba !== 'בחר' && 'border-primary-200'}`}></div>
                            {
                                GetRow(
                                    '4',
                                    msbarTsrem && brofelTfesa !== 'בחר',
                                    {
                                        val: 'Image',
                                        chooises: rep68,
                                    },
                                    'מספר צירים',
                                    {
                                        val: 'Radio',
                                        chooises: ['1', '2'],
                                        getVal: msbarTsrem,
                                        setVal: (val) => setMsbarTsrem(val)
                                    },
                                    {
                                        val: 'Toggle',
                                        chooises: 'עם בלמים',
                                        getVal: AemBlamem,
                                        setVal: (val) => setAemBlamem(val)
                                    },
                                )
                            }
                            {
                                GetRow(
                                    '4.1',
                                    null,
                                    {
                                        val: 'Image',
                                        chooises: rep57,
                                    },
                                    'פרופיל תפיסה',
                                    {
                                        val: 'DropDown',
                                        chooises: ['B4', 'B5', 'B6'],
                                        calc: parseInt(msbarTsrem) === 1 ? (0.6) : parseInt(msbarTsrem) === 2 ? (1.2) : 0,
                                        getVal: brofelTfesa,
                                        setVal: (val) => setBrofelTfesa(val)
                                    },
                                )
                            }
                            <div className={`w-full border-t-1 mt-4 mb-4 ${msbarTsrem && brofelTfesa !== 'בחר' && 'border-primary-200'}`}></div>
                            {
                                GetRow(
                                    '5',
                                    tsmgem && msgeretThtonah !== 'בחר' && hlokaThtonah !== 'בחר' && tvahHlokaThtona && msbarBrofHlokaThotona,
                                    {
                                        val: 'Image',
                                        chooises: rep20,
                                    },
                                    'צמיגים',
                                    {
                                        val: 'Radio',
                                        chooises: ['פנימיים', 'חצוניים'],
                                        getVal: tsmgem,
                                        setVal: (val) => setTsmegem(val)
                                    },
                                    {
                                        val: 'Toggle',
                                        chooises: 'צמיג ספר',
                                        getVal: tsmgSber,
                                        setVal: (val) => setTsmegSber(val)
                                    },
                                )
                            }
                            {
                                GetRow(
                                    '5.1',
                                    null,
                                    {
                                        val: 'Image',
                                        chooises: rep57,
                                    },
                                    'מסגרת תחתונה',
                                    {
                                        val: 'DropDown',
                                        chooises: ['B4', 'B5', 'B6'],
                                        calc: parseFloat(((aorkh / 100) * 2) + ((rohav / 100) * 2)),
                                        getVal: msgeretThtonah,
                                        setVal: (val) => setTMsgeretThtonah(val)
                                    },
                                )
                            }
                            {
                                GetRow(
                                    '5.2',
                                    null,
                                    {
                                        val: 'Image',
                                        chooises: rep57,
                                    },
                                    'חלוקה תחתונה',
                                    {
                                        val: 'DropDown',
                                        chooises: ['B4', 'B5', 'B6'],
                                        disable: !tvahHlokaThtona && !msbarBrofHlokaThotona,
                                        calc: parseFloat(msbarBrofHlokaThotona * (rohav / 100)), 
                                        getVal: hlokaThtonah,
                                        setVal: (val) => setTHlokaThtonah(val)
                                    },
                                )
                            }
                            {
                                GetRow(
                                    '',
                                    null,
                                    '5.2.1',
                                    {
                                        val: 'Input',
                                        chooises: `טווח בס"מ`,
                                        getVal: tvahHlokaThtona,
                                        setVal: (val) => { setTvahHlokaThtona(val); setMsbarBrofHlokaThotona(parseInt(Math.floor(((aorkh / 100) / (val / 100)) - 1))); }
                                    },
                                    {
                                        val: 'Input',
                                        chooises: 'מס פרופילים',
                                        getVal: msbarBrofHlokaThotona,
                                        setVal: (val) => { setMsbarBrofHlokaThotona(val); setTvahHlokaThtona(formatNumber((((aorkh / 100) / (parseFloat(val) + 1)) * 100))); }
                                    },
                                )
                            }
                            <div className={`w-full border-t-1 mt-4 mb-4 ${tsmgem && msgeretThtonah !== 'בחר' && hlokaThtonah !== 'בחר' && tvahHlokaThtona && msbarBrofHlokaThotona && 'border-primary-200'}`}></div>
                            {
                                GetRow(
                                    '6',
                                    yetsol !== 'בחר' && aorkhBroYetsol || '',
                                    {
                                        val: 'Image',
                                        chooises: rep15,
                                    },
                                    'יצול',
                                    {
                                        val: 'DropDown',
                                        chooises: ['B4', 'B5', 'B6'],
                                        disable: !aorkhBroYetsol,
                                        calc: (parseFloat((aorkhBroYetsol || 0) * 2) / 100), 
                                        getVal: yetsol,
                                        setVal: (val) => setYetsol(val)
                                    },
                                    {
                                        val: 'Input',
                                        chooises: `אורך פרופיל בס"מ`,
                                        getVal: aorkhBroYetsol,
                                        setVal: (val) => setAorkhBroYetsol(val)
                                    },

                                )
                            }
                            <div className={`w-full border-t-1 mt-4 mb-4 ${yetsol !== 'בחר' && aorkhBroYetsol && 'border-primary-200'}`}></div>
                            {
                                GetRow(
                                    '7',
                                    sheldaHetsonet !== 'בחר',
                                    {
                                        val: 'Image',
                                        chooises: rep9,
                                    },
                                    'שלדה חיצונית',
                                    {
                                        val: 'DropDown',
                                        chooises: ['B4', 'B5', 'B6'],
                                        calc: parseFloat(((aorkh / 100) * 2) + ((rohav / 100) * 2)),
                                        getVal: sheldaHetsonet,
                                        setVal: (val) => setSheldaHetsonet(val)
                                    },
                                )
                            }
                            <div className={`w-full border-t-1 mt-4 mb-4 ${sheldaHetsonet !== 'בחר' && 'border-primary-200'}`}></div>
                            {
                                GetRow(
                                    '8',
                                    (tvahSheldaBnemet || '') && (msbarBroSheldaBnemet || '') && (((helekReshonSheldaBnemet !== 'בחר') && (msbarBroSheldaBnemetReshon || '')) || ((helekShneSheldaBnemet !== 'בחר') && (msbarBroSheldaBnemetShne || ''))),
                                    {
                                        val: 'Image',
                                        chooises: rep10,
                                    },
                                    'שלדה פנימית',
                                    {
                                        val: 'Input',
                                        chooises: `טווח בס"מ`,
                                        getVal: tvahSheldaBnemet,
                                        setVal: (val) => {setTvahSheldaBnemet(val);setMsbarBroSheldaBnemet(parseInt(Math.floor(((aorkh / 100) / (val / 100)) - 1)));resetBro(helekReshonSheldaBnemet,msbarBroSheldaBnemetReshon);setHelekReshonSheldaBnemet('בחר');resetBro(helekShneSheldaBnemet,msbarBroSheldaBnemetShne);sethelekShneSheldaBnemet('בחר');}
                                    },
                                    {
                                        val: 'Input',
                                        chooises: "מס פרופילים",
                                        getVal: msbarBroSheldaBnemet,
                                        setVal: (val) => {setMsbarBroSheldaBnemet(val);setTvahSheldaBnemet(formatNumber((((aorkh / 100) / (parseFloat(val) + 1)) * 100)));resetBro(helekReshonSheldaBnemet,msbarBroSheldaBnemetReshon);setHelekReshonSheldaBnemet('בחר');resetBro(helekShneSheldaBnemet,msbarBroSheldaBnemetShne);sethelekShneSheldaBnemet('בחר');}
                                    },

                                )
                            }
                            {
                                GetRow(
                                    '8.1',
                                    null,
                                    {
                                        val: 'Image',
                                        chooises: rep57,
                                    },
                                    'חלק 1',
                                    {
                                        val: 'DropDown',
                                        chooises: ['B4', 'B5', 'B6'],
                                        disable: !msbarBroSheldaBnemetReshon,
                                        calc: msbarBroSheldaBnemetReshon,
                                        getVal: helekReshonSheldaBnemet,
                                        setVal: (val) => setHelekReshonSheldaBnemet(val)
                                    },
                                    {
                                        val: 'Input',
                                        chooises: "מס פרופילים",
                                        getVal: msbarBroSheldaBnemetReshon,
                                        setVal: (val) => {resetBro(helekReshonSheldaBnemet,val);setHelekReshonSheldaBnemet('בחר');setMsbarBroSheldaBnemetReshon(Math.min(val,msbarBroSheldaBnemet));setMsbarBroSheldaBnemetShne(msbarBroSheldaBnemet - Math.min(val,msbarBroSheldaBnemet));}
                                    },
                                )
                            }
                            {
                                GetRow(
                                    '8.2',
                                    null,
                                    {
                                        val: 'Image',
                                        chooises: rep57,
                                    },
                                    'חלק 2',
                                    {
                                        val: 'DropDown',
                                        chooises: ['B4', 'B5', 'B6'],
                                        disable: !msbarBroSheldaBnemetShne,
                                        calc: msbarBroSheldaBnemetShne,
                                        getVal: helekShneSheldaBnemet,
                                        setVal: (val) => sethelekShneSheldaBnemet(val)
                                    },
                                    {
                                        val: 'Input',
                                        chooises: "מס פרופילים",
                                        getVal: msbarBroSheldaBnemetShne,
                                        setVal: (val) => {resetBro(helekShneSheldaBnemet,val);sethelekShneSheldaBnemet('בחר');setMsbarBroSheldaBnemetShne(Math.min(val,msbarBroSheldaBnemet));setMsbarBroSheldaBnemetReshon(msbarBroSheldaBnemet - Math.min(val,msbarBroSheldaBnemet));}
                                    },
                                )
                            }
                            <div className={`w-full border-t-1 mt-4 mb-4 ${tvahSheldaBnemet && msbarBroSheldaBnemet && (((helekReshonSheldaBnemet !== 'בחר') && (msbarBroSheldaBnemetReshon || '')) || ((helekShneSheldaBnemet !== 'בחר') && (msbarBroSheldaBnemetShne || ''))) && 'border-primary-200'}`}></div>
                            {
                                sogAglaBS === 'פתוחה' &&
                                <>
                                    {
                                        GetRow(
                                            '9',
                                            dalet === 'רגיל' ? true : (tosefetVnel ? toseftVnelBro !== 'בחר' : true) && (msgertRmbaDalet !== 'בחר') && (msgertRmbaDaletAorkh || '') && (hlokatRmbaDalet !== 'בחר') && (hlokatRmbaDaletBro || '') && (hlokatRmbaDaletTvah || ''),
                                            {
                                                val: 'Image',
                                                chooises: rep11,
                                            },
                                            'דלת',
                                            {
                                                val: 'Radio',
                                                chooises: ['רגיל', 'רמפה'],
                                                getVal: dalet,
                                                setVal: (val) => setDalet(val)
                                            },

                                        )
                                    }
                                    {
                                        dalet === 'רמפה' && GetRow(
                                            '9.1',
                                            null,
                                            {
                                                val: 'Image',
                                                chooises: rep57,
                                            },
                                            'מסגרת רמפה',
                                            {
                                                val: 'DropDown',
                                                chooises: ['B4', 'B5', 'B6'],
                                                disable: !msgertRmbaDaletAorkh,
                                                calc: parseFloat((msgertRmbaDaletAorkh / 100) * 2 + (rohav / 100) * 2),
                                                getVal: msgertRmbaDalet,
                                                setVal: (val) => setMsgertRmbaDalet(val)
                                            },
                                            {
                                                val: 'Input',
                                                chooises: `אורך רמפה בס"מ`,
                                                getVal: msgertRmbaDaletAorkh,
                                                setVal: (val) => {setMsgertRmbaDaletAorkh(val);setMsgertRmbaDalet('בחר');resetBro(msgertRmbaDalet,parseFloat((msgertRmbaDaletAorkh / 100) * 2 + (rohav / 100) * 2));setHlokatRmbaDalet('בחר');resetBro(hlokatRmbaDalet,parseFloat(hlokatRmbaDaletBro * (rohav / 100)));}
                                            },
                                        )
                                    }
                                    {
                                        dalet === 'רמפה' && GetRow(
                                            '9.2',
                                            null,
                                            {
                                                val: 'Image',
                                                chooises: rep57,
                                            },
                                            'חלוקת רמפה',
                                            {
                                                val: 'DropDown',
                                                chooises: ['B4', 'B5', 'B6'],
                                                disable: !hlokatRmbaDaletTvah && !hlokatRmbaDaletBro,
                                                calc: parseFloat(hlokatRmbaDaletBro * (rohav / 100)),
                                                getVal: hlokatRmbaDalet,
                                                setVal: (val) => setHlokatRmbaDalet(val)
                                            },

                                        )
                                    }
                                    {
                                        dalet === 'רמפה' && GetRow(
                                            '',
                                            null,
                                            '9.2.1',
                                            {
                                                val: 'Input',
                                                chooises: `טווח בס"מ`,
                                                getVal: hlokatRmbaDaletTvah,
                                                setVal: (val) => { setHlokatRmbaDalet('בחר');resetBro(hlokatRmbaDalet,parseFloat(hlokatRmbaDaletBro * (rohav / 100)));setHlokatRmbaDaletTvah(val); setHlokatRmbaDaletBro(parseInt(Math.floor((msgertRmbaDaletAorkh / (val / 100)) - 1))); }
                                            },
                                            {
                                                val: 'Input',
                                                chooises: "מס פרופילים",
                                                getVal: hlokatRmbaDaletBro,
                                                setVal: (val) => { setHlokatRmbaDalet('בחר');resetBro(hlokatRmbaDalet,parseFloat(hlokatRmbaDaletBro * (rohav / 100)));setHlokatRmbaDaletBro(val); setHlokatRmbaDaletTvah(formatNumber(((msgertRmbaDaletAorkh / (parseFloat(val) + 1)) * 100))); }
                                            },
                                        )
                                    }
                                    {
                                        dalet === 'רמפה' && GetRow(
                                            '9.3',
                                            null,
                                            {
                                                val: 'Image',
                                                chooises: rep57,
                                            },
                                            'תוספת וניל',
                                            {
                                                val: 'Toggle',
                                                chooises: '',
                                                getVal: tosefetVnel,
                                                setVal: (val) => setToseftVnel(val)
                                            },
                                            tosefetVnel && {
                                                val: 'DropDown',
                                                chooises: ['B4', 'B5', 'B6'],
                                                calc: parseFloat((msgertRmbaDaletAorkh / 100) * (rohav / 100)),
                                                getVal: toseftVnelBro,
                                                setVal: (val) => setToseftVnelBrof(val)
                                            }
                                        )
                                    }

                                    <div className={`w-full border-t-1 mt-4 mb-4 ${dalet === 'רגיל' ? true : (tosefetVnel && toseftVnelBro !== 'בחר') && (msgertRmbaDalet !== 'בחר') && (msgertRmbaDaletAorkh || '') && (hlokatRmbaDalet !== 'בחר') && (hlokatRmbaDaletBro || '') && (hlokatRmbaDaletTvah || '') && 'border-primary-200'}`}></div>
                                    {
                                        GetRow(
                                            '10',
                                            solam === 'ללא' ? true : (msgertSolam !== 'בחר') && (gobahSolam || '') && (hlokatSolam !== 'בחר') && (tvahAnkheSolam || '') && (tvahAofkeSolam || '') && (msbarBroAnkheSolam || '') && (msbarBroAofkeSolam || ''),
                                            {
                                                val: 'Image',
                                                chooises: rep13,
                                            },
                                            'סולם',
                                            {
                                                val: 'Radio',
                                                chooises: ['ללא','רק קדמי', 'הכל'],
                                                getVal: solam,
                                                setVal: (val) => setSolam(val)
                                            },
                                        )
                                    }
                                    {
                                        solam !== 'ללא' && GetRow(
                                            '10.1',
                                            null,
                                            {
                                                val: 'Image',
                                                chooises: rep57,
                                            },
                                            'מסגרת סולם',
                                            {
                                                val: 'DropDown',
                                                chooises: ['B4', 'B5', 'B6'],
                                                disable: !gobahSolam,
                                                calc: solam === 'רק קדמי' ? parseFloat(((gobahSolam / 100) * 2) + ((rohav / 100) * 2)) : ((solam === 'הכל') && !daletAleon) ? parseFloat((((gobahSolam / 100) * 4) + ((rohav / 100) * 2)) + ((aorkh / 100) * 4)) : ((solam === 'הכל') && daletAleon) ? parseFloat((((((gobahSolam / 100) * 6) - 0.8) + ((rohav / 100) * 4)) + ((aorkh / 100) * 4)).toFixed(1)) : null,
                                                getVal: msgertSolam,
                                                setVal: (val) => setMsgertSolam(val)
                                            },
                                            {
                                                val: 'Input',
                                                chooises: `גובה סולם בס"מ`,
                                                getVal: gobahSolam,
                                                setVal: (val) => {setGobahSolam(val);setMsgertSolam('בחר');setHlokatSolam('בחר');resetBro(hlokatSolam,(solam === 'רק קדמי') ? parseFloat((msbarBroAofkeSolam * (rohav / 100)) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : (solam === 'הכל') ? parseFloat((msbarBroAofkeSolam * (parseFloat((rohav / 100) * (daletAleon ? 2 : 0)) + ((aorkh / 100) * 2))) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : null);resetBro(msgertSolam,solam === 'רק קדמי' ? parseFloat(((gobahSolam / 100) * 2) + ((rohav / 100) * 2)) : ((solam === 'הכל') && !daletAleon) ? parseFloat((((gobahSolam / 100) * 4) + ((rohav / 100) * 2)) + ((aorkh / 100) * 4)) : ((solam === 'הכל') && daletAleon) ? parseFloat((((((gobahSolam / 100) * 6) - 0.8) + ((rohav / 100) * 4)) + ((aorkh / 100) * 4)).toFixed(1)) : null);}
                                            },
                                        )
                                    }
                                    {
                                        solam !== 'ללא' && GetRow(
                                            '10.2',
                                            null,
                                            {
                                                val: 'Image',
                                                chooises: rep57,
                                            },
                                            'חלוקת סולם',
                                            {
                                                val: 'DropDown',
                                                chooises: ['B4', 'B5', 'B6'],
                                                disable: (!tvahAofkeSolam && !msbarBroAofkeSolam) || (!tvahAnkheSolam && !msbarBroAnkheSolam),
                                                calc: (solam === 'רק קדמי') ? parseFloat((msbarBroAofkeSolam * (rohav / 100)) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : (solam === 'הכל') ? parseFloat((msbarBroAofkeSolam * (parseFloat((rohav / 100) * (daletAleon ? 2 : 0)) + ((aorkh / 100) * 2))) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : null,
                                                getVal: hlokatSolam,
                                                setVal: (val) => setHlokatSolam(val)
                                            },
                                        )
                                    }
                                    {
                                        solam !== 'ללא' && GetRow(
                                            '',
                                            null,
                                            '10.2.1',
                                            {
                                                val: 'Input',
                                                chooises: `טווח אופקי בס"מ`,
                                                getVal: tvahAofkeSolam,
                                                setVal: (val) => { setHlokatSolam('בחר');resetBro(hlokatSolam,(solam === 'רק קדמי') ? parseFloat((msbarBroAofkeSolam * (rohav / 100)) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : (solam === 'הכל') ? parseFloat((msbarBroAofkeSolam * (parseFloat((rohav / 100) * (daletAleon ? 2 : 0)) + ((aorkh / 100) * 2))) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : null);setTvahAofkeSolam(val); const reverseCalculatedValue = parseInt(Math.floor(((parseFloat((gobahSolam / 100)) - 0.4) / parseFloat(val)) - 1)); setMsbarBroAofkeSolam(reverseCalculatedValue); }
                                            },
                                            {
                                                val: 'Input',
                                                chooises: "מס פרופילים אופקי",
                                                getVal: msbarBroAofkeSolam,
                                                setVal: (val) => { setHlokatSolam('בחר');resetBro(hlokatSolam,(solam === 'רק קדמי') ? parseFloat((msbarBroAofkeSolam * (rohav / 100)) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : (solam === 'הכל') ? parseFloat((msbarBroAofkeSolam * (parseFloat((rohav / 100) * (daletAleon ? 2 : 0)) + ((aorkh / 100) * 2))) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : null);setMsbarBroAofkeSolam(val); const calculatedValue = parseFloat(((parseFloat((gobahSolam / 100)) - 0.4) / (parseFloat(val) + 1)).toFixed(2)); setTvahAofkeSolam(calculatedValue); }
                                            },
                                        )
                                    }
                                    {
                                        solam !== 'ללא' && GetRow(
                                            '',
                                            null,
                                            '10.2.2',
                                            {
                                                val: 'Input',
                                                chooises: `טווח אנכי בס"מ`,
                                                getVal: tvahAnkheSolam,
                                                setVal: (val) => {
                                                    setTvahAnkheSolam(val);
                                                    setHlokatSolam('בחר');resetBro(hlokatSolam,(solam === 'רק קדמי') ? parseFloat((msbarBroAofkeSolam * (rohav / 100)) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : (solam === 'הכל') ? parseFloat((msbarBroAofkeSolam * (parseFloat((rohav / 100) * (daletAleon ? 2 : 0)) + ((aorkh / 100) * 2))) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : null);
                                                    if (solam === 'רק קדמי') {
                                                        setMsbarBroAnkheSolam(parseInt(Math.floor(((parseFloat((rohav / 100))) / (parseFloat(val) / 100)) - 3)));
                                                    }
                                                    else if (solam === 'הכל' && daletAleon) {
                                                        setMsbarBroAnkheSolam(parseInt((Math.floor((parseFloat((rohav / 100)) / (parseFloat(val) / 100)) - 1) * 2) + (Math.floor((((parseFloat((aorkh / 100)) / (parseFloat(val) / 100)) - 1))) * 2)));
                                                    }
                                                    else {
                                                        setMsbarBroAnkheSolam(parseInt(Math.floor((parseFloat((rohav / 100)) / (parseFloat(val) / 100)) - 1) + (Math.floor((((parseFloat((aorkh / 100)) / (parseFloat(val) / 100)) - 1))) * 2)));
                                                    }
                                                }
                                            },
                                            {
                                                val: 'Input',
                                                chooises: "מס פרופילים אנכי",
                                                getVal: msbarBroAnkheSolam,
                                                setVal: (val) => { setHlokatSolam('בחר');resetBro(hlokatSolam,(solam === 'רק קדמי') ? parseFloat((msbarBroAofkeSolam * (rohav / 100)) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : (solam === 'הכל') ? parseFloat((msbarBroAofkeSolam * (parseFloat((rohav / 100) * (daletAleon ? 2 : 0)) + ((aorkh / 100) * 2))) + (msbarBroAnkheSolam * ((gobahSolam / 100) - 0.4)).toFixed(1)) : null);setMsbarBroAnkheSolam(val); setTvahAnkheSolam(0); }
                                            },
                                        )
                                    }
                                    {
                                        solam === 'הכל' && GetRow(
                                            '10.3',
                                            null,
                                            '',
                                            'עם דלת עליון',
                                            {
                                                val: 'Toggle',
                                                chooises: '',
                                                getVal: daletAleon,
                                                setVal: (val) => setDaletAleon(val)
                                            },
                                        )
                                    }
                                    {
                                        solam === 'הכל' && GetRow(
                                            '10.4',
                                            null,
                                            '',
                                            'תוספת רשת',
                                            {
                                                val: 'Toggle',
                                                chooises: '',
                                                getVal: toseftReshet,
                                                setVal: (val) => setTosefetReshet(val)
                                            },
                                        )
                                    }
                                    <div className={`w-full border-t-1 mt-4 mb-4 ${ solam === 'ללא' ? true : (msgertSolam !== 'בחר') && (gobahSolam || '') && (hlokatSolam !== 'בחר') && (tvahAnkheSolam || '') && (tvahAofkeSolam || '') && (msbarBroAnkheSolam || '') && (msbarBroAofkeSolam || '') && 'border-primary-200'}`}></div>
                                </>
                            }
                            {
                                sogAglaBS === 'סגורה' &&
                                <>
                                    {
                                        GetRow(
                                            '9',
                                            (vnel !== 'בחר') && (gobahVnel || '') && (msgertVnel !== 'בחר') && (tvahAofkeVnel || '') && (msbarBroAofkeVnel || '') && (tvahAnkheVnel || '') && (msbarBroAnkheVnel || ''),
                                            {
                                                val: 'Image',
                                                chooises: rep13,
                                            },
                                            'וניל',
                                            {
                                                val: 'DropDown',
                                                chooises: ['B4', 'B5', 'B6'],
                                                getVal: vnel,
                                                setVal: (val) => setVnel(val)
                                            },
                                        )
                                    }
                                    {
                                        GetRow(
                                            '9.1',
                                            null,
                                            {
                                                val: 'Image',
                                                chooises: rep57,
                                            },
                                            'מסגרת וניל',
                                            {
                                                val: 'DropDown',
                                                chooises: ['B4', 'B5', 'B6'],
                                                getVal: msgertVnel,
                                                setVal: (val) => setMsgertVnel(val)
                                            },
                                            {
                                                val: 'Input',
                                                chooises: `גובה וניל בס"מ`,
                                                getVal: gobahVnel,
                                                setVal: (val) => setGobahVnel(val)
                                            },
                                        )
                                    }
                                    {
                                        GetRow(
                                            '9.2',
                                            null,
                                            {
                                                val: 'Image',
                                                chooises: rep57,
                                            },
                                            'חלוקת וניל',
                                        )
                                    }
                                    {
                                        GetRow(
                                            '',
                                            null,
                                            '9.2.1',
                                            {
                                                val: 'Input',
                                                chooises: `טווח אופקי בס"מ`,
                                                getVal: tvahAofkeVnel,
                                                setVal: (val) => { setTvahAofkeVnel(val); const reverseCalculatedValue = parseInt(Math.floor(((parseFloat((gobahSolam / 100)) - 0.4) / parseFloat(val)) - 1)); setMsbarBroAofkeVnel(reverseCalculatedValue); }
                                            },
                                            {
                                                val: 'Input',
                                                chooises: "מס פרופילים",
                                                getVal: msbarBroAofkeVnel,
                                                setVal: (val) => { setMsbarBroAofkeVnel(val); const calculatedValue = parseFloat(((parseFloat((gobahSolam / 100)) - 0.4) / (parseFloat(val) + 1)).toFixed(2)); setTvahAofkeVnel(calculatedValue); }
                                            },
                                        )
                                    }
                                    {
                                        GetRow(
                                            '',
                                            null,
                                            '9.2.2',
                                            {
                                                val: 'Input',
                                                chooises: `טווח אנכי בס"מ`,
                                                getVal: tvahAnkheVnel,
                                                setVal: (val) => {
                                                    setTvahAnkheVnel(val);
                                                    if (solam === 'רק קדמי') {
                                                        setMsbarBroAnkheVnel(parseInt(Math.floor(((parseFloat((rohav / 100))) / (parseFloat(val) / 100)) - 3)));
                                                    }
                                                    else if (solam === 'הכל' && daletAleon) {
                                                        setMsbarBroAnkheVnel(parseInt((Math.floor((parseFloat((rohav / 100)) / (parseFloat(val) / 100)) - 1) * 2) + (Math.floor((((parseFloat((aorkh / 100)) / (parseFloat(val) / 100)) - 1))) * 2)));
                                                    }
                                                    else {
                                                        setMsbarBroAnkheVnel(parseInt(Math.floor((parseFloat((rohav / 100)) / (parseFloat(val) / 100)) - 1) + (Math.floor((((parseFloat((aorkh / 100)) / (parseFloat(val) / 100)) - 1))) * 2)));
                                                    }
                                                }
                                            },
                                            {
                                                val: 'Input',
                                                chooises: "מס פרופילים",
                                                getVal: msbarBroAnkheVnel,
                                                setVal: (val) => { setMsbarBroAnkheVnel(val); setTvahAnkheVnel(0); }
                                            },
                                        )
                                    }
                                    <div className={`w-full border-t-1 mt-4 mb-4 ${(vnel !== 'בחר') && (gobahVnel || '') && (msgertVnel !== 'בחר') && (tvahAofkeVnel || '') && (msbarBroAofkeVnel || '') && (tvahAnkheVnel || '') && (msbarBroAnkheVnel || '') && 'border-primary-200'}`}></div>
                                </>
                            }
                            <div className="flex flex-col gap-1 w-full mb-20">
                                <CheckboxGroup
                                    label="תוספות"
                                    value={GetTosfotValues()}
                                    onChange={(value) => { }}
                                    classNames={{
                                        base: "w-full"
                                    }}
                                >
                                    <div className="w-full flex justify-center">
                                        <div className="max-w-[300px] w-full">
                                            {GetTosfotRows('tseba', 'צבע', rep58, ['D1'])}
                                            {GetTosfotRows('beshbol', 'פשפשול', rep48, ['A4', 'C11'])}
                                            {GetTosfotRows('kafRetom', 'כף ריתום', rep37, ['A5'])}
                                            {GetTosfotRows('mekhalMayem', 'מיכל מים', rep45, ['A6'])}
                                            {GetTosfotRows('argazKlem', 'ארגז כלים', rep17, ['A7'])}
                                            {GetTosfotRows('regelHnea', 'רגל חנייה', rep73, ['A9'])}
                                        </div>
                                    </div>
                                </CheckboxGroup>
                            </div>

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="border-t-2">
                    <div>
                        <Button className="mr-2 ml-2" color="warning" variant="flat" size="sm" onClick={() => setShowResetAllMessage(true)}>
                            שחזור
                        </Button>
                        <Button color='primary' variant="flat" size="sm" onClick={disable}>
                            אישור
                        </Button>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}


