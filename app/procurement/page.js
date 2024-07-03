'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Input, Button, Divider, Autocomplete, AutocompleteItem, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from '@nextui-org/react';
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
import { differenceInDays, format, formatDistanceToNow,isValid, parse } from 'date-fns';
import ModalShowBerotAska from '../Modals/ModalShowBerotAska';
import Image from 'next/image';
import { GetTmonatHelek } from '../page';
import ContactContext from '../auth/ContactContext';
import ModalMtsavMlae from '../Modals/ModalMtsavMlae';
import { SferatMlae } from '../Page Components/SferatMlae';
import { useReactToPrint } from 'react-to-print';
import ModalMessage from '../Modals/ModalMessage';


export default function Procurement() {

    const componentRefOne = useRef();
    const handelPrintHeshvonit = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRefOne.current,
    });
    const { contactName, setContactName, customerSet, setCustomerSet } = useContext(ContactContext);
    const [sbak, setSbak] = useState('');
    const [sbakID, setSbakID] = useState(null);
    const [entries, setEntries] = useState([{ category: '', id: '', sogMotsar: '', remez: '', amount: '', price: '' }]);
    const sbkemA = useGetDataByCondition('sbkem', 'sherot', '==', 'A');
    const category = GetDocs('category');
    const mlae = GetDocs('mlae');
    const [hestoriaKneot, setHestoriaKneot] = useState([]);
    const containerRef = useRef(null);
    const endOfFormRef = useRef(null);
    const topOfFormRef = useRef(null);
    const [showModalAddProductCategory, setShowModalAddProductCategory] = useState(false);
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showBerotAska, setShowBerotAska] = useState(false);
    const [showModalAddSbak, setShowModalAddSbak] = useState(false);
    const [aska, setAska] = useState(null);

    const handleInputChange = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };
    const handleAddFields = () => {
        setEntries([...entries, { category: '', id: '', remez: '', sogMotsar: '', amount: '', price: '' }]);
        setTimeout(() => {
            scrollToBottomRef();
        }, 100);
    };
    const scrollToBottomRef = () => {
        const scrollableContainer = containerRef.current;
        const targetElement = endOfFormRef.current;
        if (scrollableContainer && targetElement) {
            const topPos = targetElement.offsetTop;
            scrollableContainer.scrollTo({
                top: topPos,
                behavior: "smooth"
            });
        }
    };
    const scrollToRef = () => {
        const scrollableContainer = containerRef.current;
        const topElement = topOfFormRef.current;
        if (scrollableContainer && topElement) {
            scrollableContainer.scrollTo({
                top: topElement.offsetTop,
                behavior: "smooth"
            });
        }
    };
    function removeItem(index) {
        const newItems = entries.filter((item, idx) => idx !== index);
        setEntries(newItems);
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
    function truncateToTwoDecimals(num) {
        // Convert the number to a string with two decimal places
        const truncatedNum = num.toFixed(2);
        return truncatedNum;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const counterRef = doc(firestore, 'metadata', 'counterTnoahBkneot');
        const counterSnap = await getDoc(counterRef);
        for (let index = 0; index < entries.length; index++) {
            let data = GetMsbarMotsar(entries[index].id);
            await updateDoc(doc(firestore, 'mlae', data.id), {
                kmot: (parseFloat(data.kmot) + parseFloat(entries[index].amount)),
                alot: ((parseFloat(entries[index].price) * parseFloat(entries[index].amount)) + parseFloat(data.alot)),
                alotLeheda: truncateToTwoDecimals(parseFloat(((parseFloat(entries[index].amount) * parseFloat(entries[index].price)) + parseFloat(data.alot)) / (parseFloat(entries[index].amount) + parseFloat(data.kmot)))),
                sakhHkolKneot: (parseFloat(data.sakhHkolKneot) + parseFloat(entries[index].amount))
            });
        }
        const tnoah = {
            berot: convertStringEnteries(entries),
            msbar: counterSnap.data().count,
            skhom: GetTotalPriceShop(entries),
            shaa: format(new Date, 'HH:mm'),
            tarekh: format(new Date, 'yyyy-MM-dd'),
            msbarSbak: sbakID
        }
        console.log(tnoah);
        try {
            await addDoc(collection(firestore, 'tnoahBkneot'), tnoah);
        }
        catch (e) {
            console.log(e);
        }
        await updateDoc(doc(firestore, 'metadata', 'counterTnoahBkneot'), { count: (counterSnap.data().count + 1) });
        setEntries([{ category: '', id: '', remez: '', sogMotsar: '', amount: '', price: '' }]);
        setLoading(false);
    };

    function GetMsbarMotsar(val) {
        for (let index = 0; index < mlae.length; index++) {
            if (mlae[index].shem === val) {
                return mlae[index];
            }
        }
    }

    function convertStringEnteries(val) {
        let res = [];
        for (let index = 0; index < val.length; index++) {
            res.push({
                amount: parseFloat(val[index].amount),
                category: val[index].category,
                id: val[index].id,
                price: parseFloat(val[index].price),
                remez: val[index].remez,
                sogMotsar: val[index].sogMotsar,
                msbarMotsar: GetMsbarMotsar(val[index].id).msbar
            });
        }
        return res;
    }

    function GetTotalPriceShop(val) {
        let res = 0;
        for (let index = 0; index < val.length; index++) {
            res += (parseFloat(val[index].amount) * parseFloat(entries[index].price));
        }
        return res;
    }

    useEffect(() => {
        const q = query(collection(firestore, 'tnoahBkneot'), orderBy("msbar", 'desc'), limit(20));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setHestoriaKneot(items);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (contactName) {
            setShowModalAddSbak(true);
        }
    }, [contactName]);


    function flipDate(dateStr) {
        if(dateStr === ''){
            return null;
        }
        if (!dateStr || typeof dateStr !== 'string') {
            return null;
        }
    
        const [day, month, year] = dateStr.split('-');
        
        if (!day || !month || !year) {
            console.error('Date string is not in the expected format (dd-mm-yyyy):', dateStr);
        }
    
        const flippedDateStr = `${year}-${month}-${day}`;
        return flippedDateStr;
    }
    const [showModalMtsavMlae, setShowModalMtsavMlae] = useState(false);
    const fetchClosestDateDoc = () => {
        try {
            let closestPastDoc = null;
            let closestFutureDoc = null;
            const today = new Date();
            const todayStr = today.toISOString().split('T')[0];
            mlae.forEach(doc => {
                const adconAhron = doc.adconAhron;
                const docDate = parse(adconAhron, 'dd-MM-yyyy', new Date());

                if (isValid(docDate)) {
                    if (docDate <= today && (!closestPastDoc || docDate > parse(closestPastDoc.adconAhron, 'dd-MM-yyyy', new Date()))) {
                        closestPastDoc = doc;
                    } else if (docDate >= today && (!closestFutureDoc || docDate < parse(closestFutureDoc.adconAhron, 'dd-MM-yyyy', new Date()))) {
                        closestFutureDoc = doc;
                    }
                }
            });
            const calculateDistance = (doc) => {
                const adconAhron = doc.adconAhron;
                const docDate = parse(adconAhron, 'dd-MM-yyyy', new Date());
                return formatDistanceToNow(docDate);
            };
            if (closestPastDoc && closestFutureDoc) {
                const pastDistance = calculateDistance(closestPastDoc);
                const futureDistance = calculateDistance(closestFutureDoc);
                return(pastDistance < futureDistance ? { ...closestPastDoc, distance: pastDistance } : { ...closestFutureDoc, distance: futureDistance });
            } else if (closestPastDoc) {
                return({ ...closestPastDoc, distance: calculateDistance(closestPastDoc) });
            } else if (closestFutureDoc) {
                return({ ...closestFutureDoc, distance: calculateDistance(closestFutureDoc) });
            } else {
                return(null);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };


    function mtsavArekha(val){
        if(fetchClosestDateDoc()?.adconAhron === ''){
            return null;
        }
        return differenceInDays(flipDate(fetchClosestDateDoc()?.adconAhron),val);
    }

    const [afshrotArekha, setAfshrotRekha] = useState(false);

    const categoryRefs = useRef(Array(10).fill(null).map(() => React.createRef()));


    function adconMhekatMotsar(val1,val2){
        let newArray = [];
        let newArrayMotsarem = [];
        for (let index = 0; index < category.length; index++) {
            if(val2 === category[index].id){
                for (let index1 = 0; index1 < category[index]?.motsarem?.length; index1++) {
                    if(category[index]?.motsarem[index1].sog === val1){
                        newArrayMotsarem.push({
                            dlbak: 0,
                            mededa: category[index]?.motsarem[index1].mededa - 1,
                            shem: category[index]?.motsarem[index1].shem,
                            sog: category[index]?.motsarem[index1].sog,
                        });
                    }
                    else{
                        newArrayMotsarem.push(category[index]?.motsarem[index1]);
                    } 
                }
                newArray.push({...category[index],motsarem : newArrayMotsarem});
            }
            else{
                newArray.push(category[index]);
            }
        }
        return newArrayMotsarem;
    }

    const [hodatMhekatMotsar,setHodatMhekatMotsar] = useState(false);
    const [motsarMhekaItem, setMotsarMhekaItem] = useState(null);
    const [motsarMhekaCat, setMotsarMhekaCat] = useState(null);


    return (
        <div className=''>
            {<ModalMessage Aeshor={async (val) => {
                if (val) {
                    await deleteDoc(doc(firestore, 'mlae', motsarMhekaItem.id));
                    await updateDoc(doc(firestore, 'category', motsarMhekaCat.id), {
                        dlbak: motsarMhekaCat?.dlbak - 1,
                        motsarem: adconMhekatMotsar(motsarMhekaItem.categoryMotsar, motsarMhekaCat.id)
                    })
                }
            }} message={`האם אתה בטוח למחוק המוצר ${motsarMhekaItem?.shem} מהמלאי!!`} show={hodatMhekatMotsar} disable={() => setHodatMhekatMotsar(false)} />}
            {<ModalMtsavMlae category={category} mlae={mlae} show={showModalMtsavMlae} disable={() => setShowModalMtsavMlae(false)} />}
            {<ModalAddProductCategory category={categoryData} show={showModalAddProductCategory} disable={() => setShowModalAddProductCategory(false)} />}
            {<ModalAddSobak show={showModalAddSbak} disable={() => setShowModalAddSbak(false)} />}
            {loading && <Spinner className='absolute top-0 left-0 bottom-0 right-0' />}
            {<ModalShowBerotAska afshrotArekha={afshrotArekha} mlae={mlae} aska={aska} show={showBerotAska} disable={() => { console.log(aska); setShowBerotAska(false) }} />}
            <div className='flex items-center justify-around'>
                <div className='w-full max-w-[1100px] mr-10 ml-10 mb-20'>
                    <div className='bg-white rounded-2xl shadow-2xl mb-10 h-[150px]'>
                        <div className='text-center text-2xl p-4'>ספירת מלאי</div>
                        <Divider className='mb-5' />
                        <div className='flex items-center'>
                            <div className='w-full text-center font-bold text-lg'>
                                עדכון אחרון : {fetchClosestDateDoc()?.adconAhron || 'אין כרגע'}
                            </div>
                            <div className='w-full'>
                                <div className='flex justify-around w-full items-center'>
                                    <Button onClick={handelPrintHeshvonit}>הדפסת טופס</Button>
                                    <Button onClick={() => setShowModalMtsavMlae(true)}>מצב ספירת מלאי</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='bg-white rounded-l-2xl shadow-2xl w-full'>
                            <div className='text-center text-2xl p-4'>מלאי</div>
                            <Divider className='mb-5' />
                            <div className='p-5 h-[700px] overflow-auto'>
                                {
                                    category.map((cat, index) => {
                                        return <>
                                            <div key={index} ref={categoryRefs.current[index]} className='bg-white rounded-lg p-2'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='flex items-center'>
                                                        <Button onClick={() => { setShowModalAddProductCategory(true); setCategoryData(cat) }} className='mr-3'><FaPlus className='text-xl' />מוצר חדש</Button>
                                                    </div>
                                                    <div>מוצרים {cat.dlbak}</div>
                                                    <div className='flex items-center'>
                                                        <div className='mr-3'>{cat.shem}</div>
                                                        <Avatar size="lg" />
                                                    </div>
                                                </div>
                                                <div className='mt-5 bg-gray-300'>
                                                    <table className="w-full table-auto border-collapse">
                                                        <thead>
                                                            <tr className="bg-gray-500 dark:bg-gray-800">
                                                                <th className="px-4 py-3 text-right font-medium text-white"></th>
                                                                <th className="px-4 py-3 text-right font-medium text-white">זמן הספקה</th>
                                                                <th className="px-4 py-3 text-right font-medium text-white">עלות ממוצע</th>
                                                                <th className="px-4 py-3 text-right font-medium text-white">סה"כ עלות</th>
                                                                <th className="px-4 py-3 text-right font-medium text-white">כמות</th>
                                                                <th className="px-4 py-3 text-right font-medium text-white">שם פריט</th>
                                                                <th className="px-4 py-3 text-right font-medium text-white">מק"ט</th>
                                                                <th className="px-4 py-3 text-right font-medium text-white"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {cat?.motsarem?.map((motsar, index1) => (
                                                                mlae.map((item, index) => {
                                                                    return item.categoryMotsar === motsar.sog && <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200"><Button onClick={() => {setHodatMhekatMotsar(true);setMotsarMhekaItem(item);setMotsarMhekaCat(cat);}} size='sm' color='danger' variant='shadow'><FaTrash className='text-white'/></Button></td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.zmanHsbaka}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.alotLeheda}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.alot}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.kmot}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.shem}</td>
                                                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.msbar}</td>
                                                                        <td>
                                                                            <div className="group relative">
                                                                                <Image src={GetTmonatHelek(item.categoryMotsar)} className="h-[60px] w-[60px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-300 group-hover:shadow-lg hover:z-50 bg-white group-hover:translate-x-[-220%]" />
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                })
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <Divider className='mt-5' />
                                            </div>
                                        </>
                                    })
                                }
                            </div>
                            <div className='p-2'></div>
                        </div>
                        <div className='min-w-[180px] rounded-r-2xl p-1 m-auto bg-white pt-[21px] pb-[21px]'>
                            {
                                category.map((cat, index) => {
                                    return <div className='text-center text-[15px]'>
                                        <Button onClick={() => categoryRefs.current[index]?.current?.scrollIntoView({ behavior: 'smooth' })} color='primary' variant='faded' className='w-[100px]'>{cat?.shem}</Button>
                                        {
                                            index !== (category.length - 1) && <Divider className='mt-[21px] mb-[21px]'/>
                                        }
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className="  bg-white rounded-xl shadow-xl mr-10 ml-10 mb-20" ref={containerRef}>
                        <div ref={topOfFormRef} />
                        <div className='text-center p-4 text-2xl'>קנייה</div>
                        <Divider className='mb-5' />
                        <div className='overflow-auto h-[400px] flex justify-center w-full pb-10 pr-10 pl-10 max-w-[900px] min-w-[400px]'>
                            <form onSubmit={handleSubmit} className='w-full'>
                                <div dir='rtl' className=''>

                                    <div className='flex justify-center items-center'>

                                        <Autocomplete
                                            bordered
                                            fullWidth
                                            label="ספק"
                                            className="max-w-xs m-5"
                                            color="primary"
                                            defaultItems={sbkemA}
                                            allowsCustomValue={true}
                                            onSelectionChange={setSbak}
                                            onInputChange={setSbak}
                                        >
                                            {
                                                sbkemA.map((sbak) => (
                                                    <AutocompleteItem className='text-right' key={sbak.msbar} value={sbak.msbar} onClick={() => setSbakID(sbak.msbar)}>
                                                        {sbak.shem}
                                                    </AutocompleteItem>
                                                ))
                                            }
                                        </Autocomplete>
                                        <Button onClick={() => setShowModalAddSbak(true)}>הוספה</Button>
                                        {
                                            entries?.length > 1 &&
                                            <Button onClick={scrollToBottomRef} auto flat className='ml-5'>
                                                <FaArrowDown />
                                            </Button>
                                        }
                                    </div>
                                </div>
                                <Divider />
                                {entries?.map((entry, index) => (
                                    <>
                                        <div dir='rtl' key={index} className="w-full flex items-center mt-3 mb-3">
                                            <div className='mr-2'>{index + 1}</div>
                                            <Dropdown dir="rtl">
                                                <DropdownTrigger>
                                                    <Button
                                                        size="lg"
                                                        className='m-2'
                                                        isDisabled={!sbak}
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
                                                    onSelectionChange={(val) => { handleInputChange(index, 'category', val.currentKey); handleInputChange(index, 'id', ''); handleInputChange(index, 'sogMotsar', ''); handleInputChange(index, 'remez', ''); }}
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
                                                        className='m-2'
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
                                                    selectedKeys={entry.sogMotsar}
                                                    onSelectionChange={(val) => { handleInputChange(index, 'sogMotsar', val.currentKey); handleInputChange(index, 'id', ''); }}
                                                >
                                                    {
                                                        category.map((cat, catIndex) => {
                                                            return cat.shem === entry.category && cat?.motsarem?.map((motsar, motsarIndex) => {
                                                                return <DropdownItem onClick={() => handleInputChange(index, 'remez', motsar?.sog)} key={motsar?.shem}>{motsar?.shem}</DropdownItem>
                                                            })
                                                        })
                                                    }
                                                </DropdownMenu>
                                            </Dropdown>
                                            <Dropdown dir="rtl">
                                                <DropdownTrigger>
                                                    <Button
                                                        size="lg"
                                                        className='m-2'
                                                        isDisabled={!entries[index]?.sogMotsar}
                                                    >
                                                        {entry.id ? entry?.id : 'בחר פריט'}
                                                    </Button>
                                                </DropdownTrigger>
                                                <DropdownMenu
                                                    aria-label="Multiple selection example"
                                                    variant="flat"
                                                    closeOnSelect={true}
                                                    disallowEmptySelection
                                                    selectionMode="single"
                                                    selectedKeys={entry.id}
                                                    onSelectionChange={(val) => handleInputChange(index, 'id', val.currentKey)}
                                                >
                                                    {
                                                        mlae.map((motsar, index) => {
                                                            return motsar.categoryMotsar === entry.remez && <DropdownItem key={motsar?.shem}>{motsar?.shem}</DropdownItem>
                                                        })
                                                    }
                                                </DropdownMenu>
                                            </Dropdown>
                                            {
                                                console.log(entries)
                                            }
                                            <Input
                                                bordered
                                                fullWidth
                                                isDisabled={!entries[index]?.id}
                                                size='sm'
                                                type="number"
                                                placeholder="כמות"
                                                value={entry.amount}
                                                onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                                className='m-2'
                                            />
                                            <Input
                                                bordered
                                                fullWidth
                                                isDisabled={!entries[index]?.amount}
                                                size='sm'
                                                type="number"
                                                placeholder="מחיר ליחידה"
                                                value={entry.price}
                                                onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                                className='m-2'
                                                onKeyDown={handleKeyDown}
                                            />
                                            <div onClick={() => removeItem(index)} className='ml-5 text-danger-500 hover:cursor-pointer'>
                                                <FaTrash className='text-2xl' />
                                            </div>
                                        </div>
                                        <Divider />
                                    </>
                                ))}
                                <div className='flex justify-center'>
                                    <Button onClick={handleAddFields} className='m-5'>
                                        <FiPlus />עוד הזמנה
                                    </Button>
                                    <Button color="primary" type="submit" className='m-5'>
                                        אישור
                                    </Button>
                                    {
                                        entries?.length > 1 &&
                                        <Button onClick={scrollToRef} className='m-5'>
                                            <FaArrowUp />
                                        </Button>
                                    }
                                </div>
                                <div ref={endOfFormRef} />
                            </form>
                        </div>
                        <div className='p-2'></div>
                    </div>
                    <div className='w-full max-w-[900px] bg-white rounded-2xl shadow-2xl mr-10 ml-10 mb-20'>
                        <div className='text-center p-4 text-2xl'>היסטוריה קניות</div>
                        <Divider className='mb-5' />
                        <div className="flex flex-col w-full max-w-4xl mx-auto h-[400px] overflow-auto">
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto border-collapse text-center">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-50">
                                            <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">מצב עריכה</th>
                                            <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">תאריך קנייה</th>
                                            <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">שעה</th>
                                            <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">פירוט קנייה</th>
                                            <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">מחיר כולל</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            hestoriaKneot.length > 0 && hestoriaKneot?.map((item, index) => {
                                                return <tr className="border-b border-gray-200 dark:border-gray-700">
                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{!mtsavArekha(item.tarekh) ? <div className='text-danger'>לא זמין</div> : mtsavArekha(item.tarekh) >= 0 ? <div className='text-danger'>לא זמין</div> : <div className='text-success'>זמין</div>}</td>
                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{flipDate(item.tarekh)}</td>
                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{item.shaa}</td>
                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"><Button onClick={() => { setShowBerotAska(true); setAfshrotRekha(mtsavArekha(item.tarekh) >= 0 ? false : true); setAska(item); }}>פירוט</Button></td>
                                                    <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{item.skhom}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='p-2'></div>
                    </div>
                </div>
            </div>
            <div className='hidden'>
                <SferatMlae mlae={mlae} ref={componentRefOne} />
            </div>
        </div>
    )
}







