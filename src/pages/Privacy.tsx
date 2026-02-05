export function Privacy() {
    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
            <div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy & Security</h1>
                <p className="text-lg text-muted-foreground">
                    Transparency is our core value. This policy explains how we process your files entirely on your device, ensuring zero data collection.
                </p>
                <p className="text-sm text-muted-foreground mt-4">Last checked: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="prose dark:prose-invert max-w-none space-y-12">
                {/* 1. Core Privacy Promise */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">1. No Data Collection</h2>
                    <p>
                        We operate with a strict <strong>zero-knowledge</strong> policy. We have designed our application so that we physically cannot access your files.
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0">
                        <li className="bg-muted/30 p-4 rounded-lg">
                            <strong>🚫 No Server Uploads</strong>
                            <p className="text-sm text-muted-foreground mt-1">Your files are never sent to our servers. All conversions happen locally in your browser.</p>
                        </li>
                        <li className="bg-muted/30 p-4 rounded-lg">
                            <strong>🚫 No User Accounts</strong>
                            <p className="text-sm text-muted-foreground mt-1">We do not require registration, login, or personal information to use our tools.</p>
                        </li>
                        <li className="bg-muted/30 p-4 rounded-lg">
                            <strong>🚫 No File Logging</strong>
                            <p className="text-sm text-muted-foreground mt-1">We do not track filenames, file sizes, or file content metadata.</p>
                        </li>
                        <li className="bg-muted/30 p-4 rounded-lg">
                            <strong>🚫 No Facial Recognition</strong>
                            <p className="text-sm text-muted-foreground mt-1">We do not scan images for faces or biometric data.</p>
                        </li>
                    </ul>
                </section>

                {/* 2. Client-Side Technology */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">2. How It Works (Client-Side Processing)</h2>
                    <p>
                        Unlike traditional online converters that require you to upload your sensitive documents to a remote server, <strong>xyzconverter</strong> uses advanced web technologies (WebAssembly and modern Browser APIs) to process your files strictly within your device's memory.
                    </p>
                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
                        <h4 className="font-semibold mb-2">The Journey of Your File:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                            <li>You select a file from your device.</li>
                            <li>Your browser grants temporary access to that specific file.</li>
                            <li>The conversion code runs locally on your CPU/GPU.</li>
                            <li>The converted file is saved directly back to your device.</li>
                            <li>At no point does the file leave your computer or phone.</li>
                        </ol>
                    </div>
                </section>

                {/* 3. GDPR Compliance */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">3. GDPR Compliance</h2>
                    <p>
                        We are fully committed to the principles of the General Data Protection Regulation (GDPR). Our unique architecture serves privacy by design:
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg">Lawful Basis</h3>
                            <p>Since we do not collect or process personal data on our servers, strict "lawful basis for processing" (like consent or legitimate interest for data storage) does not apply to file content—because we never grasp it.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Your Rights</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong>Right to Access/Rectification:</strong> Not applicable (we hold no data to access or fix).</li>
                                <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You do not need to ask us to delete your files because we never had them.</li>
                                <li><strong>Right to Portability:</strong> Your files remain on your device, ensuring full portability at all times.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 4. Security */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">4. Security Information</h2>
                    <p>
                        Security is built into the architecture of our application.
                    </p>
                    <ul className="space-y-2 list-disc pl-5">
                        <li><strong>HTTPS Encryption:</strong> Our website is served exclusively over HTTPS, ensuring the integrity of the application code delivered to your browser.</li>
                        <li><strong>Sandboxed Environments:</strong> Conversions operate within the secure sandbox of your modern web browser.</li>
                        <li><strong>Third-Party Libraries:</strong> We use open-source libraries (e.g., for PDF and image processing) that run client-side. We regularly audit these dependencies for security vulnerabilities.</li>
                    </ul>
                </section>

                {/* 5. Analytics & Hosting */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">5. Analytics & Hosting</h2>
                    <p>
                        We use minimal, privacy-friendly analytics to understand general usage patterns (e.g., "Total PDFs converted").
                    </p>
                    <ul className="space-y-2 list-disc pl-5">
                        <li><strong>No Personal Identifiers:</strong> We do not use "fingerprinting" or collect IP addresses for tracking.</li>
                        <li><strong>Hosting:</strong> This website is hosted on a secure global CDN. The host may collect standard server logs (like non-identifiable access times) for security and reliability purposes.</li>
                    </ul>
                </section>

                {/* 6. Contact */}
                <section className="bg-muted/50 p-6 rounded-xl text-center space-y-4">
                    <h2 className="text-xl font-semibold">Privacy Questions?</h2>
                    <p>
                        If you have technical questions about our implementation or specific privacy concerns, please open a discussion on our development repository.
                    </p>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Contact via GitHub
                    </a>
                </section>
            </div>
        </div>
    )
}

