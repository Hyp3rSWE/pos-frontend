"use client";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoFastFood, IoSettingsSharp } from "react-icons/io5";
import { FaUser, FaHistory } from "react-icons/fa";
import Link from "next/link";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
    const pathname = usePathname();

    const links = [
        {
            href: "/",
            icon: MdOutlineAttachMoney,
            label: "Vendre",
        },
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
            href: "/login",
            icon: IoSettingsSharp,
            label: "Paramètre",
        },
    ];

    return (
        <div
            className={clsx(
                "fixed top-0 left-0 z-50 w-48 bg-[#EBEBEB] h-full shadow-lg" // Sidebar fixed on the left side
            )}
        >
            <div className="flex flex-col h-full">
                <nav className="flex flex-col py-4 space-around">
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
            </div>
        </div>
    );
};

export default Sidebar;
