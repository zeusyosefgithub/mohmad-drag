'use client';
import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function NavBar() {

    const currentUser = null;

    return (
        <Navbar className="hebrow_font">
            <NavbarBrand>
                <p className="font-bold text-inherit">גררי עירון</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/activion" className="text-xl">
                        משרד תחבורה
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/customers" className="text-xl">
                        לקוחות
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/mony" className="text-xl">
                        כסיפים
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link color="foreground" href="/inventory" className="text-xl">
                        מלאי
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/add" className="text-xl">
                        עגלות
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link color="foreground" href="/" aria-current="page" className="text-xl">
                        תפעול
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">

                {
                    currentUser && <Button>יצאה מהשבון</Button>
                }

            </NavbarContent>
        </Navbar>
    )
}