"use client";

import { MdOutlineAttachMoney } from "react-icons/md";
import { IoFastFood, IoSettingsSharp } from "react-icons/io5";
import { FaUser, FaHistory } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BsBox } from "react-icons/bs";
import Link from "next/link";
import { clsx } from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Sidebar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { userId, logout, role } = useUser();

    const links = [
        ...(role === "cashier" ? [
            {
                href: "/vendre",
                icon: MdOutlineAttachMoney,
                label: "Vendre",
            },
        ] : [
            {
                href: "/stock",
                icon: IoFastFood,
                label: "Stock",
            },
            {
                href: "/fournisseur",
                icon: FaUser,
                label: "Fournisseur",
            },
            {
                href: "/historique",
                icon: FaHistory,
                label: "Historique",
            },
            {
                href: "/products",
                icon: BsBox,
                label: "Products",
            },
            {
                href: "/param",
                icon: IoSettingsSharp,
                label: "Paramètre",
            },
        ]),
    ];

    return (
        <div className={clsx("fixed top-0 left-0 z-50 w-48 bg-[#EBEBEB] h-full shadow-lg")}>
            <div className="flex flex-col h-full">
                <nav className="flex flex-col py-4 space-around flex-1">
                    {links.map(({ href, icon: Icon, label }) => (
                        <Link
                            key={href}
                            className={clsx(
                                "flex flex-col m-2 mx-4 h-[15vh] rounded-2xl justify-center items-center p-1 shadow",
                                pathname === href
                                    ? "bg-white text-[#5CC3A4]"
                                    : "hover:bg-slate-50"
                            )}
                            href={href}
                            passHref
                        >
                            <Icon
                                className={clsx(
                                    "text-7xl",
                                    pathname === href
                                        ? "text-[#5CC3A4]"
                                        : "text-[#838588]"
                                )}
                            />
                            <p
                                className={clsx(
                                    "text-2xl",
                                    pathname === href
                                        ? "text-[#5CC3A4]"
                                        : "text-[#838588]"
                                )}
                            >
                                {label}
                            </p>
                        </Link>
                    ))}
                </nav>
                <button 
                    className="text-[#838588] text-2xl flex justify-evenly items-center p-4 hover:text-[#5CC3A4] mb-4" 
                    onClick={() => {
                        logout(); 
                        setTimeout(() => {
                          router.replace("/login"); 
                        }, 0);
                      }}
                      
                >
                    <div>Logout</div>
                    <RiLogoutBoxFill className="text-3xl" />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
