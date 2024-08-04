'use client';
import { Button, Modal, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, AutocompleteItem, Autocomplete, Spinner, Switch } from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import { firestore } from "../FireBase/firebase";
import { doc, getDoc, runTransaction, setDoc, collection, addDoc, updateDoc, query, where } from "firebase/firestore";
import GetDocs from "../FireBase/getDocs";
import moment from 'moment';
import { HiOutlineCheck } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import { differenceInMinutes, format, parseISO, subMonths } from "date-fns";
import { useGetDataByCondition, useGetDataByConditionWithoutUseEffect, useGetDataByLimit } from "../FireBase/getDataByCondition";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import ContactContext from "../auth/ContactContext";
import ModalAddSobak from "./ModalAddSbak";
import ModalMessage from "./ModalMessage";


export default function ModalHtsgatHotsaa({ disable, show, hotsaa, aemTshlom, aobdem,sbkemA }) {
    const [sbakID, setSbakID] = useState(null);
    const [sbak, setSbak] = useState('');
    const [sbakObject, setSbakObject] = useState('');
    const [entries, setEntries] = useState([{ category: '', id: '', sogMotsar: '', remez: '', amount: '', price: '' }]);
    const category = GetDocs('category');
    const mlae = GetDocs('mlae');
    const endOfFormRef = useRef(null);
    const topOfFormRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [AemHeshbonet, setAemHeshbonet] = useState(false);
    const [AemTshlom, setAemTshlom] = useState(false);
    const [skhom, setSkhom] = useState(0);
    const [hotsaotSkharAobdem, setHotsaotSkharAobdem] = useState([]);
    const [showHodatAemotBaolatHotsaotAobdem, setShowHodatAemotBaolatHotsaotAobdem] = useState(false);
    const [showHodatAemotBaolatHotsaotAobdemRes, setShowHodatAemotBaolatHotsaotAobdemRes] = useState(false);

    const metadata = GetDocs('metadata');
    const counter = metadata.find((count) => count.id === 'counterShaotAboda');
    const counterHkhnsotAhrot = metadata.find((count) => count.id === 'counterHkhnsotAhrot');
    const counterKneot = metadata.find((count) => count.id === 'counterTnoahBkneot');
    const counterNekoeMaam = metadata.find((count) => count.id === 'counterNekoeMaam');


    const previousMonthDate = subMonths(new Date(), 1);
    const [GetData, setGetData] = useState(false);
    const [heshovShaotAboda, setHeshovShaotAboda] = useState([]);


    const ResetAll = () => {
        setSbakID(null);
        setSbak('');
        setSbakObject('');
        setEntries([{ category: '', id: '', sogMotsar: '', remez: '', amount: '', price: '' }]);
        setAemHeshbonet(false);
        setAemTshlom(false);
        setSkhom(0);
        setHotsaotSkharAobdem([]);
        setShowHodatAemotBaolatHotsaotAobdem(false);
        setShowHodatAemotBaolatHotsaotAobdemRes(false);
        setGetData(false);
        setHeshovShaotAboda([]);
        disable();
    }

    useEffect(() => {
        if (GetData) {
            console.log(1);
            const unsubscribe = useGetDataByConditionWithoutUseEffect(
                'shaotAboda',
                'hodesh',
                '==',
                format(previousMonthDate, 'MM-yyyy'),
                result => {
                    console.log(13);
                    result.length && sumTimeDifferences(result);
                }
            );
            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };
        }
    }, [GetData]);

    const GetTarefLeshaa = (val) => {
        for (let index = 0; index < aobdem.length; index++) {
            if (aobdem[index].msbar === val) {
                return aobdem[index].tarefLshaa;
            }
        }
        return null;
    }

    const GetSkhomSofe = (result) => {
        let sum = 0;
        for (let index = 0; index < result.length; index++) {
            sum += result[index].skharBroto + result[index].bensea2 + result[index].betsoeem;
        }
        return parseFloat((sum).toFixed(2));
    }

    const GetSkhomSofeYetsor = (result) => {
        let sum = 0;
        for (let index = 0; index < result.length; index++) {
            if(result[index].tafked === 'A'){
                sum += result[index].skharBroto + result[index].bensea2 + result[index].betsoeem;
            }
        }
        return parseFloat((sum).toFixed(2));
    }

    const handleTimeDiffrence = (yetseah, knesa) => {
        if (yetseah && knesa) {
            const start = parseISO(`1970-01-01T${knesa}:00`);
            const end = parseISO(`1970-01-01T${yetseah}:00`);
            const totalMinutes = differenceInMinutes(end, start);

            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');

            return parseInt(formattedHours) + parseFloat((formattedMinutes / 60).toFixed(2));
        }
        return null;
    };



    const sumTimeDifferences = async (arr) => {
        const groupedByAobed = arr.reduce((acc, obj) => {
            if (!acc[obj.aobed]) {
                acc[obj.aobed] = {
                    totalDifference: 0,
                    id: obj.id,
                    tarekh: obj.tarekh,
                    tarefLeshaaa: 0
                };
            }
            const difference = handleTimeDiffrence(obj.yetseah, obj.knesa);
            if (difference) {
                acc[obj.aobed].totalDifference += difference;
            }
            return acc;
        }, {});
        const result = Object.keys(groupedByAobed).map(aobed => ({
            aobed: parseInt(aobed),
            totalDifference: groupedByAobed[aobed].totalDifference,
            id: groupedByAobed[aobed].id,
            tarekh: groupedByAobed[aobed].tarekh,
            tarefLeshaaa: GetTarefLeshaa(parseInt(aobed))
        }));
        if (!result.length) return;

        console.log(result);
        setHeshovShaotAboda(result);
    };



    const GetSkarBroto = (val) => {
        for (let index = 0; index < heshovShaotAboda.length; index++) {
            if (val === heshovShaotAboda[index].aobed) {
                return heshovShaotAboda[index].totalDifference * heshovShaotAboda[index].tarefLeshaaa;
            }
        }
        return 0;
    }

    const handleInputChange = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    useEffect(() => {
        if (heshovShaotAboda.length) {
            let newArray = aobdem.map(item => ({
                skharBroto: GetSkarBroto(item.msbar),
                msHkhnsa: 0,
                betoahLaome: 0,
                betoahBreaot: 0,
                bnseaa1: (GetSkarBroto(item.msbar) * 0.06),
                bensea2: (GetSkarBroto(item.msbar) * 0.065),
                betsoeem: (GetSkarBroto(item.msbar) * 0.083),
                id: item.id,
                msbar: item.msbar,
                shem: item.shem,
                tafked: item.tfked
            }));
            setHotsaotSkharAobdem(newArray);
        }
    }, [heshovShaotAboda]);

    const handleAddFields = () => {
        setEntries([...entries, { category: '', id: '', remez: '', sogMotsar: '', amount: '', price: '' }]);
    };
    function removeItem(index) {
        const newItems = entries.filter((item, idx) => idx !== index);
        setEntries(newItems);
    }

    const handleSubmit = () => {
        setLoading(true);
        if (hotsaa.sogHotsaa === 'קניות מוצרים') {
            handleSubmitKneatMotsarem();
        }
        else if (hotsaa.sogHotsaa === 'הוצאות שכר') {
            handleSubmitHotsaotSkhar();
        }
        else if (hotsaa.sogHotsaa === 'הוצאות שוטפות') {
            handleSubmitShoteft();
        }
        else if (hotsaa.sogHotsaa === 'מסים') {
            if(hotsaa.sogMas === 'מס אחר'){
                handleSubmitMsem();
            }
            else{
                handleSubmitMsemMaamVNekoe();
            }
        }
        else if (hotsaa.sogHotsaa === 'הוצאות אחרות') {
            handleSubmitHotsaotAhrot();
        }
        setLoading(false);
        ResetAll();
    }
    const handleSubmitMsemMaamVNekoe = async() =>{
        let res = hotsaa?.sogMas === 'ניקוי מע"מ' ? (parseFloat(sbakObject?.ytratHeshvon) + parseFloat(skhom)) : (parseFloat(sbakObject?.ytratHeshvon) - parseFloat(skhom))
        await updateDoc(doc(firestore,'sbkem',sbakObject.id),{
            ytratHeshvon : res
        });
    };



    const handleSubmitHotsaotAhrot = async() => {
        await updateDoc(doc(firestore,'metadata','counterHkhnsotAhrot'),{
            count : counterHkhnsotAhrot.munth === format(new Date(),'MM-yyyy') ? ((counterHkhnsotAhrot?.count + parseFloat(skhom))) : parseFloat(skhom),
            munth : format(new Date(),'MM-yyyy'),
            countAll : counterHkhnsotAhrot?.countAll + parseFloat(skhom),
            countMunths : counterHkhnsotAhrot.munth !== format(new Date(), 'MM-yyyy') ? (counterHkhnsotAhrot.countMunths + 1) : (1)
        });
        // await updateDoc(doc(firestore,'hotsaot',hotsaa?.id),{
        //     count2 : hotsaa.munth === format(new Date(),'MM-yyyy') ? ((hotsaa?.count2 + parseFloat(skhom))) : parseFloat(skhom),
        //     munth : format(new Date(),'MM-yyyy')
        // });
        if(AemHeshbonet){
            await updateDoc(doc(firestore,'metadata','counterNekoeMaam'),{
                count : counterNekoeMaam.munth === format(new Date(),'dd-MM-yyyy') ? counterNekoeMaam.count + (skhom * 0.17) : (skhom * 0.17),
                munth : format(new Date(),'dd-MM-yyyy')
            });
        }
        await updateDoc(doc(firestore,'sbkem',sbakObject?.id),{
            ytratHeshvon : parseFloat(sbakObject?.ytratHeshvon) - parseFloat(skhom)
        });
    };




    const handleSubmitHotsaotSkhar = async() => {
        let kolBenseaaMasek = 0;
        let kolBetsoeem = 0;
        let kolskharBroto = 0;
        for (let index = 0; index < hotsaotSkharAobdem.length; index++) {
            await updateDoc(doc(firestore,'aobdem',hotsaotSkharAobdem[index].id),{
                bensea : -parseFloat((parseFloat(hotsaotSkharAobdem[index].bnseaa1) + parseFloat(hotsaotSkharAobdem[index].bensea2)).toFixed(2)),
                betsoeem: -parseFloat((hotsaotSkharAobdem[index].betsoeem).toFixed(2)),
                skharBroto: -parseFloat(((hotsaotSkharAobdem[index].skharBroto - hotsaotSkharAobdem[index].msHkhnsa - hotsaotSkharAobdem[index].betoahLaome - hotsaotSkharAobdem[index].betoahBreaot - hotsaotSkharAobdem[index].bnseaa1)).toFixed(2))
            });
            kolBenseaaMasek += parseFloat(hotsaotSkharAobdem[index].bensea2)
            kolBetsoeem += parseFloat(hotsaotSkharAobdem[index].betsoeem);
            kolskharBroto += parseFloat(hotsaotSkharAobdem[index].skharBroto);
        }
        await updateDoc(doc(firestore, 'metadata', 'counterShaotAboda'), {
            hotsaotSkhar: parseFloat(GetSkhomSofe(hotsaotSkharAobdem).toFixed(2)),
            hotsaotSkharYetsor : parseFloat(GetSkhomSofeYetsor(hotsaotSkharAobdem).toFixed(2)),
            shaotKodmet : counter?.countShaotAbodaKodemet,
            shaotKodmetYestsor : counter?.countShaotAbodaYetsorKodem
        });
        const tnoah = {
            berot: null,
            msbar: counterKneot?.count,
            skhom: GetSkhomSofe(hotsaotSkharAobdem),
            shaa: format(new Date, 'HH:mm'),
            tarekh: format(new Date, 'dd-MM-yyyy'),
            skhomHodshe : parseFloat((GetSkhomSofe(hotsaotSkharAobdem) / hotsaa.aorkhTkofa).toFixed(2)),
            sog: hotsaa.shem,
            msbarSbak: sbakID
        }
        try {
            await updateDoc(doc(firestore,'metadata','counterTnoahBkneot'),{
                count : counterKneot?.count + 1,
                BenseaaMasek: kolBenseaaMasek,
                Betsoeem : kolBetsoeem,
                aeshorem : counterKneot.aeshorem + 1,
                skharBroto : kolskharBroto,
            })
            await addDoc(collection(firestore, 'tnoahBkneot'), tnoah);
        }
        catch (e) {
            console.log(e);
        }
        if(AemHeshbonet){
            await updateDoc(doc(firestore,'metadata','counterNekoeMaam'),{
                count : counterNekoeMaam.munth === format(new Date(),'dd-MM-yyyy') ? counterNekoeMaam.count + (GetSkhomSofe(hotsaotSkharAobdem) * 0.17) : (GetSkhomSofe(hotsaotSkharAobdem) * 0.17),
                munth : format(new Date(),'dd-MM-yyyy')
            })
        }
    };
    const handleSubmitKneatMotsarem = async() => {
        for (let index = 0; index < entries.length; index++) {
            let data = GetMsbarMotsar(entries[index].id);
            await updateDoc(doc(firestore, 'mlae', data.id), {
                kmot: (parseFloat(data.kmot) + parseFloat(entries[index].amount)),
                alot: ((parseFloat(entries[index].price) * parseFloat(entries[index].amount)) + parseFloat(data.alot)),
                alotLeheda: truncateToTwoDecimals(parseFloat(((parseFloat(entries[index].amount) * parseFloat(entries[index].price)) + parseFloat(data.alot)) / (parseFloat(entries[index].amount) + parseFloat(data.kmot)))),
                sakhHkolKneot: (parseFloat(data.sakhHkolKneot) + parseFloat(entries[index].amount)),
                hozman:false
            });
        }
        const tnoah = {
            berot: convertStringEnteries(entries),
            msbar: counterKneot?.count,
            skhom: GetTotalPriceShop(entries),
            shaa: format(new Date, 'HH:mm'),
            tarekh: format(new Date, 'dd-MM-yyyy'),
            skhomHodshe : parseFloat((GetTotalPriceShop(entries) / hotsaa.aorkhTkofa).toFixed(2)),
            sog: hotsaa.shem,
            msbarSbak: sbakID
        }
        try {
            await updateDoc(doc(firestore,'metadata','counterTnoahBkneot'),{
                count : counterKneot?.count + 1
            })
            await addDoc(collection(firestore, 'tnoahBkneot'), tnoah);
        }
        catch (e) {
            console.log(e);
        }
        if(AemHeshbonet){
            await updateDoc(doc(firestore,'metadata','counterNekoeMaam'),{
                count : counterNekoeMaam.munth === format(new Date(),'dd-MM-yyyy') ? counterNekoeMaam.count + (GetTotalPriceShop(entries) * 0.17) : (GetTotalPriceShop(entries) * 0.17),
                munth : format(new Date(),'dd-MM-yyyy')
            })
        }
        if (AemTshlom) {
            aemTshlom(true, GetSkhomKolel(), sbakObject, hotsaa.sogHotsaa, 'sbkem');
        }
        else {
            aemTshlom(false, null, null, null, null);
        }
        await updateDoc(doc(firestore,'sbkem',sbakObject?.id),{
            ytratHeshvon : parseFloat(sbakObject?.ytratHeshvon) - parseFloat(GetTotalPriceShop(entries))
        });
    };
    const handleSubmitShoteft = async() => {
        if (AemTshlom) {
            aemTshlom(true, skhom, sbakObject, hotsaa.sogHotsaa, 'sbkem');
        }
        else {
            aemTshlom(false, null, null, null, null);
        }
        setEntries([{ category: '', id: '', remez: '', sogMotsar: '', amount: '', price: '' }]);
        const tnoah = {
            berot: null,
            msbar: counterKneot?.count,
            skhom: skhom,
            shaa: format(new Date, 'HH:mm'),
            tarekh: format(new Date, 'dd-MM-yyyy'),
            skhomHodshe : parseFloat((skhom / hotsaa.aorkhTkofa).toFixed(2)),
            sog: hotsaa.shem,
            msbarSbak: sbakID
        }
        try {
            await updateDoc(doc(firestore,'metadata','counterTnoahBkneot'),{
                count : counterKneot?.count + 1
            })
            await addDoc(collection(firestore, 'tnoahBkneot'), tnoah);
        }
        catch (e) {
            console.log(e);
        }
        if(hotsaa?.zmanTshlom === 'חד פעמי'){
            await updateDoc(doc(firestore,'hotsaot',hotsaa.id),{
                count2 : hotsaa.munth === format(new Date(),'MM-yyyy') ? ((hotsaa?.count2 + parseFloat(skhom))) : parseFloat(skhom),
                munth : format(new Date(),'MM-yyyy')
            });
        }
        else{
            await updateDoc(doc(firestore,'hotsaot',hotsaa.id),{
                munth :format(new Date(),'MM-yyyy'),
                hotsaaShoteft : hotsaa.munth === format(new Date(),'MM-yyyy') ? (((hotsaa?.hotsaaShoteft || 0) + parseFloat(skhom / hotsaa.aorkhTkofa))) : parseFloat(skhom / hotsaa.aorkhTkofa),
                hotsaaShoteftClicks : (hotsaa?.hotsaaShoteftClicks || 0) + 1,
            });
        }
        if(AemHeshbonet){
            await updateDoc(doc(firestore,'metadata','counterNekoeMaam'),{
                count : counterNekoeMaam.munth === format(new Date(),'dd-MM-yyyy') ? counterNekoeMaam.count + (skhom * 0.17) : (skhom * 0.17),
                munth : format(new Date(),'dd-MM-yyyy')
            })
        }
        await updateDoc(doc(firestore,'sbkem',sbakObject?.id),{
            ytratHeshvon : parseFloat(sbakObject?.ytratHeshvon) - parseFloat(skhom)
        });
    }
    const handleSubmitMsem = async() => {
        const tnoah = {
            berot: null,
            msbar: counterKneot?.count,
            skhom: skhom,
            shaa: format(new Date, 'HH:mm'),
            tarekh: format(new Date, 'dd-MM-yyyy'),
            skhomHodshe : parseFloat((skhom / hotsaa.aorkhTkofa).toFixed(2)),
            sog: hotsaa.shem,
            msbarSbak: sbakID
        }
        try {
            await updateDoc(doc(firestore,'metadata','counterTnoahBkneot'),{
                count : counterKneot?.count + 1
            })
            await addDoc(collection(firestore, 'tnoahBkneot'), tnoah);
        }
        catch (e) {
            console.log(e);
        }
        if(hotsaa?.zmanTshlom === 'חד פעמי'){
            await updateDoc(doc(firestore,'hotsaot',hotsaa.id),{
                count2 : hotsaa.munth === format(new Date(),'MM-yyyy') ? ((hotsaa?.count2 + parseFloat(skhom))) : parseFloat(skhom),
                munth : format(new Date(),'MM-yyyy')
            });
        }
        else{
            await updateDoc(doc(firestore,'hotsaot',hotsaa.id),{
                munth : format(new Date(),'MM-yyyy'),
                hotsaaShoteft : hotsaa.munth === format(new Date(),'MM-yyyy') ? (((hotsaa?.hotsaaShoteft || 0) + parseFloat(skhom / hotsaa.aorkhTkofa))) : parseFloat(skhom / hotsaa.aorkhTkofa),
                hotsaaShoteftClicks : (hotsaa?.hotsaaShoteftClicks || 0) + 1,
            });
        }
        if(AemHeshbonet){
            await updateDoc(doc(firestore,'metadata','counterNekoeMaam'),{
                count : counterNekoeMaam.munth === format(new Date(),'dd-MM-yyyy') ? counterNekoeMaam.count + (skhom * 0.17) : (skhom * 0.17),
                munth : format(new Date(),'dd-MM-yyyy')
            })
        }
        if (AemTshlom) {
            aemTshlom(true, skhom, sbakObject, hotsaa.sogHotsaa, 'sbkem');
        }
        else {
            aemTshlom(false, null, null, null, null);
        };
        await updateDoc(doc(firestore,'sbkem',sbakObject?.id),{
            ytratHeshvon : parseFloat(sbakObject?.ytratHeshvon) - parseFloat(skhom)
        });
    };

    function GetTotalPriceShop(val) {
        let res = 0;
        for (let index = 0; index < val.length; index++) {
            res += (parseFloat(val[index].amount) * parseFloat(entries[index].price));
        }
        return res;
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
    function truncateToTwoDecimals(num) {
        const truncatedNum = num.toFixed(2);
        return truncatedNum;
    }
    function GetMsbarMotsar(val) {
        for (let index = 0; index < mlae.length; index++) {
            if (mlae[index].shem === val) {
                return mlae[index];
            }
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };


    const GetSkhomKolel = () => {
        let skhom = 0;
        for (let index = 0; index < entries.length; index++) {
            skhom += (entries[index].amount * entries[index].price);
        }
        return skhom;
    }

    const handleChangeHotsaot = (index, key, value) => {
        setHotsaotSkharAobdem(prevState => {
            const updatedArray = [...prevState];
            updatedArray[index][key] = value;
            return updatedArray;
        });
    };

    useEffect(() => {
        if (show && counter.hotsaotDafeShaot) {
            if (counter.hotsaotDafeShaot !== format(new Date(), 'MM-yyyy')) {
                setShowHodatAemotBaolatHotsaotAobdem('האם אתה בטוח לעשות הפעולה !!');
                setShowHodatAemotBaolatHotsaotAobdemRes(true);
            }
            else {
                setShowHodatAemotBaolatHotsaotAobdem('אין באפשרותך לעשות הפעולה בזמן הנוכחי !!');
                setShowHodatAemotBaolatHotsaotAobdemRes(false);
            }
        }
    }, [show]);





    const GetMsemProps = () => {
        if (hotsaa?.sogHotsaa === 'מסים' && hotsaa?.zmanTshlom === 'חד פעמי') {
            return <div>
                <div />
                <div className='overflow-auto h-[300px] flex justify-center w-full max-w-[900px] min-w-[400px]'>
                    <form className='w-full'>
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
                                            (hotsaa?.sogHotsaa === sbak?.sherot) && <AutocompleteItem className='text-right' key={sbak.msbar} value={sbak.msbar} onClick={() => { setSbakID(sbak.msbar); setSbakObject(sbak) }}>
                                                {sbak.shem}
                                            </AutocompleteItem>
                                        ))
                                    }
                                </Autocomplete>
                                <Button onClick={() => disable(true)}>הוספה</Button>
                                {
                                    hotsaa?.sogHotsaa !== 'מסים' &&
                                    <Switch dir="ltr" size="lg" className="mr-5" isSelected={AemHeshbonet} value={AemHeshbonet} onValueChange={(val) => setAemHeshbonet(val)}>
                                        עם חישבונית
                                    </Switch>
                                }
                            </div>
                        </div>
                        <Divider />
                        <Input className="max-w-[150px] m-5" value={skhom || ''} onValueChange={(val) => setSkhom(val)} type="number" label="סכום" />
                    </form>
                </div>
                <div className='p-2'></div>
            </div>
        }
        else if (hotsaa?.sogHotsaa === 'מסים' && hotsaa?.zmanTshlom === 'תקופתי') {
            return <div>
                <div />
                <div className='overflow-auto h-[300px] flex justify-center w-full max-w-[900px] min-w-[400px]'>
                    <form className='w-full'>
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
                                            (hotsaa.sogHotsaa === sbak.sherot) && <AutocompleteItem className='text-right' key={sbak.msbar} value={sbak.msbar} onClick={() => { setSbakID(sbak.msbar); setSbakObject(sbak) }}>
                                                {sbak.shem}
                                            </AutocompleteItem>
                                        ))
                                    }
                                </Autocomplete>
                                <Button onClick={() => disable(true)}>הוספה</Button>
                            </div>
                        </div>
                        <Divider />
                        <Input className="max-w-[150px] m-5" value={skhom || ''} onValueChange={(val) => setSkhom(val)} type="number" label="סכום" />
                    </form>
                </div>
                <div className='p-2'></div>
            </div>
        }
        // else if(){

        // }
    }


    return (
        <Modal placement="center" className="test-fontt " backdrop={"blur"} size="5xl" isOpen={show} onClose={ResetAll}>
            <ModalContent>
                <>
                    <ModalHeader className="shadow-2xl flex justify-center">{hotsaa?.shem} הוצאת</ModalHeader>
                    <ModalBody className="shadow-2xl">
                        <div dir="rtl" className="p-5 w-full">
                            {
                                (hotsaa?.sogHotsaa === 'הוצאות שכר') &&
                                <ModalMessage withoutBlur yetsor={showHodatAemotBaolatHotsaotAobdemRes} Aeshor={(val) => {
                                    if (val) {
                                        setGetData(true);
                                    }
                                    else {
                                        disable();
                                    }

                                }} message={showHodatAemotBaolatHotsaotAobdem} show={showHodatAemotBaolatHotsaotAobdem && true} disable={() => setShowHodatAemotBaolatHotsaotAobdem('')} />
                            }


                            {loading && <Spinner className='absolute top-0 left-0 bottom-0 right-0' />}
                            {
                                (hotsaa?.sogHotsaa === 'קניות מוצרים') &&
                                <div>
                                    <div ref={topOfFormRef} />
                                    <div className='overflow-auto h-[500px] flex justify-center w-full max-w-[900px] min-w-[400px]'>
                                        <form className='w-full'>
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
                                                                (hotsaa.sogHotsaa === sbak.sherot) && <AutocompleteItem className='text-right' key={sbak.msbar} value={sbak.msbar} onClick={() => { setSbakID(sbak.msbar); setSbakObject(sbak) }}>
                                                                    {sbak.shem}
                                                                </AutocompleteItem>
                                                            ))
                                                        }
                                                    </Autocomplete>
                                                    <Button onClick={() => {disable(true);}}>הוספה</Button>
                                                    <Switch dir="ltr" size="lg" className="mr-5" isSelected={AemHeshbonet} value={AemHeshbonet} onValueChange={(val) => setAemHeshbonet(val)}>
                                                        עם חישבונית
                                                    </Switch>
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
                                                                <DropdownItem key="מוצרים אחרים">מוצרים אחרים</DropdownItem>
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
                                                                        return (motsar.categoryMotsar === entry.remez) && (motsar.active) && <DropdownItem key={motsar?.shem}>{motsar?.shem}</DropdownItem>
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
                                            </div>
                                            <div ref={endOfFormRef} />
                                        </form>
                                    </div>
                                    <div className='p-2'></div>
                                </div>
                            }
                            {
                                ((hotsaa?.sogHotsaa === 'הוצאות שוטפות') && (hotsaa?.zmanTshlom === 'תקופתי')) &&
                                <div>
                                    <div />
                                    <div className='overflow-auto h-[300px] flex justify-center w-full max-w-[900px] min-w-[400px]'>
                                        <form className='w-full'>
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
                                                                (hotsaa.sogHotsaa === sbak.sherot) && <AutocompleteItem className='text-right' key={sbak.msbar} value={sbak.msbar} onClick={() => { setSbakID(sbak.msbar); setSbakObject(sbak) }}>
                                                                    {sbak.shem}
                                                                </AutocompleteItem>
                                                            ))
                                                        }
                                                    </Autocomplete>
                                                    <Button onClick={() => disable(true)}>הוספה</Button>
                                                    <Switch dir="ltr" size="lg" className="mr-5" isSelected={AemHeshbonet} value={AemHeshbonet} onValueChange={(val) => setAemHeshbonet(val)}>
                                                        עם חישבונית
                                                    </Switch>
                                                </div>
                                            </div>
                                            <Divider />
                                            <Input className="max-w-[150px] m-5" value={skhom || ''} onValueChange={(val) => setSkhom(val)} type="number" label="סכום" />
                                        </form>
                                    </div>
                                    <div className='p-2'></div>
                                </div>
                            }
                            
                            {
                                GetMsemProps()
                            }

                            {
                                ((hotsaa?.sogHotsaa === 'הוצאות אחרות') || (hotsaa?.sogHotsaa === 'הוצאות שוטפות' && hotsaa?.zmanTshlom === 'חד פעמי')) &&
                                <div>
                                    <div />
                                    <div className='overflow-auto h-[300px] flex justify-center w-full max-w-[900px] min-w-[400px]'>
                                        <form className='w-full'>
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
                                                                (hotsaa?.sogHotsaa === sbak?.sherot) && <AutocompleteItem className='text-right' key={sbak.msbar} value={sbak.msbar} onClick={() => { setSbakID(sbak.msbar); setSbakObject(sbak) }}>
                                                                    {sbak.shem}
                                                                </AutocompleteItem>
                                                            ))
                                                        }
                                                    </Autocomplete>
                                                    <Button onClick={() => disable(true)}>הוספה</Button>
                                                    {
                                                        hotsaa?.sogHotsaa !== 'מסים' &&
                                                        <Switch dir="ltr" size="lg" className="mr-5" isSelected={AemHeshbonet} value={AemHeshbonet} onValueChange={(val) => setAemHeshbonet(val)}>
                                                            עם חישבונית
                                                        </Switch>
                                                    }
                                                </div>
                                            </div>
                                            <Divider />
                                            <Input className="max-w-[150px] m-5" value={skhom || ''} onValueChange={(val) => setSkhom(val)} type="number" label="סכום" />
                                        </form>
                                    </div>
                                    <div className='p-2'></div>
                                </div>
                            }
                            {
                                (hotsaa?.sogHotsaa === 'הוצאות שכר') &&
                                <div className="w-full">
                                    <div className='overflow-auto h-[300px] w-full'>
                                        <table dir="ltr" className="w-full table-auto border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                                                    <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-white to-gray-50 font-extrabold text-black">שכר ניטו</th>
                                                    <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-50 to-gray-100 font-extrabold text-black">פצויים</th>
                                                    <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-100 to-gray-200 font-extrabold text-black">בנסייה - הפקדת מעסיק</th>
                                                    <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-200 to-gray-300 font-extrabold text-black">בנסייה - הפקדת עובד</th>
                                                    <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-300 to-gray-400 font-extrabold text-black">ביטוח בראות</th>
                                                    <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-400 to-gray-500 font-extrabold text-black">ביטוח לאומי</th>
                                                    <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-500 to-gray-600 font-extrabold text-black">מס הכנסה</th>
                                                    <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-600 to-gray-700 font-extrabold text-black">שכר ברוטו</th>
                                                    <th className="px-4 py-2 text-center text-[14px] bg-gradient-to-r from-gray-700 to-gray-800 font-extrabold text-black">שם עובד</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    hotsaotSkharAobdem.map((aobed, index) => {
                                                        return <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Input isReadOnly value={parseFloat(((aobed.skharBroto - aobed.msHkhnsa - aobed.betoahLaome - aobed.betoahBreaot - aobed.bnseaa1)).toFixed(2))} color="primary" size="xs" type="number" /></td>
                                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Input onValueChange={(val) => handleChangeHotsaot(index, 'betsoeem', parseFloat(val))} value={(aobed.betsoeem).toFixed(2) || ''} color="primary" size="xs" type="number" /></td>
                                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Input onValueChange={(val) => handleChangeHotsaot(index, 'bensea2', parseFloat(val))} value={(aobed.bensea2).toFixed(2) || ''} color="primary" size="xs" type="number" /></td>
                                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Input onValueChange={(val) => handleChangeHotsaot(index, 'bnseaa1', parseFloat(val))} value={(aobed.bnseaa1).toFixed(2) || ''} color="primary" size="xs" type="number" /></td>
                                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Input onValueChange={(val) => handleChangeHotsaot(index, 'betoahBreaot', parseFloat(val))} value={(aobed.betoahBreaot).toFixed(2) || ''} color="primary" size="xs" type="number" /></td>
                                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Input onValueChange={(val) => handleChangeHotsaot(index, 'betoahLaome', parseFloat(val))} value={(aobed.betoahLaome).toFixed(2) || ''} color="primary" size="xs" type="number" /></td>
                                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Input onValueChange={(val) => handleChangeHotsaot(index, 'msHkhnsa', parseFloat(val))} value={(aobed.msHkhnsa).toFixed(2) || ''} color="primary" size="xs" type="number" /></td>
                                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300"><Input onValueChange={(val) => handleChangeHotsaot(index, 'skharBroto', parseFloat(val))} value={(aobed.skharBroto).toFixed(2) || ''} color="primary" size="xs" type="number" /></td>
                                                            <td className="px-4 py-3 text-center text-[12px] text-gray-700 dark:text-gray-300">{aobed?.shem}</td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='p-2'></div>
                                </div>
                            }
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <div className="w-full flex items-center justify-between">
                            <div className="w-full flex items-center">
                                {/* <Switch dir="ltr" size="lg" className="mr-5" isSelected={AemTshlom} value={AemTshlom} onValueChange={(val) => setAemTshlom(val)}>
                                    {
                                        hotsaa?.sogHotsaa === 'הוצאות שכר' ?
                                            <div className="text-primary">תשלום רק שכר</div>
                                            :
                                            <div className="text-primary">עם תשלום</div>
                                    }
                                </Switch> */}
                                {
                                    hotsaa?.sogHotsaa === 'הוצאות שכר' ?
                                        null
                                        :
                                        <div dir="rtl">
                                            <Input isReadOnly size="sm" color="success" type="number" value={GetSkhomKolel() || skhom || ''} className="max-w-[150px] m-5" label='סכום כולל' />
                                        </div>
                                }
                            </div>
                            <div className="w-full flex items-center justify-end">
                                <Button size="lg" className="mr-5" color="primary" onClick={ResetAll}>
                                    סגור
                                </Button>
                                <Button isLoading={loading} onClick={handleSubmit} size="lg" color="primary">
                                    אישור
                                </Button>
                            </div>
                        </div>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}

