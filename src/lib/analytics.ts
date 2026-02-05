type AnalyticsEvent = {
    name: string
    properties?: Record<string, any>
    timestamp: number
}

const IS_PROD = import.meta.env.PROD

export const analytics = {
    /**
     * Track a specific event
     * @param name Event name (e.g., 'conversion_started')
     * @param properties Additional anonymous metadata
     */
    track(name: string, properties?: Record<string, any>) {
        const event: AnalyticsEvent = {
            name,
            properties,
            timestamp: Date.now()
        }

        // In production, this would send to Plausible/Fathom/PostHog
        // For MVP/Dev, we log to console to verify flow
        if (!IS_PROD) {
            console.groupCollapsed(`[Analytics] ${name}`)
            console.log('Event:', event)
            console.groupEnd()
        }

        // Example: Plausible generic integration
        // if (window.plausible) window.plausible(name, { props: properties })
    },

    /**
     * Track a page view
     * @param path Current path
     */
    pageView(path: string) {
        this.track('page_view', { path })
    }
}
