import { Palette, GraduationCap, Code2, Smartphone, BarChart3, Building2 } from 'lucide-react'

const audiences = [
    {
        icon: Palette,
        title: 'Designers',
        description: 'Convert between image formats, optimize assets for web, and batch-export at different resolutions.',
        color: 'text-pink-500'
    },
    {
        icon: GraduationCap,
        title: 'Students',
        description: 'Turn PDFs into images for presentations, convert audio recordings, and transform data formats.',
        color: 'text-yellow-500'
    },
    {
        icon: Code2,
        title: 'Developers',
        description: 'Convert data formats (JSON, CSV, XML, YAML), transform fonts, and convert media assets.',
        color: 'text-blue-500'
    },
    {
        icon: Smartphone,
        title: 'Content creators',
        description: 'Convert HEIC photos to JPG, compress images without losing quality, and optimize media for every platform.',
        color: 'text-green-500'
    },
    {
        icon: BarChart3,
        title: 'Data analysts',
        description: 'Transform CSV to JSON, XML to CSV, and convert between data interchange formats effortlessly.',
        color: 'text-purple-500'
    },
    {
        icon: Building2,
        title: 'Teams & businesses',
        description: 'No accounts, no file size limits, no worrying about sensitive files leaving your network.',
        color: 'text-orange-500'
    }
]

export function BuiltForEveryone() {
    return (
        <section className="py-24 bg-[#1e1e2e] text-white">
            <div className="container px-4 max-w-5xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-sm font-medium mb-4 border border-white/10">
                        <span className="text-primary font-medium tracking-wide text-xs uppercase">Who it's for</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Built for <span className="text-primary">everyone</span>
                    </h2>
                    <p className="text-lg text-gray-400">
                        Whether you're a designer, developer, or student — XYZConverter works for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {audiences.map((audience) => {
                        const Icon = audience.icon
                        return (
                            <div key={audience.title} className="flex flex-col space-y-3 group">
                                <div className="p-3 bg-white/5 w-fit rounded-xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                                    <Icon className={`w-6 h-6 ${audience.color}`} />
                                </div>
                                <h3 className="text-lg font-semibold text-white tracking-tight">
                                    {audience.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {audience.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
