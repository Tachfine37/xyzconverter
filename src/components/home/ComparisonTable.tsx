import { Shield, Cloud, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const comparisonData = [
    {
        feature: 'File size limit',
        us: 'No limit',
        them: '25-100 MB',
    },
    {
        feature: 'Account required',
        us: 'No',
        them: 'Usually',
    },
    {
        feature: 'Files uploaded?',
        us: 'Never',
        them: 'Always',
    },
    {
        feature: 'Batch export',
        us: 'Unlimited',
        them: '1-3 files free',
    },
    {
        feature: 'Ads',
        us: 'None',
        them: 'Everywhere',
    },
    {
        feature: 'Speed',
        us: 'Instant',
        them: 'Queue-based',
    },
    {
        feature: 'Cost',
        us: 'Free forever',
        them: '$5-15/mo',
    },
]

export function ComparisonTable() {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-sm font-medium mb-4 border border-border/50">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>Why XYZConverter</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                        We're not like <span className="text-primary">other converters</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        No uploads, no accounts, no limits.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="border-b border-border bg-muted/30">
                                    <th className="py-5 px-6 font-semibold text-muted-foreground text-sm uppercase tracking-wider w-1/3">
                                        Feature
                                    </th>
                                    <th className="py-5 px-6 font-bold text-primary text-sm uppercase tracking-wider w-1/3">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            XYZConverter
                                        </div>
                                    </th>
                                    <th className="py-5 px-6 font-semibold text-muted-foreground text-sm uppercase tracking-wider w-1/3">
                                        <div className="flex items-center gap-2">
                                            <Cloud className="w-4 h-4" />
                                            Cloud Converters
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, index) => (
                                    <tr
                                        key={row.feature}
                                        className={cn(
                                            "border-b border-border/50 hover:bg-muted/20 transition-colors",
                                            index === comparisonData.length - 1 ? "border-0" : ""
                                        )}
                                    >
                                        <td className="py-4 px-6 text-foreground font-medium">
                                            {row.feature}
                                        </td>
                                        <td className="py-4 px-6 text-foreground font-medium">
                                            <div className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                <span>{row.us}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                                <span>{row.them}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}
