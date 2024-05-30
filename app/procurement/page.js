'use client';
import React, { useEffect, useRef, useState } from 'react';
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
import { addDoc, collection, count, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../FireBase/firebase';
import { format } from 'date-fns';
import ModalShowBerotAska from '../Modals/ModalShowBerotAska';


export default function Procurement() {

    const [sbak, setSbak] = useState('');
    const [sbakID,setSbakID] = useState(null);
    const [entries, setEntries] = useState([{ category: '', id: '',sogMotsar : '', amount: '', price: '' }]);

    const sbkemA = useGetDataByCondition('sbkem', 'sherot', '==', 'A');
    const category = GetDocs('category');

    const [hestoriaKneot, setHestoriaKneot] = useState([]);

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


    const handleInputChange = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    const handleAddFields = () => {
        setEntries([...entries, { category: '', id: '',sogMotsar : '', amount: '', price: '' }]);
        setTimeout(() => {
            scrollToBottomRef();
        }, 100);
    };

    const scrollToBottomRef = () => {
        const scrollableContainer = containerRef.current;
        const targetElement = endOfFormRef.current;
    
        if (scrollableContainer && targetElement) {
            // Calculate the position to scroll to
            const topPos = targetElement.offsetTop;
            scrollableContainer.scrollTo({
                top: topPos,  // Scroll to the top position of the targetElement within the container
                behavior: "smooth"
            });
        }
    };
    
    const scrollToRef = () => {
        const scrollableContainer = containerRef.current;
        const topElement = topOfFormRef.current;

        if (scrollableContainer && topElement) {
            // Scroll to the top element
            scrollableContainer.scrollTo({
                top: topElement.offsetTop,
                behavior: "smooth"
            });
        }
    };

    const containerRef = useRef(null);
    const endOfFormRef = useRef(null);
    const topOfFormRef = useRef(null);






    function removeItem(index) {
        const newItems = entries.filter((item, idx) => idx !== index);
        setEntries(newItems);
    }

    const [showModalAddSbak, setShowModalAddSbak] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
    const [showModalAddProductCategory, setShowModalAddProductCategory] = useState(false);
    const [categoryData, setCategoryData] = useState(null);
    const [visibleCategory, setVisibleCategory] = useState(null);
    const [categoryList, setCategoryList] = useState({});


    const [loading, setLoading] = useState(false);

    const fetchDataForCategory = async (index, category) => {
        if (!categoryList[category.id]) {
            setCategoryList(await useGetDataByConditionWithoutUseEffect('mlae', 'category', '==', category?.id));
        }
        setVisibleCategory(index);
    };

    
    const [shopCategory, setShopCategory] = useState({});
    const [showBerotAska,setShowBerotAska] = useState(false);
    const [aska,setAska] = useState(null);
    
    function GetMotsarRemez(val){
        if(!shopCategory.length){
            return;
        }
        for (let index = 0; index < shopCategory?.length; index++) {
            if(shopCategory[index].shem === val){
                return shopCategory[index].sog;
            }
        }
        return;
    }
    
    const fetchDataForCategoryShop = async (categoryShem) => {
        let res = await useGetDataByConditionWithoutUseEffect('category', 'shem', '==', categoryShem);
        setShopCategory(res[0].motsarem);
    };
    
    const [motsaremMlae,setMotsaremMlae] = useState({});
    const [kolMotsaremMlaeNebhro,setKolMotsaremMaleNebhro] = useState([]);
    const fetchDataForCategoryShopSogMotsar = async(Remez) => {
        let res = await useGetDataByConditionWithoutUseEffect('mlae', 'categoryMotsar', '==', Remez);
        setKolMotsaremMaleNebhro([...kolMotsaremMlaeNebhro,res]);
        setMotsaremMlae(res);
    } 
    console.log(categoryList);
    console.log(motsaremMlae);
    

    const ConvertCategoryNames = (val) => {
        if (val === 'פחים') {
            return 'A';
        }
        else if (val === 'פרופילים') {
            return 'B';
        }
        else if (val === 'צמגים') {
            return 'C';
        }
        else if (val === 'צבעים') {
            return 'D';
        }
        else if (val === 'חלקים קטנים') {
            return 'E';
        }
        else if (val === 'חומרי עזר') {
            return 'F';
        }
        else if (val === 'עגלות') {
            return 'G';
        }
        else if (val === 'בסולט') {
            return 'H';
        }
    }
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const counterRef = doc(firestore, 'metadata', 'counterTnoahBkneot');
        const counterSnap = await getDoc(counterRef);
        for (let index = 0; index < entries.length; index++) {
            let dataRef = doc(firestore, 'mlae', GetMsbarMotsar(entries[index].id).id);
            let extractedData = await getDoc(dataRef);
            let data = extractedData.data();
            console.log(data)
            await updateDoc(doc(firestore, 'mlae', extractedData.id), {
                kmot: (parseFloat(data.kmot) + parseFloat(entries[index].amount)),
                alot: ((parseFloat(entries[index].price) * parseFloat(entries[index].amount)) + parseFloat(data.alot)),
                alotLeheda: parseInt(((parseFloat(entries[index].amount) * parseFloat(entries[index].price)) + parseFloat(data.alot)) / (parseFloat(entries[index].amount) + parseFloat(data.kmot))),
            });
        }
        const tnoah = {
            berot : convertStringEnteries(entries),
            msbar : counterSnap.data().count,
            skhom : GetTotalPriceShop(entries),
            shaa : format(new Date,'HH:mm'),
            tarekh : format(new Date,'yyyy-MM-dd'),
            msbarSbak : sbakID
        }
        console.log(tnoah);
        try{
            await addDoc(collection(firestore,'tnoahBkneot'),tnoah);
        }
        catch(e){
            console.log(e);
        }

        console.log(2);
        await updateDoc(doc(firestore, 'metadata', 'counterTnoahBkneot'), { count: (counterSnap.data().count + 1) });
        setEntries([{ category: '', id: '',sogMotsar : '', amount: '', price: '' }]);
        setLoading(false);
    };

    function GetMsbarMotsar(val) {
        for (let index = 0; index < kolMotsaremMlaeNebhro.length; index++) {
            let motsrem = kolMotsaremMlaeNebhro[index];
            for (let index2 = 0; index2 < motsrem.length; index2++) {
                if(motsrem[index2].shem === val){
                    return motsrem[index2];
                }
            }
        }
        return;
    }

    function convertStringEnteries (val){
        let res = [];
        for (let index = 0; index < val.length; index++) {
            res.push({
                amount : parseFloat(val[index].amount),
                category : val[index].category,
                id : val[index].id,
                price : parseFloat(val[index].price),
                sogMotsar : val[index].sogMotsar,
                msbarMotsar : GetMsbarMotsar(val[index].id).msbar
            });
        }
        return res;
    }

    function GetTotalPriceShop (val){
        let res = 0;
        for (let index = 0; index < val.length; index++) {
            res += (parseFloat(val[index].amount) * parseFloat(entries[index].price));
        }
        return res;
    }

    return (
        <div className='p-20'>
            {<ModalAddProductCategory category={categoryData} show={showModalAddProductCategory} disable={() => setShowModalAddProductCategory(false)} />}
            {<ModalAddSobak show={showModalAddSbak} disable={() => setShowModalAddSbak(false)} />}
            {loading && <Spinner className='absolute top-0 left-0 bottom-0 right-0' />}
            {<ModalShowBerotAska aska={aska} show={showBerotAska} disable={() => setShowBerotAska(false)}/>}
            <div className='flex justify-between items-center'>
                <div className='w-full max-w-[800px]'>
                    <div className='bg-white h-[600px] overflow-auto rounded-2xl shadow-2xl'>
                        <div className='text-center m-4 text-2xl'>מלאי</div>
                        <Divider className='mb-5' />
                        <div className='p-2'>
                            {
                                category.map((cat, index) => {
                                    return <>
                                        <div key={index} className='bg-white rounded-lg p-2'>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex items-center'>
                                                    <Button onClick={() => fetchDataForCategory(index === visibleCategory ? null : index, cat)} className='mr-3'><MdOutlineKeyboardArrowDown className='text-4xl' /></Button>
                                                    <Button onClick={() => { setShowModalAddProductCategory(true); setCategoryData(cat) }} className='mr-3'><FaPlus className='text-xl' />מוצר חדש</Button>
                                                </div>
                                                <div>מוצרים {cat.dlbak}</div>
                                                <div className='flex items-center'>
                                                    <div className='mr-3'>{cat.shem}</div>
                                                    <Avatar size="lg" />
                                                </div>
                                            </div>
                                            {visibleCategory === index && (
                                                <>
                                                    {categoryList === null ? (
                                                        <Spinner />
                                                    ) : categoryList.length > 0 ? (
                                                        <div className='mt-5 bg-gray-300'>
                                                            <table className="w-full table-auto border-collapse">
                                                                <thead>
                                                                    <tr className="bg-gray-500 dark:bg-gray-800">
                                                                        <th className="px-4 py-3 text-right font-medium text-white">זמן הספקה</th>
                                                                        <th className="px-4 py-3 text-right font-medium text-white">עלות ממוצע</th>
                                                                        <th className="px-4 py-3 text-right font-medium text-white">סה"כ עלות</th>
                                                                        <th className="px-4 py-3 text-right font-medium text-white">כמות</th>
                                                                        <th className="px-4 py-3 text-right font-medium text-white">שם מוצר</th>
                                                                        <th className="px-4 py-3 text-right font-medium text-white">מספר מוצר</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {categoryList.map((item, index) => (
                                                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.zmanHsbaka}</td>
                                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.alotLeheda}</td>
                                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.alot}</td>
                                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.kmot}</td>
                                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.shem}</td>
                                                                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">{item.msbar}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    ) : (
                                                        <div className='flex justify-center text-danger mt-5'>אין נתונים להצגה</div>
                                                    )}
                                                </>
                                            )}
                                            <Divider className='mt-5' />
                                        </div>
                                    </>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className=" overflow-auto h-[600px] bg-white rounded-xl shadow-xl" ref={containerRef}>
                    <div ref={topOfFormRef} />
                    <div className='text-center m-4 text-2xl'>קנייה</div>
                    <Divider className='mb-5' />
                    <div className='flex justify-center w-full pb-10 pr-10 pl-10 max-w-[800px] min-w-[400px]'>
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
                                        <AutocompleteItem className='text-right' onClick={() => setShowModalAddSbak(true)}>הוספה</AutocompleteItem>
                                        {
                                            sbkemA.map((sbak) => (
                                                <AutocompleteItem className='text-right' key={sbak.msbar} value={sbak.msbar} onClick={() => setSbakID(sbak.msbar)}>
                                                    {sbak.shem}
                                                </AutocompleteItem>
                                            ))
                                        }
                                    </Autocomplete>
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
                                                onSelectionChange={(val) => { handleInputChange(index, 'category', val.currentKey); handleInputChange(index, 'id', ''); fetchDataForCategoryShop(entry.category); }}
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
                                                selectedKeys={entry.id}
                                                onSelectionChange={(val) => {handleInputChange(index, 'sogMotsar', val.currentKey);fetchDataForCategoryShopSogMotsar(GetMotsarRemez(entry.sogMotsar))}}
                                            >
                                                {
                                                    shopCategory.length && shopCategory?.map((cat, index) => {
                                                        return <DropdownItem key={cat?.shem}>{cat?.shem}</DropdownItem>
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
                                                    {entry.id ? entry?.id : 'בחר סוג מוצר'}
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
                                                    motsaremMlae.length && motsaremMlae?.map((motsar, index) => {
                                                        return <DropdownItem key={motsar?.shem}>{motsar?.shem}</DropdownItem>
                                                    })
                                                }
                                            </DropdownMenu>
                                        </Dropdown>
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

                </div>
            </div>
            <div className='flex justify-between items-center mt-32'>
                <div className="flex justify-center max-w-[800px]">

                </div>


                <div className='w-full max-w-[800px] bg-white h-[600px] overflow-auto rounded-2xl shadow-2xl'>
                    <div className='text-center m-4 text-2xl'>היסטוריה קניות</div>
                    <Divider className='mb-5' />
                    <div className="flex flex-col w-full max-w-4xl mx-auto">
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse text-center">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">תאריך קנייה</th>
                                        <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">שעה</th>
                                        <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">פירוט קנייה</th>
                                        <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">מחיר כולל</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        hestoriaKneot.length && hestoriaKneot?.map((item, index) => {
                                            return <tr className="border-b border-gray-200 dark:border-gray-700">
                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{item.tarekh}</td>
                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{item.shaa}</td>
                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300"><Button onClick={() => {setShowBerotAska(true);setAska(item);}}>פירוט</Button></td>
                                                <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{item.skhom}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}