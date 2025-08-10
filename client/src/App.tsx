import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import { GameStateProvider } from "@/hooks/use-game-state";

import Home from "@/pages/home";
import Contact from "@/pages/contact";
import Missions from "@/pages/missions";
import MissionDetails from "@/pages/mission-details";
import Rules from "@/pages/rules";
import Tutorial from "@/pages/tutorial";
import MissionIntro from "@/pages/mission-intro";
import ChaptersSummary from "@/pages/chapters-summary";
import Puzzle from "@/pages/puzzle";
import Completion from "@/pages/completion";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/missions" component={Missions} />
      <Route path="/mission-details" component={MissionDetails} />
      <Route path="/rules" component={Rules} />
      <Route path="/tutorial" component={Tutorial} />
      <Route path="/mission-intro" component={MissionIntro} />
      <Route path="/chapters" component={ChaptersSummary} />
      <Route path="/puzzle/:puzzleId" component={Puzzle} />
      <Route path="/completion" component={Completion} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <GameStateProvider>
          <TooltipProvider>
            <Toaster />
            <div className="min-h-screen font-inter">
              <Router />
            </div>
          </TooltipProvider>
        </GameStateProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
