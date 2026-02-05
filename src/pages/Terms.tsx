export function Terms() {
    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
            <div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Use</h1>
                <p className="text-lg text-muted-foreground">
                    By using xyzconverter, you agree to these terms. Please read them carefully.
                </p>
                <p className="text-sm text-muted-foreground mt-4">Last checked: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="prose dark:prose-invert max-w-none space-y-12">
                {/* 1. Acceptance */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using <strong>xyzconverter</strong>, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    </p>
                </section>

                {/* 2. License */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">2. Use License</h2>
                    <p>
                        Permission is granted to temporarily use the materials (information or software) on xyzconverter's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Modify or copy the materials;</li>
                        <li>Attempt to decompile or reverse engineer any software contained on xyzconverter's website;</li>
                        <li>Remove any copyright or other proprietary notations from the materials; or</li>
                        <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>
                    <p>
                        This license shall automatically terminate if you violate any of these restrictions and may be terminated by xyzconverter at any time.
                    </p>
                </section>

                {/* 3. Disclaimer */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">3. Disclaimer</h2>
                    <p>
                        The materials on xyzconverter's website are provided on an 'as is' basis. xyzconverter makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                    <p>
                        Further, xyzconverter does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                    </p>
                </section>

                {/* 4. Limitations */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">4. Limitations</h2>
                    <p>
                        In no event shall xyzconverter or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on xyzconverter's website, even if xyzconverter or a xyzconverter authorized representative has been notified orally or in writing of the possibility of such damage.
                    </p>
                </section>

                {/* 5. Clean Usage */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold border-b pb-2">5. Prohibited Usage</h2>
                    <p>
                        You agree not to use the service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the service in any way that could damage the site, the services, or the general business of xyzconverter.
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>You may not use the service to convert files containing malware or viruses.</li>
                        <li>You may not use the service for any illegal activities.</li>
                    </ul>
                </section>
            </div>
        </div>
    )
}
