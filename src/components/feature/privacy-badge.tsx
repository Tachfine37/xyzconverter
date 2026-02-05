import { ShieldCheck } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function PrivacyBadge() {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                    <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 cursor-help hover:bg-emerald-500/15 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                        aria-label="Privacy information: Zero Data Egress"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-xs font-semibold tracking-wide">Private & Local</span>
                    </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-4 space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-5 h-5" />
                        <span>Zero Data Egress</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Your files never leave your device. All conversion processing happens entirely within your browser using WebAssembly.
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
