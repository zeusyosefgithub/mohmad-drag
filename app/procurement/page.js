'use client';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Input, Button, Divider, Autocomplete, AutocompleteItem, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner, Switch } from '@nextui-org/react';
import { FiPlus } from "react-icons/fi";
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from "react-icons/fa";
import { RiDeleteBackFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import ModalAddSobak from '../Modals/ModalAddSbak';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import GetDocs from '../FireBase/getDocs';
import ModalAddProductCategory from '../Modals/ModalAddProductCategory';
import { useGetDataByCondition, useGetDataByConditionWithoutUseEffect, useGetDataByConditionWithoutUseEffectWithTwo, useGetDataByLimit } from '../FireBase/getDataByCondition';
import { addDoc, collection, count, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../FireBase/firebase';
import { differenceInDays, format, formatDistanceToNow, isValid, parse } from 'date-fns';
import ModalShowBerotAska from '../Modals/ModalShowBerotAska';
import Image from 'next/image';
import { GetTmonatHelek } from '../page';
import ContactContext from '../auth/ContactContext';
import ModalMtsavMlae from '../Modals/ModalMtsavMlae';
import { SferatMlae } from '../Page Components/SferatMlae';
import { useReactToPrint } from 'react-to-print';
import ModalMessage from '../Modals/ModalMessage';
import ModalZmanAbodaMotsar from '../Modals/ModalZmanAbodaMotsar';
import rep6 from '../../images/rep6.png';
import rep23 from '../../images/rep23.png';
import rep55 from '../../images/rep55.jpg';
import rep83 from '../../images/rep83.png';
import rep84 from '../../images/rep84.jpg';
import rep85 from '../../images/rep85.jpg';
import rep86 from '../../images/rep86.jpg';
import rep87 from '../../images/rep87.jpg';
import rep88 from '../../images/rep88.png';
import rep89 from '../../images/rep89.jpg';
import rep90 from '../../images/rep90.jpg';
import { FaEdit } from "react-icons/fa";
import ModalAdconBret from '../Modals/ModalAdconBret';


export default function Procurement() {




    const aglotB = useGetDataByCondition('tfaol', 'sogBaola', '==', 'B');

    const { contactName, setContactName, customerSet, setCustomerSet, isNehol, setIsNehol } = useContext(ContactContext);
    const category = GetDocs('category');
    const mlae = GetDocs('mlae').sort((a, b) => {
        const msbarA = a.msbar.toUpperCase();
        const msbarB = b.msbar.toUpperCase();

        if (msbarA < msbarB) return -1;
        if (msbarA > msbarB) return 1;
        return 0;
    });
    const [showModalAddProductCategory, setShowModalAddProductCategory] = useState(false);
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hodatMhekatMotsar, setHodatMhekatMotsar] = useState(false);
    const [motsarMhekaItem, setMotsarMhekaItem] = useState(null);
    const [motsarMhekaCat, setMotsarMhekaCat] = useState(null);
    const [showModalZmanAbodaMotsar, setShowModalZmanAbodaMotsar] = useState(false);
    const categoryRefs = useRef(Array(10).fill(null).map(() => React.createRef()));
    const [showModalMtsavMlae, setShowModalMtsavMlae] = useState(false);

    console.log(mlae);


    const GetMotsaremBalem = () => {
        let newArrray = [];
        for (let index = 0; index < mlae.length; index++) {
            if (mlae[index].active) {
                newArrray.push(mlae[index]);
            }
        }
        return newArrray;
    }


    const activeMlae = GetMotsaremBalem();

    function adconMhekatMotsar(val1, val2) {
        let newArray = [];
        let newArrayMotsarem = [];
        for (let index = 0; index < category.length; index++) {
            if (val2 === category[index].id) {
                for (let index1 = 0; index1 < category[index]?.motsarem?.length; index1++) {
                    if (category[index]?.motsarem[index1].sog === val1) {
                        newArrayMotsarem.push({
                            dlbak: 0,
                            mededa: category[index]?.motsarem[index1].mededa - 1,
                            shem: category[index]?.motsarem[index1].shem,
                            sog: category[index]?.motsarem[index1].sog,
                        });
                    }
                    else {
                        newArrayMotsarem.push(category[index]?.motsarem[index1]);
                    }
                }
                newArray.push({ ...category[index], motsarem: newArrayMotsarem });
            }
            else {
                newArray.push(category[index]);
            }
        }
        return newArrayMotsarem;
    }

    const GetBrtemMotsarMlae = useCallback((remez, shem) => {
        const motsarMlae = mlae?.filter(item => item.categoryMotsar === remez);
        const alot = motsarMlae?.find(item => item.shem === shem)?.alotLeheda || 0;
        const kmot = motsarMlae?.find(item => item.shem === shem)?.kmot || 0;
        const hozman = motsarMlae?.find(item => item.shem === shem)?.hozman || 0;
        const id = motsarMlae?.find(item => item.shem === shem)?.id || 0;
        return { arrayResualt: motsarMlae, alot, kmot, hozman, id };
    }, [mlae]);

    function sumByRemez(arr) {
        const result = [];
        arr.forEach(item => {
            const existingItem = result.find(obj => obj.remez === item.remez);
            if (existingItem) {
                existingItem.kmot += item.kmot;
            } else {
                console.log(item);
                result.push({ kmot: item.kmot, remez: item.remez, shem: item.shem });
            }
        });
        return result;
    }
    const formatNumberWithCommas = (num) => {
        return parseFloat(num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')).toFixed(2);
    };

    const GetKmotMtaema = (mededa, val, msbar) => {
        if (mededa === 'Y') {
            return <div className='flex items-center justify-end text-primary' dir='ltr'><div className='mr-1'>'יח</div><div className='font-bold'>{parseFloat(val).toFixed(2)}</div></div>;
        }
        if (mededa === 'M') {
            return <div className='flex items-center justify-end text-primary' dir='ltr'><div className='mr-1'>'מ</div><div className='font-bold'>{parseFloat(val).toFixed(2)}</div></div>;
        }
        if (mededa === 'MS') {
            return <div className='flex items-center justify-end text-primary' dir='ltr'><div className='mr-1'>מ"ר</div><div className='font-bold'>{parseFloat(val).toFixed(2)}</div></div>;
        }
        if (mededa === 'L') {
            return <div className='flex items-center justify-end text-primary' dir='ltr'><div className='mr-1'>'ל</div><div className='font-bold'>{parseFloat(val).toFixed(2)}</div></div>;
        }
        if (mededa === 'MM') {
            return;
        }
        if (mededa === 'K') {
            if (msbar === 'G400') {
                return <div className='flex items-center justify-end text-primary' dir='ltr'><div className='mr-1'>ק"ג</div><div className='font-bold'>{parseFloat(val).toFixed(2)}</div></div>;
            }
            else {
                return <div className='flex items-center justify-end text-primary' dir='ltr'><div className='mr-1'>ק"ג</div><div className='text-4xl'>∞</div></div>;
            }
        }

    }

    const GetMotsarMededa = (val) => {
        console.log(val);
        for (let index = 0; index < category.length; index++) {
            for (let index1 = 0; index1 < category[index].motsarem.length; index1++) {
                if (category[index].motsarem[index1].sog === val) {
                    console.log(123);
                    return category[index].motsarem[index1].mededa;
                }
            }
        }
    }

    const GetMotsarHoreg = () => {
        let newArray = [];
        for (let index1 = 0; index1 < aglotB?.length; index1++) {
            for (let index = 0; index < aglotB[index1]?.newMafeneMotsarem?.length; index++) {
                if (aglotB[index1].newMafeneMotsarem[index].kmot > GetBrtemMotsarMlae(aglotB[index1].newMafeneMotsarem[index].remez, aglotB[index1].newMafeneMotsarem[index].shem).kmot) {
                    newArray.push(aglotB[index1].newMafeneMotsarem[index]);
                }
            }
        }
        console.log(newArray);
        let reduced = sumByRemez(newArray);
        let newArray2 = [];
        for (let index = 0; index < reduced.length; index++) {
            console.log(reduced[index]);
            newArray2.push(<>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 text-xs"><Switch
                        isSelected={GetBrtemMotsarMlae(reduced[index].remez, reduced[index].shem).hozman} onValueChange={async (val) => {
                            await updateDoc(doc(firestore, 'mlae', GetBrtemMotsarMlae(reduced[index].remez, reduced[index].shem).id), {
                                hozman: val
                            })
                        }} defaultValue={GetBrtemMotsarMlae(reduced[index].remez, reduced[index].shem).hozman} value={GetBrtemMotsarMlae(reduced[index].remez, reduced[index].shem).hozman}>
                    </Switch></td>
                    <td className="px-4 py-3 text-center text-danger-500 dark:text-gray-200 text-xs">{GetKmotMtaema(GetMotsarMededa(reduced[index].remez), reduced[index].kmot - GetBrtemMotsarMlae(reduced[index].remez, reduced[index].shem).kmot)}</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 text-xs">{reduced[index].shem}</td>
                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 text-xs"><div className="group relative">
                        <Image src={GetTmonatHelek(reduced[index].remez)} className="h-[50px] w-[50px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg hover:z-50 bg-white group-hover:translate-x-[-220%]" />
                    </div></td>
                </tr>
            </>);

        }
        return newArray2;
    }

    const GetTmonatHelekCategory = (val) => {
        if (val === 'חלקים גדולים') {
            return rep86;
        }
        if (val === 'מתכות') {
            return rep84;
        }
        if (val === 'חלקים קטנים') {
            return rep87;
        }
        if (val === 'צבעים') {
            return rep88;
        }
        if (val === 'מדביקות') {
            return rep90;
        }
        if (val === 'אורות וחשמל') {
            return rep85;
        }
        if (val === 'חומרי עזר') {
            return rep89;
        }
        if (val === 'פסולת') {
            return rep55;
        }
        if (val === 'ווי גרירה') {
            return rep23;
        }
        if (val === 'מוצרים אחרים') {
            return rep83;
        }
        if (val === 'עגלות') {
            return rep6;
        }
    }

    const [showModalAdconBret, setShowModalAdconBret] = useState(false);
    return (
        <div className='h-full'>
            {<ModalMessage Aeshor={async (val) => {
                if (val) {
                    setLoading(true);
                    await updateDoc(doc(firestore, 'mlae', motsarMhekaItem.id), {
                        active: false
                    });
                    await updateDoc(doc(firestore, 'category', motsarMhekaCat.id), {
                        dlbak: motsarMhekaCat?.dlbak - 1,
                        motsarem: adconMhekatMotsar(motsarMhekaItem.categoryMotsar, motsarMhekaCat.id)
                    })
                    setLoading(false);
                }
            }} message={motsarMhekaItem?.kmot > 0 ? `אסור למחוק המוצר ${motsarMhekaItem?.shem} ויש כמות במלאי!!` : `האם אתה בטוח למחוק המוצר ${motsarMhekaItem?.shem} מהמלאי!!`} motsar={motsarMhekaItem} show={hodatMhekatMotsar} disable={() => setHodatMhekatMotsar(false)} />}
            <ModalAdconBret motsarem={mlae} motsar={motsarMhekaItem} categoryMotsar={motsarMhekaCat} show={showModalAdconBret} disable={() => setShowModalAdconBret(false)} />
            {<ModalZmanAbodaMotsar category={category} show={showModalZmanAbodaMotsar} disable={() => setShowModalZmanAbodaMotsar(false)} />}
            {<ModalMtsavMlae activeMlae={activeMlae} category={category} mlae={mlae} show={showModalMtsavMlae} disable={() => setShowModalMtsavMlae(false)} />}
            {<ModalAddProductCategory mlae={mlae} category={categoryData} show={showModalAddProductCategory} disable={() => setShowModalAddProductCategory(false)} />}
            {loading && <Spinner className='absolute top-0 left-0 bottom-0 right-0' />}

            <div className='flex items-center justify-around flex-wrap lg:flex-nowrap h-full'>
                <div className="w-1/3 h-full">
                    <div className="flex justify-around h-full">
                        <div className="w-full h-full mx-auto border border-gray-300 bg-white shadow-lg p-5 rounded-3xl">
                            <div className="bg-gradient-to-r from-white to-warning-500 tracking-widest text-black font-extrabold text-base p-1 mb-3 text-center rounded-lg shadow-2xl transform transition-transform hover:scale-105">
                                מוצרים חסרים
                            </div>
                            {
                                <div className="overflow-x-auto h-full">
                                    <table className="w-full table-auto border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800">
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black text-xs">הוזמן/לא הוזמן</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black text-xs">כמות חסרה</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black text-xs">שם פריט</th>
                                                <th className="px-4 py-2 text-center bg-gradient-to-r from-gray-500 to-gray-600 font-medium text-black text-xs"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                GetMotsarHoreg()
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full h-full flex mr-5 ml-5 max-w-[1190px]'>

                    <div className='rounded-l-2xl shadow-2xl w-full h-full flex flex-col bg-white'>
                        <div className='text-center text-2xl flex justify-around p-[19px] items-center'>
                            <Button onClick={() => setShowModalZmanAbodaMotsar(true)}>זמני עבודה</Button>
                            <Button onClick={() => setShowModalMtsavMlae(true)}>ספירת מלאי</Button>
                            <div className='text-primary font-extrabold'>מלאי</div>
                        </div>
                        <Divider className='mb-5' />
                        <div className='p-5 overflow-auto h-full'>
                            {
                                category.map((cat, index) => {
                                    return <div key={index} ref={categoryRefs.current[index]} className='bg-white rounded-lg p-2'>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex items-center w-[200px]'>
                                                <Button size='sm' onClick={() => { setShowModalAddProductCategory(true); setCategoryData(cat) }} className='mr-3'><FaPlus className='text-xl' />מוצר חדש</Button>
                                            </div>
                                            <div className='text-base'>
                                                {
                                                    cat.dlbak > 0 ?
                                                        <div>מוצרים {cat.dlbak}</div>
                                                        :
                                                        <div className='text-danger'>אין מוצרים כרגע</div>
                                                }
                                            </div>
                                            <div className='flex justify-end items-center w-[200px]'>
                                                <div className='mr-3 text-base'>{cat.shem}</div>
                                                <div className="group relative">
                                                    <Image src={GetTmonatHelekCategory(cat?.shem)} className="rounded-full h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg hover:z-50 bg-slate-400 group-hover:translate-x-[-220%]" />
                                                </div>
                                            </div>
                                        </div>
                                        <table className="w-full table-auto border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100 dark:bg-gray-800 top-[-22px] sticky z-30">
                                                    <th className="px-4 py-3 text-right font-bolder text-black text-sm"></th>
                                                    <th className="px-4 py-3 text-right font-bolder text-black text-sm"></th>
                                                    <th className="px-4 py-3 text-right font-bolder text-black text-sm">זמן הספקה</th>
                                                    <th className="px-4 py-3 text-right font-bolder text-black text-sm">עלות ממוצע</th>
                                                    <th className="px-4 py-3 text-right font-bolder text-black text-sm">סה"כ עלות</th>
                                                    <th className="px-4 py-3 text-right font-bolder text-black text-sm w-[100px]">כמות</th>
                                                    <th className="px-4 py-3 text-right font-bolder text-black text-sm">מדף</th>
                                                    <th className="px-4 py-3 text-right font-bolder text-black text-sm w-[200px]">שם פריט</th>
                                                    <th className="px-4 py-3 text-right font-bolder text-black text-sm">מק"ט</th>
                                                    <th className="px-4 py-3 text-right font-bolder text-black text-sm"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cat?.motsarem?.map((motsar, index1) => (
                                                    mlae.map((item, index) => {
                                                        return (item.categoryMotsar === motsar.sog) && (item.active) && <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs"><FaTrash onClick={() => { setHodatMhekatMotsar(true); setMotsarMhekaItem(item); setMotsarMhekaCat(cat); }} className='text-danger text-lg cursor-pointer' /></td>
                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs"><FaEdit onClick={() => { setShowModalAdconBret(true); setMotsarMhekaItem(item); setMotsarMhekaCat(cat); }} className='text-primary text-lg cursor-pointer' /></td>
                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">{item.zmanHsbaka}</td>
                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">₪{item.alotLeheda}</td>
                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">₪{parseFloat(item.alot).toFixed(2)}</td>
                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">{GetKmotMtaema(item.mededa, item.kmot, item.msbar)}</td>
                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">{item.msbarMdaf}</td>
                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs"><div dir='rtl'>{item.shem}</div></td>
                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">{item.msbar}</td>
                                                            <td>
                                                                <div className="group relative">
                                                                    <Image src={GetTmonatHelek(item.categoryMotsar, item?.msbar)} className="h-[50px] w-[50px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg hover:z-50 bg-white group-hover:translate-x-[-220%]" />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    })
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className='min-w-[180px] h-full rounded-r-2xl p-1 bg-white flex flex-col '>
                        {
                            category.map((cat, index) => {
                                return <>
                                    <div className='text-center text-[15px] m-auto'>
                                        <Button onClick={() => categoryRefs.current[index]?.current?.scrollIntoView({ behavior: 'smooth' })} color='primary' variant='faded' className='w-[100px]'>{cat?.shem}</Button>
                                    </div>
                                    {
                                        index !== (category.length - 1) && <Divider className='mt-[12px] mb-[12px]' />
                                    }
                                </>
                            })
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}







