import React, { useState, useEffect } from "react";
import { Stack, Typography, Paper } from "@mui/material";

interface TournamentSortProps {
  options: string[]; // List of options to sort
  onSortComplete: (sortedOptions: string[]) => void; // Callback when sorting is complete
}

const TournamentSort: React.FC<TournamentSortProps> = ({ options, onSortComplete }) => {
  const [pairQueue, setPairQueue] = useState<[string, string][]>([]);
  const [comparisonResults, setComparisonResults] = useState<Map<string, number>>(new Map());

  // Generate all unique pairs from the options
  useEffect(() => {
    const pairs: [string, string][] = [];
    for (let i = 0; i < options.length; i++) {
      for (let j = i + 1; j < options.length; j++) {
        pairs.push([options[i], options[j]]);
      }
    }
    setPairQueue(pairs);
  }, [options]);

  // Handle the user's vote and update the comparison results
  const handleVote = (winner: string, loser: string): void => {
    // Update the comparison results
    setComparisonResults((prevResults) => {
      const updatedResults = new Map(prevResults);
      updatedResults.set(winner, (updatedResults.get(winner) || 0) + 1);
      updatedResults.set(loser, updatedResults.get(loser) || 0);
      return updatedResults;
    });

    // Remove the current pair from the queue and set the next pair
    const newPairQueue = pairQueue.slice(1);
    setPairQueue(newPairQueue);

    // If there are no more pairs to compare, finalize the sorted order
    if (newPairQueue.length === 0) {
      const finalSorted = [...options].sort((a, b) => (comparisonResults.get(b) || 0) - (comparisonResults.get(a) || 0));
      onSortComplete(finalSorted); // Callback that the sorting is complete
    }
  };

  const renderPair = (): React.ReactNode => {
    if (pairQueue.length === 0) return null; // No more pairs to compare

    const [leftOption, rightOption] = pairQueue[0];

    return (
      <Stack spacing={2}>
        <Typography variant="h6">Which do you prefer?</Typography>
        <Stack direction="row" spacing={2}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => handleVote(leftOption, rightOption)}
          >
            {leftOption}
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => handleVote(rightOption, leftOption)}
          >
            {rightOption}
          </Paper>
        </Stack>
      </Stack>
    );
  };

  return (
    <Stack spacing={4} sx={{ width: "50%", margin: "auto", mt: 4 }}>
      {renderPair()}
    </Stack>
  );
};

export { TournamentSort };
