'use client';
import React, { useContext, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuItem, NavbarMenuToggle, NavbarMenu } from "@nextui-org/react";
import { useAuth } from "../auth/authContext";
import { FcSalesPerformance } from "react-icons/fc";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { MdAddChart } from "react-icons/md";
import { FcManager } from "react-icons/fc";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import ContactContext from "../auth/ContactContext";
import { CgProfile } from "react-icons/cg";


export default function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { signUp, signIn, signOutt, currentUser } = useAuth();
    const { contactName, setContactName, customerSet, setCustomerSet, isNehol, setIsNehol } = useContext(ContactContext);
    const menuItems = [
        "רישוי",
        "עובדים",
        "כספים",
        "יצור",
        "מלאי",
    ];

    const GetItemHerf = (item) => {
        if (item === 'רישוי') {
            return '/activion';
        }
        else if (item === 'עובדים') {
            return '/aobdem';
        }
        else if (item === 'כספים') {
            return '/management';
        }
        else if (item === 'יצור') {
            return '/';
        }
        else if (item === 'מלאי') {
            return '/procurement';
        }
    }

    const GetIconItem = (item) => {
        if (item === 'רישוי') {
            return <IoNewspaperSharp className="text-2xl text-gray-600" />;
        }
        else if (item === 'עובדים') {
            return <GrUserWorker className="text-2xl text-black" />;
        }
        else if (item === 'כספים') {
            return <FcManager className="text-[26px]" />;
        }
        else if (item === 'יצור') {
            return <MdAddChart className="text-2xl text-danger-400" />;
        }
        else if (item === 'מלאי') {
            return <BiSolidPurchaseTag className="text-2xl text-green-400" />;
        }
    }

    return (
        <Navbar className="" dir="rtl" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden"
                />
                <NavbarBrand>
                    <div className="font-bold text-inherit"></div>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden lg:flex gap-4" justify="center">
                {
                    isNehol &&
                    <NavbarItem>
                        <Link color="foreground" href="/Profile">
                            <Button variant="light" color="primary" className="text-lg">דף אישי<CgProfile className="text-2xl text-primary-400" /></Button>
                        </Link>
                    </NavbarItem>
                }
                <NavbarItem>
                    <Link href="/" color="foreground">
                        <Button variant="light" color="primary" className="text-lg">ייצור<MdAddChart className="text-2xl text-danger-400" /></Button>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/management">
                        <Button variant="light" color="primary" className="text-lg">כספים<FcManager className="text-[26px]" /></Button>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/activion">
                        <Button variant="light" color="primary" className="text-lg">רישוי<IoNewspaperSharp className="text-2xl text-gray-600" /></Button>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/procurement">
                        <Button variant="light" color="primary" className="text-lg">מלאי<BiSolidPurchaseTag className="text-2xl text-green-400" /></Button>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/aobdem">
                        <Button variant="light" color="primary" className="text-lg">עובדים<GrUserWorker className="text-2xl text-black" /></Button>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button onClick={signOutt} color="danger" variant="flat">
                        יצאה מהחשבון
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full text-right border-b-1 p-1"
                            dir="rtl"
                            href={GetItemHerf(item)}
                            size="lg"
                        >
                            <div className="w-full flex justify-between items-center">{item}{GetIconItem(item)}</div>
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
        // <Navbar className="hebrow_font">
        //     <NavbarBrand>
        //         <p className="font-bold text-inherit">גררי עירון</p>
        //     </NavbarBrand>
        //     <NavbarContent className="hidden sm:flex gap-8" justify="center">
        //         <NavbarItem>
        //             <Link color="foreground" href="/activion" className="text-xl">
        //                 משרד תחבורה
        //             </Link>
        //         </NavbarItem>
        //         <NavbarItem>
        //             <Link color="foreground" href="/customers" className="text-xl">
        //                 לקוחות
        //             </Link>
        //         </NavbarItem>
        //         <NavbarItem>
        //             <Link color="foreground" href="/mony" className="text-xl">
        //                 כסיפים
        //             </Link>
        //         </NavbarItem>

        //         <NavbarItem>
        //             <Link color="foreground" href="/inventory" className="text-xl">
        //                 מלאי
        //             </Link>
        //         </NavbarItem>
        //         <NavbarItem>
        //             <Link color="foreground" href="/add" className="text-xl">
        //                 עגלות
        //             </Link>
        //         </NavbarItem>

        //         <NavbarItem>
        //             <Link color="foreground" href="/" aria-current="page" className="text-xl">
        //                 תפעול
        //             </Link>
        //         </NavbarItem>
        //     </NavbarContent>
        //     <NavbarContent justify="end">

        //         {
        //             currentUser && <Button>יצאה מהשבון</Button>
        //         }

        //     </NavbarContent>
        // </Navbar>
    )
}




