import React from "react";

const LINKS = [
    {
        title: "Հարթակ",
        items: [
            { label: "Գլխավոր",     href: "/" },
            { label: "Հիվանդներ",   href: "/patients" },
            { label: "Նշումներ",    href: "/notes" },
            { label: "Հաշվետվություն", href: "/reports" },
        ],
    },
    {
        title: "Աջակցություն",
        items: [
            { label: "Կոնտակտ",       href: "/contact" },
            { label: "Օգնություն",     href: "/help" },
            { label: "Գաղտնիություն",  href: "/privacy" },
            { label: "Պայմաններ",      href: "/terms" },
        ],
    },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer style={styles.footer}>
            <div style={styles.inner}>

                {/* Logo + tagline */}
                <div style={styles.brand}>
                    <div style={styles.logo}>
                        <span style={styles.logoIcon}>⚕</span>
                        <span style={styles.logoText}>Առողջ<span style={styles.logoAccent}>Platform</span></span>
                    </div>
                    <p style={styles.tagline}>
                        Բժշկական կառավարման ժամանակակից լուծում՝<br />
                        հիվանդների, բժիշկների,նշումների և հաշվետվությունների համար։
                    </p>
                </div>

                {/* Link columns */}
                <div style={styles.links}>
                    {LINKS.map((col) => (
                        <div key={col.title} style={styles.col}>
                            <div style={styles.colTitle}>{col.title}</div>
                            {col.items.map((item) => (
                                <a key={item.label} href={item.href} style={styles.link}
                                    onMouseEnter={(e) => e.target.style.color = "#2563eb"}
                                    onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div style={styles.bottom}>
                <span style={styles.copy}>© {year} ԱռողջPlatform։ Բոլոր իրավունքները պաշտպանված են։</span>
                <div style={styles.bottomLinks}>
                    <a href="/privacy" style={styles.bottomLink}
                        onMouseEnter={(e) => e.target.style.color = "#2563eb"}
                        onMouseLeave={(e) => e.target.style.color = "#6b7280"}
                    >Գաղտնիություն</a>
                    <span style={styles.dot}>·</span>
                    <a href="/terms" style={styles.bottomLink}
                        onMouseEnter={(e) => e.target.style.color = "#2563eb"}
                        onMouseLeave={(e) => e.target.style.color = "#6b7280"}
                    >Պայմաններ</a>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: "#f9fafb",
        borderTop: "1px solid #e5e7eb",
        marginTop: "60px",
        fontFamily: "sans-serif",
    },
    inner: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 24px 32px",
        display: "flex",
        justifyContent: "space-between",
        gap: "40px",
        flexWrap: "wrap",
    },

    // Brand
    brand: { maxWidth: "280px" },
    logo: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" },
    logoIcon: { fontSize: "22px" },
    logoText: { fontSize: "20px", fontWeight: "700", color: "#1a2e4a" },
    logoAccent: { color: "#2563eb" },
    tagline: { fontSize: "13px", color: "#6b7280", lineHeight: "1.7", margin: 0 },

    // Links
    links: { display: "flex", gap: "48px", flexWrap: "wrap" },
    col: { display: "flex", flexDirection: "column", gap: "10px" },
    colTitle: { fontSize: "13px", fontWeight: "600", color: "#1a2e4a", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" },
    link: { fontSize: "13px", color: "#9ca3af", textDecoration: "none", transition: "color 0.15s" },

    // Bottom
    bottom: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "18px 24px",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
    },
    copy: { fontSize: "12px", color: "#9ca3af" },
    bottomLinks: { display: "flex", alignItems: "center", gap: "8px" },
    bottomLink: { fontSize: "12px", color: "#6b7280", textDecoration: "none", transition: "color 0.15s" },
    dot: { color: "#d1d5db", fontSize: "12px" },
};

export default Footer;
