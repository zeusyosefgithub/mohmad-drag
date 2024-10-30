import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Card, CardBody, Input, Tooltip } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { GoPlusCircle } from 'react-icons/go';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { CgRemove } from "react-icons/cg";
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { formatNumber } from '../FireBase/getDocs';
import { TbExclamationMark } from "react-icons/tb";
import { MdError } from "react-icons/md";

const ProductCard = ({ motsarem, index, mlae, change, reset, src, add, remove,shlav }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextProduct = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevProduct = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
    };

    const selectProduct = (index) => {
        setCurrentIndex(index);
    };

    const GetBrtemMotsarMlae = useCallback((remez, shem) => {
        const motsarMlae = mlae?.filter(item => item.categoryMotsar === remez);
        const alot = motsarMlae?.find(item => item.shem === shem)?.alotLeheda || 0;
        const kmot = motsarMlae?.find(item => item.shem === shem)?.kmot || 0;
        const msbar = motsarMlae?.find(item => item.shem === shem)?.msbar || '';
        const id = motsarMlae?.find(item => item.shem === shem)?.id || '';
        return { arrayResualt: motsarMlae, alot, kmot, msbar,id };
    }, [mlae]);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts([...motsarem]);
    }, [motsarem]);

    const product = products[currentIndex] || {};

    const GetBorderColor = () => {
        if(product.message){
            return 'border-danger';
        }
        else{
            if(product.shem && (product.kmot || '')){
                return 'border-primary';
            }
            return '';
        }
    }

    const GetMessageKmotInput = () => {
        if (product.shem) {
            if (shlav === 'D') {
                if (product.kmot === product.yredatMlae) {
                    return <div className='text-success text-sm'>כמות נוכחית</div>
                }
                else if((product.kmot - product.yredatMlae) === GetBrtemMotsarMlae(product.remez, product.shem).kmot){
                    return <div className='text-warning text-sm'>כמות אחרונה</div>
                }
                else if ((GetBrtemMotsarMlae(product.remez, product.shem).kmot - (product.kmot - product.yredatMlae)) > GetBrtemMotsarMlae(product.remez, product.shem).kmot) {
                    return <div className='text-primary text-sm flex items-center'><div dir='ltr' className='mr-1 ml-1 font-black'>{GetBrtemMotsarMlae(product.remez, product.shem).kmot - (product.kmot - product.yredatMlae) - GetBrtemMotsarMlae(product.remez, product.shem).kmot}</div> בהחזרת <div dir='ltr' className='mr-1 ml-1 font-black'>{GetBrtemMotsarMlae(product.remez, product.shem).kmot - (product.kmot - product.yredatMlae)}</div> ישאר במלאי</div>
                }
                else if((GetBrtemMotsarMlae(product.remez, product.shem).kmot - (product.kmot - product.yredatMlae)) < GetBrtemMotsarMlae(product.remez, product.shem).kmot){
                    return <div className='text-primary text-sm flex items-center'><div dir='ltr' className='mr-1 ml-1 font-black'>{GetBrtemMotsarMlae(product.remez, product.shem).kmot + (product.kmot - product.yredatMlae) - GetBrtemMotsarMlae(product.remez, product.shem).kmot}</div> בלקחת עוד <div dir='ltr' className='mr-1 ml-1 font-black'>{GetBrtemMotsarMlae(product.remez, product.shem).kmot - (product.kmot - product.yredatMlae)}</div> ישאר במלאי</div>
                }
            }
            else {
                if (product.kmot === GetBrtemMotsarMlae(product.remez, product.shem).kmot) {
                    return <div className='text-warning text-sm'>כמות אחרונה</div>
                }
                else if ((GetBrtemMotsarMlae(product.remez, product.shem).kmot - product.kmot) > 0) {
                    return <div className='text-primary text-sm flex items-center'><div dir='ltr' className='mr-1 font-black'>{GetBrtemMotsarMlae(product.remez, product.shem).kmot - product.kmot}</div> נשאר במלאי</div>
                }
                else {
                    return <div className='text-danger text-sm flex items-center'><div dir='ltr' className='mr-1 font-black'>{GetBrtemMotsarMlae(product.remez, product.shem).kmot - product.kmot}</div> חרגת מהמלאי ב</div>
                }
            }
        }
    }

    return (
        <Card className={`m-5 overflow-hidden border ${GetBorderColor()}`}>
            <CardBody className=' overflow-hidden'>
                <div className="border-b flex w-full justify-between items-center pb-2 mb-2">
                    <div className="inline-block hover:animate-move-arrows cursor-pointer">
                        <IoIosArrowBack onClick={() => prevProduct()} className="text-4xl transform scale-x-[-1] hover:text-primary" />
                    </div>
                    <div className="flex items-center w-full">
                        <div className="mr-1 ml-1 w-full text-center bg-primary-100 rounded-full font-bold text-gray">{currentIndex + 1}</div>
                        <div className="mr-1 ml-1 w-full text-center flex justify-center"><GoPlusCircle onClick={() => { add(product?.remez); nextProduct(); }} className="min-h-[22px] min-w-[22px] rounded-full cursor-pointer hover:text-primary" /></div>
                    </div>

                    <div className="inline-block hover:animate-move-arrows cursor-pointer">
                        <IoIosArrowForward onClick={() => nextProduct()} className="text-4xl transform scale-x-[-1] hover:text-primary" />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={product?.id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="text-center p-2 rounded-lg overflow-hidden"
                    >
                        <div>
                            {
                                product.message && (
                                    <div className="">
                                        <Tooltip
                                            content={<div className='text-danger text-xs'>{product.message}</div>}
                                            placement="top"
                                            trigger="hover"
                                            className="z-50 border-1 border-danger"
                                            showArrow={true}
                                        >
                                            <div className="absolute left-0 top-0">
                                                <MdError className="text-2xl text-danger cursor-pointer" />
                                            </div>
                                        </Tooltip>
                                    </div>
                                )
                            }
                            <div className='w-full flex items-center max-w-[190px]'>
                                {
                                    product.shem && <div className='ml-1 w-[200px] text-sm text-right text-primary flex items-center'><div className='ml-1 font-black'>{GetBrtemMotsarMlae(product.remez, product.shem).kmot}</div> במלאי</div>
                                }
                                <Dropdown dir="rtl">
                                    <DropdownTrigger>
                                        <Button variant='flat' color={product?.shem ? 'primary' : 'default'} size='xs' className='w-full text-xs max-w-[190px]'>
                                            {product?.shem || 'בחר'}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        variant="flat"
                                        closeOnSelect={true}
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={product?.shem}
                                        onSelectionChange={(val) => change(product?.id, 'shem', val.currentKey)}
                                        className='max-h-[500px] overflow-auto'
                                    >
                                        {GetBrtemMotsarMlae(product?.remez).arrayResualt.map((option) => (
                                            <DropdownItem key={option.shem}>{option.shem}</DropdownItem>
                                        ))}
                                        {
                                            product?.shem && <DropdownItem color='warning' className="text-warning" onClick={() => reset(product?.id)}>הסרה</DropdownItem>
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                                </div>

                            <div className='w-full flex items-center max-w-[190px]'>
                                <div className='ml-1'>כמות</div>
                                <Tooltip
                                    content={GetMessageKmotInput()}
                                    placement="top"
                                    trigger="hover"
                                    className={`z-50 ${product.kmot && product.shem ? '' : 'hidden'}`}
                                    showArrow={product.kmot && product.shem && true}
                                >
                                    <Input type='number' color={product.message ? 'danger' : product.kmot ? 'primary' : 'default'} size='xs' value={product.kmot || ''} onValueChange={(val) => change(product.id, 'kmot', Math.min(val, (shlav === 'D') ? (GetBrtemMotsarMlae(product.remez,product.shem).kmot + product.yredatMlae) : 999))} className="mt-2 w-full max-w-[190px]" />
                                </Tooltip>
                            </div>

                            <div className="mt-3 flex justify-center">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl w-[80px] h-[70px] m-auto"
                                    src={src}
                                />
                            </div>
                            <div className='flex justify-between items-center h-[23px]'>
                                <div>
                                    {
                                        product.new && <div className=" m-2">
                                            <span className="bg-green-500 text-white rounded-full">
                                                <CgRemove onClick={() => { prevProduct(); remove(product?.id) }} className='text-danger text-xl cursor-pointer' />
                                            </span>
                                        </div>
                                    }
                                </div>
                                <div>
                                    {
                                        product.shem && (product.kmot || '') &&
                                        <div className=" m-2">
                                            <span className="bg-primary-500 text-white rounded-full p-1 flex items-center">
                                                <div className=' tracking-wide font-semibold'>{formatNumber(parseFloat(product.kmot) * GetBrtemMotsarMlae(product.remez, product.shem).alot)}</div><div className='mr-1'>₪</div>
                                            </span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <div dir='rtl' className="flex justify-center">
                    {products?.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => selectProduct(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer m-1 ${currentIndex === index
                                ? 'bg-gray-800'
                                : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </CardBody>
        </Card>
    );
};

export default ProductCard;



