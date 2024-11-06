import React, { useCallback, useEffect, useState } from "react";
import './Heshvonet.css';
import { FaLocationDot, FaPhoneFlip } from "react-icons/fa6";
import { FaCheck, FaWaze } from "react-icons/fa";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Radio, RadioGroup, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
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
import { GetTmonatHelek } from "../page";
import { format, parse } from "date-fns";

export const MtsavemPage = React.forwardRef((props, ref) => {

    const mtsav = props.mtsav;
    const tokhnet = props.tokhnet;
    const motsarem = props.motsarem;
    const mlae = props.mlae;
    const brtem = props.brtemKlalem;

    const GetBrtemMotsarMlae = useCallback((remez, shem) => {
        const motsarMlae = mlae?.filter(item => item.categoryMotsar === remez);
        const alot = motsarMlae?.find(item => item.shem === shem)?.alotLeheda || 0;
        const kmot = motsarMlae?.find(item => item.shem === shem)?.kmot || 0;
        const msbar = motsarMlae?.find(item => item.shem === shem)?.msbar || '';
        const id = motsarMlae?.find(item => item.shem === shem)?.id || '';
        return { arrayResualt: motsarMlae, alot, kmot, msbar, id };
    }, [mlae]);

    function flipDate(dateStr) {
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
      }
    

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
        return val2 === null ? <div className="w-full flex pr-4 pl-4 pt-2 pb-2">
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
                    <div className="flex items-center w-full h-full justify-center text-sm">
                        {val1}
                    </div>
                </div>
                <div className="w-full flex items-center">
                    {newArray}
                </div>
            </div>
    };

    const checkAemRemezMataem = useCallback((val) => {
        for (let index = 0; index < motsarem.motsaremLhatseg.length; index++) {
            if (motsarem.motsaremLhatseg[index] === val) {
                return true;
            }
        }
        return false;
    }, [motsarem.motsaremLhatseg]);

    const GetTypeElement = (value, insider) => {
        if (value?.val === 'Input') {
            return <Input isReadOnly type="number" size={insider === null ? 'xs' : 'sm'} variant='underlined' className={`pr-2 pl-2 ${value.getVal && 'text-primary'}`} color={value.getVal ? 'primary' : 'default'} value={value.getVal || ''} label={value.chooises} />
        }
        else if (value?.val === 'Radio') {
            return <RadioGroup
                size='xs'
                isReadOnly
                orientation="horizontal"
                value={value.getVal}
            >
                {
                    value?.chooises?.map((cho, index) => {
                        return <Radio key={index} value={cho}><div className="text-xs">{cho}</div></Radio>
                    })
                }
            </RadioGroup>
        }
        else if (value?.val === 'DropDown') {
            return <Input isReadOnly size={insider === null ? 'xs' : 'sm'} variant='underlined' className={`pr-2 pl-2 ${value.getVal && 'text-primary'}`} color={value.getVal ? 'primary' : 'default'} value={value.getVal} />
        }
        else if (value?.val === 'Toggle') {
            return <Switch isReadOnly size={insider === null ? 'xs' : 'sm'} isSelected={value.getVal} value={value.getVal} onValueChange={(val) => { value.setVal(val) }}><div className="mr-1 text-xs">{value.chooises}</div></Switch>
        }
        else if (value?.val === 'Image') {
            return <Image width={70} alt="none" src={value?.chooises} className={`border-1 rounded-full border-gray-400 ${insider === null ? ' h-[20px] w-[20px] ' : ' h-[40px] w-[40px] '}`} />
        }
        else {
            return <div className="text-right">{value || value?.val}</div>;
        }
    }

    const GetTosfotRows = (val1,val2,val3,val4) => {
        return <div className="text-xs flex items-center mt-2 border-b-1 pb-2">
            <div><Image src={val3} className="w-[30px] h-[30px]"/></div>
            <div className="mr-2 w-[70px]">{val2}</div>
            <div className="mr-2">{val1 && <FaCheck className="text-[19px] text-primary"/>}</div>
        </div>
    }

    return (
        <div ref={ref} className="bg-white h-full">
            <div className="flex justify-around items-center w-full border-b-2">
                <div className="border-r-2 pl-5 pr-5 w-full flex justify-around items-center">
                    <div className="text-sm">
                        <div className="flex items-center">
                            <div className="w-[100px] text-right">050-909-9989</div>
                            <div className="flex items-center"><FaPhoneFlip className="ml-2 text-base w-[30px]" /></div>
                        </div>
                        <div className="flex items-center mt-2">
                            <div className="w-[100px] text-right">ערערה גביש 65</div>
                            <div className="flex items-center"><FaLocationDot className="ml-2 text-xl w-[30px]" /></div>
                        </div>
                        <div className="flex items-center mt-2">
                            <div className="w-[100px] text-right">נגררי עירון 2020</div>
                            <div className="flex items-center"><FaWaze className="ml-2 text-xl w-[30px]" /></div>
                        </div>
                    </div>
                    <div className="ml-5">
                        <img className="w-[150px] h-[75px]" src='data:image/jpeg;base64,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' />
                    </div>
                    <div className="text-sm">
                        <div className="flex items-center">
                            <div className="w-[180px] text-right">ייצור נגררים לפי תוכנית לקוח</div>
                            <div className="flex items-center"><div className="ml-2 text-base w-[30px]">*</div></div>
                        </div>
                        <div className="flex items-center mt-2">
                            <div className="w-[180px] text-right">שיפוץ ותיקון נגררים</div>
                            <div className="flex items-center"><div className="ml-2 text-base w-[30px]">*</div></div>
                        </div>
                        <div className="flex items-center mt-2">
                            <div className="w-[180px] text-right">התקנת וו גרירה</div>
                            <div className="flex items-center"><div className="ml-2 text-base w-[30px]">*</div></div>
                        </div>
                    </div>
                </div>
                <div className="text-base font-bold text-center max-w-[150px] w-full">
                    תופס {mtsav}
                </div>
            </div>
            <div dir="rtl" className="p-3">
                <div className="tracking-widest border-b-1 font-black">פרטים כלליים</div>
                <div className="p-3 flex justify-around">
                    <div>
                        <div className="flex items-center"><div className="w-[130px]">סניף :</div><div className="mr-1">{brtem?.snef}</div></div>
                        <div className="flex items-center"><div className="w-[130px]">מס הזמנה :</div><div className="mr-1">{brtem?.msbarAglaHzmna}</div></div>
                        <div className="flex items-center"><div className="w-[130px]">שם לקוח :</div><div className="mr-1">{brtem?.shemlkoh}</div></div>
                        <div className="flex items-center"><div className="w-[130px]">תאריך הצעה :</div><div className="mr-1">{format(new Date(), 'dd-MM-yyyy')}</div></div>
                        <div className="flex items-center"><div className="w-[130px]">תאריך אספקה :</div><div className="mr-1">{brtem?.tarekhAsbka && flipDate(brtem?.tarekhAsbka)}</div></div>
                    </div>
                    <div>
                        <div className="flex items-center"><div className="w-[200px]">סכום הזמנה (לפני מע"מ) :</div><div className="mr-1">{brtem?.mherKlale || ''}</div></div>
                        <div className="flex items-center"><div className="w-[200px]">סכום הזמנה (אחרי מע"מ) :</div><div className="mr-1">{brtem?.mherKlaleAhre || ''}</div></div>
                        <div className="flex items-center"><div className="w-[200px]">מקדימה :</div><div className="mr-1">{brtem?.mkdema || ''}</div></div>
                        <div className="flex items-center"><div className="w-[200px]">מספר תשלומים :</div><div className="mr-1">{brtem?.msbarTshlomem || ''}</div></div>
                        <div className="flex items-center"><div className="w-[200px]">אמצעי תשלום :</div><div className="mr-1">{brtem?.tnaeTshlom || ''}</div></div>
                    </div>
                </div>
                {
                    brtem?.haraKlalet && <div className="border-t-1">
                        *הערות* : {brtem?.haraKlalet}
                    </div>
                }
            </div>
            <div dir="rtl" className="p-3">
                <div className="tracking-widest border-b-1 font-black">תוכנית</div>
                <div className="w-full max-w-[700px]"> {/* Inner content */}
                    <div className="w-full mt-4"></div>
                    {
                        GetRow(
                            '1',
                            true,
                            {
                                val: 'Image',
                                chooises: tokhnet?.sogAglaBS === 'פתוחה' ? rep6 : rep80,
                            },
                            'סוג עגלה',
                            {
                                val: 'Radio',
                                chooises: ['פתוחה', 'סגורה'],
                                getVal: tokhnet?.sogAglaBS,
                            },
                        )
                    }
                    <div className={`w-full border-t-1 mt-1 mb-1`}></div>
                    {
                        GetRow(
                            '2',
                            true,
                            {
                                val: 'Image',
                                chooises: rep77,
                            },
                            'שטח עגלה',
                            {
                                val: 'Input',
                                chooises: 'אורך בס"מ',
                                getVal: tokhnet?.aorkh,
                            },
                            {
                                val: 'Input',
                                chooises: 'רוחב בס"מ',
                                getVal: tokhnet?.rohav,
                            },
                        )
                    }
                    <div className={`w-full border-t-1 mt-1 mb-1`}></div>
                    {
                        GetRow(
                            '3',
                            true,
                            {
                                val: 'Image',
                                chooises: rep50,
                            },
                            'רצפה',
                            {
                                val: 'DropDown',
                                getVal: tokhnet?.retsba,
                            },
                        )
                    }
                    <div className={`w-full border-t-1 mt-1 mb-1`}></div>
                    {
                        GetRow(
                            '4',
                            true,
                            {
                                val: 'Image',
                                chooises: rep68,
                            },
                            'מספר צירים',
                            {
                                val: 'Radio',
                                chooises:['1','2'],
                                getVal: tokhnet?.msbarTsrem,
                            },
                            {
                                val: 'Toggle',
                                chooises: 'עם בלמים',
                                getVal: tokhnet?.AemBlamem,
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
                                getVal: tokhnet?.brofelTfesa,
                            },
                        )
                    }
                    <div className={`w-full border-t-1 mt-1 mb-1`}></div>
                    {
                        GetRow(
                            '5',
                            true,
                            {
                                val: 'Image',
                                chooises: rep20,
                            },
                            'צמיגים',
                            {
                                val: 'Radio',
                                chooises: ['פנימיים', 'חצוניים'],
                                getVal: tokhnet?.tsmgem,
                            },
                            {
                                val: 'Toggle',
                                chooises: 'צמיג ספר',
                                getVal: tokhnet?.tsmgSber,
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
                                getVal: tokhnet?.msgeretThtonah,
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
                                getVal: tokhnet?.hlokaThtonah,
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
                                getVal: tokhnet?.tvahHlokaThtona,
                            },
                            {
                                val: 'Input',
                                chooises: 'מס פרופילים',
                                getVal: tokhnet?.msbarBrofHlokaThotona,
                            },
                        )
                    }
                    <div className={`w-full border-t-1 mt-1 mb-1`}></div>
                    {
                        GetRow(
                            '6',
                            true,
                            {
                                val: 'Image',
                                chooises: rep15,
                            },
                            'יצול',
                            {
                                val: 'DropDown',
                                getVal: tokhnet?.yetsol,
                            },
                            {
                                val: 'Input',
                                chooises: `אורך פרופיל בס"מ`,
                                getVal: tokhnet?.aorkhBroYetsol,
                            },

                        )
                    }
                    <div className={`w-full border-t-1 mt-1 mb-1`}></div>
                    {
                        GetRow(
                            '7',
                            true,
                            {
                                val: 'Image',
                                chooises: rep9,
                            },
                            'שלדה חיצונית',
                            {
                                val: 'DropDown',
                                getVal: tokhnet?.sheldaHetsonet,
                            },
                        )
                    }
                    <div className={`w-full border-t-1 mt-1 mb-1`}></div>
                    {
                        GetRow(
                            '8',
                            true,
                            {
                                val: 'Image',
                                chooises: rep10,
                            },
                            'שלדה פנימית',
                            {
                                val: 'Input',
                                chooises: `טווח בס"מ`,
                                getVal: tokhnet?.tvahSheldaBnemet,
                            },
                            {
                                val: 'Input',
                                chooises: "מס פרופילים",
                                getVal: tokhnet?.msbarBroSheldaBnemet,
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
                                getVal: tokhnet?.helekReshonSheldaBnemet,
                            },
                            {
                                val: 'Input',
                                chooises: "מס פרופילים",
                                getVal: tokhnet?.msbarBroSheldaBnemetReshon,
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
                                getVal: tokhnet?.helekShneSheldaBnemet,
                            },
                            {
                                val: 'Input',
                                chooises: "מס פרופילים",
                                getVal: tokhnet?.msbarBroSheldaBnemetShne,
                            },
                        )
                    }
                    <div className={`w-full border-t-1 mt-1 mb-1`}></div>
                    {
                        tokhnet?.sogAglaBS === 'פתוחה' &&
                        <>
                            {
                                GetRow(
                                    '9',
                                    true,
                                    {
                                        val: 'Image',
                                        chooises: rep11,
                                    },
                                    'דלת',
                                    {
                                        val: 'Radio',
                                        chooises: ['רגיל', 'רמפה'],
                                        getVal: tokhnet?.dalet,
                                    },

                                )
                            }
                            {
                                tokhnet?.dalet === 'רמפה' && GetRow(
                                    '9.1',
                                    null,
                                    {
                                        val: 'Image',
                                        chooises: rep57,
                                    },
                                    'מסגרת רמפה',
                                    {
                                        val: 'DropDown',
                                        getVal: tokhnet?.msgertRmbaDalet,
                                    },
                                    {
                                        val: 'Input',
                                        chooises: `אורך רמפה בס"מ`,
                                        getVal: tokhnet?.msgertRmbaDaletAorkh,
                                    },
                                )
                            }
                            {
                                tokhnet?.dalet === 'רמפה' && GetRow(
                                    '9.2',
                                    null,
                                    {
                                        val: 'Image',
                                        chooises: rep57,
                                    },
                                    'חלוקת רמפה',
                                    {
                                        val: 'DropDown',
                                        getVal: tokhnet?.hlokatRmbaDalet,
                                    },

                                )
                            }
                            {
                                tokhnet?.dalet === 'רמפה' && GetRow(
                                    '',
                                    null,
                                    '9.2.1',
                                    {
                                        val: 'Input',
                                        chooises: `טווח בס"מ`,
                                        getVal: tokhnet?.hlokatRmbaDaletTvah,
                                    },
                                    {
                                        val: 'Input',
                                        chooises: "מס פרופילים",
                                        getVal: tokhnet?.hlokatRmbaDaletBro,
                                    },
                                )
                            }
                            {
                                tokhnet?.dalet === 'רמפה' && GetRow(
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
                                        getVal: tokhnet?.tosefetVnel,
                                    },
                                    tokhnet?.tosefetVnel && {
                                        val: 'DropDown',
                                        getVal: tokhnet?.toseftVnelBro,
                                    }
                                )
                            }

                            <div className={`w-full border-t-1 mt-1 mb-1`}></div>
                            {
                                GetRow(
                                    '10',
                                    true,
                                    {
                                        val: 'Image',
                                        chooises: rep13,
                                    },
                                    'סולם',
                                    {
                                        val: 'Radio',
                                        chooises: ['ללא', 'רק קדמי', 'הכל'],
                                        getVal: tokhnet?.solam,
                                    },
                                )
                            }
                            {
                                tokhnet?.solam !== 'ללא' && GetRow(
                                    '10.1',
                                    null,
                                    {
                                        val: 'Image',
                                        chooises: rep57,
                                    },
                                    'מסגרת סולם',
                                    {
                                        val: 'DropDown',
                                        getVal: tokhnet?.msgertSolam,
                                    },
                                    {
                                        val: 'Input',
                                        chooises: `גובה סולם בס"מ`,
                                        getVal: tokhnet?.gobahSolam,
                                    },
                                )
                            }
                            {
                                tokhnet?.solam !== 'ללא' && GetRow(
                                    '10.2',
                                    null,
                                    {
                                        val: 'Image',
                                        chooises: rep57,
                                    },
                                    'חלוקת סולם',
                                    {
                                        val: 'DropDown',
                                        getVal: tokhnet?.hlokatSolam,
                                    },
                                )
                            }
                            {
                                tokhnet?.solam !== 'ללא' && GetRow(
                                    '',
                                    null,
                                    '10.2.1',
                                    {
                                        val: 'Input',
                                        chooises: `טווח אופקי בס"מ`,
                                        getVal: tokhnet?.tvahAofkeSolam,
                                    },
                                    {
                                        val: 'Input',
                                        chooises: "מס פרופילים אופקי",
                                        getVal: tokhnet?.msbarBroAofkeSolam,
                                    },
                                )
                            }
                            {
                                tokhnet?.solam !== 'ללא' && GetRow(
                                    '',
                                    null,
                                    '10.2.2',
                                    {
                                        val: 'Input',
                                        chooises: `טווח אנכי בס"מ`,
                                        getVal: tokhnet?.tvahAnkheSolam,
                                    },
                                    {
                                        val: 'Input',
                                        chooises: "מס פרופילים אנכי",
                                        getVal: tokhnet?.msbarBroAnkheSolam,
                                    },
                                )
                            }
                            {
                                tokhnet?.solam === 'הכל' && GetRow(
                                    '10.3',
                                    null,
                                    '',
                                    'עם דלת עליון',
                                    {
                                        val: 'Toggle',
                                        chooises: '',
                                        getVal: tokhnet?.daletAleon,
                                    },
                                )
                            }
                            {
                                tokhnet?.solam === 'הכל' && GetRow(
                                    '10.4',
                                    null,
                                    '',
                                    'תוספת רשת',
                                    {
                                        val: 'Toggle',
                                        chooises: '',
                                        getVal: tokhnet?.toseftReshet,
                                    },
                                )
                            }
                            <div className={`w-full border-t-1 mt-1 mb-1`}></div>
                        </>
                    }
                    {
                        tokhnet?.sogAglaBS === 'סגורה' &&
                        <>
                            {
                                GetRow(
                                    '9',
                                    true,
                                    {
                                        val: 'Image',
                                        chooises: rep13,
                                    },
                                    'וניל',
                                    {
                                        val: 'DropDown',
                                        getVal: tokhnet?.vnel,
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
                                        getVal: tokhnet?.msgertVnel,
                                    },
                                    {
                                        val: 'Input',
                                        chooises: `גובה וניל בס"מ`,
                                        getVal: tokhnet?.gobahVnel,
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
                                        getVal: tokhnet?.tvahAofkeVnel,
                                    },
                                    {
                                        val: 'Input',
                                        chooises: "מס פרופילים",
                                        getVal: tokhnet?.msbarBroAofkeVnel,
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
                                        getVal: tokhnet?.tvahAnkheVnel,
                                    },
                                    {
                                        val: 'Input',
                                        chooises: "מס פרופילים",
                                        getVal: tokhnet?.msbarBroAnkheVnel,
                                    },
                                )
                            }
                            <div className={`w-full border-t-1 mt-1 mb-1`}></div>
                        </>
                    }
                </div>
                <div className="tracking-widest border-b-1 font-black mt-20">פירוט מוצרים</div>
                <div className="mt-3 flex justify-center items-center">
                    <Table dir="ltr" aria-label="Example static collection table" className="m-5">
                        <TableHeader>
                            <TableColumn className="text-right">מחיר</TableColumn>
                            <TableColumn className="text-right">כמות</TableColumn>
                            <TableColumn className="text-right">שם מוצר</TableColumn>
                        <TableColumn className="text-right"></TableColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            motsarem.motsaremBrofelem.map((motsar, index) => (
                                motsar.shem && motsar.kmot &&  <TableRow key={index}>
                                    <TableCell className="text-right">{parseFloat(motsar.kmot * GetBrtemMotsarMlae(motsar?.remez, motsar?.shem).alot).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{motsar.kmot || '0'}</TableCell>
                                    <TableCell className="text-right">{motsar.shem || 'אין'}</TableCell>
                                    <TableCell className="text-right">{<Image className="w-[20px] h-[20px]" src={GetTmonatHelek(motsar.remez,GetBrtemMotsarMlae(motsar?.remez, motsar?.shem)?.msbar)}/>}</TableCell>
                                </TableRow>
                            ))
                        }
                        {
                            motsarem.motsaremRglem.map((motsar, index) => (
                                checkAemRemezMataem(motsar?.remez) && motsar.shem && motsar.kmot && <TableRow key={index}>
                                    <TableCell className="text-right">{parseFloat(motsar.kmot * GetBrtemMotsarMlae(motsar?.remez, motsar?.shem).alot).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{motsar.kmot || '0'}</TableCell>
                                    <TableCell className="text-right">{motsar.shem || 'אין'}</TableCell>
                                    <TableCell className="text-right">{<Image className="w-[20px] h-[20px]" src={GetTmonatHelek(motsar.remez,GetBrtemMotsarMlae(motsar?.remez, motsar?.shem)?.msbar)}/>}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                </div>

            </div>
        </div>
    )
})






