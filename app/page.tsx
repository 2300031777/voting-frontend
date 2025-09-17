"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Vote, Users, BarChart3, Shield } from "lucide-react"

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
    setShowAuth(false)
  }

  if (isLoggedIn) {
    return <Dashboard />
  }

  if (showAuth) {
    return (
      <AuthPage isSignUp={isSignUp} setIsSignUp={setIsSignUp} onAuth={handleAuth} onBack={() => setShowAuth(false)} />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Background voting-related image */}
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{
          backgroundImage: `url('/voting-ballot-box-democracy-election.jpg')`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main heading in orange */}
          <h1 className="text-6xl md:text-7xl font-bold text-primary text-balance">Welcome to Online Voting System</h1>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold">Secure</h3>
                <p className="text-sm text-muted-foreground">End-to-end encryption</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Vote className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold">Easy Voting</h3>
                <p className="text-sm text-muted-foreground">Simple one-click process</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold">Real-time Results</h3>
                <p className="text-sm text-muted-foreground">Live vote counting</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold">Transparent</h3>
                <p className="text-sm text-muted-foreground">Open and verifiable</p>
              </CardContent>
            </Card>
          </div>

          {/* Call to action */}
          <div className="space-y-4">
            <p className="text-xl text-muted-foreground">Participate in secure, transparent elections</p>
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
              onClick={() => setShowAuth(true)}
            >
              Sign in to visit the dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthPage({
  isSignUp,
  setIsSignUp,
  onAuth,
  onBack,
}: {
  isSignUp: boolean
  setIsSignUp: (value: boolean) => void
  onAuth: (e: React.FormEvent) => void
  onBack: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
          <CardDescription>
            {isSignUp ? "Create your account to start voting" : "Access your voting dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="Enter your name" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">{isSignUp ? "Email" : "Username"}</Label>
              <Input
                id="email"
                type={isSignUp ? "email" : "text"}
                placeholder={isSignUp ? "Enter your email" : "Enter your username"}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button onClick={() => setIsSignUp(!isSignUp)} className="ml-2 text-primary hover:underline">
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
            <Button variant="outline" onClick={onBack} className="w-full bg-transparent">
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [votes, setVotes] = useState<any[]>([
    {
      id: 1,
      name: "Online University Voting System",
      candidates: ["John Smith", "Sarah Johnson", "Mike Davis"],
      votes: [45, 32, 23],
      totalVoters: 100,
      isActive: true,
    },
  ])
  const [showCreateVote, setShowCreateVote] = useState(false)
  const [showVoting, setShowVoting] = useState(false)
  const [selectedVote, setSelectedVote] = useState<any>(null)
  const [hasVoted, setHasVoted] = useState(false)

  const handleCreateVote = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const voteName = formData.get("voteName") as string
    const numCandidates = Number.parseInt(formData.get("numCandidates") as string)
    const totalVoters = Number.parseInt(formData.get("totalVoters") as string)

    const candidates = []
    for (let i = 1; i <= numCandidates; i++) {
      candidates.push(formData.get(`candidate${i}`) as string)
    }

    const newVote = {
      id: votes.length + 1,
      name: voteName,
      candidates,
      votes: new Array(numCandidates).fill(0),
      totalVoters,
      isActive: true,
    }

    setVotes([...votes, newVote])
    setShowCreateVote(false)
  }

  const handleCastVote = (candidateIndex: number) => {
    if (selectedVote && !hasVoted) {
      const updatedVotes = votes.map((vote) => {
        if (vote.id === selectedVote.id) {
          const newVotes = [...vote.votes]
          newVotes[candidateIndex]++
          return { ...vote, votes: newVotes }
        }
        return vote
      })
      setVotes(updatedVotes)
      setHasVoted(true)
    }
  }

  const renderSidebar = () => (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-lg font-bold text-sidebar-foreground">Voting System</h2>
      </div>
      <nav className="space-y-2 px-4">
        {[
          { id: "dashboard", label: "Dashboard", icon: BarChart3 },
          { id: "voters", label: "Voters", icon: Users },
          { id: "casting", label: "Casting Votes", icon: Vote },
          { id: "results", label: "Results", icon: BarChart3 },
        ].map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                currentPage === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
        <button
          onClick={() => window.location.reload()}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Shield className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  )

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome to Online Voting System</h1>
        <p className="text-muted-foreground mt-2">
          "Democracy is not just the right to vote, it is the right to live in dignity." <br />
          "Your vote is your voice in shaping the future of our community."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Vote className="h-5 w-5 text-primary" />
              <span>Active Votes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{votes.filter((v) => v.isActive).length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Total Voters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{votes.reduce((sum, vote) => sum + vote.totalVoters, 0)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Completed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{votes.filter((v) => !v.isActive).length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderVoters = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Voters Management</h1>
      <div className="space-y-4">
        {votes.map((vote) => (
          <Card key={vote.id}>
            <CardHeader>
              <CardTitle>{vote.name}</CardTitle>
              <CardDescription>
                {vote.totalVoters} registered voters • {vote.votes.reduce((a, b) => a + b, 0)} votes cast
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vote.candidates.map((candidate: string, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{candidate}</span>
                    <span className="font-semibold">{vote.votes[index]} votes</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderCasting = () => {
    if (showCreateVote) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Create New Vote</h1>
            <Button variant="outline" onClick={() => setShowCreateVote(false)}>
              Back
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleCreateVote} className="space-y-4">
                <div>
                  <Label htmlFor="voteName">Voting Name</Label>
                  <Input id="voteName" name="voteName" placeholder="e.g., Student Council Election" required />
                </div>

                <div>
                  <Label htmlFor="totalVoters">Total Number of Voters</Label>
                  <Input id="totalVoters" name="totalVoters" type="number" min="1" placeholder="e.g., 100" required />
                </div>

                <div>
                  <Label htmlFor="numCandidates">Number of Candidates</Label>
                  <Input
                    id="numCandidates"
                    name="numCandidates"
                    type="number"
                    min="2"
                    max="10"
                    placeholder="e.g., 3"
                    required
                  />
                </div>

                <div id="candidatesContainer">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <Label htmlFor={`candidate${i}`}>Candidate {i}</Label>
                      <Input id={`candidate${i}`} name={`candidate${i}`} placeholder={`Candidate ${i} name`} required />
                    </div>
                  ))}
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Create Vote
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (showVoting && selectedVote) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Cast Your Vote</h1>
            <Button
              variant="outline"
              onClick={() => {
                setShowVoting(false)
                setSelectedVote(null)
                setHasVoted(false)
              }}
            >
              Back
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{selectedVote.name}</CardTitle>
              <CardDescription>Select your preferred candidate</CardDescription>
            </CardHeader>
            <CardContent>
              {!hasVoted ? (
                <div className="space-y-3">
                  {selectedVote.candidates.map((candidate: string, index: number) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto p-4 bg-transparent"
                      onClick={() => handleCastVote(index)}
                    >
                      <Vote className="h-5 w-5 mr-3" />
                      {candidate}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-green-600 text-xl font-semibold">✓ Successfully Submitted</div>
                  <p className="text-muted-foreground">Your vote has been recorded securely.</p>
                  <Button onClick={() => setCurrentPage("results")} className="bg-primary hover:bg-primary/90">
                    View Results
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Casting Votes</h1>
          <Button onClick={() => setShowCreateVote(true)} className="bg-primary hover:bg-primary/90">
            Create New Vote
          </Button>
        </div>

        <div className="space-y-4">
          {votes
            .filter((vote) => vote.isActive)
            .map((vote) => (
              <Card key={vote.id}>
                <CardHeader>
                  <CardTitle>{vote.name}</CardTitle>
                  <CardDescription>
                    {vote.candidates.length} candidates • {vote.votes.reduce((a, b) => a + b, 0)}/{vote.totalVoters}{" "}
                    votes cast
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => {
                      setSelectedVote(vote)
                      setShowVoting(true)
                    }}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Cast Vote
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    )
  }

  const renderResults = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Voting Results</h1>

      <div className="space-y-6">
        {votes.map((vote) => {
          const sortedResults = vote.candidates
            .map((candidate: string, index: number) => ({
              name: candidate,
              votes: vote.votes[index],
            }))
            .sort((a, b) => b.votes - a.votes)

          return (
            <Card key={vote.id}>
              <CardHeader>
                <CardTitle>{vote.name}</CardTitle>
                <CardDescription>
                  Total votes: {vote.votes.reduce((a, b) => a + b, 0)} / {vote.totalVoters}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedResults.map((result, index) => (
                    <div key={result.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-800"
                              : index === 1
                                ? "bg-gray-100 text-gray-800"
                                : index === 2
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {index === 0
                            ? "🏆 Winner"
                            : `${index + 1}${index === 1 ? "st" : index === 2 ? "nd" : index === 3 ? "rd" : "th"} Position`}
                        </div>
                        <span className="font-medium">{result.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{result.votes} votes</div>
                        <div className="text-sm text-muted-foreground">
                          {vote.votes.reduce((a, b) => a + b, 0) > 0
                            ? Math.round((result.votes / vote.votes.reduce((a, b) => a + b, 0)) * 100)
                            : 0}
                          %
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="text-center">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Thank you for participating in our democratic process. Your voice matters!
          </p>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {renderSidebar()}

      <main className="flex-1 ml-64 p-8">
        {currentPage === "dashboard" && renderDashboard()}
        {currentPage === "voters" && renderVoters()}
        {currentPage === "casting" && renderCasting()}
        {currentPage === "results" && renderResults()}
      </main>
    </div>
  )
}
