
import React, { useState, useEffect } from 'react';
import Web3, { BaseWeb3Error } from 'web3';
import VotingContract from '../../ethereum-voting-contract/build/contracts/Voting.json';
import type { AbiItem } from 'web3-utils';
import { Wallet, Vote, Trophy, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Define types for candidate and votes
interface Votes {
  [candidate: string]: number;
}

const Voting: React.FC = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [contract, setContract] = useState<InstanceType<Web3['eth']['Contract']> | null>(null);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [votes, setVotes] = useState<Votes>({});
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
    const [selectedAccount, setSelectedAccount] = useState<string>('');
     const [web3, setWeb3] = useState<Web3 | null>(null);
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + Number(count), 0)
  const [error, setError] = useState<string>('')
  const leadingCandidate =
    Object.keys(votes).length > 0
      ? Object.entries(votes).reduce((a, b) => (votes[a[0]] > votes[b[0]] ? a : b))[0]
      : null
useEffect(() => {
    if ((window as any).ethereum) {
      setWeb3(new Web3((window as any).ethereum));
    } else {
      console.warn('No injected ethereum provider found');
    }
  }, []);


  useEffect(() => {
    const init = async () => {
     
      

      try {
        if(!web3) return;
         const accountsList = await web3.eth.getAccounts();
      setAccounts(accountsList);
      setSelectedAccount(accountsList[0]);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = (VotingContract.networks as any)[networkId.toString()];

        if (deployedNetwork) {
          const contractInstance = new web3.eth.Contract(
            VotingContract.abi as AbiItem[],
            deployedNetwork.address
          );
          setContract(contractInstance);

          const candidates: string[] = await contractInstance.methods.getCandidates().call();
          setCandidates(candidates);

          const v: Votes = {};
          for (const candidate of candidates) {
            v[candidate] = await contractInstance.methods.getVotes(candidate).call();
          }
          setVotes(v);
        
      }
      } catch (error) {
        console.error('Error accessing the wallet', error);
      }
    };
    init();
  }, [web3]);
  const connectWallet = async () => {
    if (!web3) return;
    try {
      const accs = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accs);
      setSelectedAccount(accs[0]);
    } catch (err) {
      console.error('User rejected connection', err);
    }
  };
   const vote = async () => {
  if (contract && selectedCandidate && selectedAccount) {
    try {
      if(web3){
        const gas = (await contract.methods.vote(selectedCandidate).estimateGas({ from: selectedAccount })).toString();
        const gasPrice = (await web3.eth.getGasPrice()).toString(); 
        setIsVoting(true)
        await contract.methods.vote(selectedCandidate).send({
          from: selectedAccount,
          gas,
          gasPrice 
        });
        

        const votesCount = await contract.methods.getVotes(selectedCandidate).call() as number;
        setVotes({ ...votes, [selectedCandidate]: votesCount });
        await new Promise((resolve) => setTimeout(resolve, 500))
        setIsVoting(false)
        setHasVoted(true)
      }
    } catch (error) {
      if ((error as BaseWeb3Error).message.includes("execution reverted: You have already voted")) {
      // Handle the specific error (already voted)
        setError("You have already voted.");
      } else {
        // Handle any other errors
        setError("An error occurred. Please try again.");
        console.error("Error during voting:", error);
      }
    }
  }
};
 const handleAccountChange = (value: string) => {
    setSelectedAccount(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sepolia Ethereum Voting DApp
          </h1>
          <p className="text-gray-600">Secure, transparent, and decentralized voting on the blockchain</p>
        </div>

        {/* Wallet Connection */}
        {!accounts.length ? (
          <Card className="border-2 border-dashed border-purple-200 bg-purple-50/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Wallet className="h-16 w-16 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect Your Wallet</h3>
              <p className="text-gray-600 mb-6 text-center max-w-md">
                Connect your Ethereum wallet to participate in the voting process
              </p>
              <Button
                onClick={connectWallet}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Account Selection & Voting */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Account Selection
                  </CardTitle>
                  <CardDescription>Choose the account you want to vote with</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedAccount} onValueChange={handleAccountChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an account" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {accounts.map((account, index) => (
                        <SelectItem key={index} value={account}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {account}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vote className="h-5 w-5 text-purple-600" />
                    Cast Your Vote
                  </CardTitle>
                  <CardDescription>Select your preferred candidate and submit your vote</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedCandidate} onValueChange={setSelectedCandidate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Candidate" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {candidates.map((candidate, index) => (
                        <SelectItem key={index} value={candidate}>
                          {candidate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {
                  !error ? (<>
                  {hasVoted ? (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">Vote submitted successfully!</span>
                    </div>
                  ) : (
                    <Button
                      onClick={vote}
                      disabled={!selectedCandidate || isVoting}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      size="lg"
                    >
                      {isVoting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting Vote...
                        </>
                      ) : (
                        <>
                          <Vote className="mr-2 h-4 w-4" />
                          Cast Vote
                        </>
                      )}
                    </Button>
                  )}
                  </>):(
                    <>
                    <Vote className="mr-2 h-4 w-4" />
                          Can't vote twice!
                    </>
                  )

                  }
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-purple-600" />
                  Live Results
                </CardTitle>
                <CardDescription>
                  Total votes cast: <Badge variant="secondary">{totalVotes}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidates.map((candidate, index) => {
                  const voteCount = Number(votes[candidate] || 0n)
                  const totalVotesNumber = Number(totalVotes)
                  const percentage = totalVotesNumber > 0 ? (voteCount / totalVotesNumber) * 100 : 0
                  const isLeading = candidate === leadingCandidate

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{candidate}</span>
                          {isLeading && <Trophy className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={isLeading ? "default" : "secondary"}>{voteCount} votes</Badge>
                          <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}

                {totalVotes > 0 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Current Leader: {leadingCandidate}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-8">
          <p>Powered by Ethereum • Sepolia Testnet • Secure & Transparent</p>
        </div>
      </div>
    </div>
  );
};

export default Voting;