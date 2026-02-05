/**
 * FAQ Component with Schema.org Structured Data
 * Displays frequently asked questions with SEO-optimized markup
 */

import { useEffect } from 'react'
import { injectStructuredData, generateFAQSchema } from '@/utils/structured-data'

interface FAQ {
    question: string
    answer: string
}

interface FAQSectionProps {
    faqs: FAQ[]
    title?: string
}

export function FAQSection({ faqs, title = 'Frequently Asked Questions' }: FAQSectionProps) {
    // Inject FAQ structured data on mount
    useEffect(() => {
        const schema = generateFAQSchema(faqs)
        injectStructuredData(schema)
    }, [faqs])

    return (
        <div className="max-w-4xl mx-auto mt-16 px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">{title}</h2>
            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <details
                        key={index}
                        className="group rounded-lg border border-border bg-card p-6 transition-all hover:shadow-md"
                    >
                        <summary className="flex items-center justify-between cursor-pointer list-none">
                            <h3 className="text-lg font-semibold text-foreground pr-4">
                                {faq.question}
                            </h3>
                            <svg
                                className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </summary>
                        <div className="mt-4 text-muted-foreground leading-relaxed border-t border-border pt-4">
                            {faq.answer}
                        </div>
                    </details>
                ))}
            </div>
        </div>
    )
}
