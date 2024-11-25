"use client";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import Link from 'next/link';
import { clsx } from 'clsx';
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 z-50 w-48 bg-[#EBEBEB] h-full shadow-lg', // Sidebar fixed on the left side
      )}
    >
      <div className="flex flex-col h-full">
        <nav className="flex flex-col py-4">

          <Link
            className={clsx(
              "flex justify-start p-3",
              pathname === "/" ? "bg-white text-[#5CC3A4]" : "hover:bg-slate-50"
            )}
            href="/" passHref
          >
            <MdOutlineAttachMoney
              className={clsx(
                "text-xl mr-3",
                pathname === "/" ? "text-[#5CC3A4]" : "text-[#838588]"
              )}
            />
            <p className={clsx(pathname === "/" ? "text-[#5CC3A4]" : "text-[#838588]")}>
              Vendre
            </p>
          </Link>

          <Link
            className={clsx(
              "flex justify-start p-3",
              pathname === "/stock" ? "bg-white text-[#5CC3A4]" : "hover:bg-slate-50"
            )}
            href="/stock" passHref
          >
            <IoFastFood
              className={clsx(
                "text-xl mr-3",
                pathname === "/stock" ? "text-[#5CC3A4]" : "text-[#838588]"
              )}
            />
            <p className={clsx(pathname === "/stock" ? "text-[#5CC3A4]" : "text-[#838588]")}>
              Stock
            </p>
          </Link>

          <Link
            className={clsx(
              "flex justify-start p-3",
              pathname === "/fournisseur" ? "bg-white text-[#5CC3A4]" : "hover:bg-slate-50"
            )}
            href="/fournisseur" passHref
          >
            <FaUser
              className={clsx(
                "text-xl mr-3",
                pathname === "/fournisseur" ? "text-[#5CC3A4]" : "text-[#838588]"
              )}
            />
            <p className={clsx(pathname === "/fournisseur" ? "text-[#5CC3A4]" : "text-[#838588]")}>
              Fournisseur
            </p>
          </Link>

          <Link
            className={clsx(
              "flex justify-start p-3",
              pathname === "/historique" ? "bg-white text-[#5CC3A4]" : "hover:bg-slate-50"
            )}
            href="/historique" passHref
          >
            <FaHistory
              className={clsx(
                "text-xl mr-3",
                pathname === "/historique" ? "text-[#5CC3A4]" : "text-[#838588]"
              )}
            />
            <p className={clsx(pathname === "/historique" ? "text-[#5CC3A4]" : "text-[#838588]")}>
              Historique
            </p>
          </Link>

          <Link
            className={clsx(
              "flex justify-start p-3",
              pathname === "/param" ? "bg-white text-[#5CC3A4]" : "hover:bg-slate-50"
            )}
            href="/param" passHref
          >
            <IoSettingsSharp
              className={clsx(
                "text-xl mr-3",
                pathname === "/param" ? "text-[#5CC3A4]" : "text-[#838588]"
              )}
            />
            <p className={clsx(pathname === "/param" ? "text-[#5CC3A4]" : "text-[#838588]")}>
              Paramètre
            </p>
          </Link>

        </nav>
      </div>
    </div>
  );
};

export default Sidebar;



