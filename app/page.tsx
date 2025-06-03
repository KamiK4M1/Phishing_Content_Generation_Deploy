"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Terminal, Zap, Code, Shield, Copy, Trash2, Github, Instagram } from "lucide-react"

interface FormData {
  full_name: string
  email: string
  job_position: string
  recently_activities: string
}

export default function HackerEmailGenerator() {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    job_position: "",
    recently_activities: "",
  })

  const [generatedEmail, setGeneratedEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [terminalText, setTerminalText] = useState("")

  // Hacker terminal effect
  useEffect(() => {
    const messages = [
      "Initializing LLM...",
      "CConnecting to Hugging Face API...",
      "LLoading language models...",
      "SSystem ready for email generation...",
    ]

    let messageIndex = 0
    let charIndex = 0

    const typeWriter = () => {
      if (messageIndex < messages.length) {
        if (charIndex < messages[messageIndex].length) {
          setTerminalText((prev) => prev + messages[messageIndex][charIndex])
          charIndex++
          setTimeout(typeWriter, 50)
        } else {
          setTerminalText((prev) => prev + "\n")
          messageIndex++
          charIndex = 0
          setTimeout(typeWriter, 500)
        }
      }
    }

    typeWriter()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setGeneratedEmail("")

    try {
      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedEmail(data.generatedEmail)
      } else {
        setError(data.error || "Failed to generate email")
      }
    } catch (err) {
      setError("Network connection failed - Check your firewall")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setFormData({
      full_name: "",
      email: "",
      job_position: "",
      recently_activities: "",
    })
    setGeneratedEmail("")
    setError("")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail)
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono">
      {/* Matrix-style background effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-black"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 border border-green-500/30 bg-black/80 p-6 rounded-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="h-10 w-10 text-green-400 animate-pulse" />
            <h1 className="text-4xl font-bold text-green-400 tracking-wider">{">"} Phishing Email Content with Personalized Context Data Generation</h1>
            <Shield className="h-10 w-10 text-green-400 animate-pulse" />
          </div>
          <p className="text-green-300 text-lg">{"[CLASSIFIED]"} LLM Phishing Email Synthesis</p>
          <p className="text-green-600 text-sm mt-2">
            {">"} For AI Builder 2025 Program {"<"}
          </p>

          {/* Terminal startup messages */}
          <div className="mt-4 bg-black border border-green-500/50 p-4 rounded text-left text-sm">
            <div className="text-green-500 mb-2">{">"} SYSTEM_LOG:</div>
            <pre className="text-green-400 whitespace-pre-wrap">{terminalText}</pre>
            <span className="animate-pulse">█</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Terminal */}
          <Card className="bg-black border-green-500/50 text-green-400">
            <CardHeader className="border-b border-green-500/30">
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Code className="h-5 w-5" />
                {">"} INPUT_PARAMETERS.json
              </CardTitle>
              <CardDescription className="text-green-600">{">"} Enter target data for email synthesis</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-green-400 font-mono">
                    {">"} FULL_NAME:
                  </Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder="John_Doe"
                    className="bg-black border-green-500/50 text-green-400 placeholder-green-600 font-mono focus:border-green-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-400 font-mono">
                    {">"} EMAIL_ADDRESS:
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@corp.net"
                    className="bg-black border-green-500/50 text-green-400 placeholder-green-600 font-mono focus:border-green-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job_position" className="text-green-400 font-mono">
                    {">"} JOB_POSITION:
                  </Label>
                  <Input
                    id="job_position"
                    name="job_position"
                    value={formData.job_position}
                    onChange={handleInputChange}
                    placeholder="Senior_Developer"
                    className="bg-black border-green-500/50 text-green-400 placeholder-green-600 font-mono focus:border-green-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recently_activities" className="text-green-400 font-mono">
                    {">"} RECENT_ACTIVITIES:
                  </Label>
                  <Textarea
                    id="recently_activities"
                    name="recently_activities"
                    value={formData.recently_activities}
                    onChange={handleInputChange}
                    placeholder="Completed security audit, deployed new encryption protocols..."
                    className="min-h-[120px] bg-black border-green-500/50 text-green-400 placeholder-green-600 font-mono focus:border-green-400 resize-none"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-black font-mono font-bold border border-green-400"
                  >
                    {isLoading ? (
                      <>
                        <Zap className="mr-2 h-4 w-4 animate-spin" />
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        EXECUTE_AI.sh
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClear}
                    disabled={isLoading}
                    className="bg-black border-green-500/50 text-green-400 hover:bg-green-900/20 font-mono"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Output Terminal */}
          <Card className="bg-black border-green-500/50 text-green-400">
            <CardHeader className="border-b border-green-500/30">
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Terminal className="h-5 w-5" />
                {">"} OUTPUT_STREAM.log
              </CardTitle>
              <CardDescription className="text-green-600">{">"} LLM response</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="min-h-[400px] bg-black border border-green-500/30 rounded p-4">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-center">
                      <Zap className="h-8 w-8 animate-pulse mx-auto mb-4 text-green-400" />
                      <p className="text-green-400 font-mono">{">"} LLM_PROCESSING...</p>
                      <p className="text-green-600 text-sm mt-2">{">"} Analyzing input parameters...</p>
                      <div className="mt-4 flex justify-center">
                        <div className="flex space-x-1">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                              style={{ animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="border border-red-500 bg-red-900/20 rounded p-4">
                    <p className="text-red-400 font-mono font-bold">{">"} ERROR_LOG:</p>
                    <p className="text-red-300 font-mono mt-2">{error}</p>
                    <p className="text-red-600 text-sm mt-2">{">"} Check system logs for details</p>
                  </div>
                )}

                {generatedEmail && !isLoading && (
                  <div className="space-y-4">
                    <div className="border border-green-500 bg-green-900/10 rounded p-4">
                      <p className="text-green-400 font-mono font-bold mb-3">{">"} GENERATION_SUCCESS:</p>
                      <div className="bg-black border border-green-500/30 rounded p-4 max-h-80 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm text-green-300 font-mono leading-relaxed">
                          {generatedEmail}
                        </pre>
                      </div>
                    </div>
                    <Button
                      onClick={copyToClipboard}
                      className="w-full bg-green-700 hover:bg-green-600 text-black font-mono font-bold"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      COPY_TO_CLIPBOARD.exe
                    </Button>
                  </div>
                )}

                {!generatedEmail && !isLoading && !error && (
                  <div className="flex items-center justify-center h-full text-green-600">
                    <div className="text-center">
                      <Terminal className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="font-mono">{">"} AWAITING_INPUT_PARAMETERS...</p>
                      <p className="text-sm mt-2">{">"} Execute LLM synthesis to generate output</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center border border-green-500/30 bg-black/80 p-4 rounded">
          <p className="text-green-600 font-mono text-sm">{">"} DEVELOP BY: Shitiphat Soysangwarn (Website)</p>
          <div className="flex items-center justify-center gap-6 mt-2">
            <a
              href="https://github.com/KamiK4M1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-500 hover:text-green-300 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="text-xs">@KamiK4M1</span>
            </a>
            <a
              href="https://www.instagram.com/k4m1.kxm1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-500 hover:text-green-300 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="text-xs">@k4m1.kxm1</span>
            </a>
          </div>
        </div>
       </div>
    </div>
  )
}
