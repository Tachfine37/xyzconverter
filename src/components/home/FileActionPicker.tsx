import { ArrowRight, FileText, Crop, RotateCw, Minimize2, FileStack } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { FileAction, ConversionOption } from '@/utils/file-actions'

interface FileActionPickerProps {
    file: File
    actions: FileAction[]
    onActionSelected: (action: FileAction, conversionOption?: ConversionOption) => void
    onCancel: () => void
}

export function FileActionPicker({ file, actions, onActionSelected, onCancel }: FileActionPickerProps) {
    const primaryActions = actions.filter(a => a.isPrimary)
    const secondaryActions = actions.filter(a => !a.isPrimary)

    const handleActionClick = (action: FileAction, option?: ConversionOption) => {
        // All actions handled inline now
        onActionSelected(action, option)
    }

    const getActionIcon = (type: string) => {
        switch (type) {
            case 'convert': return FileText
            case 'resize': return Minimize2
            case 'crop': return Crop
            case 'rotate': return RotateCw
            case 'merge': return FileStack
            default: return FileText
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* File Info */}
            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={onCancel}>
                    Change File
                </Button>
            </div>

            {/* Primary Actions */}
            {primaryActions.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Primary Actions</h3>
                    {primaryActions.map(action => {
                        const Icon = getActionIcon(action.type)

                        // If action has conversion options, show them as separate cards
                        if (action.conversionOptions && action.conversionOptions.length > 0) {
                            return (
                                <div key={action.id} className="space-y-2">
                                    {action.conversionOptions.map(option => (
                                        <Card
                                            key={option.format}
                                            className="p-4 hover:border-primary cursor-pointer transition-all group"
                                            onClick={() => handleActionClick(action, option)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                    <Icon className="w-5 h-5 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">{option.label}</p>
                                                    {option.description && (
                                                        <p className="text-sm text-muted-foreground">{option.description}</p>
                                                    )}
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )
                        }

                        // Otherwise, show single action card
                        return (
                            <Card
                                key={action.id}
                                className="p-4 hover:border-primary cursor-pointer transition-all group"
                                onClick={() => handleActionClick(action)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{action.label}</p>
                                        {action.description && (
                                            <p className="text-sm text-muted-foreground">{action.description}</p>
                                        )}
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}

            {/* Secondary Actions */}
            {secondaryActions.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">More Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {secondaryActions.map(action => {
                            const Icon = getActionIcon(action.type)
                            return (
                                <Card
                                    key={action.id}
                                    className="p-3 hover:border-primary cursor-pointer transition-all group"
                                    onClick={() => handleActionClick(action)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{action.label}</p>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
