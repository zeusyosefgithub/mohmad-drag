'use client';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Input, Button, Divider, Autocomplete, AutocompleteItem, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner, Switch, Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
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
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowForward } from 'react-icons/io';


export default function Procurement() {

    const category = GetDocs('category');
    const mlae = GetDocs('mlae').find((count) => count.id === 'Ara')?.motsarem?.sort((a, b) => {
        const msbarA = a?.msbar?.toUpperCase();
        const msbarB = b?.msbar?.toUpperCase();

        if (msbarA < msbarB) return -1;
        if (msbarA > msbarB) return 1;
        return 0;
    });

    const mlae2 = GetDocs('mlae').find((count) => count.id === 'MaleAfraem')?.motsarem?.sort((a, b) => {
        const msbarA = a?.msbar?.toUpperCase();
        const msbarB = b?.msbar?.toUpperCase();

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
    const [showModalMtsavMlae, setShowModalMtsavMlae] = useState(false);


    const GetMotsaremBalem = () => {
        let newArrray = [];
        for (let index = 0; index < mlae?.length; index++) {
            if (mlae[index].active) {
                newArrray.push(mlae[index]);
            }
        }
        return newArrray;
    }

    
    const activeMlae = GetMotsaremBalem();

    const GetKmotMtaema = (mededa, val, msbar,nsbar,mtsavNsbar) => {
        if(nsbar){
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
        else{
            return <div className='flex items-center justify-end text-primary' dir='ltr'><div className={`font-bold text-${GetTsebaMataemLmtsavNsbar(mtsavNsbar)}`}>{mtsavNsbar}</div></div>;
        }
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
    const [snefMlae, setSnefMlae] = useState('A');

    const GetAdconMotsarem = (motsarShem, array) => {
        return array.map(item => {
            if (item.shem === motsarShem) {
                return {
                    ...item,
                    active: false,
                };
            }
            return item;
        });
    };

    const GetCountCatSog = (val, array) => {
        let count = 0;
        for (let index = 0; index < array?.length; index++) {
            if (array[index].category === val) {
                count++;
            }
        }
        return count;
    }

    const GetTsebaMataemLmtsavNsbar = (val) => {
        if(val === 'ריק'){
            return 'danger';
        }
        else if(val === 'חסר'){
            return 'warning';
        }
        else if(val === 'מספיק'){
            return 'success';
        }
        else{
            return 'success';
        }
    }

    return (
        <div className='h-full p-5'>
            {<ModalMessage Aeshor={async (val) => {
                if (val) {
                    setLoading(true);
                    await updateDoc(doc(firestore, 'mlae', snefMlae === 'A' ? 'Ara' : 'MaleAfraem'), {
                        motsarem: GetAdconMotsarem(motsarMhekaItem.shem, snefMlae === 'A' ? mlae : mlae2)
                    });
                    setLoading(false);
                }
            }} message={motsarMhekaItem?.kmot > 0 ? `אסור למחוק המוצר ${motsarMhekaItem?.shem} ויש כמות במלאי!!` : `האם אתה בטוח למחוק המוצר ${motsarMhekaItem?.shem} מהמלאי!!`} motsar={motsarMhekaItem} show={hodatMhekatMotsar} disable={() => setHodatMhekatMotsar(false)} />}
            <ModalAdconBret snefMlae={snefMlae === 'A' ? "עארה" : "מעלה אפריים"} motsarem={mlae} mlae={mlae} mlae2={mlae2} motsar={motsarMhekaItem} categoryMotsar={motsarMhekaCat} show={showModalAdconBret} disable={() => setShowModalAdconBret(false)} />
            {<ModalZmanAbodaMotsar category={category} show={showModalZmanAbodaMotsar} disable={() => setShowModalZmanAbodaMotsar(false)} />}
            {<ModalMtsavMlae snefMlae={snefMlae === 'A' ? 'Ara' : 'MaleAfraem'} activeMlae={activeMlae} category={category} mlae={snefMlae === 'A' ? mlae : mlae2} show={showModalMtsavMlae} disable={() => setShowModalMtsavMlae(false)} />}
            {<ModalAddProductCategory snefMlae={snefMlae === 'A' ? "עארה" : "מעלה אפריים"} mlae={mlae} mlae2={mlae2} category={categoryData} show={showModalAddProductCategory} disable={() => setShowModalAddProductCategory(false)} />}
            {loading && <Spinner className='absolute top-0 left-0 bottom-0 right-0' />}





            {/* <div className='flex items-center justify-around flex-wrap lg:flex-nowrap h-full'>
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
                                                    mlae?.map((item, index) => {
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

            </div> */}


            <div dir="rtl" className="w-full h-full flex flex-col max-h-[92%] overflow-hidden">
                <Card className="h-full flex flex-col">
                    <CardBody className="h-full flex flex-col overflow-hidden">
                        <AnimatePresence mode="wait">
                            {snefMlae === "A" && (
                                <motion.div
                                    key="A"
                                    dir="rtl"
                                    className="w-full h-full flex flex-col"
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex items-center border-b-1 pb-2">
                                        <Button onClick={() => setShowModalMtsavMlae(true)}>ספירת מלאי</Button>
                                        <div className="font-bold mr-5">מלאי עארה</div>
                                        <div className="inline-block hover:animate-move-arrows cursor-pointer">
                                            <IoIosArrowForward
                                                onClick={() => setSnefMlae("B")}
                                                className="text-4xl transform scale-x-[-1] hover:text-primary"
                                            />
                                        </div>
                                    </div>
                                    <div dir='ltr' className="flex-grow p-3 overflow-auto">
                                        {
                                            category?.map((cat, index) => {
                                                return <div key={index} className='bg-white rounded-lg p-2 shadow-xl mb-5'>
                                                    <div className='flex justify-between items-center mb-2'>
                                                        <div className='flex items-center w-[200px]'>
                                                            <Button variant='flat' color='primary' size='sm' onClick={() => { setShowModalAddProductCategory(true); setCategoryData(cat) }} className='mr-3'><FaPlus className='text-xl' />מוצר חדש</Button>
                                                        </div>
                                                        <div className='text-base'>
                                                            {
                                                                GetCountCatSog(cat.id,mlae) > 0 ?
                                                                    <div>מוצרים {GetCountCatSog(cat.id,mlae)}</div>
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
                                                                <th className="px-4 py-3 text-right font-bolder text-black text-sm">מחיר מכירה</th>
                                                                <th className="px-4 py-3 text-right font-bolder text-black text-sm">סה"כ עלות</th>
                                                                <th className="px-4 py-3 text-right font-bolder text-black text-sm">עלות לי"ח</th>
                                                                <th className="px-4 py-3 text-right font-bolder text-black text-sm">כמות</th>
                                                                <th className="px-4 py-3 text-right font-bolder text-black text-sm">מדף</th>
                                                                <th className="px-4 py-3 text-right font-bolder text-black text-sm">שם פריט</th>
                                                                <th className="px-4 py-3 text-right font-bolder text-black text-sm"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cat?.motsarem?.map((motsar, index1) => (
                                                                mlae?.map((item, index) => {
                                                                    return (item.categoryMotsar === motsar.sog) && (item.active) && <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs"><FaTrash onClick={() => { setHodatMhekatMotsar(true); setMotsarMhekaItem(item); setMotsarMhekaCat(cat); }} className='text-danger text-lg cursor-pointer' /></td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs"><FaEdit onClick={() => { setShowModalAdconBret(true); setMotsarMhekaItem(item); setMotsarMhekaCat(cat); }} className='text-primary text-lg cursor-pointer' /></td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">{item.mherMkhera}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">₪{parseFloat(item.alot).toFixed(2)}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">₪{item.alotLeheda}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">{GetKmotMtaema(item.mededa, item.kmot, item.msbar,item.nsbar,item.mtsavNsbar)}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">{item.msbarMdaf}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs"><div dir='rtl'>{item.shem}</div></td>
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
                                </motion.div>
                            )}
                            {snefMlae === "B" && (
                                <motion.div
                                    key="B"
                                    dir="rtl"
                                    className="w-full h-full flex flex-col"
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex items-center border-b-1 pb-2">
                                        <Button onClick={() => setShowModalMtsavMlae(true)}>ספירת מלאי</Button>
                                        <div className="font-bold mr-5">מלאי מעלה אפריים</div>
                                        <div className="inline-block hover:animate-move-arrows cursor-pointer">
                                            <IoIosArrowForward
                                                onClick={() => setSnefMlae("A")}
                                                className="text-4xl transform scale-x-[-1] hover:text-primary"

                                            />
                                        </div>
                                    </div>
                                    <div dir='ltr' className="flex-grow p-3 overflow-auto">
                                        {
                                            category?.map((cat, index) => {
                                                return <div key={index} className='bg-white rounded-lg p-2 shadow-xl mb-5'>
                                                    <div className='flex justify-between items-center mb-2'>
                                                        <div className='flex items-center w-[200px]'>
                                                            <Button variant='flat' color='primary' size='sm' onClick={() => { setShowModalAddProductCategory(true); setCategoryData(cat) }} className='mr-3'><FaPlus className='text-xl' />מוצר חדש</Button>
                                                        </div>
                                                        <div className='text-base'>
                                                        {
                                                                GetCountCatSog(cat.id,mlae2) > 0 ?
                                                                    <div>מוצרים {GetCountCatSog(cat.id,mlae2)}</div>
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
                                                                <th className="px-4 py-3 text-right font-bolder text-black text-sm">כמות</th>
                                                                <th className="px-4 py-3 text-right font-bolder text-black text-sm">מדף</th>
                                                                <th className="px-4 py-3 text-right font-bolder text-black text-sm">שם פריט</th>
                                                                <th className="px-4 py-3 text-right font-bolder text-black text-sm"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cat?.motsarem?.map((motsar, index1) => (
                                                                mlae2?.map((item, index) => {
                                                                    return (item.categoryMotsar === motsar.sog) && (item.active) && <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs"><FaTrash onClick={() => { setHodatMhekatMotsar(true); setMotsarMhekaItem(item); setMotsarMhekaCat(cat); }} className='text-danger text-lg cursor-pointer' /></td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs"><FaEdit onClick={() => { setShowModalAdconBret(true); setMotsarMhekaItem(item); setMotsarMhekaCat(cat); }} className='text-primary text-lg cursor-pointer' /></td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">{item.zmanHsbaka}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">₪{item.alotLeheda}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">₪{parseFloat(item.alot).toFixed(2)}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">{GetKmotMtaema(item.mededa, item.kmot, item.msbar,item.nsbar,item.mtsavNsbar)}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs">{item.msbarMdaf}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200 text-xs"><div dir='rtl'>{item.shem}</div></td>
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
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardBody>
                </Card>
            </div>

        </div>
    )
}







