

export default function RootLayout(props) {
  const { children } = props;
    return (
        <html lang="en" suppressHydrationWarning>
            <body data-new-gr-c-s-check-loaded="14.1226.0" data-gr-ext-installed="" cz-shortcut-listen="true">
                <main className="min-h-screen">
                    {/* Admin header or sidebar could go here */}
                    {children}
                </main>
            </body>
        </html>
    );
}