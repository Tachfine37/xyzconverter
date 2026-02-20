import { CheckCircle2 } from "lucide-react"

interface SEOContentProps {
    content: {
        howItWorks?: {
            title: string
            steps: string[]
        }
        benefits?: string[]
        features?: string[]
    }
}

export function SEOContentSection({ content }: SEOContentProps) {
    if (!content) return null

    return (
        <div className="grid md:grid-cols-2 gap-8 py-12">
            {/* How It Works Section */}
            {content.howItWorks && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">{content.howItWorks.title}</h2>
                    <div className="space-y-4">
                        {content.howItWorks.steps.map((step, index) => (
                            <div key={index} className="flex gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                                    {index + 1}
                                </div>
                                <div className="flex items-center">
                                    <p className="font-medium">{step}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Benefits Section */}
            {content.benefits && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Benefits & Features</h2>
                    <div className="grid gap-4">
                        {content.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                <span className="text-base">{benefit}</span>
                            </div>
                        ))}
                        {/* Also show remaining features if available and not redundant? 
                            Usually features and benefits overlap, but we can verify.
                         */}
                    </div>
                </div>
            )}
        </div>
    )
}
