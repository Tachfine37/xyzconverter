import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { analytics } from '@/lib/analytics'
import { Hero } from '@/components/home/Hero'
import { FileActionPicker } from '@/components/home/FileActionPicker'
import { InlineProcessor } from '@/components/home/InlineProcessor'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { getActionsForFile } from '@/utils/file-actions'
import type { FileAction, ConversionOption } from '@/utils/file-actions'

type Step = 'upload' | 'action-picker' | 'processing' | 'complete'

export function Home() {
    const [step, setStep] = useState<Step>('upload')
    const [file, setFile] = useState<File | null>(null)
    const [selectedAction, setSelectedAction] = useState<FileAction | null>(null)
    const [conversionOption, setConversionOption] = useState<ConversionOption | undefined>(undefined)
    const [availableActions, setAvailableActions] = useState<FileAction[]>([])

    useEffect(() => {
        document.title = 'xyzconverter - Privacy-First Image Converter'
        analytics.pageView('home')
    }, [])

    const handleFileUploaded = (uploadedFile: File) => {
        setFile(uploadedFile)
        const actions = getActionsForFile(uploadedFile)
        setAvailableActions(actions)
        setStep('action-picker')
    }

    const handleActionSelected = (action: FileAction, option?: ConversionOption) => {
        setSelectedAction(action)
        setConversionOption(option)
        setStep('processing')
    }

    const handleReset = () => {
        setStep('upload')
        setFile(null)
        setSelectedAction(null)
        setConversionOption(undefined)
        setAvailableActions([])
    }

    const handleCancelActionPicker = () => {
        setStep('upload')
        setFile(null)
        setAvailableActions([])
    }

    return (
        <div className="flex flex-col w-full min-h-screen">
            {/* Hero Section - Conditional Rendering */}
            {step === 'upload' && (
                <>
                    <Hero onFileUploaded={handleFileUploaded} />

                    {/* Content Below Hero */}
                    <div className="flex-1 bg-background py-16 px-4">
                        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight">
                                    More than just a converter
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                    We offer a complete suite of tools to manage your images, PDFs, and data.
                                    Everything runs locally in your browser.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                                <Link to="/tools">
                                    <Button size="lg" className="h-12 px-8 text-base gap-2">
                                        Explore All Tools <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <Link to="/how-it-works">
                                    <Button variant="ghost" size="lg" className="h-12 px-8 text-base">
                                        How it works
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Action Picker Step */}
            {step === 'action-picker' && file && (
                <div className="flex-1 bg-background py-16 px-4">
                    <FileActionPicker
                        file={file}
                        actions={availableActions}
                        onActionSelected={handleActionSelected}
                        onCancel={handleCancelActionPicker}
                    />
                </div>
            )}

            {/* Processing Step */}
            {(step === 'processing' || step === 'complete') && file && selectedAction && (
                <div className="flex-1 bg-background py-16 px-4">
                    <InlineProcessor
                        file={file}
                        action={selectedAction}
                        conversionOption={conversionOption}
                        onComplete={() => setStep('complete')}
                        onReset={handleReset}
                    />
                </div>
            )}
        </div>
    )
}
