import "./globals.css";

export const metadata = {
    title: "Family Day Tracker",
    description: "Real-time GPS tracker for Family Day",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}