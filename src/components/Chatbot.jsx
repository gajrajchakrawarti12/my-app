"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, MessageSquare, BookOpen, Download, Save, ExternalLink } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/input"
import { ScrollArea } from "../components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/Badge"
import ReactMarkdown from "react-markdown"
import { useAuth } from "../context/AuthContext"


/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {"user" | "assistant" | "info"} type
 * @property {string} content
 * @property {Date} timestamp
 */


const featureCards = [
  {
    title: "Guided Learning",
    description: "Step-by-step cybersecurity education",
    icon: BookOpen,
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    title: "Course Links",
    description: "Direct access to learning resources",
    icon: ExternalLink,
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  {
    title: "Save Progress",
    description: "Bookmark important conversations",
    icon: Save,
    color: "bg-cyan-100 text-cyan-700 border-cyan-200",
  },
  {
    title: "AI Assistant",
    description: "24/7 cybersecurity expert help",
    icon: MessageSquare,
    color: "bg-pink-100 text-pink-700 border-pink-200",
  },
  {
    title: "Learning Plans",
    description: "Personalized study roadmaps",
    icon: BookOpen,
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    title: "Download PDFs",
    description: "Offline learning materials",
    icon: Download,
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
]

const suggestedQuestions = [
  "How can I protect myself from phishing attacks?",
  "What should I do if I think I've been scammed?",
  "How do I create strong passwords?",
  "What is two-factor authentication?",
  "How can I secure my home Wi-Fi network?",
]

export default function Chatbot() {
  const [chatHistory, setChatHistory] = useState([])
  const [question, setQuestion] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const chatContainerRef = useRef(null)
  const { user } = useAuth()

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  useEffect(() => {
    // Welcome message
    const welcomeMessage = {
      id: Date.now().toString(),
      type: "info",
      content: user?.fullName
        ? `Welcome back, ${user.fullName}! I'm your cybersecurity AI assistant. How can I help you stay safe online today?`
        : "Welcome! I'm your cybersecurity AI assistant. Please log in to get personalized assistance, or ask me any cybersecurity questions!",
      timestamp: new Date(),
    }

    setChatHistory([welcomeMessage])
  }, [user])

  const generateAnswer = async (e) => {
    e.preventDefault()
    if (!question.trim() || isGenerating) return

    const currentQuestion = question.trim()
    setQuestion("")
    setIsGenerating(true)

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: currentQuestion,
      timestamp: new Date(),
    }

    setChatHistory((prev) => [...prev, userMessage])

    try {
      // Simulate AI response - replace with actual AI SDK call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock AI response based on cybersecurity context
      let aiResponse = ""
      const lowerQuestion = currentQuestion.toLowerCase()

      if (lowerQuestion.includes("phishing")) {
        aiResponse = `## 🎣 Phishing Protection Guide

**What is Phishing?**
Phishing is a cyber attack where scammers impersonate legitimate organizations to steal your personal information.

**How to Protect Yourself:**
- ✅ Always verify sender identity before clicking links
- ✅ Check URLs carefully - look for misspellings or suspicious domains
- ✅ Never share passwords, OTPs, or financial info via email/SMS
- ✅ Use official websites or apps instead of clicking email links
- ✅ Enable two-factor authentication on all accounts

**Red Flags:**
- 🚩 Urgent language ("Act now!" "Limited time!")
- 🚩 Generic greetings ("Dear Customer")
- 🚩 Suspicious sender addresses
- 🚩 Requests for sensitive information

**If You've Been Targeted:**
1. Don't click any links or download attachments
2. Report the email/message as spam
3. If you clicked a link, change your passwords immediately
4. Contact your bank if financial info was involved
5. Report to cybercrime.gov.in or call 1930

Would you like me to explain any specific aspect of phishing protection in more detail?`
      } else if (lowerQuestion.includes("password")) {
        aiResponse = `## 🔐 Strong Password Guide

**Creating Strong Passwords:**
- Use at least 12 characters
- Mix uppercase, lowercase, numbers, and symbols
- Avoid personal information (names, birthdays, etc.)
- Use unique passwords for each account
- Consider passphrases: "Coffee@Morning#2024!"

**Password Manager Benefits:**
- Generate strong, unique passwords
- Store them securely
- Auto-fill login forms
- Sync across devices

**Popular Password Managers:**
- Bitwarden (free & open source)
- 1Password
- LastPass
- Dashlane

**Two-Factor Authentication (2FA):**
Always enable 2FA when available - it adds an extra security layer even if your password is compromised.

Need help setting up a password manager or 2FA?`
      } else if (lowerQuestion.includes("scam")) {
        aiResponse = `## 🚨 Scam Response Guide

**If You Think You've Been Scammed:**

**Immediate Actions:**
1. 🛑 Stop all communication with the scammer
2. 📱 Don't send any more money or information
3. 📸 Take screenshots of all communications
4. 🏦 Contact your bank if money was involved
5. 🔒 Change passwords for any compromised accounts

**Report the Scam:**
- **National Helpline:** Call 1930 (24/7)
- **Online:** Report at cybercrime.gov.in
- **Local Police:** File an FIR if significant money was lost

**Preserve Evidence:**
- Screenshots of messages/emails
- Phone numbers used by scammers
- Bank transaction details
- Any websites or apps involved

**Recovery Steps:**
- Monitor bank statements closely
- Set up fraud alerts with your bank
- Check credit reports for suspicious activity
- Consider identity theft protection services

**Prevention for Future:**
- Never share OTP, CVV, or passwords
- Verify caller identity independently
- Be skeptical of "too good to be true" offers
- Research before making any payments

Would you like specific guidance for any type of scam?`
      } else {
        aiResponse = `I'm here to help with cybersecurity questions! I can assist you with:

🛡️ **Security Best Practices**
- Password management
- Two-factor authentication
- Safe browsing habits

🎣 **Scam Prevention**
- Identifying phishing attempts
- Avoiding online fraud
- Recognizing social engineering

📱 **Device Security**
- Mobile security tips
- Wi-Fi safety
- Software updates

🚨 **Incident Response**
- What to do if you've been scammed
- Reporting procedures
- Recovery steps

Feel free to ask me anything about staying safe online! You can also try one of these common questions:
${suggestedQuestions.map((q) => `• ${q}`).join("\n")}`
      }

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      }

      setChatHistory((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "❌ I'm having trouble connecting right now. Please try again in a moment, or contact our support team if the issue persists.",
        timestamp: new Date(),
      }

      setChatHistory((prev) => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSuggestedQuestion = (suggestedQ) => {
    setQuestion(suggestedQ)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Cyber Assistant</h2>
              <p className="text-sm text-gray-500">AI-Powered Security Help</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4">
          <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700" size="sm" onClick={() => window.location.reload()}>
            <MessageSquare className="h-4 w-4 mr-2" />
            New Chat
          </Button>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 px-2">Recent Chats</h3>
            
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.fullName ?? "Guest User"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email ?? ""}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Hi, I'm your Cybersecurity Assistant! 🛡️</h1>
            <p className="text-gray-600">
              Ask me anything about staying safe online, and I'll provide personalized guidance and learning resources.
            </p>
          </div>
        </header>

        {/* Feature Cards */}
        {chatHistory.length <= 1 && (
          <section className="p-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">What I can help you with:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featureCards.map((card, index) => {
                  const Icon = card.icon
                  return (
                    <Card key={index} className={`cursor-pointer hover:shadow-md transition-shadow ${card.color}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-5 w-5" />
                          <CardTitle className="text-sm">{card.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-xs">{card.description}</CardDescription>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          <ScrollArea className="flex-1 p-6" ref={chatContainerRef}>
            <div className="max-w-4xl mx-auto space-y-4">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"} ${chat.type === "info" ? "justify-center" : ""
                    }`}
                >
                  {chat.type === "info" ? (
                    <Badge variant="secondary" className="px-4 py-2">
                      {chat.content}
                    </Badge>
                  ) : (
                    <div
                      className={`flex space-x-3 max-w-3xl ${chat.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback>
                          {chat.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg p-4 ${chat.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-200 text-gray-900"
                          }`}
                      >
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown>{chat.content}</ReactMarkdown>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                          {chat.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isGenerating && (
                <div className="flex justify-start">
                  <div className="flex space-x-3 max-w-3xl">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-gray-600">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Suggested Questions */}
          {chatHistory.length <= 1 && !isGenerating && (
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="max-w-4xl mx-auto">
                <p className="text-sm text-gray-600 mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 3).map((q, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedQuestion(q)}
                      className="text-xs"
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input Form */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={generateAnswer} className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Ask me anything about cybersecurity..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1"
                  disabled={isGenerating}
                />
                <Button type="submit" disabled={isGenerating || !question.trim()}>
                  {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                AI responses are for educational purposes. For emergencies, call 1930 or visit cybercrime.gov.in
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
