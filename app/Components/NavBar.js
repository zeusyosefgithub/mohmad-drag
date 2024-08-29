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


export default function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { signUp, signIn, signOutt, currentUser } = useAuth();
    const { contactName, setContactName, customerSet, setCustomerSet, isNehol, setIsNehol } = useContext(ContactContext);
    const menuItems = [
        "משרד תחבורה ",
        "עובדים",
        "ניהול",
        "יצור",
        "מכירות",
        "רכש",
    ];

    return (
        <Navbar dir="rtl" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <div className="font-bold text-inherit"></div>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/procurement">
                        <Button variant="light" color="primary" className="text-lg">רכש<BiSolidPurchaseTag className="text-2xl text-green-400" /></Button>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/sales">
                        <Button variant="light" color="primary" className="text-lg">מכירות<FcSalesPerformance className="text-2xl" /></Button>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/" color="foreground">
                        <Button variant="light" color="primary" className="text-lg">ייצור<MdAddChart className="text-2xl text-danger-400" /></Button>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/management">
                        <Button variant="light" color="primary" className="text-lg">ניהול<FcManager className="text-[26px]" /></Button>
                    </Link>
                </NavbarItem>
                {
                    !isNehol &&
                    <NavbarItem>
                        <Link color="foreground" href="/aobdem">
                            <Button variant="light" color="primary" className="text-lg">עובדים<GrUserWorker className="text-2xl text-black" /></Button>
                        </Link>
                    </NavbarItem>
                }
                <NavbarItem>
                    <Link color="foreground" href="/activion">
                        <Button variant="light" color="primary" className="text-lg">משרד תחבורה<IoNewspaperSharp className="text-2xl text-gray-600" /></Button>
                    </Link>
                </NavbarItem>
                <Button variant="light" color="primary" className="text-lg pr-8"><div>התראות</div><div className="absolute top-0 right-0 text-[17px] bg-primary-500 text-white w-[27px] rounded-full font-extrabold"><div className="">1</div></div><FaBell className="text-2xl text-blue-700" /></Button>
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
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
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