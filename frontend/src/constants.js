export const DEPARTMENTS = [
    "Կարդիոլոգիա",
    "Նյարդաբանություն",
    "Ակնաբուժություն",
    "Վիրաբուժություն",
];

export const STATUS_OPTIONS = ["Հաստատված", "Սպասում", "Ավարտված"];

export const REPORTS = {
    TITLE: "Հաշվետվություններ",
    EMPTY_REPORTS: "Հաշվատվություններ չկան",
    TOTAL_REPORTS: (totalNumber) => `Ընդամենը ${totalNumber} Հաշվատվություն`,
};

export const LOADING = "Բեռնվում է...";

export const NAVBAR = {
    TITLE: "🏥 ԱռողջPlatform",
    HOME: "Գլխավոր",
    PATIENTS: "Հիվանդներ",
    NOTIFICATIONS: "Ծանուցումներ",
    REPORTS: "Հաշվետվություններ",
    ABOUT: "Մեր Մասին",
};

export const PATIENTS = {
    TITLE: "Հիվանդներ",
    AGE: "Տարիք",
    TOTAL_PATIENTS: (totalNumber) => `Ընդամենը ${totalNumber} Հաշվատվություն`,
    ADD_PATIENT: "➕ Ավելացնել Հիվանդ",
    SEARCH: "Որոնել հիվանդ...",
};

export const STATUS_COLORS = (status) => {
    switch (status.toLowerCase()) {
        case "active":
            return "#2563a8";
        case "stable":
            return "#0d7c6f";
        case "pending":
            return "#b45309";
        default:
            return "#858484";
    }
};
export const ABOUT = {
    FOUNDED: {
        LABEL: "Հիմնադրվել է",
        ICON: "📅",
    },
    STAFF: {
        LABEL: "Անձնակազմ",
        ICON: "👥",
    },
    DOCTORS: "Մեր Բժիշկները",
};

export const STATISTICS = {
    TITLE: "Վիճակագրություն",
    PATIENTS: {
        TITLE: "Հիվանդներ",
        ICON: "👥",
        COLOR: "#2563a8",
    },
    DOCTORS: {
        TITLE: "Բժիշկներ",
        ICON: "👨‍⚕️",
        COLOR: "#0d7c6f",
    },
    APPOINTMENTS: {
        TITLE: "Ժամադրություններ",
        ICON: "📅",
        COLOR: "#b45309",
    },
    DEPARTMENT: {
        TITLE: "Բաժիններ",
        ICON: "🏥",
        COLOR: "#15803d",
    },
};

export const NOTIFICATIONS = {
    TITLE: "Ծանուցումներ",
};
