import { Brain, Users, Zap } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function HowToPlay() {
  return (
    <section className="how-section">
      <div className="section-heading">
        <span id="htp">HOW IT WORKS</span>
        <h2>
          Simple to learn.
          <br />
          Hard to master.
        </h2>
      </div>

      <div className="features-grid">
        <FeatureCard
          icon={<Users size={22} />}
          title="Create a Room"
          description="Create a private room and share the code with your friends."
        />

        <FeatureCard
          icon={<Brain size={22} />}
          title="Outsmart Everyone"
          description="Solve challenges, read your opponents and make the right decisions."
        />

        <FeatureCard
          icon={<Zap size={22} />}
          title="Climb the Score"
          description="Every decision matters. Finish with the highest score to win."
        />
      </div>
    </section>
  );
}
