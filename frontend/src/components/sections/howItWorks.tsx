
"use client"

import * as motion from "motion/react-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Bot, BarChartHorizontalBig, ClipboardCheck } from "lucide-react"

const features = [
  {
    title: "Seamless Document Upload",
    description: "Effortlessly upload your commercial lease, audit template, and Excel synthesis document for analysis.",
    icon: Upload,
  },
  {
    title: "AI-Driven Analysis",
    description: "Our AI intelligently cross-references your documents with audit template data, providing in-depth insights.",
    icon: Bot,
  },
  {
    title: "Custom Audit Insights",
    description: "Generate a detailed audit tailored to your provided templates and regulatory requirements.",
    icon: ClipboardCheck,
  },
  {
    title: "Excel Synthesis Automation",
    description: "Receive a comprehensive Excel summary with structured and actionable findings.",
    icon: BarChartHorizontalBig,
  },
]

export function HowItWorks() {
  return (
    <section id="services" className="py-20 bg-white" >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 grid-rows-1">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border-none shadow-lg hover:shadow-xl 
                transition-shadow duration-300 h-full flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#E6E6F2] rounded-full 
                    flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-dark-blue" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription
                    className="text-shade-gray md:text-lg"
                  >
                    {feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

