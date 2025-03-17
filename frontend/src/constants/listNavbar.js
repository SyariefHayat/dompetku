import { GoGoal } from "react-icons/go";
import { BiTransfer } from "react-icons/bi";
import { RiHome6Line } from "react-icons/ri";
import { MdHistory, MdOutlineAnalytics, MdOutlineNotificationsNone, MdOutlineLogout, MdOutlineDateRange, MdOutlineSettings, MdOutlineNotes } from "react-icons/md";
import { ArrowRightLeft, Bell, Calendar, ChartBar, Goal, History, Home, NotebookTabs } from "lucide-react";

const LIST_NAVBAR_LD = [
    {
        title: "Home",
        url: "#home"
    },
    {
        title: "Fitur",
        url: "#features"
    },
    {
        title: "Testimoni",
        url: "#clients"
    },
    {
        title: "Tanya Jawab",
        url: "#faq"
    }
]

const LIST_NAVBAR_DB = [
    {
        title: "Beranda",
        url: "/dashboard",
        icon: RiHome6Line,
    },
    {
        title: "Pemberitahuan",
        url: "/dashboard/notification",
        icon: MdOutlineNotificationsNone,
    },
    {
        title: "Kalender",
        url: "/dashboard/calender",
        icon: MdOutlineDateRange,
    },
    {
        title: "Catatan",
        url: "/dashboard/note",
        icon: MdOutlineNotes,
    }
]

const LIST_NAVBAR_DB_MONEY = [
    {
        title: "Transfer",
        url: "/dashboard/transfer",
        icon: BiTransfer,
    },
    {
        title: "Analisis",
        url: "/dashboard/analithyc",
        icon: MdOutlineAnalytics,
    },
    {
        title: "Rencana",
        url: "/dashboard/plan",
        icon: GoGoal,
    },
    {
        title: "Aktifitas",
        url: "/dashboard/activity",
        icon: MdHistory,
    },
]

const LIST_NAVBAR_DB_ACCOUNT = [
    {
        title: "Pengaturan",
        url: "/dashboard/setting",
        icon: MdOutlineSettings,
    },
    {
        title: "Keluar",
        url: "/dashboard/logout",
        icon: MdOutlineLogout,
    }
]

const LIST_NAVBAR = [
    {
        title: "Overview",
        items: [
            {
                title: "Beranda",
                url: "/dashboard",
                icon: Home,
            },
            {
                title: "Pemberitahuan",
                url: "/dashboard/notification",
                icon: Bell,
            },
            {
                title: "Kalender",
                url: "/dashboard/calender",
                icon: Calendar,
            },
            {
                title: "Catatan",
                url: "/dashboard/note",
                icon: NotebookTabs,
            }
        ]
    },
    {
        title: "Finansial",
        items: [
            {
                title: "Transfer",
                url: "/dashboard/payment",
                icon: ArrowRightLeft,
            },
            {
                title: "Analisis",
                url: "/dashboard/analithyc",
                icon: ChartBar,
            },
            {
                title: "Rencana",
                url: "/dashboard/plan",
                icon: Goal,
            },
            {
                title: "Aktifitas",
                url: "/dashboard/activity",
                icon: History,
            },
        ]
    }
]

export { LIST_NAVBAR_LD, LIST_NAVBAR_DB, LIST_NAVBAR_DB_MONEY, LIST_NAVBAR_DB_ACCOUNT, LIST_NAVBAR };