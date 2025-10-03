import CallToAction from "@/components/landing/CallToAction";
import FeatureHighlights from "@/components/landing/FeatureHighlights";
import Hero from "@/components/landing/Hero";

const Index = () => {
  return (
    <div className="space-y-16">
      <Hero />
      <FeatureHighlights />
      <CallToAction />
    </div>
  );
};

export default Index;
