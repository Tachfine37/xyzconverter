import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MenuGroup {
    title: string
    icon?: string
    href?: string
    items: {
        label: string
        href: string
    }[]
}

interface MegaDropdownMenuProps {
    trigger: string
    groups: MenuGroup[]
    className?: string
}

export function MegaDropdownMenu({ trigger, groups, className }: MegaDropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false)
        }, 150)
    }

    // Split groups into format conversions and tools
    const formatGroups = groups.filter(g => g.title !== 'Image Tools')
    const toolsGroup = groups.find(g => g.title === 'Image Tools')

    return (
        <div
            ref={dropdownRef}
            className={cn("relative", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {trigger}
                <ChevronDown
                    className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background border rounded-xl shadow-xl py-4 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 min-w-[600px]">
                    {/* Format Groups Grid */}
                    <div className="grid grid-cols-3 gap-4 px-2">
                        {formatGroups.map((group) => (
                            <div key={group.title} className="space-y-2">
                                <Link
                                    to={group.href || '#'}
                                    className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors px-2 py-1"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {group.icon && <span>{group.icon}</span>}
                                    {group.title}
                                </Link>
                                <div className="space-y-0.5">
                                    {group.items.map((item) => (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            className="block px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Separator and Tools Section */}
                    {toolsGroup && (
                        <>
                            <div className="border-t my-3 mx-2" />
                            <div className="px-2">
                                <div className="flex items-center gap-2 text-sm font-semibold text-foreground px-2 py-1 mb-1">
                                    <span>🛠️</span>
                                    {toolsGroup.title}
                                </div>
                                <div className="flex gap-4">
                                    {toolsGroup.items.map((item) => (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
