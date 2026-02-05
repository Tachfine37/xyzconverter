/**
 * SEO Content Block Component
 * Displays informational content below conversion tools for SEO purposes
 */

interface SEOContentBlockProps {
    title: string
    description: string
    features?: string[]
    howItWorks?: {
        title: string
        steps: string[]
    }
    benefits?: string[]
}

export function SEOContentBlock({
    title,
    description,
    features,
    howItWorks,
    benefits
}: SEOContentBlockProps) {
    return (
        <div className="max-w-4xl mx-auto mt-16 space-y-12 px-4">
            {/* Main Description */}
            <section className="prose prose-slate dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
            </section>

            {/* Features Grid */}
            {features && features.length > 0 && (
                <section>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border"
                            >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                    <svg
                                        className="w-4 h-4 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <p className="text-sm text-foreground">{feature}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* How It Works */}
            {howItWorks && (
                <section>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                        {howItWorks.title || 'How It Works'}
                    </h3>
                    <ol className="space-y-3">
                        {howItWorks.steps.map((step, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </span>
                                <p className="text-muted-foreground pt-1">{step}</p>
                            </li>
                        ))}
                    </ol>
                </section>
            )}

            {/* Benefits */}
            {benefits && benefits.length > 0 && (
                <section>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                        Why Choose Our Converter?
                    </h3>
                    <ul className="space-y-2">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                <span className="text-primary mt-1">•</span>
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    )
}
