import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Square } from 'lucide-react'
import { usePageSEO } from "@/utils/seo"
import { FAQSection } from "@/components/seo/FAQSection"
import { TEXT_TO_SPEECH_FAQ, injectStructuredData, generateSoftwareApplicationSchema } from "@/utils/structured-data"
import { CONVERSION_CONTENT } from "@/utils/seo-content"
import { SEOContentSection } from "@/components/seo/SEOContentSection"

export function TextToSpeech() {
    usePageSEO()

    // SEO Content
    const content = CONVERSION_CONTENT['/text-to-speech']

    // Inject Structured Data
    useEffect(() => {
        const schema = generateSoftwareApplicationSchema({
            name: content.title,
            description: content.description,
            featureList: content.features,
            applicationCategory: 'AudioApplication'
        })
        injectStructuredData(schema)
    }, [content])

    const [text, setText] = useState("")
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
    const [selectedVoice, setSelectedVoice] = useState<string>("")
    const [rate, setRate] = useState([1])
    const [pitch, setPitch] = useState([1])
    const [isPlaying, setIsPlaying] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    const synth = window.speechSynthesis

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = synth.getVoices()
            setVoices(availableVoices)
            if (availableVoices.length > 0 && !selectedVoice) {
                // Prefer English voices by default
                const defaultVoice = availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0]
                setSelectedVoice(defaultVoice.name)
            }
        }

        loadVoices()
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices
        }
    }, [synth, selectedVoice])

    const handlePlay = () => {
        if (isPaused) {
            synth.resume()
            setIsPlaying(true)
            setIsPaused(false)
            return
        }

        if (synth.speaking) {
            synth.cancel()
        }

        if (text) {
            const utterance = new SpeechSynthesisUtterance(text)
            const voice = voices.find(v => v.name === selectedVoice)
            if (voice) utterance.voice = voice
            utterance.rate = rate[0]
            utterance.pitch = pitch[0]

            utterance.onend = () => {
                setIsPlaying(false)
                setIsPaused(false)
            }

            synth.speak(utterance)
            setIsPlaying(true)
        }
    }

    const handlePause = () => {
        if (synth.speaking && !isPaused) {
            synth.pause()
            setIsPaused(true)
            setIsPlaying(false)
        }
    }

    const handleStop = () => {
        synth.cancel()
        setIsPlaying(false)
        setIsPaused(false)
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Text to Speech</h1>
                <p className="text-xl text-muted-foreground">
                    Convert text to natural-sounding speech instantly.
                </p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Voice</Label>
                                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {voices.map((voice) => (
                                            <SelectItem key={voice.name} value={voice.name}>
                                                {voice.name} ({voice.lang})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Speed: {rate[0]}x</Label>
                                <Slider
                                    value={rate}
                                    onValueChange={setRate}
                                    min={0.5}
                                    max={2}
                                    step={0.1}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Pitch: {pitch[0]}</Label>
                                <Slider
                                    value={pitch}
                                    onValueChange={setPitch}
                                    min={0.5}
                                    max={2}
                                    step={0.1}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col justify-end space-y-4">
                            <div className="flex gap-4">
                                {!isPlaying ? (
                                    <Button onClick={handlePlay} className="flex-1 gap-2" size="lg">
                                        <Play className="w-5 h-5" />
                                        {isPaused ? "Resume" : "Play"}
                                    </Button>
                                ) : (
                                    <Button onClick={handlePause} className="flex-1 gap-2" variant="secondary" size="lg">
                                        <Pause className="w-5 h-5" />
                                        Pause
                                    </Button>
                                )}
                                <Button onClick={handleStop} variant="destructive" size="lg">
                                    <Square className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Enter Text</Label>
                        <Textarea
                            placeholder="Type or paste text here to listen..."
                            className="min-h-[200px] text-lg p-4"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {content.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="text-center p-4 rounded-lg bg-muted/50">
                        <h3 className="font-semibold mb-2">{feature}</h3>
                    </div>
                ))}
            </div>

            <SEOContentSection content={content} />

            <div className="py-12 border-t">
                <FAQSection faqs={TEXT_TO_SPEECH_FAQ} />
            </div>
        </div>
    )
}
